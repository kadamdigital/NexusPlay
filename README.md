# NEXUS PLAY — Cloud Gaming & Online Gaming Platform

> **"Your Next World Starts Here."**  
> Fictional gaming platform concept developed by **Kadam Digital**.

---

## 🎮 Platform Overview

**NEXUS PLAY** is a responsive, futuristic gaming platform that merges instant client-side browser gaming with next-generation cloud gaming discovery.

### Key Features
1. **Play Online (Instant Browser Games)**
   - **Neon Snake**: HTML5 Canvas cyberpunk arcade game with arrow/WASD keyboard controls, on-screen mobile D-Pad, scaling speeds, quantum bonus orbs, and local high score tracking.
   - **Memory Match**: 16-card 3D flip neural puzzle with move counter, live timer, Web Audio feedback, and best move records.
   - **Space Dodge**: HTML5 Canvas cosmic reflex survival game with steering controls, touch buttons, scaling asteroid hazards, and energy shield power-ups.
2. **Cloud Gaming Hub ("Big Games. No Big Downloads.")**
   - Concept catalogue featuring titles like *STARFALL PROTOCOL*, *SHADOW CIRCUIT*, *ECHOES OF AETHER*, *VOID RACERS*, and *SKYBOUND LEGENDS*.
   - Filter by genre and access type (Free Access vs Premium Access).
   - System specifications, target resolutions (1080p 60FPS / 4K 60FPS), connection requirements, and latency metrics.
   - Interactive simulated cloud streaming HUD with live telemetry (ping, bitrate, latency tester).
   - Non-commercial demo purchase modal simulating access entitlement with illustrative ₹ pricing (no real money charged).
3. **Full Game Library & Discovery**
   - Instant search across all titles.
   - Genre filter chips (Action, Adventure, Racing, Arcade, Puzzle, Strategy, Casual).
   - Access-type filters (Browser Games, Cloud Previews, Free, Premium).
   - Sorting (Featured, Title A-Z, Title Z-A, Newest).
4. **Membership & Subscription Concepts**
   - **FREE EXPLORER — ₹0**
   - **NEXUS PLUS — ₹299/month (illustrative demo)**
   - **NEXUS ULTIMATE — ₹599/month (illustrative demo)**
   - Informative membership modal and local tier simulator.
5. **Player Profile & Favourites**
   - Editable local player display name.
   - Bookmarked favourites with counter badge and dedicated drawer.
   - Recently played games list with score tracking and direct resume actions.
   - Reset local demo data option.
6. **Web Audio Synthesizer**
   - 100% client-side synthetic audio using the Web Audio API (zero external audio file dependencies).
   - Master mute toggle in the navigation bar and game controls.

---

## 💻 Tech Stack
- **React 19** (Functional components, hooks)
- **Vite 8**
- **HTML5 Canvas 2D**
- **Web Audio API**
- **Lucide React** (Crisp vector icons)
- **CSS3** with design system custom properties
- **Local Storage** for demo persistence

---

## 🚀 Running the Project Locally

To run NEXUS PLAY locally:

```bash
# Navigate to the project directory
cd "c:\Anti-Graviry Projects\nexus-play"

# Install dependencies (if not already installed)
npm install

# Start the Vite development server
npm run dev

# Or build for production
npm run build
npm run preview
```

The application is served at `http://localhost:5173/` (or `http://localhost:5174/` if port 5173 is occupied).

---

## ⚖️ Architectural Transparency & Disclosures
- **Browser Games**: Genuinely playable client-side inside the browser using HTML5 Canvas and React state.
- **Cloud Streaming**: Remote server game streaming and payment gateways require specialized distributed GPU edge infrastructure, JWT user authentication, and commercial game licenses. In this portfolio frontend, cloud streaming and payments are simulated models.
