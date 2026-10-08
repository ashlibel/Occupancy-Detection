// Import the 4th floor love library floor plan image
import floorplanUrl from './assets/floorplan.png'; 

// Import the info/dimensions for each study room
import { ROOMS } from './rooms'; 

// Styling for the occupancy status of the rooms
export const STATUS_STYLES = {
    available: {fill: '#15803d', stroke: '#14532d', label: 'Available'},
    occupied: {fill: '#b91c1c', stroke: '#7f1d1d', label: 'Occupied'},
    stale: {fill: '#f59e0b', stroke: '#b45309', label: 'Out of date'},
    checking: {fill: '#64748b', stroke: '#334155', label: 'Checking...'},
};

export default function FloorPlan({roomData}) {
    return (
        // Create the floor plan using SVG
        <svg
            viewBox="0 0 740 550"
            role="img"
            aria-label="Floor plan of Love Library, 4th floor"
            className="mx-auto h-auto max-h-[calc(100vh-12rem)] w-full"
        >
            {/* Display the floor plan image */}
            <image
                href={floorplanUrl}
                width="740"
                height="550"
            />

            {/* Draw an outline around each study room */}
            {ROOMS.map((room) => {
                const status = roomData[room.id]?.status ?? 'checking';
                const style = STATUS_STYLES[status];

                return(
                    <g key={room.id}>
                    <title>{`Room ${room.label}: ${style.label}`}</title>
                    {/* Create the room outline */}
                    <rect
                        x={room.x}
                        y={room.y}
                        width={room.width}
                        height={room.height}
                        rx="2"
                        fill={style.fill}
                        stroke={style.stroke}
                        strokeWidth="1.5"
                    />
                </g>
                );
            })}
        </svg>
    );
}