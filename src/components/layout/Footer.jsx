// Footer component for NEXUS PLAY
// Credits Kadam Digital, features clean links, technology badge, and non-commercial disclaimer

import React from 'react';
import { Globe, Cpu } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="nexus-footer">
      <div className="footer-top-accent-line" />

      <div className="footer-main-container">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="brand-logo-polygon">❖</span>
            <span className="brand-name">
              NEXUS<span className="text-cyan">PLAY</span>
            </span>
          </div>
          <p className="footer-tagline">"Your Next World Starts Here."</p>
          <p className="footer-summary">
            A fictional gaming platform concept developed by <strong>Kadam Digital</strong> combining instant client-side browser gaming and futuristic cloud-gaming library discovery.
          </p>

          <div className="agency-credit-pill">
            <Globe size={14} className="text-cyan" />
            <span>A Concept Design by <strong>Kadam Digital</strong></span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">Platform Discovery</h4>
          <ul className="footer-links-list">
            <li>
              <button type="button" onClick={() => onNavigate('discover')}>
                Featured Showcases
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('cloud')}>
                Cloud Gaming Hub
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('browser')}>
                Instant Browser Games
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('library')}>
                Full Catalogue Discovery
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('membership')}>
                Membership & Tiers
              </button>
            </li>
          </ul>
        </div>

        {/* Playable Games Direct Links */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">Instant Playable Games</h4>
          <ul className="footer-links-list">
            <li>
              <button type="button" onClick={() => onNavigate('browser', 'neon-snake')}>
                Neon Snake (Arcade Canvas)
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('browser', 'memory-match')}>
                Memory Match (Neural Puzzle)
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('browser', 'space-dodge')}>
                Space Dodge (Star Reflex)
              </button>
            </li>
          </ul>

          <div className="client-badge mt-4">
            <Cpu size={14} className="text-emerald" />
            <span>HTML5 Canvas 2D • 60 FPS Local Loop</span>
          </div>
        </div>

        {/* Technology & Disclosure */}
        <div className="footer-nav-col footer-disclosure-col">
          <h4 className="footer-heading">Architecture & Disclosures</h4>
          <p className="disclosure-text-block">
            <strong>Demo Architecture Notice:</strong> Browser games run genuinely in your browser with local state. Cloud streaming and payment checkouts are simulated conceptual models. No financial transactions, commercial streaming servers, or copyrighted assets are involved.
          </p>
          <div className="tech-stack-row">
            <span className="tech-badge">React 19</span>
            <span className="tech-badge">Vite</span>
            <span className="tech-badge">HTML5 Canvas</span>
            <span className="tech-badge">Web Audio</span>
            <span className="tech-badge">CSS3</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © 2026 NEXUS PLAY. Fictional Concept Platform developed by <strong>Kadam Digital</strong> for portfolio presentation. All rights reserved.
          </p>
          <div className="footer-bottom-meta">
            <span>Client-side Demo</span>
            <span className="separator">•</span>
            <span>Zero Tracking</span>
            <span className="separator">•</span>
            <span>Local Storage Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
