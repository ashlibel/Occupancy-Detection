// All communication with the backend lives in this file.
// The rest of the app only ever sees this shape:
//   { '418': { status: 'occupied', lastUpdated: Date or null }, ... }
// where status is 'available' | 'occupied' | 'stale'

const API_URL = import.meta.env.VITE_API_URL;

// A reading older than this is treated as stale (the sensor may have stopped reporting).
// TODO: agree on this number with the group. It should be several times longer
// than how often the sensor sends a reading.
const STALE_AFTER_MINUTES = 5;

// Turns the backend's `time` into a Date, or null if we can't.
// The backend is switching `time` from an integer to a datetime. Until then an
// integer can't be turned into a real date, so we treat it as "no time".
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
    lastUpdated !== null &&
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

  if (!API_URL) {
    console.warn('VITE_API_URL is not set. Create .env.local (see Step 4).');
  }

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
