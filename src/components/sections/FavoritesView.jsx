// Favourites View Modal for NEXUS PLAY
// Provides a dedicated collection drawer of bookmarked games with quick actions and remove options

import React, { useEffect } from 'react';
import { Heart, X, Play, Info, ArrowUpRight, Layers } from 'lucide-react';
import { GAMES_DATA } from '../../data/gamesData';
import GameArtwork from '../common/GameArtwork';
import Badge from '../common/Badge';

export default function FavoritesView({
  favoriteIds = [],
  onClose,
  onPlayGame,
  onViewGameDetails,
  onToggleFavorite,
  onBrowseLibrary,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const favoriteGames = GAMES_DATA.filter((g) => favoriteIds.includes(g.id));

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="My Favourites"
    >
      <div className="favorites-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="favorites-modal-header">
          <div className="flex items-center gap-3">
            <div className="fav-heart-icon-box">
              <Heart size={20} fill="#EC4899" color="#EC4899" />
            </div>
            <div>
              <h2 className="fav-modal-title">My Favourites</h2>
              <span className="fav-modal-sub">
                {favoriteGames.length} {favoriteGames.length === 1 ? 'game' : 'games'} bookmarked locally
              </span>
            </div>
          </div>

          <button
            type="button"
            className="icon-circle-btn close-btn"
            onClick={onClose}
            aria-label="Close favourites"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="favorites-modal-body">
          {favoriteGames.length > 0 ? (
            <div className="fav-items-list">
              {favoriteGames.map((game) => (
                <div key={game.id} className="fav-item-row">
                  <div className="fav-thumb-box">
                    <GameArtwork id={game.id} className="fav-thumb-svg" title={game.title} />
                  </div>

                  <div className="fav-info-box">
                    <div className="fav-title-line">
                      <h3 className="fav-game-title">{game.title}</h3>
                      <Badge type={game.badge} size="sm" />
                    </div>
                    <p className="fav-game-summary">{game.summary}</p>
                    <div className="fav-meta-tags">
                      <span>{game.genre}</span>
                      <span>•</span>
                      <span>{game.isPlayable ? 'Free to Play' : game.demoPrice}</span>
                    </div>
                  </div>

                  <div className="fav-actions-box">
                    {game.isPlayable ? (
                      <button
                        type="button"
                        className="btn-primary-gaming sm-btn"
                        onClick={() => {
                          onClose();
                          onPlayGame(game);
                        }}
                      >
                        <Play size={14} fill="currentColor" /> Play
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-secondary-gaming sm-btn"
                        onClick={() => {
                          onClose();
                          onViewGameDetails(game);
                        }}
                      >
                        Details
                      </button>
                    )}

                    <button
                      type="button"
                      className="fav-remove-btn"
                      onClick={() => onToggleFavorite(game.id)}
                      title="Remove from favourites"
                      aria-label={`Remove ${game.title} from favorites`}
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="favorites-empty-box">
              <Heart size={44} className="text-muted mb-3" />
              <h3>Your Favourites Collection is Empty</h3>
              <p className="text-muted mt-1 max-w-sm">
                Bookmark your favorite browser games and cloud previews by clicking the heart icon on any game card.
              </p>
              <button
                type="button"
                className="btn-primary-gaming mt-4 glow-effect"
                onClick={() => {
                  onClose();
                  if (onBrowseLibrary) onBrowseLibrary();
                }}
              >
                <Layers size={16} /> Browse Game Library
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="favorites-modal-footer">
          <small className="text-muted">Favourites are saved locally to your device's browser storage.</small>
          <button type="button" className="btn-secondary-gaming" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
