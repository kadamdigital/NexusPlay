// Space Dodge: Fast-Paced HTML5 Canvas Cosmic Reflex Survival Game
// Features: Arrow/A-D keyboard controls, touch buttons, shields, scaling speed, particle effects

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy, Zap, Shield, ShieldAlert } from 'lucide-react';
import { soundEffects } from '../../utils/audio';
import { updateHighScore, recordGamePlayed } from '../../utils/storage';

export default function SpaceDodgeGame({ onScoreUpdate }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_profile_v1');
      return saved ? JSON.parse(saved)?.highScores?.dodge || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shields, setShields] = useState(1);

  // Mutable Game Loop State
  const stateRef = useRef({
    gameStarted: false,
    isPaused: false,
    isGameOver: false,
    playerX: 200,
    playerWidth: 32,
    playerHeight: 44,
    moveLeft: false,
    moveRight: false,
    speed: 7,
    obstacles: [],
    powerups: [],
    particles: [],
    stars: [],
    shields: 1,
    score: 0,
    distanceTimer: 0,
    lastFrameTime: 0,
    difficultyMultiplier: 1,
  });

  // Initialize Stars
  const initStars = (width, height) => {
    const stars = [];
    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 2 + 0.8,
        color: Math.random() > 0.4 ? '#FFFFFF' : '#38BDF8',
      });
    }
    return stars;
  };

  // Render Canvas Callback
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const state = stateRef.current;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#040714');
    bgGrad.addColorStop(1, '#090D22');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Stars
    state.stars.forEach((star) => {
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Particles
    state.particles.forEach((part) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, part.life);
      ctx.fillStyle = part.color;
      ctx.beginPath();
      ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Obstacles
    state.obstacles.forEach((obs) => {
      ctx.save();
      ctx.translate(obs.x + obs.size / 2, obs.y + obs.size / 2);
      ctx.rotate(obs.rotation);

      ctx.shadowColor = obs.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = obs.color;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;

      const r = obs.size / 2;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(r * 0.7, r * 0.7);
      ctx.lineTo(0, r);
      ctx.lineTo(-r * 0.7, r * 0.6);
      ctx.lineTo(-r, 0);
      ctx.lineTo(-r * 0.6, -r * 0.7);
      ctx.lineTo(0, -r);
      ctx.lineTo(r * 0.6, -r * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    });

    // Powerups (Glowing blue shields)
    state.powerups.forEach((p) => {
      ctx.save();
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 14;
      ctx.strokeStyle = '#22D3EE';
      ctx.lineWidth = 2.5;
      ctx.fillStyle = 'rgba(34, 211, 238, 0.3)';

      ctx.beginPath();
      ctx.arc(p.x + p.size / 2, p.y + p.size / 2, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(p.x + p.size / 2, p.y + p.size / 2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Player Starfighter
    if (state.gameStarted && !state.isGameOver) {
      const px = state.playerX;
      const py = height - state.playerHeight - 16;

      ctx.save();
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 12;
      ctx.fillStyle = Math.random() > 0.5 ? '#22D3EE' : '#38BDF8';
      ctx.beginPath();
      ctx.moveTo(px + 10, py + state.playerHeight);
      ctx.lineTo(px + 16, py + state.playerHeight + 14 + Math.random() * 6);
      ctx.lineTo(px + 22, py + state.playerHeight);
      ctx.closePath();
      ctx.fill();

      // Hull
      ctx.fillStyle = '#F8FAFC';
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px + 16, py);
      ctx.lineTo(px + state.playerWidth, py + state.playerHeight - 6);
      ctx.lineTo(px + 24, py + state.playerHeight - 12);
      ctx.lineTo(px + 8, py + state.playerHeight - 12);
      ctx.lineTo(px, py + state.playerHeight - 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cockpit
      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.ellipse(px + 16, py + 18, 4, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Energy Shield Bubble if active
      if (state.shields > 0) {
        ctx.strokeStyle = '#22D3EE';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.arc(px + 16, py + 20, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    }
  }, []);

  // Start New Game
  const startNewGame = useCallback(() => {
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 400;
    const height = canvas ? canvas.height : 500;

    stateRef.current = {
      gameStarted: true,
      isPaused: false,
      isGameOver: false,
      playerX: width / 2 - 16,
      playerWidth: 32,
      playerHeight: 44,
      moveLeft: false,
      moveRight: false,
      speed: 7,
      obstacles: [],
      powerups: [],
      particles: [],
      stars: initStars(width, height),
      shields: 1,
      score: 0,
      distanceTimer: 0,
      lastFrameTime: performance.now(),
      difficultyMultiplier: 1,
    };

    setScore(0);
    setShields(1);
    setIsGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    soundEffects.uiClick();
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (!stateRef.current.gameStarted) {
        if (e.key === ' ' || e.key === 'Enter') {
          startNewGame();
        }
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        setIsPaused((p) => {
          const next = !p;
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

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.moveLeft = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.moveRight = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.moveLeft = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.moveRight = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [startNewGame]);

  // Main Game Loop
  useEffect(() => {
    let animId;

    const gameLoop = (timestamp) => {
      const state = stateRef.current;
      const canvas = canvasRef.current;

      if (canvas && state.gameStarted && !state.isGameOver && !state.isPaused) {
        if (!state.lastFrameTime) state.lastFrameTime = timestamp;
        const delta = Math.min(50, timestamp - state.lastFrameTime);
        state.lastFrameTime = timestamp;

        if (state.moveLeft) {
          state.playerX = Math.max(10, state.playerX - state.speed);
        }
        if (state.moveRight) {
          state.playerX = Math.min(canvas.width - state.playerWidth - 10, state.playerX + state.speed);
        }

        state.distanceTimer += delta;
        if (state.distanceTimer >= 100) {
          state.distanceTimer = 0;
          state.score += 2;
          setScore(state.score);
          state.difficultyMultiplier = 1 + state.score / 250;
        }

        state.stars.forEach((star) => {
          star.y += star.speed * (1 + state.score / 400);
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        });

        if (Math.random() < 0.038 * Math.min(2.5, state.difficultyMultiplier)) {
          const obsSize = Math.floor(Math.random() * 24 + 18);
          state.obstacles.push({
            x: Math.random() * (canvas.width - obsSize - 20) + 10,
            y: -obsSize,
            size: obsSize,
            speedY: (Math.random() * 2.8 + 2.5) * state.difficultyMultiplier,
            speedX: (Math.random() - 0.5) * 1.5,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.08,
            color: Math.random() > 0.4 ? '#F43F5E' : '#FB923C',
          });
        }

        if (Math.random() < 0.003 && state.powerups.length === 0) {
          state.powerups.push({
            x: Math.random() * (canvas.width - 40) + 20,
            y: -30,
            size: 20,
            speedY: 2.2,
          });
        }

        const playerBox = {
          x: state.playerX + 4,
          y: canvas.height - state.playerHeight - 16,
          width: state.playerWidth - 8,
          height: state.playerHeight - 4,
        };

        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.y += obs.speedY;
          obs.x += obs.speedX;
          obs.rotation += obs.rotationSpeed;

          const obsRadius = obs.size / 2;
          const obsCenterX = obs.x + obsRadius;
          const obsCenterY = obs.y + obsRadius;

          const closestX = Math.max(playerBox.x, Math.min(obsCenterX, playerBox.x + playerBox.width));
          const closestY = Math.max(playerBox.y, Math.min(obsCenterY, playerBox.y + playerBox.height));
          const distanceX = obsCenterX - closestX;
          const distanceY = obsCenterY - closestY;
          const isColliding = distanceX * distanceX + distanceY * distanceY < obsRadius * obsRadius;

          if (isColliding) {
            if (state.shields > 0) {
              state.shields -= 1;
              setShields(state.shields);
              soundEffects.gameOver();
              state.obstacles.splice(i, 1);
              for (let p = 0; p < 16; p++) {
                state.particles.push({
                  x: obsCenterX,
                  y: obsCenterY,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  radius: Math.random() * 3 + 2,
                  color: '#22D3EE',
                  life: 1,
                });
              }
              continue;
            } else {
              state.isGameOver = true;
              setIsGameOver(true);
              soundEffects.gameOver();
              recordGamePlayed('space-dodge', 'Space Dodge', state.score, 'Action');
              updateHighScore('dodge', state.score);
              if (state.score > highScore) setHighScore(state.score);
              if (onScoreUpdate) onScoreUpdate(state.score);
              return;
            }
          }

          if (obs.y > canvas.height + 50) {
            state.obstacles.splice(i, 1);
          }
        }

        for (let i = state.powerups.length - 1; i >= 0; i--) {
          const p = state.powerups[i];
          p.y += p.speedY;

          if (
            p.x < playerBox.x + playerBox.width &&
            p.x + p.size > playerBox.x &&
            p.y < playerBox.y + playerBox.height &&
            p.y + p.size > playerBox.y
          ) {
            soundEffects.shieldPickup();
            state.shields = Math.min(2, state.shields + 1);
            setShields(state.shields);
            state.score += 25;
            setScore(state.score);
            state.powerups.splice(i, 1);
            continue;
          }

          if (p.y > canvas.height + 40) {
            state.powerups.splice(i, 1);
          }
        }

        for (let i = state.particles.length - 1; i >= 0; i--) {
          const part = state.particles[i];
          part.x += part.vx;
          part.y += part.vy;
          part.life -= 0.035;
          if (part.life <= 0) {
            state.particles.splice(i, 1);
          }
        }
      }

      renderCanvas();
      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [highScore, onScoreUpdate, renderCanvas]);

  return (
    <div className="space-dodge-container">
      {/* Game Bar */}
      <div className="game-status-bar">
        <div className="score-badge">
          <Zap size={16} className="text-cyan" />
          <span>SCORE: <strong>{score}</strong></span>
        </div>
        <div className="score-badge">
          <Shield size={16} className={shields > 0 ? 'text-emerald' : 'text-muted'} />
          <span>SHIELD: <strong>{shields}</strong></span>
        </div>
        <div className="score-badge hide-mobile">
          <Trophy size={16} className="text-amber" />
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
              aria-label={isPaused ? 'Resume space dodge' : 'Pause space dodge'}
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
          )}
          <button
            onClick={startNewGame}
            className="game-icon-btn"
            title="Restart Game"
            aria-label="Restart space dodge"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={400}
          height={480}
          className="game-canvas space-canvas"
          tabIndex={0}
          aria-label="Space Dodge interactive game canvas"
        />

        {/* Start Overlay */}
        {!gameStarted && (
          <div className="canvas-overlay">
            <h3 className="overlay-title">SPACE DODGE</h3>
            <p className="overlay-desc">Evade cosmic plasma meteor showers & survive deep space.</p>
            <button onClick={startNewGame} className="btn-primary-gaming glow-effect">
              <Play size={18} /> Launch Starfighter
            </button>
            <div className="controls-hint">
              <span>Desktop: Left/Right Arrow or A/D</span>
              <span>Mobile: Touch Steer Buttons</span>
            </div>
          </div>
        )}

        {/* Paused Overlay */}
        {gameStarted && isPaused && !isGameOver && (
          <div className="canvas-overlay">
            <h3 className="overlay-title">SYSTEMS PAUSED</h3>
            <button
              onClick={() => {
                setIsPaused(false);
                stateRef.current.isPaused = false;
              }}
              className="btn-primary-gaming glow-effect"
            >
              <Play size={18} /> Resume Flight
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
            <h3 className="overlay-title text-rose">STARSHIP DESTROYED</h3>
            <p className="game-over-score">
              Distance Traveled: <strong>{score} pts</strong>
            </p>
            {score >= highScore && score > 0 && (
              <span className="new-high-badge">New Personal High Score!</span>
            )}
            <button onClick={startNewGame} className="btn-primary-gaming glow-effect mt-3">
              <RotateCcw size={18} /> Deploy Another Ship
            </button>
          </div>
        )}
      </div>

      {/* Mobile Touch Steer Controls */}
      <div className="mobile-touch-steer">
        <button
          type="button"
          className="touch-steer-btn steer-left"
          onPointerDown={() => {
            stateRef.current.moveLeft = true;
          }}
          onPointerUp={() => {
            stateRef.current.moveLeft = false;
          }}
          onPointerLeave={() => {
            stateRef.current.moveLeft = false;
          }}
          aria-label="Steer Left"
        >
          ◀ STEER LEFT
        </button>
        <button
          type="button"
          className="touch-steer-btn steer-right"
          onPointerDown={() => {
            stateRef.current.moveRight = true;
          }}
          onPointerUp={() => {
            stateRef.current.moveRight = false;
          }}
          onPointerLeave={() => {
            stateRef.current.moveRight = false;
          }}
          aria-label="Steer Right"
        >
          STEER RIGHT ▶
        </button>
      </div>

      <div className="game-footer-tips">
        <small>Tip: Collect glowing blue orbs to replenish your energy shield. Press [P] to pause.</small>
      </div>
    </div>
  );
}
