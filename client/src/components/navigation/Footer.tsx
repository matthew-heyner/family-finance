import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Family Finance App. All rights reserved.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            Terms of Service
          </Link>
          <Link to="/help" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            Help Center
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 