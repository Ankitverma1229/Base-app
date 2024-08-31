import "./App.css";
import Home from "./Pages/Home";
import AuthPage from "./Pages/Auth";
import Error from "./Pages/Error";
import ToggleButton from "./Components/TogglerButton/ToggleButton";
import { Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./Components/DarkModeContext/DarkModeContext"; // Import the provider
import { useContext } from "react";

function App() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`App relative ${isDarkMode ? "bg-darkMode" : "bg-lightMode"}`}
    >
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<AuthPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <div className="absolute top-20 right-0 md:top-8 md:right-32">
        <ToggleButton />
      </div>
    </div>
  );
}

export default App;
