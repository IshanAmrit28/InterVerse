import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

export default function Face2() {
  const videoRef = useRef(null);
  const faceMap = useRef(new Map());
  const isRecording = useRef(false);

  useEffect(() => {
    loadModels();
    startVideo();
  }, []);

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);
    console.log("✅ Models loaded successfully");
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadeddata = () => {
        detectFaces();
      };
    });
  };

  const detectFaces = async () => {
    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 416,
      scoreThreshold: 0.2,
    });

    const runDetection = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, options)
          .withFaceExpressions();

        if (isRecording.current && detections.length > 0) {
          detections.forEach((detection, i) => {
            const faceId = `face_${i + 1}`;
            const topExpression = Object.entries(detection.expressions).sort(
              (a, b) => b[1] - a[1]
            )[0][0];

            if (!faceMap.current.has(faceId)) {
              faceMap.current.set(faceId, new Map());
            }

            const expMap = faceMap.current.get(faceId);
            expMap.set(topExpression, (expMap.get(topExpression) || 0) + 1);
          });
        }
      }
      requestAnimationFrame(runDetection);
    };

    runDetection();
  };

  const handleStart = () => {
    faceMap.current = new Map();
    isRecording.current = true;
  };

  const handleStop = () => {
    isRecording.current = false;
    const result = {};
    for (let [face, expMap] of faceMap.current.entries()) {
      result[face] = Object.fromEntries(expMap.entries());
    }
    console.log("🎯 Final Detection Summary:", result);
  };

  return (
    <div className="flex flex-col items-center text-center bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">
        Real-Time Face & Expression Detection
      </h1>

      <video
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        className="rounded-xl border border-gray-700 mb-4"
      />

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleStart}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
