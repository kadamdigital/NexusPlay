// Reusable GameCard component for Carousels, Library, and Discovery sections
// Provides responsive presentation, artwork, badges, favorites toggle, and truthful action buttons

import React from 'react';
import { Play, Eye, Cloud, Heart, Info, ArrowUpRight } from 'lucide-react';
import GameArtwork from './GameArtwork';
import Badge from './Badge';

export default function GameCard({
  game,
  onPlay,
  onViewDetails,
  onDemoAccess,
  isFavorite = false,
  onToggleFavorite,
  className = '',
}) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(game.id);
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(game);
    }
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (game.isPlayable) {
      if (onPlay) onPlay(game);
    } else if (game.accessType === 'free') {
      if (onDemoAccess) onDemoAccess(game);
      else if (onViewDetails) onViewDetails(game);
    } else {
      if (onDemoAccess) onDemoAccess(game);
      else if (onViewDetails) onViewDetails(game);
    }
  };

  return (
    <article
      className={`nexus-game-card ${className} ${game.isPlayable ? 'playable-card' : 'cloud-card'}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${game.title}`}
    >
      {/* Artwork Box */}
      <div className="card-media-wrapper">
        <GameArtwork id={game.id} className="card-artwork-svg" title={game.title} />

        {/* Favorite Heart Button */}
        <button
          type="button"
          className={`card-favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
          aria-label={isFavorite ? `Remove ${game.title} from favorites` : `Add ${game.title} to favorites`}
        >
          <Heart size={16} fill={isFavorite ? '#EC4899' : 'none'} color={isFavorite ? '#EC4899' : '#FFFFFF'} />
        </button>

        {/* Top Badges */}
        <div className="card-badge-row">
          <Badge type={game.badge} />
          {game.isPlayable ? (
            <span className="mini-tag tag-instant">Instant Play</span>
          ) : (
            <span className="mini-tag tag-stream">Cloud Demo</span>
          )}
        </div>

        {/* Hover quick overlay */}
        <div className="card-hover-scrim">
          <span className="view-detail-hint">
            <Eye size={16} /> Click for full specs & details
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="card-body">
        <div className="card-meta-line">
          <span className="card-genre">{game.genre}</span>
          <span className="card-price-tag">
            {game.isPlayable ? 'Free to Play' : game.demoPrice}
          </span>
        </div>

        <h3 className="card-title">{game.title}</h3>
        <p className="card-summary">{game.summary}</p>

        {/* Footer with Truthful Action Button */}
        <div className="card-footer">
          {game.isPlayable ? (
            <button
              type="button"
              className="card-action-btn btn-play-action glow-violet"
              onClick={handleActionClick}
            >
              <Play size={15} fill="currentColor" />
              <span>Play Now</span>
            </button>
          ) : game.accessType === 'free' ? (
            <button
              type="button"
              className="card-action-btn btn-cloud-free"
              onClick={handleActionClick}
            >
              <Cloud size={15} />
              <span>Free Demo</span>
            </button>
          ) : (
            <button
              type="button"
              className="card-action-btn btn-cloud-preview"
              onClick={handleActionClick}
            >
              <ArrowUpRight size={15} />
              <span>Demo Preview</span>
            </button>
          )}

          <button
            type="button"
            className="card-info-btn"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(game);
            }}
            title="System specifications and instructions"
            aria-label={`View specs for ${game.title}`}
          >
            <Info size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
