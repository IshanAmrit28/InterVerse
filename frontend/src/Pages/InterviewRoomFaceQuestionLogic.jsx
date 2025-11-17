//frontend\src\Pages\InterviewRoomFaceQuestionLogic.jsx
import React, { useState, useEffect, useRef } from "react";
// import { useFaceDetection } from "../components/useFaceDetection"; // <-- REMOVED
import { ParticipantTile, ControlBar } from "../components/MeetComponents";
import { fetchAllQuestionsTextOnly } from "../services/fetchQuestions";
import { XCircle } from "lucide-react";

// Hardcoded remote user (Interviewer)
const remoteUser = {
  name: "Jane Doe",
  isMuted: true,
};

// --- Audio "Wake Up" Function (Unchanged) ---
let audioContextResumed = false;
function resumeAudioContext(voicesRef) {
  return new Promise((resolve) => {
    if (audioContextResumed) {
      resolve();
      return;
    }
    try {
      console.log("Attempting to resume audio context...");
      const context = window.speechSynthesis;
      if (!context) {
        console.error("Speech Synthesis API not found.");
        resolve();
        return;
      }

      if (context.speaking) {
        context.cancel(); // Clear any errors
      }

      // Speak a silent space to activate
      const utter = new SpeechSynthesisUtterance(" ");
      utter.volume = 0;
      utter.onstart = () => {
        console.log("Audio context successfully resumed.");
        audioContextResumed = true;
        resolve();
      };
      utter.onerror = (e) => {
        console.error("Silent utterance error, audio may not work:", e);
        resolve(); // Resolve anyway so we don't block the app
      };
      context.speak(utter);

      if (context.getVoices().length === 0) {
        context.onvoiceschanged = () => {
          console.log("Voices loaded on change.");
          if (voicesRef) {
            voicesRef.current = context.getVoices();
          }
        };
      }
    } catch (e) {
      console.error("Error resuming audio context:", e);
      resolve(); // Resolve anyway
    }
  });
}

