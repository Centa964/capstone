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
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm animate-fadeIn">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Set Reminder</h3>
      <div className="flex space-x-4">
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSaveReminder}
          className="bg-hydra-blue text-white px-6 py-2 rounded-lg disabled:bg-gray-300"
          disabled={!reminderTime}
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReminderPopup;