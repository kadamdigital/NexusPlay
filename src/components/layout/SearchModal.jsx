// Global Search Modal: Fast search across all games with filter tags, live results, and instant actions

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Play, Cloud, ArrowUpRight, Gamepad2, Sparkles } from 'lucide-react';
import { GAMES_DATA } from '../../data/gamesData';
import Badge from '../common/Badge';
import GameArtwork from '../common/GameArtwork';

export default function SearchModal({ onClose, onSelectGame, onPlayGame }) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'playable' | 'cloud'
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredGames = GAMES_DATA.filter((game) => {
    // Type filter
    if (filterType === 'playable' && !game.isPlayable) return false;
    if (filterType === 'cloud' && game.isPlayable) return false;

    // Query filter
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      game.title.toLowerCase().includes(q) ||
      game.genre.toLowerCase().includes(q) ||
      game.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Game Catalogue"
    >
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={22} className="text-cyan shrink-0" />
          <input
            ref={inputRef}
            type="search"
            className="search-main-input"
            placeholder="Search games by title, genre (e.g., Arcade, Racing, Sci-Fi)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setQuery('')}
              aria-label="Clear search input"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            className="icon-circle-btn close-btn ml-2"
            onClick={onClose}
            aria-label="Close search modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="search-filter-pills">
          <button
            type="button"
            className={`pill-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Games ({GAMES_DATA.length})
          </button>
          <button
            type="button"
            className={`pill-btn ${filterType === 'playable' ? 'active' : ''}`}
            onClick={() => setFilterType('playable')}
          >
            <Sparkles size={14} className="text-emerald mr-1" />
            Playable Now (3)
          </button>
          <button
            type="button"
            className={`pill-btn ${filterType === 'cloud' ? 'active' : ''}`}
            onClick={() => setFilterType('cloud')}
          >
            <Cloud size={14} className="text-cyan mr-1" />
            Cloud Previews (9)
          </button>
        </div>

        {/* Search Results List */}
        <div className="search-results-list">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div
                key={game.id}
                className="search-result-item"
                onClick={() => {
                  onClose();
                  onSelectGame(game);
                }}
              >
                <div className="result-thumb-box">
                  <GameArtwork id={game.id} className="result-thumb-svg" title={game.title} />
                </div>

                <div className="result-info-col">
                  <div className="result-top-line">
                    <h4 className="result-title">{game.title}</h4>
                    <Badge type={game.badge} size="sm" />
                  </div>
                  <p className="result-summary">{game.summary}</p>
                  <div className="result-meta-row">
                    <span className="result-genre">{game.genre}</span>
                    <span className="result-price">
                      {game.isPlayable ? 'Free to Play' : game.demoPrice}
                    </span>
                  </div>
                </div>

                <div className="result-action-col">
                  {game.isPlayable ? (
                    <button
                      type="button"
                      className="btn-primary-gaming sm-btn"
                      onClick={(e) => {
                        e.stopPropagation();
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                        onSelectGame(game);
                      }}
                    >
                      Details
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="search-empty-state">
              <Gamepad2 size={40} className="text-muted mb-2" />
              <p className="text-muted">No games found matching "{query}"</p>
              <button
                type="button"
                className="btn-secondary-gaming mt-3"
                onClick={() => {
                  setQuery('');
                  setFilterType('all');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
