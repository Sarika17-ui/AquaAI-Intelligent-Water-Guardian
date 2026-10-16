import json
import os
import unittest
from io import BytesIO
from unittest.mock import MagicMock, patch
import urllib.error

from fastapi import HTTPException
from main import thingspeak_feeds_proxy


class TestThingSpeakProxy(unittest.TestCase):
    def test_missing_channel_id_raises_400(self):
        with patch.dict(os.environ, {"THINGSPEAK_CHANNEL_ID": ""}):
            with self.assertRaises(HTTPException) as ctx:
                thingspeak_feeds_proxy(channel_id=None)
            self.assertEqual(ctx.exception.status_code, 400)
            self.assertIn("numeric ThingSpeak channel_id", ctx.exception.detail)

    def test_invalid_channel_id_raises_400(self):
        with self.assertRaises(HTTPException) as ctx:
            thingspeak_feeds_proxy(channel_id="not-a-number")
        self.assertEqual(ctx.exception.status_code, 400)
        self.assertIn("numeric ThingSpeak channel_id", ctx.exception.detail)

    @patch("urllib.request.urlopen")
    def test_successful_public_fetch(self, mock_urlopen):
        mock_payload = {
            "channel": {"id": 12345, "name": "AquaAI ESP32 Monitor"},
            "feeds": [
                {
                    "created_at": "2026-10-09T18:00:00Z",
                    "entry_id": 1,
                    "field1": "1420",
                    "field2": "2180",
                    "status": "AQUAAI-ESP32-01|SIMULATION",
                }
            ],
        }
        mock_response = MagicMock()
        mock_response.read.return_value = json.dumps(mock_payload).encode("utf-8")
        mock_response.__enter__.return_value = mock_response
        mock_urlopen.return_value = mock_response

        data = thingspeak_feeds_proxy(channel_id="12345", results=10)
        self.assertIn("channel", data)
        self.assertEqual(len(data["feeds"]), 1)
        self.assertEqual(data["feeds"][0]["field1"], "1420")

    @patch("urllib.request.urlopen")
    def test_private_channel_key_appended(self, mock_urlopen):
        mock_payload = {"channel": {"id": 99999}, "feeds": []}
        mock_response = MagicMock()
        mock_response.read.return_value = json.dumps(mock_payload).encode("utf-8")
        mock_response.__enter__.return_value = mock_response
        mock_urlopen.return_value = mock_response

        with patch.dict(os.environ, {"THINGSPEAK_READ_API_KEY": "SECRET_READ_KEY"}):
            data = thingspeak_feeds_proxy(channel_id="99999")
            self.assertIn("channel", data)
            args, _ = mock_urlopen.call_args
            req = args[0]
            self.assertIn("api_key=SECRET_READ_KEY", req.full_url)

    @patch("urllib.request.urlopen")
    def test_thingspeak_404_handled(self, mock_urlopen):
        mock_urlopen.side_effect = urllib.error.HTTPError(
            url="https://api.thingspeak.com",
            code=404,
            msg="Not Found",
            hdrs={},
            fp=BytesIO(b"Not Found"),
        )
        with self.assertRaises(HTTPException) as ctx:
            thingspeak_feeds_proxy(channel_id="12345")
        self.assertEqual(ctx.exception.status_code, 404)
        self.assertIn("not found, or channel is private", ctx.exception.detail)

    @patch("urllib.request.urlopen")
    def test_thingspeak_network_error_handled(self, mock_urlopen):
        mock_urlopen.side_effect = urllib.error.URLError("Connection timed out")
        with self.assertRaises(HTTPException) as ctx:
            thingspeak_feeds_proxy(channel_id="12345")
        self.assertEqual(ctx.exception.status_code, 502)
        self.assertIn("Failed to connect to ThingSpeak API", ctx.exception.detail)


if __name__ == "__main__":
    unittest.main()
