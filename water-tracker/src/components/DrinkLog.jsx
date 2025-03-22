// components/DrinkLog.jsx
import React, { useState } from 'react';

const DrinkLog = ({ logWater, goalAchieved }) => {
  const [amount, setAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handlePresetLog = (presetAmount) => {
    logWater(presetAmount);
  };

  const handleCustomLog = () => {
    const waterAmount = parseInt(amount);
    if (!isNaN(waterAmount) && waterAmount > 0) {
      logWater(waterAmount);
      setAmount('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium text-gray-700 mb-2">Log Water Intake</h4>
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          onClick={() => handlePresetLog(250)}
          className="bg-hydra-blue text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
          disabled={goalAchieved}
        >
          250ml
        </button>
        <button
          onClick={() => handlePresetLog(500)}
          className="bg-hydra-blue text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
          disabled={goalAchieved}
        >
          500ml
        </button>
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          {showCustomInput ? 'Cancel Custom' : 'Add Custom'}
        </button>
      </div>
      {showCustomInput && (
        <div className="flex space-x-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in ml"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={goalAchieved}
          />
          <button
            onClick={handleCustomLog}
            className="bg-hydra-blue text-white px-6 py-2 rounded-lg disabled:bg-gray-300"
            disabled={goalAchieved || !amount}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default DrinkLog;