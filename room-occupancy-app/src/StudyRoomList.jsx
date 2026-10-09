import { ROOMS } from './rooms';
import { STATUS_STYLES } from './FloorPlan';
import { formatLastUpdated } from './formatTime';

export default function StudyRoomList({ roomData }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-semibold">Study Rooms</h2>

      <ul className="mt-3 space-y-2">
        {ROOMS.map((room) => {
          // Same lookup the map uses: fall back to "checking" if there's no data yet
          const status = roomData[room.id]?.status ?? 'checking';
          const style = STATUS_STYLES[status];

          return (
            <li
              key={room.id}
              className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2"
            >
              {/* Colored dot that matches the room color on the map */}
              <span
                className="inline-block h-4 w-4 shrink-0 rounded-full"
                style={{ backgroundColor: style.fill }}
              />

              {/* Room number and name */}
              <div className="min-w-0 flex-1">
                <p className="font-medium">{room.label}</p>
                <p className="text-sm text-slate-600">
                    {formatLastUpdated(roomData[room.id]?.lastUpdated)}
                </p>
              </div>

              {/* Status in words, so the color isn't the only signal */}
              <span className="text-sm text-slate-700">{style.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}