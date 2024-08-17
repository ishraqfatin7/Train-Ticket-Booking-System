import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RegisterForm = () => {
  const navigate = useNavigate();
  const { handleRegister, auth } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    //send data to the server
    const { email, password, retypePassword } = data;
    if (password !== retypePassword) {
      alert("Passwords do not match");
    }
    handleRegister(data);
    if (auth.isAuthenticated) {
      navigate("/");
      alert("Registration successful");
    }
    alert("Registration failed");
  };
  return (
    <div>
      <div className="dark min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-white text-center">
            Please provide the following details to register!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="flex flex-col mb-4 ">
              {/* <label htmlFor="login" className="text-gray-300">
              Email
            </label> */}
              <input
                id="email"
                type="email"
                className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your Email"
                defaultValue={""}
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
                defaultValue={""}
                {...register("password", { required: true, minLength: 6 })}
              />
              <input
                id="retypePassword"
                type="password"
                className="px-3 mt-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Confirm your password"
                {...register("retypePassword", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              <span className="flex items-center justify-center">
                <span>I'm sure. Register Now!</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
