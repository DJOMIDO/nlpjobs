// src/App.tsx

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import HomeCard from "./components/HomeCard";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import JobDetails from "./pages/JobDetails";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeCard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
