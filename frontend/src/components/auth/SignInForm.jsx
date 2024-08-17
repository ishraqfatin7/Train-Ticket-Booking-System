import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";
const SignInForm = () => {
  const { handleLogin, auth, handleLogout } = useAuthContext();
  const { id, email, role } = auth.user || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleLogin(data);
  };
  //see if the form is working
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-white text-center">
          Sign in to continue
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="flex flex-col mb-4 ">
            {/* <label htmlFor="login" className="text-gray-300">
              Email
            </label> */}
            <input
              id="email"
              type="text"
              className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your Email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-col mb-6">
            {/* <label htmlFor="password" className="text-gray-300">
              Password
            </label> */}
            <input
              id="password"
              type="password"
              className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            <span className="flex items-center justify-center">Sign In</span>
          </button>

          <Link to="/auth/register">
            <button
              type="button"
              className="w-full mt-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
              Register
            </button>
          </Link>
          {auth.isAuthenticated && (
            <button
              type="button"
              onClick={() => handleLogout()}
              className="w-full mt-4 py-2 px-4 bg-red-700 text-white rounded-md hover:bg-red-600"
            >
              {email ? `Logout ${email}` : "Logout"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
