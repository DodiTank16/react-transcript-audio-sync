import React from "react";

const Loader = ({ text }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm pointer-events-none z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-white text-lg mt-4">{"Please wait..."}</p>
        {text && <p className="text-white text-lg mt-4">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;
