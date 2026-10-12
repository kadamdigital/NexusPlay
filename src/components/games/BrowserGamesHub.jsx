// Browser Games Hub: Discover and play all three client-side games instantly
// Features game switcher, live gameplay, instructions, and high scores

import React, { useState } from 'react';
import { Gamepad2, Sparkles, Brain, Rocket, Volume2, VolumeX, Info, RotateCcw } from 'lucide-react';
import NeonSnakeGame from './NeonSnakeGame';
import MemoryMatchGame from './MemoryMatchGame';
import SpaceDodgeGame from './SpaceDodgeGame';
import { setAudioMuted, getAudioMuted } from '../../utils/audio';

export default function BrowserGamesHub({ activeGameId = 'neon-snake', onGameChange }) {
  const [selectedGame, setSelectedGame] = useState(activeGameId);
  const [isMuted, setIsMuted] = useState(getAudioMuted);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    setAudioMuted(next);
  };

  const handleSelect = (id) => {
    setSelectedGame(id);
    if (onGameChange) onGameChange(id);
  };

  return (
    <section id="browser-games" className="browser-games-hub-section">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <Gamepad2 size={16} className="text-cyan" />
            <span>PLAY ONLINE • INSTANT BROWSER GAMES</span>
          </div>
          <h2 className="section-title">Zero Downloads. 100% Instant Play.</h2>
          <p className="section-subtitle">
            Genuinely playable in your browser right now using HTML5 Canvas & React state. No streaming server or install required.
          </p>
        </div>

        <div className="sound-toggle-wrapper">
          <button
            onClick={toggleSound}
            className={`sound-toggle-btn ${isMuted ? 'muted' : 'active'}`}
            title={isMuted ? 'Unmute Web Audio FX' : 'Mute Web Audio FX'}
            aria-label={isMuted ? 'Unmute Web Audio effects' : 'Mute Web Audio effects'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isMuted ? 'Audio Muted' : 'Sound Effects ON'}</span>
          </button>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="game-tabs-nav" role="tablist" aria-label="Playable browser games">
        <button
          role="tab"
          aria-selected={selectedGame === 'neon-snake'}
          className={`game-tab-btn ${selectedGame === 'neon-snake' ? 'active' : ''}`}
          onClick={() => handleSelect('neon-snake')}
        >
          <div className="tab-icon-box cyan">
            <Sparkles size={20} />
          </div>
          <div className="tab-text">
            <strong>Neon Snake</strong>
            <span>Canvas Cyber Arcade</span>
          </div>
          <span className="live-pill">PLAYABLE</span>
        </button>

        <button
          role="tab"
          aria-selected={selectedGame === 'memory-match'}
          className={`game-tab-btn ${selectedGame === 'memory-match' ? 'active' : ''}`}
          onClick={() => handleSelect('memory-match')}
        >
          <div className="tab-icon-box violet">
            <Brain size={20} />
          </div>
          <div className="tab-text">
            <strong>Memory Match</strong>
            <span>Neural Link Puzzle</span>
          </div>
          <span className="live-pill">PLAYABLE</span>
        </button>

        <button
          role="tab"
          aria-selected={selectedGame === 'space-dodge'}
          className={`game-tab-btn ${selectedGame === 'space-dodge' ? 'active' : ''}`}
          onClick={() => handleSelect('space-dodge')}
        >
          <div className="tab-icon-box amber">
            <Rocket size={20} />
          </div>
          <div className="tab-text">
            <strong>Space Dodge</strong>
            <span>Reflex Star Survival</span>
          </div>
          <span className="live-pill">PLAYABLE</span>
        </button>
      </div>

      {/* Embedded Active Game Screen */}
      <div className="active-game-viewport">
        {selectedGame === 'neon-snake' && (
          <div className="game-stage">
            <NeonSnakeGame isAudioMuted={isMuted} />
          </div>
        )}

        {selectedGame === 'memory-match' && (
          <div className="game-stage">
            <MemoryMatchGame isAudioMuted={isMuted} />
          </div>
        )}

        {selectedGame === 'space-dodge' && (
          <div className="game-stage">
            <SpaceDodgeGame isAudioMuted={isMuted} />
          </div>
        )}
      </div>
    </section>
  );
}
