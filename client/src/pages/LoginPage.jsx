import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated, resetErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const login = signin(data);
    if(login){
      resetErrors()
    }
  });
  useEffect(() => {
    if (isAuthenticated) navigate("/create-exam");
  }, [isAuthenticated]);
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-100 max-w-md w-full py-10 rounded-lg shadow-lg">
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold head px-10 py-1 mb-2">Login</h1>
        <form className="px-10" onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">password is required</p>
          )}
          <button type="submit" className=" p-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg"> Login </button>
        </form>
        <p className="flex gap-x-2 justify-between px-10">
          Don't have an account?
          <Link to="/register" className="font-medium text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
