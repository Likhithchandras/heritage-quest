# 🏛️ India Heritage Treasure Hunt - Junior Archaeological Quest

An interactive, child-friendly, web-based treasure hunt application designed to take young explorers across **20 iconic Indian heritage sites** featuring **129 checkpoints**. Built with strict Human-Computer Interaction (HCI) standards, accessibility features, progressive hint scoring, GPS geofencing & virtual explorer simulation, voice narration, printable explorer certificates, **Explorer Authentication (Name, Email & Password)**, and an **All-India Leaderboard**.

---

## 🌟 Highlights & Features

1. **Explorer Authentication & Profile (Name, Email & Password)**:
   - **Sign In & Sign Up**: Register with Explorer Name, Email Address, and Password (with visibility toggle).
   - **Guest Explorer Mode**: Instant one-click guest play option for classroom presentations.
   - **Personalized Experience**: Player's custom name automatically appears on official certificates, passport credentials, and the navbar.

2. **Pan-India Explorer Leaderboard (`/leaderboard`)**:
   - **Top 3 Podium**: Gold 🥇, Silver 🥈, and Bronze 🥉 pedestals celebrating top scorers.
   - **State Filtering**: Filter champion rankings by state (Karnataka, Rajasthan, Maharashtra, Tamil Nadu, Odisha, etc.).
   - **Live Player Rank Indicator**: Dynamically calculates and highlights the player's live ranking, total XP, and collected badges as they decode riddles.

3. **20 Real Heritage Sites Across India (129 Checkpoints)**:
   - **Karnataka (10 sites)**: Hampi, Mysore Palace, Chitradurga Fort, Badami Cave Temples, Aihole, Pattadakal, Belur Chennakeshava Temple, Halebidu Hoysaleshwara Temple, Srirangapatna Fort, Gol Gumbaz (Bijapur).
   - **Rajasthan (3 sites)**: Amber Fort & Palace (Jaipur), Mehrangarh Fort (Jodhpur), Jaisalmer Golden Fort.
   - **Maharashtra (2 sites)**: Ellora Caves & Kailasa Temple, Ajanta Caves.
   - **Tamil Nadu (1 site)**: Brihadisvara Temple (Thanjavur).
   - **Odisha (1 site)**: Konark Sun Temple.
   - **Uttar Pradesh (1 site)**: Taj Mahal & Agra Fort.
   - **Gujarat (1 site)**: Rani ki Vav (Queen's Stepwell).
   - **Telangana (1 site)**: Golconda Fort (Hyderabad).

4. **The 5-Stage Checkpoint Flow**:
   - **Stage 1: REACH** - GPS Radar geofence tracking + "Simulate Arrival (Virtual Explorer Mode)".
   - **Stage 2: OBSERVE** - "Look carefully at..." observation mission (+10 XP).
   - **Stage 3: RIDDLE** - Kid-friendly rhyming riddle with 2 progressive hints (50 pts $\rightarrow$ 40 pts $\rightarrow$ 30 pts).
   - **Stage 4: LEARN & QUIZ** - Bite-sized fun fact + 3-choice multiple-choice question (+20 pts).
   - **Stage 5: REWARD** - Checkpoint unlock fanfare, XP awards, and progression to the next clue.

5. **HCI & Accessibility Features**:
   - **Voice Narrator (Web Speech API)**: Read riddles, storylines, and trivia aloud.
   - **Sound Effects (Web Audio API)**: Chimes, hint tones, arrival sounds, and celebration fanfares.
   - **High Contrast & Font Scaling**: Quick accessibility bar with toggleable contrast modes and font enlargement.
   - **Printable Certificates**: Browser print integration for generating official Certificates of Heritage Mastery.

---

## 🛠️ Tech Stack
- **Framework**: React 19 with Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Maps**: Leaflet (CartoDB Voyager)
- **Audio & Speech**: Web Audio API & Web Speech API
- **Icons**: Lucide React
- **Celebration FX**: Canvas Confetti
- **Backend API**: Express.js with Node.js Native SQLite
