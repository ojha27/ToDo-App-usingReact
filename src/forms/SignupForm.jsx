import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validation/signupSchema";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === data.email);

    if (userExists) {
      alert("User already exists");
      return;
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful ");

    reset();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded w-80 shadow bg-white"
      >
        <h2 className="text-xl mb-4 text-center font-bold">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="border p-2 w-full mb-1"
        />
        <p className="text-red-500 text-sm mb-2">{errors.name?.message}</p>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-2 w-full mb-1"
        />
        <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 w-full mb-1"
        />
        <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className="border p-2 w-full mb-1"
        />
        <p className="text-red-500 text-sm mb-2">
          {errors.confirmPassword?.message}
        </p>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full mt-2 rounded"
        >
          Signup
        </button>
      </form>

      <p className="mt-3">
        Already have an account?{" "}
        <Link to="/" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}
