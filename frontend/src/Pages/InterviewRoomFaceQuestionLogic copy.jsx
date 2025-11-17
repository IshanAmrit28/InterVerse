//frontend\src\Pages\InterviewRoomFaceQuestionLogic copy.jsx
import React, { useState, useEffect, useRef } from "react";
import { useFaceDetection } from "../components/useFaceDetection";
import { ParticipantTile, ControlBar } from "../components/MeetComponents";
import { fetchAllQuestionsTextOnly } from "../services/fetchQuestions";
import { XCircle } from "lucide-react";

// Hardcoded remote user (Interviewer)
const remoteUser = {
  name: "Jane Doe",
  isMuted: true,
};

export default function GoogleMeetSimple() {
  // --- Media State ---
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  // --- Interview State ---
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [interviewStatus, setInterviewStatus] = useState("idle");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Loading questions...");
  const [error, setError] = useState("");
  const [interviewData, setInterviewData] = useState([]);

  // --- Refs ---
  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);
  const questionIndexRef = useRef(currentQuestionIndex);
  const transcriptRef = useRef("");

  // --- Hook for Face Detection ---
  const { faceMapRef, clearFaceMap } = useFaceDetection(isCameraOn, videoRef);

  // --- Sync ref with state ---
  useEffect(() => {
    questionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  // --- 1. Load Questions ---
  useEffect(() => {
    const fetchQuestions = async () => {
      // ... (This logic is unchanged)
      setIsLoading(true);
      setError("");
      try {
        const fetchedQuestions = await fetchAllQuestionsTextOnly();
        const behavioralQuestions = [
          "Tell me about a time you faced a major coding challenge — how did you handle it?",
          "How do you manage your time when working on multiple projects?",
        ];

        if (fetchedQuestions.length === 0 && behavioralQuestions.length === 0) {
          setError(
            "Could not load any questions. Please check the API and network."
          );
          setStatusMessage("Error loading questions.");
        } else {
          setQuestions([...fetchedQuestions, ...behavioralQuestions]);
          setStatusMessage("Press Start to begin the interview.");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load interview questions. Please try refreshing.");
        setStatusMessage("Could not load questions.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // --- 2. Setup Speech Recognition & Synthesis ---
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    if (window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Web Speech API is not supported. Please use Chrome or Edge.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setStatusMessage("Listening...");
      setError("");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript);
      transcriptRef.current = finalTranscript;
    };

    recognition.onend = () => {
      setIsListening(false);

      // Only proceed if the interview is supposed to be running
      if (interviewStatus !== "running") {
        return;
      }

      if (transcriptRef.current) {
        setStatusMessage("Processing answer...");
        setInterviewData((prevData) => [
          ...prevData,
          {
            question: questions[questionIndexRef.current],
            answer: transcriptRef.current,
          },
        ]);
        transcriptRef.current = "";
        setTimeout(() => {
          askNextQuestion();
        }, 1000);
      } else {
        // No answer was recorded (e.g., 'no-speech' timeout)
        setStatusMessage("Didn't catch that. Listening again...");
        console.log("No speech detected, restarting listening.");
        setTimeout(() => {
          startListeningForAnswer(); // Just listen again
        }, 500);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "no-speech") {
        // 'onend' will handle this, so just log it.
        console.warn("Speech error: no-speech");
      } else if (event.error === "audio-capture") {
        setError("Audio capture error. Is your microphone working?");
        handleStopInterview();
      } else if (event.error === "not-allowed") {
        setError(
          "Microphone permission was denied. Please allow access and restart."
        );
        handleStopInterview();
      } else {
        setError(`Speech error: ${event.error}.`);
        console.error("Speech Recognition Error:", event.error);
      }
    };

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      }
    };
  }, [questions, interviewStatus]); // Keep interviewStatus dependency

  // --- 3. Media Stream Logic ---
  useEffect(() => {
    // ... (This logic is unchanged)
    const startLocalVideo = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(localStream);
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
        localStream.getAudioTracks()[0].enabled = isMicOn;
      } catch (err) {
        console.error("Error starting video:", err);
        setIsCameraOn(false);
        setError("Could not access camera. Please check permissions.");
      }
    };
    const stopLocalVideo = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
    if (isCameraOn) {
      startLocalVideo();
    } else {
      stopLocalVideo();
      if (interviewStatus === "running") {
        handleStopInterview();
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  // Mic Toggle Effect
  useEffect(() => {
    // ... (This logic is unchanged)
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = isMicOn;
      }
    }
  }, [isMicOn, stream]);

  // --- 4. Interview Helper Functions ---
  const speakQuestion = (text) => {
    return new Promise((resolve) => {
      // ... (This logic is unchanged)
      if (!window.speechSynthesis) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = voicesRef.current || [];
      utter.voice =
        voices.find(
          (v) => v.lang.includes("en-US") && v.name.includes("Google")
        ) || voices.find((v) => v.lang.includes("en-US"));

      utter.onstart = () => setIsInterviewerSpeaking(true);
      utter.onend = () => {
        setIsInterviewerSpeaking(false);
        resolve();
      };
      utter.onerror = () => {
        setIsInterviewerSpeaking(false);
        resolve();
      };
      window.speechSynthesis.speak(utter);
    });
  };

  // --- startListeningForAnswer (UPDATED) ---
  const startListeningForAnswer = () => {
    // Check main conditions
    if (!recognitionRef.current || interviewStatus !== "running") {
      return;
    }

    // --- FIX ---
    // Always call stop() first to abort any previous state.
    // This is the most reliable way to prevent InvalidStateError.
    try {
      recognitionRef.current.stop();
    } catch (e) {
      // This is fine, it just means it wasn't running.
      console.warn("Pre-emptive stop warning (ignorable):", e.message);
    }
    // -----------

    // We add a tiny delay to ensure the 'stop' command has
    // fully propagated before we call 'start'.
    setTimeout(() => {
      if (interviewStatus !== "running" || !recognitionRef.current) return;

      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("FATAL: Error calling recognition.start():", e);
        if (e.name === "InvalidStateError") {
          console.warn(
            "Still got InvalidStateError, speech system may be broken."
          );
        }
        setError("Failed to start listening. Please try again.");
        handleStopInterview(); // Stop fully if we can't recover
      }
    }, 100); // 100ms delay
  };

  // askNextQuestion
  const askNextQuestion = () => {
    // ... (This logic is unchanged)
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < questions.length) {
        setInterviewStatus("running");
        setTranscript("");
        transcriptRef.current = "";
        const nextQuestion = questions[nextIndex];
        setStatusMessage(
          `Q${nextIndex + 1}: ${nextQuestion.substring(0, 40)}...`
        );
        speakQuestion(nextQuestion).then(() => {
          startListeningForAnswer();
        });
        return nextIndex;
      } else {
        setInterviewStatus("finished");
        setStatusMessage(
          "Interview complete! Check the console for your report."
        );
        return prevIndex;
      }
    });
  };

  // --- 5. Report Logging Function ---
  const logFinalReport = () => {
    // ... (This logic is unchanged)
    console.log("========================================");
    console.log("--- 🎤 FINAL INTERVIEW REPORT ---");
    console.log("========================================");

    if (interviewData.length > 0) {
      console.log("\n--- 💬 Interview Transcript ---");
      interviewData.forEach((item, index) => {
        console.log(`Q${index + 1}: ${item.question}`);
        console.log(`A: ${item.answer}\n`);
      });
    } else {
      console.log("\n--- 💬 Interview Transcript ---");
      console.log("No answers were recorded.");
    }

    const faceResult = {};
    if (faceMapRef.current && faceMapRef.current.size > 0) {
      for (let [face, expMap] of faceMapRef.current.entries()) {
        faceResult[face] = Object.fromEntries(expMap.entries());
      }
      console.log("\n--- 🙂 Facial Expression Summary ---");
      console.log(faceResult);
    } else {
      console.log("\n--- 🙂 Facial Expression Summary ---");
      console.log("No facial expressions were detected.");
    }
    console.log("========================================");
  };

  // --- 6. Effect to Log Report ---
  useEffect(() => {
    // ... (This logic is unchanged)
    if (interviewStatus === "finished") {
      logFinalReport();
    }
  }, [interviewStatus]);

  // --- 7. Control Handlers ---
  const handleStartInterview = () => {
    // ... (This logic is unchanged)
    if (
      interviewStatus === "running" ||
      isLoading ||
      questions.length === 0 ||
      error
    )
      return;
    setInterviewData([]);
    clearFaceMap();
    setInterviewStatus("running");
    setTranscript("");
    setError("");
    setCurrentQuestionIndex(-1);
    askNextQuestion();
  };

  const handleStopInterview = () => {
    // ... (This logic is unchanged)
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsInterviewerSpeaking(false);
    setIsListening(false);

    // Only log if the interview was actually running
    if (interviewStatus === "running") {
      logFinalReport();
    }

    setInterviewStatus("idle");
    setStatusMessage("Interview stopped. Press start to try again.");

    setInterviewData([]);
    clearFaceMap();
    setCurrentQuestionIndex(-1);
  };

  // --- 8. JSX ---
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white overflow-hidden">
      {/* Main Content Area (2 Panels) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Panel 1: Local User */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-2">
          <ParticipantTile
            name="You"
            isMuted={!isMicOn}
            isCameraOff={!isCameraOn}
            videoRef={videoRef}
          />
        </div>

        {/* Panel 2: Remote User (Interviewer) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-2">
          <ParticipantTile
            name={remoteUser.name}
            isMuted={true}
            isCameraOff={true}
            isSpeaking={isInterviewerSpeaking}
          />
        </div>
      </div>

      {/* Status & Transcript Bar */}
      <div className="flex-shrink-0 h-28 bg-gray-800 p-4 flex flex-col justify-center border-t border-gray-700">
        {error ? (
          <div className="flex items-center text-red-400">
            <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center text-gray-300 text-sm mb-2">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  isListening ? "bg-green-500 animate-pulse" : "bg-gray-500"
                }`}
              ></span>
              <p className="font-medium">{statusMessage}</p>
            </div>
            <div className="w-full text-lg text-white truncate">
              <span className="font-semibold text-blue-300 mr-2">A:</span>
              {transcript || (
                <span className="text-gray-500 italic">
                  Your answer will appear here...
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Bottom Control Bar */}
      <ControlBar
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        interviewStatus={interviewStatus}
        onToggleMic={() => setIsMicOn(!isMicOn)}
        onToggleCamera={() => setIsCameraOn(!isCameraOn)}
        onStartInterview={handleStartInterview}
        onStopInterview={handleStopInterview}
      />
    </div>
  );
}
