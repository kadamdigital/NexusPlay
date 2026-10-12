// Featured Games Carousel / Spotlight Section for NEXUS PLAY
// Horizontal carousel with navigation arrows, responsive layout, and GameCard integration

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Flame, Sparkles } from 'lucide-react';
import GameCard from '../common/GameCard';

export default function FeaturedGames({
  games,
  onPlay,
  onViewDetails,
  onDemoAccess,
  favorites = [],
  onToggleFavorite,
}) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const featuredList = games.filter((g) => g.featured);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 320;
    const offset = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  return (
    <section className="nexus-featured-section" id="featured">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <Flame size={16} className="text-violet" />
            <span>CURATED SHOWCASE</span>
          </div>
          <h2 className="section-title">Featured Highlights</h2>
          <p className="section-subtitle">
            Explore premier concept titles and instant-play web experiences curated for NEXUS PLAY.
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="carousel-nav-controls">
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            title="Scroll Previous"
            aria-label="Previous featured games"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            title="Scroll Next"
            aria-label="Next featured games"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="featured-carousel-track"
        onScroll={checkScroll}
        tabIndex={0}
        aria-label="Featured games carousel"
      >
        {featuredList.map((game) => (
          <div key={game.id} className="carousel-item-wrapper">
            <GameCard
              game={game}
              onPlay={onPlay}
              onViewDetails={onViewDetails}
              onDemoAccess={onDemoAccess}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
