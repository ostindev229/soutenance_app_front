// src/components/Loader.js
import React from "react";

const Loader = () => (
  <div className="n-container">
    <div className="spinner"></div>
    <style jsx>{`
      .n-container {
        display: flex;
        justify-content: center;

        height: 100vh;
      }
      .spinner {
        border: 8px solid rgba(0, 0, 0, 0.1);
        border-left-color: #0000ff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default Loader;