export default function GoogleMeetSimple() {
  // --- Media State ---
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  // --- Interview State ---
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [interviewStatus, setInterviewStatus] = useState("idle"); // idle, awaiting_ready, running, finished
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
  const retryRef = useRef(0);
  const isSpeakingRef = useRef(false);

  // --- Hook for Face Detection ---
  // const { faceMapRef, clearFaceMap } = useFaceDetection(isCameraOn, videoRef); // <-- REMOVED

  // --- Sync ref with state ---
  useEffect(() => {
    questionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  // --- 1. Load Questions (Unchanged) ---
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError("");
      try {
        const fetchedQuestions = await fetchAllQuestionsTextOnly();
        const behavioralQuestions = [
          "Tell me about a time you faced a major coding challenge — how did you handle it?",
          "How do you manage your time when working on multiple projects?",
        ];

        if (fetchedQuestions.length === 0 && behavioralQuestions.length === 0) {
          setError("Could not load any questions. Please check API/network.");
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

  // --- 2. Setup Speech Recognition & Synthesis (Unchanged) ---
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
      console.log("Voices loaded:", voicesRef.current.length);
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
      console.log("Event: onstart");
      setIsListening(true);
      setStatusMessage("Listening...");
      setError("");
      retryRef.current = 0;
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      console.log("Event: onresult", finalTranscript);
      setTranscript(finalTranscript);
      transcriptRef.current = finalTranscript;
    };

    recognition.onend = () => {
      console.log("Event: onend");
      setIsListening(false);

      if (interviewStatus !== "running" && interviewStatus !== "awaiting_ready")
        return;

      if (isMicOn === true && !transcriptRef.current) {
        if (retryRef.current < 2) {
          retryRef.current += 1;
          setStatusMessage(`Didn't catch that... (${retryRef.current})`);
          console.log("No speech detected, restarting listening.");
          setTimeout(() => startListeningForAnswer(), 500);
        } else {
          setStatusMessage("Mic timed out. Skipping.");
          console.log("Mic timed out, auto-advancing.");
          retryRef.current = 0;
          transcriptRef.current = "";
          setIsMicOn(false);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Event: onerror", event.error);
      setIsListening(false);
      if (event.error === "no-speech") {
        console.warn("Speech error: no-speech. 'onend' will handle it.");
      } else if (event.error === "audio-capture") {
        setError("Audio capture error. Is your microphone working?");
        handleStopInterview();
      } else if (event.error === "not-allowed") {
        setError(
          "Microphone permission denied. Please allow access & restart."
        );
        handleStopInterview();
      } else {
        setError(`Speech error: ${event.error}.`);
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
  }, [questions, interviewStatus, isMicOn]);

  // --- 3. Media Stream Logic (Unchanged) ---
  useEffect(() => {
    const startLocalVideo = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(localStream);
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
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

  // --- 4. Interview Helper Functions (Unchanged) ---
  const speakQuestion = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported.");
        resolve();
        return;
      }

      if (isSpeakingRef.current) {
        console.warn(
          "speakQuestion called while already speaking. Interrupting old speech."
        );
        window.speechSynthesis.cancel();
      }

      const utter = new SpeechSynthesisUtterance(text);
      const voices =
        voicesRef.current.length > 0
          ? voicesRef.current
          : window.speechSynthesis.getVoices();

      if (voices.length === 0) {
        console.warn("No voices available. Using default.");
      }

      utter.voice =
        voices.find(
          (v) => v.lang.includes("en-US") && v.name.includes("Google")
        ) ||
        voices.find((v) => v.lang.includes("en-US")) ||
        null;

      utter.onstart = () => {
        isSpeakingRef.current = true;
        setIsInterviewerSpeaking(true);
      };
      utter.onend = () => {
        isSpeakingRef.current = false;
        setIsInterviewerSpeaking(false);
        resolve();
      };
      utter.onerror = (e) => {
        console.error("SpeechSynthesis Error:", e);
        isSpeakingRef.current = false;
        setIsInterviewerSpeaking(false);
        resolve(); // Resolve anyway
      };
      window.speechSynthesis.speak(utter);
    });
  };

  const startListeningForAnswer = () => {
    if (!recognitionRef.current) {
      console.error("Recognition not initialized.");
      return;
    }
    if (isListening) {
      console.warn("startListeningForAnswer called but already listening.");
      return;
    }
    try {
      console.log("Calling recognition.start()...");
      recognitionRef.current.start();
    } catch (e) {
      console.error("Error calling recognition.start():", e);
      if (e.name === "InvalidStateError") {
        console.warn("Caught InvalidStateError. Aborting...");
        recognitionRef.current.abort(); // Use abort
      } else {
        setError("Failed to start listening. Please try again.");
        handleStopInterview();
      }
    }
  };

  const askNextQuestion = () => {
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
          setStatusMessage("Your turn. Click the mic to answer.");
          setIsMicOn(false);
        });
        return nextIndex;
      } else {
        setInterviewStatus("finished");
        setStatusMessage(
          "Interview complete! Check the console for your report."
        );
        setIsMicOn(false);
        return prevIndex;
      }
    });
  };

  // --- 5. Report Logging Function (UPDATED) ---
  const logFinalReport = () => {
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

    // --- All face-api logging logic is REMOVED ---

    console.log("========================================");
  };

  // --- 6. Effect to Log Report (Unchanged) ---
  useEffect(() => {
    if (interviewStatus === "finished") {
      logFinalReport();
    }
  }, [interviewStatus]);

  // --- 7. Effect for Manual Mic Control (Unchanged) ---
  useEffect(() => {
    if (!recognitionRef.current) return;

    const validStatus =
      interviewStatus === "running" || interviewStatus === "awaiting_ready";
    if (!validStatus || isInterviewerSpeaking) {
      if (isMicOn) setIsMicOn(false);
      if (isListening) {
        console.warn("Stopping recognition due to status change.");
        recognitionRef.current.stop();
        setIsListening(false);
      }
      return;
    }

    if (isMicOn) {
      if (!isListening) {
        startListeningForAnswer();
      }
    } else {
      if (isListening) {
        console.log("User toggled mic off. Stopping recognition.");
        recognitionRef.current.stop();
        setIsListening(false);

        if (interviewStatus === "awaiting_ready") {
          handleReadyCheck(transcriptRef.current);
        } else if (interviewStatus === "running") {
          handleAnswer(transcriptRef.current);
        }
      }
    }
  }, [isMicOn, interviewStatus, isInterviewerSpeaking, isListening]);

  // --- 8. Control Handlers (UPDATED) ---

  const handleReadyCheck = (text) => {
    const response = text.toLowerCase();
    transcriptRef.current = "";
    setTranscript("");

    if (response.includes("yes") || response.includes("ready")) {
      speakQuestion("Okay, so let's begin.").then(() => {
        setInterviewStatus("running");
        askNextQuestion(); // Asks Q1
      });
    } else {
      speakQuestion(
        "Sorry, I didn't catch that. Please say 'yes' when you are ready."
      ).then(() => {
        setStatusMessage("Click the mic to respond.");
        setIsMicOn(false);
      });
    }
  };

  const handleAnswer = (text) => {
    if (text) {
      setStatusMessage("Processing answer...");
      setInterviewData((prevData) => [
        ...prevData,
        {
          question: questions[questionIndexRef.current],
          answer: text,
        },
      ]);
    } else {
      setStatusMessage("Answer skipped. Next question...");
    }
    transcriptRef.current = "";
    setTranscript("");
    setTimeout(() => askNextQuestion(), 1000); // Advance to next question
  };

  const handleStartInterview = async () => {
    if (
      interviewStatus === "running" ||
      interviewStatus === "awaiting_ready" ||
      isLoading ||
      questions.length === 0 ||
      error
    )
      return;

    await resumeAudioContext(voicesRef);

    setInterviewData([]);
    // clearFaceMap(); // <-- REMOVED
    setTranscript("");
    setError("");
    setCurrentQuestionIndex(-1);
    setIsMicOn(false);

    setInterviewStatus("awaiting_ready");
    const GREETING = "Hello, and welcome to the interview simulator.";
    const RULES =
      "I will ask you a question. When I am done speaking, this mic button will be enabled. Click it to start your answer, and click it again when you are finished. I will then ask the next question.";
    speakQuestion(`${GREETING} ${RULES} Are you ready to begin?`).then(() => {
      setStatusMessage("Click the mic to respond.");
    });
  };

  const handleStopInterview = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    isSpeakingRef.current = false;
    setIsInterviewerSpeaking(false);
    setIsListening(false);

    if (interviewStatus === "running") {
      logFinalReport();
    }

    setInterviewStatus("idle");
    setStatusMessage("Interview stopped. Press start to try again.");
    setIsMicOn(false);
    setInterviewData([]);
    // clearFaceMap(); // <-- REMOVED
    setCurrentQuestionIndex(-1);
  };

  // --- 9. JSX (Unchanged) ---
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
              {isListening ? (
                <span className="text-gray-500 italic">Listening...</span>
              ) : (
                <span className="text-gray-500 italic">
                  {transcript ? "Answer recorded." : "Mic is off."}
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
        isMicDisabled={
          (interviewStatus !== "running" &&
            interviewStatus !== "awaiting_ready") ||
          isInterviewerSpeaking
        }
        onToggleMic={() => setIsMicOn(!isMicOn)}
        onToggleCamera={() => setIsCameraOn(!isCameraOn)}
        onStartInterview={handleStartInterview}
        onStopInterview={handleStopInterview}
      />
    </div>
  );
}
