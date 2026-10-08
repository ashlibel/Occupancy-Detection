import FloorPlan from './FloorPlan'; // Import the FloorPlan component
import { useState } from 'react';

export default function App() {

  // TEMPORARY: Hardcoded values just to test the occupancy status colors
  const [roomData] = useState({
    '418': { status: 'occupied' },
    '420': { status: 'available' },
    '422': { status: 'stale' },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 px-6 py-5">
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

      <main className="grid gap-6 px-5 py-6 lg:grid-cols-[320px_1fr]">
        {/* Left column: legend and room list */}
        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            Status Legend
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            Study Rooms list
          </div>
        </aside>

        {/* Right column: floor plan */}
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <FloorPlan roomData={roomData} />
        </section>
      </main>
    </div>
  );
}