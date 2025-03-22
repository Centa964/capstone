// components/Settings.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkLog from './DrinkLog';

const Settings = ({ setGoal, resetProgress, resetProgressWithoutGoal, setShowResetConfirm, logWater, goalAchieved, logMessage }) => {
  const [newGoal, setNewGoal] = useState('');
  const navigate = useNavigate();

  const handleSaveGoal = () => {
    const goalValue = parseInt(newGoal);
    if (!isNaN(goalValue) && goalValue > 0) {
      setGoal(goalValue);
      setNewGoal('');
      navigate('/dashboard');
    }
  };

  const handleLogWater = (amount) => {
    logWater(amount);
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Settings</h3>
      {/* Set Daily Goal Section */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Set Daily Goal</h4>
        <div className="flex space-x-4">
          <input
            type="number"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Set daily goal (ml)"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSaveGoal}
            className="bg-hydra-blue text-white px-6 py-2 rounded-lg disabled:bg-gray-300"
            disabled={!newGoal}
          >
            Save Goal
          </button>
        </div>
      </div>
      {/* Log Water Intake Section */}
      <DrinkLog logWater={handleLogWater} goalAchieved={goalAchieved} />
      {/* Reset Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          Reset Progress
        </button>
        <button
          onClick={resetProgressWithoutGoal}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg"
        >
          Reset Without Goal
        </button>
      </div>
    </div>
  );
};

export default Settings;