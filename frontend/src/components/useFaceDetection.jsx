//frontend\src\components\useFaceDetection.jsx
import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

/**
 * Custom hook to manage face expression detection.
 * @param {boolean} isEnabled - Whether detection should be active (e.g., camera is on).
 * @param {React.RefObject<HTMLVideoElement>} videoRef - Ref to the video element to monitor.
 */
export const useFaceDetection = (isEnabled, videoRef) => {
  const faceMap = useRef(new Map());
  const isRecording = useRef(false);
  const modelsLoaded = useRef(false);

  // 1. Load models on mount
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);
        modelsLoaded.current = true;
        console.log("✅ Models loaded successfully");
      } catch (err) {
        console.error("Error loading models:", err);
      }
    };
    loadModels();
  }, []);

  // 2. Start or stop recording based on the 'isEnabled' prop
  useEffect(() => {
    if (isEnabled) {
      isRecording.current = true;
      console.log("Monitoring started");
    } else {
      isRecording.current = false;
      console.log("Monitoring stopped");
      // Note: We no longer log the report here. The parent component will.
    }
  }, [isEnabled]);

  // 3. Run detection loop
  useEffect(() => {
    const detectFaces = async () => {
      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.2,
      });

      const runDetection = async () => {
        if (
          isRecording.current &&
          modelsLoaded.current &&
          videoRef.current &&
          videoRef.current.readyState === 4
        ) {
          const detections = await faceapi
            .detectAllFaces(videoRef.current, options)
            .withFaceExpressions();

          if (detections.length > 0) {
            const detection = detections[0]; // Assuming one face
            const faceId = "face_1";

            const topExpression = Object.entries(detection.expressions).sort(
              (a, b) => b[1] - a[1]
            )[0][0];

            if (!faceMap.current.has(faceId)) {
              faceMap.current.set(faceId, new Map());
            }

            const expMap = faceMap.current.get(faceId);
            expMap.set(topExpression, (expMap.get(topExpression) || 0) + 1);
          }
        }
        // Continue the loop
        requestAnimationFrame(runDetection);
      };

      runDetection();
    };

    detectFaces();
  }, [videoRef]);

  // 4. New clear function for the parent component to call
  const clearFaceMap = () => {
    faceMap.current = new Map();
    console.log("Face map cleared for new interview session.");
  };

  // 5. Return the ref and the clear function
  return { faceMapRef: faceMap, clearFaceMap };
};
