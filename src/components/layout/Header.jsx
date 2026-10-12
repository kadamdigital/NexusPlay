// Sticky Responsive Header for NEXUS PLAY
// Includes Navigation, Mobile Drawer, Search Trigger, Favourites Badge, Profile Button, and Play Now CTA

import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Search,
  Heart,
  User,
  Menu,
  X,
  Play,
  Cloud,
  Layers,
  Crown,
} from 'lucide-react';

export default function Header({
  activeTab = 'discover',
  onTabChange,
  favoritesCount = 0,
  onOpenSearch,
  onOpenFavorites,
  onOpenProfile,
  onQuickPlay,
  profileTier = 'free',
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for sticky shadow & backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tabId) => {
    if (onTabChange) onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  const getTierPill = () => {
    switch (profileTier) {
      case 'ultimate':
        return <span className="user-tier-pill tier-ultimate">Ultimate</span>;
      case 'plus':
        return <span className="user-tier-pill tier-plus">Plus</span>;
      default:
        return <span className="user-tier-pill tier-free">Explorer</span>;
    }
  };

  return (
    <header className={`nexus-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <div className="header-brand-group">
          <button
            type="button"
            className="brand-logo-btn"
            onClick={() => handleNavClick('discover')}
            aria-label="NEXUS PLAY Home"
          >
            <div className="brand-icon-box">
              <span className="brand-logo-polygon">❖</span>
            </div>
            <div className="brand-text-col">
              <span className="brand-name">
                NEXUS<span className="text-cyan">PLAY</span>
              </span>
              <span className="brand-byline">by Kadam Digital</span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button
            type="button"
            className={`nav-link ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => handleNavClick('discover')}
          >
            Discover
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === 'cloud' ? 'active' : ''}`}
            onClick={() => handleNavClick('cloud')}
          >
            Cloud Gaming
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === 'browser' ? 'active' : ''}`}
            onClick={() => handleNavClick('browser')}
          >
            Play Online
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => handleNavClick('library')}
          >
            Game Library
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === 'membership' ? 'active' : ''}`}
            onClick={() => handleNavClick('membership')}
          >
            Membership
          </button>
        </nav>

        {/* Right Action Icons & CTA */}
        <div className="header-actions">
          {/* Search Trigger */}
          <button
            type="button"
            className="action-icon-btn search-trigger"
            onClick={onOpenSearch}
            title="Search Games (Title, Genre)"
            aria-label="Search all games"
          >
            <Search size={18} />
          </button>

          {/* Favourites Quick Access */}
          <button
            type="button"
            className="action-icon-btn fav-trigger"
            onClick={onOpenFavorites}
            title="My Favourites"
            aria-label={`View favorites (${favoritesCount} saved)`}
          >
            <Heart size={18} />
            {favoritesCount > 0 && <span className="fav-counter-badge">{favoritesCount}</span>}
          </button>

          {/* Player Profile Button */}
          <button
            type="button"
            className="profile-quick-btn"
            onClick={onOpenProfile}
            title="Demo Player Profile"
            aria-label="Open player profile"
          >
            <div className="profile-avatar-circle">
              <User size={16} />
            </div>
            <div className="profile-tier-info hide-tablet">
              {getTierPill()}
            </div>
          </button>

          {/* Prominent "Play Now" CTA */}
          <button
            type="button"
            className="btn-play-now-cta"
            onClick={onQuickPlay}
            aria-label="Play Instant Browser Games"
          >
            <Play size={15} fill="currentColor" />
            <span>Play Now</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-text-col">
                <span className="brand-name">
                  NEXUS<span className="text-cyan">PLAY</span>
                </span>
                <span className="brand-byline">by Kadam Digital</span>
              </div>
              <button
                type="button"
                className="icon-circle-btn close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-drawer-links">
              <button
                type="button"
                className={`drawer-link ${activeTab === 'discover' ? 'active' : ''}`}
                onClick={() => handleNavClick('discover')}
              >
                <Layers size={18} /> Discover
              </button>
              <button
                type="button"
                className={`drawer-link ${activeTab === 'cloud' ? 'active' : ''}`}
                onClick={() => handleNavClick('cloud')}
              >
                <Cloud size={18} /> Cloud Gaming Hub
              </button>
              <button
                type="button"
                className={`drawer-link ${activeTab === 'browser' ? 'active' : ''}`}
                onClick={() => handleNavClick('browser')}
              >
                <Gamepad2 size={18} /> Play Online (Instant Games)
              </button>
              <button
                type="button"
                className={`drawer-link ${activeTab === 'library' ? 'active' : ''}`}
                onClick={() => handleNavClick('library')}
              >
                <Search size={18} /> Full Game Library
              </button>
              <button
                type="button"
                className={`drawer-link ${activeTab === 'membership' ? 'active' : ''}`}
                onClick={() => handleNavClick('membership')}
              >
                <Crown size={18} /> Membership & Plans
              </button>
            </nav>

            <div className="mobile-drawer-bottom">
              <button
                type="button"
                className="btn-primary-gaming w-full mb-3 glow-effect"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onQuickPlay) onQuickPlay();
                }}
              >
                <Play size={16} fill="currentColor" /> Instant Play (Snake, Match, Dodge)
              </button>

              <div className="mobile-shortcuts-grid">
                <button
                  type="button"
                  className="shortcut-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                >
                  <Search size={16} /> Search
                </button>
                <button
                  type="button"
                  className="shortcut-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFavorites();
                  }}
                >
                  <Heart size={16} /> Favourites ({favoritesCount})
                </button>
                <button
                  type="button"
                  className="shortcut-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                >
                  <User size={16} /> Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
