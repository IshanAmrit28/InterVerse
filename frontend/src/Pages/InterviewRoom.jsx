// frontend/src/pages/InterviewRoom.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  PhoneOff,
  Play,
  Volume2,
  Video,
  VideoOff,
  Loader2,
  FileText,
} from "lucide-react";
import { endInterview } from "../services/interviewService";

// HARDCODED CANDIDATE ID (FOR DEMO ONLY)
const CANDIDATE_ID = "6912c711cabf1fe8c3bd941c";
const CANDIDATE_NAME = "Candidate Demo";

// --- Components (Inline for single-file mandate context) ---

const ControlButton = ({ onClick, className, children, disabled = false }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full text-white transition-all duration-200 shadow-xl ${className} ${
      disabled ? "bg-gray-500 cursor-not-allowed opacity-70" : ""
    }`}
    disabled={disabled}
  >
    {children}
  </button>
);

const ParticipantTile = ({
  name,
  isMuted,
  isCameraOff,
  isSpeaking,
  avatarUrl,
}) => (
  <div className="relative w-full h-full bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden border-2 border-gray-700">
    {isSpeaking && (
      <div className="absolute inset-0 border-4 border-blue-500 rounded-xl ring-4 ring-blue-500 ring-opacity-50 animate-pulse transition-all duration-100" />
    )}
    <div className="flex flex-col items-center justify-center">
      {isCameraOff ? (
        <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-5xl font-bold text-white">
            {name.charAt(0)}
          </span>
        </div>
      ) : (
        <img
          src={avatarUrl}
          alt={`${name} avatar`}
          className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-gray-600"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/192x192/4b5563/ffffff?text=AI";
          }}
        />
      )}
      {isSpeaking && (
        <Volume2 className="w-8 h-8 text-blue-400 mt-6 animate-pulse" />
      )}
    </div>
    <div className="absolute bottom-5 left-6 p-2 px-4 bg-black bg-opacity-70 rounded-lg shadow-md">
      <span className="text-lg font-medium text-white">{name}</span>
      {isMuted && <MicOff className="w-5 h-5 text-red-500 ml-2 inline-block" />}
    </div>
  </div>
);

// --- Main Interview Component ---

const InterviewRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initial data passed from PracticeSetup
  const initialReportData = location.state?.reportStructure || {
    DBMS: [],
    OS: [],
    CN: [],
    OOP: [],
    "Resume based question": [],
  };
  const initialReportId = location.state?.reportId;

  // --- State Management ---
  const [reportData, setReportData] = useState(initialReportData);
  const [reportId, setReportId] = useState(initialReportId);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interviewStatus, setInterviewStatus] = useState("idle"); // idle, running, submitting, finished
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [statusMessage, setStatusMessage] = useState("Click Start to begin.");
  const [error, setError] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // --- Refs ---
  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);
  const questionIndexRef = useRef(questionIndex);
  const timerRef = useRef(null);
  const transcriptRef = useRef(""); // To hold the final captured answer

  const questionKeys = Object.keys(reportData).filter((key) =>
    Array.isArray(reportData[key])
  );
  const allQuestions = questionKeys.flatMap((key) =>
    reportData[key].map((q) => ({ ...q, category: key }))
  );
  const currentQuestion = allQuestions[questionIndex];
  const totalQuestions = allQuestions.length;

  // Sync Refs
  useEffect(() => {
    questionIndexRef.current = questionIndex;
  }, [questionIndex]);

  // Timer Logic
  useEffect(() => {
    if (interviewStatus === "running") {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [interviewStatus]);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  // --- Speech Helper Functions ---
  const speakQuestion = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        console.warn("TTS not supported.");
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);

      const loadVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      loadVoices();
      const voices = voicesRef.current;

      const chosenVoice =
        voices.find(
          (v) => v.lang.includes("en-US") && v.name.includes("Google")
        ) || voices.find((v) => v.lang.includes("en-US"));

      if (chosenVoice) utter.voice = chosenVoice;
      utter.rate = 0.95;

      utter.onstart = () => setIsInterviewerSpeaking(true);
      utter.onend = () => {
        setIsInterviewerSpeaking(false);
        resolve();
      };
      utter.onerror = (e) => {
        console.error("TTS Error:", e);
        setIsInterviewerSpeaking(false);
        resolve();
      };
      window.speechSynthesis.speak(utter);
    });
  };

  const startListening = () => {
    // Fixed typo: removed space
    if (!recognitionRef.current || isListening) return;
    try {
      // Abort any pending recognition before starting new one
      recognitionRef.current.abort();
      recognitionRef.current.start();
    } catch (e) {
      if (e.name !== "InvalidStateError") {
        console.error("Error starting recognition:", e);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      // Use abort() to stop immediately without waiting for the onend event
      recognitionRef.current.abort();
    }
  };

  // --- Speech Recognition/Synthesis Setup ---
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Web Speech API not supported. Voice features unavailable.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setStatusMessage("Listening... Speak now.");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      // Update live transcription
      setTranscript(finalTranscript || interimTranscript);
      if (finalTranscript) {
        // Store the final transcript in ref immediately
        transcriptRef.current = finalTranscript;
        // If final result comes in, immediately stop recognition to process the answer
        stopListening();
        // We DON'T call handleAnswerSubmit here, it is handled by the useEffect that watches isMicOn
      }
    };

    // This should only fire if recognition stops due to timeout or system events.
    recognition.onend = () => {
      setIsListening(false);
      // If the microphone was still intended to be ON but recognition timed out, process the answer.
      if (isMicOn) {
        handleAnswerSubmit(transcriptRef.current);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error !== "no-speech" && event.error !== "audio-capture") {
        setError(`Mic Error: ${event.error}.`);
      }
    };

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

  // --- Answer Submission & Next Question Logic ---

  const updateReportWithAnswer = (answerText) => {
    if (!currentQuestion) return;
    const { category, questionId } = currentQuestion;

    setReportData((prevData) => {
      const newReportData = { ...prevData };
      const categoryArray = newReportData[category];

      const qIndex = categoryArray.findIndex(
        (q) => q.questionId === questionId
      );

      if (qIndex !== -1) {
        categoryArray[qIndex] = {
          ...categoryArray[qIndex],
          answer: answerText,
        };
      }
      return newReportData;
    });
  };

  const handleAnswerSubmit = (finalAnswer) => {
    // This function processes the final answer and sets up the next question.
    stopListening();
    setIsMicOn(false);

    const answerText = finalAnswer.trim() || "(No response recorded)";
    updateReportWithAnswer(answerText);

    setStatusMessage(`Answer recorded: ${answerText.substring(0, 50)}...`);
    transcriptRef.current = "";
    setTranscript("");

    setTimeout(askNextQuestion, 2000);
  };

  const askNextQuestion = () => {
    if (questionIndexRef.current + 1 >= totalQuestions) {
      handleEndInterview(false);
      return;
    }

    const nextIndex = questionIndexRef.current + 1;
    const nextQuestion = allQuestions[nextIndex].question;

    setStatusMessage("Interviewer is speaking...");

    speakQuestion(nextQuestion)
      .then(() => {
        setQuestionIndex(nextIndex);
        setStatusMessage("Ready for your answer. Click the mic button.");
      })
      .catch((err) => {
        setError("Failed to speak question.");
        console.error(err);
      });
  };

  // --- Control Handlers ---

  const handleStartInterview = async () => {
    if (interviewStatus === "running" || totalQuestions === 0) return;

    setInterviewStatus("running");
    setElapsedTime(0);
    setError(null);
    setQuestionIndex(-1);

    const greeting =
      "Hello, and welcome to the interview simulator. We will now begin.";
    setStatusMessage("Interviewer is speaking...");

    await speakQuestion(greeting);

    askNextQuestion();
  };

  const handleMicToggle = () => {
    if (interviewStatus !== "running" || isInterviewerSpeaking) return;

    // If Mic is currently ON, user is turning it OFF (End of answer)
    if (isMicOn) {
      stopListening();
      // Trigger processing immediately with the current captured transcript
      handleAnswerSubmit(transcriptRef.current);
    } else {
      // If Mic is currently OFF, user is turning it ON (Start of answer)
      setTranscript("");
      transcriptRef.current = "";
      startListening();
    }
    setIsMicOn(!isMicOn);
  };

  // Final submission and redirect
  const handleEndInterview = async (isManualStop) => {
    setInterviewStatus("submitting");
    stopListening();
    window.speechSynthesis.cancel();

    setStatusMessage("Submitting answers for AI grading...");

    const finalReportPayload = {
      reportId: reportId,
      candidateId: CANDIDATE_ID,
      reportStructure: reportData,
    };

    try {
      await endInterview(finalReportPayload);

      navigate(`/report/${reportId}`, { replace: true });
    } catch (err) {
      setError(err.message || "Submission failed. Check network.");
      setInterviewStatus("idle");
      setStatusMessage("Submission failed. You can try submitting again.");
    }
  };

  // Initial check for required data
  if (!initialReportId || totalQuestions === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white min-w-[1280px]">
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl border border-red-500/30">
          <h1 className="text-3xl font-bold text-red-400 mb-4">
            Interview Setup Error
          </h1>
          <p className="text-gray-300 mb-6">
            Missing vital interview data. Please start a session from the
            Practice page.
          </p>
          <button
            onClick={() => navigate("/practice")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Go to Practice Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white font-sans min-w-[1280px]">
      {/* Left Panel: Video Tiles */}
      <div className="w-2/3 h-full p-6 flex flex-col gap-6">
        <div className="h-1/2">
          <ParticipantTile
            name={CANDIDATE_NAME}
            isMuted={!isMicOn || isListening}
            isCameraOff={true}
            avatarUrl="https://placehold.co/500x500/27272a/ffffff?text=CANDIDATE"
          />
        </div>
        <div className="h-1/2">
          <ParticipantTile
            name="AI Interviewer"
            isMuted={false}
            isCameraOff={true}
            isSpeaking={isInterviewerSpeaking}
            avatarUrl="https://placehold.co/500x500/27272a/ffffff?text=AI+INTERVIEWER"
          />
        </div>
      </div>

      {/* Right Panel: Controls and Transcript */}
      <div className="w-1/3 h-full bg-gray-800 border-l border-gray-700 p-6 flex flex-col justify-between">
        {/* Top Info */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-700">
          <div className="text-2xl font-bold text-blue-400">
            {currentQuestion
              ? `Q ${questionIndex + 1} of ${totalQuestions}`
              : "Ready"}
          </div>
          <div className="flex flex-col items-end">
            <p className="text-lg text-gray-400">Time Elapsed</p>
            <span className="text-2xl font-mono font-bold text-white">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>

        {/* Question & Transcript Area */}
        <div className="flex-1 py-6 overflow-y-auto space-y-6">
          <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
            <h3 className="font-bold text-lg text-blue-300 mb-2">
              Interviewer:
            </h3>
            <p className="text-xl text-white">
              {currentQuestion?.question || statusMessage}
            </p>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 h-1/2 max-h-[300px] overflow-y-auto font-mono text-sm">
            <h3 className="font-bold text-lg text-gray-300 mb-2">
              Your Live Transcript:
            </h3>
            <p
              className={`text-gray-200 ${
                isListening ? "animate-pulse text-green-400" : "text-gray-400"
              }`}
            >
              {transcript ||
                (isListening ? "Listening..." : "Speak by toggling the mic.")}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-600/20 text-red-300 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Control Bar */}
        <div className="flex flex-col items-center pt-6 border-t border-gray-700">
          {interviewStatus === "idle" && (
            <ControlButton
              onClick={handleStartInterview}
              className="bg-green-600 hover:bg-green-500 w-full"
              disabled={totalQuestions === 0}
            >
              <Play size={20} className="mr-2" /> Start Interview
            </ControlButton>
          )}

          {interviewStatus === "running" || interviewStatus === "submitting" ? (
            <>
              <div className="flex space-x-6 mb-4">
                <ControlButton
                  onClick={handleMicToggle}
                  className={
                    isMicOn
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-gray-600 hover:bg-gray-700"
                  }
                  disabled={
                    isInterviewerSpeaking || interviewStatus === "submitting"
                  }
                >
                  {isMicOn ? <MicOff size={24} /> : <Mic size={24} />}
                </ControlButton>

                <ControlButton
                  className="bg-gray-600 hover:bg-gray-700"
                  disabled={true} // Camera always off for this phase
                >
                  <VideoOff size={24} />
                </ControlButton>
              </div>

              <ControlButton
                onClick={() => handleEndInterview(true)}
                className="bg-red-600 hover:bg-red-500 w-full"
                disabled={interviewStatus === "submitting"}
              >
                {interviewStatus === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 mr-2" /> Submitting
                    Report...
                  </>
                ) : (
                  <>
                    <PhoneOff size={20} className="mr-2" /> End Interview
                  </>
                )}
              </ControlButton>
            </>
          ) : null}

          {interviewStatus === "finished" && (
            <div className="text-center w-full">
              <p className="text-xl font-bold text-green-400 mb-4">
                Interview Ended.
              </p>
              <ControlButton
                onClick={() => navigate(`/report/${reportId}`)}
                className="bg-blue-600 hover:bg-blue-500 w-full"
              >
                <FileText size={20} className="mr-2" /> View Final Report
              </ControlButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
