// frontend/src/components/PracticeSetup.jsx
import React, { useState, useRef } from "react";
import { X, Upload, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { startInterview } from "../services/interviewService";

// HARDCODED CANDIDATE ID (FOR DEMO ONLY)
const CANDIDATE_ID = "6912c711cabf1fe8c3bd941c";

const PracticeSetup = () => {
  const [role, setRole] = useState("Software Engineer");
  const [jobDescription, setJobDescription] = useState(
    "We are looking for an experienced developer proficient in MERN stack and data structures."
  );
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Hardcoded navigation to mock the dashboard exit
  const onClose = () => navigate("/");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      setResumeFile(null);
      return;
    }
    setResumeFile(file);
    setError(null);
  };

  const handleStart = async (e) => {
    e.preventDefault();
    setError(null);

    if (!role || !jobDescription || !resumeFile) {
      setError("Please fill all fields and upload a resume.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("candidateId", CANDIDATE_ID);
      formData.append("role", role);
      formData.append("jobDescription", jobDescription);
      formData.append("resumeFile", resumeFile);

      const result = await startInterview(formData);

      // Navigate to the interview room, passing the critical data
      navigate("/interview", {
        state: {
          reportId: result.reportId,
          reportStructure: result.reportStructure,
        },
      });
    } catch (err) {
      console.error("Interview Start Failed:", err);
      // Using alert() replacement for quick user feedback
      setError(err.message || "Failed to start interview. Check API status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 font-sans text-gray-100 min-w-[1280px]">
      <div className="relative z-10 w-full max-w-4xl flex flex-col rounded-xl bg-gray-800 p-10 shadow-2xl border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          <X size={24} />
        </button>
        <h1 className="text-3xl font-bold text-white pb-6 text-center">
          Prepare for Your Interview
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-500 text-red-300 rounded-lg text-sm font-medium">
            Error: {error}
          </div>
        )}

        <form className="w-full space-y-6" onSubmit={handleStart}>
          {/* Role Input */}
          <label className="flex flex-col">
            <p className="pb-2 text-base font-medium text-white">
              Target Role (Hardcoded User ID: {CANDIDATE_ID})
            </p>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Frontend Engineer"
              className="h-12 w-full rounded-lg border border-gray-700 bg-gray-700/50 px-4 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              required
            />
          </label>

          {/* Job Description */}
          <label className="flex flex-col">
            <p className="pb-2 text-base font-medium text-white">
              Job Description (JD)
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="h-48 w-full resize-y rounded-lg border border-gray-700 bg-gray-700/50 p-4 font-mono text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              required
            ></textarea>
          </label>

          {/* Resume Upload */}
          <div className="flex flex-col">
            <p className="pb-2 text-base font-medium text-white">
              Upload Resume (PDF/DOCX, Max 10MB)
            </p>
            <div
              className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gray-700 px-6 py-8 cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <Upload size={32} className="text-gray-400" />
              {resumeFile ? (
                <p className="text-lg font-bold text-green-400">
                  {resumeFile.name}
                </p>
              ) : (
                <p className="text-sm font-normal text-gray-400">
                  Click here to browse or drag & drop.
                </p>
              )}
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="h-12 w-full flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-5 text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Starting Interview...
                </>
              ) : (
                <>
                  <Play size={20} />
                  Start Interview
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PracticeSetup;
