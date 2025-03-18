import React from 'react'

const CustomNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {/* Blood Drop Container */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Blood Drop SVG - more realistic with tapered tip */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-16 h-16 text-red-600 animate-bounce"
        >
          <path
            fill="currentColor"
            d="M32 4C32 4 16 24 16 36c0 8.837 7.163 16 16 16s16-7.163 16-16c0-12-16-32-16-32Zm0 38a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200">
        Blood Request..
      </h2>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        Currently, Blood Request Details Loading...
      </p>
    </div>
  );
}

export default CustomNotFound