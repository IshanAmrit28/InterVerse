import React, { useState } from "react";

// --- Icon Components ---
// Using inline SVGs to keep this a single file.

const MicIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 0 1 6 0v8.25a3 3 0 0 1-3 3Z"
    />
  </svg>
);

const MicOffIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 0 1 6 0v8.25a3 3 0 0 1-3 3Z"
    />
  </svg>
);

const VideoIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z"
    />
  </svg>
);

const VideoOffIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75h-7.5a2.25 2.25 0 0 1-2.25-2.25v-9A2.25 2.25 0 0 1 4.5 5.25H6m6 13.5h6.75a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H12M12 18.75V5.25m0 13.5L6 5.25m6 13.5l6-13.5"
    />
  </svg>
);

const EndCallIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      stroke="none"
      d="M3.654 6.61a20.188 20.188 0 0 0 5.224 7.566l1.04-1.04a1 1 0 0 1 1.054-.218 12.49 12.49 0 0 0 4.11 1.026 1 1 0 0 1 .998 1.002v3.746a1 1 0 0 1-.998 1.002 21.003 21.003 0 0 1-13.84-21.713A1 1 0 0 1 2.24 1.002h3.746a1 1 0 0 1 1.002.998 12.49 12.49 0 0 0 1.026 4.11 1 1 0 0 1-.218 1.054l-1.04 1.04Z"
    />
  </svg>
);

// --- Participant Tile Component ---
const ParticipantTile = ({ name, isMuted, isCameraOff }) => {
  return (
    <div className="relative w-full h-full bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
      {isCameraOff ? (
        // Avatar View
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-4xl font-semibold text-white">
              {name.charAt(0)}
            </span>
          </div>
        </div>
      ) : (
        // "Video" View (placeholder)
        // In a real app, this would be a <video> element
        <div className="w-full h-full bg-black flex items-center justify-center">
          <span className="text-gray-500">(Your camera feed)</span>
        </div>
      )}

      {/* Name Tag */}
      <div className="absolute bottom-3 left-4 p-1 px-2 bg-black bg-opacity-50 rounded">
        <span className="text-sm font-medium text-white">{name}</span>
      </div>

      {/* Mute Icon */}
      {isMuted && (
        <div className="absolute top-3 right-3 p-1.5 bg-black bg-opacity-50 rounded-full">
          <MicOffIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

// --- Control Button Component ---
const ControlButton = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full text-white transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

// --- Main Google Meet Clone Page ---
export default function Room() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  // Hardcoded remote user state for this example
  const remoteUser = {
    name: "Jane Doe",
    isMuted: false,
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white overflow-hidden">
      {/* Main Content Area (2 Panels) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Panel 1: Local User */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-2">
          <ParticipantTile
            name="You"
            isMuted={!isMicOn}
            isCameraOff={!isCameraOn}
          />
        </div>

        {/* Panel 2: Remote User */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-2">
          <ParticipantTile
            name={remoteUser.name}
            isMuted={remoteUser.isMuted}
            isCameraOff={true} // As requested, remote user's camera is off
          />
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="h-20 flex-shrink-0 flex items-center justify-center px-4">
        {/* Center Controls (Main Buttons) */}
        <div className="flex items-center gap-4">
          <ControlButton
            onClick={() => setIsMicOn(!isMicOn)}
            className={
              isMicOn
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-red-600 hover:bg-red-500"
            }
          >
            {isMicOn ? <MicIcon /> : <MicOffIcon />}
          </ControlButton>

          <ControlButton
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={
              isCameraOn
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-red-600 hover:bg-red-500"
            }
          >
            {isCameraOn ? <VideoIcon /> : <VideoOffIcon />}
          </ControlButton>

          <button
            className="px-5 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white ml-8"
            aria-label="End call"
          >
            <EndCallIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
