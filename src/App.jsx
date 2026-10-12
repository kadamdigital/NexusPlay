// NEXUS PLAY — Cloud Gaming & Online Gaming Platform
// Fictional Gaming Platform Concept Developed by Kadam Digital
// React 19 + Vite + HTML5 Canvas + Web Audio API

import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SearchModal from './components/layout/SearchModal';
import Hero from './components/sections/Hero';
import FeaturedGames from './components/sections/FeaturedGames';
import BrowserGamesHub from './components/games/BrowserGamesHub';
import CloudGamingHub from './components/sections/CloudGamingHub';
import GameLibrary from './components/sections/GameLibrary';
import MembershipSection from './components/sections/MembershipSection';
import PlayerProfileModal from './components/sections/PlayerProfileModal';
import FavoritesView from './components/sections/FavoritesView';
import GameDetailModal from './components/modals/GameDetailModal';
import CloudDemoModal from './components/modals/CloudDemoModal';
import DemoPurchaseModal from './components/modals/DemoPurchaseModal';
import GamePlayerModal from './components/games/GamePlayerModal';

import { GAMES_DATA } from './data/gamesData';
import {
  getStoredFavorites,
  toggleStoredFavorite,
  getStoredProfile,
  updateStoredProfile,
} from './utils/storage';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('discover');

  // Modals & Active Screens
  const [activeDetailGame, setActiveDetailGame] = useState(null);
  const [activePlayGame, setActivePlayGame] = useState(null);
  const [activeCloudDemoGame, setActiveCloudDemoGame] = useState(null);
  const [activePurchaseGame, setActivePurchaseGame] = useState(null);

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Stored state
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [profile, setProfile] = useState(getStoredProfile);
  const [selectedBrowserGameId, setSelectedBrowserGameId] = useState('neon-snake');

  // Sync profile & favorites on mount
  useEffect(() => {
    setFavorites(getStoredFavorites());
    setProfile(getStoredProfile());
  }, []);

  // Handle Tab navigation with smooth scroll
  const handleTabChange = useCallback((tabId, subTarget = null) => {
    setActiveTab(tabId);

    if (tabId === 'discover') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'cloud') {
      const el = document.getElementById('cloud-gaming');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'browser') {
      if (subTarget) setSelectedBrowserGameId(subTarget);
      const el = document.getElementById('browser-games');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'library') {
      const el = document.getElementById('library');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'membership') {
      const el = document.getElementById('membership');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Favorite toggle handler
  const handleToggleFavorite = useCallback((gameId) => {
    const { updated } = toggleStoredFavorite(gameId);
    setFavorites(updated);
  }, []);

  // Launch playable game (modal)
  const handlePlayGame = useCallback((game) => {
    if (game.isPlayable) {
      setActivePlayGame(game);
    } else {
      setActiveDetailGame(game);
    }
  }, []);

  // View game details (modal)
  const handleViewDetails = useCallback((game) => {
    setActiveDetailGame(game);
  }, []);

  // Demo access / cloud demo trigger
  const handleDemoAccess = useCallback((game) => {
    if (game.accessType === 'free') {
      setActiveCloudDemoGame(game);
    } else {
      setActivePurchaseGame(game);
    }
  }, []);

  // Quick play action from Header/Hero
  const handleQuickPlay = useCallback(() => {
    const snakeGame = GAMES_DATA.find((g) => g.id === 'neon-snake');
    if (snakeGame) {
      setActivePlayGame(snakeGame);
    }
  }, []);

  // Membership tier change
  const handleSelectTier = useCallback((tierId) => {
    const updated = updateStoredProfile({ membershipTier: tierId });
    setProfile(updated);
  }, []);

  // Data reset callback
  const handleDataReset = useCallback(() => {
    setFavorites([]);
    setProfile(getStoredProfile());
  }, []);

  return (
    <div className="nexus-app-root">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenProfile={() => setProfileModalOpen(true)}
        onQuickPlay={handleQuickPlay}
        profileTier={profile.membershipTier}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Cinematic Hero Section */}
        <Hero
          onExploreGames={() => handleTabChange('library')}
          onDiscoverCloud={() => handleTabChange('cloud')}
          onQuickPlay={handleQuickPlay}
        />

        {/* Featured Games Carousel */}
        <FeaturedGames
          games={GAMES_DATA}
          onPlay={handlePlayGame}
          onViewDetails={handleViewDetails}
          onDemoAccess={handleDemoAccess}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Play Online — Genuinely Playable Browser Games */}
        <BrowserGamesHub
          activeGameId={selectedBrowserGameId}
          onGameChange={(id) => setSelectedBrowserGameId(id)}
        />

        {/* Cloud Gaming Hub */}
        <CloudGamingHub
          games={GAMES_DATA}
          onViewDetails={handleViewDetails}
          onDemoAccess={handleDemoAccess}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Full Game Discovery & Library */}
        <GameLibrary
          games={GAMES_DATA}
          onPlay={handlePlayGame}
          onViewDetails={handleViewDetails}
          onDemoAccess={handleDemoAccess}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Membership & Subscription Concepts */}
        <MembershipSection
          currentTier={profile.membershipTier}
          onSelectTier={handleSelectTier}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleTabChange} />

      {/* Modals & Dialogs */}
      {/* 1. Global Search Modal */}
      {searchModalOpen && (
        <SearchModal
          onClose={() => setSearchModalOpen(false)}
          onSelectGame={(game) => {
            handleViewDetails(game);
          }}
          onPlayGame={(game) => {
            handlePlayGame(game);
          }}
        />
      )}

      {/* 2. Dedicated Favourites Drawer / Modal */}
      {favoritesModalOpen && (
        <FavoritesView
          favoriteIds={favorites}
          onClose={() => setFavoritesModalOpen(false)}
          onPlayGame={handlePlayGame}
          onViewGameDetails={handleViewDetails}
          onToggleFavorite={handleToggleFavorite}
          onBrowseLibrary={() => handleTabChange('library')}
        />
      )}

      {/* 3. Player Profile Dashboard Modal */}
      {profileModalOpen && (
        <PlayerProfileModal
          onClose={() => setProfileModalOpen(false)}
          onPlayGame={handlePlayGame}
          onViewGameDetails={handleViewDetails}
          onDataReset={handleDataReset}
        />
      )}

      {/* 4. Full Game Player Modal */}
      {activePlayGame && (
        <GamePlayerModal
          game={activePlayGame}
          onClose={() => {
            setActivePlayGame(null);
            setProfile(getStoredProfile());
          }}
          onFavoriteChange={(id, isFav) => {
            setFavorites(getStoredFavorites());
          }}
        />
      )}

      {/* 5. Game Detail Modal */}
      {activeDetailGame && (
        <GameDetailModal
          game={activeDetailGame}
          onClose={() => setActiveDetailGame(null)}
          onPlay={handlePlayGame}
          onDemoAccess={handleDemoAccess}
          isFavorite={favorites.includes(activeDetailGame.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* 6. Interactive Simulated Cloud Demo Stream HUD */}
      {activeCloudDemoGame && (
        <CloudDemoModal
          game={activeCloudDemoGame}
          onClose={() => setActiveCloudDemoGame(null)}
        />
      )}

      {/* 7. Demo Purchase / Entitlement Screen for Premium Cloud Games */}
      {activePurchaseGame && (
        <DemoPurchaseModal
          game={activePurchaseGame}
          onClose={() => setActivePurchaseGame(null)}
          onSimulateAccess={(id) => {
            // Optional local unlock feedback
          }}
        />
      )}
    </div>
  );
}
