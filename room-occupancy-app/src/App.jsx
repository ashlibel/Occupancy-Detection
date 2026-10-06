import FloorPlan from './FloorPlan'; // Import the FloorPlan component

export default function App() {
  return (
    // Main page container
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          {/* Page title */}
          <h1 className="text-2xl font-semibold tracking-tight">
            SDSU Love Library, 4th floor
          </h1>

          {/* Page description */}
          <p className="mt-1 text-slate-600">
            Study Room Occupancy Status
          </p>
        </div>
      </header>

      {/* Main page content */}
      <main className="mx-auto max-w-6xl px-6 py-6">
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          {/* Display the floor plan */}
          <FloorPlan />
        </section>
      </main>
    </div>
  );
}