// --- GoogleMeetSimple.jsx ---
import { useState, useEffect, useRef } from "react";
import { useFaceDetection } from "../components/useFaceDetection";
import { ParticipantTile, ControlBar } from "../components/MeetComponents";

// Hardcoded remote user state
const remoteUser = {
  name: "Jane Doe",
  isMuted: true,
};

export default function GoogleMeetSimple() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);

  // Use the custom hook to handle all face detection logic
  useFaceDetection(isCameraOn, videoRef);

  // Effect for managing the media stream
  useEffect(() => {
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
        // Apply initial mic state
        localStream.getAudioTracks()[0].enabled = isMicOn;
      } catch (err) {
        console.error("Error starting video:", err);
        setIsCameraOn(false); // Turn off toggle if permission is denied
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
    }

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]); // Re-run only when camera state changes

  // Effect for toggling the microphone
  useEffect(() => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = isMicOn;
      }
    }
  }, [isMicOn, stream]);

  const handleEndCall = () => {
    console.log("Call ended.");
    // Add logic here to stop streams, close connections, etc.
    setIsCameraOn(false);
    setIsMicOn(false);
  };

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
            videoRef={videoRef} // Pass the ref to the video element
          />
        </div>

        {/* Panel 2: Remote User */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-2">
          <ParticipantTile
            name={remoteUser.name}
            isMuted={remoteUser.isMuted}
            isCameraOff={true}
          />
        </div>
      </div>

      {/* Bottom Control Bar */}
      <ControlBar
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        onToggleMic={() => setIsMicOn(!isMicOn)}
        onToggleCamera={() => setIsCameraOn(!isCameraOn)}
        onEndCall={handleEndCall}
      />
    </div>
  );
}
