// High-Quality Bespoke Vector Game Artwork for NEXUS PLAY
// Provides crisp, scalable, responsive art direction for all catalog entries

import React from 'react';

export default function GameArtwork({ id, className = '', title = '' }) {
  switch (id) {
    case 'neon-snake':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'Neon Snake artwork'}
        >
          <defs>
            <linearGradient id="ns-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1226" />
              <stop offset="100%" stopColor="#050811" />
            </linearGradient>
            <linearGradient id="snake-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <filter id="glow-snake" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#ns-bg)" />
          {/* Cyber grid */}
          <path
            d="M0,60 H600 M0,120 H600 M0,180 H600 M0,240 H600 M0,300 H600 M60,0 V360 M120,0 V360 M180,0 V360 M240,0 V360 M300,0 V360 M360,0 V360 M420,0 V360 M480,0 V360 M540,0 V360"
            stroke="#1E293B"
            strokeWidth="1"
            opacity="0.45"
          />
          {/* Neon food target */}
          <circle cx="450" cy="150" r="14" fill="#22D3EE" filter="url(#glow-snake)" />
          <circle cx="450" cy="150" r="6" fill="#FFFFFF" />
          <circle cx="450" cy="150" r="24" stroke="#22D3EE" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          {/* Snake segments */}
          <g filter="url(#glow-snake)">
            <rect x="90" y="210" width="28" height="28" rx="6" fill="#8B5CF6" opacity="0.7" />
            <rect x="120" y="210" width="28" height="28" rx="6" fill="#8B5CF6" opacity="0.85" />
            <rect x="150" y="210" width="28" height="28" rx="6" fill="#A78BFA" />
            <rect x="180" y="210" width="28" height="28" rx="6" fill="#38BDF8" />
            <rect x="210" y="210" width="28" height="28" rx="6" fill="#22D3EE" />
            <rect x="240" y="210" width="28" height="28" rx="6" fill="#22D3EE" />
            <rect x="240" y="180" width="28" height="28" rx="6" fill="#22D3EE" />
            <rect x="240" y="150" width="28" height="28" rx="6" fill="#22D3EE" />
            <rect x="270" y="150" width="28" height="28" rx="6" fill="#22D3EE" />
            <rect x="300" y="150" width="28" height="28" rx="6" fill="#34D399" />
            <rect x="330" y="150" width="28" height="28" rx="6" fill="#34D399" />
            <rect x="360" y="150" width="30" height="30" rx="8" fill="#10B981" />
            {/* Snake eyes */}
            <circle cx="382" cy="158" r="3" fill="#FFFFFF" />
            <circle cx="382" cy="172" r="3" fill="#FFFFFF" />
          </g>
          {/* Circuit traces */}
          <path d="M50,40 L180,40 L210,70" stroke="#8B5CF6" strokeWidth="2" opacity="0.5" fill="none" />
          <circle cx="210" cy="70" r="4" fill="#8B5CF6" />
        </svg>
      );

    case 'memory-match':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'Memory Match artwork'}
        >
          <defs>
            <linearGradient id="mm-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#120A2A" />
              <stop offset="100%" stopColor="#070714" />
            </linearGradient>
            <linearGradient id="card-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="100%" stopColor="#312E81" />
            </linearGradient>
            <linearGradient id="card-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#083344" />
              <stop offset="100%" stopColor="#164E63" />
            </linearGradient>
            <filter id="mm-glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#mm-bg)" />
          {/* Cyber neural grid */}
          <circle cx="300" cy="180" r="130" stroke="#312E81" strokeWidth="1" strokeDasharray="8 6" fill="none" opacity="0.4" />
          <circle cx="300" cy="180" r="190" stroke="#1E1B4B" strokeWidth="1" strokeDasharray="12 8" fill="none" opacity="0.3" />
          {/* Card 1 (Tilted Left) */}
          <g transform="translate(170, 70) rotate(-8)">
            <rect width="120" height="170" rx="14" fill="url(#card-grad1)" stroke="#8B5CF6" strokeWidth="2.5" filter="url(#mm-glow)" />
            <polygon points="60,45 85,85 35,85" stroke="#A78BFA" strokeWidth="3" fill="none" />
            <circle cx="60" cy="115" r="16" fill="#8B5CF6" opacity="0.8" />
            <rect x="25" y="145" width="70" height="4" rx="2" fill="#C4B5FD" opacity="0.5" />
          </g>
          {/* Card 2 (Tilted Right) */}
          <g transform="translate(310, 80) rotate(8)">
            <rect width="120" height="170" rx="14" fill="url(#card-grad2)" stroke="#22D3EE" strokeWidth="2.5" filter="url(#mm-glow)" />
            <polygon points="60,45 85,85 35,85" stroke="#67E8F9" strokeWidth="3" fill="none" />
            <circle cx="60" cy="115" r="16" fill="#22D3EE" opacity="0.8" />
            <rect x="25" y="145" width="70" height="4" rx="2" fill="#A5F3FC" opacity="0.5" />
          </g>
          {/* Neural link spark */}
          <line x1="280" y1="160" x2="330" y2="170" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="4 3" filter="url(#mm-glow)" />
        </svg>
      );

    case 'space-dodge':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'Space Dodge artwork'}
        >
          <defs>
            <linearGradient id="sd-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="100%" stopColor="#0B1329" />
            </linearGradient>
            <linearGradient id="flame" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="sd-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#sd-bg)" />
          {/* Stars */}
          <circle cx="90" cy="50" r="2" fill="#FFFFFF" opacity="0.7" />
          <circle cx="210" cy="90" r="1.5" fill="#FFFFFF" opacity="0.5" />
          <circle cx="480" cy="70" r="2" fill="#FFFFFF" opacity="0.8" />
          <circle cx="530" cy="160" r="1" fill="#FFFFFF" opacity="0.4" />
          <circle cx="120" cy="240" r="1.5" fill="#FFFFFF" opacity="0.6" />
          <circle cx="390" cy="280" r="2" fill="#FFFFFF" opacity="0.7" />
          {/* Speed streaks */}
          <line x1="160" y1="40" x2="160" y2="120" stroke="#38BDF8" strokeWidth="1.5" opacity="0.3" strokeDasharray="10 20" />
          <line x1="420" y1="20" x2="420" y2="150" stroke="#38BDF8" strokeWidth="1.5" opacity="0.25" strokeDasharray="10 30" />
          {/* Meteors */}
          <g filter="url(#sd-glow)">
            <polygon points="170,90 205,110 195,145 155,140 145,105" fill="#EF4444" stroke="#FCA5A5" strokeWidth="2" />
            <polygon points="410,120 445,135 440,170 395,160" fill="#F97316" stroke="#FDBA74" strokeWidth="2" />
            <circle cx="270" cy="65" r="14" fill="#EAB308" stroke="#FEF08A" strokeWidth="2" />
          </g>
          {/* Shield power-up */}
          <circle cx="470" cy="230" r="16" fill="none" stroke="#22D3EE" strokeWidth="3" strokeDasharray="6 4" filter="url(#sd-glow)" />
          <polygon points="470,220 480,234 460,234" fill="#22D3EE" />
          {/* Player Ship */}
          <g transform="translate(265, 230)" filter="url(#sd-glow)">
            {/* Thruster exhaust */}
            <polygon points="35,68 30,105 40,105" fill="url(#flame)" />
            {/* Hull */}
            <polygon points="35,0 70,60 52,65 35,48 18,65 0,60" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="2.5" />
            <polygon points="35,16 48,46 22,46" fill="#0EA5E9" />
            {/* Shield ring */}
            <circle cx="35" cy="38" r="46" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="8 6" />
          </g>
        </svg>
      );

    case 'starfall-protocol':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'STARFALL PROTOCOL artwork'}
        >
          <defs>
            <linearGradient id="sf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1035" />
              <stop offset="50%" stopColor="#0B091B" />
              <stop offset="100%" stopColor="#060814" />
            </linearGradient>
            <linearGradient id="planet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
            <filter id="sf-glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#sf-bg)" />
          {/* Distant celestial giant */}
          <circle cx="480" cy="110" r="100" fill="url(#planet-grad)" opacity="0.85" />
          <ellipse cx="480" cy="110" rx="140" ry="24" stroke="#E9D5FF" strokeWidth="4" fill="none" opacity="0.7" transform="rotate(-25 480 110)" />
          {/* Orbital defense station ring */}
          <ellipse cx="260" cy="190" rx="190" ry="70" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeDasharray="14 10" opacity="0.5" />
          {/* Combat Cruisers */}
          <g transform="translate(140, 130)" filter="url(#sf-glow)">
            <polygon points="0,50 140,20 180,50 140,80" fill="#1E1B4B" stroke="#A855F7" strokeWidth="2" />
            <polygon points="30,40 130,28 150,50 130,72 30,60" fill="#312E81" />
            <circle cx="170" cy="50" r="5" fill="#22D3EE" />
            {/* Plasma beam */}
            <line x1="175" y1="50" x2="380" y2="30" stroke="#22D3EE" strokeWidth="3" opacity="0.8" />
          </g>
          {/* Particle stars */}
          <circle cx="80" cy="60" r="2" fill="#E0E7FF" />
          <circle cx="190" cy="80" r="1.5" fill="#E0E7FF" />
          <circle cx="340" cy="260" r="2" fill="#E0E7FF" />
          <circle cx="110" cy="300" r="2.5" fill="#E0E7FF" />
        </svg>
      );

    case 'shadow-circuit':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'SHADOW CIRCUIT artwork'}
        >
          <defs>
            <linearGradient id="sc-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="50%" stopColor="#1C2541" />
              <stop offset="100%" stopColor="#0B0914" />
            </linearGradient>
            <linearGradient id="neon-road" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3A0CA3" />
              <stop offset="100%" stopColor="#02000A" />
            </linearGradient>
            <filter id="sc-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#sc-bg)" />
          {/* Cyber City Skylines */}
          <rect x="40" y="70" width="60" height="180" fill="#0E172E" stroke="#1E293B" strokeWidth="1" />
          <rect x="110" y="40" width="75" height="210" fill="#0A1124" stroke="#22D3EE" strokeWidth="0.8" opacity="0.6" />
          <rect x="195" y="90" width="50" height="160" fill="#0E172E" />
          <rect x="360" y="50" width="70" height="200" fill="#0A1124" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.6" />
          <rect x="440" y="80" width="90" height="170" fill="#0E172E" />
          {/* Neon Grid Road */}
          <polygon points="120,360 480,360 330,220 270,220" fill="url(#neon-road)" stroke="#22D3EE" strokeWidth="2" />
          <line x1="300" y1="220" x2="300" y2="360" stroke="#F43F5E" strokeWidth="3" strokeDasharray="20 16" filter="url(#sc-glow)" />
          {/* Hypercar Silhouette */}
          <g transform="translate(240, 260)" filter="url(#sc-glow)">
            <polygon points="20,40 100,40 110,25 90,12 30,12 10,25" fill="#0F172A" stroke="#22D3EE" strokeWidth="2.5" />
            <polygon points="35,22 85,22 80,14 40,14" fill="#22D3EE" opacity="0.75" />
            {/* Taillights */}
            <rect x="16" y="32" width="16" height="5" rx="2" fill="#F43F5E" />
            <rect x="88" y="32" width="16" height="5" rx="2" fill="#F43F5E" />
            {/* Ground underglow */}
            <ellipse cx="60" cy="46" rx="55" ry="6" fill="#22D3EE" opacity="0.8" filter="url(#sc-glow)" />
          </g>
        </svg>
      );

    case 'echoes-of-aether':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'ECHOES OF AETHER artwork'}
        >
          <defs>
            <linearGradient id="ea-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#042F2E" />
              <stop offset="50%" stopColor="#064E3B" />
              <stop offset="100%" stopColor="#061727" />
            </linearGradient>
            <linearGradient id="aurora" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="ea-glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#ea-bg)" />
          {/* Ethereal Aurora Curtains */}
          <path d="M0,100 Q150,40 300,90 T600,50 L600,160 Q450,110 300,160 T0,120 Z" fill="url(#aurora)" opacity="0.35" filter="url(#ea-glow)" />
          {/* Floating Island 1 */}
          <polygon points="120,200 240,190 280,225 210,290 140,260" fill="#064E3B" stroke="#34D399" strokeWidth="1.5" />
          <polygon points="180,150 200,190 160,190" fill="#6EE7B7" stroke="#A7F3D0" strokeWidth="2" filter="url(#ea-glow)" />
          {/* Floating Island 2 (Main) */}
          <polygon points="290,170 470,160 520,210 430,300 320,260" fill="#042F2E" stroke="#2DD4BF" strokeWidth="2" />
          {/* Ancient Monolith */}
          <polygon points="380,100 405,100 415,170 370,170" fill="#134E4A" stroke="#5EEAD4" strokeWidth="2" />
          <circle cx="392" cy="125" r="5" fill="#22D3EE" filter="url(#ea-glow)" />
          {/* Small floating shards */}
          <polygon points="70,130 90,120 85,145" fill="#34D399" opacity="0.8" />
          <polygon points="490,120 510,110 505,135" fill="#22D3EE" opacity="0.8" />
        </svg>
      );

    case 'skybound-legends':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'SKYBOUND LEGENDS artwork'}
        >
          <defs>
            <linearGradient id="sl-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0C4A6E" />
              <stop offset="60%" stopColor="#075985" />
              <stop offset="100%" stopColor="#082F49" />
            </linearGradient>
            <filter id="sl-glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#sl-bg)" />
          {/* Cloud spires */}
          <ellipse cx="140" cy="280" rx="160" ry="70" fill="#0369A1" opacity="0.6" />
          <ellipse cx="440" cy="270" rx="200" ry="85" fill="#0284C7" opacity="0.5" />
          <ellipse cx="300" cy="320" rx="280" ry="80" fill="#075985" opacity="0.8" />
          {/* Sun disc */}
          <circle cx="300" cy="90" r="45" fill="#FBBF24" opacity="0.85" filter="url(#sl-glow)" />
          {/* Airship vessel */}
          <g transform="translate(190, 130)" filter="url(#sl-glow)">
            {/* Gas envelope / dirigible */}
            <ellipse cx="110" cy="35" rx="100" ry="28" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
            <line x1="20" y1="35" x2="200" y2="35" stroke="#F59E0B" strokeWidth="2" />
            {/* Gondola hull */}
            <rect x="70" y="66" width="80" height="24" rx="6" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Wings / Propellers */}
            <polygon points="50,62 10,75 55,75" fill="#38BDF8" />
            <polygon points="170,62 210,75 165,75" fill="#38BDF8" />
          </g>
        </svg>
      );

    case 'void-racers':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'VOID RACERS artwork'}
        >
          <defs>
            <linearGradient id="vr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="100%" stopColor="#090B14" />
            </linearGradient>
            <filter id="vr-glow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#vr-bg)" />
          {/* Cylindrical Torus Rings */}
          <ellipse cx="300" cy="180" rx="220" ry="90" stroke="#8B5CF6" strokeWidth="3" fill="none" opacity="0.4" strokeDasharray="14 10" />
          <ellipse cx="300" cy="180" rx="160" ry="65" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.6" />
          <ellipse cx="300" cy="180" rx="90" ry="35" stroke="#C084FC" strokeWidth="2" fill="none" opacity="0.8" />
          {/* Speed line streaks */}
          <line x1="80" y1="260" x2="220" y2="200" stroke="#38BDF8" strokeWidth="2" opacity="0.5" />
          <line x1="520" y1="100" x2="380" y2="160" stroke="#C084FC" strokeWidth="2" opacity="0.5" />
          {/* Anti-Grav Racer Craft */}
          <g transform="translate(230, 140)" filter="url(#vr-glow)">
            <polygon points="70,0 130,40 120,60 70,45 20,60 10,40" fill="#0F172A" stroke="#22D3EE" strokeWidth="3" />
            <polygon points="70,12 105,38 35,38" fill="#A855F7" />
            <circle cx="70" cy="28" r="6" fill="#FFFFFF" />
            {/* Plasma trails */}
            <line x1="30" y1="60" x2="10" y2="95" stroke="#22D3EE" strokeWidth="3.5" />
            <line x1="110" y1="60" x2="130" y2="95" stroke="#22D3EE" strokeWidth="3.5" />
          </g>
        </svg>
      );

    case 'neon-strike':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'NEON STRIKE artwork'}
        >
          <defs>
            <linearGradient id="nst-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E0A22" />
              <stop offset="100%" stopColor="#090514" />
            </linearGradient>
            <filter id="nst-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#nst-bg)" />
          {/* Vector grid */}
          <line x1="0" y1="300" x2="600" y2="300" stroke="#F43F5E" strokeWidth="1.5" opacity="0.5" />
          <line x1="100" y1="360" x2="260" y2="280" stroke="#F43F5E" strokeWidth="1" opacity="0.4" />
          <line x1="500" y1="360" x2="340" y2="280" stroke="#F43F5E" strokeWidth="1" opacity="0.4" />
          {/* Geometric Invaders */}
          <g filter="url(#nst-glow)">
            <polygon points="180,90 210,120 150,120" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
            <polygon points="300,70 330,105 270,105" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
            <polygon points="420,90 450,120 390,120" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
            {/* Lasers */}
            <line x1="300" y1="180" x2="300" y2="115" stroke="#22D3EE" strokeWidth="3" />
            <line x1="285" y1="190" x2="210" y2="128" stroke="#22D3EE" strokeWidth="2.5" />
            <line x1="315" y1="190" x2="390" y2="128" stroke="#22D3EE" strokeWidth="2.5" />
            {/* Player Ship */}
            <polygon points="300,190 335,250 300,235 265,250" stroke="#8B5CF6" strokeWidth="3" fill="#130B24" />
          </g>
        </svg>
      );

    case 'chrono-blade':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'CHRONO BLADE artwork'}
        >
          <defs>
            <linearGradient id="cb-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E0D1B" />
              <stop offset="100%" stopColor="#0B0914" />
            </linearGradient>
            <filter id="cb-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#cb-bg)" />
          {/* Cyber rain */}
          <line x1="120" y1="20" x2="110" y2="90" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
          <line x1="240" y1="40" x2="230" y2="130" stroke="#EF4444" strokeWidth="1" opacity="0.4" />
          <line x1="480" y1="30" x2="470" y2="120" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
          {/* Neon crescent katana slash */}
          <path d="M120,260 Q300,100 480,240" stroke="#EF4444" strokeWidth="6" fill="none" filter="url(#cb-glow)" />
          <path d="M130,260 Q300,110 470,240" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          {/* Cyber blade core */}
          <polygon points="280,180 320,180 300,140" fill="#EF4444" filter="url(#cb-glow)" />
        </svg>
      );

    case 'quantum-run':
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'QUANTUM RUN artwork'}
        >
          <defs>
            <linearGradient id="qr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#04232C" />
              <stop offset="100%" stopColor="#07101E" />
            </linearGradient>
            <filter id="qr-glow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#qr-bg)" />
          {/* Dimensional Portal Oval */}
          <ellipse cx="300" cy="180" rx="90" ry="140" fill="none" stroke="#06B6D4" strokeWidth="5" filter="url(#qr-glow)" />
          <ellipse cx="300" cy="180" rx="70" ry="110" fill="none" stroke="#10B981" strokeWidth="3" opacity="0.7" />
          <ellipse cx="300" cy="180" rx="40" ry="60" fill="#0E7490" opacity="0.4" />
          {/* Isometric grid platforms */}
          <polygon points="160,250 250,210 250,225 160,265" fill="#0E7490" />
          <polygon points="250,210 340,250 340,265 250,225" fill="#155E75" />
          <polygon points="160,250 250,210 340,250 250,290" fill="#0891B2" stroke="#22D3EE" strokeWidth="1.5" />
        </svg>
      );

    case 'titan-sector':
    default:
      return (
        <svg
          viewBox="0 0 600 360"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={title || 'TITAN SECTOR artwork'}
        >
          <defs>
            <linearGradient id="ts-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <filter id="ts-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="600" height="360" fill="url(#ts-bg)" />
          {/* Hex tactical grid */}
          <polygon points="220,130 250,110 280,130 280,160 250,180 220,160" stroke="#6366F1" strokeWidth="1.5" fill="none" opacity="0.6" />
          <polygon points="280,130 310,110 340,130 340,160 310,180 280,160" stroke="#6366F1" strokeWidth="1.5" fill="#1E1B4B" opacity="0.6" />
          <polygon points="340,130 370,110 400,130 400,160 370,180 340,160" stroke="#6366F1" strokeWidth="1.5" fill="none" opacity="0.6" />
          {/* Dreadnought Flagship */}
          <g transform="translate(180, 190)" filter="url(#ts-glow)">
            <polygon points="0,40 160,10 240,40 160,70" fill="#1E293B" stroke="#818CF8" strokeWidth="2.5" />
            <polygon points="40,30 140,20 180,40 140,60 40,50" fill="#312E81" />
            <circle cx="210" cy="40" r="4" fill="#22D3EE" />
          </g>
          {/* Planetary curvature */}
          <path d="M0,320 Q300,260 600,320" stroke="#22D3EE" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
      );
  }
}
