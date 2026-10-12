// Player Profile Modal & Dashboard for NEXUS PLAY
// Allows local editing of display name, shows high scores, total launches, favorites list, recent history, and clear data

import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Trophy,
  Zap,
  Clock,
  Heart,
  RotateCcw,
  Trash2,
  Check,
  Edit2,
  ShieldCheck,
  Play,
  Layers,
  Crown,
} from 'lucide-react';
import {
  getStoredProfile,
  updateStoredProfile,
  getStoredRecentGames,
  getStoredFavorites,
  clearAllLocalDemoData,
} from '../../utils/storage';
import { GAMES_DATA } from '../../data/gamesData';
import Badge from '../common/Badge';

export default function PlayerProfileModal({
  onClose,
  onPlayGame,
  onViewGameDetails,
  onDataReset,
}) {
  const [profile, setProfile] = useState(getStoredProfile);
  const [recentGames, setRecentGames] = useState(getStoredRecentGames);
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.displayName || 'CyberPlayer_01');
  const [savedAlert, setSavedAlert] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    const updated = updateStoredProfile({ displayName: nameInput.trim() });
    setProfile(updated);
    setIsEditingName(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2200);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear your local demo play history and high scores?')) {
      clearAllLocalDemoData();
      setProfile(getStoredProfile());
      setRecentGames([]);
      setFavorites([]);
      if (onDataReset) onDataReset();
    }
  };

  const favoriteGameObjects = GAMES_DATA.filter((g) => favorites.includes(g.id));

  const getTierLabel = () => {
    switch (profile.membershipTier) {
      case 'ultimate':
        return 'NEXUS ULTIMATE (Concept)';
      case 'plus':
        return 'NEXUS PLUS (Concept)';
      default:
        return 'FREE EXPLORER';
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Player Profile Dashboard"
    >
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="profile-modal-header">
          <div className="flex items-center gap-3">
            <div className="profile-header-avatar">
              <User size={26} />
            </div>
            <div>
              <div className="profile-name-row">
                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="name-edit-form">
                    <input
                      type="text"
                      className="name-edit-input"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      maxLength={24}
                      autoFocus
                    />
                    <button type="submit" className="name-save-btn" title="Save name">
                      <Check size={16} />
                    </button>
                    <button
                      type="button"
                      className="name-cancel-btn"
                      onClick={() => setIsEditingName(false)}
                      title="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </form>
                ) : (
                  <>
                    <h2 className="profile-display-name">{profile.displayName}</h2>
                    <button
                      type="button"
                      className="name-edit-trigger"
                      onClick={() => setIsEditingName(true)}
                      title="Edit display name"
                      aria-label="Edit display name"
                    >
                      <Edit2 size={15} />
                    </button>
                  </>
                )}
              </div>
              <div className="profile-tier-badge">
                <Crown size={13} className="text-violet" />
                <span>{getTierLabel()}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="icon-circle-btn close-btn"
            onClick={onClose}
            aria-label="Close profile"
          >
            <X size={20} />
          </button>
        </div>

        {/* Notice of Local Storage */}
        <div className="profile-demo-notice">
          <ShieldCheck size={16} className="text-cyan shrink-0" />
          <span>Local Demo Profile: Preferences and scores are saved in your browser's local storage.</span>
        </div>

        {savedAlert && (
          <div className="profile-alert-toast">
            <Check size={16} className="text-emerald" /> Display name updated!
          </div>
        )}

        {/* Body */}
        <div className="profile-modal-body">
          {/* Stats Grid */}
          <div className="profile-stats-grid">
            <div className="p-stat-box">
              <span className="p-stat-label">Total Games Launched</span>
              <strong className="p-stat-value text-cyan">
                {profile.totalGamesPlayed || recentGames.length || 0}
              </strong>
            </div>

            <div className="p-stat-box">
              <span className="p-stat-label">Neon Snake Best</span>
              <strong className="p-stat-value text-emerald">
                {profile.highScores?.snake || 0} pts
              </strong>
            </div>

            <div className="p-stat-box">
              <span className="p-stat-label">Space Dodge Best</span>
              <strong className="p-stat-value text-amber">
                {profile.highScores?.dodge || 0} pts
              </strong>
            </div>

            <div className="p-stat-box">
              <span className="p-stat-label">Memory Match Best</span>
              <strong className="p-stat-value text-violet">
                {profile.highScores?.memoryBestMoves
                  ? `${profile.highScores.memoryBestMoves} moves`
                  : '—'}
              </strong>
            </div>
          </div>

          {/* Recently Played Section */}
          <div className="profile-section-block">
            <div className="profile-section-title-row">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-cyan" />
                <h3>Recently Played Games</h3>
              </div>
              {recentGames.length > 0 && (
                <button
                  type="button"
                  className="clear-history-link"
                  onClick={handleClearHistory}
                >
                  <Trash2 size={13} /> Clear History
                </button>
              )}
            </div>

            {recentGames.length > 0 ? (
              <div className="recent-games-list">
                {recentGames.map((item, idx) => {
                  const gameObj = GAMES_DATA.find((g) => g.id === item.id);
                  return (
                    <div key={`${item.id}-${idx}`} className="recent-game-item">
                      <div className="recent-left">
                        <span className="recent-title">{item.title}</span>
                        <span className="recent-meta">
                          {item.genre} • {new Date(item.playedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="recent-right">
                        {item.score > 0 && (
                          <span className="recent-score-pill">Score: {item.score}</span>
                        )}
                        {gameObj && gameObj.isPlayable && (
                          <button
                            type="button"
                            className="btn-primary-gaming sm-btn"
                            onClick={() => {
                              onClose();
                              onPlayGame(gameObj);
                            }}
                          >
                            <Play size={13} fill="currentColor" /> Continue
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="profile-empty-mini">
                <p>No games played yet. Launch any browser game to start tracking your records!</p>
              </div>
            )}
          </div>

          {/* Favourites Section */}
          <div className="profile-section-block">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={16} className="text-rose" />
              <h3>Saved Favourites ({favoriteGameObjects.length})</h3>
            </div>

            {favoriteGameObjects.length > 0 ? (
              <div className="favorites-mini-grid">
                {favoriteGameObjects.map((fav) => (
                  <div key={fav.id} className="fav-mini-card">
                    <div className="fav-mini-info">
                      <strong className="fav-mini-title">{fav.title}</strong>
                      <span className="fav-mini-genre">{fav.genre}</span>
                    </div>
                    <div className="fav-mini-actions">
                      {fav.isPlayable ? (
                        <button
                          type="button"
                          className="btn-primary-gaming sm-btn"
                          onClick={() => {
                            onClose();
                            onPlayGame(fav);
                          }}
                        >
                          <Play size={13} fill="currentColor" /> Play
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-secondary-gaming sm-btn"
                          onClick={() => {
                            onClose();
                            onViewGameDetails(fav);
                          }}
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty-mini">
                <p>No favourite games saved. Click the heart icon on any game card to bookmark it.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="profile-modal-footer">
          <button
            type="button"
            className="btn-danger-outline"
            onClick={handleClearHistory}
            title="Reset all local progress, high scores, and favorites"
          >
            <RotateCcw size={15} /> Reset Local Data
          </button>
          <button type="button" className="btn-secondary-gaming" onClick={onClose}>
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
