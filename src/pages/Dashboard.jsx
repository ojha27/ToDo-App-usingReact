import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../forms/TodoForm";
import TodoCard from "../components/TodoCard";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [editTodoData, setEditTodoData] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const key = `todos_${currentUser.email}`;
    const stored = localStorage.getItem(key);

    setTodos(stored ? JSON.parse(stored) : []);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) return;

      const key = `todos_${currentUser.email}`;
      localStorage.setItem(key, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (todo) => {
    setEditTodoData({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      status: todo.status,
    });
  };

  const saveEdit = () => {
    setTodos((prev) =>
      prev.map((t) => (t.id === editTodoData.id ? { ...editTodoData } : t))
    );

    setEditTodoData(null);
  };

  const moveTodo = (id, newStatus) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const filteredTodos = todos.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  const listCount = filteredTodos.filter((t) => t.status === "LIST").length;
  const progressCount = filteredTodos.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;
  const doneCount = filteredTodos.filter((t) => t.status === "DONE").length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todo App</h1>
        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-64"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="bg-blue-500 text-white p-2 rounded mb-3">
            Todo ({listCount})
          </h2>

          {filteredTodos
            .filter((t) => t.status === "LIST")
            .map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                moveTodo={moveTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="bg-yellow-400 p-2 rounded mb-3">
            In Progress ({progressCount})
          </h2>

          {filteredTodos
            .filter((t) => t.status === "IN_PROGRESS")
            .map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                moveTodo={moveTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="bg-red-500 text-white p-2 rounded mb-3">
            Done ({doneCount})
          </h2>

          {filteredTodos
            .filter((t) => t.status === "DONE")
            .map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                moveTodo={moveTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            ))}
        </div>
      </div>
      {editTodoData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
            <input
              className="border p-2 w-full mb-2"
              value={editTodoData.title}
              onChange={(e) =>
                setEditTodoData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <input
              className="border p-2 w-full mb-2"
              value={editTodoData.description}
              onChange={(e) =>
                setEditTodoData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <select
              className="border p-2 w-full mb-4"
              value={editTodoData.priority}
              onChange={(e) =>
                setEditTodoData((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }))
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditTodoData(null)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
