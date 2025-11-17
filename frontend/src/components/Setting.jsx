//frontend\src\components\Setting.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Re-enabled for the Navbar

/**
 * Renders the public-facing navbar.
 */
function PublicNavbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Effect to handle clicks outside the profile menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
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
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
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
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] font-heading">Smart Interview Coach</h2>
        </Link>

        {/* Navigation and Auth Links */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link className="text-sm font-medium leading-normal text-white hover:text-blue-400 transition-colors" to="/practice">Practice</Link>
            <Link className="text-sm font-medium leading-normal text-white hover:text-blue-400 transition-colors" to="/dashboard">Dashboard</Link>
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
                  to="/settings"
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
 * Renders the main content for the Profile Settings page.
 */
function SettingsContent() {
  return (
    // Updated padding to ensure content looks good full-screen
    // Added max-w-4xl and mx-auto to center content and prevent it from being too wide
    <main className="flex-1 p-10 w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-10">
        {/* Page Heading */}
        <div>
          <p className="font-heading text-4xl font-bold tracking-tight text-white">Profile Settings</p>
          <p className="mt-1 text-gray-400">Manage your profile, security, and preferences.</p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col gap-6">
          {/* Avatar and Upload */}
          <div className="flex border-b border-gray-700 p-4 pb-6">
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-5">
                <div
                  className="aspect-square size-24 rounded-full bg-cover bg-center bg-no-repeat"
                  aria-label="User profile avatar"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDftVH-HBJDfI-ri5Po5lBqOjblDtSVGgjEnBv2pVFPPhMM6hQCUOWErmjcIgdk_GhUwuehfM9kOw2zC98lqJgQ1IInzAmRvpCxx5M73W4iBdppd6Q78x0MDepDkhfVcOuGdm0fKvzv3TNmEKe3QLWAnrXANL2NlpiSEgX0_ZLHfLSkdPZmMMLYGIooXXlkxUu-yRmSaGbnMk48QLWLtbutDJNC7AG2ePDIojBxTvTbK26_swnX7vRA2cDR0FxgcJgwnzV7QIEm9FEY")',
                  }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="font-heading text-2xl font-bold leading-tight text-white">Alex Duran</p>
                  <p className="text-base font-normal leading-normal text-gray-400">
                    alex.duran@email.com
                  </p>
                </div>
              </div>
              <button className="h-10 w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-gray-700 bg-gray-800 px-4 text-sm font-semibold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-white/5 sm:w-auto">
                <span className="truncate">Upload new picture</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
            <label className="flex flex-col">
              <p className="pb-2 text-sm font-medium leading-normal text-white">Full Name</p>
              <input
                type="text"
                className="h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-700 bg-gray-800 px-4 text-sm font-normal leading-normal text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/50"
                defaultValue="Alex Duran"
              />
            </label>
            <label className="flex flex-col">
              <p className="pb-2 text-sm font-medium leading-normal text-white">Email Address</p>
              <input
                type="email"
                className="h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-700 bg-gray-800 px-4 text-sm font-normal leading-normal text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/50"
                defaultValue="alex.duran@email.com"
              />
            </label>
            <label className="flex flex-col md:col-span-2">
              <p className="pb-2 text-sm font-medium leading-normal text-white">About Me</p>
              <textarea
                className="min-h-[120px] w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm font-normal leading-normal text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-5File-500/50"
                placeholder="Tell us a little about yourself..."
              ></textarea>
            </label>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button className="h-11 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-blue-500 px-5 text-sm font-semibold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-blue-600">
              <span className="truncate">Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Renders the complete Settings page, now with a navbar.
 * This component can be routed to show all settings options.
 */
export default function Settings() {
  return (
    // Updated to flex-col to stack the navbar and content
    <div className="relative flex flex-col h-auto min-h-screen w-full bg-gray-900 text-gray-300">
      <PublicNavbar />
      {/* Settings Content Area */}
      <SettingsContent />
    </div>
  );
}