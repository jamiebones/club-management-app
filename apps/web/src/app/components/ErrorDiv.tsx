"use client"

import React, { useState, ReactNode } from 'react';

interface ErrorDivProps {
  errorMessage?: string | null;
  onClose?: () => void;
  className?: string;
}

const ErrorDiv: React.FC<ErrorDivProps> = ({ errorMessage, onClose, className }) => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    if (onClose) {
      onClose();
    }
  };

  if (!errorMessage || isClosed) {
    return null; // Don't render the component if there's no error message or if it's closed
  }

  return (
    <div className={`max-w-md mx-auto mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`} role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline">{errorMessage}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={handleClose}>
        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.641 3.641a.5.5 0 0 1-.707.707L10 10.707 6.359 14.348a.5.5 0 0 1-.707-.707L9.293 10 5.652 6.359a.5.5 0 0 1 .707-.707L10 9.293l3.641-3.641a.5.5 0 0 1 .707 0z"/>
        </svg>
      </span>
    </div>
  );
};

export default ErrorDiv;