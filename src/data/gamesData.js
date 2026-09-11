export const GAMES_DATA = [
  {
    id: 'game-artifact-detective',
    title: 'The Lost Bronze of Chola Port',
    archetype: 'ARTIFACT_DETECTIVE',
    archetypeName: 'Artifact Detective',
    civilization: 'Imperial Chola Dynasty',
    civilizationId: 'chola-dynasty',
    era: '11th Century CE',
    difficulty: 'Medium',
    duration: '15 mins',
    xpReward: 350,
    badgeId: 'chola-master',
    badgeName: 'Master of Lost-Wax',
    category: 'Artifact Investigation',
    coverImage: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Rotate, inspect micro-details, and uncover the secret alloy formulation of Chola bronze smiths.',
    storyIntro: 'In 1014 CE, master bronze sculptor Sembiyan Mahadevi cast a sacred processional bronze icon embedded with secret alchemical ratios. Examine the 3D artifact, click suspicious hotspots, and uncover the five signatures of the Chola guild.',
    skillsLearned: ['Metallurgical Analysis', 'Iconographic Posture Decoding', 'Lost-Wax Casting Process'],
    historicalContext: 'Chola bronzes were crafted using the cire-perdue (lost wax) technique using Panchaloha (five sacred metals: copper, zinc, lead, silver, and gold). Each piece is unique because the wax mold melts away during firing.',
    artifactModelType: 'bronze_nataraja',
    hotspots: [
      { id: 'hs-drum', title: 'The Damaru Drum', x: 28, y: 32, hint: 'Observe the hourglass instrument in the upper right hand.', clue: 'Sound represents the primordial cosmic vibration (Nada) that initiates creation.', answer: 'Cosmic Creation' },
      { id: 'hs-fire', title: 'The Agni Flame', x: 72, y: 30, hint: 'Look at the flame cupped in the upper left hand.', clue: 'Fire purifies ignorance and balances cosmic creation with transformation.', answer: 'Transformation' },
      { id: 'hs-dwarf', title: 'The Dwarf of Ignorance (Apasmara)', x: 50, y: 82, hint: 'Look beneath the grounded right foot.', clue: 'The dancer tramples Apasmara Purusha, the demon representing forgetfulness and illusion.', answer: 'Conquest of Illusion' }
    ]
  },
  {
    id: 'game-time-travel-decision',
    title: 'The Edicts of the Iron Pillar',
    archetype: 'TIME_TRAVEL_DECISION',
    archetypeName: 'Time-Travel Decision Game',
    civilization: 'Mauryan Empire',
    civilizationId: 'maurya-empire',
    era: '261 BCE',
    difficulty: 'Hard',
    duration: '20 mins',
    xpReward: 450,
    badgeId: 'ashoka-dhamma',
    badgeName: 'Keeper of Dhamma',
    category: 'Story Adventures',
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f421a182?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Step into the council of Emperor Ashoka post-Kalinga and govern an empire through moral statecraft.',
    storyIntro: 'The smoke clears over the Daya River at Kalinga. As Chief Royal Counselor to Emperor Ashoka, you must draft the imperial decrees that will transform a conquest-driven empire into an era of peace and ethical governance.',
    skillsLearned: ['Historical Ethics', 'Diplomatic Strategy', 'Epigraphical Law'],
    historicalContext: 'The Kalinga War (261 BCE) was a watershed moment in world history. Ashoka renounced aggressive warfare (Digvijaya) in favor of moral conquest (Dhammavijaya), inscribing 33 edicts across rock cliffs throughout modern India, Pakistan, and Afghanistan.',
    scenes: [
      {
        id: 'scene-1',
        title: 'The Crossroads of Kalinga',
        text: 'Emperor Ashoka stands before you, shaken by the battlefield devastation. He asks how the imperial royal treasury should be allocated for the next decade.',
        options: [
          { text: 'Erect hospitals, herbal botanical gardens, and rest wells along all royal trade routes for humans and animals alike.', score: 150, feedback: 'Ashoka nods deeply: "This embodies compassion for all living beings (Sarva-bhuta-hita)."', nextScene: 'scene-2a' },
          { text: 'Fortify borders with double ramparts and increase garrison tributes to prevent future rebellions.', score: 50, feedback: 'Ashoka sighs: "More iron and walls will not heal a wounded empire."', nextScene: 'scene-2b' }
        ]
      },
      {
        id: 'scene-2a',
        title: 'The Voice on the Rocks',
        text: 'The people must know the new imperial policy. In what script and language should the Emperor’s edicts be carved so every ordinary citizen understands?',
        options: [
          { text: 'Inscribe Prakrit in local Brahmi and Kharosthi scripts on polished monolithic pillars at crowded market crossroads.', score: 200, feedback: 'Masterful decision! Citizens and travelers gathered around the pillars, making literacy and ethics public property.', nextScene: 'scene-end' },
          { text: 'Write only in high Vedic Sanskrit in court palm manuscripts kept in royal archives.', score: 40, feedback: 'Common citizens could not read court manuscripts; the empire drifted into disconnect.', nextScene: 'scene-end' }
        ]
      },
      {
        id: 'scene-2b',
        title: 'The Restless Provinces',
        text: 'Provincial governors request instructions on how to handle religious disputes between Jain, Buddhist, and Ajivika ascetics.',
        options: [
          { text: 'Issue Major Rock Edict XII commanding mutual respect: "One should honor another’s faith to grow one’s own."', score: 200, feedback: 'Toleration unified the subcontinent across diverse cultures.', nextScene: 'scene-end' },
          { text: 'Enforce a single state religion across all provinces.', score: 30, feedback: 'Discontent fractured the frontier territories.', nextScene: 'scene-end' }
        ]
      }
    ]
  },
  {
    id: 'game-ancient-message',
    title: 'Deciphering the Steatite Seal',
    archetype: 'ANCIENT_MESSAGE',
    archetypeName: 'Decode the Ancient Message',
    civilization: 'Indus Valley Civilization',
    civilizationId: 'indus-valley',
    era: '2500 BCE',
    difficulty: 'Medium',
    duration: '12 mins',
    xpReward: 300,
    badgeId: 'indus-epigrapher',
    badgeName: 'Harappan Decrypter',
    category: 'Puzzle',
    coverImage: 'https://images.unsplash.com/photo-1599818816942-83b6b19a31a6?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Arrange the sacred Indus script glyphtiles to decode a maritime merchant manifest from Lothal.',
    storyIntro: 'An intact carnelian merchant tablet has been recovered from the dockyard warehouses of Lothal. Match the pictographic symbols (fish, jar, arrow, horn) with their phonosemantic values to authorize the cargo shipment to ancient Mesopotamia (Meluhha).',
    skillsLearned: ['Symbolic Cryptography', 'Indus Glyphs', 'Bronze Age Trade Logistics'],
    historicalContext: 'The Indus script remains one of history’s greatest unsolved linguistic puzzles. Over 400 distinct signs have been cataloged on carved steatite seals used as merchant identity stamps.',
    puzzle: {
      targetPhrase: 'GRAIN SHIPMENT TO MELUHHA',
      glyphs: [
        { id: 'g1', symbol: '🐟', name: 'Mīn (Fish)', meaning: 'Star / Value' },
        { id: 'g2', symbol: '🏺', name: 'Kumbha (Jar)', meaning: 'Measurement Unit' },
        { id: 'g3', symbol: '🏹', name: 'Bāṇa (Arrow)', meaning: 'Swift Passage' },
        { id: 'g4', symbol: '🦏', name: 'Khadgi (Unicorn/Rhino)', meaning: 'Royal Wharf Seal' }
      ],
      correctSequence: ['g4', 'g1', 'g2', 'g3'],
      riddleClue: 'First the Royal Seal authorizes (🦏), then calculate the Star value (🐟), measure the Grain Volume (🏺), and dispatch with Swift Passage (🏹)!'
    }
  },
  {
    id: 'game-rebuild-monument',
    title: 'The Astronomical Chariot of Konark',
    archetype: 'REBUILD_MONUMENT',
    archetypeName: 'Rebuild the Monument',
    civilization: 'Kalinga Eastern Ganga',
    civilizationId: 'chola-dynasty',
    era: '13th Century CE',
    difficulty: 'Hard',
    duration: '18 mins',
    xpReward: 400,
    badgeId: 'konark-mason',
    badgeName: 'Master of Sun Geometry',
    category: 'Reconstruction',
    coverImage: 'https://images.unsplash.com/photo-1609766418204-94aae0ecfddc?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Assemble 24 carved sundial wheels, interlocking iron dowels, and chlorite stone platforms into perfect solar alignment.',
    storyIntro: 'Master architect Bishu Maharana left behind the structural blueprint for the monumental Sun Temple chariot. Place the 4 architectural components into their load-bearing foundation tiers before the solstice sunset.',
    skillsLearned: ['Trabeated Engineering', 'Horology & Sundials', 'Kalinga Architectural Profile'],
    historicalContext: 'Konark was built as a colossal 100-foot chariot with 24 intricately carved wheels representing the 24 fortnights of the year, with spokes functioning as accurate solar sundials calculating time down to minutes.',
    slots: [
      { id: 'slot-pitha', name: 'Plinth Foundation (Pitha)', acceptedId: 'part-pitha', label: '1. Star/Stellate Base Plinth' },
      { id: 'slot-wheel', name: 'Sundial Wheels (Chakra)', acceptedId: 'part-wheel', label: '2. 8 Major & 8 Minor Spoke Wheels' },
      { id: 'slot-jagamohana', name: 'Assembly Hall (Jagamohana)', acceptedId: 'part-jagamohana', label: '3. Pyramidal Stepped Roof' },
      { id: 'slot-kalasha', name: 'Monolithic Finial (Kalasha & Amalaka)', acceptedId: 'part-kalasha', label: '4. Sun Apex Crown' }
    ],
    draggableParts: [
      { id: 'part-jagamohana', name: '3-Tiered Pyramidal Roof', icon: '🏛️', desc: 'Distributes vertical thrust across 16 stone columns.' },
      { id: 'part-pitha', name: 'Carved Chlorite Plinth', icon: '🧱', desc: 'Deep mortised bedrock footing with elephant friezes.' },
      { id: 'part-kalasha', name: 'Solar Amalaka & Golden Finial', icon: '☀️', desc: 'Apex stone locking the curvilinear tower ribs.' },
      { id: 'part-wheel', name: '24 Sundial Stone Wheels', icon: '⚙️', desc: 'Spokes aligned to tell horizontal solar shadows.' }
    ]
  },
  {
    id: 'game-ancient-market',
    title: 'The Great Bazaar of Vijayanagara',
    archetype: 'ANCIENT_MARKET',
    archetypeName: 'Ancient Market Simulator',
    civilization: 'Vijayanagara Empire',
    civilizationId: 'vijayanagara-empire',
    era: '1520 CE',
    difficulty: 'Medium',
    duration: '15 mins',
    xpReward: 350,
    badgeId: 'hampi-merchant',
    badgeName: 'Diamond Merchant of Hampi',
    category: 'Strategy',
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f421a182?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Trade Malabar pepper, Persian warhorses, Golconda rubies, and Chinese porcelain along the Tungabhadra Car Street.',
    storyIntro: 'Portuguese chronicler Domingo Paes documented that rubies, diamonds, and pearls were sold openly by heaps in the Hampi bazaars. Manage your 500 Varaha gold currency, navigate market supply shifts, and secure the royal gems before dusk.',
    skillsLearned: ['Medieval Economics', 'Trade Route Logistics', 'Barter Math'],
    historicalContext: 'Vijayanagara was one of the wealthiest commercial hubs of the 16th century, controlling maritime trade between the Arabian Sea and Southeast Asia.',
    inventory: [
      { id: 'item-pepper', name: 'Malabar Black Pepper', buyPrice: 40, sellPrice: 75, icon: '🌿', available: 5 },
      { id: 'item-silk', name: 'Kanchipuram Raw Silk', buyPrice: 80, sellPrice: 130, icon: '🧵', available: 3 },
      { id: 'item-horse', name: 'Persian War Horse', buyPrice: 200, sellPrice: 320, icon: '🐎', available: 1 },
      { id: 'item-ruby', name: 'Golconda Uncut Ruby', buyPrice: 250, sellPrice: 420, icon: '💎', available: 1 }
    ],
    startingCoins: 500,
    targetProfit: 900
  },
  {
    id: 'game-historical-character',
    title: 'Audience with King Krishnadevaraya',
    archetype: 'HISTORICAL_CHARACTER',
    archetypeName: 'Historical Character Mystery',
    civilization: 'Vijayanagara Empire',
    civilizationId: 'vijayanagara-empire',
    era: '1515 CE',
    difficulty: 'Medium',
    duration: '15 mins',
    xpReward: 380,
    badgeId: 'royal-counsel',
    badgeName: 'Advisor to the Raya',
    category: 'Mysteries',
    coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Engage in a sharp intellectual dialogue with Emperor Krishnadevaraya and poet-scholar Tenali Rama.',
    storyIntro: 'In the grand pillared Ranga Mandapa, the Emperor poses riddles concerning statecraft, architecture, and water conservation. Select your philosophical arguments wisely to earn royal court patronage.',
    skillsLearned: ['Literary History', 'Court Etiquette', 'Amuktamalyada Philosophy'],
    historicalContext: 'Emperor Krishnadevaraya was not only a conqueror but an accomplished poet and polymath who authored Amuktamalyada in Telugu and patronized the Ashtadiggajas (Eight Great Scholars).',
    dialogueTree: {
      npcName: 'Emperor Krishnadevaraya',
      npcTitle: 'Ruler of the Vijayanagara Empire',
      avatar: '👑',
      firstSpeech: '"Welcome, scholar from afar. Tell me: what is the true foundation of a thriving city in this rocky Deccan plateau?"',
      options: [
        {
          text: '"Neither walls nor armies alone, Your Majesty, but the mastery of water—interconnected stepped tanks and aqueducts that never run dry."',
          reply: '"Spot on! That is why we carved stone canals from the Tungabhadra into every royal quarter. Now answer my second test..."',
          score: 150,
          nextId: 'q2'
        },
        {
          text: '"The accumulation of gold and diamonds in palace vaults."',
          reply: '"Gold cannot quench thirst during drought, nor feed our artisans. You have more to learn of statecraft."',
          score: 30,
          nextId: 'q2'
        }
      ],
      q2: {
        speech: '"Our court poet Tenali Rama challenges you: Why do we carve dancers and musicians upon our temple pillars rather than mere battle scenes?"',
        options: [
          {
            text: '"Because art and dance elevate the human spirit, harmonizing physical stone with celestial rhythm and devotion (Bhakti)."',
            reply: '"Magnificent! You speak as a true court philosopher. I confer upon you the Golden Bracelet of Honor (Gandapenderu)!"',
            score: 230,
            isEnd: true
          },
          {
            text: '"To showcase royal wealth to foreign ambassadors."',
            reply: '"A superficial eye sees only wealth; a deep eye sees spiritual harmony."',
            score: 50,
            isEnd: true
          }
        ]
      }
    }
  },
  {
    id: 'game-cultural-sound',
    title: 'The SaReGaMa Musical Pillars',
    archetype: 'CULTURAL_SOUND',
    archetypeName: 'Cultural Sound Challenge',
    civilization: 'Vijayanagara Empire',
    civilizationId: 'vijayanagara-empire',
    era: '16th Century CE',
    difficulty: 'Easy',
    duration: '10 mins',
    xpReward: 250,
    badgeId: 'acoustic-maestro',
    badgeName: 'Acoustic Maestro',
    category: 'Audio Games',
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f421a182?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Identify the exact resonant acoustic frequencies (Sa-Re-Ga-Ma) tuned into solid granite monoliths.',
    storyIntro: 'The Maha-Mandapa of Vittala Temple houses 56 musical pillars (SaReGaMa pillars) engineered to resonate at classical Indian musical frequencies when tapped. Match the sequence of resonant tones to harmonize the hall.',
    skillsLearned: ['Acoustic Lithophone Physics', 'Indian Classical Swaras', 'Granite Resonance'],
    historicalContext: 'Masons varied the density, granite composition, and hollow chamber bore holes inside slender monolithic columns so that clusters emitted distinct notes (Sapta Swaras) to accompany temple recitals.',
    notes: [
      { id: 'sa', note: 'Ṣa (Shadja)', freq: 261.63, symbol: '🔴', soundName: 'Peacock cry / Root C' },
      { id: 're', note: 'Ṛi (Rishabha)', freq: 293.66, symbol: '🟠', soundName: 'Bull resonance / D' },
      { id: 'ga', note: 'Ga (Gandhara)', freq: 329.63, symbol: '🟡', soundName: 'Goat timbre / E' },
      { id: 'ma', note: 'Ma (Madhyama)', freq: 349.23, symbol: '🟢', soundName: 'Heron call / F' }
    ],
    targetSequence: ['sa', 'ga', 're', 'ma']
  },
  {
    id: 'game-cultural-craft',
    title: 'The Parchin Kari Gem Inlay',
    archetype: 'CULTURAL_CRAFT',
    archetypeName: 'Cultural Craft Challenge',
    civilization: 'Mughal Imperial Era',
    civilizationId: 'mughal-empire',
    era: '1640 CE',
    difficulty: 'Medium',
    duration: '14 mins',
    xpReward: 300,
    badgeId: 'master-inlayer',
    badgeName: 'Master of Pietra Dura',
    category: 'Cultural Challenges',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Cut and arrange slices of Lapis Lazuli, Malachite, and Carnelian into bilateral floral symmetry.',
    storyIntro: 'Royal ustad artisans carved hollow sockets into pure white Makrana marble and embedded micro-polished slices of semi-precious gemstones. Complete the 4-petal floral medallion with geometric balance.',
    skillsLearned: ['Parchin Kari Precision', 'Semi-Precious Gemology', 'Mughal Arabesque Symmetry'],
    historicalContext: 'Pietra Dura (Parchin Kari) reached its zenith at the Taj Mahal and Red Fort, where a single flower petal could be composed of up to 60 individually shaped gemstone splinters held with gum and lime mortar.',
    gridSlots: [
      { id: 'slot-1', expectedGem: 'lapis', label: 'North Petal' },
      { id: 'slot-2', expectedGem: 'carnelian', label: 'East Petal' },
      { id: 'slot-3', expectedGem: 'malachite', label: 'South Petal' },
      { id: 'slot-4', expectedGem: 'carnelian', label: 'West Petal' }
    ],
    availableGems: [
      { id: 'lapis', name: 'Lapis Lazuli (Afghanistan)', color: '#1E40AF', icon: '🔷' },
      { id: 'carnelian', name: 'Carnelian (Arabia)', color: '#EA580C', icon: '🔶' },
      { id: 'malachite', name: 'Malachite (Central Asia)', color: '#15803D', icon: '🟢' },
      { id: 'turquoise', name: 'Turquoise (Tibet)', color: '#06B6D4', icon: '💠' }
    ]
  }
];
