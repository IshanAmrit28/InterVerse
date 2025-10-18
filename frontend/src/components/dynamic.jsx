import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, RotateCcw, XCircle, Play } from "lucide-react";

const Interview = () => {
  // --- STATE ---
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [interviewStatus, setInterviewStatus] = useState("idle");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Loading questions...");
  const [error, setError] = useState("");
  const [interviewData, setInterviewData] = useState([]);

  // --- REFS ---
  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);
  const questionIndexRef = useRef(currentQuestionIndex);

  // Keep the ref updated with the latest index
  useEffect(() => {
    questionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  // --- Fetch questions from backend APIs on mount ---
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError("");
      try {
        const urls = [
          "http://localhost:3000/api/dsa",
          "http://localhost:3000/api/os",
          "http://localhost:3000/api/dbms",
          "http://localhost:3000/api/cn",
        ];

        const fetchedQuestions = [];

        for (const url of urls) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          // Extract only question text
          data.forEach((q) => fetchedQuestions.push(q.question));
        }

        const behavioralQuestions = [
          "Tell me about a time you faced a major coding challenge — how did you handle it?",
          "How do you manage your time when working on multiple projects?",
          "What motivates you to keep improving your coding skills?",
        ];

        setQuestions([...fetchedQuestions, ...behavioralQuestions]);
        setStatusMessage("Press Start to begin the voice interview.");
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(
          "Failed to load interview questions. Please try refreshing the page."
        );
        setStatusMessage("Could not load questions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // --- Speech Recognition & Synthesis setup ---
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
      setError(
        "Web Speech API is not supported in this browser. Please try Chrome or Edge."
      );
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

      if (finalTranscript) {
        setInterviewData((prevData) => [
          ...prevData,
          {
            question: questions[questionIndexRef.current],
            answer: finalTranscript,
          },
        ]);

        setTimeout(() => {
          askNextQuestion();
        }, 3000);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatusMessage("Recording stopped.");
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setError(
        `Speech recognition error: ${event.error}. Check your microphone permissions.`
      );
      setStatusMessage("Error encountered.");
      console.error("Speech Recognition Error:", event.error);
    };

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [questions]); // Dependency on questions to ensure it has data to work with

  const speakQuestion = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = voicesRef.current || [];
      const chosenVoice =
        voices.find(
          (v) => v.lang.includes("en-US") && v.name.includes("Google")
        ) || voices.find((v) => v.lang.includes("en-US"));
      if (chosenVoice) utter.voice = chosenVoice;
      utter.onend = () => resolve();
      window.speechSynthesis.speak(utter);
    });
  };

  const startListeningForAnswer = () => {
    if (error || !recognitionRef.current) return;
    try {
      recognitionRef.current.stop(); // Stop any previous instance
      recognitionRef.current.start();
    } catch (e) {
      if (e.name !== "InvalidStateError") {
        console.error("Error calling start():", e);
      }
    }
  };

  const askNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < questions.length) {
        setInterviewStatus("running");
        setTranscript("");
        speakQuestion(questions[nextIndex]).then(() => {
          setStatusMessage("Question asked. Your turn to speak.");
          startListeningForAnswer();
        });
        return nextIndex;
      } else {
        setInterviewStatus("finished");
        setStatusMessage("Interview complete! All questions have been asked.");
        return prevIndex;
      }
    });
  };

  const handleStartInterview = () => {
    if (interviewStatus === "running" || isLoading || questions.length === 0)
      return;
    setInterviewData([]);
    setInterviewStatus("running");
    setTranscript("");
    setError("");
    setCurrentQuestionIndex(-1);
    askNextQuestion();
  };

  const handleStopInterview = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setInterviewStatus("stopped");
    setStatusMessage("Interview stopped.");
  };

  const handleRestart = () => {
    handleStopInterview();
    setInterviewData([]);
    setInterviewStatus("idle");
    setCurrentQuestionIndex(-1);
    setStatusMessage(
      isLoading
        ? "Loading questions..."
        : "Press Start to begin the voice interview."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-8 font-inter">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-6 sm:p-10 border border-gray-100">
        {interviewStatus === "finished" ? (
          // --- RESULTS VIEW ---
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2 text-center">
              Interview Complete
            </h1>
            <p className="text-sm text-gray-500 mb-8 text-center">
              Here's a summary of your session.
            </p>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {interviewData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-blue-600">
                    Q{index + 1}: {item.question}
                  </p>
                  <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={handleRestart}
                className="flex items-center justify-center mx-auto px-6 py-3 rounded-full text-white font-semibold transition duration-300 transform bg-blue-500 hover:bg-blue-600 ring-blue-300 ring-2"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          // --- INTERVIEW VIEW ---
          <>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2 text-center">
              Voice Interview Simulator
            </h1>
            <p className="text-sm text-gray-500 mb-8 text-center">
              Tap start to begin. The interviewer will ask a question, and your
              answer will be transcribed below.
            </p>

            <div
              className={`p-4 rounded-lg mb-6 transition-all duration-300 ${
                error
                  ? "bg-red-100 border border-red-400 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              <div className="flex items-center">
                {error ? (
                  <XCircle className="w-5 h-5 mr-2" />
                ) : (
                  <Mic className="w-5 h-5 mr-2" />
                )}
                <p
                  className={`font-medium ${
                    error ? "text-red-700" : "text-blue-700"
                  }`}
                >
                  {error || statusMessage}
                </p>
              </div>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-5 min-h-[200px] text-gray-700 text-base leading-relaxed overflow-y-auto shadow-inner mb-6">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Question{" "}
                {currentQuestionIndex >= 0 ? currentQuestionIndex + 1 : ""}:
              </p>
              <p className="text-blue-600 font-medium">
                {questions[currentQuestionIndex] ||
                  (isLoading
                    ? "Loading..."
                    : "The interview hasn't started yet.")}
              </p>
              <p className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Your Answer:
              </p>
              <div aria-live="polite">
                {transcript || (
                  <span className="text-gray-400 italic">
                    Your transcribed answer will appear here...
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleStartInterview}
                className={`flex items-center justify-center px-6 py-3 rounded-full text-black font-semibold transition duration-300 transform ${
                  interviewStatus === "running" || isLoading || error
                    ? "bg-gray-400 cursor-not-allowed text-gray-700"
                    : "bg-blue-500 hover:bg-blue-600 ring-blue-300 ring-2"
                }`}
                disabled={interviewStatus === "running" || isLoading || !!error}
                aria-label="Start interview"
                title="Start Interview"
              >
                <Play className="w-5 h-5 mr-2" />
                {isLoading ? "Loading..." : "Start Interview"}
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={handleStopInterview}
                  className="p-3 bg-red-500 text-black rounded-full shadow hover:bg-red-600 transition duration-200 disabled:opacity-50"
                  disabled={interviewStatus !== "running"}
                  aria-label="Stop interview"
                  title="Stop Interview"
                >
                  <MicOff className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRestart}
                  className="p-3 bg-yellow-500 text-black rounded-full shadow hover:bg-yellow-600 transition duration-200"
                  aria-label="Restart interview"
                  title="Restart Interview"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="mt-8 text-xs text-center text-gray-400">
              Note: This functionality relies on the browser's native Web Speech
              API and may require microphone permission.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Interview;
