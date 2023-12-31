import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="border-t-4 border-blue-500 rounded-full animate-spin h-12 w-12"></div>
  </div>
);

export default LoadingSpinner;