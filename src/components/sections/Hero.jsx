// Cinematic Hero Section for NEXUS PLAY
// Features layered composition, glowing accents, feature pills, primary/secondary CTAs, and hero game visualizer

import React from 'react';
import { Play, Cloud, Sparkles, ShieldCheck, Zap, ArrowRight, Gamepad2, Award } from 'lucide-react';
import GameArtwork from '../common/GameArtwork';

export default function Hero({ onExploreGames, onDiscoverCloud, onQuickPlay }) {
  return (
    <section className="nexus-hero-section" id="hero">
      {/* Background ambient glows */}
      <div className="hero-glow-orb glow-violet-left" />
      <div className="hero-glow-orb glow-cyan-right" />
      <div className="hero-grid-pattern" />

      <div className="hero-content-container">
        {/* Left Column: Typography & CTAs */}
        <div className="hero-text-column">
          {/* Feature labels / Eyebrow */}
          <div className="hero-badge-row">
            <span className="hero-pill-badge pill-browser">
              <Sparkles size={14} /> Browser Games
            </span>
            <span className="hero-pill-badge pill-cloud">
              <Cloud size={14} /> Cloud Gaming
            </span>
            <span className="hero-pill-badge pill-f2p">
              <Zap size={14} /> Free-to-Play
            </span>
          </div>

          <h1 className="hero-main-headline">
            Your Next World <br />
            <span className="gradient-text-hero">Starts Here.</span>
          </h1>

          <p className="hero-supporting-text">
            Discover incredible games. Play instantly in your browser or explore the future of cloud gaming.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions-row">
            <button
              type="button"
              className="btn-primary-gaming hero-btn-main glow-effect"
              onClick={onExploreGames}
            >
              <Gamepad2 size={18} />
              <span>Explore Games</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="btn-secondary-gaming hero-btn-sub"
              onClick={onDiscoverCloud}
            >
              <Cloud size={18} />
              <span>Discover Cloud Gaming</span>
            </button>
          </div>

          {/* Platform Trust & Architectural Highlights */}
          <div className="hero-specs-strip">
            <div className="strip-item">
              <span className="strip-val">3</span>
              <span className="strip-lbl">Instant Browser Games</span>
            </div>
            <div className="strip-divider" />
            <div className="strip-item">
              <span className="strip-val">60 FPS</span>
              <span className="strip-lbl">Local Canvas Engine</span>
            </div>
            <div className="strip-divider" />
            <div className="strip-item">
              <span className="strip-val">0 MB</span>
              <span className="strip-lbl">No Install Footprint</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Hero Art Stage & Quick Launcher */}
        <div className="hero-visual-column">
          <div className="hero-stage-card">
            <div className="hero-stage-header">
              <div className="stage-header-title">
                <span className="live-pulse-dot" />
                <span>SPOTLIGHT • INSTANT PLAY</span>
              </div>
              <span className="stage-badge-pill">HTML5 Canvas</span>
            </div>

            {/* Embedded Visual Artwork */}
            <div className="hero-art-display">
              <GameArtwork id="neon-snake" className="hero-display-svg" title="Neon Snake Hero Display" />
              <div className="hero-art-scrim" />
              <div className="hero-art-caption">
                <h3>Neon Snake</h3>
                <p>Cyber Arcade Grid Runner • Playable Right Now</p>
              </div>
            </div>

            {/* Quick Play Trigger Bar */}
            <div className="hero-stage-footer">
              <div className="stage-footer-info">
                <strong>Instant Launch Ready</strong>
                <span>Direct client execution in browser</span>
              </div>
              <button
                type="button"
                className="btn-primary-gaming sm-btn glow-effect"
                onClick={onQuickPlay}
              >
                <Play size={15} fill="currentColor" /> Play Now
              </button>
            </div>
          </div>

          {/* Floating Accents */}
          <div className="hero-floating-card floating-card-1">
            <Cloud size={16} className="text-cyan" />
            <div>
              <strong>Cloud Hub</strong>
              <span>Streaming Concept</span>
            </div>
          </div>

          <div className="hero-floating-card floating-card-2">
            <ShieldCheck size={16} className="text-emerald" />
            <div>
              <strong>100% Client-Side</strong>
              <span>No backend required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
