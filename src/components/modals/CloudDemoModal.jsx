// Cloud Demo Modal: Interactive simulated cloud gaming stream HUD
// Features live telemetry (latency, bitrate, FPS), interactive controller test, and explicit portfolio disclaimers

import React, { useState, useEffect } from 'react';
import { X, Wifi, Activity, Monitor, ShieldCheck, AlertCircle, RefreshCw, Radio } from 'lucide-react';
import GameArtwork from '../common/GameArtwork';

export default function CloudDemoModal({ game, onClose }) {
  const [ping, setPing] = useState(17);
  const [bitrate, setBitrate] = useState(29.4);
  const [activeBtn, setActiveBtn] = useState(null);
  const [latencyTestLog, setLatencyTestLog] = useState([]);

  // Simulate slight dynamic ping and bitrate fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(15 + Math.random() * 6));
      setBitrate((28 + Math.random() * 3).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const testInputLatency = (btnName) => {
    setActiveBtn(btnName);
    const simulatedLag = Math.floor(12 + Math.random() * 8);
    setLatencyTestLog((prev) => [
      { btn: btnName, lag: simulatedLag, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4),
    ]);
    setTimeout(() => setActiveBtn(null), 180);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Simulated Cloud Demo for ${game.title}`}
    >
      <div className="cloud-stream-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Stream Top Telemetry Bar */}
        <div className="stream-telemetry-bar">
          <div className="stream-telemetry-left">
            <span className="stream-live-indicator">
              <Radio size={14} className="pulse-icon" /> SIMULATED STREAM ACTIVE
            </span>
            <span className="stream-game-name">{game.title}</span>
          </div>

          <div className="telemetry-stats">
            <div className="telemetry-pill">
              <Activity size={14} className="text-cyan" />
              <span>PING: <strong>{ping} ms</strong></span>
            </div>
            <div className="telemetry-pill">
              <Wifi size={14} className="text-emerald" />
              <span>BITRATE: <strong>{bitrate} Mbps</strong></span>
            </div>
            <div className="telemetry-pill hide-mobile">
              <Monitor size={14} className="text-violet" />
              <span>STREAM: <strong>1080p @ 60 FPS</strong></span>
            </div>
          </div>

          <button
            type="button"
            className="icon-circle-btn close-btn"
            onClick={onClose}
            title="Exit Simulated Stream"
            aria-label="Exit cloud stream"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video / Stream Viewport */}
        <div className="stream-viewport-container">
          <GameArtwork id={game.id} className="stream-canvas-preview" title={game.title} />

          {/* Holographic HUD Overlays */}
          <div className="stream-hud-overlay">
            <div className="stream-session-watermark">
              <span>NEXUS CLOUD • DEMO EDGE NODE #AP-SOUTH-1</span>
            </div>

            {/* Input Response Tester */}
            <div className="hud-controller-box">
              <div className="hud-title">Interactive Input Telemetry Test</div>
              <div className="hud-buttons-row">
                {['A', 'B', 'X', 'Y', 'RT Boost'].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    className={`hud-btn ${activeBtn === btn ? 'active' : ''}`}
                    onClick={() => testInputLatency(btn)}
                  >
                    {btn}
                  </button>
                ))}
              </div>
              {latencyTestLog.length > 0 && (
                <div className="latency-log">
                  Latest: [{latencyTestLog[0].btn}] responded in {latencyTestLog[0].lag}ms
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informational Disclaimer Banner */}
        <div className="stream-modal-footer">
          <div className="stream-disclaimer-card">
            <AlertCircle size={20} className="text-amber shrink-0" />
            <div className="disclaimer-copy">
              <strong>Simulated Concept Streamer — Portfolio Demonstration</strong>
              <p>
                In a production deployment, this view streams low-latency interactive video from remote GPU clusters (via WebRTC / H.265). This interface is an architectural demonstrator developed for the Kadam Digital portfolio.
              </p>
            </div>
          </div>

          <div className="stream-footer-actions">
            <button type="button" className="btn-secondary-gaming" onClick={onClose}>
              Disconnect Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
