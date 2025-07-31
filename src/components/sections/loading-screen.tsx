"use client"
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="grid-background"></div>
      <div className="vr-elements">
        <div className="circuit circuit-1"></div>
        <div className="circuit circuit-2"></div>
        <div className="circuit circuit-3"></div>
        <div className="circuit circuit-4"></div>
        <div className="hologram hologram-1"></div>
        <div className="hologram hologram-2"></div>
        <div className="hologram hologram-3"></div>
      </div>
      <div className="loading-container">
        <h1 className="logo-title">MersifLab</h1>
        <div className="loading-frame">
          <div className="loading-fill"></div>
        </div>
        <p className="loading-text">Initializing Virtual Environment</p>
      </div>
    </div>
  )
}

export default LoadingScreen

