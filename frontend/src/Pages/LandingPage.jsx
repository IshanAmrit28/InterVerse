//frontend\src\Pages\LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Main application component for the Smart Interview Coach landing page.
 * Assumes Tailwind CSS is configured in the project.
 * Updated to use standard Tailwind dark theme colors.
 */
export default function LandingPage() {
  return (
    <div className="bg-gray-900 font-display text-white">
      <div className="relative flex min-h-screen w-full flex-col">
        {/* TopNavBar */}
        <header className="sticky top-0 z-50 flex justify-center border-b border-solid border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
          <div className="flex w-full max-w-[1440px] items-center justify-between px-10 py-4">
            <div className="flex items-center gap-4 text-white">
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
            </div>
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-6">
                <Link className="text-sm font-medium leading-normal text-white hover:text-blue-400 transition-colors" to="/">Home</Link>
                <Link className="text-sm font-medium leading-normal text-white hover:text-blue-400 transition-colors" to="/practice">Practice</Link>
                <Link className="text-sm font-medium leading-normal text-white hover:text-blue-400 transition-colors" to="/dashboard">Dashboard</Link>
                <Link className="text-sm font-medium leading-normal text-white hover:text-blue-400 transition-colors" to="/report">Reports</Link>
              </nav>
              {/* Updated Buttons */}
              <div className="flex items-center gap-2">
                <Link className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-800 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-700 transition-colors" to="/login">
                  <span className="truncate">Login</span>
                </Link>
                <Link className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-500 text-gray-900 text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity" to="/signup">
                  <span className="truncate">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col items-center">
          <div className="flex w-full max-w-[1440px] flex-1 flex-col">
            {/* HeroSection */}
            <section className="w-full px-10 py-20">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="flex flex-col gap-8 text-left">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-5xl font-bold leading-tight tracking-tighter text-white font-heading xl:text-6xl">
                      Ace Your Next Interview with AI Precision.
                    </h1>
                    <p className="text-lg font-normal leading-normal text-gray-400">
                      Simulate interviews, analyze your performance, and track progress intelligently.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className="w-full aspect-square max-w-md lg:max-w-none rounded-xl bg-center bg-no-repeat bg-cover"
                    aria-label="3D illustration of an AI interviewer and a user at a desk"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9UlO-Q2OaG18D_veGTBHiTYHkI8mmlaB2O-GZlslJvGgfgmwpGffXSgyfrtUtew1vKqzvQgfm-fr5NCpaUUWN0wQPO6JPzt_30jdF1D5onYqGRvSfxgyGMyUczG_KYUeR9ARjZX3N2X2Y6R-Zde54FO9XjMq6tkZXNMpLtNMgjBF9apE55fqQMCRATKS6l07MngCc4qSU7NLGz5oF7qTm06qBkGe8zjhJ-IHqPDd_5vsAaz7ANA-z8hBtdIT7mXYB0Rhu6vix8D6H")',
                    }}
                  ></div>
                </div>
              </div>
            </section>
            {/* FeatureSection */}
            <section className="flex flex-col gap-10 px-10 py-20">
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-4xl font-bold leading-tight tracking-tighter text-white font-heading max-w-2xl">
                  Unlock Your Potential with Smart Features
                </h2>
                <p className="text-base font-normal leading-normal text-gray-400 max-w-2xl">
                  Our advanced tools are designed to give you the confidence and skills to excel in any interview.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-1 flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6 transition-transform hover:-translate-y-1">
                  <div className="text-blue-500">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                      smart_toy
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold leading-tight text-white font-heading">AI-Powered Interview Simulation</h3>
                    <p className="text-sm font-normal leading-normal text-gray-400">
                      Engage in realistic, AI-driven mock interviews tailored to your target role and industry.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6 transition-transform hover:-translate-y-1">
                  <div className="text-blue-500">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                      headset_mic
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold leading-tight text-white font-heading">Voice &amp; Video Analysis</h3>
                    <p className="text-sm font-normal leading-normal text-gray-400">
                      Receive in-depth feedback on your verbal and non-verbal communication skills.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6 transition-transform hover:-translate-y-1">
                  <div className="text-blue-500">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                      pie_chart
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold leading-tight text-white font-heading">Detailed Reports &amp; Recommendations</h3>
                    <p className="text-sm font-normal leading-normal text-gray-400">
                      Get actionable insights on your performance to pinpoint areas for improvement.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6 transition-transform hover:-translate-y-1">
                  <div className="text-blue-500">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                      trending_up
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold leading-tight text-white font-heading">Skill Growth Tracker</h3>
                    <p className="text-sm font-normal leading-normal text-gray-400">
                      Visualize your progress over time with intelligent analytics and performance metrics.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* How It Works Section */}
            <section className="flex flex-col gap-10 px-10 py-20">
              <h2 className="text-center text-4xl font-bold leading-tight tracking-tighter text-white font-heading">How It Works</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-1 flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6">
                  <div className="text-blue-500">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                      play_circle
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold leading-tight text-white font-heading">1. Start a Mock Interview</h3>
                    <p className="text-sm font-normal leading-normal text-gray-400">
                      Choose an interview type and begin your practice session anytime, anywhere.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6">
                  <div className="text-blue-500">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                      auto_awesome
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold leading-tight text-white font-heading">2. Get AI-Powered Feedback</h3>
                    <p className="text-sm font-normal leading-normal text-gray-400">
                      Our AI analyzes your responses, tone, and body language to provide instant, detailed feedback.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6">
                  <div className="text-blue-500">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                      show_chart
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold leading-tight text-white font-heading">3. Track Your Improvement</h3>
                    <p className="text-sm font-normal leading-normal text-gray-400">
                      Review your reports, identify growth areas, and watch your skills improve over time.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* Testimonials Section */}
            <section className="flex flex-col gap-10 px-10 py-20">
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-4xl font-bold leading-tight tracking-tighter text-white font-heading">What Our Users Say</h2>
                <p className="text-base font-normal leading-normal text-gray-400">Hear from professionals who landed their dream jobs with our help.</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-6 rounded-lg border border-gray-700 bg-gray-800 p-6">
                  <p className="text-base font-normal text-gray-400">
                    "The AI feedback was a game-changer. I identified weak spots I never knew I had and walked into my interview with so much more confidence."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      alt="Profile picture of Sarah L."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZy0S7ObVbcKU7uMBGzWPOr2KNQHRnkBLAv0cDoir-VY11dPDD-uMu0tBQIo2U3YHrmMJ73Z_N1Myk2f3XQDcfj59c6X6eRwIJ_jMBLDZLOXSWwaXHPbdErINOdKSl0220nGQeGmOJ6VCQJ6gMjtdw14eeVZ1c5gsbsZF2jUQNJQS7cpagwfU_3aqP-2MWPev3kCxc53d2OP4YfaSLy-AWA-CbHtglclJYGc4DNbavYkK6VnJzYLf9UynXZGXBGcFRYH9HAGyJMdp2"
                    />
                    <div>
                      <p className="font-bold text-white">Sarah L.</p>
                      <p className="text-sm text-gray-400">Software Engineer</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 rounded-lg border border-gray-700 bg-gray-800 p-6">
                  <p className="text-base font-normal text-gray-400">
                    "This tool is incredible for practicing behavioral questions. The reports are detailed and helped me structure my answers much more effectively."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      alt="Profile picture of Mark C."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVkGCb5_8GPsWTu1NgqqoMdb3v4BwhT1Iwvfx5QswNqJR4Z57KmMQsLgw-JyecdV1AiwiiqmL31NB83pvpW8Cg9pBgjIVCMunVbF5wVVpNEwyMZMEnQ3FjsR6aJ8-JbecgqVE_M0WhHLDlY2NcZLi8yDY0go5mIzN-4Gfgv2H-K90yufkHFtu-IlpLbdejHKKh2J6uzkFwys21fzrM9a_l4K3aopbSRfEbgtM6hQHmMnKtAW74DpOhiDcrU3zWV-H8t50KUbYrugu_"
                    />
                    <div>
                      <p className="font-bold text-white">Mark C.</p>
                      <p className="text-sm text-gray-400">Product Manager</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 rounded-lg border border-gray-700 bg-gray-800 p-6">
                  <p className="text-base font-normal text-gray-400">
                    "I used Smart Interview Coach for a week and landed a job at my dream company. The progress tracker kept me motivated and focused."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      alt="Profile picture of Emily R."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjBx_ZNQ4xt-heVypsWjHuBOJXk4MtpspvRvSFG9ZUmK2_5s1vmL8owaryqTQENIW3lzw3UqRHw6AlNQ8AdJsjySRuLwebZ27thlqsBWA2oS4S1vFe0UykTGO7L1JsYR9UtpX5Cp5dUcXev8RBvTPiovpdscsHbt_ssaaMKHraCnPqvu60Nu5gIsyOV5mKozf7pkxSv4zFxZrI6_zGQYYV5SrnO5FfPW3XWigtAQ7n2pE37SXSxw2bCb0k2IS6T2NEEjHb1OpA-Ue3"
                    />
                    <div>
                      <p className="font-bold text-white">Emily R.</p>
                      <p className="text-sm text-gray-400">UX Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        {/* Footer has been removed as requested */}
      </div>
    </div>
  );
}