// Full Game Player Modal: Launches playable games from any card across the site
// Features focused gameplay view, controls reminder, audio controls, and clean close handlers

import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Maximize2, ShieldCheck, Heart } from 'lucide-react';
import NeonSnakeGame from './NeonSnakeGame';
import MemoryMatchGame from './MemoryMatchGame';
import SpaceDodgeGame from './SpaceDodgeGame';
import { setAudioMuted, getAudioMuted } from '../../utils/audio';
import { isStoredFavorite, toggleStoredFavorite } from '../../utils/storage';

export default function GamePlayerModal({ game, onClose, onFavoriteChange }) {
  const [isMuted, setIsMuted] = useState(getAudioMuted);
  const [isFav, setIsFav] = useState(() => (game ? isStoredFavorite(game.id) : false));

  useEffect(() => {
    // ESC to close modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    setAudioMuted(next);
  };

  const handleFavorite = () => {
    const res = toggleStoredFavorite(game.id);
    setIsFav(res.isFavorite);
    if (onFavoriteChange) onFavoriteChange(game.id, res.isFavorite);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Play ${game.title}`}>
      <div className="game-player-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="player-modal-header">
          <div className="player-title-info">
            <span className="live-status-dot" />
            <div>
              <h2 className="player-game-title">{game.title}</h2>
              <span className="player-game-genre">{game.genre} • Instant Browser Execution</span>
            </div>
          </div>

          <div className="player-header-actions">
            <button
              onClick={handleFavorite}
              className={`icon-circle-btn ${isFav ? 'fav-active' : ''}`}
              title={isFav ? 'Remove from Favourites' : 'Add to Favourites'}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={18} fill={isFav ? '#EC4899' : 'none'} color={isFav ? '#EC4899' : '#9CA8BD'} />
            </button>

            <button
              onClick={toggleSound}
              className="icon-circle-btn"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button
              onClick={onClose}
              className="icon-circle-btn close-btn"
              title="Close Game Player"
              aria-label="Close game modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Game Stage */}
        <div className="player-modal-body">
          {game.id === 'neon-snake' && <NeonSnakeGame isAudioMuted={isMuted} />}
          {game.id === 'memory-match' && <MemoryMatchGame isAudioMuted={isMuted} />}
          {game.id === 'space-dodge' && <SpaceDodgeGame isAudioMuted={isMuted} />}
        </div>

        {/* Footer with Controls Guide */}
        <div className="player-modal-footer">
          <div className="controls-guide">
            <strong>Controls: </strong>
            <span>{game.controls}</span>
          </div>
          <div className="engine-badge">
            <ShieldCheck size={14} className="text-emerald" />
            <span>Zero Remote Stream Latency • Local Client Execution</span>
          </div>
        </div>
      </div>
    </div>
  );
}
