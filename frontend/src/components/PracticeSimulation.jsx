//frontend\src\components\PracticeSimulation.jsx
import React, { useState, useEffect, useRef } from "react"; // Added useEffect and useRef
import { useNavigate, Link } from "react-router-dom";
import { X } from "lucide-react";

// NAVBAR
function PublicNavbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Effect to handle clicks outside the profile menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <header className="sticky top-0 z-50 flex justify-center border-b border-solid border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
      <div className="flex w-full max-w-[1440px] items-center justify-between px-10 py-4">
        {/* Logo/Title linked to Home */}
        <Link to="/" className="flex items-center gap-4 text-white">
          <div className="size-6 text-blue-500">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                fill="currentColor"
              ></path>
              <path
                clipRule="evenodd"
                d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] font-heading">
            Smart Interview Coach
          </h2>
        </Link>

        {/* Navigation and Auth Links */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link
              className="text-sm font-medium leading-normal text-white hover:text-blue-400 transition-colors"
              to="/practice"
            >
              Practice
            </Link>
            <Link
              className="text-sm font-medium leading-normal text-white hover:text-blue-400 transition-colors"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </nav>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="size-8 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Open user menu"
              aria-haspopup="true"
            >
              {/* Simple User Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 m-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.015.445-.002.668 0 .432.01.863.024 1.294a.75.75 0 01-1.498.055 5.25 5.25 0 01-.002-1.018zM18.51 15.326a.78.78 0 00.358-.442 3 3 0 00-4.308-3.516 6.484 6.484 0 011.905 3.959c.023.222.015.445.002.668 0 .432-.01.863-.024 1.294a.75.75 0 001.498.055 5.25 5.25 0 00.002-1.018zM12.5 8a2 2 0 11-4 0 2 2 0 014 0zM10 12a5 5 0 11-10 0 5 5 0 0110 0zM17 11a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Link
                  to="/settings" // Link to settings page
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => setIsProfileMenuOpen(false)} // Close on click
                >
                  Profile
                </Link>
                <Link
                  to="/" // Assuming logout goes to home
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => setIsProfileMenuOpen(false)} // Close on click
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Modal for setting up the interview parameters.
 */
function PreInterviewModal({ onStart, onClose }) {
  // State for the new input fields
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  return (
    <div className="relative z-10 flex w-full max-w-2xl flex-col items-center rounded-xl bg-gray-800 p-8 shadow-2xl">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <X size={24} />
      </button>
      <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white pb-6 text-center">
        Prepare for Your Interview
      </h1>
      <div className="w-full space-y-6">
        {/* --- 1. REMOVED Topic, Difficulty, Mode --- */}
        {/* The grid with the three dropdowns has been removed. */}

        {/* --- 2. ADDED "Role" and "Job Description" --- */}
        <label className="flex flex-1 flex-col">
          <p className="pb-2 text-base font-medium leading-normal text-white">
            Role
          </p>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Senior Frontend Engineer"
            className="h-14 w-full appearance-none resize-none overflow-hidden rounded-lg border border-gray-700 bg-gray-700 px-4 text-base font-normal leading-normal text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/50"
          />
        </label>
        <label className="flex flex-1 flex-col">
          <p className="pb-2 text-base font-medium leading-normal text-white">
            Job Description
          </p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="h-32 w-full appearance-none resize-none overflow-hidden rounded-lg border border-gray-700 bg-gray-700 p-4 text-base font-normal leading-normal text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/50"
          ></textarea>
        </label>
        {/* --- 3. MODIFIED "Upload Resume" --- */}
        <div className="flex flex-col">
          {/* Reduced height by changing padding from py-8 to py-4 */}
          <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gray-700 px-6 py-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-white text-center">
                Upload Resume
              </p>
              <p className="text-sm font-normal leading-normal text-gray-400 text-center">
                Drag & drop your file here or click to browse.
              </p>
            </div>
            <button className="h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-600 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-gray-500">
              <span className="truncate">Upload File</span>
            </button>
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <button
            onClick={onStart}
            className="h-12 min-w-[84px] w-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-blue-500 px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity hover:opacity-90"
          >
            <span className="truncate">Start Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Overlay shown after the interview is completed.
 */
function PostInterviewOverlay({ onViewReport }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="rounded-xl bg-gray-800 p-10 text-center shadow-2xl">
        <h2 className="font-heading text-3xl font-bold text-white mb-2">
          Well done!
        </h2>
        <p className="text-base text-gray-400 mb-6">
          Your AI performance report is being generated.
        </p>
        <button
          onClick={onViewReport}
          className="h-12 w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-blue-500 px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity hover:opacity-90"
        >
          <span className="truncate">View Report</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Modal to warn user to stay in the interview tab.
 */
function RestrictionModal({ onAcknowledge }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="max-w-md rounded-xl bg-gray-800 p-10 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-yellow-100">
          <span className="material-symbols-outlined text-yellow-600">
            warning
          </span>
        </div>
        <h2 className="font-heading text-2xl font-bold text-white mb-2">
          Stay Focused!
        </h2>
        <p className="text-base text-gray-40Ah-6">
          Leaving the interview window may negatively impact the simulation or
          your results. Please remain in this tab to ensure an accurate
          assessment.
        </p>
        <button
          onClick={onAcknowledge}
          className="h-12 w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-blue-500 px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity hover:opacity-90"
        >
          <span className="truncate">I Understand</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Renders the practice simulation setup page.
 * Manages which modal/overlay is currently active.
 */
export default function PracticeSetup() {
  const [modalView, setModalView] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-900">
      <PublicNavbar />
      <div className="relative flex flex-1 w-full flex-col items-center justify-center p-4">
        {modalView === null && (
          <div className="flex flex-col items-center gap-6">
            <h1 className="font-heading text-4xl font-bold text-white">
              Practice Center
            </h1>
            <p className="text-lg text-gray-400 max-w-lg text-center">
              You are about to start a new AI-powered interview. When you're
              ready, configure your session and begin.
            </p>
            <button
              onClick={() => setModalView("pre-interview")}
              className="h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-blue-500 px-8 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity hover:opacity-90"
            >
              <span className="truncate">Start New Interview</span>
            </button>
          </div>
        )}

        {modalView === "pre-interview" && (
          <PreInterviewModal
            onStart={() => {
              console.log("Starting interview...");
              navigate("/interview");
            }}
            onClose={() => setModalView(null)}
          />
        )}

        {modalView === "post-interview" && (
          <PostInterviewOverlay onViewReport={() => navigate("/report")} />
        )}

        {modalView === "restriction" && (
          <RestrictionModal onAcknowledge={() => setModalView(null)} />
        )}
      </div>
    </div>
  );
}
