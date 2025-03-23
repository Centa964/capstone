//displays water intake history
import React from 'react';

const History = ({ history }) => {
  const groupedHistory = history.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">History</h3>
      {Object.keys(groupedHistory).length === 0 ? (
        <p className="text-sm text-gray-600">No history available.</p>
      ) : (
        Object.keys(groupedHistory).map((date) => (
          <div key={date} className="mb-4">
            <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-2">{date}</h4>
            <ul className="space-y-1 sm:space-y-2">
              {groupedHistory[date].map((entry, index) => (
                <li key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">
                    {entry.timestamp}: Drank {entry.amount}ml
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default History;