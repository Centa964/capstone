
//header with a logo, title, search bar
import React from 'react';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="flex justify-between items-center p-4 sm:p-6 bg-white shadow-sm mb-4 sm:mb-6">
      <div className="flex items-center space-x-2">
        <div className="w-6 sm:w-8 h-6 sm:h-8 bg-hydra-blue rounded-full flex items-center justify-center text-white font-bold">
          H
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-hydra-blue">HYDRA</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden sm:block w-40 md:w-48">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm text-gray-500">{currentDate}</span>
          <FaCalendarAlt className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;