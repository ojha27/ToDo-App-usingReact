import { useState } from "react";
import { MoreVertical, Edit, Trash2, ArrowRightCircle } from "lucide-react";

export default function TodoCard({ todo, moveTodo, editTodo, deleteTodo }) {
  const [open, setOpen] = useState(false);

  const getPriorityColor = (priority) => {
    if (priority === "Low") return "bg-green-200 text-green-800";
    if (priority === "Medium") return "bg-yellow-200 text-yellow-800";
    if (priority === "High") return "bg-red-200 text-red-800";
  };

  return (
    <div className="bg-gray-50 p-4 mb-3 rounded-lg shadow-sm relative">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg">{todo.title}</p>
          <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
              todo.priority
            )}`}
          >
            {todo.priority}
          </span>

          <div className="relative">
            <button onClick={() => setOpen(!open)}>
              <MoreVertical size={18} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white border shadow rounded w-48 z-10">
                {todo.status !== "DONE" && (
                  <button
                    onClick={() => {
                      moveTodo(
                        todo.id,
                        todo.status === "LIST" ? "IN_PROGRESS" : "DONE"
                      );
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-100"
                  >
                    <ArrowRightCircle size={16} />
                    Change Status
                  </button>
                )}

                {todo.status !== "DONE" && (
                  <button
                    onClick={() => {
                      editTodo(todo);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-100"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                )}

                {todo.status === "LIST" && (
                  <button
                    onClick={() => {
                      deleteTodo(todo.id);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-500 hover:bg-gray-100"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
