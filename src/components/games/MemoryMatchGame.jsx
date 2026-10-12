// Memory Match: Cyberpunk Neural Link Pattern Matching Game
// Grid of 16 cards (8 pairs), 3D flip animation, move counter, live timer, win screen, sound FX

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Trophy, Clock, Target, CheckCircle2, Sparkles } from 'lucide-react';
import { soundEffects } from '../../utils/audio';
import { updateHighScore, recordGamePlayed } from '../../utils/storage';

// 8 Unique Cyber Icons with SVG paths
const CARD_SYMBOLS = [
  { id: 'shield', name: 'Quantum Shield', color: '#22D3EE', symbol: '🛡️' },
  { id: 'sword', name: 'Plasma Blade', color: '#EC4899', symbol: '⚔️' },
  { id: 'chip', name: 'Neural Chip', color: '#8B5CF6', symbol: '💾' },
  { id: 'portal', name: 'Wormhole', color: '#10B981', symbol: '🌀' },
  { id: 'crystal', name: 'Aether Gem', color: '#F59E0B', symbol: '💎' },
  { id: 'radar', name: 'Scanner Grid', color: '#38BDF8', symbol: '📡' },
  { id: 'skull', name: 'Cyber Skull', color: '#F43F5E', symbol: '👾' },
  { id: 'battery', name: 'Energy Core', color: '#A855F7', symbol: '⚡' },
];

function generateShuffledDeck() {
  const deck = [];
  CARD_SYMBOLS.forEach((sym) => {
    // Two copies of each symbol for a matching pair
    deck.push({ ...sym, uid: `${sym.id}-1` });
    deck.push({ ...sym, uid: `${sym.id}-2` });
  });

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export default function MemoryMatchGame({ onScoreUpdate, isAudioMuted }) {
  const [deck, setDeck] = useState(generateShuffledDeck);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [bestMoves, setBestMoves] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_profile_v1');
      return saved ? JSON.parse(saved)?.highScores?.memoryBestMoves || null : null;
    } catch (e) {
      return null;
    }
  });

  const timerRef = useRef(null);

  // Initialize or Restart Game
  const resetGame = useCallback(() => {
    setDeck(generateShuffledDeck());
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setSeconds(0);
    setTimerRunning(false);
    setIsVictory(false);
    if (timerRef.current) clearInterval(timerRef.current);
    soundEffects.uiClick();
  }, []);

  // Timer Tick
  useEffect(() => {
    if (timerRunning && !isVictory) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, isVictory]);

  // Card Click Handler
  const handleCardClick = (index) => {
    if (isVictory) return;
    // Disallow clicking already flipped or already matched cards
    if (flippedIndices.includes(index) || matchedIds.includes(deck[index].id)) {
      return;
    }
    // Disallow clicking if two cards are currently being compared
    if (flippedIndices.length >= 2) return;

    // Start timer on first move
    if (!timerRunning) {
      setTimerRunning(true);
    }

    soundEffects.cardFlip();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If two cards are now flipped, compare them
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = deck[firstIdx];
      const secondCard = deck[secondIdx];

      if (firstCard.id === secondCard.id) {
        // MATCH!
        setTimeout(() => {
          soundEffects.matchSuccess();
          const newMatched = [...matchedIds, firstCard.id];
          setMatchedIds(newMatched);
          setFlippedIndices([]);

          // Check Win Condition (all 8 pairs matched)
          if (newMatched.length === CARD_SYMBOLS.length) {
            setIsVictory(true);
            setTimerRunning(false);
            soundEffects.victory();
            recordGamePlayed('memory-match', 'Memory Match', moves + 1, 'Puzzle');
            updateHighScore('memory', 100, { moves: moves + 1, time: seconds });
            if (!bestMoves || moves + 1 < bestMoves) {
              setBestMoves(moves + 1);
            }
            if (onScoreUpdate) onScoreUpdate(moves + 1);
          }
        }, 500);
      } else {
        // NO MATCH -> flip back after brief pause
        setTimeout(() => {
          setFlippedIndices([]);
        }, 950);
      }
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  return (
    <div className="memory-match-container">
      {/* Status Bar */}
      <div className="game-status-bar">
        <div className="score-badge">
          <Target size={16} className="text-cyan" />
          <span>MOVES: <strong>{moves}</strong></span>
        </div>
        <div className="score-badge">
          <Clock size={16} className="text-violet" />
          <span>TIME: <strong>{formatTime(seconds)}</strong></span>
        </div>
        {bestMoves && (
          <div className="score-badge hide-mobile">
            <Trophy size={16} className="text-amber" />
            <span>BEST: <strong>{bestMoves} moves</strong></span>
          </div>
        )}
        <div className="game-bar-actions">
          <button
            onClick={resetGame}
            className="game-icon-btn"
            title="Reset Game"
            aria-label="Reset memory match game"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* 4x4 Card Grid */}
      <div className="memory-grid" role="grid" aria-label="Memory match game grid">
        {deck.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedIds.includes(card.id);
          const isOpen = isFlipped || isMatched;

          return (
            <button
              key={card.uid}
              className={`memory-card ${isOpen ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
              onClick={() => handleCardClick(idx)}
              aria-label={`Card ${idx + 1}: ${isOpen ? card.name : 'Hidden'}`}
              disabled={isOpen}
            >
              <div className="memory-card-inner">
                {/* Back of Card (Shown when hidden) */}
                <div className="card-face card-back">
                  <div className="cyber-glyph-pattern">
                    <span className="glyph-symbol">❖</span>
                  </div>
                </div>

                {/* Front of Card (Shown when revealed) */}
                <div
                  className="card-face card-front"
                  style={{
                    borderColor: isMatched ? '#10B981' : card.color,
                    boxShadow: isOpen ? `0 0 15px ${card.color}33` : 'none',
                  }}
                >
                  <span className="card-emoji" role="img" aria-hidden="true">
                    {card.symbol}
                  </span>
                  <span className="card-label">{card.name}</span>
                  {isMatched && (
                    <span className="matched-indicator">
                      <CheckCircle2 size={12} className="text-emerald" />
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Win Celebration Modal */}
      {isVictory && (
        <div className="canvas-overlay victory-overlay">
          <div className="victory-icon">
            <Sparkles size={40} className="text-cyan" />
          </div>
          <h3 className="overlay-title text-cyan">NEURAL SYNC COMPLETE!</h3>
          <p className="overlay-desc">You successfully decoded all 8 memory pairs.</p>
          <div className="victory-stats-row">
            <div className="v-stat">
              <span>Total Moves</span>
              <strong>{moves}</strong>
            </div>
            <div className="v-stat">
              <span>Time Taken</span>
              <strong>{formatTime(seconds)}</strong>
            </div>
            {bestMoves && moves <= bestMoves && (
              <div className="v-stat text-cyan">
                <span>Record</span>
                <strong>Best Ever!</strong>
              </div>
            )}
          </div>
          <button onClick={resetGame} className="btn-primary-gaming glow-effect mt-4">
            <RotateCcw size={18} /> Play Again
          </button>
        </div>
      )}

      <div className="game-footer-tips">
        <small>Tip: Memorize card locations carefully to minimize move count. Match all 8 pairs to win!</small>
      </div>
    </div>
  );
}
