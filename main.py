from __future__ import annotations

import csv
import io
import json
import logging
import os
import sqlite3
import urllib.error
import urllib.parse
import urllib.request
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator

from voice_tts import (
    VoiceTTSConfigurationError,
    VoiceTTSError,
    is_hindi_tts_enabled,
    synthesize_hindi_audio,
)

ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "jal_raksha.db"
load_dotenv(ROOT / ".env")
logger = logging.getLogger(__name__)

app = FastAPI(title="Jal Raksha", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ReadingPayload(BaseModel):
    node_id: str = Field(..., min_length=3, max_length=32)
    tds: Optional[float] = Field(default=None, ge=0, le=2000)
    turbidity: Optional[float] = Field(default=None, ge=0, le=100)
    temperature: Optional[float] = Field(default=None, ge=-20, le=80)
    ph: Optional[float] = Field(default=None, ge=0, le=14)
    do: Optional[float] = Field(default=None, ge=0, le=20)
    timestamp: Optional[str] = None
    data_source: str = Field(default="hardware")

    @field_validator("data_source")
    @classmethod
    def validate_data_source(cls, value: str) -> str:
        allowed = {"demo", "hardware", "offline"}
        normalized = value.lower().strip()
        if normalized not in allowed:
            raise ValueError("data_source must be demo, hardware, or offline")
        return normalized


class CalibrationPayload(BaseModel):
    node_id: str = Field(..., min_length=3, max_length=32)
    sensor: str = Field(..., min_length=2, max_length=32)
    reference: float = Field(..., ge=0)
    observed: float = Field(..., ge=0)
    result: str = Field(default="VALID")

    @field_validator("sensor")
    @classmethod
    def validate_sensor(cls, value: str) -> str:
        allowed = {"tds", "turbidity", "temperature", "ph", "do"}
        normalized = value.lower().strip()
        if normalized not in allowed:
            raise ValueError("Unsupported sensor")
        return normalized


class NodePayload(BaseModel):
    id: Optional[str] = Field(default=None, min_length=3, max_length=32)
    label: str = Field(..., min_length=2, max_length=80)
    location: str = Field(..., min_length=2, max_length=120)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    battery: Optional[str] = None
    status: str = Field(default="normal")


class AlertAction(BaseModel):
    action: str = Field(...)


class HindiSpeechPayload(BaseModel):
    text: str = Field(..., min_length=1, max_length=4000)
    speaking_rate: float = Field(default=0.85, ge=0.25, le=4)

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        normalized = value.strip()
        if not normalized:
            raise ValueError("text must not be blank")
        if len(normalized.encode("utf-8")) > 4500:
            raise ValueError("text must not exceed 4,500 UTF-8 bytes")
        return normalized


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def ensure_schema() -> None:
    with get_connection() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS nodes (
                node_id TEXT PRIMARY KEY,
                label TEXT NOT NULL,
                location TEXT NOT NULL,
                latitude REAL,
                longitude REAL,
                battery TEXT,
                status TEXT NOT NULL DEFAULT 'normal',
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sensor_readings (
                id TEXT PRIMARY KEY,
                node_id TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                data_source TEXT NOT NULL,
                tds REAL,
                turbidity REAL,
                temperature REAL,
                ph REAL,
                do REAL,
                FOREIGN KEY(node_id) REFERENCES nodes(node_id)
            );

            CREATE TABLE IF NOT EXISTS alerts (
                id TEXT PRIMARY KEY,
                node_id TEXT NOT NULL,
                severity TEXT NOT NULL,
                parameter TEXT NOT NULL,
                current_value REAL,
                baseline_value REAL,
                explanation TEXT NOT NULL,
                recommended_action TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'new',
                created_at TEXT NOT NULL,
                acknowledged_at TEXT,
                resolved_at TEXT,
                FOREIGN KEY(node_id) REFERENCES nodes(node_id)
            );

            CREATE TABLE IF NOT EXISTS calibration_records (
                id TEXT PRIMARY KEY,
                node_id TEXT NOT NULL,
                sensor TEXT NOT NULL,
                reference REAL NOT NULL,
                observed REAL NOT NULL,
                difference REAL NOT NULL,
                result TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY(node_id) REFERENCES nodes(node_id)
            );

            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );
            """
        )
        seed_default_nodes(conn)
        conn.commit()


def seed_default_nodes(conn: sqlite3.Connection) -> None:
    existing = conn.execute("SELECT node_id FROM nodes").fetchall()
    if existing:
        return

    nodes = [
        ("JR-01", "Upstream", "Upstream Monitoring Zone", 19.076, 72.877, "87%", "normal"),
        ("JR-02", "Residential Zone", "Residential Zone", 19.089, 72.894, "74%", "normal"),
        ("JR-03", "Industrial Zone", "Industrial Zone", 19.110, 72.912, "68%", "warning"),
        ("JR-04", "Downstream", "Downstream Monitoring Zone", 19.129, 72.930, "56%", "critical"),
        ("JR-05", "Reservoir", "Reservoir Inlet", 19.145, 72.946, "90%", "normal"),
    ]

    for node_id, label, location, latitude, longitude, battery, status in nodes:
        conn.execute(
            "INSERT INTO nodes(node_id, label, location, latitude, longitude, battery, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (node_id, label, location, latitude, longitude, battery, status, utc_now()),
        )

        now = utc_now()
        conn.execute(
            "INSERT INTO sensor_readings(id, node_id, timestamp, data_source, tds, turbidity, temperature, ph, do) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                f"{node_id}-seed",
                node_id,
                now,
                "demo",
                {"JR-01": 285, "JR-02": 365, "JR-03": 612, "JR-04": 940, "JR-05": 318}[node_id],
                {"JR-01": 2.1, "JR-02": 3.8, "JR-03": 8.4, "JR-04": 18.2, "JR-05": 2.8}[node_id],
                {"JR-01": 25.4, "JR-02": 26.5, "JR-03": 28.1, "JR-04": 29.3, "JR-05": 24.9}[node_id],
                {"JR-01": 7.2, "JR-02": 7.1, "JR-03": 7.3, "JR-04": 7.0, "JR-05": 7.4}[node_id],
                {"JR-01": 8.2, "JR-02": 8.0, "JR-03": 7.8, "JR-04": 6.7, "JR-05": 8.5}[node_id],
            ),
        )


def find_node(conn: sqlite3.Connection, node_id: str) -> sqlite3.Row:
    row = conn.execute("SELECT * FROM nodes WHERE node_id = ?", (node_id,)).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail=f"Node '{node_id}' not found")
    return row


def get_latest_reading(conn: sqlite3.Connection, node_id: str) -> Optional[sqlite3.Row]:
    return conn.execute(
        "SELECT * FROM sensor_readings WHERE node_id = ? ORDER BY timestamp DESC LIMIT 1",
        (node_id,),
    ).fetchone()


def get_history(conn: sqlite3.Connection, node_id: str, limit: int = 24) -> list[dict[str, Any]]:
    rows = conn.execute(
        "SELECT * FROM sensor_readings WHERE node_id = ? ORDER BY timestamp DESC LIMIT ?",
        (node_id, limit),
    ).fetchall()
    return [dict(row) for row in reversed(rows)]


def average_baseline(node_id: str, conn: sqlite3.Connection) -> dict[str, float | None]:
    rows = conn.execute(
        "SELECT tds, turbidity, temperature, ph, do FROM sensor_readings WHERE node_id = ? ORDER BY timestamp DESC LIMIT 5",
        (node_id,),
    ).fetchall()
    if not rows:
        return {"tds": None, "turbidity": None, "temperature": None, "ph": None, "do": None}
    result = {key: 0.0 for key in ["tds", "turbidity", "temperature", "ph", "do"]}
    for key in result:
        values = [row[key] for row in rows if row[key] is not None]
        result[key] = sum(values) / len(values) if values else None
    return result


def metric_delta(current: Optional[float], baseline: Optional[float]) -> float:
    if current is None or baseline in (None, 0):
        return 0.0
    return ((float(current) - float(baseline)) / float(baseline)) * 100.0


def score_node(node_id: str, conn: sqlite3.Connection) -> dict[str, Any]:
    find_node(conn, node_id)
    latest_row = get_latest_reading(conn, node_id)
    latest = dict(latest_row) if latest_row else {}
    baseline = average_baseline(node_id, conn)
    anomaly = 0
    if latest.get("tds") is not None and baseline.get("tds") not in (None, 0):
        anomaly += min(abs(metric_delta(latest["tds"], baseline["tds"])) * 0.45, 45)
    if latest.get("turbidity") is not None and baseline.get("turbidity") not in (None, 0):
        anomaly += min(abs(metric_delta(latest["turbidity"], baseline["turbidity"])) * 0.28, 28)
    if latest.get("temperature") is not None and baseline.get("temperature") not in (None, 0):
        anomaly += min(abs(metric_delta(latest["temperature"], baseline["temperature"])) * 0.14, 14)
    anomaly = round(min(100, max(0, anomaly)))
    quality = max(0, min(100, 100 - anomaly))
    return {
        "node_id": node_id,
        "status": "critical" if anomaly >= 80 else "warning" if anomaly >= 50 else "normal",
        "anomaly_score": anomaly,
        "water_quality_score": quality,
        "baseline": baseline,
        "latest": latest,
    }


def create_alert_if_needed(conn: sqlite3.Connection, node_id: str, parameter: str, current_value: float, baseline_value: float, explanation: str, recommendation: str, severity: str) -> None:
    active = conn.execute(
        "SELECT id FROM alerts WHERE node_id = ? AND parameter = ? AND status IN ('new', 'acknowledged') ORDER BY created_at DESC LIMIT 1",
        (node_id, parameter),
    ).fetchone()
    if active:
        return

    alert_id = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO alerts(id, node_id, severity, parameter, current_value, baseline_value, explanation, recommended_action, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)",
        (alert_id, node_id, severity, parameter, current_value, baseline_value, explanation, recommendation, utc_now()),
    )


def evaluate_reading(conn: sqlite3.Connection, node_id: str, reading: dict[str, Any]) -> None:
    baseline = average_baseline(node_id, conn)
    for param, threshold, severity in (
        ("tds", 500, "warning"),
        ("turbidity", 6, "warning"),
        ("temperature", 28, "warning"),
    ):
        value = reading.get(param)
        if value is None:
            continue
        if baseline.get(param) not in (None, 0):
            delta = abs(metric_delta(value, baseline[param]))
            if value > threshold or delta > 25:
                create_alert_if_needed(
                    conn,
                    node_id,
                    param,
                    value,
                    baseline[param],
                    f"{param.upper()} deviated from baseline: {value} vs {baseline[param]}.",
                    "Inspect the node and confirm readings with a field check or laboratory sample.",
                    severity,
                )

    if reading.get("do") is not None and reading.get("do") < 5:
        create_alert_if_needed(
            conn,
            node_id,
            "do",
            reading["do"],
            baseline.get("do"),
            "Dissolved oxygen is below the safe operating range for the current monitoring period.",
            "Check aeration and reservoir conditions; confirm with field inspection and laboratory testing.",
            "critical",
        )


def serialize_alert(raw: sqlite3.Row) -> dict[str, Any]:
    return {
        "id": raw["id"],
        "node_id": raw["node_id"],
        "severity": raw["severity"],
        "parameter": raw["parameter"],
        "current_value": raw["current_value"],
        "baseline_value": raw["baseline_value"],
        "explanation": raw["explanation"],
        "recommended_action": raw["recommended_action"],
        "status": raw["status"],
        "created_at": raw["created_at"],
        "acknowledged_at": raw["acknowledged_at"],
        "resolved_at": raw["resolved_at"],
    }


def get_node_payload(conn: sqlite3.Connection, node_row: sqlite3.Row) -> dict[str, Any]:
    node_id = node_row["node_id"]
    latest = get_latest_reading(conn, node_id)
    score = score_node(node_id, conn)
    active_alerts = conn.execute(
        "SELECT * FROM alerts WHERE node_id = ? AND status != 'resolved' ORDER BY created_at DESC",
        (node_id,),
    ).fetchall()
    return {
        "id": node_id,
        "label": node_row["label"],
        "location": node_row["location"],
        "latitude": node_row["latitude"],
        "longitude": node_row["longitude"],
        "battery": node_row["battery"],
        "status": node_row["status"],
        "last_reading": dict(latest) if latest else None,
        "readings": dict(latest) if latest else {},
        "history": get_history(conn, node_id),
        "alerts": [serialize_alert(row) for row in active_alerts],
        "anomaly_score": score["anomaly_score"],
        "water_quality_score": score["water_quality_score"],
        "health": "online" if latest else "offline",
        "data_source": latest["data_source"] if latest else "offline",
    }


@app.on_event("startup")
def startup_event() -> None:
    ensure_schema()


@app.get("/api/health")
def api_health() -> dict[str, Any]:
    with get_connection() as conn:
        nodes = conn.execute("SELECT COUNT(*) AS count FROM nodes").fetchone()["count"]
        alerts = conn.execute("SELECT COUNT(*) AS count FROM alerts WHERE status != 'resolved'").fetchone()["count"]
        return {"status": "ok", "nodes": nodes, "active_alerts": alerts, "database": str(DB_PATH), "timestamp": utc_now()}


@app.post("/api/voice/hindi")
def synthesize_hindi(payload: HindiSpeechPayload) -> Response:
    if not is_hindi_tts_enabled():
        raise HTTPException(
            status_code=503,
            detail="Hindi cloud speech is disabled. Configure JAL_RAKSHA_TTS_ENABLED and Google Cloud credentials.",
        )
    try:
        audio = synthesize_hindi_audio(payload.text, payload.speaking_rate)
    except VoiceTTSConfigurationError as error:
        logger.warning("Hindi speech service configuration is incomplete: %s", error)
        raise HTTPException(status_code=503, detail=str(error)) from error
    except VoiceTTSError as error:
        logger.exception("Hindi speech generation failed")
        raise HTTPException(status_code=502, detail=str(error)) from error

    return Response(
        content=audio,
        media_type="audio/mpeg",
        headers={"Cache-Control": "no-store"},
    )


@app.get("/api/nodes")
def list_nodes() -> list[dict[str, Any]]:
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM nodes ORDER BY node_id").fetchall()
        return [get_node_payload(conn, row) for row in rows]


@app.get("/api/nodes/{node_id}")
def get_node(node_id: str) -> dict[str, Any]:
    with get_connection() as conn:
        node = find_node(conn, node_id)
        return get_node_payload(conn, node)


@app.get("/api/nodes/{node_id}/readings")
def get_node_readings(node_id: str, limit: int = Query(24, ge=1, le=200)) -> list[dict[str, Any]]:
    with get_connection() as conn:
        find_node(conn, node_id)
        return get_history(conn, node_id, limit)


@app.get("/api/readings")
def list_readings() -> list[dict[str, Any]]:
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM sensor_readings ORDER BY timestamp DESC LIMIT 200").fetchall()
        return [dict(row) for row in rows]


@app.post("/api/readings")
def create_reading(payload: ReadingPayload) -> dict[str, Any]:
    with get_connection() as conn:
        if payload.node_id:
            find_node(conn, payload.node_id)
        timestamp = payload.timestamp or utc_now()
        reading_id = str(uuid.uuid4())
        conn.execute(
            "INSERT INTO sensor_readings(id, node_id, timestamp, data_source, tds, turbidity, temperature, ph, do) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                reading_id,
                payload.node_id,
                timestamp,
                payload.data_source,
                payload.tds,
                payload.turbidity,
                payload.temperature,
                payload.ph,
                payload.do,
            ),
        )
        evaluate_reading(
            conn,
            payload.node_id,
            {
                "tds": payload.tds,
                "turbidity": payload.turbidity,
                "temperature": payload.temperature,
                "ph": payload.ph,
                "do": payload.do,
            },
        )
        conn.commit()
        return {"status": "ok", "message": "Reading accepted", "id": reading_id, "node_id": payload.node_id, "timestamp": timestamp}


@app.get("/api/alerts")
def list_alerts() -> list[dict[str, Any]]:
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM alerts ORDER BY created_at DESC").fetchall()
        return [serialize_alert(row) for row in rows]


@app.post("/api/alerts/{alert_id}/ack")
def acknowledge_alert(alert_id: str) -> dict[str, Any]:
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM alerts WHERE id = ?", (alert_id,)).fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Alert not found")
        if row["status"] == "resolved":
            raise HTTPException(status_code=400, detail="Resolved alerts cannot be acknowledged")
        conn.execute(
            "UPDATE alerts SET status = 'acknowledged', acknowledged_at = ? WHERE id = ?",
            (utc_now(), alert_id),
        )
        conn.commit()
        return {"status": "ok", "alert_id": alert_id, "status_updated": "acknowledged"}


@app.post("/api/alerts/{alert_id}/resolve")
def resolve_alert(alert_id: str) -> dict[str, Any]:
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM alerts WHERE id = ?", (alert_id,)).fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Alert not found")
        conn.execute(
            "UPDATE alerts SET status = 'resolved', resolved_at = ? WHERE id = ?",
            (utc_now(), alert_id),
        )
        conn.commit()
        return {"status": "ok", "alert_id": alert_id, "status_updated": "resolved"}


@app.get("/api/health/sensors")
def get_sensor_health() -> dict[str, Any]:
    with get_connection() as conn:
        rows = conn.execute("SELECT node_id FROM nodes").fetchall()
        output = []
        for row in rows:
            node_id = row["node_id"]
            latest = get_latest_reading(conn, node_id)
            output.append({
                "node_id": node_id,
                "status": "connected" if latest else "offline",
                "latest_update": latest["timestamp"] if latest else None,
                "data_quality": "good" if latest else "poor",
                "calibration_status": "valid" if latest else "not_calibrated",
            })
        return {"status": "ok", "nodes": output}


@app.get("/api/calibration")
def list_calibration_records() -> list[dict[str, Any]]:
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM calibration_records ORDER BY created_at DESC").fetchall()
        return [dict(row) for row in rows]


@app.post("/api/calibration")
def create_calibration_record(payload: CalibrationPayload) -> dict[str, Any]:
    with get_connection() as conn:
        find_node(conn, payload.node_id)
        difference = abs((payload.observed - payload.reference) / payload.reference * 100.0) if payload.reference else 0.0
        record_id = str(uuid.uuid4())
        conn.execute(
            "INSERT INTO calibration_records(id, node_id, sensor, reference, observed, difference, result, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (record_id, payload.node_id, payload.sensor, payload.reference, payload.observed, difference, payload.result, utc_now()),
        )
        conn.commit()
        return {
            "status": "ok",
            "record_id": record_id,
            "sensor": payload.sensor,
            "node_id": payload.node_id,
            "reference": payload.reference,
            "observed": payload.observed,
            "difference_percent": round(difference, 2),
            "result": payload.result,
        }


@app.post("/api/demo/{scenario}")
def demo_scenario(scenario: str, node_id: Optional[str] = Query(default=None)) -> dict[str, Any]:
    allowed = {"tds", "sediment", "multi", "oxygen", "failure-disconnected", "failure-stale", "failure-constant", "failure-invalid"}
    if scenario not in allowed:
        raise HTTPException(status_code=400, detail=f"Unsupported scenario '{scenario}'")
    with get_connection() as conn:
        target = node_id or conn.execute("SELECT node_id FROM nodes ORDER BY node_id LIMIT 1").fetchone()["node_id"]
        find_node(conn, target)
        latest = get_latest_reading(conn, target) or {"tds": 300, "turbidity": 3, "temperature": 25, "ph": 7.2, "do": 8.1}
        updates = {
            "tds": 760,
            "sediment": 12.5,
            "multi": 680,
            "oxygen": 3.4,
            "failure-disconnected": 0,
            "failure-stale": latest.get("tds", 300),
            "failure-constant": 7.2,
            "failure-invalid": -100,
        }
        reading = {
            "tds": latest.get("tds", 300),
            "turbidity": latest.get("turbidity", 3),
            "temperature": latest.get("temperature", 25),
            "ph": latest.get("ph", 7.2),
            "do": latest.get("do", 8.1),
        }
        reading["tds"] = updates[scenario] if scenario in {"tds", "multi", "sediment"} else reading["tds"]
        if scenario == "sediment":
            reading["turbidity"] = 12.5
        if scenario == "oxygen":
            reading["do"] = 3.4
        if scenario in {"failure-disconnected", "failure-stale", "failure-constant", "failure-invalid"}:
            reading["tds"] = 75 if scenario == "failure-invalid" else reading["tds"]
            reading["turbidity"] = 5.5 if scenario == "failure-stale" else reading["turbidity"]
        payload = ReadingPayload(
            node_id=target,
            tds=reading["tds"],
            turbidity=reading["turbidity"],
            temperature=reading["temperature"],
            ph=reading["ph"],
            do=reading["do"],
            timestamp=utc_now(),
            data_source="demo",
        )
        return create_reading(payload)


@app.post("/api/demo/reset")
def demo_reset() -> dict[str, Any]:
    with get_connection() as conn:
        rows = conn.execute("SELECT node_id FROM nodes").fetchall()
        for row in rows:
            node_id = row["node_id"]
            conn.execute(
                "DELETE FROM alerts WHERE node_id = ? AND status != 'resolved'",
                (node_id,),
            )
            conn.execute(
                "DELETE FROM sensor_readings WHERE node_id = ? AND data_source = 'demo'",
                (node_id,),
            )
            conn.execute(
                "INSERT INTO sensor_readings(id, node_id, timestamp, data_source, tds, turbidity, temperature, ph, do) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    f"{node_id}-reset",
                    node_id,
                    utc_now(),
                    "demo",
                    {"JR-01": 285, "JR-02": 365, "JR-03": 612, "JR-04": 940, "JR-05": 318}.get(node_id, 300),
                    {"JR-01": 2.1, "JR-02": 3.8, "JR-03": 8.4, "JR-04": 18.2, "JR-05": 2.8}.get(node_id, 3.0),
                    {"JR-01": 25.4, "JR-02": 26.5, "JR-03": 28.1, "JR-04": 29.3, "JR-05": 24.9}.get(node_id, 25.0),
                    {"JR-01": 7.2, "JR-02": 7.1, "JR-03": 7.3, "JR-04": 7.0, "JR-05": 7.4}.get(node_id, 7.2),
                    {"JR-01": 8.2, "JR-02": 8.0, "JR-03": 7.8, "JR-04": 6.7, "JR-05": 8.5}.get(node_id, 8.0),
                ),
            )
        conn.commit()
        return {"status": "ok", "message": "Demo scenario reset to baseline readings"}


@app.get("/api/reports")
def generate_reports(node_id: Optional[str] = None) -> dict[str, Any]:
    with get_connection() as conn:
        if node_id:
            find_node(conn, node_id)
            row = get_node_payload(conn, find_node(conn, node_id))
            return {
                "node_id": node_id,
                "status": row["status"],
                "anomaly_score": row["anomaly_score"],
                "water_quality_score": row["water_quality_score"],
                "latest": row["last_reading"],
                "recommendation": "Inspect the node and confirm readings with on-site testing before issuing any operational action.",
            }
        rows = conn.execute("SELECT node_id FROM nodes").fetchall()
        return {"reports": [generate_reports(row["node_id"])["node_id"] for row in rows]}


@app.get("/api/export/csv")
def export_csv() -> Response:
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM sensor_readings ORDER BY timestamp DESC").fetchall()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["timestamp", "node_id", "data_source", "tds", "turbidity", "temperature", "ph", "do"])
    for row in rows:
        writer.writerow([
            row["timestamp"],
            row["node_id"],
            row["data_source"],
            row["tds"],
            row["turbidity"],
            row["temperature"],
            row["ph"],
            row["do"],
        ])
    return Response(content=output.getvalue(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=jal-raksha-export.csv"})


@app.get("/api/thingspeak/feeds")
def thingspeak_feeds_proxy(
    channel_id: Optional[str] = Query(default=None),
    results: int = Query(default=100, ge=1, le=800),
) -> dict[str, Any]:
    effective_channel = (channel_id or os.getenv("THINGSPEAK_CHANNEL_ID", "")).strip()
    if not effective_channel or not effective_channel.isdigit():
        raise HTTPException(
            status_code=400,
            detail="A numeric ThingSpeak channel_id must be provided via query param or THINGSPEAK_CHANNEL_ID env var.",
        )

    read_api_key = os.getenv("THINGSPEAK_READ_API_KEY", "").strip()
    params = {"results": str(results)}
    if read_api_key:
        params["api_key"] = read_api_key

    query_str = urllib.parse.urlencode(params)
    url = f"https://api.thingspeak.com/channels/{effective_channel}/feeds.json?{query_str}"

    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Jal-Raksha-AquaAI-Backend/1.0", "Accept": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            return json.loads(data.decode("utf-8"))
    except urllib.error.HTTPError as exc:
        if exc.code == 404:
            raise HTTPException(
                status_code=404,
                detail=f"ThingSpeak channel {effective_channel} not found, or channel is private and THINGSPEAK_READ_API_KEY is missing or invalid.",
            )
        raise HTTPException(
            status_code=exc.code,
            detail=f"ThingSpeak API responded with HTTP {exc.code}.",
        )
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to connect to ThingSpeak API: {exc}",
        )


ROOT_DIR = ROOT
app.mount("/", StaticFiles(directory=str(ROOT_DIR), html=True), name="static")
