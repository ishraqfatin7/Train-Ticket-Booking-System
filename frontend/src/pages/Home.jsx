import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { auth } = useAuthContext();
  console.log(auth);
  return (
    <div className="container mb-10">
      <h1>Home</h1>
      <p>This is the home page.</p>
    </div>
  );
};

export default Home;
