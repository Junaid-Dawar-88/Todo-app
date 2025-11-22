import React, { useEffect, useState } from "react";
import TodoModal from "./TodoModal";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
}

const Table = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const getAllTodos = async () => {
    const res = await axios.get("/api/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

 
  const filteredTodos = todos.filter((todo) => {
    const statusMatch = statusFilter === "all" || todo.status === statusFilter;
    const priorityMatch =
      priorityFilter === "all" || todo.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-[80%] mb-4 flex items-center justify-between gap-4">
        <TodoModal
          todos={todos}
          setTodos={setTodos}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="w-[80%] max-h-[50vh] overflow-y-auto border border-gray-200 shadow-lg rounded-xl">
        <table className="w-full">
          <thead className="bg-white text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Due Date</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-5 text-center text-gray-500">
                  No Todos Found
                </td>
              </tr>
            ) : (
              filteredTodos.map((todo) => (
                <tr key={todo.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{todo.title}</td>
                  <td className="px-4 py-3">{todo.description}</td>
                  <td className="px-4 py-3">{todo.status}</td>
                  <td className="px-4 py-3">{todo.priority}</td>
                  <td className="px-4 py-3">{todo.due_date}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-blue-600 transition"
                      onClick={() => setSelectedTodo(todo)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-red-600 transition"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
