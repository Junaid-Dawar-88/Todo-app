import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-full h-screen shadow-xl border-r border-gray-200">
      
      {/* Logo / Title */}
      <div className="h-[80px] bg-blue-50 flex items-center px-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Todo</h2>
      </div>

      {/* Menu Buttons */}
      <div className="mt-4 px-3">
        <button className="w-full py-3 text-left px-4 rounded-xl text-gray-700 font-medium hover:bg-blue-100 focus:bg-blue-100 focus:text-red-700 hover:text-blue-700 transition active:bg-blue-200">
          All Todos
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
