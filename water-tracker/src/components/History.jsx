// History.jsx
// Displays past water intake entries in a flat list with time only.
// Filters out entries older than 7 days.
import React from 'react';

const History = ({ history }) => {
  // Filter out entries older than 7 days (optional)
  const filteredHistory = history.filter((entry) => {
    const entryDate = new Date(entry.date);
    const today = new Date();
    const diffTime = Math.abs(today - entryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  return (
    <div>
      {filteredHistory.length === 0 ? (
        <p className="text-sm text-gray-600">No history yet.</p>
      ) : (
        <ul className="space-y-2">
          {filteredHistory.map((entry, index) => (
            <li key={index} className="flex items-center space-x-2 text-gray-600">
              {/* CHANGE: Adjust blue dot size */}
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              {/* CHANGE: Show only the time (e.g., "8:00 am"), adjust text size */}
              <span className="text-sm">
                {entry.amount} ml {entry.timestamp && entry.timestamp.includes(', ') ? entry.timestamp.split(', ')[1].toLowerCase() : 'Invalid time'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;