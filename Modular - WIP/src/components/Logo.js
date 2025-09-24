import React from 'react';

const Logo = ({ 
  className = "h-8", 
  showText = true
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Eye logo from your brand */}
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center shadow-md">
        <svg 
          className="w-5 h-5 text-white" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      </div>
      
      {showText && (
        <div className="ml-2 flex items-center">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Impact</span>
          <span className="text-xl font-bold text-teal-600 dark:text-teal-400">Mojo</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
