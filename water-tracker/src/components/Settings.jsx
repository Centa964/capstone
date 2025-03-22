// components/Settings.jsx
// Allows the user to set a water intake goal and reset all progress.
// Includes a confirmation popup for resetting.
import React, { useState } from 'react';

const Settings = ({ setGoal, resetProgress, resetProgressWithoutGoal, setShowResetConfirm }) => {
  const [newGoal, setNewGoal] = useState('');

  const handleSetGoal = () => {
    if (newGoal && !isNaN(newGoal) && parseInt(newGoal) > 0) {
      console.log('Setting new goal:', parseInt(newGoal));
      setGoal(parseInt(newGoal));
      resetProgressWithoutGoal();
      setShowResetConfirm(false); // Ensure any open reset confirmation popup is closed
      // CHANGE: Remove redundant setGoal call
      // CHANGE: Remove setTimeout and dispatch the event directly
      window.dispatchEvent(new CustomEvent('setLogMessage', { detail: 'Goal saved!' }));
      setNewGoal('');
    } else {
      console.log('Invalid goal input:', newGoal);
      window.dispatchEvent(new CustomEvent('setLogMessage', { detail: 'Please enter a valid goal!' }));
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Settings</h3>
      <div className="flex space-x-4 items-center">
        <input
          type="number"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Set water goal (ml)"
          className="border rounded-lg px-4 py-2 focus:outline-none"
          min="1"
        />
        <button
          onClick={handleSetGoal}
          className="bg-hydra-blue text-white px-4 py-2 rounded-lg"
        >
          Save Goal
        </button>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// CHANGE: Update export to match the import in App.jsx
export default Settings;