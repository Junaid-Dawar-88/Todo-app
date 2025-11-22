import React from "react";

const Header = () => {
  return (
    <header className="w-full h-[80px] bg-blue-50 shadow-md flex items-center justify-between px-6">
      
      {/* App Title */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
        Todo App
      </h1>

      {/* Profile / Logo */}
      <div className="flex items-center">
        <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold shadow-md hover:scale-105 transition">
          TD
        </div>
      </div>

    </header>
  );
};

export default Header;
