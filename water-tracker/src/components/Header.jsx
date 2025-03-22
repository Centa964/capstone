// components/Header.jsx
// Displays the top header with logo, search bar, date, and calendar icon.
import React from 'react';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa'; // CHANGE: Import FaSearch

const Header = () => {
  // Format the current date as "Thur, 24 Mar 2025"
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm mb-6">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-hydra-blue rounded-full flex items-center justify-center text-white font-bold">
          H
        </div>
        <h1 className="text-2xl font-bold text-hydra-blue">HYDRA</h1>
      </div>

      {/* Search Bar and Date Container */}
      <div className="flex items-center space-x-4">
        {/* CHANGE: Adjust search bar width and position */}
        <div className="relative w-48">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Date and Calendar Icon */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{currentDate}</span>
          <FaCalendarAlt className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;