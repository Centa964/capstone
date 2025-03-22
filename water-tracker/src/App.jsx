// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { FaTachometerAlt, FaBell, FaHistory, FaCog, FaBars, FaUser } from 'react-icons/fa';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling menu on mobile

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
      setError('Failed to load data to local storage.');
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
      <div className="p-4 sm:p-8">
        <h1 className="text-xl sm:text-2xl text-red-500">Error: {error}</h1>
        <p className="text-sm sm:text-base">Please check the console for more details.</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans h-screen overflow-hidden">
        <Header />
        {/* Main layout: Stack vertically on mobile, flex row on tablet/desktop */}
        <div className="flex flex-col sm:flex-row h-[calc(100vh-72px)] pb-12 sm:pb-0">
          {/* Hamburger Menu Button (Visible on Mobile) */}
          <button
            className="sm:hidden p-4 text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="w-6 h-6" />
          </button>

          {/* Left Sidebar (Menu) */}
          <aside
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } sm:block w-full sm:w-1/3 md:w-1/5 p-4 sm:p-6 mt-4 flex flex-col justify-between border-r border-gray-200 bg-gray-50 absolute sm:static top-16 left-0 z-50 sm:z-auto bg-white sm:bg-gray-50 shadow-lg sm:shadow-none`}
          >
            <div>
              {/* Menu Card */}
              <div className="bg-pink-100 p-4 sm:p-4 rounded-lg shadow-sm overflow-hidden">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Menu</h2>
                <nav className="flex flex-col space-y-3 sm:space-y-4">
                  <NavLink
                    to="/dashboard"
                    className="flex items-center space-x-2 uppercase font-semibold px-2 py-1 rounded text-gray-600 text-sm sm:text-xs"
                    activeClassName="text-hydra-blue bg-hydra-blue/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaTachometerAlt className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="flex-1">Dashboard</span>
                  </NavLink>
                  <NavLink
                    to="/reminder"
                    className="flex items-center space-x-2 uppercase font-semibold px-2 py-1 rounded text-gray-600 text-sm sm:text-xs"
                    activeClassName="text-hydra-blue bg-hydra-blue/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaBell className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="flex-1">Reminder</span>
                  </NavLink>
                  <NavLink
                    to="/history"
                    className="flex items-center space-x-2 uppercase font-semibold px-2 py-1 rounded text-gray-600 text-sm sm:text-xs"
                    activeClassName="text-hydra-blue bg-hydra-blue/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaHistory className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="flex-1">History</span>
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="flex items-center space-x-2 uppercase font-semibold px-2 py-1 rounded text-gray-600 text-sm sm:text-xs"
                    activeClassName="text-hydra-blue bg-hydra-blue/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaCog className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="flex-1">Settings</span>
                  </NavLink>
                </nav>
              </div>
            </div>
            {/* Credentials Card (Tablet/Desktop) */}
            <div className="hidden sm:block bg-gray-100 p-2 sm:p-4 rounded-lg shadow-sm text-gray-500 text-xs">
              <div className="flex items-center space-x-2">
                <FaUser className="w-4 h-4 text-gray-500" />
                <div>
                  <p>Fortunes</p>
                  <p>fortunes@success.com</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full sm:w-1/2 md:w-3/5 p-4 sm:p-4 h-full overflow-y-auto flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-4">Welcome Back Fortunes!</h1>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <>
                    <div className="bg-blue-50 p-4 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-8">
                      <Activity intake={intake} goal={goal} goalAchieved={goalAchieved} />
                    </div>
                    <div className="bg-blue-50 p-4 sm:p-6 rounded-lg shadow-sm mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Hydration Tips</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">Consuming Fruit Juices Helps Keep Your Hydration Level Up!</p>
                      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-red-100 p-2 rounded-lg shadow-sm max-w-40 sm:max-w-32 md:max-w-28 h-24 sm:h-20 mx-auto">
                          <div className="flex flex-col items-center space-y-1 p-2">
                            <GiWatermelon className="w-4 sm:w-3 md:w-2 h-4 sm:h-3 md:h-2 text-red-500" />
                            <h4 className="text-sm sm:text-xs font-semibold text-gray-700">Watermelon</h4>
                            <p className="text-[10px] sm:text-[9px] text-gray-600 text-center leading-tight">A good choice to stay hydrated. It contains 97% water.</p>
                          </div>
                        </div>
                        <div className="bg-purple-100 p-2 rounded-lg shadow-sm max-w-40 sm:max-w-32 md:max-w-28 h-24 sm:h-20 mx-auto">
                          <div className="flex flex-col items-center space-y-1 p-2">
                            <GiGrapes className="w-4 sm:w-3 md:w-2 h-4 sm:h-3 md:h-2 text-purple-500" />
                            <h4 className="text-sm sm:text-xs font-semibold text-gray-700">Grapes</h4>
                            <p className="text-[10px] sm:text-[9px] text-gray-600 text-center leading-tight">It contains vitamin C, that aids in water retention.</p>
                          </div>
                        </div>
                        <div className="bg-orange-100 p-2 rounded-lg shadow-sm max-w-40 sm:max-w-32 md:max-w-28 h-24 sm:h-20 mx-auto">
                          <div className="flex flex-col items-center space-y-1 p-2">
                            <GiOrange className="w-4 sm:w-3 md:w-2 h-4 sm:h-3 md:h-2 text-orange-500" />
                            <h4 className="text-sm sm:text-xs font-semibold text-gray-700">Oranges</h4>
                            <p className="text-[10px] sm:text-[9px] text-gray-600 text-center leading-tight">It contains 72% water. It helps in skin care.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* SVG and Motivational Card (Mobile Only) */}
                    <div className="sm:hidden bg-gray-100 p-2 rounded-lg shadow-sm mb-4 flex flex-col items-center space-y-2">
                      <div className="w-16 h-24">
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
                      <p className="font-medium text-xs text-gray-600 text-center">Stay Hydrated & Beat Heat</p>
                    </div>
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <div className="p-4 sm:p-6 flex-1">
                    <Settings
                      setGoal={setGoal}
                      resetProgress={resetProgress}
                      resetProgressWithoutGoal={resetProgressWithoutGoal}
                      setShowResetConfirm={setShowResetConfirm}
                      logWater={logWater}
                      goalAchieved={goalAchieved}
                      logMessage={logMessage}
                    />
                  </div>
                }
              />
              <Route
                path="/history"
                element={
                  <div className="p-4 sm:p-6 flex-1">
                    <History history={history} />
                  </div>
                }
              />
              <Route
                path="/reminder"
                element={
                  <div className="p-4 sm:p-6 flex-1">
                    <ReminderPopup />
                  </div>
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>

            {showResetConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 sm:w-auto">
                  <p className="text-base sm:text-lg text-gray-700 mb-4">Are you sure? This will erase all progress!</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        resetProgress();
                        setShowResetConfirm(false);
                      }}
                      className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base"
                    >
                      Yes, reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="bg-gray-300 text-gray-700 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {logMessage && (
              <div className="fixed top-4 right-4 bg-hydra-blue text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg z-50 text-sm sm:text-base">
                {logMessage}
              </div>
            )}
          </main>

          {/* Right Sidebar (Tablet/Desktop Only) */}
          <aside className="hidden sm:block w-full sm:w-1/4 md:w-1/5 p-4 sm:p-6 border-l border-gray-200 flex flex-col justify-between bg-white overflow-y-auto">
            {/* SVG */}
            <div className="flex justify-center">
              <div className="w-32 sm:w-40 h-48 sm:h-64">
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
              <p className="font-medium text-sm sm:text-base">Stay Hydrated & Beat Heat</p>
            </div>
          </aside>

          {/* Footer (Mobile Only) */}
          <footer className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-100 p-2 text-gray-500 text-xs shadow-t z-50">
            <div className="flex items-center justify-center space-x-2">
              <FaUser className="w-4 h-4 text-gray-500" />
              <div>
                <p>Fortunes</p>
                <p>fortunes@success.com</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;