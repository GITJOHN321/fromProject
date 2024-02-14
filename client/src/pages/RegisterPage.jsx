import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    signup,
    isAuthenticated,
    errors: RegisterErrors,
    resetErrors,
  } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigation("/");
    resetErrors();
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    const data = await signup(values);
    if (data) {
      navigation("/login");
      resetErrors();
    }
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-100 max-w-md py-10 rounded-md">
        <h1 className="text-2xl font-bold py-1 head px-10 mb-2">Register</h1>
        <form className="px-10" onSubmit={onSubmit}>
          {RegisterErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))}
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500"> Username is required </p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500"> Username is required </p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500"> Username is required </p>
          )}
          <input
            type="password"
            {...register("password2", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Repeat Password"
          />
          {errors.password && (
            <p className="text-red-500"> Second Password is required </p>
          )}
          <div className="text-sky-600"> 
            <hr />
            <br />
            <h3><strong>The password must have</strong></h3>
            <ul>
              <li className="flex items-center"><HiChevronRight />Min 7 characters</li>
              <li className="flex items-center"><HiChevronRight />At least one capital letter</li>
              <li className="flex items-center"><HiChevronRight />At least one number</li>
            </ul>
            <br />
            <hr />
          </div>
          <button
            type="submit"
            className=" p-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg"
          >
            {" "}
            Register{" "}
          </button>
        </form>
        <br />
        <p className="flex gap-x-2 justify-between px-10">
          Already have an account?{" "}
          <Link to="/login" className=" text-sky-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
