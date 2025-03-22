// components/ReminderPopup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReminderPopup = () => {
  const [reminderTime, setReminderTime] = useState('');
  const navigate = useNavigate();

  const handleSaveReminder = () => {
    if (reminderTime) {
      console.log(`Reminder set for: ${reminderTime}`);
      navigate('/dashboard');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm animate-fadeIn">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Set Reminder</h3>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
        />
        <button
          onClick={handleSaveReminder}
          className="bg-hydra-blue text-white px-4 sm:px-6 py-1 sm:py-2 rounded-lg disabled:bg-gray-300"
          disabled={!reminderTime}
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 px-4 sm:px-6 py-1 sm:py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReminderPopup;