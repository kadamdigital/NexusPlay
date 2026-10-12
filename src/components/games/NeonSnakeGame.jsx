// Neon Snake: Hardware-accelerated HTML5 Canvas Cyber Arcade Game
// Fully playable with Arrow keys/WASD, Touch D-Pad, Score, High score, Pause & Restart

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy, Zap, ShieldAlert } from 'lucide-react';
import { soundEffects } from '../../utils/audio';
import { updateHighScore, recordGamePlayed } from '../../utils/storage';

const GRID_SIZE = 20; // 20x20 cells
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const BASE_SPEED_MS = 110;

export default function NeonSnakeGame({ onScoreUpdate }) {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [bonusFood, setBonusFood] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_profile_v1');
      return saved ? JSON.parse(saved)?.highScores?.snake || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Keep ref of mutable game loop state to prevent stale closure glitches in requestAnimationFrame
  const stateRef = useRef({
    snake: INITIAL_SNAKE,
    direction: INITIAL_DIRECTION,
    nextDirection: INITIAL_DIRECTION,
    food: { x: 15, y: 10 },
    bonusFood: null,
    score: 0,
    isGameOver: false,
    isPaused: false,
    gameStarted: false,
    lastTick: 0,
  });

  // Spawn random food
  const spawnFood = useCallback((currentSnake) => {
    let newFood;
    let collision;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      collision = currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y);
    } while (collision);
    return newFood;
  }, []);

  // Canvas Drawing Callback
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cellSize = width / GRID_SIZE;

    // Clear background
    ctx.fillStyle = '#090B14';
    ctx.fillRect(0, 0, width, height);

    // Grid lines (faint cyan/violet)
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(width, i * cellSize);
      ctx.stroke();
    }

    // Outer border glow
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    const state = stateRef.current;

    // Draw regular food (Glowing cyan orb)
    if (state.food) {
      const fx = state.food.x * cellSize + cellSize / 2;
      const fy = state.food.y * cellSize + cellSize / 2;

      ctx.save();
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#22D3EE';
      ctx.beginPath();
      ctx.arc(fx, fy, cellSize * 0.38, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(fx, fy, cellSize * 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw bonus food if present (Electric purple star orb)
    if (state.bonusFood) {
      const bx = state.bonusFood.x * cellSize + cellSize / 2;
      const by = state.bonusFood.y * cellSize + cellSize / 2;

      ctx.save();
      ctx.shadowColor = '#EC4899';
      ctx.shadowBlur = 16;
      ctx.fillStyle = '#EC4899';
      ctx.beginPath();
      ctx.arc(bx, by, cellSize * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FDF4FF';
      ctx.beginPath();
      ctx.arc(bx, by, cellSize * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw Snake
    const s = state.snake;
    s.forEach((segment, idx) => {
      const sx = segment.x * cellSize;
      const sy = segment.y * cellSize;
      const isHead = idx === 0;

      ctx.save();
      if (isHead) {
        ctx.shadowColor = '#22D3EE';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#22D3EE';
        ctx.beginPath();
        ctx.roundRect(sx + 2, sy + 2, cellSize - 4, cellSize - 4, 6);
        ctx.fill();

        ctx.fillStyle = '#090B14';
        const eyeOffset = cellSize * 0.25;
        ctx.beginPath();
        ctx.arc(sx + eyeOffset + 2, sy + eyeOffset + 2, 2.5, 0, Math.PI * 2);
        ctx.arc(sx + cellSize - eyeOffset - 2, sy + eyeOffset + 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const ratio = idx / s.length;
        ctx.fillStyle = ratio < 0.5 ? '#8B5CF6' : '#6366F1';
        ctx.beginPath();
        ctx.roundRect(sx + 2.5, sy + 2.5, cellSize - 5, cellSize - 5, 4);
        ctx.fill();
      }
      ctx.restore();
    });
  }, []);

  // Reset / Start Game
  const startNewGame = useCallback(() => {
    const newSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    const newFood = spawnFood(newSnake);

    stateRef.current = {
      snake: newSnake,
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      food: newFood,
      bonusFood: null,
      score: 0,
      isGameOver: false,
      isPaused: false,
      gameStarted: true,
      lastTick: performance.now(),
    };

    setSnake(newSnake);
    setDirection({ x: 1, y: 0 });
    setFood(newFood);
    setBonusFood(null);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    soundEffects.uiClick();
  }, [spawnFood]);

  // Handle direction changes safely
  const changeDirection = useCallback((newDir) => {
    const current = stateRef.current.direction;
    if (newDir.x === -current.x && newDir.y === -current.y) {
      return;
    }
    stateRef.current.nextDirection = newDir;
    setDirection(newDir);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (!stateRef.current.gameStarted) {
        if (e.key === ' ' || e.key === 'Enter') {
          startNewGame();
        }
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        setIsPaused((prev) => {
          const next = !prev;
          stateRef.current.isPaused = next;
          return next;
        });
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        startNewGame();
        return;
      }

      if (stateRef.current.isGameOver || stateRef.current.isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          changeDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          changeDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          changeDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          changeDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, startNewGame]);

  // Game Loop using requestAnimationFrame
  useEffect(() => {
    let animId;

    const gameLoop = (timestamp) => {
      const state = stateRef.current;

      if (state.gameStarted && !state.isGameOver && !state.isPaused) {
        const currentSpeed = Math.max(65, BASE_SPEED_MS - Math.floor(state.score / 50) * 5);

        if (timestamp - state.lastTick >= currentSpeed) {
          state.lastTick = timestamp;

          state.direction = state.nextDirection;
          const head = state.snake[0];
          const newHead = {
            x: head.x + state.direction.x,
            y: head.y + state.direction.y,
          };

          // Check wall collision
          if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
            state.isGameOver = true;
            setIsGameOver(true);
            soundEffects.gameOver();
            recordGamePlayed('neon-snake', 'Neon Snake', state.score, 'Arcade');
            updateHighScore('snake', state.score);
            if (state.score > highScore) setHighScore(state.score);
            if (onScoreUpdate) onScoreUpdate(state.score);
            return;
          }

          // Check self collision
          if (state.snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
            state.isGameOver = true;
            setIsGameOver(true);
            soundEffects.gameOver();
            recordGamePlayed('neon-snake', 'Neon Snake', state.score, 'Arcade');
            updateHighScore('snake', state.score);
            if (state.score > highScore) setHighScore(state.score);
            if (onScoreUpdate) onScoreUpdate(state.score);
            return;
          }

          // Check food eat
          let ateFood = false;
          let addedScore = 0;
          if (newHead.x === state.food.x && newHead.y === state.food.y) {
            ateFood = true;
            addedScore += 10;
            soundEffects.snakeEat();
            state.food = spawnFood([newHead, ...state.snake]);
            setFood(state.food);

            if (Math.random() < 0.3 && !state.bonusFood) {
              state.bonusFood = spawnFood([newHead, ...state.snake, state.food]);
              setBonusFood(state.bonusFood);
            }
          } else if (state.bonusFood && newHead.x === state.bonusFood.x && newHead.y === state.bonusFood.y) {
            ateFood = true;
            addedScore += 35;
            soundEffects.matchSuccess();
            state.bonusFood = null;
            setBonusFood(null);
          }

          let newSnake;
          if (ateFood) {
            newSnake = [newHead, ...state.snake];
            state.score += addedScore;
            setScore(state.score);
          } else {
            newSnake = [newHead, ...state.snake.slice(0, -1)];
          }

          state.snake = newSnake;
          setSnake(newSnake);
        }
      }

      renderCanvas();
      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [highScore, onScoreUpdate, spawnFood, renderCanvas]);

  return (
    <div className="neon-snake-container">
      {/* Top Game Bar */}
      <div className="game-status-bar">
        <div className="score-badge">
          <Zap size={16} className="text-cyan" />
          <span>SCORE: <strong>{score}</strong></span>
        </div>
        <div className="score-badge">
          <Trophy size={16} className="text-violet" />
          <span>BEST: <strong>{Math.max(highScore, score)}</strong></span>
        </div>
        <div className="game-bar-actions">
          {gameStarted && !isGameOver && (
            <button
              onClick={() => {
                setIsPaused((p) => {
                  stateRef.current.isPaused = !p;
                  return !p;
                });
              }}
              className="game-icon-btn"
              title={isPaused ? 'Resume' : 'Pause'}
              aria-label={isPaused ? 'Resume game' : 'Pause game'}
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
          )}
          <button
            onClick={startNewGame}
            className="game-icon-btn"
            title="Restart Game"
            aria-label="Restart game"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Canvas Game Area with Overlay States */}
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="game-canvas"
          tabIndex={0}
          aria-label="Neon Snake playable game canvas"
        />

        {/* Start Overlay */}
        {!gameStarted && (
          <div className="canvas-overlay">
            <h3 className="overlay-title">NEON SNAKE</h3>
            <p className="overlay-desc">Collect pulsing quantum cubes & survive the cyber grid.</p>
            <button onClick={startNewGame} className="btn-primary-gaming glow-effect">
              <Play size={18} /> Start Game
            </button>
            <div className="controls-hint">
              <span>Desktop: Arrow Keys / WASD</span>
              <span>Mobile: On-Screen D-Pad</span>
            </div>
          </div>
        )}

        {/* Paused Overlay */}
        {gameStarted && isPaused && !isGameOver && (
          <div className="canvas-overlay">
            <h3 className="overlay-title">GAME PAUSED</h3>
            <button
              onClick={() => {
                setIsPaused(false);
                stateRef.current.isPaused = false;
              }}
              className="btn-primary-gaming glow-effect"
            >
              <Play size={18} /> Resume
            </button>
            <button onClick={startNewGame} className="btn-secondary-gaming mt-2">
              <RotateCcw size={16} /> Restart
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="canvas-overlay">
            <div className="game-over-icon">
              <ShieldAlert size={36} className="text-rose" />
            </div>
            <h3 className="overlay-title text-rose">GRID COLLISION</h3>
            <p className="game-over-score">
              Final Score: <strong>{score}</strong>
            </p>
            {score >= highScore && score > 0 && (
              <span className="new-high-badge">New Personal High Score!</span>
            )}
            <button onClick={startNewGame} className="btn-primary-gaming glow-effect mt-3">
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        )}
      </div>

      {/* Mobile-Friendly On-Screen D-Pad Controls */}
      <div className="mobile-dpad">
        <div className="dpad-row">
          <button
            type="button"
            className="dpad-btn up"
            onClick={() => changeDirection({ x: 0, y: -1 })}
            aria-label="Move Up"
          >
            ▲
          </button>
        </div>
        <div className="dpad-row dpad-middle">
          <button
            type="button"
            className="dpad-btn left"
            onClick={() => changeDirection({ x: -1, y: 0 })}
            aria-label="Move Left"
          >
            ◀
          </button>
          <div className="dpad-center" />
          <button
            type="button"
            className="dpad-btn right"
            onClick={() => changeDirection({ x: 1, y: 0 })}
            aria-label="Move Right"
          >
            ▶
          </button>
        </div>
        <div className="dpad-row">
          <button
            type="button"
            className="dpad-btn down"
            onClick={() => changeDirection({ x: 0, y: 1 })}
            aria-label="Move Down"
          >
            ▼
          </button>
        </div>
      </div>

      <div className="game-footer-tips">
        <small>Tip: Special pink orbs grant +35 bonus points. Press [P] to pause, [R] to restart.</small>
      </div>
    </div>
  );
}
