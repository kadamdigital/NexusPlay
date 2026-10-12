// Full Game Library Section for NEXUS PLAY
// Includes Search, Genre filter, Access-type filter, Sorting, Badges, and Empty states

import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, X, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';
import { GAME_GENRES, ACCESS_TYPES } from '../../data/gamesData';
import GameCard from '../common/GameCard';

export default function GameLibrary({
  games,
  onPlay,
  onViewDetails,
  onDemoAccess,
  favorites = [],
  onToggleFavorite,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedAccess, setSelectedAccess] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'az' | 'za' | 'newest'

  // Filter and Sort logic
  const filteredAndSortedGames = useMemo(() => {
    let result = [...games];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.genre.toLowerCase().includes(q) ||
          g.summary.toLowerCase().includes(q)
      );
    }

    // Genre filter
    if (selectedGenre !== 'All') {
      result = result.filter((g) => g.genre.toLowerCase() === selectedGenre.toLowerCase());
    }

    // Access type filter
    if (selectedAccess !== 'All') {
      if (selectedAccess === 'Browser Games') {
        result = result.filter((g) => g.category === 'browser');
      } else if (selectedAccess === 'Cloud Previews') {
        result = result.filter((g) => g.category === 'cloud');
      } else if (selectedAccess === 'Free Access') {
        result = result.filter((g) => g.accessType === 'free');
      } else if (selectedAccess === 'Premium Access') {
        result = result.filter((g) => g.accessType === 'premium');
      }
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      }
      if (sortBy === 'az') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'za') {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      }
      return 0;
    });

    return result;
  }, [games, searchQuery, selectedGenre, selectedAccess, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedAccess('All');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedGenre !== 'All' || selectedAccess !== 'All' || sortBy !== 'featured';

  return (
    <section className="nexus-library-section" id="library">
      {/* Section Header */}
      <div className="section-header-row mb-6">
        <div>
          <div className="section-eyebrow">
            <Layers size={16} className="text-cyan" />
            <span>GAME DISCOVERY & CATALOGUE</span>
          </div>
          <h2 className="section-title">All Games Library</h2>
          <p className="section-subtitle">
            Explore our diverse collection of instant browser titles and fictional cloud gaming previews.
          </p>
        </div>

        <div className="library-results-counter">
          <span>Showing <strong>{filteredAndSortedGames.length}</strong> of {games.length} titles</span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="library-control-panel">
        {/* Search Field */}
        <div className="library-search-box">
          <Search size={18} className="search-box-icon" />
          <input
            type="search"
            className="library-search-input"
            placeholder="Search by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Access Type Filter */}
        <div className="library-select-group">
          <label htmlFor="access-filter" className="select-label">
            Access Type:
          </label>
          <select
            id="access-filter"
            className="library-select"
            value={selectedAccess}
            onChange={(e) => setSelectedAccess(e.target.value)}
          >
            {ACCESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="library-select-group">
          <label htmlFor="sort-by" className="select-label">
            Sort By:
          </label>
          <select
            id="sort-by"
            className="library-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured First</option>
            <option value="az">Title (A - Z)</option>
            <option value="za">Title (Z - A)</option>
            <option value="newest">Catalog Order</option>
          </select>
        </div>
      </div>

      {/* Genre Pills Strip */}
      <div className="genre-pills-bar">
        <span className="genre-bar-label">Genres:</span>
        <div className="genre-pills-scroll">
          {GAME_GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              className={`genre-pill-btn ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={resetAllFilters}
          >
            <X size={14} /> Clear Filters
          </button>
        )}
      </div>

      {/* Games Grid */}
      <div className="library-games-grid">
        {filteredAndSortedGames.length > 0 ? (
          filteredAndSortedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onPlay={onPlay}
              onViewDetails={onViewDetails}
              onDemoAccess={onDemoAccess}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <div className="library-empty-card">
            <Layers size={44} className="text-muted mb-3" />
            <h3>No games match your selected criteria</h3>
            <p className="text-muted mt-1">
              Try adjusting your search query, genre selection, or access type filter.
            </p>
            <button
              type="button"
              className="btn-primary-gaming mt-4"
              onClick={resetAllFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
