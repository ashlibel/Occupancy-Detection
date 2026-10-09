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

          {/* The Refresh status button and "Last checked" text will go here */}
          <div />
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