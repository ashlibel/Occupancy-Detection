const API_URL = 'http://127.0.0.1:8000';

// A reading older than this is treated as stale (the sensor may have stopped reporting).
const STALE_AFTER_MINUTES = 5;

// Turns the backend's `time` into a Date, or null if we can't.
function parseTime(value) {
  if (typeof value !== 'string') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

// Converts one backend row into the shape the frontend uses.
// If the backend's fields change, this is the ONLY function to edit.
function normalizeRoom(row) {
  const lastUpdated = parseTime(row.time);
  const isOld =
    lastUpdated === null ||
    Date.now() - lastUpdated.getTime() > STALE_AFTER_MINUTES * 60 * 1000;

  let status;
  if (isOld) {
    status = 'stale';
  } else {
    status = row.occupied ? 'occupied' : 'available';
  }

  return { status, lastUpdated };
}

// Fetches all rooms in one request and returns them keyed by room id.
export async function fetchRoomData(roomIds) {
  const staleRoom = { status: 'stale', lastUpdated: null };

  try {
    const res = await fetch(`${API_URL}/rooms/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json(); // [{ room_id, sensor_id, occupied, time }, ...]

    const byId = {};
    for (const row of rows) {
      byId[String(row.room_id)] = normalizeRoom(row);
    }

    // Every room on our map gets an entry; rooms the backend doesn't have are stale.
    return Object.fromEntries(roomIds.map((id) => [id, byId[id] ?? staleRoom]));
  } catch (err) {
    // Backend unreachable: show stale instead of a wrong answer.
    console.error('Could not load room data:', err);
    return Object.fromEntries(roomIds.map((id) => [id, staleRoom]));
  }
}
