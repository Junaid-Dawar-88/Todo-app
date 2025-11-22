import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [todo, setTodo] = useState<any[]>([]);

  const getTodo = async () => {
  
      const res = await axios.get('/api/todos');
      setTodo(res.data);
    
  };

  useEffect(() => {
    getTodo();
  }, []); 
  const totalPending = todo.filter(t => t.status === "pending").length;
  const totalComplete = todo.filter(t => t.status === "complete").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 px-6">

      {/* Total Todo */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg p-6 rounded-2xl border border-gray-100 hover:scale-105 transition transform duration-200">
        <h1 className="text-gray-500 text-sm">Total Todo</h1>
        <h1 className="text-4xl font-bold mt-3 text-gray-800">{todo.length}</h1>
      </div>

      {/* Total Pending */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg p-6 rounded-2xl border border-gray-100 hover:scale-105 transition transform duration-200">
        <h1 className="text-gray-500 text-sm">Total Pending</h1>
        <h1 className="text-4xl font-bold mt-3 text-red-500">{totalPending}</h1>
      </div>

      {/* Total Complete */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg p-6 rounded-2xl border border-gray-100 hover:scale-105 transition transform duration-200">
        <h1 className="text-gray-500 text-sm">Total Complete</h1>
        <h1 className="text-4xl font-bold mt-3 text-blue-500">{totalComplete}</h1>
      </div>

    </div>
  );
};

export default Card;
