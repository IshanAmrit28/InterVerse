import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Navbar from "./components/Shared/Navbar";
//import Footer from "./components/Shared/Footer";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import GoogleMeetSimple from "./Pages/InterviewRoomFaceQuestionLogic";
import Dashboard from "./components/Dashboard";
import PracticeSimulation from "./components/PracticeSimulation";
import ErrorPage from "./components/ErrorPage";
import AboutUs from "./components/AboutUs";
import ReportPage from "./components/ReportPage";
import Settings from "./components/Setting";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/interview" element={<GoogleMeetSimple />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/practice" element={<PracticeSimulation />} />
          <Route path="/report/:reportId" element={<ReportPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
