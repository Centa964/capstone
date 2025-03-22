// DrinkLog.jsx
// Allows the user to log water intake with predefined buttons (+250ml, +500ml) or a custom amount.
// Displays a modal for custom input and shows a temporary log message after submission.
import React, { useState } from 'react';

const DrinkLog = ({ logWater, goalAchieved, logMessage }) => {
  const [showModal, setShowModal] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const handleCustomLog = () => {
    if (customAmount && !isNaN(customAmount)) {
      logWater(parseInt(customAmount));
      setShowModal(false);
      setCustomAmount('');
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Log Intake</h3>
      <div className="flex space-x-4" >
        <button
          onClick={() => logWater(250)}
          disabled={goalAchieved}
          className={`px-4 py-2 rounded-lg text-white ${
            goalAchieved ? 'bg-gray-400' : 'bg-hydra-blue'
          }`}
        >
          +250ml
        </button>
        <button
          onClick={() => logWater(500)}
          disabled={goalAchieved}
          className={`px-4 py-2 rounded-lg text-white ${
            goalAchieved ? 'bg-gray-400' : 'bg-hydra-blue'
          }`}
        >
          +500ml
        </button>
        <button
          onClick={() => setShowModal(true)}
          disabled={goalAchieved}
          className={`px-4 py-2 rounded-lg text-white ${
            goalAchieved ? 'bg-gray-400' : 'bg-hydra-blue'
          }`}
        >
          Add Custom
        </button>
      </div>
      {logMessage && (
        <p className="text-hydra-blue mt-4">{logMessage}</p>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Enter Custom Amount</h4>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount in ml"
              className="border rounded-lg px-4 py-2 mb-4 w-full"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleCustomLog}
                className="bg-hydra-blue text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkLog;