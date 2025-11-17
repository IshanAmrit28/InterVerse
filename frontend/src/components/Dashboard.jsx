//frontend\src\components\Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

/**
 * Sidebar navigation component for the Dashboard.
 */
function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-shrink-0 flex-col justify-between bg-gray-800 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-2">
          <div
            className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
            aria-label="User profile photo"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDMnhDqhZEQXDtcm3y6-5sWnGfQ8WIJN8_27774oAFi1w4QcX-mkIkgXhtdtQ-ZJ_TQ7XcsChDQfscU94P23rI3qKknNs6El5AwXLPxtvpiX8rUDGRqKEh18MmqU-Cz7IH650XvKkTA5WhzNDelYdPffWOz283JIyLEKy409UPcZWhMVI6DmwRZu_mK5G1AEe90czEaqkb8HjjNvdUqCRwLgo9QttXEZk6t3YzL0kVDutrP6fSBvM-FlTFl5dCEcTZ84y4GPjtuWHq")',
            }}
          ></div>
          <div className="flex flex-col">
            <h1 className="font-heading text-base font-medium leading-normal text-white">
              Samantha Lee
            </h1>
            <p className="text-sm font-normal leading-normal text-gray-400">
              Pro Member
            </p>
          </div>
        </div>
        <nav className="mt-4 flex flex-col gap-2">
          <Link
            className="flex items-center gap-3 rounded-lg bg-blue-500/20 px-3 py-2 text-blue-500"
            to="/dashboard"
          >
            <p className="text-sm font-medium leading-normal">Dashboard</p>
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors duration-200 hover:bg-white/10"
            to="/practice"
          >
            <p className="text-sm font-medium leading-normal">Practice</p>
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors duration-200 hover:bg-white/10"
            to="/settings"
          >
            <p className="text-sm font-medium leading-normal">Settings</p>
          </Link>
        </nav>
      </div>

      <div className="flex flex-col">
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-4 text-white transition-colors duration-200 hover:bg-white/10"
          to="/"
        >
          <LogOut size={18} />
          <p className="text-sm font-medium leading-normal">Logout</p>
        </Link>
      </div>
    </aside>
  );
}

/**
 * Main content component for the Dashboard.
 * Displays stats, progress chart, and practice history.
 */
