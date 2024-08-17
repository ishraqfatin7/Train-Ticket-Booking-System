import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpenIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const Links = [
    { name: "Home", link: "/" },
    { name: "Train Information", link: "/" },
    { name: "Contact Us", link: "/" },
    { name: "Sign In ", link: "/login" },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  //prevent re-rendering
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.href);
  };
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* Logo Section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <BookOpenIcon className="w-7 h-7 text-blue-600" />
          <span>Inscribe</span>
        </div>

        {/* Menu Icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* Links and Button Section */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 md:my-0 my-7 font-semibold group"
            >
              <Link
                to={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500 relative"
              >
                {link.name}
                {/* Animated Underline */}
                <span className="block h-0.5 bg-blue-400 absolute left-0 bottom-0 w-0 group-hover:w-full transition-all duration-500"></span>
              </Link>
            </li>
          ))}
          <button className="btn bg-blue-600 text-white md:ml-8 font-semibold px-5 py-2 rounded-full duration-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            Get Started
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
