import { Outlet } from "react-router-dom";
import Navbar from "../containers/Navbar";

const Root = () => {
  return (
    <div className="w-full ">
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
};

export default Root;