function DashboardContent() {
  const [practiceHistory, setPracticeHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch practice history from API
    const fetchPracticeHistory = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/practice-history");
        const data = await response.json();
        setPracticeHistory(data);
      } catch (error) {
        console.error("Error fetching practice history:", error);
        // Use mock data if API fails
        setPracticeHistory([
          {
            _id: "691b52cc4af956566a50b65e",
            date: "Oct 28, 2023",
            topic: "System Design",
            mode: "AI Mock",
            score: 88,
          },
          {
            _id: "691b52cc4af956566a50b65f",
            date: "Oct 25, 2023",
            topic: "Behavioral",
            mode: "Timed Quiz",
            score: 76,
          },
          {
            _id: "691b52cc4af956566a50b660",
            date: "Oct 22, 2023",
            topic: "Data Structures",
            mode: "AI Mock",
            score: 92,
          },
          {
            _id: "691b52cc4af956566a50b661",
            date: "Oct 19, 2023",
            topic: "Algorithms",
            mode: "Peer Review",
            score: 81,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPracticeHistory();
  }, []);

  return (
    <main className="flex-1 p-8">
      <div className="mx-auto max-w-7xl">
        {/* PageHeading */}
        <div className="mb-6 flex flex-wrap justify-between gap-3">
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white">
            Welcome back, Samantha 👋
          </h1>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-gray-700 bg-gray-800 p-6">
            <p className="text-base font-medium leading-normal text-white">
              Average Score
            </p>
            <p className="text-3xl font-bold leading-tight text-white">82%</p>
            <p className="text-base font-medium leading-normal text-green-500">
              +5.2%
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-gray-700 bg-gray-800 p-6">
            <p className="text-base font-medium leading-normal text-white">
              Sessions Completed
            </p>
            <p className="text-3xl font-bold leading-tight text-white">28</p>
            <p className="text-base font-medium leading-normal text-green-500">
              +12.0%
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-gray-700 bg-gray-800 p-6">
            <p className="text-base font-medium leading-normal text-white">
              Top Skill
            </p>
            <p className="truncate text-3xl font-bold leading-tight text-white">
              System Design
            </p>
            <p className="text-base font-medium leading-normal text-gray-400">
              Previous: Behavioral
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-gray-700 bg-gray-800 p-6">
            <p className="text-base font-medium leading-normal text-white">
              Time Practicing
            </p>
            <p className="text-3xl font-bold leading-tight text-white">
              14h 32m
            </p>
            <p className="text-base font-medium leading-normal text-green-500">
              +8.5%
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8 flex flex-wrap gap-4 py-6">
          <div className="flex w-full flex-1 flex-col gap-2 rounded-xl border border-gray-700 bg-gray-800 p-6">
            <p className="font-heading text-lg font-medium leading-normal text-white">
              Progress Over Time
            </p>
            <div className="flex items-baseline gap-4">
              <p className="text-4xl font-bold leading-tight tracking-light text-white">
                82%
              </p>
              <div className="flex gap-1">
                <p className="text-base font-normal leading-normal text-gray-400">
                  Last 30 Days
                </p>
                <p className="text-base font-medium leading-normal text-green-500">
                  +5.2%
                </p>
              </div>
            </div>
            <div className="flex min-h-[220px] flex-1 flex-col gap-8 py-4">
              <svg
                fill="none"
                height="100%"
                preserveAspectRatio="none"
                viewBox="-3 0 478 150"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                  fill="url(#paint0_linear_chart)"
                ></path>
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                  stroke="#13b6ec"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear_chart"
                    x1="236"
                    x2="236"
                    y1="1"
                    y2="149"
                  >
                    <stop stopColor="#13b6ec" stopOpacity="0.3"></stop>
                    <stop offset="1" stopColor="#13b6ec" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="-mt-4 flex justify-around">
                <p className="text-sm font-medium leading-normal text-gray-400">
                  Week 1
                </p>
                <p className="text-sm font-medium leading-normal text-gray-400">
                  Week 2
                </p>
                <p className="text-sm font-medium leading-normal text-gray-400">
                  Week 3
                </p>
                <p className="text-sm font-medium leading-normal text-gray-400">
                  Week 4
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SectionHeader + Table */}
        <div className="flex flex-col">
          <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-white px-2 pb-3 pt-5">
            Recent Practice History
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Date
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Topic
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Mode
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Score
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Report
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-8 text-center text-gray-400"
                      >
                        Loading practice history...
                      </td>
                    </tr>
                  ) : practiceHistory.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-8 text-center text-gray-400"
                      >
                        No practice history available
                      </td>
                    </tr>
                  ) : (
                    practiceHistory.map((practice, index) => (
                      <tr
                        key={practice._id || index}
                        className={`border-b border-gray-700 transition-colors duration-200 hover:bg-white/5 ${
                          index === practiceHistory.length - 1
                            ? "border-b-0"
                            : ""
                        }`}
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                          {practice.date}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                          {practice.topic}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                          {practice.mode}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                          {practice.score}%
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link
                            to={`/report/${practice._id}`}
                            className="font-medium text-blue-500 hover:underline"
                          >
                            View Report
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/practice"
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-blue-600"
          >
            Start New Practice
          </Link>
          <Link
            to="/reports"
            className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-600"
          >
            View All Reports
          </Link>
          <button className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-600">
            Explore Recommendations
          </button>
        </div>
      </div>
    </main>
  );
}

/**
 * Dashboard component showing user stats, progress, and history.
 * This component represents the main view for a logged-in user.
 * It's composed of a Sidebar and DashboardContent.
 */
export default function Dashboard() {
  return (
    <div className="bg-gray-900 font-display text-gray-300">
      <div className="relative flex min-h-screen w-full">
        <Sidebar />
        <DashboardContent />
      </div>
    </div>
  );
}
