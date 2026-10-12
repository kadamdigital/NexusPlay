// Game Detail Modal: Displays rich overview, technical specifications, input devices, and truthful CTAs
// Includes explicit cloud streaming and demo purchase disclaimers

import React, { useEffect } from 'react';
import {
  X,
  Play,
  Cloud,
  Heart,
  Gamepad,
  Wifi,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';
import GameArtwork from '../common/GameArtwork';
import Badge from '../common/Badge';

export default function GameDetailModal({
  game,
  onClose,
  onPlay,
  onDemoAccess,
  isFavorite = false,
  onToggleFavorite,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${game.title} Details`}
    >
      <div className="game-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Artwork Banner */}
        <div className="detail-hero-media">
          <GameArtwork id={game.id} className="detail-media-svg" title={game.title} />
          <div className="detail-media-gradient-overlay" />

          {/* Top control bar */}
          <div className="detail-top-controls">
            <div className="detail-badge-group">
              <Badge type={game.badge} />
              <span className="price-pill-tag">
                {game.isPlayable ? 'Free to Play' : game.demoPrice}
              </span>
            </div>

            <div className="detail-actions-right">
              <button
                type="button"
                className={`icon-circle-btn ${isFavorite ? 'fav-active' : ''}`}
                onClick={() => onToggleFavorite(game.id)}
                title={isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={18} fill={isFavorite ? '#EC4899' : 'none'} color={isFavorite ? '#EC4899' : '#FFFFFF'} />
              </button>

              <button
                type="button"
                className="icon-circle-btn close-btn"
                onClick={onClose}
                title="Close"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="detail-title-block">
            <span className="detail-genre-pill">{game.genre}</span>
            <h2 className="detail-game-title">{game.title}</h2>
            <p className="detail-tagline">{game.tagline}</p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="detail-modal-body">
          {/* Cloud Streaming or Local Notice */}
          {!game.isPlayable && (
            <div className="portfolio-disclosure-box">
              <div className="disclosure-icon">
                <AlertTriangle size={20} className="text-amber" />
              </div>
              <div className="disclosure-text">
                <strong>Illustrative Cloud Concept Entry</strong>
                <p>
                  Remote game streaming requires specialized distributed rendering infrastructure, low-latency edge servers, and commercial publisher licensing. In this NEXUS PLAY frontend portfolio demo, remote game streaming is simulated for UI evaluation.
                </p>
              </div>
            </div>
          )}

          {/* Description Section */}
          <div className="detail-section">
            <h3 className="section-heading-sm">Overview</h3>
            <p className="detail-description-text">{game.description}</p>
          </div>

          {/* Features Highlights */}
          {game.features && game.features.length > 0 && (
            <div className="detail-section">
              <h3 className="section-heading-sm">Key Highlights</h3>
              <ul className="features-list-grid">
                {game.features.map((feat, i) => (
                  <li key={i} className="feature-list-item">
                    <CheckCircle2 size={16} className="text-cyan shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specs & Hardware Grid */}
          <div className="detail-section">
            <h3 className="section-heading-sm">Technical Specifications & Controls</h3>
            <div className="specs-grid">
              <div className="spec-card">
                <div className="spec-icon">
                  <Gamepad size={18} className="text-violet" />
                </div>
                <div>
                  <span className="spec-label">Supported Inputs</span>
                  <strong className="spec-value">{game.supportedInputs.join(', ')}</strong>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-icon">
                  <Monitor size={18} className="text-cyan" />
                </div>
                <div>
                  <span className="spec-label">Target Video Quality</span>
                  <strong className="spec-value">{game.specs.targetResolution || game.specs.platform}</strong>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-icon">
                  <Wifi size={18} className="text-emerald" />
                </div>
                <div>
                  <span className="spec-label">Recommended Connection</span>
                  <strong className="spec-value">
                    {game.specs.recommendedBandwidth || 'Local Browser Execution'}
                  </strong>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-icon">
                  <AlertTriangle size={18} className="text-amber" />
                </div>
                <div>
                  <span className="spec-label">Target Latency</span>
                  <strong className="spec-value">{game.specs.latency}</strong>
                </div>
              </div>
            </div>

            <div className="controls-instruction-box">
              <strong>Control Scheme: </strong>
              <span>{game.controls}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="detail-modal-footer">
          <button type="button" className="btn-secondary-gaming" onClick={onClose}>
            Back to Catalogue
          </button>

          {game.isPlayable ? (
            <button
              type="button"
              className="btn-primary-gaming glow-effect"
              onClick={() => {
                onClose();
                if (onPlay) onPlay(game);
              }}
            >
              <Play size={18} fill="currentColor" /> Play Now in Browser
            </button>
          ) : game.accessType === 'free' ? (
            <button
              type="button"
              className="btn-primary-gaming glow-effect"
              onClick={() => {
                onClose();
                if (onDemoAccess) onDemoAccess(game);
              }}
            >
              <Cloud size={18} /> Launch Concept Demo Stream
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary-gaming glow-effect"
              onClick={() => {
                onClose();
                if (onDemoAccess) onDemoAccess(game);
              }}
            >
              <ArrowUpRight size={18} /> Simulate Demo Access ({game.demoPrice})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
