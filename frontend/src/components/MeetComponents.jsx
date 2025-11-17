//frontend\src\components\MeetComponents.jsx
import React from "react";

// --- Icons ---
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Play,
  RotateCcw,
  Volume2,
} from "lucide-react";

// --- ParticipantTile Component ---
export const ParticipantTile = ({
  name,
  isMuted,
  isCameraOff,
  isSpeaking,
  videoRef = null,
}) => {
  return (
    <div className="relative w-full h-full bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
      {isSpeaking && (
        <div className="absolute inset-0 border-4 border-blue-500 rounded-lg ring-4 ring-blue-500 ring-opacity-50 animate-pulse" />
      )}
      {isCameraOff ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-4xl font-semibold text-white">
              {name.charAt(0)}
            </span>
          </div>
          {isSpeaking && (
            <Volume2 className="w-6 h-6 text-white mt-4 animate-bounce" />
          )}
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute bottom-3 left-4 p-1 px-2 bg-black bg-opacity-50 rounded">
        <span className="text-sm font-medium text-white">{name}</span>
      </div>
      {isMuted && (
        <div className="absolute top-3 right-3 p-1.5 bg-black bg-opacity-50 rounded-full">
          <MicOff className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

// --- ControlButton Component ---
export const ControlButton = ({
  onClick,
  className,
  children,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full text-white transition-all duration-200 ${className} ${
        disabled ? "bg-gray-500 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// --- ControlBar Component (Updated) ---
export const ControlBar = ({
  isMicOn,
  isCameraOn,
  interviewStatus,
  isMicDisabled, // <-- NEW PROP
  onToggleMic,
  onToggleCamera,
  onStartInterview,
  onStopInterview,
}) => {
  const isInterviewRunning = interviewStatus === "running";

  return (
    <div className="h-20 flex-shrink-0 flex items-center justify-center px-4">
      <div className="flex items-center gap-4">
        <ControlButton
          onClick={onToggleMic}
          className={
            isMicOn
              ? "bg-gray-600 hover:bg-gray-500"
              : "bg-red-600 hover:bg-red-500"
          }
          disabled={isMicDisabled} // <-- PROP USED HERE
        >
          {isMicOn ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </ControlButton>

        <ControlButton
          onClick={onToggleCamera}
          className={
            isCameraOn
              ? "bg-gray-600 hover:bg-gray-500"
              : "bg-red-600 hover:bg-red-500"
          }
        >
          {isCameraOn ? (
            <Video className="w-5 h-5" />
          ) : (
            <VideoOff className="w-5 h-5" />
          )}
        </ControlButton>

        <ControlButton
          onClick={onStartInterview}
          className="bg-blue-600 hover:bg-blue-500 ml-8"
          disabled={isInterviewRunning}
        >
          {interviewStatus === "idle" ? (
            <Play className="w-5 h-5" />
          ) : (
            <RotateCcw className="w-5 h-5" />
          )}
        </ControlButton>

        <ControlButton
          onClick={onStopInterview}
          className="bg-red-600 hover:bg-red-500"
          disabled={!isInterviewRunning}
        >
          <PhoneOff className="w-5 h-5" />
        </ControlButton>
      </div>
    </div>
  );
};
