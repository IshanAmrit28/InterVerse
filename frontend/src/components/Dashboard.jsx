// frontend/src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authServices";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";
import { LogOut, FileText, Loader2, PlayCircle } from "lucide-react";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchReportSummaries = async () => {
      // The user object contains an array of report IDs: user.report = ["id1", "id2"]
      const reportIds = user.report || [];

      if (reportIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // We fetch each report to get its metadata (Topic, Score, Date) for the list.
        const promises = reportIds.map(
          (id) =>
            fetch(`${API_BASE_URL}${API_ENDPOINTS.INTERVIEW.GET_REPORT}/${id}`)
              .then((res) => {
                if (!res.ok) throw new Error("Failed");
                return res.json();
              })
              .catch((err) => null) // Catch errors so one failure doesn't break the whole list
        );

        const results = await Promise.all(promises);

        // Filter out nulls and map to a clean structure
        const validReports = results
          .filter((item) => item !== null)
          .map((item) => ({
            id: item.reportId || item._id,
            role: item.role || "Interview Session", // Fallback if role isn't in top level
            score: item.reportStructure?.overallScore || 0,
            date: item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "Recent",
            status: "Completed",
          }));

        // Reverse to show newest first
        setReports(validReports.reverse());
      } catch (error) {
        console.error("Error loading dashboard reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportSummaries();
  }, [navigate, user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null; // Auth check redirects in useEffect

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-blue-500">Smart Coach</h1>
        </div>

        <div className="p-6 flex-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold text-white">
              {user.userName?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-white truncate">{user.userName}</p>
              <p className="text-xs text-gray-400 truncate">{user.userType}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg"
            >
              <FileText size={18} />
              <span>My Reports</span>
            </Link>
            <Link
              to="/practice"
              className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <PlayCircle size={18} />
              <span>New Practice</span>
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Interview Reports
              </h2>
              <p className="text-gray-400 mt-1">
                Review your performance history and detailed feedback.
              </p>
            </div>
            <Link
              to="/practice"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg hover:shadow-blue-600/20"
            >
              Start New Interview
            </Link>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700/50 text-gray-400 text-sm uppercase border-b border-gray-700">
                  <th className="px-6 py-4 font-medium tracking-wider">
                    Role / Topic
                  </th>
                  <th className="px-6 py-4 font-medium tracking-wider">Date</th>
                  <th className="px-6 py-4 font-medium tracking-wider">
                    Overall Score
                  </th>
                  <th className="px-6 py-4 font-medium tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-20 text-center text-gray-400"
                    >
                      <div className="flex justify-center items-center gap-3">
                        <Loader2
                          className="animate-spin text-blue-500"
                          size={24}
                        />
                        <span className="text-lg">Loading your history...</span>
                      </div>
                    </td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-20 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <FileText size={48} className="text-gray-600" />
                        <p className="text-lg">No interviews found yet.</p>
                        <Link
                          to="/practice"
                          className="text-blue-400 hover:underline"
                        >
                          Start your first practice session
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  reports.map((report, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-700/30 transition-colors group"
                    >
                      <td className="px-6 py-5 text-white font-medium">
                        {report.role}
                      </td>
                      <td className="px-6 py-5 text-gray-400">{report.date}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold border ${
                            report.score >= 80
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : report.score >= 50
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                        >
                          {report.score}%
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link
                          to={`/report/${report.id}`}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline opacity-80 group-hover:opacity-100 transition-opacity"
                        >
                          View Details &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
