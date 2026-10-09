import FloorPlan from './FloorPlan'; // Import the FloorPlan component
import { useState } from 'react';
import StatusLegend from './StatusLegend';
import StudyRoomList from './StudyRoomList';

export default function App() {

  // TEMPORARY: hardcoded values just to test. This gets replaced by real data later.
  const [roomData] = useState({
    '418': { status: 'occupied', lastUpdated: new Date(Date.now() - 2 * 60 * 1000) },
    '420': { status: 'available', lastUpdated: new Date(Date.now() - 1 * 60 * 1000) },
    '422': { status: 'stale', lastUpdated: new Date(Date.now() - 25 * 60 * 1000) },
  });

  // Placeholder: this will fetch fresh room data from the backend later
  function handleRefresh() {
    console.log('Refresh clicked');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 px-6 py-3">
          <div>
            {/* Page title */}
            <h1 className="text-2xl font-semibold tracking-tight">
              SDSU Love Library, 4th floor
            </h1>

            {/* Page description */}
            <p className="mt-1 text-slate-600">Study Room Occupancy Status</p>
          </div>
          {/* Refresh button (placeholder, doesn't update anything yet) */}
          <button
            type="button"
            onClick={handleRefresh}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-red-700 px-5 py-3 font-medium text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            {/* Refresh icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Refresh status
          </button>
        </div>
      </header>

      <main className="grid gap-6 px-5 py-3 lg:grid-cols-[320px_1fr]">
        {/* Left column: legend and room list */}
        <aside className="flex flex-col gap-4">
            <StatusLegend />
            <StudyRoomList roomData={roomData} />
        </aside>

        {/* Right column: floor plan */}
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <FloorPlan roomData={roomData} />
        </section>
      </main>
    </div>
  );
}