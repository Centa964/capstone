// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { FaTachometerAlt, FaBell, FaHistory, FaCog } from 'react-icons/fa';
import { GiWatermelon, GiGrapes, GiOrange } from 'react-icons/gi';
import Header from './components/Header';
import Activity from './components/Activity';
import DrinkLog from './components/DrinkLog';
import Settings from './components/Settings';
import ReminderPopup from './components/ReminderPopup';
import History from './components/History';

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
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans h-screen overflow-hidden">
        <Header />
        <div className="flex h-[calc(100vh-72px)]">
          {/* Left Sidebar */}
          <aside className="w-1/5 bg-gray-50 p-6 mt-4 flex flex-col justify-between border-r border-gray-200">
            <div>
              {/* Menu Card */}
              <div className="bg-pink-100 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Menu</h2>
                <nav className="flex flex-col space-y-4">
                  <NavLink
                    to="/dashboard"
                    className="flex items-center space-x-2 uppercase font-semibold px-2 py-1 rounded text-gray-600"
                    activeClassName="text-hydra-blue bg-hydra-blue/10"
                  >
                    <FaTachometerAlt className="w-4 h-4 text-gray-600" />
                    <span>Dashboard</span>
                  </NavLink>
                  <NavLink
                    to="/reminder"
                    className="flex items-center space-x-2 uppercase px-2 py-1 rounded text-gray-600"
                    activeClassName="text-hydra-blue bg-hydra-blue/10"
                  >
                    <FaBell className="w-4 h-4 text-gray-600" />
                    <span>Reminder</span>
                  </NavLink>
                  <NavLink
                    to="/history"
                    className="flex items-center space-x-2 uppercase px-2 py-1 rounded text-gray-600"
                    activeClassName="text-hydra-blue bg-hydra-blue/10"
                  >
                    <FaHistory className="w-4 h-4 text-gray-600" />
                    <span>History</span>
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="flex items-center space-x-2 uppercase px-2 py-1 rounded text-gray-600"
                    activeClassName="text-hydra-blue bg-hydra-blue/10"
                  >
                    <FaCog className="w-4 h-4 text-gray-600" />
                    <span>Settings</span>
                  </NavLink>
                </nav>
              </div>
            </div>
            {/* Credentials Card */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-gray-500 text-xs">
              <p>Fortunes</p>
              <p>fortunes@success.com</p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-3/5 p-6 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back Fortunes!</h1>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-12">
                      <Activity intake={intake} goal={goal} goalAchieved={goalAchieved} />
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Hydration Tips</h3>
                      <p className="text-sm text-gray-600 mb-4">Consuming Fruit Juices Helps Keep Your Hydration Level Up!</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-red-100 p-4 rounded-lg shadow-sm w-32 h-32">
                          <div className="flex flex-col items-center space-y-2">
                            <GiWatermelon className="w-4 h-4 text-red-500" />
                            <h4 className="text-sm font-semibold text-gray-700">Watermelon</h4>
                            <p className="text-[10px] text-gray-600 text-center leading-tight">A good choice to stay hydrated. It contains 97% water.</p>
                          </div>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-lg shadow-sm w-32 h-32">
                          <div className="flex flex-col items-center space-y-2">
                            <GiGrapes className="w-4 h-4 text-purple-500" />
                            <h4 className="text-sm font-semibold text-gray-700">Grapes</h4>
                            <p className="text-[10px] text-gray-600 text-center leading-tight">It contains vitamin C, that aids in water retention.</p>
                          </div>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-lg shadow-sm w-32 h-32">
                          <div className="flex flex-col items-center space-y-2">
                            <GiOrange className="w-4 h-4 text-orange-500" />
                            <h4 className="text-sm font-semibold text-gray-700">Oranges</h4>
                            <p className="text-[10px] text-gray-600 text-center leading-tight">It contains 72% water. It helps in skin care.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    setGoal={setGoal}
                    resetProgress={resetProgress}
                    resetProgressWithoutGoal={resetProgressWithoutGoal}
                    setShowResetConfirm={setShowResetConfirm}
                    logWater={logWater}
                    goalAchieved={goalAchieved}
                    logMessage={logMessage}
                  />
                }
              />
              <Route path="/history" element={<History history={history} />} />
              <Route path="/reminder" element={<ReminderPopup />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>

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
          <aside className="w-1/5 bg-white p-6 border-l border-gray-200 flex flex-col justify-between">
            {/* SVG */}
            <div className="flex justify-center flex-grow">
              <div className="w-40 h-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 200"
                  className="w-full h-full"
                >
                  <path
                    d="M30 20 L30 10 Q30 5 35 5 H65 Q70 5 70 10 L70 20 Q70 30 80 40 L80 170 Q80 180 70 180 H30 Q20 180 20 170 L20 40 Q20 30 30 20 Z"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="4"
                  />
                  <rect x="35" y="5" width="30" height="10" fill="#60A5FA" />
                  <path
                    d="M20 120 Q40 100 60 120 T100 120 L100 180 H0 L0 120 Z"
                    fill="#93C5FD"
                    opacity="0.7"
                  />
                </svg>
              </div>
            </div>
            {/* Motivational Card */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-gray-600 text-center">
              <p className="font-medium text-base">Stay Hydrated & Beat Heat</p>
            </div>
          </aside>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;