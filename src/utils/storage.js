// Local Storage utilities for NEXUS PLAY demo preferences
// Stores local favorites, play history, scores, and demo profile

const STORAGE_KEYS = {
  FAVORITES: 'nexus_favorites_v1',
  RECENT: 'nexus_recent_games_v1',
  PROFILE: 'nexus_profile_v1',
};

const DEFAULT_PROFILE = {
  displayName: 'CyberPilot_01',
  membershipTier: 'free', // 'free' | 'plus' | 'ultimate'
  avatarSeed: 'nexus-hero',
  totalGamesPlayed: 0,
  joinedDate: 'October 2026',
  highScores: {
    snake: 0,
    memoryBestMoves: null,
    memoryBestTime: null,
    dodge: 0,
  },
};

// Safe JSON parser
function safeGet(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading key ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing key ${key} to localStorage:`, e);
  }
}

// Favorites
export function getStoredFavorites() {
  return safeGet(STORAGE_KEYS.FAVORITES, ['neon-snake', 'starfall-protocol']);
}

export function toggleStoredFavorite(gameId) {
  const current = getStoredFavorites();
  const exists = current.includes(gameId);
  const updated = exists ? current.filter((id) => id !== gameId) : [...current, gameId];
  safeSet(STORAGE_KEYS.FAVORITES, updated);
  return { updated, isFavorite: !exists };
}

export function isStoredFavorite(gameId) {
  return getStoredFavorites().includes(gameId);
}

// Recently Played Games
export function getStoredRecentGames() {
  return safeGet(STORAGE_KEYS.RECENT, [
    {
      id: 'neon-snake',
      title: 'Neon Snake',
      playedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      score: 140,
      genre: 'Arcade',
    },
    {
      id: 'space-dodge',
      title: 'Space Dodge',
      playedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      score: 320,
      genre: 'Action',
    },
  ]);
}

export function recordGamePlayed(gameId, title, score = 0, genre = 'Browser') {
  const current = getStoredRecentGames();
  const filtered = current.filter((item) => item.id !== gameId);
  const entry = {
    id: gameId,
    title,
    playedAt: new Date().toISOString(),
    score,
    genre,
  };
  const updated = [entry, ...filtered].slice(0, 10); // keep last 10
  safeSet(STORAGE_KEYS.RECENT, updated);

  // Increment total games in profile
  const profile = getStoredProfile();
  profile.totalGamesPlayed = (profile.totalGamesPlayed || 0) + 1;
  safeSet(STORAGE_KEYS.PROFILE, profile);

  return updated;
}

// Profile & High Scores
export function getStoredProfile() {
  const profile = safeGet(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
  return {
    ...DEFAULT_PROFILE,
    ...profile,
    highScores: {
      ...DEFAULT_PROFILE.highScores,
      ...(profile.highScores || {}),
    },
  };
}

export function updateStoredProfile(updates) {
  const current = getStoredProfile();
  const updated = { ...current, ...updates };
  safeSet(STORAGE_KEYS.PROFILE, updated);
  return updated;
}

export function updateHighScore(gameKey, score, additionalData = {}) {
  const profile = getStoredProfile();
  const highScores = { ...profile.highScores };

  if (gameKey === 'snake') {
    if (score > (highScores.snake || 0)) {
      highScores.snake = score;
    }
  } else if (gameKey === 'dodge') {
    if (score > (highScores.dodge || 0)) {
      highScores.dodge = score;
    }
  } else if (gameKey === 'memory') {
    const { moves, time } = additionalData;
    if (moves) {
      if (!highScores.memoryBestMoves || moves < highScores.memoryBestMoves) {
        highScores.memoryBestMoves = moves;
      }
    }
    if (time) {
      if (!highScores.memoryBestTime || time < highScores.memoryBestTime) {
        highScores.memoryBestTime = time;
      }
    }
  }

  profile.highScores = highScores;
  safeSet(STORAGE_KEYS.PROFILE, profile);
  return profile;
}

// Clear all demo data
export function clearAllLocalDemoData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.RECENT);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    return true;
  } catch (e) {
    console.warn('Error clearing localStorage', e);
    return false;
  }
}
