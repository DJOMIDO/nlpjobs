// src/App.tsx

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import HomeCard from "./components/HomeCard";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeCard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
