import floorplanUrl from './assets/floorplan.png';

export default function FloorPlan() {
  return (
    <svg
      viewBox="0 0 740 550"
      role="img"
      aria-label="Floor plan of Love Library, 4th floor"
      className="h-auto w-full"
    >
      <image href={floorplanUrl} x="0" y="0" width="740" height="550" />
    </svg>
  );
}