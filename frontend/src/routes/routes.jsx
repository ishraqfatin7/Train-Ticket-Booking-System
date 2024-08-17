import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../pages/Home";
import SignInForm from "../components/auth/SignInForm";
import RegisterForm from "../components/auth/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignInForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
  },
]);
