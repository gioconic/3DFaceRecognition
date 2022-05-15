// Install dependencies ✅
// Import dependencies ✅
// Setup webcam and canvas ✅
// Define references to those ✅
// Load facemesh ✅
// Detect function
// Drawing utilities
// Load triangulation
// Setup triangle path
// Setup point drawing
// Add draw Mesh to detect function

import React, { useState, useRef } from "react";
// import logo from "./logo.svg";
import "./App.css";

// Required dependencies
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function App() {
  // Setup references (webcam and canvas)
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load facemesh
  // Load the nuronal network from TFJS
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    // Calling the detection models, setting an interval of 100ms
    setInterval(() => {
      // Every 100ms will run this function, grabbing the webcam and trying to detect the face
      detect(net);
    }, 100);
  };

  // Detect function - Checks if the camera is up, running and receiving data
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Geet video properties - Properties from the webcam
      const video = webcamRef.current.video; // Gets the video from the webcam
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections - receive 'net' from TensorFlow and run the method, taking the video as parameter from the webcam
      const face = await net.estimateFaces(video);
      console.log(face);

      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  };

  runFacemesh();

  return (
    <div className="App">
      {/* Setup references (webcam and canvas) */}
      <header className="app-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
