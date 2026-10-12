// Cloud Gaming Hub Section for NEXUS PLAY
// "Big Games. No Big Downloads." - Filterable cloud catalog, tech specs, latency simulator, and truthful disclaimers

import React, { useState } from 'react';
import { Cloud, Wifi, Cpu, ShieldAlert, Monitor, Gamepad, Filter, Layers } from 'lucide-react';
import GameCard from '../common/GameCard';

const CLOUD_FILTERS = [
  'All Cloud Games',
  'Free Access',
  'Premium Access',
  'Action',
  'Adventure',
  'Racing',
  'Strategy',
];

export default function CloudGamingHub({
  games,
  onViewDetails,
  onDemoAccess,
  favorites = [],
  onToggleFavorite,
}) {
  const [activeFilter, setActiveFilter] = useState('All Cloud Games');

  // Filter only cloud games
  const cloudGames = games.filter((g) => g.category === 'cloud');

  const filteredGames = cloudGames.filter((g) => {
    if (activeFilter === 'All Cloud Games') return true;
    if (activeFilter === 'Free Access') return g.accessType === 'free';
    if (activeFilter === 'Premium Access') return g.accessType === 'premium';
    return g.genre.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section className="nexus-cloud-hub-section" id="cloud-gaming">
      {/* Section Header */}
      <div className="section-header-block text-center max-w-3xl mx-auto mb-10">
        <div className="section-eyebrow inline-flex items-center gap-2">
          <Cloud size={16} className="text-cyan" />
          <span>CLOUD GAMING HUB • NEXT-GEN STREAMING</span>
        </div>
        <h2 className="section-title text-4xl mt-2 mb-3">
          Big Games. <span className="gradient-text-hero">No Big Downloads.</span>
        </h2>
        <p className="section-subtitle text-lg">
          Cloud gaming renders high-fidelity 3D graphics on remote edge servers and streams interactive video frames directly to your device with minimal latency.
        </p>
      </div>

      {/* Cloud Architecture Explanation Strip */}
      <div className="cloud-features-grid">
        <div className="cloud-feat-card">
          <div className="cloud-feat-icon cyan">
            <Cpu size={24} />
          </div>
          <h4>Zero Storage Needed</h4>
          <p>Stream concept 80GB titles instantly without waiting for lengthy installations or storage downloads.</p>
        </div>

        <div className="cloud-feat-card">
          <div className="cloud-feat-icon violet">
            <Monitor size={24} />
          </div>
          <h4>Any Screen, Anywhere</h4>
          <p>Seamlessly transfer your concept gaming session between mobile phones, laptops, smart TVs, and tablets.</p>
        </div>

        <div className="cloud-feat-card">
          <div className="cloud-feat-icon emerald">
            <Wifi size={24} />
          </div>
          <h4>Edge Cloud Pipeline</h4>
          <p>Low-latency WebRTC streaming designed for standard 25+ Mbps broadband or 5GHz Wi-Fi networks.</p>
        </div>
      </div>

      {/* Prominent Portfolio Disclaimer Notice */}
      <div className="cloud-disclaimer-banner">
        <ShieldAlert size={22} className="text-amber shrink-0" />
        <div className="disclaimer-content">
          <strong>Illustrative Cloud Portfolio Catalogue</strong>
          <p>
            All titles listed below are fictional concept showcases developed for the Kadam Digital portfolio. Remote GPU game streaming requires commercial backend integration with distributed edge virtualization providers (e.g. AWS Nimble, Azure NV, or custom GeForce NOW APIs). In this demo, interaction is simulated via local HUD telemetry.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="cloud-filter-bar">
        <div className="filter-scroll-wrapper">
          {CLOUD_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`cloud-filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cloud Games Grid */}
      <div className="cloud-games-grid">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onViewDetails={onViewDetails}
              onDemoAccess={onDemoAccess}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <div className="empty-filter-state">
            <Layers size={36} className="text-muted" />
            <p>No cloud concept games matching "{activeFilter}".</p>
            <button
              type="button"
              className="btn-secondary-gaming mt-2"
              onClick={() => setActiveFilter('All Cloud Games')}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
