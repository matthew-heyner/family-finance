import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

/**
 * Full-screen loading component
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 