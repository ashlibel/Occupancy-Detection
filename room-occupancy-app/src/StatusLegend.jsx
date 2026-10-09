import { STATUS_STYLES } from './FloorPlan';

const LEGEND_STATUSES = ['available', 'occupied', 'stale'];

export default function StatusLegend() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-semibold">Status Legend</h2>

      <ul className="mt-3 space-y-3">
        {LEGEND_STATUSES.map((status) => {
          const style = STATUS_STYLES[status];
          return (
            <li key={status} className="flex items-start gap-3">
              {/* Colored dot that matches the room color on the map */}
              <span
                className="mt-1 inline-block h-4 w-4 rounded-full"
                style={{ backgroundColor: style.fill }}
              />
              <div>
                <p className="font-medium">{style.label}</p>
                <p className="text-sm text-slate-600">{style.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}