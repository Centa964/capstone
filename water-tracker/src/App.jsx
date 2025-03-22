// App.jsx
import React, { useState, useEffect } from 'react';
import Activity from './components/Activity';
import Header from './components/Header';
import DrinkLog from './components/DrinkLog';
import Settings from './components/Settings';
import ReminderPopup from './components/ReminderPopup';
import History from './components/History';
import { FaTachometerAlt, FaBell, FaHistory, FaCog } from 'react-icons/fa';

const App = () => {
  const [intake, setIntake] = useState(0);
  const [goal, setGoal] = useState(null);
  const [history, setHistory] = useState([]);
  const [showReminder, setShowReminder] = useState(false);
  const [logMessage, setLogMessage] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedGoal = localStorage.getItem('waterGoal');
      const savedIntake = localStorage.getItem('waterIntake');
      const savedHistory = localStorage.getItem('waterHistory');
      console.log('Loading from localStorage - Goal:', savedGoal, 'Intake:', savedIntake);
      if (savedGoal) setGoal(parseInt(savedGoal));
      if (savedIntake) setIntake(parseInt(savedIntake));
      if (savedHistory) setHistory(JSON.parse(savedHistory) || []);
    } catch (err) {
      console.error('Error loading from local storage:', err);
      setError('Failed to load data from local storage.');
    }
  }, []);

  useEffect(() => {
    try {
      console.log('Saving to localStorage - Goal:', goal, 'Intake:', intake);
      if (goal !== null) localStorage.setItem('waterGoal', goal);
      localStorage.setItem('waterIntake', intake);
      localStorage.setItem('waterHistory', JSON.stringify(history));
    } catch (err) {
      console.error('Error saving to local storage:', err);
      setError('Failed to save data to local storage.');
    }
  }, [goal, intake, history]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowReminder(true);
    }, 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleSetLogMessage = (event) => {
      setLogMessage(event.detail);
      setTimeout(() => setLogMessage(''), 2000);
    };

    window.addEventListener('setLogMessage', handleSetLogMessage);
    return () => window.removeEventListener('setLogMessage', handleSetLogMessage);
  }, []);

  const logWater = (amount) => {
    try {
      const timestamp = new Date().toLocaleString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const newEntry = { amount, timestamp, date: new Date().toISOString().split('T')[0] };
      setHistory((prevHistory) => [...prevHistory, newEntry]);
      setIntake((prevIntake) => prevIntake + amount);
      setLogMessage(`${amount}ml logged!`);
      setTimeout(() => setLogMessage(''), 2000);
    } catch (err) {
      console.error('Error logging water:', err);
      setError('Failed to log water intake.');
    }
  };

  const resetProgress = () => {
    try {
      console.log('Resetting progress - Setting intake and goal to 0');
      setIntake(0);
      setGoal(0);
      setHistory([]);
      localStorage.setItem('waterGoal', '0');
      localStorage.setItem('waterIntake', '0');
      localStorage.setItem('waterHistory', JSON.stringify([]));
      setLogMessage('Progress reset successfully!');
      setTimeout(() => setLogMessage(''), 2000);
    } catch (err) {
      console.error('Error resetting progress:', err);
      setError('Failed to reset progress.');
    }
  };

  const resetProgressWithoutGoal = () => {
    try {
      console.log('Resetting progress without affecting goal - Setting intake to 0');
      setIntake(0);
      setHistory([]);
      localStorage.setItem('waterIntake', '0');
      localStorage.setItem('waterHistory', JSON.stringify([]));
    } catch (err) {
      console.error('Error resetting progress without goal:', err);
      setError('Failed to reset progress without goal.');
    }
  };

  const goalAchieved = goal !== null && goal > 0 && intake >= goal;

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl text-red-500">Error: {error}</h1>
        <p>Please check the console for more details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="flex h-[calc(100vh-72px)]">
        {/* Left Sidebar */}
        {/* CHANGE: Adjust background, add cards for navigation and footer */}
        <aside className="w-1/5 bg-gray-50 p-6 flex flex-col justify-between">
          {/* Navigation Card */}
          <div className="bg-pink-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Menu</h2>
            <nav className="flex flex-col space-y-4">
              <a href="#" className="flex items-center space-x-2 text-gray-600 uppercase font-semibold">
                <FaTachometerAlt className="w-4 h-4 text-gray-600" />
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 uppercase">
                <FaBell className="w-4 h-4 text-gray-600" />
                <span>Reminder</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 uppercase">
                <FaHistory className="w-4 h-4 text-gray-600" />
                <span>History</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 uppercase">
                <FaCog className="w-4 h-4 text-gray-600" />
                <span>Settings</span>
              </a>
            </nav>
          </div>

          {/* Footer Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm text-gray-500 text-xs">
            <p>Fortunes</p>
            <p>fortunes@success.com</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-3/5 p-6 relative">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back Fortunes!</h1>
          <Activity intake={intake} goal={goal} goalAchieved={goalAchieved} />
          <DrinkLog logWater={logWater} goalAchieved={goalAchieved} logMessage={logMessage} />
          <Settings
            setGoal={setGoal}
            resetProgress={resetProgress}
            resetProgressWithoutGoal={resetProgressWithoutGoal}
            setShowResetConfirm={setShowResetConfirm}
          />
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Hydration Tips</h3>
            <p className="text-base text-gray-600 mb-4">Consuming Fruit Juices Helps Keep Your Hydration Level Up!</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-base font-semibold text-gray-700 mb-1">Watermelon</h4>
                <p className="text-sm text-gray-600">A good choice to stay hydrated. It contains 97% water.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-base font-semibold text-gray-700 mb-1">Grapes</h4>
                <p className="text-sm text-gray-600">It contains vitamin C, that aids in water retention.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-base font-semibold text-gray-700 mb-1">Oranges</h4>
                <p className="text-sm text-gray-600">It contains 72% water. It helps in skin care.</p>
              </div>
            </div>
          </div>
          {showReminder && <ReminderPopup setShowReminder={setShowReminder} />}
          {showResetConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg text-gray-700 mb-4">Are you sure? This will erase all progress!</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      resetProgress();
                      setShowResetConfirm(false);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Yes, reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {logMessage && (
            <div className="fixed top-4 right-4 bg-hydra-blue text-white px-4 py-2 rounded-lg shadow-lg z-50">
              {logMessage}
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/5 bg-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">History</h3>
            <History history={history} />
          </div>
          <div className="text-gray-600 text-center">
            <p className="font-medium text-sm">Stay Hydrated & Beat Heat</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;