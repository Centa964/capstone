// Activity.jsx
// Displays the user's water intake progress with a dynamic progress bar.
// Shows a success message when the goal is achieved.
import React from 'react';

// components/Activity.jsx
const Activity = ({ intake, goal, goalAchieved }) => {
  const progress = goal ? (intake / goal) * 100 : 0;
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">My Activity</h3>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">Today Intake</p>
          <p className="text-2xl font-bold text-blue-600">{intake} ml</p>
          <p className="text-sm text-gray-500">Intake Goal: {intake} ml / {goal} ml</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Goal</p>
          <p className="text-2xl font-bold text-blue-600">{goal} ml</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${goalAchieved ? 'bg-green-500' : 'bg-blue-600'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {goalAchieved && (
        <p className="text-green-500 text-base mt-4">Goal achieved! 🎉</p>
      )}
    </div>
  );
};


export default Activity;