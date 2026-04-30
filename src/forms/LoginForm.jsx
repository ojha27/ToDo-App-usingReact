import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login success");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded w-80"
      >
        <h2 className="text-xl mb-4">Login</h2>

        <input
          placeholder="Email"
          {...register("email")}
          className="border p-2 w-full mb-2"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 w-full mb-2"
        />

        <button className="bg-green-500 text-white p-2 w-full">Login</button>
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </>
  );
}
