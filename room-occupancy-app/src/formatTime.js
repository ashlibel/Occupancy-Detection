// Turns a Date into text like "Updated 2 min ago".
// Returns "No update yet" if there is no time (for example, the sensor never reported).
export function formatLastUpdated(date) {
    if (!date) return 'No update yet';
  
    const minutes = Math.round((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Updated just now';
    if (minutes < 60) return `Updated ${minutes} min ago`;
  
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `Updated ${hours} hr ago`;
  
    const days = Math.round(hours / 24);
    return `Updated ${days} day${days === 1 ? '' : 's'} ago`;
  }