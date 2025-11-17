// frontend\src\Pages\Report.jsx

import React, { useState, useEffect } from 'react';
// ✅ Import useParams to read the URL
import { useParams } from 'react-router-dom'; 
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, XCircle, TrendingUp, FileText, User, Loader2 } from 'lucide-react';

// ✅ Remove props, we get the ID from the URL now
const InterviewReport = () => { 
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    dbms: true,
    os: false,
    cn: false,
    oop: false,
    resume: false
  });

  // ✅ Get the reportId from the URL
  const { reportId } = useParams(); 
  // ✅ Hardcode the API endpoint
  const apiEndpoint = 'http://localhost:3000/api/interview'; 

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Construct the API URL
        const url = reportId 
          ? `${apiEndpoint}/${reportId}` 
          : apiEndpoint;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch report: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setReportData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching report:', err);
      } finally {
        setLoading(false);
      }
    };

    if (apiEndpoint) {
      fetchReport();
    }
  }, [reportId, apiEndpoint]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Loading State
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading interview report...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
          <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-800 mb-2 text-center">Error Loading Report</h2>
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  // No Data State
  if (!reportData) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md">
          <AlertCircle size={48} className="text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-yellow-800 mb-2 text-center">No Report Data</h2>
          <p className="text-yellow-600 text-center">No report data available to display.</p>
        </div>
      </div>
    );
  }

  // Calculate category averages
  const calculateAverage = (questions) => {
    if (!questions || questions.length === 0) return 0;
    const total = questions.reduce((sum, q) => sum + q.aiScore, 0);
    return Math.round(total / questions.length);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (score >= 4) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getChanceColor = (chance) => {
    const colors = {
      'Strong Candidate': 'bg-green-100 text-green-800 border-green-300',
      'Consider': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Weak Candidate': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[chance] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const CategorySection = ({ title, questions, sectionKey }) => {
    if (!questions || questions.length === 0) {
      return null;
    }
    
    const avgScore = calculateAverage(questions);
    
    return (
      <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(avgScore)}`}>
              Avg: {avgScore}/10
            </span>
          </div>
          {expandedSections[sectionKey] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections[sectionKey] && (
          <div className="p-6 bg-white space-y-4">
            {questions.map((q, idx) => (
              <div key={idx} className="border-l-4 border-blue-400 pl-4 py-2">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-700 flex-1">{q.question}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border whitespace-nowrap ${getScoreColor(q.aiScore)}`}>
                    {q.aiScore}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <User size={32} className="text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Interview Report</h1>
            <p className="text-gray-600">{reportData.role}</p>
          </div>
        </div>
        
        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Overall Score</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{reportData.reportStructure.overallScore}/100</p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Resume Score</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{reportData.reportStructure.ResumeScore}/100</p>
          </div>
          
          <div className={`rounded-lg p-4 border ${getChanceColor(reportData.reportStructure.hiringChance)}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">Hiring Decision</span>
            </div>
            <p className="text-2xl font-bold">{reportData.reportStructure.hiringChance}</p>
          </div>
        </div>
      </div>

      {/* Technical Questions */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Assessment</h2>
        
        {reportData.reportStructure.DBMS && reportData.reportStructure.DBMS.length > 0 && (
          <CategorySection 
            title="Database Management Systems (DBMS)" 
            questions={reportData.reportStructure.DBMS} 
            sectionKey="dbms"
          />
        )}
        
        {reportData.reportStructure.OS && reportData.reportStructure.OS.length > 0 && (
          <CategorySection 
            title="Operating Systems (OS)" 
            questions={reportData.reportStructure.OS} 
            sectionKey="os"
          />
        )}
        
        {reportData.reportStructure.CN && reportData.reportStructure.CN.length > 0 && (
          <CategorySection 
            title="Computer Networks (CN)" 
            questions={reportData.reportStructure.CN} 
            sectionKey="cn"
          />
        )}
        
        {reportData.reportStructure.OOP && reportData.reportStructure.OOP.length > 0 && (
          <CategorySection 
            title="Object-Oriented Programming (OOP)" 
            questions={reportData.reportStructure.OOP} 
            sectionKey="oop"
          />
        )}
      </div>

      {/* Resume-Based Questions */}
      {reportData.reportStructure.resumeBasedQuestions && reportData.reportStructure.resumeBasedQuestions.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={() => toggleSection('resume')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-2xl font-bold text-gray-800">Resume-Based Questions</h2>
            {expandedSections.resume ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          
          {expandedSections.resume && (
            <div className="space-y-4">
              {reportData.reportStructure.resumeBasedQuestions.map((q, idx) => (
                <div key={idx} className="border-l-4 border-purple-400 pl-4 py-2">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-gray-700 flex-1">{q.question}</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border whitespace-nowrap ${getScoreColor(q.aiScore)}`}>
                      {q.aiScore}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Feedback Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resume Feedback */}
        {reportData.reportStructure.feedbackOnResume && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Resume Evaluation</h2>
            
            {reportData.reportStructure.feedbackOnResume.strengths && reportData.reportStructure.feedbackOnResume.strengths.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <h3 className="font-semibold text-gray-700">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {reportData.reportStructure.feedbackOnResume.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-gray-600 pl-4 border-l-2 border-green-400">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {reportData.reportStructure.feedbackOnResume.weaknesses && reportData.reportStructure.feedbackOnResume.weaknesses.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={20} className="text-red-600" />
                  <h3 className="font-semibold text-gray-700">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {reportData.reportStructure.feedbackOnResume.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-gray-600 pl-4 border-l-2 border-red-400">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Interview Performance Feedback */}
        {reportData.reportStructure.feedbackOnInterviewAnswers && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Interview Performance</h2>
            
            {reportData.reportStructure.feedbackOnInterviewAnswers.strengths && reportData.reportStructure.feedbackOnInterviewAnswers.strengths.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <h3 className="font-semibold text-gray-700">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {reportData.reportStructure.feedbackOnInterviewAnswers.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-gray-600 pl-4 border-l-2 border-green-400">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {reportData.reportStructure.feedbackOnInterviewAnswers.weaknesses && reportData.reportStructure.feedbackOnInterviewAnswers.weaknesses.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={20} className="text-red-600" />
                  <h3 className="font-semibold text-gray-700">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {reportData.reportStructure.feedbackOnInterviewAnswers.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-gray-600 pl-4 border-l-2 border-red-400">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage - Demo with sample data
const App = () => {
  const [mode, setMode] = useState('demo'); // 'demo' or 'api'
  const [reportId, setReportId] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  if (mode === 'demo') {
    const sampleData = {
      role: "Frontend Developer",
      reportStructure: {
        DBMS: [
          { question: "what is normalization?", aiScore: 6 },
          { question: "What is a transaction in DBMS? What are the properties of a transaction?", aiScore: 9 },
          { question: "Explain the concept of a stored procedure in DBMS", aiScore: 0 }
        ],
        OS: [
          { question: "what is paging?", aiScore: 0 },
          { question: "what is Bankers algorithm", aiScore: 0 },
          { question: "what is the difference between moniotrs and thread", aiScore: 5 }
        ],
        CN: [
          { question: "what is TCP protocol?", aiScore: 8 },
          { question: "What is IP Spoofing", aiScore: 0 },
          { question: "What happens in the OSI model, as a data packetmoves from the lower to upper layers?", aiScore: 0 }
        ],
        OOP: [
          { question: "what is diamond problem?", aiScore: 0 },
          { question: "what is Virtual class?", aiScore: 0 },
          { question: "what is Encapsulation?", aiScore: 9 }
        ],
        resumeBasedQuestions: [
          { question: "In the SmartResumeScreener project, you used Chart.js for the analytics dashboard...", aiScore: 0 },
          { question: "In SharedSlate, you implemented real-time features using Socket.IO...", aiScore: 0 },
          { question: "Your MERN projects rely on JWT authentication and Google OAuth...", aiScore: 0 },
          { question: "SharedSlate utilized Tailwind CSS for styling complex, dual-role dashboards...", aiScore: 0 }
        ],
        ResumeScore: 65,
        overallScore: 62,
        feedbackOnResume: {
          strengths: [
            "Exceptional technical portfolio showcasing complex, full-stack applications (MERN, AI, Real-Time features), demonstrating high technical aptitude.",
            "Fluency in required technologies (JavaScript, HTML, CSS) and strong expertise in modern frameworks like React.js and Node.js.",
            "Demonstrated ability to optimize performance and engineer secure, functional platforms (e.g., JWT, OAuth, performance optimization of API calls)."
          ],
          weaknesses: [
            "Lacks the required two or more years of professional front- or back-end development experience (currently a student).",
            "Limited evidence of core front-end activities mentioned in the JD, such as creating wireframes/mockups or explicit client-facing interaction.",
            "Missing explicit mention of authoring technical documentation or collaborating with designers, key responsibilities for this role."
          ]
        },
        feedbackOnInterviewAnswers: {
          strengths: [
            "Candidate possesses a strong foundational understanding of core concepts in OOP (Encapsulation) and Database theory (ACID properties).",
            "Answers to theoretical questions (TCP protocol, Transactions) were concise, accurate, and hit the key technical points.",
            "Handled the potentially confusing question about 'moniotrs' appropriately by admitting uncertainty rather than guessing."
          ],
          weaknesses: [
            "Demonstrated a critical lack of understanding regarding security best practices for client-side JWT storage, specifically relying solely on localStorage, which is highly susceptible to XSS.",
            "Definitions for concepts like Normalization and Threads lacked depth; they were introductory rather than expert-level explanations.",
            "Failed to elaborate on common database concepts (like Normal Forms) or operating system concepts (like thread synchronization/Monitors) when presented with related questions."
          ]
        },
        hiringChance: "Consider"
      }
    };

    return (
      <div>
        <div className="bg-blue-600 text-white p-4 mb-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Demo Mode</h1>
              <p className="text-sm">Showing sample data</p>
            </div>
            <button
              onClick={() => setMode('api')}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Switch to API Mode
            </button>
          </div>
        </div>
        <InterviewReport reportData={sampleData} />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-800 text-white p-6 mb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">API Mode</h1>
            <button
              onClick={() => setMode('demo')}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Switch to Demo Mode
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Endpoint</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.example.com/reports"
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Report ID (optional)</label>
              <input
                type="text"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                placeholder="691b52cc4af956566a50b65e"
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              />
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-2">
            Enter your API endpoint to fetch report data dynamically
          </p>
        </div>
      </div>
      {apiUrl ? (
        <InterviewReport reportId={reportId} apiEndpoint={apiUrl} />
      ) : (
        <div className="max-w-6xl mx-auto p-6 text-center">
          <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please enter an API endpoint to load report data</p>
        </div>
      )}
    </div>
  );
};

export default InterviewReport;