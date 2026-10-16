// Automated unit test for ThingSpeak frontend logic in Jal Rakshak / AquaAI
const assert = require('assert');

function getThingSpeakMode(status) {
  const normalizedStatus = String(status || '').toUpperCase();
  if (/LIVE[_ -]HARDWARE/.test(normalizedStatus)) return 'LIVE HARDWARE';
  if (normalizedStatus.includes('SIMULATION')) return 'SIMULATION';
  return 'MODE NOT TAGGED';
}

function parseThingSpeakFeed(feed) {
  if (!feed || feed.field1 === null || feed.field1 === undefined || feed.field1 === ''
      || feed.field2 === null || feed.field2 === undefined || feed.field2 === '') {
    return null;
  }
  const rawTds = Number(feed.field1);
  const rawTurbidity = Number(feed.field2);
  if (!Number.isFinite(rawTds) || !Number.isFinite(rawTurbidity)) {
    return null;
  }
  const tdsAdc = Math.round(rawTds);
  const turbidityAdc = Math.round(rawTurbidity);
  if (tdsAdc < 0 || tdsAdc > 4095 || turbidityAdc < 0 || turbidityAdc > 4095) {
    return null;
  }
  const timestamp = Date.parse(feed.created_at);
  if (!Number.isFinite(timestamp)) return null;
  const status = String(feed.status || '');
  return {
    entryId: String(feed.entry_id || ''),
    tdsAdc,
    turbidityAdc,
    createdAt: timestamp,
    status,
    mode: getThingSpeakMode(status)
  };
}

function estimateThingSpeakVoltage(adcCount) {
  return `${(adcCount * 3.3 / 4095).toFixed(2)} V`;
}

function detectSuddenChanges(feeds, threshold = 900) {
  const events = [];
  for (let index = 1; index < feeds.length; index += 1) {
    const previous = feeds[index - 1];
    const current = feeds[index];
    const tdsDelta = Math.abs(current.tdsAdc - previous.tdsAdc);
    const turbidityDelta = Math.abs(current.turbidityAdc - previous.turbidityAdc);
    if (tdsDelta >= threshold) {
      events.push({ parameter: 'TDS', delta: tdsDelta, entryId: current.entryId });
    }
    if (turbidityDelta >= threshold) {
      events.push({ parameter: 'Turbidity', delta: turbidityDelta, entryId: current.entryId });
    }
  }
  return events;
}

// Tests
console.log('Running AquaAI Frontend ThingSpeak Unit Tests...');

// 1. Mode extraction
assert.strictEqual(getThingSpeakMode('AQUAAI-ESP32-01|SIMULATION'), 'SIMULATION');
assert.strictEqual(getThingSpeakMode('AQUAAI-ESP32-01|LIVE_HARDWARE'), 'LIVE HARDWARE');
assert.strictEqual(getThingSpeakMode('AQUAAI-ESP32-01|LIVE-HARDWARE'), 'LIVE HARDWARE');
assert.strictEqual(getThingSpeakMode('UNKNOWN'), 'MODE NOT TAGGED');
assert.strictEqual(getThingSpeakMode(''), 'MODE NOT TAGGED');
assert.strictEqual(getThingSpeakMode(null), 'MODE NOT TAGGED');
console.log('✔ Mode extraction tests passed.');

// 2. Feed parsing valid
const validFeed = {
  entry_id: 101,
  created_at: '2026-10-09T18:00:00Z',
  field1: '1500',
  field2: '2200',
  status: 'AQUAAI-ESP32-01|SIMULATION'
};
const parsed = parseThingSpeakFeed(validFeed);
assert.notStrictEqual(parsed, null);
assert.strictEqual(parsed.tdsAdc, 1500);
assert.strictEqual(parsed.turbidityAdc, 2200);
assert.strictEqual(parsed.mode, 'SIMULATION');
assert.strictEqual(parsed.entryId, '101');
console.log('✔ Valid feed parsing tests passed.');

// 3. Decimal and whitespace resilience
const decimalFeed = {
  entry_id: 102,
  created_at: '2026-10-09T18:00:20Z',
  field1: ' 1500.4 ',
  field2: ' 2199.7 ',
  status: 'AQUAAI-ESP32-01|LIVE_HARDWARE'
};
const parsedDec = parseThingSpeakFeed(decimalFeed);
assert.notStrictEqual(parsedDec, null);
assert.strictEqual(parsedDec.tdsAdc, 1500);
assert.strictEqual(parsedDec.turbidityAdc, 2200);
assert.strictEqual(parsedDec.mode, 'LIVE HARDWARE');
console.log('✔ Decimal/whitespace resilience tests passed.');

// 4. Invalid / out of bounds feeds rejected
assert.strictEqual(parseThingSpeakFeed(null), null);
assert.strictEqual(parseThingSpeakFeed({ field1: '', field2: '100' }), null);
assert.strictEqual(parseThingSpeakFeed({ field1: '4096', field2: '100', created_at: '2026-10-09T18:00:00Z' }), null);
assert.strictEqual(parseThingSpeakFeed({ field1: '-5', field2: '100', created_at: '2026-10-09T18:00:00Z' }), null);
assert.strictEqual(parseThingSpeakFeed({ field1: '100', field2: 'xyz', created_at: '2026-10-09T18:00:00Z' }), null);
assert.strictEqual(parseThingSpeakFeed({ field1: '100', field2: '200', created_at: 'invalid-date' }), null);
console.log('✔ Invalid feed rejection tests passed.');

// 5. Voltage calculation
assert.strictEqual(estimateThingSpeakVoltage(0), '0.00 V');
assert.strictEqual(estimateThingSpeakVoltage(4095), '3.30 V');
assert.strictEqual(estimateThingSpeakVoltage(2048), '1.65 V');
console.log('✔ Voltage estimation tests passed.');

// 6. Sudden change detection
const series = [
  { entryId: '1', tdsAdc: 1000, turbidityAdc: 1500 },
  { entryId: '2', tdsAdc: 1050, turbidityAdc: 1520 }, // delta +50, +20 (no alert)
  { entryId: '3', tdsAdc: 2100, turbidityAdc: 1550 }, // tds delta +1050 (ALERT)
  { entryId: '4', tdsAdc: 2100, turbidityAdc: 2600 }  // turbidity delta +1050 (ALERT)
];
const suddenAlerts = detectSuddenChanges(series, 900);
assert.strictEqual(suddenAlerts.length, 2);
assert.strictEqual(suddenAlerts[0].parameter, 'TDS');
assert.strictEqual(suddenAlerts[0].delta, 1050);
assert.strictEqual(suddenAlerts[1].parameter, 'Turbidity');
assert.strictEqual(suddenAlerts[1].delta, 1050);
console.log('✔ Sudden change detection tests passed.');

console.log('ALL FRONTEND TESTS PASSED SUCCESSFULLY! 🎉');
