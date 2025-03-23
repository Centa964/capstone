//displays the user's water intake progress on the Dashboard.

import React from 'react';

const Activity = ({ intake, goal, goalAchieved }) => {
  const percentage = goal && goal > 0 ? Math.min((intake / goal) * 100, 100) : 0;
  const displayedIntake = goal && goal > 0 ? Math.min(intake, goal) : intake;

  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Activity</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Daily Goal: {goal ? `${goal}ml` : 'Not set'}</p>
        <p className="text-sm text-gray-600">Intake: {displayedIntake}ml</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-4">
        <div
          className={`h-3 sm:h-4 rounded-full transition-all duration-500 ${
            goalAchieved ? 'bg-green-500' : 'bg-hydra-blue'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {goalAchieved && (
        <p className="text-green-500 text-sm font-medium">Goal Achieved! Great job staying hydrated!</p>
      )}
    </div>
  );
};

export default Activity;