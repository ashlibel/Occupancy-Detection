import floorplanUrl from './assets/floorplan.png'; // Import the 4th floor love library floor plan image

import { ROOMS } from './rooms'; // Import the info/dimensions for each study room

export default function FloorPlan() {
    return (
        // Create the floor plan using SVG
        <svg
            viewBox="0 0 740 550"
            role="img"
            aria-label="Floor plan of Love Library, 4th floor"
            className="h-auto w-full"
        >
            {/* Display the floor plan image */}
            <image
                href={floorplanUrl}
                width="740"
                height="550"
            />

            {/* Draw an outline around each study room */}
            {ROOMS.map((room) => (
                <g key={room.id}>
                    <title>{`Room ${room.label}`}</title>
                    {/* Create the room outline */}
                    <rect
                        x={room.x}
                        y={room.y}
                        width={room.width}
                        height={room.height}
                        rx="2"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="2"
                    />
                </g>
            ))}
        </svg>
    );
}