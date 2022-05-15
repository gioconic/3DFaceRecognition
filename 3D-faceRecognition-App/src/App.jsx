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

function App() {
  // Setup references (webcam and canvas)
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
  };

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
