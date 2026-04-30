import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "../validation/todoSchema";

export default function TodoForm({ addTodo }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(todoSchema),
  });

  const onSubmit = (data) => {
    const newTodo = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: "LIST",
    };

    addTodo(newTodo);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
      <div>
        <input
          placeholder="Title"
          {...register("title")}
          className="border p-2"
        />
        <p className="text-red-500 text-xs">{errors.title?.message}</p>
      </div>
      <div>
        <input
          placeholder="Description"
          {...register("description")}
          className="border p-2"
        />
        <p className="text-red-500 text-xs">{errors.description?.message}</p>
      </div>
      <div>
        <select {...register("priority")} className="border p-2">
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <p className="text-red-500 text-xs">{errors.priority?.message}</p>
      </div>
      <button className="bg-blue-500 text-white px-3 rounded">
        Create Todo
      </button>
    </form>
  );
}
