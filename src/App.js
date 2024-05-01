import { Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import AboutKristen from "./pages/AboutKristen";
import AboutMuzakPlayer from "./pages/AboutMuzakPlayer";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutKristen" element={<AboutKristen />} />
        <Route path="/aboutMuzakPlayer" element={<AboutMuzakPlayer />} />
      </Routes>
    </div>
  );
}

export default App;
