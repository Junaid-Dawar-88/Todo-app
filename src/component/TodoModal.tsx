import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
}

const TodoModal = ({ todos, setTodos, selectedTodo, setSelectedTodo }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("low");
  const [due_date, setDue_date] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
      setStatus(selectedTodo.status);
      setPriority(selectedTodo.priority);
      setDue_date(selectedTodo.due_date);
      setIsOpen(true);
    }
  }, [selectedTodo]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    clearForm();
    setSelectedTodo(null);
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus("pending");
    setPriority("low");
    setDue_date("");
  };

  const handleAdd = async () => {
    if (!title || !description || !due_date) return alert("Please fill all inputs");
      const newTodo = { title, description, status, priority, due_date };
      const res = await axios.post("/api/todos", newTodo);
      setTodos([...todos, res.data]);
      closeModal();
  };

  const handleUpdate = async () => {
    if (!selectedTodo) return;
      const updatedTodo = { title, description, status, priority, due_date };
      const res = await axios.put(`/api/todos/${selectedTodo.id}`, updatedTodo);
      setTodos((prev: any) =>
        prev.map((t: any) => (t.id === res.data.id ? res.data : t))
      );
      closeModal();
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={openModal}
      >
        Add Todo
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] sm:w-[450px] p-6 rounded-2xl shadow-xl animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedTodo ? "Update Todo" : "Add Todo"}
              </h2>
              <button
                className="text-gray-500 hover:text-red-500 text-xl"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter todo title"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={due_date}
                  onChange={(e) => setDue_date(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => (selectedTodo ? handleUpdate() : handleAdd())}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {selectedTodo ? "Update Todo" : "Save Todo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoModal;
