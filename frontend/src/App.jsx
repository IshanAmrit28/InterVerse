// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// //import Navbar from "./components/Shared/Navbar";
// //import Footer from "./components/Shared/Footer";
// import LandingPage from "./Pages/LandingPage";
// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import GoogleMeetSimple from "./Pages/InterviewRoomFaceQuestionLogic";
// import Dashboard from "./components/Dashboard";
// import PracticeSimulation from "./components/PracticeSimulation";
// import ErrorPage from "./components/ErrorPage";
// import AboutUs from "./components/AboutUs";
// import ReportPage from "./components/ReportPage";
// import Settings from "./components/Setting";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* <Navbar /> */}
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/interview" element={<GoogleMeetSimple />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/report" element={<ReportPage />} />
//           <Route path="/practice" element={<PracticeSimulation />} />
//           <Route path="/report/:reportId" element={<ReportPage />} />
//           <Route path="*" element={<ErrorPage />} />
//         </Routes>
//         {/* <Footer /> */}
//       </div>
//     </Router>
//   );
// }

// export default App;

// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Core Pages for Demo
import PracticeSetup from "./components/PracticeSetup";
import InterviewRoom from "./pages/InterviewRoom";
import Report from "./pages/Report";

// Simple Home/Landing Page for Navigation
const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white font-sans min-w-[1280px]">
    <h1 className="text-5xl font-extrabold mb-6 text-blue-500">
      AI Interview Demo
    </h1>
    <p className="text-xl text-gray-300 mb-10">
      Start a new practice session to begin the flow.
    </p>
    <Link
      to="/practice"
      className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg transition-colors"
    >
      Go to Practice Setup
    </Link>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<PracticeSetup />} />
        <Route path="/interview" element={<InterviewRoom />} />
        <Route path="/report/:reportId" element={<Report />} />

        {/* Fallback for missing report ID */}
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
