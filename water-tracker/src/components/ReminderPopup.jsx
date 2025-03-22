// ReminderPopup.jsx
// Displays a timed reminder to drink water, dismissable by the user.
import React from 'react';

const ReminderPopup = ({ setShowReminder }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-700 mb-4">💧 Time to drink more water!</p>
        <button
          onClick={() => setShowReminder(false)}
          className="bg-hydra-blue text-white px-4 py-2 rounded-lg"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default ReminderPopup;