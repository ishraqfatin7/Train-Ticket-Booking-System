import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className=" text-cyan-400">Tailwind Installed</h1>
      </div>
    </>
  );
}

export default App;
