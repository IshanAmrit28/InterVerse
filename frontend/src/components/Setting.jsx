import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Renders the sidebar navigation specific to the Settings page.
 */
function SettingsSidebar() {
  return (
    // Changed w-64 (16rem) to w-72 (18rem) to give the title more space
    <aside className="sticky top-0 flex h-screen w-72 flex-shrink-0 flex-col justify-between border-r border-gray-700 p-6">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <h1 className="font-heading text-xl font-bold text-white">Smart Coach</h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg bg-blue-500/20 px-3 py-2 text-blue-500"
          >
            <span className="material-symbols-outlined text-2xl">person</span>
            <p className="text-sm font-semibold leading-normal">Profile</p>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-gray-200"
          >
            <span className="material-symbols-outlined text-2xl">lock</span>
            <p className="text-sm font-medium leading-normal">Security</p>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-gray-200"
          >
            <span className="material-symbols-outlined text-2xl">tune</span>
            <p className="text-sm font-medium leading-normal">Preferences</p>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-gray-200"
          >
            <span className="material-symbols-outlined text-2xl">contrast</span>
            <p className="text-sm font-medium leading-normal">Theme</p>
          </Link>
        </div>
      </div>

      {/* Footer Logout */}
      <div className="flex flex-col gap-1">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-gray-200"
        >
          <span className="material-symbols-outlined text-2xl">logout</span>
          <p className="text-sm font-medium leading-normal">Logout</p>
        </Link>
      </div>
    </aside>
  );
}

/**
 * Renders the main content for the Profile Settings page.
 */
function SettingsContent() {
  return (
    <main className="flex-1 p-10">
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
                className="min-h-[120px] w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm font-normal leading-normal text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/50"
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
 * Renders the complete Settings page, including its sidebar and main content.
 * This component can be routed to show all settings options.
 */
export default function Settings() {
  return (
    <div className="relative flex h-auto min-h-screen w-full bg-gray-900 text-gray-300">
      {/* Settings-specific Sidebar */}
      <SettingsSidebar />

      {/* Settings Content Area */}
      <SettingsContent />
    </div>
  );
}