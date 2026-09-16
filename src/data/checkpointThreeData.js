// Checkpoint 3 Data for all 20 Monuments: QR Codes, Riddles & Roleplay POV Questions

export const CHECKPOINT_THREE_DATA = {
  "hampi": {
    "id": "hampi",
    "monumentName": "Hampi (Vijayanagara)",
    "state": "Karnataka",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/hampi/play?checkpoint=3",
    "checkpointName": "Vittala Temple & Stone Chariot",
    "landmarkTitle": "The Musical Pillars & Sacred Ratha",
    "riddle": {
      "title": "Riddle of the Sacred Stone Chariot",
      "text": "I have four carved wheels of solid granite, sculpted like a temple on wheels, yet I never move an inch across the soil. When you tap my neighbor's slender stone pillars, they sing the seven musical notes (Sapta Swara). What iconic marvel am I?",
      "options": [
        "The Royal Elephant Stables",
        "The Stone Chariot & Musical Pillars of Vittala",
        "The Lotus Mahal Summer Pavilion",
        "The Queen's Royal Bath"
      ],
      "correctOption": 1,
      "hints": [
        "Look at the back of an Indian ₹50 currency note.",
        "It is dedicated to Lord Garuda facing the grand sanctum."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are King Krishnadevaraya (Vijayanagara Empire, 1513 CE)",
      "situation": "You have just returned victorious from the Kalinga expedition. Your Chief Royal Architect asks for your imperial verdict: Your treasury is full of gold and jewels from global trade, but neighboring empires are preparing siege forces. The Chief Sculptor wants to build the world's most intricate granite chariot and hollow musical pillars that require 20 years of craftsmanship.",
      "question": "As King Krishnadevaraya, what strategic decision do you make?",
      "options": [
        {
          "text": "A) Halt temple construction entirely and divert all stone masons to build defensive granite border ramparts.",
          "historicalAnalysis": "Pragmatic for defense, but Vijayanagara's global prestige as a cultural and trade superpower relied on showing immense economic confidence through enduring monuments.",
          "isHistoricalChoice": false,
          "xpBonus": 40
        },
        {
          "text": "B) Authorize the Vittala Temple Chariot, while hiring Portuguese horse merchants and fortifying the 7 outer ring walls of Hampi simultaneously.",
          "historicalAnalysis": "⭐ EXACT HISTORICAL DECISION! King Krishnadevaraya balanced both: he fortified the 7 ring walls, imported superior Persian & Portuguese cavalry, AND built the immortal Vittala complex which made Hampi the second-largest city in the world in 1500 CE.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "C) Build the chariot out of cheaper soft wood instead of granite to save time and gold.",
          "historicalAnalysis": "A wooden chariot would have decomposed within decades. Granite ensured the monument survived over 500 years into modern India.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        },
        {
          "text": "D) Keep the gold hidden in underground treasuries and cancel public celebrations.",
          "historicalAnalysis": "Hiding wealth causes economic stagnation; Krishnadevaraya's open bazaars and temple construction stimulated the employment of tens of thousands of artisans.",
          "isHistoricalChoice": false,
          "xpBonus": 35
        }
      ]
    }
  },
  "taj-mahal": {
    "id": "taj-mahal",
    "monumentName": "Taj Mahal",
    "state": "Uttar Pradesh",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/taj-mahal/play?checkpoint=3",
    "checkpointName": "The Main Marble Plinth & Four Outward Minarets",
    "landmarkTitle": "Symmetry of the Yamuna Riverfront",
    "riddle": {
      "title": "Riddle of the Leaning Sentinels",
      "text": "Four tall white towers stand guard at my four corners. But if you look closely through an architect's plumb-line, we do not stand perfectly vertical—we lean slightly outward away from the dome. Why were we built this way?",
      "options": [
        "To catch stronger wind gusts for ventilation",
        "Because the architects made a measurement error during construction",
        "To allow river rainwater to drain directly into the Yamuna",
        "To protect the central marble dome from damage in case of an earthquake"
      ],
      "correctOption": 3,
      "hints": [
        "Think about natural seismic disasters in northern India.",
        "If a tower collapses, in which direction should it fall?"
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "🏛️ You are Ustad Ahmad Lahori (Chief Imperial Architect, 1632 CE)",
      "situation": "You are designing the massive foundation of the Taj Mahal directly on the muddy, soft banks of the river Yamuna. Heavy stone monuments usually sink and crack over decades when built on river silt.",
      "question": "As the Chief Architect, what ingenious structural solution will you invent to support thousands of tons of Makrana marble?",
      "options": [
        {
          "text": "A) Dig a massive network of deep wells, line them with ebony and sal wood, and fill them with stone and lime mortar.",
          "historicalAnalysis": "⭐ EXACT HISTORICAL MASTERPIECE! Ustad Lahori used deep timber well-foundations. Ebony wood requires constant moisture from the Yamuna to remain rock-hard without rotting, keeping the Taj stable for nearly 400 years!",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Move the monument 50 kilometers away into the dry desert where bedrock is shallow.",
          "historicalAnalysis": "Moving away would lose the iconic reflection pool and cooling breezes of the sacred Yamuna river.",
          "isHistoricalChoice": false,
          "xpBonus": 35
        },
        {
          "text": "C) Build the dome out of lightweight paper and gypsum instead of solid marble.",
          "historicalAnalysis": "Lightweight materials would not survive northern Indian monsoon rains and heat.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Build the tomb on floating wooden barges anchored to the riverbed.",
          "historicalAnalysis": "Floating barges would wash away during annual monsoon floods.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        }
      ]
    }
  },
  "konark-sun-temple": {
    "id": "konark-sun-temple",
    "monumentName": "Sun Temple, Konark",
    "state": "Odisha",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/konark-sun-temple/play?checkpoint=3",
    "checkpointName": "The 24 Cosmic Sundial Wheels",
    "landmarkTitle": "The Grand Chariot of Surya",
    "riddle": {
      "title": "Riddle of the Cosmic Shadow Clock",
      "text": "I am carved with 8 major spokes and 8 minor spokes. When the morning sunlight strikes my central hub, the shadow cast by my spoke tells you the exact time of day down to the minute. What ancient astronomical device am I?",
      "options": [
        "The Sacred Temple Bell",
        "The Sun Temple Sundial Wheel (Chakra)",
        "The Royal Navigational Compass",
        "The Astrological Calendar Stele"
      ],
      "correctOption": 1,
      "hints": [
        "There are 24 of these wheels carved around the temple base.",
        "They represent the 24 fortnights of the solar year."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are King Narasimhadeva I (Eastern Ganga Dynasty, 1250 CE)",
      "situation": "1,200 master sculptors have worked for 12 years to construct the gigantic 229-foot tall Sun Temple on the shores of the Bay of Bengal. However, placing the heavy iron-magnet crown stone (Kalasa) atop the sanctum is proving impossible, and the engineers fear structural collapse.",
      "question": "As King Narasimhadeva I, how do you solve this engineering deadlock?",
      "options": [
        {
          "text": "A) Give the 12-year-old prodigy architect Dharmapada the authority to use innovative magnetic counterweights to seal the pinnacle.",
          "historicalAnalysis": "⭐ HISTORICAL LEGEND! According to Odia history and temple lore, young Dharmapada solved the mathematical cantilever puzzle that baffled 1,200 senior artisans, successfully crowning the temple.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Order the temple demolished and demand a refund from the stone quarries.",
          "historicalAnalysis": "Demolishing 12 years of craftsmanship would waste imperial resources and demoralize the kingdom.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "C) Leave the roof completely open and claim it was designed that way.",
          "historicalAnalysis": "An open sanctum would expose the sacred deity and chlorite carvings to coastal salt erosion.",
          "isHistoricalChoice": false,
          "xpBonus": 35
        },
        {
          "text": "D) Force foreign merchant sailors to climb the walls with ship ropes.",
          "historicalAnalysis": "Ship ropes were not strong enough to hoist the multi-ton iron loadstone.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        }
      ]
    }
  },
  "ajanta-caves": {
    "id": "ajanta-caves",
    "monumentName": "Ajanta Caves",
    "state": "Maharashtra",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/ajanta-caves/play?checkpoint=3",
    "checkpointName": "Cave 1: Padmapani & Bodhisattva Frescoes",
    "landmarkTitle": "The Dark Gorge Lighting Secret",
    "riddle": {
      "title": "Riddle of the Sunlit Cave Mirrors",
      "text": "We are vibrant mineral paintings created deep inside pitch-black volcanic basalt caves 1,500 years ago. Yet there are zero soot or smoke marks on our ceilings. How did ancient artists illuminate our dark walls without burning torches?",
      "options": [
        "They painted with electric battery lanterns",
        "They used magical glowing crystals found in the Waghora river",
        "They only painted during days of a full solar eclipse",
        "Using polished brass plates and white cloths to reflect natural sunlight inside"
      ],
      "correctOption": 3,
      "hints": [
        "Think of optical reflection using shiny metal surfaces.",
        "Torches produce soot, but reflection produces clean light."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "🎨 You are Master Painter of the Vakataka Royal Guild (475 CE)",
      "situation": "You are commissioned by King Harishena to paint the famous Padmapani Bodhisattva with lifelike eyes, silk robes, and glowing lotus petals. But the cave humidity and monsoon dripping threaten to wash away standard water paints.",
      "question": "What organic chemistry technique will you invent to preserve your colors for thousands of years?",
      "options": [
        {
          "text": "A) Layer fermented rock clay, cow dung, and rice husk plaster, then paint with lapis lazuli, red ochre, and animal glue while the plaster is fresh (Tempera Fresco).",
          "historicalAnalysis": "⭐ MASTER ARCHAEOLOGICAL DISCOVERY! The Ajanta painters used a multi-layered mud, straw, and rock-dust plaster sealed with plant gums and lapis lazuli imported from Afghanistan. That is why their colors still shimmer today!",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Use crushed berries and fruit juices mixed with river water.",
          "historicalAnalysis": "Fruit juices decompose and turn black within weeks due to fungal growth.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        },
        {
          "text": "C) Carve the entire painting in deep gold foil without using paint.",
          "historicalAnalysis": "Gold foil alone cannot capture the subtle skin tones, emotions, and gentle eyelids of the compassionate Bodhisattva.",
          "isHistoricalChoice": false,
          "xpBonus": 35
        },
        {
          "text": "D) Paint only in the dry winter months and lock the cave forever.",
          "historicalAnalysis": "Monks lived in the viharas year-round; the art needed to withstand annual monsoon moisture.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        }
      ]
    }
  },
  "qutub-minar": {
    "id": "qutub-minar",
    "monumentName": "Qutub Minar Complex",
    "state": "Delhi",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/qutub-minar/play?checkpoint=3",
    "checkpointName": "The Rust-Resistant Iron Pillar of Chandragupta",
    "landmarkTitle": "The Metallurgical Marvel of Ancient Delhi",
    "riddle": {
      "title": "Riddle of the Stainless Iron",
      "text": "I have stood outdoors under monsoon rains, scorching Delhi summers, and winter frost for over 1,600 years, yet I have not rusted away into red flakes. What ancient metallurgical wonder am I?",
      "options": [
        "The Copper Bell of the Alai Darwaza",
        "The Ancient Iron Pillar of Mehrauli",
        "The Bronze Cannon of Qutub Minar",
        "The Golden Spire of the Mosque"
      ],
      "correctOption": 1,
      "hints": [
        "It contains an ancient Sanskrit inscription in Gupta Brahmi script.",
        "It was forged around 400 CE during the reign of Chandragupta Vikramaditya."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "⚒️ You are the Master Metallurgist of Emperor Chandragupta II (400 CE)",
      "situation": "The Emperor asks you to forge an immense 6-ton iron victory pillar (Garuda Dhwaja) dedicated to Lord Vishnu that will stand in the open courtyard for millennia without corroding.",
      "question": "What metallurgical technique will you use to make raw iron corrosion-proof?",
      "options": [
        {
          "text": "A) Forge high-phosphorus wrought iron with zero sulfur, creating a protective crystalline 'misawite' iron-phosphate barrier on the surface.",
          "historicalAnalysis": "⭐ WORLD-FAMOUS INDIAN METALLURGY! Ancient Indian blacksmiths used wood charcoal (high phosphorus) and forge-welding, which naturally forms an invisible protective compound layer that prevents rust.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Paint the pillar with modern enamel car paint every Sunday.",
          "historicalAnalysis": "Synthetic paints did not exist in 400 CE and peel off in extreme weather.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Cover the pillar in thick animal fat every morning.",
          "historicalAnalysis": "Animal fat washes away with the first rain shower and attracts insects.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        },
        {
          "text": "D) Build a giant glass dome over the entire courtyard.",
          "historicalAnalysis": "Large architectural glass domes were technically impossible in 400 CE.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        }
      ]
    }
  },
  "brihadisvara-temple": {
    "id": "brihadisvara-temple",
    "monumentName": "Brihadisvara Temple, Thanjavur",
    "state": "Tamil Nadu",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/brihadisvara-temple/play?checkpoint=3",
    "checkpointName": "The 80-Ton Granite Kumbam Capstone",
    "landmarkTitle": "The Great Chola Tower (Vimana)",
    "riddle": {
      "title": "Riddle of the Giant Granite Capstone",
      "text": "I am a single solid block of granite weighing 80,000 kilograms, sitting perched 216 feet high atop the temple tower. There were no modern cranes 1,000 years ago. How did Chola engineers haul me to the top of the tower?",
      "options": [
        "It was lifted using gunpowder rocket pulleys",
        "Using giant hot air balloons filled with temple incense smoke",
        "The stone was carved at the top from a mountain that was later dug away",
        "Using a 6-kilometer long inclined earthen ramp with elephants and wooden rollers"
      ],
      "correctOption": 3,
      "hints": [
        "Think of a gentle incline ramp starting from the village of Sarapallam.",
        "Hundreds of trained royal war elephants pulled the stone up the ramp."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Emperor Rajaraja Chola I (Thanjavur, 1010 CE)",
      "situation": "You have built the largest temple in Asia (Peruvudaiyar Kovil) using over 130,000 tons of granite. However, there are zero granite hills or rock quarries within 50 kilometers of the delta city of Thanjavur.",
      "question": "As Emperor Rajaraja Chola, how do you transport 130,000 tons of granite to Thanjavur without modern trucks or trains?",
      "options": [
        {
          "text": "A) Build flat-bottom wooden barges and float the giant granite boulders along the Kaveri and Kollidam river canals during monsoon flow.",
          "historicalAnalysis": "⭐ BRILLIANT CHOLA LOGISTICS! The Cholas mastered river engineering, utilizing the seasonal flow of the Kaveri network to float mammoth stones from quarries in Tiruchirappalli right to the construction site.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Force farmers to carry individual 10-ton stones on their heads.",
          "historicalAnalysis": "Physically impossible and would have triggered widespread peasant revolt.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Cancel the temple project and make it out of mud bricks.",
          "historicalAnalysis": "Mud bricks would wash away in the Cauvery delta monsoon floods.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Purchase granite from Rome across the Arabian Sea.",
          "historicalAnalysis": "Local Dravidian granite was superior and shipping across oceans was needlessly slow and expensive.",
          "isHistoricalChoice": false,
          "xpBonus": 35
        }
      ]
    }
  },
  "fatehpur-sikri": {
    "id": "fatehpur-sikri",
    "monumentName": "Fatehpur Sikri",
    "state": "Uttar Pradesh",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/fatehpur-sikri/play?checkpoint=3",
    "checkpointName": "Diwan-i-Khas & The Central Pillar of Religions",
    "landmarkTitle": "The Hall of Private Audience & Debates",
    "riddle": {
      "title": "Riddle of the Lotus Throne Pillar",
      "text": "Inside this stone chamber stands a single massive pillar carved like a blossoming lotus, supporting a raised circular platform where the Emperor sat with 4 stone bridges reaching the 4 corners. What philosophical concept did this represent?",
      "options": [
        "A defensive lookout tower to spot enemy spies inside the palace",
        "The Emperor listening equally to scholars of Hinduism, Islam, Christianity, Jainism & Zoroastrianism (Sulh-i-Kul)",
        "A stage for royal puppet theatre performances",
        "An imperial bank counter for tax collection"
      ],
      "correctOption": 1,
      "hints": [
        "It symbolizes universal peace and inter-faith dialogue.",
        "Think of Emperor Akbar's policy of religious synthesis (Din-i Ilahi)."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Emperor Akbar the Great (Fatehpur Sikri, 1575 CE)",
      "situation": "Scholars and theologians from different religious backgrounds are arguing bitterly in your court, each claiming only their faith is true. Religious riots threaten peace across your empire.",
      "question": "As Emperor Akbar, what innovative governance initiative do you launch in the Diwan-i-Khas?",
      "options": [
        {
          "text": "A) Establish the Ibadat Khana (House of Worship) to invite pandits, sufis, jesuit priests, jain munis, and zoroastrians for respectful philosophical dialogue and mutual understanding.",
          "historicalAnalysis": "⭐ HISTORICAL MASTERSTROKE! Akbar's policy of 'Sulh-i-Kul' (Peace with All) and the debates at Ibadat Khana pioneered inter-faith harmony in medieval world history.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Ban all philosophical discussions and imprison anyone who asks questions.",
          "historicalAnalysis": "Authoritarian bans destroy intellectual progress and lead to rebellion.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "C) Leave the capital city and live in a tent in the jungle.",
          "historicalAnalysis": "Abandoning governance leads to civil war and political vacuum.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "D) Force everyone in the empire to speak only Latin.",
          "historicalAnalysis": "Latin was not an Indian language and would solve nothing.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        }
      ]
    }
  },
  "sanchi-stupa": {
    "id": "sanchi-stupa",
    "monumentName": "Great Stupa at Sanchi",
    "state": "Madhya Pradesh",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/sanchi-stupa/play?checkpoint=3",
    "checkpointName": "The Four Ornate Carved Toranas (Gateways)",
    "landmarkTitle": "The Stone Storybooks of Ashoka",
    "riddle": {
      "title": "Riddle of the Aniconic Buddha",
      "text": "On our intricate stone gateway carvings from the 1st Century BCE, you will find stories of the Buddha's life. But you will never see a human figure of the Buddha! Instead, his presence is shown by symbols. Which of these is NOT an ancient Buddhist symbol at Sanchi?",
      "options": [
        "The Sacred Footprints (Buddhapaduka)",
        "The Sacred Bodhi Tree",
        "The Wheel of Dharma (Dharmachakra)",
        "A Modern Plastic Trophy"
      ],
      "correctOption": 3,
      "hints": [
        "Early Buddhist art was aniconic (symbolic rather than human statues).",
        "One option is an obvious modern non-historical object."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Emperor Ashoka the Great (Pataliputra, 260 BCE)",
      "situation": "After the brutal war of Kalinga, you are overwhelmed by grief at the bloodshed. You decide to dedicate your life to peace (Dhamma Vijaya) and non-violence (Ahimsa), but you must rule a massive empire with hundreds of different tribes and languages.",
      "question": "As Emperor Ashoka, how do you spread messages of peace, equality, and animal rights across the entire subcontinent?",
      "options": [
        {
          "text": "A) Inscribe Dhamma Edicts in common Prakrit, Greek, and Aramaic on rock faces and polished monolithic pillars, building stupas and free hospitals for humans and animals.",
          "historicalAnalysis": "⭐ ONE OF HISTORY'S GREATEST TRANSFORMATIONS! Ashoka's rock and pillar edicts are the earliest deciphered historical writings of ancient India, establishing universal welfare and moral governance.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Build giant iron swords and force people to smile at weapon-point.",
          "historicalAnalysis": "Forced compliance contradicts the very essence of non-violence (Ahimsa).",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Burn down all historical libraries and erase past records.",
          "historicalAnalysis": "Erasing knowledge destroys cultural identity.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Keep peace teachings secret only for royal family members.",
          "historicalAnalysis": "Keeping moral teachings secret prevents societal moral growth.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        }
      ]
    }
  },
  "khajuraho-temples": {
    "id": "khajuraho-temples",
    "monumentName": "Khajuraho Group of Monuments",
    "state": "Madhya Pradesh",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/khajuraho-temples/play?checkpoint=3",
    "checkpointName": "Kandariya Mahadeva Temple",
    "landmarkTitle": "The Cosmic Mountain of Mount Meru",
    "riddle": {
      "title": "Riddle of the Interlocking Stones",
      "text": "My soaring 100-foot spire (Shikhara) is built out of buff-colored sandstone blocks without a single spoonful of cement or mortar. What ancient joinery method keeps my stones locked securely in place?",
      "options": [
        "Melted Plastic Glue",
        "Mortise and Tenon (Interlocking Tongue-and-Groove Joints)",
        "Sticky Rice and Mud Paste",
        "Steel Screws and Rivets"
      ],
      "correctOption": 1,
      "hints": [
        "Like giant 3D wooden puzzle pieces crafted in stone.",
        "Gravity and precision friction keep the blocks locked forever."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are King Vidyadhara (Chandela Dynasty, 1030 CE)",
      "situation": "Your kingdom is surrounded by political rivals, but your capital at Khajuraho is a sanctuary of arts, yoga, philosophy, and classical dance. Your chief sculptor wants to carve 800 celestial figures celebrating all facets of human life, joy, and spirituality on the temple walls.",
      "question": "As King Vidyadhara, how do you balance civic prosperity with architectural glory?",
      "options": [
        {
          "text": "A) Commission the Kandariya Mahadeva Temple with multi-tiered sandstone spires, integrating sacred geometry, water harvest reservoirs (Kunds), and philosopher academies.",
          "historicalAnalysis": "⭐ HISTORICAL TRIUMPH! The Chandela kings built grand water harvesting reservoirs and temples that synthesized yoga, dance, martial arts, and spirituality into world-heritage stone epics.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Stop all cultural festivals and demand citizens live in complete silence.",
          "historicalAnalysis": "Suppression of culture leads to economic stagnation and social rebellion.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Build temples out of fragile unbaked clay.",
          "historicalAnalysis": "Clay would dissolve in Central Indian monsoons.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        },
        {
          "text": "D) Relocate the capital city every 3 months.",
          "historicalAnalysis": "Frequent capital changes bankrupt the royal treasury.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        }
      ]
    }
  },
  "ellora-caves": {
    "id": "ellora-caves",
    "monumentName": "Ellora Caves",
    "state": "Maharashtra",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/ellora-caves/play?checkpoint=3",
    "checkpointName": "Cave 16: The Kailasa Monolithic Temple",
    "landmarkTitle": "The World's Greatest Top-Down Monolithic Excavation",
    "riddle": {
      "title": "Riddle of the Reverse Mountain",
      "text": "I am twice the size of the Parthenon in Athens. But instead of being built from the ground up by stacking stones, 200,000 tons of volcanic rock were carved away from the top of the mountain downward. What engineering marvel am I?",
      "options": [
        "The Red Fort Diwan-i-Aam",
        "The Elephant Stable",
        "The Stepwell of Adalaj",
        "Kailasa Temple (Cave 16)"
      ],
      "correctOption": 3,
      "hints": [
        "Commissioned by Rashtrakuta King Krishna I in the 8th Century CE.",
        "One mistake by a sculptor at the top would ruin the entire temple below!"
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are King Krishna I (Rashtrakuta Empire, 756 CE)",
      "situation": "Your Chief Architect proposes a radical engineering idea: Carve Mount Kailash directly out of the basalt cliff from top to bottom. But if a sculptor makes a single fracture in the rock, the entire multi-story temple is ruined forever.",
      "question": "As King Krishna I, how do you ensure zero structural errors during 20 years of top-down carving?",
      "options": [
        {
          "text": "A) Mandate 3D grid alignment cords, preliminary wax models, and reward master sculptors with hereditary royal titles for mathematical precision.",
          "historicalAnalysis": "⭐ MASTERPIECE OF HUMAN CIVILIZATION! The Rashtrakuta architects used precision geometric sighting lines, mathematical proportion systems (Vastu Shastra), and tiered excavation levels.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Blindfold the workers so they don't get scared of heights.",
          "historicalAnalysis": "Blindfolding workers would guarantee catastrophic accidents.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Use dynamite gunpowder to blow the rock apart quickly.",
          "historicalAnalysis": "Gunpowder was unknown for civil engineering in 756 CE and would shatter the basalt mountain.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Stop after carving only the roof and abandon the rest.",
          "historicalAnalysis": "An incomplete cliff excavation would not create the world's most breathtaking monolithic temple.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        }
      ]
    }
  },
  "red-fort": {
    "id": "red-fort",
    "monumentName": "Red Fort (Lal Qila), Delhi",
    "state": "Delhi",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/red-fort/play?checkpoint=3",
    "checkpointName": "Nahr-i-Bihisht (The Stream of Paradise)",
    "landmarkTitle": "The Ancient Cooling Canal of the Mughal Court",
    "riddle": {
      "title": "Riddle of the Air-Conditioned Palace",
      "text": "Long before electrical air conditioners were invented, a continuous canal of clean river water flowed through marble channels directly under our palace bedroom floors, cooling the summer breeze. What was this stream called?",
      "options": [
        "The Grand Trunk Canal",
        "Nahr-i-Bihisht (Stream of Paradise)",
        "The Yamuna Express",
        "The Royal Baoli"
      ],
      "correctOption": 1,
      "hints": [
        "Water was drawn from the Yamuna using animal-powered Persian waterwheels (Rahat).",
        "The channel connected the Shah Burj to the private royal chambers."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Emperor Shah Jahan (Shahjahanabad, 1639 CE)",
      "situation": "You are building the new capital city of Shahjahanabad (Old Delhi). Delhi's extreme 45°C summer heat makes palace living unbearable. You need a natural, sustainable cooling system for thousands of residents.",
      "question": "As Emperor Shah Jahan, what sustainable water architecture do you commission?",
      "options": [
        {
          "text": "A) Re-engineer the ancient Ali Mardan canal to bring clean water 80km from the Yamuna, feeding cooling channels (Nahr-i-Bihisht), fountains, and public stepwells across the city.",
          "historicalAnalysis": "⭐ BRILLIANT HYDRAULIC URBAN PLANNING! Shah Jahan restored and expanded the Yamuna canals, creating passive water-evaporative cooling that lowered indoor palace temperatures by 8°C naturally.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Import giant ice blocks from Antarctica by sailing boats.",
          "historicalAnalysis": "Ice from Antarctica would melt completely in the Indian Ocean weeks before reaching Delhi.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Cut down all trees in the city to let the hot wind blow away.",
          "historicalAnalysis": "Cutting trees causes urban heat island effect and extreme dust storms.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Force courtiers to fan the palace walls with silk feathers 24/7.",
          "historicalAnalysis": "Hand fanning produces minimal cooling and exhausts manpower.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        }
      ]
    }
  },
  "charminar": {
    "id": "charminar",
    "monumentName": "Charminar, Hyderabad",
    "state": "Telangana",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/charminar/play?checkpoint=3",
    "checkpointName": "The Four Grand Arches & Upper Mosque",
    "landmarkTitle": "The Arch of the Four Minarets",
    "riddle": {
      "title": "Riddle of the Four Directions",
      "text": "I stand with four grand arches facing the four cardinal directions (North, South, East, West), built in 1591 CE to commemorate the end of a deadly plague. What architectural icon of Hyderabad am I?",
      "options": [
        "Qutb Shahi Tombs",
        "Golconda Fort Citadel",
        "Chowmahalla Palace",
        "The Charminar"
      ],
      "correctOption": 3,
      "hints": [
        "Built by Sultan Muhammad Quli Qutb Shah.",
        "It features four 56-meter tall minarets with spiral staircases."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Sultan Muhammad Quli Qutb Shah (Hyderabad, 1591 CE)",
      "situation": "The old capital of Golconda Fort is overcrowded, and water shortages caused a terrible cholera epidemic. The epidemic has finally ended. You want to found a modern, hygienic planned city with broad avenues.",
      "question": "As Sultan Muhammad Quli Qutb Shah, how do you design the new city of Hyderabad around Charminar?",
      "options": [
        {
          "text": "A) Build Charminar at the central intersection of two major trade routes, with wide grid streets, public hospitals, water reservoirs, and bustling pearl bazaars.",
          "historicalAnalysis": "⭐ MASTERFUL CITY PLANNING! Quli Qutb Shah planned Hyderabad with a grid layout centered at Charminar, transforming the city into a global center for diamonds, pearls, and Unani medicine.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Force everyone to stay inside Golconda Fort and lock the gates permanently.",
          "historicalAnalysis": "Overcrowding in the old fort would cause repeat disease epidemics.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "C) Build no roads and make people travel only on rope bridges.",
          "historicalAnalysis": "Impractical for horse carts, ox-wagons, and international pearl trade.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "D) Ban doctors and hospitals from entering the new city.",
          "historicalAnalysis": "Banning healthcare would destroy citizen welfare.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        }
      ]
    }
  },
  "golconda-fort": {
    "id": "golconda-fort",
    "monumentName": "Golconda Fort",
    "state": "Telangana",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/golconda-fort/play?checkpoint=3",
    "checkpointName": "The Acoustic Clapping Arch of Balahissar",
    "landmarkTitle": "The Sound Radar of Ancient Defense",
    "riddle": {
      "title": "Riddle of the Whispering Arch",
      "text": "If you stand at the center of the Grand Entrance (Fateh Darwaza) and clap your hands once, the sharp echo travels over 1 kilometer all the way up to the mountain-top palace (Balahissar). Why was this acoustic system engineered?",
      "options": [
        "To play musical concerts for the village",
        "As an acoustic early-warning alarm to alert guards at the top of approaching invaders",
        "Because the masons accidentally dropped stones in a hollow pattern",
        "To scare away pigeons from the palace"
      ],
      "correctOption": 1,
      "hints": [
        "Sound waves are compressed and amplified through acoustic arches.",
        "It acted like an ancient telegraph system in under 2 seconds!"
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "🛡️ You are Chief Defense Engineer of Golconda Fort (1600 CE)",
      "situation": "An enemy army with 100,000 soldiers is preparing to attack Golconda Fort. The fort is built on a 400-foot granite hill with 87 semi-circular bastions.",
      "question": "What integrated defense system do you activate to protect the city?",
      "options": [
        {
          "text": "A) Close the spiked iron-studded teak gates, station acoustic listeners at the arch, and prime the gravity-fed hydraulic water system to fill the moat.",
          "historicalAnalysis": "⭐ LEGENDARY DEFENSE ARCHITECTURE! Golconda Fort resisted an 8-month siege by Emperor Aurangzeb's entire imperial army due to its acoustic early warning, elephant-proof spiked gates, and water reservoirs.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Open all gates and invite the enemy army for free sweetmeats.",
          "historicalAnalysis": "Surrendering without resistance leads to total city destruction.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Set fire to your own palace to create a smokescreen.",
          "historicalAnalysis": "Burning your own citadel destroys your own ammunition and grain supplies.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Throw all gold coins off the mountain so the enemies fight among themselves.",
          "historicalAnalysis": "Throwing away the treasury leaves the kingdom bankrupt and vulnerable.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        }
      ]
    }
  },
  "amer-fort": {
    "id": "amer-fort",
    "monumentName": "Amer Fort, Jaipur",
    "state": "Rajasthan",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/amer-fort/play?checkpoint=3",
    "checkpointName": "Sheesh Mahal (The Hall of Mirrors)",
    "landmarkTitle": "The Palace of a Thousand Stars",
    "riddle": {
      "title": "Riddle of the Single Candle Starfield",
      "text": "Inside this royal hall, walls and ceilings are inlaid with thousands of imported convex Belgian glass mirrors. If you light just one single candle at night, what breathtaking optical effect occurs?",
      "options": [
        "The candle flame shoots laser beams through the windows",
        "The mirrors melt and turn into liquid silver",
        "The room becomes completely dark as mirrors absorb the flame",
        "The entire hall glitters like a sky filled with thousands of twinkling stars"
      ],
      "correctOption": 3,
      "hints": [
        "Convex mirrors reflect light into multiple angled focal points.",
        "It also kept the room warm in winter by trapping radiant candlelight."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Raja Man Singh I (Amer Kingdom, 1592 CE)",
      "situation": "You are building Amer Fort on the rugged Aravalli hills above Maota Lake. Rajasthan experiences severe droughts. If water runs out, your hill fort cannot survive a long siege.",
      "question": "As Raja Man Singh I, how do you engineer an infallible water security system for Amer Fort?",
      "options": [
        {
          "text": "A) Build multi-tiered Persian water wheels (Rehat) to lift water from Maota lake through stepped channels into underground limestone reservoirs (Tankas).",
          "historicalAnalysis": "⭐ MASTERPIECE OF RAJASTHANI WATER HARVESTING! Amer Fort's ingenious multi-level water-lifting system and filtered underground stepwells ensured water supplies for years, even in severe droughts.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Order water to be brought from the Ganges river in clay pots on donkey backs daily.",
          "historicalAnalysis": "Donkey caravans over 500km are far too slow and would be cut off during any enemy siege.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "C) Pray for rain and store water in open clay pots on the roof.",
          "historicalAnalysis": "Open pots evaporate in Rajasthan's 45°C heat and provide inadequate storage.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        },
        {
          "text": "D) Ban drinking water inside the fort entirely.",
          "historicalAnalysis": "Dehydration kills soldiers and residents within days.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        }
      ]
    }
  },
  "hawa-mahal": {
    "id": "hawa-mahal",
    "monumentName": "Hawa Mahal (Palace of Winds)",
    "state": "Rajasthan",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/hawa-mahal/play?checkpoint=3",
    "checkpointName": "The 953 Jharokhas & Venturi Cooling",
    "landmarkTitle": "The Natural Air-Conditioned Honeycomb",
    "riddle": {
      "title": "Riddle of the 953 Windows",
      "text": "I am a 5-story pink sandstone facade with 953 intricately carved windows (Jharokhas). Even on the hottest summer day with 44°C desert winds outside, the air inside my corridors feels refreshing and cool. What scientific law causes this breeze?",
      "options": [
        "Electric battery ceiling fans hidden in the roof",
        "The Venturi Effect (Air speeding up and cooling as it passes through tiny window openings)",
        "Cold ice pumped from the basement through copper pipes",
        "Magic spells chanted by royal priests"
      ],
      "correctOption": 1,
      "hints": [
        "Think of physics: fluid speed increases through constricted areas, lowering temperature.",
        "It functions just like blowing air through pursed lips!"
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Maharaja Sawai Pratap Singh (Jaipur, 1799 CE)",
      "situation": "You want royal women (who observe the strict purdah custom) to enjoy vibrant city festivals, royal elephant processions, and street markets without being observed by the public outside, while staying cool in the desert heat.",
      "question": "What architectural innovation do you design?",
      "options": [
        {
          "text": "A) Construct Hawa Mahal shaped like Lord Krishna's crown with 953 tiny screened jharokha balconies that give one-way street views and natural wind-cooling.",
          "historicalAnalysis": "⭐ ICONIC JAIPUR ARCHITECTURE! Hawa Mahal allowed royal ladies to view the street life unseen through delicate stone latticework, while the Venturi effect air-conditioned the chambers naturally.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Build a solid 50-foot stone wall with zero windows.",
          "historicalAnalysis": "A solid wall blocks all fresh air and prevents any view of city processions.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Dig underground tunnels with no light.",
          "historicalAnalysis": "Dark tunnels do not provide a view of colorful cultural festivals.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Hire painters to draw fake festival pictures on bedsheets.",
          "historicalAnalysis": "Static pictures cannot replace witnessing real live royal processions.",
          "isHistoricalChoice": false,
          "xpBonus": 30
        }
      ]
    }
  },
  "meenakshi-temple": {
    "id": "meenakshi-temple",
    "monumentName": "Meenakshi Amman Temple, Madurai",
    "state": "Tamil Nadu",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/meenakshi-temple/play?checkpoint=3",
    "checkpointName": "The 1000-Pillar Hall & Musical Granite Columns",
    "landmarkTitle": "The Hall of Divine Rhythm",
    "riddle": {
      "title": "Riddle of the 985 Geometric Pillars",
      "text": "Inside the grand 'Hall of Thousand Pillars' (Ayiramkaal Mandapam), there are actually 985 uniquely carved granite columns. No matter where you stand in the hall, what optical geometric marvel do you observe?",
      "options": [
        "The pillars are made of hollow glass filled with holy water",
        "The pillars rotate 360 degrees when touched",
        "The pillars glow in the dark like green neon lights",
        "The pillars form perfectly straight, unbroken lines from every angle you look"
      ],
      "correctOption": 3,
      "hints": [
        "Built by Ariyanatha Mudaliar under the Nayak Dynasty in 1569 CE.",
        "It demonstrates master grid geometry in Dravidian stone engineering."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Queen Rani Mangammal (Nayak Dynasty, 1689 CE)",
      "situation": "Your temple city of Madurai receives hundreds of thousands of pilgrims during the Chithirai festival. The summer heat causes dehydration, and crowded streets cause stampedes.",
      "question": "As Queen Regent Rani Mangammal, what civic infrastructure do you build?",
      "options": [
        {
          "text": "A) Construct stone choultries (inns), tree-shaded highways with roadside wells (Vanni Maram), drinking water fountains, and expanded temple gateways.",
          "historicalAnalysis": "⭐ LEGENDARY GOVERNANCE OF RANI MANGAMMAL! She is revered across Tamil Nadu for building pioneering road networks, civic irrigation tanks, and pilgrim welfare shelters that stood for centuries.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Ban all pilgrims from entering Madurai during festivals.",
          "historicalAnalysis": "Banning pilgrims ruins the spiritual and economic life of the ancient city.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "C) Build a wall around the temple and lock the deity away.",
          "historicalAnalysis": "Alienates the citizens and destroys social unity.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "D) Force pilgrims to walk only backward.",
          "historicalAnalysis": "A bizarre rule that would cause even more stampedes.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        }
      ]
    }
  },
  "rani-ki-vav": {
    "id": "rani-ki-vav",
    "monumentName": "Rani ki Vav (The Queen's Stepwell)",
    "state": "Gujarat",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/rani-ki-vav/play?checkpoint=3",
    "checkpointName": "The 7 Terraced Levels of the Underground Temple",
    "landmarkTitle": "The Inverted Temple of Water",
    "riddle": {
      "title": "Riddle of the Inverted Subterranean Palace",
      "text": "Most temples in the world climb high up into the sky. But I am a 7-story grand temple carved 30 meters straight down into the earth, dedicated to the sanctity of pure underground water. What UNESCO heritage marvel am I?",
      "options": [
        "The Sun Temple of Modhera",
        "Rani ki Vav (The Queen's Stepwell of Patan)",
        "The Great Rann Salt Vault",
        "The Lothal Dockyard Chamber"
      ],
      "correctOption": 1,
      "hints": [
        "Built in the 11th Century CE by Queen Udayamati in memory of King Bhima I.",
        "Features over 500 principal sculptures including the Dasavatara of Lord Vishnu."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Queen Udayamati (Chaulukya Dynasty, 1063 CE)",
      "situation": "Gujarat suffers from harsh arid droughts. You want to honor your late husband King Bhima I, not with a useless tomb of vanity, but with a public utility that brings life, cool sanctuary, and sacred water to millions of travelers.",
      "question": "As Queen Udayamati, how do you design Rani ki Vav?",
      "options": [
        {
          "text": "A) Build an inverted 7-story stepwell with stepped pavilions, filtering silt layers, and hundreds of carved avatars of Vishnu resting on the water serpent Sheshanaga.",
          "historicalAnalysis": "⭐ SUPREME FUSION OF UTILITY AND ART! Rani ki Vav was built as an inverted water temple that harvested seasonal Saraswati river groundwater while providing cool subterranean rest areas.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Build a giant gold tower in the desert with no water storage.",
          "historicalAnalysis": "A dry gold tower provides zero relief to thirsty citizens and travelers in the desert.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "C) Pour concrete over all natural water springs.",
          "historicalAnalysis": "Destroys the water table and ruins agriculture.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "D) Forbid common people from touching stepwell water.",
          "historicalAnalysis": "Udayamati built the stepwell specifically for public welfare and charity.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        }
      ]
    }
  },
  "chhatrapati-shivaji-terminus": {
    "id": "chhatrapati-shivaji-terminus",
    "monumentName": "Chhatrapati Shivaji Maharaj Terminus (CST)",
    "state": "Maharashtra",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/chhatrapati-shivaji-terminus/play?checkpoint=3",
    "checkpointName": "The Grand Octagonal Masonry Dome & Stained Glass",
    "landmarkTitle": "The Victorian Gothic-Indian Fusion Dome",
    "riddle": {
      "title": "Riddle of the Fusion Railway Cathedral",
      "text": "I am a UNESCO World Heritage railway terminus combining Victorian Italianate Gothic style with traditional Indian Mughal domes, turrets, and peacock-patterned stained glass. What landmark terminus am I in Mumbai?",
      "options": [
        "Crawford Market Tower",
        "Gateway of India Arch",
        "Bombay High Court Building",
        "Chhatrapati Shivaji Maharaj Terminus (CST / VT)"
      ],
      "correctOption": 3,
      "hints": [
        "Designed by architect F.W. Stevens and completed in 1888.",
        "Surmounted by the 14-foot high stone statue of 'Progress'."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "🏛️ You are Chief Railway Architect F.W. Stevens & Indian Craftsmen Guild (1880 CE)",
      "situation": "You are designing the central railway terminus for Mumbai (then Bombay). Millions of passengers of every class, religion, and trade will pass through every day. The humid coastal climate rusts metal and rots wood rapidly.",
      "question": "What material and architectural choices will you select to create an enduring icon?",
      "options": [
        {
          "text": "A) Combine high-density Malad yellow stone and Porbandar stone with Indian vaulted stone arches, brass animal gargoyles, and cross-ventilating high domes.",
          "historicalAnalysis": "⭐ MASTERPIECE OF INDO-SARACENIC & GOTHIC ENGINEERING! CST has withstood 140+ years of relentless Mumbai monsoons, salt air, and 3+ million daily passengers.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Build the station out of cheap cardboard and cloth tents.",
          "historicalAnalysis": "Tents would blow away in the first Arabian Sea cyclone.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Build a station with only one small door for all 100,000 daily passengers.",
          "historicalAnalysis": "A single door would cause immediate crowd collapse.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Build the train station on the roof of a skyscraper.",
          "historicalAnalysis": "Heavy steam locomotives could not climb skyscraper roofs in 1880.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        }
      ]
    }
  },
  "mysore-palace": {
    "id": "mysore-palace",
    "monumentName": "Mysore Palace (Amba Vilas)",
    "state": "Karnataka",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/mysore-palace/play?checkpoint=3",
    "checkpointName": "The Durbar Hall & Peacock Stained Glass Ceiling",
    "landmarkTitle": "The Hall of 100,000 Golden Lights",
    "riddle": {
      "title": "Riddle of the Fireproof Palace of Lights",
      "text": "The old wooden palace of Mysore burned down during a royal wedding in 1897. When the new Amba Vilas Palace was commissioned, what modern safety material was chosen to ensure the grand palace would never burn down again?",
      "options": [
        "Flammable dry pine wood soaked in kerosene",
        "Solid granite stone blocks and structural steel framing",
        "Dry straw and wax plasters",
        "Compressed newspaper sheets"
      ],
      "correctOption": 1,
      "hints": [
        "Designed by British architect Henry Irwin in Indo-Saracenic style.",
        "Illuminated by nearly 100,000 electric bulbs on festive Dussehra nights."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "👑 You are Maharaja Krishnaraja Wadiyar IV & Maharani Kempananjammanni (Mysore, 1902 CE)",
      "situation": "Your city is modernizing. You are building the new Mysore Palace, but you also want Mysore to become the most progressive welfare state in Asia with electricity, universities, and irrigation.",
      "question": "As Maharaja Krishnaraja Wadiyar IV ('Rajarshi'), what pioneering national projects do you initiate?",
      "options": [
        {
          "text": "A) Build the Shivanasamudra Hydroelectric Plant (Asia's 1st major hydro station) to power the KGF mines and light Mysore, while constructing the KRS Dam and founding Mysore University.",
          "historicalAnalysis": "⭐ GOLDEN AGE OF MYSORE! Maharaja Krishnaraja Wadiyar IV transformed Mysore into a model state (Ramarajya) praised by Mahatma Gandhi, pioneering industrialization, dams, and education.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Spend the entire kingdom's budget on fireworks for one evening.",
          "historicalAnalysis": "Wasting wealth on fireworks causes poverty and state bankruptcy.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Ban all schools and libraries across Karnataka.",
          "historicalAnalysis": "Banning education destroys the kingdom's future.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "D) Forbid the use of electricity and mandate only candles.",
          "historicalAnalysis": "Rejecting electricity prevents modern industrial development.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        }
      ]
    }
  },
  "victoria-memorial": {
    "id": "victoria-memorial",
    "monumentName": "Victoria Memorial, Kolkata",
    "state": "West Bengal",
    "qrCodeString": "https://heritage-final.vercel.app/hunt/victoria-memorial/play?checkpoint=3",
    "checkpointName": "The Angel of Victory & Makrana Marble Dome",
    "landmarkTitle": "The White Marble Icon of the Hooghly",
    "riddle": {
      "title": "Riddle of the Revolving Angel",
      "text": "Perched 184 feet in the air atop my grand white central dome stands a 16-foot tall bronze statue called the 'Angel of Victory'. What functional mechanical secret does this 3-ton statue possess?",
      "options": [
        "It contains an electric radio transmitter built in 1906",
        "It flies into the sky during every solar eclipse",
        "It is made of hollow wood filled with river pigeons",
        "It acts as a weather vane, rotating smoothly with the direction of the wind"
      ],
      "correctOption": 3,
      "hints": [
        "It turns effortlessly on mercury bearings when the wind blows across the Maidan.",
        "It holds a trumpet and laurel wreath."
      ],
      "points": 50
    },
    "povQuestion": {
      "roleTitle": "🏛️ You are Chief Architect William Emerson & Superintendent Vincent Esch (1906 CE)",
      "situation": "You are constructing the gigantic white Makrana marble monument in Kolkata. But the soil of the Kolkata delta is soft, muddy alluvium. Heavy stone structures easily tilt and develop fatal cracks.",
      "question": "What innovative foundation engineering do you deploy to ensure permanent structural stability?",
      "options": [
        {
          "text": "A) Lay a reinforced concrete raft foundation over deep driven pilings, distributing the building's 80,000-ton weight evenly across the soft delta silt.",
          "historicalAnalysis": "⭐ MASTERFUL FOUNDATION ENGINEERING! The massive reinforced concrete raft foundation allowed Victoria Memorial to stand perfectly upright without any settlement cracks for over a century.",
          "isHistoricalChoice": true,
          "xpBonus": 60
        },
        {
          "text": "B) Rest the monument directly on floating logs of banana trees.",
          "historicalAnalysis": "Banana logs rot within weeks under Kolkata's humid delta conditions.",
          "isHistoricalChoice": false,
          "xpBonus": 20
        },
        {
          "text": "C) Use hollow paper blocks instead of marble.",
          "historicalAnalysis": "Paper blocks would melt in the heavy Bengal monsoons.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        },
        {
          "text": "D) Build the foundation out of dry beach sand.",
          "historicalAnalysis": "Dry sand washes away under groundwater pressure.",
          "isHistoricalChoice": false,
          "xpBonus": 25
        }
      ]
    }
  }
};
