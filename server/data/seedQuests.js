module.exports = {
  quests: [
    {
      id: "vijayanagara-royal-seal",
      title: "The Lost Royal Seal",
      subtitle: "Hampi / Vijayanagara Empire",
      location: "Hampi, Karnataka",
      lat: 15.3350,
      lng: 76.4600,
      difficulty: "Easy",
      est_time: "20-30 mins",
      cover_theme: "sandstone",
      intro_1: "Long ago, the golden royal seal of this fort went missing on the night before the king was crowned. Nobody ever found out where it went.",
      intro_2: "Today, you found the first page of the royal writer's secret diary. The rest of the pages are hidden around the fort behind simple clues, stone carvings, and friendly guardians.",
      intro_3: "Visit all 4 checkpoints. Each one gives you a clue piece. Put them together at the end to find where the royal seal is hidden!",
      final_prompt: "Read all four clue pieces together. Where is the royal seal hidden?",
      final_options: [
        "Under the king's golden throne",
        "Behind a loose stone inside the old armoury wall",
        "Buried in the palace flower garden",
        "At the bottom of the deep fort well"
      ],
      final_correct: 1,
      completion_title: "You Found the Royal Seal!",
      completion_body: "Great job! The royal seal was hidden behind the loose stone in the old armoury wall, just as the diary said. You solved the ancient mystery!"
    },
    {
      id: "taj-mahal-hidden-jewel",
      title: "The Emperor's Hidden Jewel",
      subtitle: "The Wonder of White Marble",
      location: "Agra, Uttar Pradesh",
      lat: 27.1751,
      lng: 78.0421,
      difficulty: "Easy",
      est_time: "20-25 mins",
      cover_theme: "parchment",
      intro_1: "Emperor Shah Jahan built the Taj Mahal out of pure white marble. Legend says a special glowing jewel was gifted to the royal court.",
      intro_2: "The head artisan hid clues about this jewel across the gardens, reflecting pools, and carved marble flower walls.",
      intro_3: "Follow 4 simple steps to discover where the jewel was safely kept!",
      final_prompt: "Put the 4 clues together. Where did the artisan place the royal jewel box?",
      final_options: [
        "At the top of the main dome spire",
        "Inside the marble foundation box near the river garden gate",
        "Under the center of the reflecting fountain pool",
        "Inside the southern entry gateway tower"
      ],
      final_correct: 1,
      completion_title: "The Jewel Secret Decoded!",
      completion_body: "Wonderful discovery! You learned how the Taj Mahal's symmetrical gardens and river views keep the memory of history alive."
    },
    {
      id: "qutub-minar-iron-pillar",
      title: "The Mystery of the Iron Pillar",
      subtitle: "Ancient Tower of Delhi",
      location: "New Delhi",
      lat: 28.5245,
      lng: 77.1855,
      difficulty: "Easy",
      est_time: "20-25 mins",
      cover_theme: "torch",
      intro_1: "Standing inside the Qutub complex is a famous 1,600-year-old iron pillar that has never rusted, even after centuries of rain and sun!",
      intro_2: "Ancient blacksmiths and builders left secret marks on the stone towers to test smart explorers.",
      intro_3: "Solve 4 fun tasks to find out how the ancient builders made such strong metal and tall stone towers!",
      final_prompt: "What made the iron pillar stay rust-free and strong for 1,600 years?",
      final_options: [
        "It was painted with golden waterproof paint",
        "A special iron-phosphorus protective layer created by ancient blacksmiths",
        "It was covered in plastic wrap",
        "It was kept inside a glass dome"
      ],
      final_correct: 1,
      completion_title: "Iron Pillar Mystery Solved!",
      completion_body: "Excellent! You learned that ancient Indian blacksmiths created a natural protective coating (called misawite) that stops rust forever."
    },
    {
      id: "golconda-secret-vault",
      title: "The Secret Diamond Vault",
      subtitle: "The Great Hill Fortress",
      location: "Golconda Fort, Hyderabad",
      lat: 17.3833,
      lng: 78.4011,
      difficulty: "Medium",
      est_time: "25-35 mins",
      cover_theme: "emerald",
      intro_1: "Golconda Fort is world-famous for its acoustic clapping gate and dazzling diamonds like the Koh-i-Noor.",
      intro_2: "The fort guards used echoes and sound waves to send secret messages from the bottom gate all the way to the top of the hill.",
      intro_3: "Follow 4 simple sound and marker clues to find where the royal diamond box was stored.",
      final_prompt: "Combining all four clues, where is the secret vault entrance?",
      final_options: [
        "Inside the cannon box at the hilltop",
        "Under the water cistern behind the main hilltop palace",
        "Directly under the front clapping gate",
        "Inside the elephant stables"
      ],
      final_correct: 1,
      completion_title: "The Diamond Vault Found!",
      completion_body: "You discovered the hidden vault under the palace water tank! The clever drainage system kept the treasure safe and cool."
    },
    {
      id: "konark-sun-chariot",
      title: "The Giant Sun Chariot",
      subtitle: "Sun Temple of Surya",
      location: "Konark, Odisha",
      lat: 19.8876,
      lng: 86.0945,
      difficulty: "Easy",
      est_time: "20-30 mins",
      cover_theme: "gold",
      intro_1: "The Konark Sun Temple is built like a gigantic stone chariot with 24 carved wheels and 7 stone horses pulling it toward the sea.",
      intro_2: "Each wheel is a real sun clock! When the sun shines, the wheel's shadow tells the exact time of day.",
      intro_3: "Solve 4 easy steps to find the master builder's secret solar message.",
      final_prompt: "Where did the master builder carve the special golden sun symbol?",
      final_options: [
        "On the sea-facing door step",
        "In the center hub of the 7th dawn wheel",
        "Under the temple dance hall floor",
        "On the back wall of the chariot"
      ],
      final_correct: 1,
      completion_title: "The Sun Clock Decoded!",
      completion_body: "Fantastic! The 7th wheel faces the sunrise, and its spokes show how ancient people told time using only sunlight and shadows."
    },
    {
      id: "mysore-palace-golden-throne",
      title: "The Royal Golden Throne",
      subtitle: "Palace of Lights",
      location: "Mysore, Karnataka",
      lat: 12.3051,
      lng: 76.6551,
      difficulty: "Easy",
      est_time: "20-25 mins",
      cover_theme: "torch",
      intro_1: "Mysore Palace is known as the Palace of Lights, with thousands of glowing bulbs and a famous royal golden throne.",
      intro_2: "During the grand Dasara festival, royal artists created beautiful peacock mosaic floor patterns and painted glass ceilings.",
      intro_3: "Complete 4 simple checkpoints to find where the royal Dasara emblem was crafted.",
      final_prompt: "Where was the golden elephant crest kept before the festival?",
      final_options: [
        "In the palace kitchen garden",
        "Inside the Durbar hall vault behind the carved peacock doors",
        "On the top clock tower roof",
        "Near the main outside vehicle gate"
      ],
      final_correct: 1,
      completion_title: "The Royal Crest Unlocked!",
      completion_body: "Splendid job! You learned about the grand Dasara tradition and the beautiful art of the Mysore royal family."
    }
  ],

  checkpoints: [
    // ----------------------------------------------------
    // Quest 1: Hampi / Vijayanagara
    // ----------------------------------------------------
    {
      id: "cp-v-1",
      quest_id: "vijayanagara-royal-seal",
      order_num: 0,
      name: "The King's Court",
      gate_type: "mcq",
      lat: 15.3355,
      lng: 76.4605,
      radius_meters: 40,
      story: "The diary says: <em>\"Go to the big hall where the king met his people. Look above the main entrance gate.\"</em>",
      task: "Which simple word is written above fort gates across India, which means 'Victory' (like in 'Jai Hind')?",
      hint: "The word starts with the letter 'J' (as in Jai).",
      payload: {
        options: ["Shanti (Peace)", "Jai (Victory)", "Surya (Sun)", "Mitr (Friend)"],
        correctIndex: 1
      },
      fragment: "Clue 1: \"The seal is NOT under the golden throne...\""
    },
    {
      id: "cp-v-2",
      quest_id: "vijayanagara-royal-seal",
      order_num: 1,
      name: "The Mason's Stone Mark",
      gate_type: "qr",
      lat: 15.3360,
      lng: 76.4612,
      radius_meters: 40,
      story: "The diary says: <em>\"The stone builder carved his special secret mark on a pillar near the water well.\"</em>",
      task: "Find the builder's mark by scanning the QR code, or tap the matching code below.",
      hint: "Look for the code with number 108: MASON-108.",
      payload: {
        code: "MASON-108",
        codeOptions: ["MASON-042", "MASON-108", "MASON-071", "MASON-119"]
      },
      fragment: "Clue 2: \"The king trusted the old weapon room (armoury) the most...\""
    },
    {
      id: "cp-v-3",
      quest_id: "vijayanagara-royal-seal",
      order_num: 2,
      name: "The Stone Pattern",
      gate_type: "symbol",
      lat: 15.3368,
      lng: 76.4598,
      radius_meters: 40,
      story: "The diary says: <em>\"Above the doorway, the builders carved shapes in a repeating line.\"</em>",
      task: "Look at the pattern: Diamond, Circle, Diamond, Circle... What shape comes next?",
      hint: "The pattern repeats: ◆ then ○ then ◆ then ○...",
      payload: {
        sequence: ["◆", "○", "◆", "○"],
        options: ["◆ (Diamond)", "○ (Circle)", "△ (Triangle)", "□ (Square)"],
        correctIndex: 0
      },
      fragment: "Clue 3: \"Look for a loose stone on the second row of the wall...\""
    },
    {
      id: "cp-v-4",
      quest_id: "vijayanagara-royal-seal",
      order_num: 3,
      name: "The Friendly Gatekeeper",
      gate_type: "dialogue",
      lat: 15.3372,
      lng: 76.4590,
      radius_meters: 40,
      story: "You meet an old wise gatekeeper standing near the armoury pillars.",
      task: "Answer the gatekeeper's simple question to get the final clue.",
      hint: "Choose the answer that says the king hid it safely himself.",
      payload: {
        portraitNote: "Old Gatekeeper of the Fort",
        lines: [
          "\"Hello young explorer! Many people search for the royal seal.\"",
          "\"Tell me: was the seal stolen by thieves, or hidden safely by the king?\""
        ],
        choices: [
          { text: "It was stolen and taken outside the fort.", correct: false, reply: "\"No, nothing left the fort that night. Think again!\"" },
          { text: "It was hidden safely by the king inside the fort.", correct: true, reply: "\"That is correct! The king kept it safe inside. Here is your final clue!\"" },
          { text: "It was just a fairy tale story.", correct: false, reply: "\"It is real! I have guarded this place for years. Try again!\"" }
        ]
      },
      fragment: "Clue 4: \"The stone is in the armoury wall facing the old well!\""
    },

    // ----------------------------------------------------
    // Quest 2: Taj Mahal
    // ----------------------------------------------------
    {
      id: "cp-t-1",
      quest_id: "taj-mahal-hidden-jewel",
      order_num: 0,
      name: "The Four Gardens",
      gate_type: "mcq",
      lat: 27.1745,
      lng: 78.0418,
      radius_meters: 40,
      story: "The gardens of the Taj Mahal are divided into four equal green squares representing paradise.",
      task: "What is this famous four-part garden design style called in history?",
      hint: "In Hindi and Persian, 'Char' means four and 'Bagh' means garden.",
      payload: {
        options: ["Charbagh (Four Gardens)", "Phoolwari", "Van Vihar", "Panchavati"],
        correctIndex: 0
      },
      fragment: "Taj Clue 1: \"The jewel box is near the cool water flow...\""
    },
    {
      id: "cp-t-2",
      quest_id: "taj-mahal-hidden-jewel",
      order_num: 1,
      name: "The Flower Inlay Stone",
      gate_type: "qr",
      lat: 27.1755,
      lng: 78.0425,
      radius_meters: 40,
      story: "Artists carved beautiful colorful gemstones directly into the white marble walls.",
      task: "Scan the artisan stone marker code or tap the matching one below.",
      hint: "Look for TAJ-FLOWER-99.",
      payload: {
        code: "TAJ-FLOWER-99",
        codeOptions: ["TAJ-FLOWER-12", "TAJ-FLOWER-99", "TAJ-FLOWER-45", "TAJ-FLOWER-70"]
      },
      fragment: "Taj Clue 2: \"Made of pure Makrana white marble...\""
    },
    {
      id: "cp-t-3",
      quest_id: "taj-mahal-hidden-jewel",
      order_num: 2,
      name: "The Mirror Symmetry",
      gate_type: "symbol",
      lat: 27.1750,
      lng: 78.0420,
      radius_meters: 40,
      story: "Everything in the Taj Mahal is perfectly balanced like a mirror reflection on both sides.",
      task: "Complete the mirror reflection sequence: Left, Right, Left, Right...",
      hint: "Left ◀, Right ▶, Left ◀, Right ▶...",
      payload: {
        sequence: ["◀", "▶", "◀", "▶"],
        options: ["◀ (Left Arrow)", "▶ (Right Arrow)", "▲ (Up Arrow)", "▼ (Down Arrow)"],
        correctIndex: 0
      },
      fragment: "Taj Clue 3: \"Near the river bank where the Yamuna flows...\""
    },
    {
      id: "cp-t-4",
      quest_id: "taj-mahal-hidden-jewel",
      order_num: 3,
      name: "The Master Artisan",
      gate_type: "dialogue",
      lat: 27.1748,
      lng: 78.0430,
      radius_meters: 40,
      story: "You meet the spirit of Ustad Ahmad, the chief architect of the monument.",
      task: "Answer why the Taj Mahal was built with four tall minaret towers slightly tilted outward.",
      hint: "They were tilted outward so if an earthquake ever happened, they would fall away from the main dome.",
      payload: {
        portraitNote: "Ustad Ahmad, Master Architect",
        lines: [
          "\"Welcome traveler! We designed every inch with science and art.\"",
          "\"Why did we build the 4 corner towers tilting slightly outward?\""
        ],
        choices: [
          { text: "By accident because the ground was soft.", correct: false, reply: "\"No, we measured every stone to perfection! Try again.\"" },
          { text: "To protect the main dome from damage during earthquakes.", correct: true, reply: "\"Exactly right! It protects the central monument. Here is your final clue!\"" },
          { text: "To make birds fly away.", correct: false, reply: "\"Haha, no! It was built for safety and balance. Try again.\"" }
        ]
      },
      fragment: "Taj Clue 4: \"Inside the marble foundation box near the river garden gate!\""
    },

    // ----------------------------------------------------
    // Quest 3: Qutub Minar
    // ----------------------------------------------------
    {
      id: "cp-q-1",
      quest_id: "qutub-minar-iron-pillar",
      order_num: 0,
      name: "The Tower of Red Stone",
      gate_type: "mcq",
      lat: 28.5242,
      lng: 77.1850,
      radius_meters: 40,
      story: "The Qutub Minar is one of the tallest brick minarets in the world, standing over 72 meters high.",
      task: "What type of natural red stone was primarily used to build this tall tower?",
      hint: "It is called Red ___stone (sandstone).",
      payload: {
        options: ["White Marble", "Red Sandstone", "Black Granite", "Blue Limestone"],
        correctIndex: 1
      },
      fragment: "Qutub Clue 1: \"The iron pillar was forged over 1,600 years ago...\""
    },
    {
      id: "cp-q-2",
      quest_id: "qutub-minar-iron-pillar",
      order_num: 1,
      name: "The Blacksmith's Seal",
      gate_type: "qr",
      lat: 28.5248,
      lng: 77.1858,
      radius_meters: 40,
      story: "The iron pillar has ancient Sanskrit inscriptions written in Gupta Brahmi script.",
      task: "Scan the iron pillar QR marker or tap the code below.",
      hint: "Look for IRON-PILLAR-50.",
      payload: {
        code: "IRON-PILLAR-50",
        codeOptions: ["IRON-PILLAR-10", "IRON-PILLAR-50", "IRON-PILLAR-80", "IRON-PILLAR-99"]
      },
      fragment: "Qutub Clue 2: \"High amount of phosphorus in the iron stopped rust from forming...\""
    },
    {
      id: "cp-q-3",
      quest_id: "qutub-minar-iron-pillar",
      order_num: 2,
      name: "The Balcony Rings",
      gate_type: "symbol",
      lat: 28.5244,
      lng: 77.1852,
      radius_meters: 40,
      story: "The tower has 5 distinct storeys, each marked by beautiful projecting balconies.",
      task: "Count the storeys: 1, 2, 3, 4... What number finishes the tower?",
      hint: "Count up from 1 to 5.",
      payload: {
        sequence: ["①", "②", "③", "④"],
        options: ["⑤ (Storey 5)", "⑥ (Storey 6)", "⑦ (Storey 7)", "⑧ (Storey 8)"],
        correctIndex: 0
      },
      fragment: "Qutub Clue 3: \"Ancient Indian metallurgists used charcoal fire forging...\""
    },
    {
      id: "cp-q-4",
      quest_id: "qutub-minar-iron-pillar",
      order_num: 3,
      name: "The Ancient Scholar",
      gate_type: "dialogue",
      lat: 28.5246,
      lng: 77.1856,
      radius_meters: 40,
      story: "A knowledgeable history guide smiles and greets you in the courtyard.",
      task: "Answer what traditional custom people used to do by wrapping their arms around the pillar backwards.",
      hint: "People believed it brought good luck and granted a wish!",
      payload: {
        portraitNote: "Heritage Guide at the Courtyard",
        lines: [
          "\"People from all over the world come to see this rust-free pillar!\"",
          "\"What did visitors traditionally believe if their hands could touch around the pillar?\""
        ],
        choices: [
          { text: "That they would become a king immediately.", correct: false, reply: "\"Not quite! It was a wish for good fortune and luck.\"" },
          { text: "That it brought good luck and fulfilled a wish.", correct: true, reply: "\"Yes! That was a popular old belief. Here is your final clue!\"" },
          { text: "That the pillar would turn into gold.", correct: false, reply: "\"No, but the science behind it is as valuable as gold! Try again.\"" }
        ]
      },
      fragment: "Qutub Clue 4: \"A natural phosphorus protective layer created by ancient blacksmiths!\""
    },

    // ----------------------------------------------------
    // Quest 4: Golconda Fort
    // ----------------------------------------------------
    {
      id: "cp-g-1",
      quest_id: "golconda-secret-vault",
      order_num: 0,
      name: "The Clapping Gate",
      gate_type: "mcq",
      lat: 17.3825,
      lng: 78.4005,
      radius_meters: 40,
      story: "When you stand under the dome at the main gate (Fateh Darwaza) and clap your hands once, the sound travels all the way to the top of the hill!",
      task: "Why did the fort guards use this clapping sound?",
      hint: "It was an alarm to warn the palace at the top if an enemy arrived.",
      payload: {
        options: [
          "To scare away wild birds",
          "As an acoustic alarm signal to warn the hilltop palace",
          "To call dogs for dinner",
          "To test musical instruments"
        ],
        correctIndex: 1
      },
      fragment: "Vault Clue 1: \"The treasure is not at the front gate...\""
    },
    {
      id: "cp-g-2",
      quest_id: "golconda-secret-vault",
      order_num: 1,
      name: "The Granary Store",
      gate_type: "qr",
      lat: 17.3835,
      lng: 78.4015,
      radius_meters: 40,
      story: "The fort had huge grain rooms so people had food even during long battles.",
      task: "Scan the granary code or tap the matching code below.",
      hint: "Look for GOL-VAULT-7.",
      payload: {
        code: "GOL-VAULT-7",
        codeOptions: ["GOL-VAULT-3", "GOL-VAULT-7", "GOL-VAULT-12", "GOL-VAULT-19"]
      },
      fragment: "Vault Clue 2: \"Water cools the diamonds under the palace...\""
    },
    {
      id: "cp-g-3",
      quest_id: "golconda-secret-vault",
      order_num: 2,
      name: "The Shape of Gems",
      gate_type: "symbol",
      lat: 17.3840,
      lng: 78.4020,
      radius_meters: 40,
      story: "Gem cutters carved shapes with increasing sides: Triangle (3 sides), Square (4 sides), Pentagon (5 sides)...",
      task: "What shape with 6 sides comes next in the diamond cutter sequence?",
      hint: "A hexagon has 6 sides: ⬢",
      payload: {
        sequence: ["▲", "■", "⬟"],
        options: ["⬢ (Hexagon - 6 sides)", "● (Circle)", "★ (Star)", "✦ (Sparkle)"],
        correctIndex: 0
      },
      fragment: "Vault Clue 3: \"Look beneath the large water tank...\""
    },
    {
      id: "cp-g-4",
      quest_id: "golconda-secret-vault",
      order_num: 3,
      name: "The Fort Sentry",
      gate_type: "dialogue",
      lat: 17.3845,
      lng: 78.4010,
      radius_meters: 40,
      story: "You meet an old sentry at the hilltop pavilion overlooking the city.",
      task: "Tell the sentry why Golconda Fort was so famous across the world.",
      hint: "It produced the world's most famous diamonds like Koh-i-Noor!",
      payload: {
        portraitNote: "Hilltop Sentry",
        lines: [
          "\"You have climbed all the way to the top of Golconda!\"",
          "\"What precious treasure made our fortress famous in every land?\""
        ],
        choices: [
          { text: "Spices and silk cloth.", correct: false, reply: "\"We had spices, but something much rarer! Try again.\"" },
          { text: "World-famous diamonds like the Koh-i-Noor.", correct: true, reply: "\"Yes! Our diamond mines were legendary. Take your final clue!\"" },
          { text: "Wooden toys and paper.", correct: false, reply: "\"No, think about sparkling gems! Try again.\"" }
        ]
      },
      fragment: "Vault Clue 4: \"Under the water cistern behind the main hilltop palace!\""
    },

    // ----------------------------------------------------
    // Quest 5: Konark Sun Temple
    // ----------------------------------------------------
    {
      id: "cp-k-1",
      quest_id: "konark-sun-chariot",
      order_num: 0,
      name: "The 24 Sun Wheels",
      gate_type: "mcq",
      lat: 19.8878,
      lng: 86.0940,
      radius_meters: 40,
      story: "The Sun Temple is carved as a giant chariot with 24 big stone wheels pulled by 7 horses.",
      task: "What do the 7 stone horses represent in our calendar?",
      hint: "There are 7 days in a ___ (week).",
      payload: {
        options: [
          "The 7 seas of the world",
          "The 7 days of the week",
          "The 7 mountains of India",
          "The 7 kings of the dynasty"
        ],
        correctIndex: 1
      },
      fragment: "Sun Clue 1: \"The temple chariot faces the morning sunrise...\""
    },
    {
      id: "cp-k-2",
      quest_id: "konark-sun-chariot",
      order_num: 1,
      name: "The Sundial Hub",
      gate_type: "qr",
      lat: 19.8882,
      lng: 86.0948,
      radius_meters: 40,
      story: "Each giant wheel acts as a real clock when the sun casts a shadow from the center spoke.",
      task: "Scan the solar dial QR code or tap the code below.",
      hint: "Look for KNRK-SUN-24.",
      payload: {
        code: "KNRK-SUN-24",
        codeOptions: ["KNRK-SUN-08", "KNRK-SUN-24", "KNRK-SUN-48", "KNRK-SUN-99"]
      },
      fragment: "Sun Clue 2: \"Every wheel spoke measures the hours accurately...\""
    },
    {
      id: "cp-k-3",
      quest_id: "konark-sun-chariot",
      order_num: 2,
      name: "The Solar Spokes",
      gate_type: "symbol",
      lat: 19.8874,
      lng: 86.0952,
      radius_meters: 40,
      story: "Look at the moon and sun phases in the carved sky stone.",
      task: "New Moon 🌑, Half Moon 🌓, Full Moon 🌕... What bright symbol comes at high noon?",
      hint: "The bright glowing Sun: ☀️",
      payload: {
        sequence: ["🌑", "🌓", "🌕"],
        options: ["☀️ (Golden Sun)", "🌧️ (Rain Cloud)", "⭐ (Star)", "❄️ (Snow)"],
        correctIndex: 0
      },
      fragment: "Sun Clue 3: \"Count seven wheels starting from the south...\""
    },
    {
      id: "cp-k-4",
      quest_id: "konark-sun-chariot",
      order_num: 3,
      name: "The Young Builder Dharmapada",
      gate_type: "dialogue",
      lat: 19.8870,
      lng: 86.0942,
      radius_meters: 40,
      story: "You meet the legendary 12-year-old builder Dharmapada.",
      task: "Answer how the young boy helped complete the grand temple.",
      hint: "He placed the heavy top crowning stone that 1,200 artisans could not balance.",
      payload: {
        portraitNote: "Dharmapada, Young Master Builder",
        lines: [
          "\"Twelve hundred stone craftsmen worked for 12 years to build this wonder!\"",
          "\"Do you know how I helped my father finish the highest peak?\""
        ],
        choices: [
          { text: "By bringing paint from the market.", correct: false, reply: "\"No, it was a big structural engineering puzzle! Try again.\"" },
          { text: "By placing the crowning top stone (Kalasa) that balanced the spire.", correct: true, reply: "\"Yes! My design balanced the whole temple. Here is your final clue!\"" },
          { text: "By digging a swimming pool.", correct: false, reply: "\"Haha, no! It was the crowning dome stone. Try again.\"" }
        ]
      },
      fragment: "Sun Clue 4: \"In the center hub of the 7th dawn wheel!\""
    },

    // ----------------------------------------------------
    // Quest 6: Mysore Palace
    // ----------------------------------------------------
    {
      id: "cp-m-1",
      quest_id: "mysore-palace-golden-throne",
      order_num: 0,
      name: "The Durbar Hall",
      gate_type: "mcq",
      lat: 12.3055,
      lng: 76.6555,
      radius_meters: 40,
      story: "Inside Mysore Palace, the grand Durbar hall has colorful stained glass ceilings and golden pillars.",
      task: "Which famous festival is celebrated in Mysore with a royal elephant procession carrying the golden idol?",
      hint: "It is the 10-day grand festival of Dasara (Navratri).",
      payload: {
        options: ["Dasara (Vijayadashami)", "Holi", "Baisakhi", "Onam"],
        correctIndex: 0
      },
      fragment: "Mysore Clue 1: \"The palace glows with 100,000 lights at night...\""
    },
    {
      id: "cp-m-2",
      quest_id: "mysore-palace-golden-throne",
      order_num: 1,
      name: "The Peacock Floor",
      gate_type: "qr",
      lat: 12.3050,
      lng: 76.6548,
      radius_meters: 40,
      story: "In the wedding pavilion, the floor is decorated with glazed mosaic tiles shaped like dancing peacocks.",
      task: "Scan the peacock tile QR marker or tap the code below.",
      hint: "Look for MYS-PEACOCK-88.",
      payload: {
        code: "MYS-PEACOCK-88",
        codeOptions: ["MYS-PEACOCK-22", "MYS-PEACOCK-55", "MYS-PEACOCK-88", "MYS-PEACOCK-99"]
      },
      fragment: "Mysore Clue 2: \"Carved rosewood doors with ivory inlays...\""
    },
    {
      id: "cp-m-3",
      quest_id: "mysore-palace-golden-throne",
      order_num: 2,
      name: "The Royal Colors",
      gate_type: "symbol",
      lat: 12.3058,
      lng: 76.6552,
      radius_meters: 40,
      story: "The stained glass ceilings shine with bright royal jewel colors.",
      task: "Look at the color pattern: Red 🔴, Gold 🟡, Red 🔴, Gold 🟡... What color comes next?",
      hint: "The pattern alternates between Red and Gold.",
      payload: {
        sequence: ["🔴", "🟡", "🔴", "🟡"],
        options: ["🔴 (Royal Red)", "🟡 (Golden Yellow)", "🟢 (Green)", "🟣 (Purple)"],
        correctIndex: 0
      },
      fragment: "Mysore Clue 3: \"Behind the intricately carved peacock doors...\""
    },
    {
      id: "cp-m-4",
      quest_id: "mysore-palace-golden-throne",
      order_num: 3,
      name: "The Royal Guard",
      gate_type: "dialogue",
      lat: 12.3052,
      lng: 76.6558,
      radius_meters: 40,
      story: "A royal palace guard in traditional Mysore Peta (turban) welcomes you.",
      task: "Tell the guard what special throne is assembled only during the Dasara festival.",
      hint: "The Golden Throne (Chinnada Simhasana) made of pure gold and fig wood.",
      payload: {
        portraitNote: "Palace Royal Guard",
        lines: [
          "\"Namaskara! Welcome to the grand City of Palaces.\"",
          "\"Which priceless royal seat is shown only during Dasara?\""
        ],
        choices: [
          { text: "A plastic garden chair.", correct: false, reply: "\"Haha, no! It is an ancient throne of pure gold. Try again!\"" },
          { text: "The sacred Royal Golden Throne (Chinnada Simhasana).", correct: true, reply: "\"Yes! It has been passed down for generations. Here is your final clue!\"" },
          { text: "A wooden study bench.", correct: false, reply: "\"No, think of the golden treasure! Try again.\"" }
        ]
      },
      fragment: "Mysore Clue 4: \"Inside the Durbar hall vault behind the carved peacock doors!\""
    }
  ],

  leaderboard: [
    { quest_id: "vijayanagara-royal-seal", team_name: "Hampi Explorers", score: 640, xp: 640, elapsed_seconds: 240, hints_used: 0, badges_count: 4 },
    { quest_id: "taj-mahal-hidden-jewel", team_name: "Agra Wonder Team", score: 650, xp: 650, elapsed_seconds: 210, hints_used: 0, badges_count: 4 },
    { quest_id: "qutub-minar-iron-pillar", team_name: "Delhi History Club", score: 620, xp: 620, elapsed_seconds: 260, hints_used: 0, badges_count: 4 },
    { quest_id: "golconda-secret-vault", team_name: "Koh-i-Noor Seekers", score: 610, xp: 610, elapsed_seconds: 290, hints_used: 0, badges_count: 4 },
    { quest_id: "konark-sun-chariot", team_name: "Sun Dial Navigators", score: 630, xp: 630, elapsed_seconds: 230, hints_used: 0, badges_count: 4 },
    { quest_id: "mysore-palace-golden-throne", team_name: "Royal Dasara Team", score: 640, xp: 640, elapsed_seconds: 220, hints_used: 0, badges_count: 4 }
  ],

  lore: [
    {
      quest_id: "vijayanagara-royal-seal",
      topic: "Hampi & The Royal Seal",
      keywords: ["seal", "hampi", "vijayanagara", "king", "armoury", "durbar", "jai"],
      content: "Hampi was the capital of the Vijayanagara Empire. The royal seal had symbols of the Sun, Moon, Boar, and Dagger. In this story, the king safely hid the seal behind a loose stone in the strong armoury wall."
    },
    {
      quest_id: "taj-mahal-hidden-jewel",
      topic: "Taj Mahal Architecture & Inlay",
      keywords: ["taj mahal", "agra", "shah jahan", "marble", "jewel", "garden", "charbagh"],
      content: "The Taj Mahal in Agra was built by Shah Jahan using white Makrana marble. Its 4-part garden is called Charbagh. The colorful flower patterns are made of precious stones carved directly into the white marble."
    },
    {
      quest_id: "qutub-minar-iron-pillar",
      topic: "Qutub Minar & The Rust-Free Iron Pillar",
      keywords: ["qutub", "minar", "iron pillar", "delhi", "rust", "sandstone", "blacksmith"],
      content: "The Qutub Minar in Delhi is a 72-meter tall red sandstone tower. The nearby iron pillar is over 1,600 years old and has never rusted because ancient Indian blacksmiths created a natural phosphorus protective layer."
    },
    {
      quest_id: "golconda-secret-vault",
      topic: "Golconda Acoustics & Diamond Mines",
      keywords: ["golconda", "clap", "acoustic", "diamond", "hyderabad", "vault", "nizam"],
      content: "Golconda Fort is famous for its acoustics. A clap at the entry gate can be heard 1 km away at the top palace. Golconda was also the diamond capital where the Koh-i-Noor diamond was found."
    },
    {
      quest_id: "konark-sun-chariot",
      topic: "Konark Sun Temple & Astronomical Wheels",
      keywords: ["konark", "sun", "temple", "wheel", "sundial", "chariot", "dharmapada", "odisha"],
      content: "The Konark Sun Temple in Odisha is built like a giant sun chariot with 24 carved stone wheels. Each wheel is a real sun clock that tells the exact time from the sun's shadow."
    },
    {
      quest_id: "mysore-palace-golden-throne",
      topic: "Mysore Palace & Dasara Festival",
      keywords: ["mysore", "palace", "dasara", "throne", "gold", "peacock", "karnataka"],
      content: "Mysore Palace is famous for its 100,000 glowing evening lights and the grand Dasara festival. The Royal Golden Throne is assembled inside the Durbar hall during this special celebration."
    },
    {
      quest_id: null,
      topic: "How to Play & Points",
      keywords: ["how to play", "points", "hint", "badge", "level", "xp", "demo mode"],
      content: "Each checkpoint solved gives you 100 Points and 100 XP. Completing the final mystery gives 200 Bonus Points. You can ask the AI Guide for simple hints if you get stuck!"
    }
  ]
};
