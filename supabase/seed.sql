-- ====================================================================
-- HERITAGE TREASURE HUNT — SEED DATASET (10 SITES / 50 CHECKPOINTS)
-- ====================================================================

-- 1. INSERT HERITAGE SITES
INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-KA-01', 'Hampi (Group of Monuments)', 'Karnataka', 'Vijayanagara / Ballari',
    'Vijayanagara District, Bellary Region', 15.335, 76.46,
    '14th–16th Century CE', 'Vijayanagara Dravidian', TRUE,
    'Navigate massive boulder terrain, acoustic halls, and monolithic granite wonders in the capital of the Vijayanagara Empire.', 'In 1520 CE, Master Royal Builder Ramappa buried an encrypted granite ledger detailing how the kingdom balanced thousand-ton rocks across temples without modern mortar. A wandering court artist left clues along the sacred river trail to ensure only an observant traveler could reconstruct the blueprint.', 'Hampi was the capital of the Vijayanagara Empire (founded 1336 CE). At its peak under Emperor Krishnadevaraya in the early 16th century, it was the second-largest city in the medieval world after Beijing, housing over 500,000 residents.',
    'The Royal Blueprint is verified: Granite mortise-and-tenon joints combined with gravity-lock architecture allowed Vijayanagara builders to erect 50-meter towers without modern cement!', 'https://images.unsplash.com/photo-1600100397608-f010f421a182?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-KA-02', 'Mysore Palace (Amba Vilas)', 'Karnataka', 'Mysuru',
    'Mysuru City Center', 12.3052, 76.6552,
    '1897–1912 CE', 'Indo-Saracenic / Dravidian / Hoysala', FALSE,
    'Discover stained glass domes, cast-iron colonnades, and the heraldic double-headed bird in the royal seat of the Wadiyar dynasty.', 'Following the Great Fire of 1897, British architect Henry Irwin and the Wadiyar royal family encoded seven symbols of wisdom into the public Durbar halls. Find the hidden double-headed bird across stained glass, cast-iron pillars, and mosaic floors to reconstruct the coronation cipher.', 'Commissioned by Maharani Regent Vani Vilasa and Maharaja Krishnaraja Wadiyar IV, this Indo-Saracenic masterwork was completed in 1912 for 4.1 million rupees.',
    'The Coronation Cipher is solved: The Gandaberunda emblem represents boundless energy, eternal vigilance, and royal patronship of the arts across Karnataka!', 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-KA-03', 'Bengaluru Palace', 'Karnataka', 'Bengaluru',
    'Vasanth Nagar, Bengaluru Urban', 12.9988, 77.5921,
    '1874–1878 CE', 'Tudor Revival / Scottish Gothic', FALSE,
    'Explore medieval battlements, ivy-covered granite towers, Seville tile courtyards, and Victorian woodcarvings.', 'Young King Chamarajendra Wadiyar X was inspired by Windsor Castle during his education. His tutor, Reverend J. Garrett, designed this castle with hidden heraldic woodcarvings and European hunting motifs. Uncover the five family crests to receive the title of Court Seneschal.', 'Built in 1874–1878 by Rev. J. Garrett (Principal of Central College) and acquired by the Mysore royal family. Features Tudor Revival crenellations and unplastered granite.',
    'The Tudor Mystery is decoded: Bengaluru Palace combined English Gothic castle engineering with indigenous Karnataka teak craft, creating a unique royal retreat in the Garden City!', 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-KA-04', 'Chitradurga Fort', 'Karnataka', 'Chitradurga',
    'Chitradurga Hill Citadel', 14.2217, 76.3983,
    '10th–18th Century CE', 'Nayaka military rock-cut', FALSE,
    'Trek through seven concentric fortification rings (Elusuttina Kote), boulder chicanes, gunpowder mills, and rock clefts.', 'In 1779, during the siege of Chitradurga, the fortress commander left behind a defensive map showing how seven concentric walls diverted enemy armies into blind archery alleys. Follow the footsteps of legendary heroine Onake Obavva to uncover the fortress''s water storage secret.', 'Constructed between the 10th and 18th centuries by Rashtrakutas, Chalukyas, Hoysalas, and Chitradurga Nayakas. Features 19 gates, 38 posterns, and 4 interconnected reservoirs.',
    'The Citadel Defense is mastered: Zero-mortar interlocking boulders combined with 20 interconnected rainwater cisterns allowed Chitradurga to hold against multi-year sieges!', 'https://images.unsplash.com/photo-1629814696228-e4b9777f9850?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-KA-05', 'Badami Cave Temples', 'Karnataka', 'Bagalkot',
    'Badami Sandstone Cliffs', 15.9189, 75.6766,
    '6th–8th Century CE', 'Early Chalukyan Rock-Cut', FALSE,
    'Climb red sandstone cliff sanctuaries overlooking Agastya Lake, exploring 81 Nataraja poses and 6th-century royal inscriptions.', 'In 578 CE, Mangalesha, brother of King Kirtivarman I, dedicated Cave 3 to Lord Vishnu. The chief sculptor carved a cipher across the four sandstone cliffs. Identify the gestures of the dancing deity and the celestial serpent to discover the Chalukya royal seal.', 'Badami (ancient Vatapi) was the capital of the Early Chalukya dynasty (540–757 CE). The four rock-cut caves overlook 6th-century Agastya Lake.',
    'The Chalukyan Cipher is resolved: Subtractive rock architecture in red sandstone provided natural earthquake resistance and preserved 6th-century mineral pigments for over 1,400 years!', 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-KA-08', 'Belur (Chennakeshava Temple)', 'Karnataka', 'Hassan',
    'Belur Temple Town', 13.1625, 75.8596,
    '1117 CE (Hoysala)', 'Karnata Dravida (Chloritic Schist)', TRUE,
    'Marvel at 42 Madanika bracket figures, 650 unique foundation elephants, and undercut soapstone filigree on a star-shaped platform.', 'In 1117 CE, King Vishnuvardhana and master sculptor Jakanachari built this temple to celebrate a victory. Jakanachari signed his name on the bracket figures (Madanikas), challenging future artists to discover which bracket figure holds a parrot that listens to royal court secrets.', 'Commissioned by Hoysala King Vishnuvardhana in 1117 CE to celebrate victory over the Cholas at Talakad; took 103 years to finish using chloritic schist (soapstone).',
    'The Hoysala Legacy is revealed: Chloritic schist (soapstone) allowed master sculptors Dasoja and Chavana to achieve undercut filigree detail rivaling carved ivory!', 'https://images.unsplash.com/photo-1609766418204-94aae0ecfddc?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-UP-01', 'Taj Mahal Complex', 'Uttar Pradesh', 'Agra',
    'Agra, Yamuna Riverfront', 27.1751, 78.0421,
    '1631–1648 CE', 'Mughal High Imperial', TRUE,
    'Decode optical perspective illusions, outward-leaning minarets, Parchin Kari gemstone inlays, and Persian Charbagh geometry.', 'Chief Imperial Calligrapher Amanat Khan signed his work across the marble arches of the Taj Mahal, leaving intentional visual clues so that the calligraphy appears identical in size from the ground to the top of the arch. Follow his layout guides to discover the imperial design cipher.', 'Commissioned in 1631 by Mughal Emperor Shah Jahan for Mumtaz Mahal; designed by Ustad Ahmad Lahori with Makrana marble and 28 gemstone varieties.',
    'The Optical Secret of the Taj is mastered: Dynamic font scaling, outward minaret tilt, and Charbagh water canals unite science with imperial aesthetics!', 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-DL-02', 'Red Fort (Lal Qila)', 'Delhi', 'Old Delhi',
    'Netaji Subhash Marg, Chandni Chowk', 28.6562, 77.241,
    '1638–1648 CE', 'Mughal Imperial Architecture', TRUE,
    'Follow the Stream of Paradise (Nahar-i-Bihisht) through vaulted covered bazaars, audience halls, and the Peacock Throne dais.', 'In 1648, during the inauguration of the new imperial capital of Shahjahanabad, an embroidered falcon ornament went missing from the Peacock Throne in the Diwan-i-Khas. Follow the Stream of Paradise through the palaces to recover the lost imperial token.', 'Commissioned by Emperor Shah Jahan in 1638 when shifting capital to Delhi; 2.4 km red sandstone ramparts served as political seat for nearly 200 years.',
    'The Falcon Token is recovered: Shahjahanabad''s indoor water canals combined Persian cooling engineering with Italian-style Pietra Dura marble work!', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-GJ-01', 'Rani ki Vav (The Queen’s Stepwell)', 'Gujarat', 'Patan',
    'Patan, Northern Gujarat', 23.8589, 72.1018,
    '11th Century CE', 'Maru-Gurjara Inverted Temple Stepwell', TRUE,
    'Descend seven subterranean terrace levels underground to uncover 500+ Vishnu sculptures and water level engineering.', 'In 1063 CE, Queen Udayamati commissioned this subterranean sanctuary honoring water and devotion. Seven levels underground, master carvers hid an encrypted register of water levels. Trace the 24 forms of Vishnu to find the submerged marker before the desert sands cover it again.', 'Built by Queen Udayamati during the Solanki dynasty in memory of King Bhima I. Silted over for 700 years by the Saraswati River until excavated in 1980s.',
    'The Water Sanctuary is deciphered: Seven descending pavilion tiers acted as structural struts against desert soil pressure while keeping water sacred and cool!', 'https://images.unsplash.com/photo-1599818816942-83b6b19a31a6?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

INSERT INTO heritage_sites (
    site_id, site_name, state, city, location_desc, latitude, longitude,
    historical_period, architectural_style, unesco_status, description,
    story, historical_fact, final_secret, cover_image_url
  ) VALUES (
    'IN-TN-01', 'Brihadeeswarar Temple (Peruvudayar Kovil)', 'Tamil Nadu', 'Thanjavur',
    'Thanjavur Temple Complex', 10.7828, 79.1318,
    '1003–1010 CE (Chola)', 'Pure Dravidian Granite Monolithic', TRUE,
    'Explore Rajaraja Chola''s 216-foot granite Vimana, the 80-ton monolithic Kumbam, a 25-ton Nandi, and Tamil public wage inscriptions.', 'In 1010 CE, Emperor Rajaraja Chola I dedicated this grand granite temple upon completing 25 years of his reign. The chief architect inscribed a spatial riddle detailing how an 80-ton single granite block was hauled to the apex of the 216-foot vimana. Follow the inscriptions along the base to reveal the engineering marvel.', 'Completed in 1010 CE; over 130,000 tons of granite were brought by river rafts in a delta region where no granite naturally exists within 50 km.',
    'The Chola Marvel is unlocked: A 4-kilometer inclined earthen ramp from Sarapallam allowed elephant teams to roll the 80-ton monolithic Kumbam to the summit of the 216-foot Vimana!', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80'
  ) ON CONFLICT (site_id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

-- 2. INSERT TREASURE HUNTS
INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-KA-01', 'IN-KA-01', 'The Royal Architect’s Granite Ledger',
    'Medium', '75 mins', '1.8 km',
    'Families & Students', 1000, 'Vidyaranya',
    'Apprentice Mason (Age 14)', '🧱', 'Namaskara, explorer! Look around you—every boulder here was shaped with iron wedges and wooden pegs soaked in water. Keep your eyes on the ground and pillars; the stones speak if you know how to count their chisel marks!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-KA-02', 'IN-KA-02', 'The Maharaja’s Secret Durbar Crest',
    'Medium', '60 mins', '1.2 km',
    'Families & Art Enthusiasts', 1000, 'Kamala',
    'Court Scribe', '🦚', 'Welcome to Amba Vilas! Step carefully over our peacock mosaics. The Palace holds over 145 varieties of royal craftsmanship—look up at the ceilings and down at the floor tiles!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-KA-03', 'IN-KA-03', 'The Tudor Castle of Bangalore',
    'Easy', '50 mins', '0.8 km',
    'Students & Families', 1000, 'Arthur',
    'The Watchman', '🏰', 'Halt, traveler! You may think you are in medieval Berkshire, but you are standing in the heart of Bengaluru! Check your compass—we have towers to inspect!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-KA-04', 'IN-KA-04', 'The Seven-Fold Stone Trap',
    'Hard', '90 mins', '2.5 km',
    'Trekkers & Active Youth', 1000, 'Veera',
    'Fortress Watcher', '🛡️', 'Watch your step on this granite! You are walking inside the Seven-Ringed Fortress. Enemy soldiers who stepped here never found their way out. Keep your eyes sharp for blind turns and water channels!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-KA-05', 'IN-KA-05', 'The Cliff-Cut Secrets of the Chalukyas',
    'Medium', '75 mins', '1.2 km',
    'All Ages', 1000, 'Rupa',
    'Sculptor’s Apprentice', '🗿', 'Look at this cliff! Most people see just red sandstone. But 1,400 years ago, our master masons saw temples sleeping inside the mountain. Climb with me and watch the rock turn into dance!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-KA-08', 'IN-KA-08', 'The Jewel Box of Soapstone',
    'Medium', '75 mins', '0.8 km',
    'Art Lovers & Students', 1000, 'Shilpi Jakanachari',
    'Master Sculptor', '✨', 'Touch nothing with your hands, but touch everything with your eyes! See how this soapstone bends like wax beneath our chisels? Look for my bracket dancers beneath the roof eaves—each has a story to tell!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-UP-01', 'IN-UP-01', 'The Symphony of White Marble',
    'Medium', '75 mins', '1.5 km',
    'All Ages', 1000, 'Amanat',
    'Imperial Scribe', '🖋️', 'Salam, traveler! You see marble and gardens; I see geometry and optical measurements! Notice how the letters of our inscriptions look uniform from where you stand? Let me show you how we fooled the human eye!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-DL-02', 'IN-DL-02', 'The Emperor’s Golden Falcon',
    'Medium', '60 mins', '1.4 km',
    'Students & Families', 1000, 'Darab',
    'Imperial Courtier', '🦅', 'Welcome to the seat of the Mughal Empire! Step through the covered bazaar of Chhatta Chowk. Keep your ears open for the sound of water—our palaces were built around a flowing indoor stream!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-GJ-01', 'IN-GJ-01', 'The Inverted Subterranean Temple',
    'Medium', '75 mins', '0.6 km',
    'All Ages', 1000, 'Udaya',
    'Water Warden', '💧', 'Descend with me beneath the earth! Most monuments reach toward the clouds, but here in arid Patan, life comes from deep underground. Watch the sunlight dance across the tiers as we climb down!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

INSERT INTO treasure_hunts (
    hunt_id, site_id, hunt_title, difficulty, estimated_duration,
    trail_distance, age_group, total_points, guide_name, guide_role,
    guide_avatar, guide_greeting
  ) VALUES (
    'HUNT-IN-TN-01', 'IN-TN-01', 'The Granite Titan of the Cholas',
    'Medium', '75 mins', '1.0 km',
    'Students & Architecture Enthusiasts', 1000, 'Arul',
    'Chola Stone Mason', '🔱', 'Vanakkam, seeker! You are standing before the Big Temple of Thanjavur. Notice something strange? Look at the fertile soil under your feet—there are no rocky hills here! Every ounce of this granite was brought from far away by river rafts and elephants!'
  ) ON CONFLICT (hunt_id) DO UPDATE SET
    hunt_title = EXCLUDED.hunt_title;

-- 3. INSERT CHECKPOINTS
INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-01-1', 'HUNT-IN-KA-01', 1, 'Sasivekalu Ganesha',
      'South of Hemakuta Hill', 15.3318, 76.4597,
      35, 'Begin your quest on the low hill where a giant sits protected beneath an open stone pavilion, cradling a belly bound by a snake.', 'I was born from a single stone that was never moved from its birthplace. My belly is full, a snake serves as my belt, and though my name means a tiny mustard seed, I stand over eight feet tall. Look behind me: whose lap am I sitting on?',
      ARRAY['a woman', 'woman', 'goddess parvati', 'parvati', 'his mother', 'mother', 'devi']::TEXT[], 'Walk completely around the back of the open pillared pavilion.', 'The statue represents Lord Ganesha, but look closely at the rear side of the carving to see a woman''s torso and arms holding him from behind.',
      'Step to the back of the shrine. Count how many arms are visible across the entire monolithic sculpture.', 'Why did ancient stonecutters choose living boulders instead of carrying stones from far away?',
      'Boulders already anchored to bedrock resisted earthquakes and saved years of transport labor!', 'Carved out of a single enormous monolithic boulder in 1506 CE, funded by a merchant from Chandragiri to honor King Narasimha II.',
      100, 'Monolith Tracker', 'HAMPI-GANE-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-01-2', 'HUNT-IN-KA-01', 2, 'Virupaksha Temple Eastern Gopuram',
      'Hampi Main Bazaar Complex', 15.3355, 76.4596,
      35, 'Walk down the stone bazaar to the soaring 9-story gateway where temple banners flutter and painted elephants pass.', 'Nine steps to heaven made of brick and wood, standing over the river path where merchants once stood. Step into the rear hall where daylight turns upside down. What magical picture appears on the wall without paint or ink?',
      ARRAY['inverted shadow', 'inverted shadow of the tower', 'pinhole camera effect', 'upside down gopuram', 'camera obscura', 'shadow', 'upside down shadow']::TEXT[], 'Walk past the main courtyard into a small chamber at the rear north-western corner.', 'Look at the whitewashed wall opposite a tiny triangular opening in the stone masonry during morning and midday.',
      'Find the ceiling painting in the Ranga Mandapa. Spot the panel depicting the sage Vidyaranya traveling in a palanquin.', 'How does an inverted image appear without any glass lens?',
      'The pinhole camera (camera obscura) principle: light rays from the top and bottom of the tower cross through a tiny opening and project upside down!', 'Dedicated to Virupaksha (Shiva), this temple has functioned without interruption since the 7th century CE. The 9-tiered eastern gateway rises 52 meters.',
      150, 'Optics Historian', 'HAMPI-GOPUR-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-01-3', 'HUNT-IN-KA-01', 3, 'The King’s Balance (Tulabhara)',
      'Riverside Churning Pillars', 15.3392, 76.4719,
      35, 'Head toward the rocky river bend where two tall stone posts hold a crossbeam with three metal loops, but carry no roof.', 'Two stone pillars hold a sky-high beam, standing right beside the river''s rushing stream. Kings sat here to balance their worth in gold and grain. Count the circular rings carved on the crossbeam above your head.',
      ARRAY['3', 'three', '3 rings', 'three rings', 'three loops']::TEXT[], 'Look straight up at the underside of the horizontal stone lintel resting atop the two pillars.', 'The suspension rings were cast from stone and iron to hold the massive ropes of the royal balance.',
      'Look at the outer face of the right pillar near eye level to spot the tiny royal royal-crest carving.', 'What happened to the wealth weighed on this balance?',
      'It was distributed as charity to public welfare programs, monasteries, universities, and temple trusts.', 'Known as Tula-Purusha-Dana monument, this 5-meter-tall granite frame was used on coronation days or solar eclipses to weigh the Emperor in gold for public distribution.',
      150, 'Royal Appraiser', 'HAMPI-TULA-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-01-4', 'HUNT-IN-KA-01', 4, 'The Pushkarani (Stepped Water Tank)',
      'Royal Enclosure', 15.319, 76.4705,
      40, 'Find the sunken jewel of the royal quarter, where black polished steps drop down into the earth like an inverted stepped pyramid.', 'I do not climb toward the sky; I descend into the earth step by step. Made of dark polished stone with geometric symmetry, water once flowed to me along stone bridges overhead. What shape do my stepped tiers form as they drop down?',
      ARRAY['stepped pyramid', 'inverted pyramid', 'concentric squares', 'geometric tiers', 'pyramid', 'square pyramid']::TEXT[], 'Observe how each descending row of schist steps is shaped like an inverted flight of stairs.', 'Notice that the design consists of self-repeating triangular and stepped square silhouettes.',
      'Follow the stone channel leading to the tank. Locate the stone spout shaped like a mythical crocodile (Makara).', 'Why were masonry stones inscribed with mason marks on their rear faces?',
      'Stone blocks were cut off-site; masons marked numbers so assembly crews at Hampi knew their exact placement!', 'Excavated in the 1980s by the ASI, this black schist stepped tank was prefabricated with numbered blocks and assembled with a gravity-fed aqueduct.',
      200, 'Hydraulic Engineer', 'HAMPI-PUSH-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-01-5', 'HUNT-IN-KA-01', 5, 'Vittala Temple Stone Chariot',
      'Garuda Shrine, Vittala Complex', 15.3421, 76.4789,
      35, 'Stand before the pride of the empire, featured on modern Indian currency, where stone turns to wheels and wood turns to rock.', 'I look like a chariot ready to roll into the heavens, but my four wheels are pinned with granite pins. Two small elephants stand at my front stairs, but long ago, who was originally carved to pull my reins?',
      ARRAY['horses', 'horse', 'two horses', 'stone horses']::TEXT[], 'Look closely at the small elephants at the front ramp—they were brought here later from another temple ruin.', 'Behind the elephants, look for the tails and broken legs of the original carved animals.',
      'Do NOT tap the protected musical pillars. Instead, look at the base of the Stone Chariot wheels: identify the floral petal carvings etched on the spokes.', 'Which Indian currency note features this exact Stone Chariot?',
      'The new Indian 50 Rupee note (fluorescent blue color) features the Hampi Stone Chariot on the reverse!', 'Built in the 16th century dedicated to Garuda. Built of modular granite blocks interlocked with mortise-and-tenon joints; its stone wheels originally rotated freely on axles.',
      300, 'Master of Vijayanagara', 'HAMPI-CHAR-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-02-1', 'HUNT-IN-KA-02', 1, 'Gombe Thotti (Dolls’ Pavilion)',
      'Ground Floor Entrance Gallery', 12.3051, 76.655,
      30, 'Begin where court artisans showcased festive miniature figures, guarding the golden carrier that once rode atop royal tuskers.', 'I carried kings atop giants during the grand festival of Dasara. Cast in eighty-four kilograms of gleaming yellow metal, I feature delicate filigree patterns. What great royal beast carried me through the streets?',
      ARRAY['elephant', 'elephants', 'royal elephant', 'tusker', 'jumboo']::TEXT[], 'Look at the central glass enclosure holding the ceremonial palanquin seat.', 'Think of the gentle giant leading the Jamboo Savari procession every October.',
      'Look at the wooden model of the old wooden palace displayed nearby. What destroyed the original structure in 1897?', 'How much gold was used to craft the royal Howdah?',
      'Approximately 84 kilograms of pure 24-karat gold plating over a teakwood core.', 'Houses a traditional gallery of Dasara dolls and ceremonial objects, including an 84-kg gold Howdah embedded with gemstones.',
      100, 'Golden Procession Scout', 'MYS-GOMBE-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-02-2', 'HUNT-IN-KA-02', 2, 'Kalyana Mantapa (Marriage Pavilion)',
      'Octagonal Central Hall', 12.3053, 76.6552,
      30, 'Step beneath the stained-glass sky where the sun paints the floor in peacock colors of blue, turquoise, and green.', 'Look up toward the vaulted octagonal dome: iron tracery from Scotland holds colorful glass from Europe. Look down to the floor: what magnificent dancing bird with open feathers is frozen in tile beneath your feet?',
      ARRAY['peacock', 'peacocks', 'indian peacock', 'mayura']::TEXT[], 'Check the center of the octagonal ceramic floor mosaic.', 'The bird is India''s national bird, known for its iridescent blue-green plumage.',
      'Look at the wall murals surrounding the hall. Find a painting where you can clearly see the face of Maharaja Krishnaraja Wadiyar IV.', 'Why was cast-iron used extensively in this pavilion?',
      'Cast-iron allowed high-strength structural stability while opening up large interior spaces without bulky stone walls.', 'Designed as an octagonal hall with a stained glass ceiling crafted by Walter Macfarlane & Co. of Glasgow, Scotland with Italian glazed tiles.',
      150, 'Stained Glass Cipher', 'MYS-KALYAN-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-02-3', 'HUNT-IN-KA-02', 3, 'The Public Durbar Hall (Diwan-i-Aam)',
      'Second Floor East Colonnade', 12.3055, 76.6554,
      30, 'Climb to the high breezy hall that overlooks the parade grounds, supported by a forest of sculpted green-and-gold pillars.', 'Stand at the threshold of the giant open hall. Look through the rows of painted columns—they frame the parade grounds below like an infinite mirror. What mythical beast with a lion''s body and elephant''s head guards the pillar brackets?',
      ARRAY['yali', 'vyala', 'yalis', 'yaali']::TEXT[], 'Look at the carved brackets supporting the arches above each column capital.', 'In South Indian temple and palace architecture, this composite creature combines the features of an elephant, lion, and serpent.',
      'Look out across the palace grounds from the central arch. Find the clock tower standing in the distance.', 'Why does the open hall face east?',
      'To catch the cooling morning breeze, keep out the hot afternoon sun, and allow the king to review morning parades.', 'A 42m long columned hall opening onto palace grounds, engineered with British structural steel beams without internal load-bearing walls.',
      200, 'Durbar Commander', 'MYS-DURBAR-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-02-4', 'HUNT-IN-KA-02', 4, 'The Private Durbar Hall (Ambavilasa)',
      'First Floor Southern Wing', 12.3052, 76.6551,
      30, 'Walk into the quiet chamber where dark rosewood meets silver leaf and crystal chandeliers hang like frozen waterfalls.', 'Two heads look in opposite directions from one feathered body, holding mythical elephants in each of its talons. What is the name of this legendary royal emblem carved on the doorway above you?',
      ARRAY['gandaberunda', 'two-headed eagle', 'two headed bird', 'double headed eagle', 'ganda berunda']::TEXT[], 'It is the official state emblem of Karnataka today.', 'Look above the silver lintel of the central rosewood doorway.',
      'Look closely at the rosewood doors. Identify the floral ivory and mother-of-pearl inlay work without touching the surface.', 'What does the two-headed bird symbolize in Karnataka heraldry?',
      'Enormous strength, supreme vigilance, and the ability to foresee danger coming from all directions.', 'Used for private ministerial audiences; features mother-of-pearl rosewood inlay, carved teak ceilings, silver doors, and Belgian crystal chandeliers.',
      250, 'Royal Keeper of the Seal', 'MYS-AMBA-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-02-5', 'HUNT-IN-KA-02', 5, 'The Outer Palace Illumination Perimeter',
      'Palace North-East Grounds', 12.306, 76.6558,
      45, 'Step out into the broad garden lawns, look back at the grand palace towers, and examine the brass power conduits along the wall.', 'By day, my grey granite domes look quiet and stoic, but on festival nights, I burst into golden light like a sky full of stars. How many light bulbs cover my walls—nearly ten thousand, fifty thousand, or nearly one hundred thousand?',
      ARRAY['nearly one hundred thousand', '100000', '100,000', '97000', '97,000', 'one hundred thousand', '1 lakh']::TEXT[], 'Think of the largest round number close to a lakh!', 'The exact official figure cited is around 97,000 to 100,000 incandescent bulbs.',
      'Find the marble statue of Maharaja Chamarajendra Wadiyar X standing under a canopy on the outer grounds.', 'Where did the electricity come from when the palace was first illuminated in the early 20th century?',
      'From Shivanasamudra Falls—Asia''s first major commercial hydroelectric power plant, built in 1902!', 'The palace facade is wired with ~97,000 incandescent bulbs. Mysuru was among the first princely states in Asia with commercial hydro-power.',
      300, 'Wadiyar Luminary', 'MYS-ILLUM-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-03-1', 'HUNT-IN-KA-03', 1, 'North Fortified Entrance & Turrets',
      'Main Exterior Driveway', 12.9985, 77.592,
      35, 'Stand on the cobblestone entry driveway and look up at the square stone battlements and ivy-draped circular watchtowers.', 'I look like a fortress built for medieval archers, with notched walls called crenellations and round towers that watch the sky. But I was built in the 1870s for royal living, not war! What famous English castle was my design modeled after?',
      ARRAY['windsor castle', 'windsor', 'windsor castle england']::TEXT[], 'It is the official royal residence of the British monarchy located in Berkshire.', 'It begins with the letter ''W''.',
      'Look at the round turret on the left side: count how many arrow slit windows you can observe from the front drive.', 'What plant covers the granite facade of Bengaluru Palace?',
      'English Ivy (Hedera helix), planted intentionally to replicate the look of British country estates.', 'Built with unplastered grey granite ashlar blocks with machicolations, circular turrets, and Norman crenellations.',
      100, 'Tudor Explorer', 'BLR-TURRET-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-03-2', 'HUNT-IN-KA-03', 2, 'The Open Courtyard (Spanish Fountain)',
      'Central Quadrangle', 12.9988, 77.5922,
      30, 'Leave the stone exterior and walk into the open-air courtyard where Mediterranean colors shine under the Bangalore sky.', 'Look at the tiles beneath your boots—they did not come from Karnataka or England, but traveled across the sea from a sunny Mediterranean country famous for flamenco dancing. What European country made these colorful courtyard tiles?',
      ARRAY['spain', 'seville spain', 'seville', 'spanish']::TEXT[], 'Think of the Iberian peninsula where Madrid and Barcelona are located.', 'The ceramic style is often called Hispano-Moresque or Seville tilework.',
      'Find the ceramic bench along the courtyard wall. What animal head forms the arms of the iron garden chairs?', 'Why did the architect design an open-air courtyard in the palace core?',
      'To harness Bengaluru''s pleasant, temperate micro-climate for natural cross-ventilation.', 'Paved with hand-painted glazed ceramic tiles imported from Seville, Spain, centering on a Victorian cast-iron fountain.',
      150, 'Moorish Tile Decrypter', 'BLR-FOUNT-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-03-3', 'HUNT-IN-KA-03', 3, 'The Grand Staircase & Trophy Hall',
      'Ground Floor Foyer', 12.9989, 77.5921,
      30, 'Approach the sweeping wooden steps where life-sized paintings watch your ascent toward the high state rooms.', 'I spiral upward from the ground floor, made from solid Indian teak without a single steel nail in my oldest joins. Carved lions and heraldic crests protect my banister. What majestic African mammal''s mounted head watches visitors from the high wall above?',
      ARRAY['elephant', 'elephants', 'african elephant', 'elephant head']::TEXT[], 'Look up at the taxidermy hunting trophies mounted on the staircase wall.', 'Look for the massive tusked animal displayed in the stairwell gallery.',
      'Look at the wooden posts at the bottom of the handrail. Count how many carved lion figures guard the first step.', 'What is the primary wood used in the grand staircase?',
      'Teakwood (Tectona grandis), chosen for its resilience against humidity, insects, and seasonal cracking.', 'Constructed of indigenous teakwood and rosewood with animal forms, heraldic shields, and Ravi Varma style oil paintings.',
      200, 'Master Joiner', 'BLR-STAIR-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-03-4', 'HUNT-IN-KA-03', 4, 'The Durbar Hall (First Floor)',
      'First Floor Central Reception', 12.999, 77.5922,
      30, 'Enter the dramatic yellow hall on the upper floor where crystal chandeliers catch the morning sun.', 'Look toward the rear wall of the great hall. A dark, elaborately carved wooden balcony with lattice screens overlooks the room. Who sat behind this screen to watch ceremonies while remaining completely unseen?',
      ARRAY['royal women', 'maharanis', 'queens', 'purdah ladies', 'women', 'royal ladies', 'ladies']::TEXT[], 'Think of the historic custom where royal women observed assemblies behind protective screens.', 'The wooden lattice (jaali) structure is called a Purdah or Zenana viewing gallery.',
      'Locate the massive stained-glass panel on the eastern window wall. Identify the European coats of arms depicted in the center.', 'Why are the stained glass window colors in this hall primarily canary yellow and deep crimson?',
      'Yellow and red are the historic royal colors of the Mysore Wadiyar dynasty (as seen on the state flag).', 'Features gothic arched leaded stained glass windows, yellow and red stenciling, Belgian crystal chandeliers, and a carved Purdah Jharokha.',
      250, 'Durbar Sovereign', 'BLR-DURBAR-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-03-5', 'HUNT-IN-KA-03', 5, 'The Glass-Paned Verandah & Garden Turret',
      'Western Pavilion', 12.9987, 77.5919,
      35, 'Walk to the sunlit conservatory corridor lined with glass panes looking out over the sprawling green trees.', 'Step into the long sun-room where walls of glass invite the park trees inside. Find the ornamental cast-iron columns supporting the glass roof: what botanical shape do their capital heads imitate?',
      ARRAY['lotus', 'lotus flower', 'acanthus leaf', 'flower', 'leaves', 'plants']::TEXT[], 'Look at the very top of each green-painted iron column where it meets the ceiling.', 'It depicts overlapping plant leaves or a blooming water flower.',
      'Look through the western windows toward the lawn. Identify the stone tower that resembles a castle keep.', 'What major botanical landmark in Bengaluru was developed during the same royal period?',
      'Lalbagh Botanical Garden, expanded under Hyder Ali, Tipu Sultan, and later the Mysore royal state!', 'Enclosed glass verandah built to capture afternoon light, containing ornamental mirrors and park views.',
      300, 'Knight of Bangalore', 'BLR-GLASS-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-04-1', 'HUNT-IN-KA-04', 1, 'Rangayyana Bagilu (Outer Gateway)',
      'Lower Entrance Archway', 14.2215, 76.4022,
      35, 'Stand at the first defensive stone gate and look at the path you walked to reach it.', 'Look at the gateway ahead of you: no matter how fast enemy war elephants charged, they could not run straight into my wooden doors. Why? Because the path takes a sharp ninety-degree turn right before my entrance! What animal was this sharp turn designed to slow down?',
      ARRAY['war elephants', 'elephants', 'elephant', 'war elephant']::TEXT[], 'These giant pachyderms were used in ancient Indian warfare as battering rams.', 'Elephants need a long, straight running distance to gain enough momentum to break fortified gates.',
      'Look at the granite door frame at the entrance gate. Spot the carved relief of Lord Hanuman protecting the threshold.', 'How many concentric rings of defensive walls make up Chitradurga Fort?',
      'Seven rings of stone walls (Elusuttina Kote), with three lower rings in the town and four rings on the granite hill!', 'Engineered with overlapping ramparts and 90-degree chicanes to deny charging momentum to attacking war elephants.',
      100, 'Gate Sentry', 'CHITRA-GATE-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-04-2', 'HUNT-IN-KA-04', 2, 'The Winding Chicanes & Archer Ports',
      'Second and Third Wall Corridors', 14.2218, 76.4005,
      35, 'Climb along the high corridor where tall granite ramparts hem you in on both sides, cutting off the view of the horizon.', 'Look up at the stone battlements above your head. You will see narrow vertical holes chiseled through the stone. Some point far away, some point close, and some point straight down at the ground. What were soldiers dropping through the straight-down openings onto attackers?',
      ARRAY['boiling oil', 'hot oil', 'boulders', 'hot water', 'burning oil', 'oil']::TEXT[], 'When invaders broke through the outer gate, defenders dropped this scalding liquid from above.', 'It is a burning liquid used for frying food and fueling lamps.',
      'Find a stone embrasure along the inner wall. Look through it safely—confirm how much of the path below is visible while keeping your head protected.', 'Why did ancient forts have curved, serpentine entrance routes instead of straight paths?',
      'To blind attackers, disorient enemy formations, and expose their unshielded right flanks to defenders standing atop the walls.', 'Features angled loopholes cut for three distinct trajectories: long-range musket fire, medium arrow flight, and vertical slots for boiling liquids.',
      150, 'Rampart Tactician', 'CHITRA-RAMP-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-04-3', 'HUNT-IN-KA-04', 3, 'The Gunpowder Grinding Mill',
      'Intermediate Open Terrace', 14.2223, 76.3978,
      35, 'Reach the flat terrace where four massive circular stone wheels sit flat on the ground around a central socket.', 'Four massive round millstones sit in a circular granite trough. We did not grind wheat or ragi for the king''s bread; we ground black powder that went into cannons with a fiery flash! What dangerous explosive powder did we create?',
      ARRAY['gunpowder', 'black powder', 'gun powder', 'explosive powder']::TEXT[], 'It smells of sulfur and fuels muskets and artillery cannons.', 'European and Indian armies relied on this chemical mixture from the 15th to 19th centuries.',
      'Inspect the central granite axle hole. Measure how many hand spans wide the central pivot socket is.', 'What three ingredients make up historic black gunpowder?',
      'Charcoal, sulfur, and saltpeter (potassium nitrate).', 'A circular grinding apparatus with four massive granite millstones connected to a central wooden axle pivot, operated by bullocks.',
      200, 'Artillery Chemist', 'CHITRA-GUN-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-04-4', 'HUNT-IN-KA-04', 4, 'Onake Obavva’s Cleft (Obavvana Kindi)',
      'Upper Western Rampart', 14.223, 76.3956,
      35, 'Walk to the narrow rocky split in the upper cliff where a low boulder opening leads down the cliffside.', 'A secret crack in the stone where enemy soldiers tried to slip in single file. A brave woman armed with a simple heavy household pestle used for pounding grain guarded this hole and defended the fort. What was her famous name?',
      ARRAY['onake obavva', 'obavva', 'onake obavva''s kindi', 'obavvana kindi']::TEXT[], 'The word Onake in Kannada refers to the long wooden rice-pounding pestle she wielded.', 'Her statue stands proudly in front of the Chitradurga DC Office today.',
      'Observe the narrow hole from behind the protective visitor railing. Notice how low and hidden the entrance is from outside the cliff.', 'Why is Onake Obavva celebrated across Karnataka today?',
      'She symbolizes grassroots courage and devotion, proving ordinary citizens played crucial roles in historical defense.', 'In 1779, Obavva guarded this narrow fissure with an onake (pestle), single-handedly striking down invading soldiers of Hyder Ali.',
      250, 'Hero of the Pestle', 'CHITRA-OBA-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-04-5', 'HUNT-IN-KA-04', 5, 'The Rainwater Reservoirs (Santhe Honda)',
      'Citadel Peak Reservoirs', 14.2225, 76.394,
      40, 'Climb to the high granite summit where cool, clear water fills deep natural stone basins between the mountain peaks.', 'Seven rings of stone walls cannot protect a fort if its defenders die of thirst. Rain falls on these bare granite hills, flows through stone silt channels, and fills my deep rock basins. What essential natural resource allowed soldiers to survive years of siege here?',
      ARRAY['water', 'rainwater', 'drinking water', 'rain water', 'fresh water']::TEXT[], 'The life-giving liquid that fills tanks, lakes, and clouds.', 'Nayaka engineers created a zero-waste rainwater harvesting system across the hill.',
      'Look at the rock surface around the pool. Trace the carved shallow grooves in the granite designed to guide rainwater into the tank.', 'How did ancient engineers stop rainwater from turning into stagnant, algae-covered water?',
      'By filtering water through layers of charcoal and sand in silt traps, keeping pools deep, and stocking tanks with natural fish.', 'Connected over 20 natural ponds across different hill elevations with rock silt traps, creating a drought-proof cascade.',
      300, 'Guardian of the Waters', 'CHITRA-WATER-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-05-1', 'HUNT-IN-KA-05', 1, 'Cave 1 – The 18-Armed Dancing Nataraja',
      'Lowest Sandstone Cave', 15.9192, 75.6763,
      30, 'Ascend the first stone flight to the entrance verandah where an 18-armed cosmic dancer greets you from the rock wall.', 'Eighteen arms emerge from my torso, each holding a sacred object or striking a dance posture. Two of my arms beat out the rhythm of the cosmos on a small hour-glass drum. What is the name of this ancient musical instrument?',
      ARRAY['damaru', 'drum', 'damru', 'hourglass drum']::TEXT[], 'It is the small two-headed drum associated with Lord Shiva.', 'It begins with the letter ''D''.',
      'Look at the ceiling of the verandah just inside Cave 1. Spot the coiled serpent deity (Nagaraja) carved into the stone medallion.', 'How many arm combinations can be formed by pairing the 9 left arms with the 9 right arms?',
      '9x9 = 81 distinct classical dance postures (Karanas) from the Natyashastra!', 'Excavated in the late 6th century CE, depicting Shiva as Nataraja with 18 arms demonstrating 81 coordinated dance movements.',
      150, 'Cosmic Rhythm Master', 'BADAMI-NAT-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-05-2', 'HUNT-IN-KA-05', 2, 'Cave 2 – Trivikrama''s Cosmic Stride',
      'Second Tier Cave', 15.9189, 75.6769,
      30, 'Climb higher to the second cave where dwarf figures dance across the base frieze and a towering god lifts his foot into the sky.', 'A king offered me three paces of land, thinking I was a humble traveler. With one stride I covered the earth, with the second I spanned the heavens! What is the name of my giant-stepping avatar carved upon this rock wall?',
      ARRAY['trivikrama', 'vamana', 'trivikram', 'lord trivikrama']::TEXT[], 'It is the fifth avatar of Lord Vishnu who outwits King Bali.', 'The carving depicts one leg raised high toward the celestial heavens.',
      'Look at the bracket figures above the outer columns. Spot the mythical winged horse or composite beast.', 'What comical mythological creatures line the base plinth beneath the verandah pillars?',
      'Ganas—playful, pot-bellied dwarf attendants of Shiva, carved in hundreds of expressive dancing and tumbling poses.', 'Dedicated to Vishnu, featuring the colossal Trivikrama measuring the cosmos with playful Gana plinth reliefs.',
      150, 'Cosmic Explorer', 'BADAMI-TRIV-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-05-3', 'HUNT-IN-KA-05', 3, 'Cave 3 – Colossal Vishnu on Adisesha',
      'Third Tier Main Hall', 15.9185, 75.6775,
      30, 'Enter the largest, most ornate cave hall where a majestic four-armed protector sits serenely on a five-headed stone cobra.', 'I sit relaxed upon the coils of an enormous king cobra whose five hoods flare out to shade my crown. In my four hands I carry the discus, conch, and lotus. Behind my verandah pillar, a royal inscription records the exact Saka year five hundred. Who am I?',
      ARRAY['vishnu', 'lord vishnu', 'anantasayana vishnu', 'mahavishnu']::TEXT[], 'One of the principal deities of the Hindu Trimurti, the preserver of the universe.', 'Look at the magnificent relief sculpture on the far-left wall of the outer verandah.',
      'Look up at the bracket figures supporting the front verandah eaves. Locate the figure depicting an embrace between a royal couple (Mithuna).', 'What makes Cave 3 so important for Indian archeologists and historians?',
      'It has a precise Saka inscription (578 CE), providing a solid chronological anchor for dating ancient art across South India.', 'The oldest datable cave in Badami with an authentic Saka calendar 500 (578 CE) inscription commissioned by King Mangalesha.',
      250, 'Epigraphy Detective', 'BADAMI-VISH-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-05-4', 'HUNT-IN-KA-05', 4, 'Cave 4 – Bahubali & Jain Sanctuaries',
      'Highest Eastern Cave', 15.9182, 75.6778,
      30, 'Climb the final steep steps to the easternmost cave sanctuary where stone seekers meditate in stillness.', 'I stand tall and unmoved in the forest, so deep in peaceful meditation that wild climbing vines have wrapped around my legs and arms. Snakes slither safely near my feet because I harm no living soul. What great Jain spiritual hero am I?',
      ARRAY['bahubali', 'gommateshwara', 'lord bahubali', 'gommateshwara bahubali']::TEXT[], 'He is the son of the first Tirthankara Rishabhanatha, honored for renouncing his kingdom for spiritual enlightenment.', 'Look at the left wall inside the cave hall.',
      'Look at the seated figures on the side pillars. Count how many miniature seated Tirthankaras you can identify in the wall recesses.', 'What do the forest vines curling around Bahubali''s legs symbolize?',
      'The passage of time and his absolute concentration during deep, peaceful meditation.', 'Late 6th/7th century Jain cave with reliefs of 24th Tirthankara Mahavira, Parshvanatha under a serpent hood, and Bahubali wrapped in vines.',
      250, 'Seeker of Ahimsa', 'BADAMI-BAHU-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-05-5', 'HUNT-IN-KA-05', 5, 'Agastya Lake Shore & Bhutanatha Complex',
      'Eastern Edge of Tank', 15.9205, 75.686,
      40, 'Descend from the red cliffs and follow the stone pathway along the water to the temple that seems to float directly inside the lake.', 'Built of sandstone blocks, my front steps disappear into the sacred waters of Agastya Lake. Looking back across the water, the red sandstone cliffs mirror in the waves like fire in water. What element of nature embraces my temple walls when the monsoon arrives?',
      ARRAY['water', 'the lake', 'agastya lake', 'lake water', 'rainwater']::TEXT[], 'The body of water surrounding the temple base.', 'When the lake fills up in the monsoon, the temple looks like an island palace.',
      'Stand at the lake shore and look across to the northern cliff. Can you spot the ramparts of the Upper Badami Fort perched atop the mountain?', 'Why was the artificial lake built between the two rocky cliffs?',
      'To catch monsoon water pouring down from the red sandstone gorges, providing a year-round drinking and irrigation supply for Vatapi.', 'Built 7th–11th centuries CE, extending directly into the artificial Agastya lake, illustrating the transition from rock-cut to structural masonry.',
      300, 'Chalukyan Sovereign', 'BADAMI-LAKE-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-08-1', 'HUNT-IN-KA-08', 1, 'The Star-Shaped Platform (Jagati)',
      'Temple Base Exterior', 13.1623, 75.8594,
      30, 'Do not enter the temple yet. Stand on the wide stone terrace and look down at the zigzagging angles of the raised foundation.', 'Look down at the edge of the stone terrace on which the temple stands. Instead of a simple square or rectangle, my foundation projects outward like the twinkling points of a celestial body in the night sky. What cosmic shape does my platform imitate?',
      ARRAY['star', 'stellate platform', 'star shape', 'stellate', 'star shaped']::TEXT[], 'Look at how the corners form sharp points like a star.', 'In architecture, this is called a stellate floor plan.',
      'Walk along one corner of the star. Verify that the corner angle forms a symmetric projecting point.', 'Why did Hoysala architects choose a star-shaped plan over a simple rectangular plan?',
      'It maximized wall surface area, providing more corners and wall space to carve hundreds of sculptural figures!', 'The stellate (star-shaped) Jagati platform maximized perimeter length, providing dozens of projecting wall surfaces for narrative carvings.',
      100, 'Stellate Architect', 'BELUR-STAR-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-08-2', 'HUNT-IN-KA-08', 2, 'The Four Lower Animal Friezes',
      'Outer Wall Base Bands', 13.1625, 75.8597,
      30, 'Examine the lowest carved stone bands running like ribbons along the bottom of the temple walls.', 'We form the lowest tier of the temple''s foundation wall, marching one behind the other around the entire complex. Over six hundred of us are carved here, and no two of us are identical! We have trunks, tusks, and large ears. What animals are we?',
      ARRAY['elephants', 'elephant', 'stone elephants', 'gaja']::TEXT[], 'The giant gentle giants of the Indian jungle.', 'Look at the very lowest carved ribbon at ground level.',
      'Find an elephant in the frieze holding a lotus bud in its curled trunk.', 'Are any two elephants in the lowest frieze identical?',
      'No! Master sculptors carved over 650 elephants, and every single one displays a unique stride, trunk position, or head tilt!', 'The lowest frieze features 650 unique elephants (strength), followed by lions (courage), floral vines (beauty), and horses (speed).',
      150, 'Master of the Frieze', 'BELUR-FRIEZE-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-08-3', 'HUNT-IN-KA-08', 3, 'The Madanika Bracket: Darpana Sundari',
      'Exterior Roof Eaves, Southwest', 13.1626, 75.8596,
      30, 'Look up toward the angled stone roof brackets under the shaded eaves on the southern side.', 'Perched high beneath the stone eaves, a graceful maiden admires her own beauty in an object she holds delicately in her left hand. Her bangles, necklace, and hairstyle are carved with hair-thin detail. What everyday reflective object is she gazing into?',
      ARRAY['mirror', 'darpana', 'hand mirror', 'looking glass']::TEXT[], 'An object made today of silvered glass that shows your reflection.', 'The statue is famously called Darpana Sundari (Darpana means mirror in Sanskrit/Kannada).',
      'Look closely at the jewelry around her neck: notice how individual stone beads are carved free from the neck surface.', 'Why does soapstone allow such delicate, undercut carving?',
      'When freshly quarried, chloritic schist is relatively soft and easy to chisel; after years of exposure to air and rain, it oxidizes and hardens!', '42 Madanika bracket figures adorn capitals; Darpana Sundari showcases undercut stone filigree where jewelry beads are carved free from the stone.',
      250, 'Connoisseur of Hoysala Art', 'BELUR-DARP-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-08-4', 'HUNT-IN-KA-08', 4, 'The Perforated Stone Windows (Jaali)',
      'Mandapa Outer Screens', 13.1624, 75.8598,
      30, 'Examine the stone screens that filter daylight into soft rays before it enters the inner prayer hall.', 'I look like a wooden window blind or an embroidered screen, but I am carved from solid, immovable stone! Tiny square openings let sunlight filter into the dark hall while keeping monsoon winds outside. What is this architectural stone screen called?',
      ARRAY['jaali', 'lattice window', 'perforated screen', 'jali', 'stone jaali']::TEXT[], 'An architectural term used across Indian heritage for perforated screens.', 'It rhymes with the Hindi/Kannada word Taali.',
      'Look through one of the geometric lattice windows: observe how the bright outdoor courtyard contrasts with the cool, dark interior.', 'Who is depicted sitting in the grand royal court screen on the northern side of the entrance?',
      'Hoysala King Vishnuvardhana with his chief queen Shantala Devi, surrounded by ministers and guards!', 'Twenty perforated screens added under King Ballala II; 10 feature geometric star lattices and 10 illustrate historical royal courts.',
      200, 'Lattice Decoder', 'BELUR-JAALI-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-KA-08-5', 'HUNT-IN-KA-08', 5, 'The Navaranga Ceiling & Mohini Pillar',
      'Inside Central Mandapa', 13.1625, 75.8596,
      25, 'Step quietly into the sanctum hall and walk to the smooth polished central floor beneath the grand dome.', 'Look straight up into the vaulted ceiling. Carved from soapstone blocks, an enormous stone blossom hangs upside down from the center of the dome like a frozen drop of water. What sacred Indian flower does this stone pendant represent?',
      ARRAY['lotus', 'lotus flower', 'kamala', 'padma']::TEXT[], 'The sacred blossom that floats on Indian ponds and serves as the seat of Goddess Lakshmi.', 'It begins with the letter ''L''.',
      'Observe the circular grooves on the pillars: feel with your eyes how perfectly rounded and polished the stone surfaces appear.', 'How were the perfectly smooth, circular grooves on the interior pillars created?',
      'Masons mounted the soapstone blocks on giant hand-turned water-powered or rope-operated wooden lathes to turn and polish them!', 'Features 48 lathe-turned pillars and an inverted stepped lotus dome (Bhuvaneshwari) with a central hanging stone pendant.',
      300, 'Master of the Soapstone Jewel', 'BELUR-LOTUS-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-UP-01-1', 'HUNT-IN-UP-01', 1, 'Darwaza-i-Rauza (The Great Gate)',
      'South Entrance Portal', 27.1732, 78.0421,
      35, 'Begin your quest at the massive red sandstone entrance portal topped with 11 white marble cupolas (chhatris).', 'Look through my high pointed archway toward the white marble tomb in the distance. As you take steps forward toward me, does the white mausoleum appear to grow larger or magically appear to shrink into the distance?',
      ARRAY['shrink', 'grow smaller', 'recede', 'shrinks', 'smaller']::TEXT[], 'Test this illusion physically: take three steps backward, then three steps forward while looking through the archway.', 'As your view opens up, your brain recalculates the scale, making the monument appear to move backward.',
      'Look at the white marble lettering surrounding the great archway: observe how clean the inlay borders are against the red sandstone.', 'How many small white marble cupolas sit in a row above the central gate?',
      'Exactly 11 above the front arch (and 11 rear), totaling 22—symbolizing the 22 years taken to complete the entire complex!', 'Red sandstone portal with 22 cupolas; Pointed arch creates an optical perspective illusion where the mausoleum appears to shrink as you approach.',
      100, 'Gate of Paradise Explorer', 'TAJ-GATE-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-UP-01-2', 'HUNT-IN-UP-01', 2, 'The Charbagh Four-Fold Water Garden',
      'Central Reflecting Pool', 27.1742, 78.0421,
      35, 'Walk along the raised stone water channel toward the central lotus-shaped marble viewing platform.', 'Four waterways divide this green garden into four quadrants, meeting at a raised marble pool in the center. Look into the clear water on a calm day: what towering white monument is floating upside down in the reflection?',
      ARRAY['the taj mahal', 'taj mahal', 'the tomb', 'the mausoleum', 'taj']::TEXT[], 'The famous white marble wonder standing directly in front of you.', 'The pool was designed specifically to serve as a giant mirror.',
      'Stand at the central marble bench. Notice how the fountain spouts are engineered to work simultaneously without an electric motor.', 'What do the four intersecting canals of the Charbagh represent?',
      'The four celestial rivers of Paradise described in historic Persian and Islamic garden architecture.', 'Persian Charbagh representing four celestial rivers; water was historically raised from the Yamuna using animal-driven wheels.',
      150, 'Gardener of Paradise', 'TAJ-GARD-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-UP-01-3', 'HUNT-IN-UP-01', 3, 'The Four Corner Minarets',
      'Plinth Corner Towers', 27.175, 78.0415,
      35, 'Look up at the four tall white towers that stand like silent sentinels at the four corners of the marble terrace.', 'Look closely at my four corner towers. We do not stand completely vertical at a ninety-degree angle; our builders tilted us two degrees outward away from the main dome. Why did the architects tilt us away from the tomb?',
      ARRAY['in case of earthquakes', 'earthquake', 'earthquakes', 'so they do not fall on the tomb', 'earthquake protection']::TEXT[], 'Think of what happens to tall towers during massive ground tremors.', 'If an earthquake occurred, the towers would collapse outward onto the ground rather than crushing the main dome!',
      'Stand directly midway between two minarets. Verify with your eye how symmetrically they balance the sides of the central dome.', 'How tall are the four corner minarets?',
      'Approximately 40 meters (over 130 feet) high.', 'Each 40m minaret is tilted 2-3 degrees outward to protect the central dome during earthquakes and correct perspective parallax.',
      200, 'Master Surveyor', 'TAJ-MINAR-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-UP-01-4', 'HUNT-IN-UP-01', 4, 'The Great Pishtaq & Parchin Kari Inlays',
      'Southern Facade Arch', 27.1748, 78.0421,
      30, 'Climb onto the white marble plinth and stand directly at the base of the massive central entrance arch.', 'Look at the black slate calligraphy inlaid into the white marble around the archway. The letters at the top of the twenty-meter arch look the exact same size as the letters near your eye. Did the scribe carve them the same size, or are the top letters carved larger?',
      ARRAY['carved larger', 'larger', 'larger at the top', 'bigger at the top', 'top letters larger']::TEXT[], 'Remember how perspective works: objects farther away look smaller!', 'To compensate for distance, the calligrapher made the highest letters significantly larger so they look identical from the ground.',
      'Look at a single marble flower relief beside the arch. Count how many individual gemstone pieces make up one flower petal.', 'What technique was used to set semi-precious stones into the hard white marble?',
      'Pietra Dura (Parchin Kari): carving precise hollows into marble and inserting hand-polished gemstone slices held with special mortar!', 'Arabic calligraphy increases in physical size up the arch so letters appear uniform from eye level; features 28 varieties of inlaid gemstones.',
      250, 'Imperial Calligrapher', 'TAJ-PISHT-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-UP-01-5', 'HUNT-IN-UP-01', 5, 'The Riverfront Terrace & Sandstone Mosque',
      'Northern Yamuna Riverfront', 27.1755, 78.0421,
      35, 'Walk to the rear marble parapet where the cool breeze blows from the wide curve of the Yamuna River below.', 'Look across the river toward the gardens on the opposite bank (Mehtab Bagh). What famous dark myth claimed that Shah Jahan wanted to build a twin tomb for himself across the river out of what colored stone?',
      ARRAY['black marble', 'black taj mahal', 'black stone', 'black taj']::TEXT[], 'The opposite color of pure white.', 'European travelers like Jean-Baptiste Tavernier popularized the myth of the ''Black Taj Mahal.''',
      'Look to your left at the Red Sandstone Mosque and to your right at the Jawab. Confirm that their architectural silhouettes are exact mirror reflections.', 'Why does the Taj Mahal change color throughout the day?',
      'The translucent Makrana marble reflects the ambient sky: glowing soft pink at dawn, brilliant white at noon, and golden-amber under moonlight!', 'Flanked symmetrically by a working Mosque on the west and Jawab on the east, anchored by deep timber well foundations in river silt.',
      300, 'Sovereign of the Taj', 'TAJ-MOSQ-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-DL-02-1', 'HUNT-IN-DL-02', 1, 'Lahori Gate & Chhatta Chowk',
      'Main Western Entrance Arcade', 28.6558, 77.2385,
      35, 'Begin where India’s Prime Minister unfurls the national flag on Independence Day, then walk into the covered stone arcade.', 'I am an indoor stone shopping street covered by a vaulted ceiling so noble ladies could purchase fine silk, jewels, and scents without stepping into the hot sun. What is the traditional name of this covered arcade?',
      ARRAY['chhatta chowk', 'covered bazaar', 'chhatta bazar', 'chattah chowk']::TEXT[], 'The Hindi word Chhatta refers to a roofed canopy or umbrella.', 'Look along the central vaulted corridor directly inside the main Lahori gate.',
      'Look at the ceiling of the covered bazaar. Notice the decorative plaster ribs supporting the vaulted brickwork.', 'Why was this gate named ''Lahori Gate''?',
      'It faces west-northwest toward the grand historical Mughal city of Lahore along the historic Grand Trunk corridor!', 'Inside Lahori Gate lies Chhatta Chowk, a 17th-century two-story vaulted covered market designed for luxury trade.',
      100, 'Bazaar Emissary', 'RED-LAHORI-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-DL-02-2', 'HUNT-IN-DL-02', 2, 'The Naubat Khana (Drum House)',
      'Middle Courtyard Gateway', 28.656, 77.2405,
      35, 'Walk through the bazaar courtyard to the red sandstone gateway pavilion where ceremonial drums once echoed across the citadel.', 'Royal musicians sat on my upper balcony playing massive kettledrums and trumpets to announce the arrival of princes. Here, every nobleman had to climb down from his horse or elephant and walk on foot! What does the name ''Naubat Khana'' translate to?',
      ARRAY['drum house', 'music house', 'naqqar khana', 'house of drums']::TEXT[], 'The musical instrument played with two wooden sticks on a stretched leather skin.', 'Naubat refers to traditional ceremonial fanfare music.',
      'Look up at the open arched windows on the upper floor where court musicians once sat with their instruments.', 'Why did noblemen have to walk on foot after passing this gate?',
      'As a mandatory gesture of humility and respect before entering the presence of the Emperor.', 'Musicians played kettle drums (naqqara) and horns five times daily; all noblemen were required to dismount and proceed on foot.',
      150, 'Fanfare Sentinel', 'RED-NAUBAT-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-DL-02-3', 'HUNT-IN-DL-02', 3, 'Diwan-i-Aam (Hall of Public Audience)',
      'Central Ceremonial Quadrangle', 28.6563, 77.2415,
      35, 'Enter the vast colonnaded red sandstone hall where rows of cusped arches lead toward a raised marble canopy.', 'I am an open red sandstone pavilion with cusped arches where the Emperor sat on a high marble balcony to hear the petitions of common folk. Behind his throne, Italian-style stone panels depict a mythological musician taming wild beasts. What is this hall called?',
      ARRAY['diwan-i-aam', 'diwan i aam', 'hall of public audience', 'diwan e aam']::TEXT[], 'Aam means common or public in Hindustani.', 'It translates directly to the ''Hall of Public Audience.''',
      'Look at the cusped arches inside the hall: count how many cusps (rounded folds) are carved into a single arch profile.', 'Who was the mythological Greek musician depicted in the pietra dura panel behind the royal throne?',
      'Orpheus, playing the lute—symbolizing divine harmony, justice, and peace across the kingdom!', 'Pillared hall of 27 bays in red sandstone plastered with shell chunam; Emperor''s marble Jharokha features Florentine Pietra Dura of Orpheus.',
      200, 'Voice of the People', 'RED-AAM-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-DL-02-4', 'HUNT-IN-DL-02', 4, 'The Nahar-i-Bihisht (Stream of Paradise)',
      'Palace Floor Canals', 28.6564, 77.2425,
      30, 'Walk past the public hall to the white marble palaces along the eastern wall where a shallow stone canal runs right through the center of the floors.', 'I was not built for boats or fish, but flowed right through the living rooms and bedrooms of the Emperor''s private palaces to keep the summer air cool and fresh. What poetic name was given to this ''Stream of Paradise''?',
      ARRAY['nahar-i-bihisht', 'nahar i bihisht', 'stream of paradise', 'nahare bihisht']::TEXT[], 'Nahar means canal or stream in Urdu/Persian.', 'Bihisht translates to Paradise or Heaven.',
      'Look at the marble floor in the Rang Mahal: find the sunken lotus basin where water spouted from the center.', 'How did water flowing through the palace floor help with air conditioning?',
      'Water evaporating from the shallow channels and fountains cooled the ambient air as gentle breezes blew off the Yamuna River!', 'A continuous water channel flowing through imperial pavilions, fed by Ali Mardan Khan''s canal from the Yamuna to cool interiors naturally.',
      250, 'River Architect', 'RED-NAHAR-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-DL-02-5', 'HUNT-IN-DL-02', 5, 'Diwan-i-Khas (Hall of Private Audience)',
      'East Riverfront Pavilion', 28.6567, 77.2428,
      30, 'Step onto the white marble terrace of the private audience hall, overlooking the eastern gardens and old riverbed.', 'Inscribed in gold calligraphy above the corner arches of this white marble hall is a famous Persian verse: ''If there is a paradise on the face of the earth, it is here, it is here, it is here!'' What was the legendary jeweled throne that once sat in the center of this room?',
      ARRAY['peacock throne', 'takht-i-taus', 'takht e taus', 'the peacock throne']::TEXT[], 'Named after the bird with colorful tail feathers.', 'Crafted with solid gold, pearls, rubies, and the famous Koh-i-Noor diamond.',
      'Look at the upper wall corners below the ceiling: identify the Persian calligraphic cartouches painted in gold leaf.', 'Who composed the famous verse ''Gar firdaus bar-rue zamin ast, hamin ast-o hamin ast-o hamin ast''?',
      'Celebrated poet Amir Khusrau (and later inscribed on the walls under Shah Jahan''s direction)!', 'Pure white marble pavilion with floral pietra dura, original site of the solid gold Peacock Throne taken by Nadir Shah in 1739.',
      300, 'Jewel of Shahjahanabad', 'RED-KHAS-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-GJ-01-1', 'HUNT-IN-GJ-01', 1, 'Ground Level Rim & Corridor Orientation',
      'Ground Level Approach', 23.8587, 72.1015,
      35, 'Stand at the western edge of the manicured lawn where the flat ground suddenly drops open into a massive stone canyon.', 'Look down from the top edge: instead of walls rising into the blue sky, multiple levels of stone balconies and steps drop deep into the cool earth. What essential life-giving liquid sits at the bottom of this inverted temple?',
      ARRAY['water', 'well water', 'groundwater', 'ground water', 'clean water']::TEXT[], 'The clear liquid every traveler in arid Gujarat needs to survive.', 'It is a stepwell (Vav), built to store and celebrate clean drinking water.',
      'Look straight down the terraced steps from the top viewing point: count how many descending pavilion tiers are visible before the deep well shaft.', 'Why did ancient queens build stepwells instead of simple open ponds?',
      'Stepwells reached deep underground water tables, shielded water from scorching desert evaporation, and provided cool, shaded community spaces!', 'Measures 65m long, 20m wide, and descends 27m into the aquifer on a strict East-West axis.',
      100, 'Subterranean Pathfinder', 'RANI-RIM-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-GJ-01-2', 'HUNT-IN-GJ-01', 2, 'The Stepped Pavilions & Structural Columns',
      'Intermediate Terraces (Tiers 2 & 3)', 23.8589, 72.1018,
      30, 'Descend the wide stone flights to the second terrace level where rows of carved pillars frame the descending stairs.', 'Look at the stone pillars marching along both sides of the descending terraces. If our architects had not placed these strong rows of columns and crossbeams between the walls, what heavy natural material would push the side walls inward and collapse the well?',
      ARRAY['soil', 'earth', 'sand', 'mud', 'ground']::TEXT[], 'The dirt and earth supporting the ground you were just standing on above.', 'Lateral earth pressure pushes inward against deep open pits.',
      'Look at the capitals of the pavilion pillars on Tier 3: identify the carved lion and foliage motifs decorating the beam brackets.', 'What architectural style characterizes the pillars and wall niches of Rani ki Vav?',
      'The Maru-Gurjara (Solanki) architectural style, known for sharp chisel work, intricate brackets, and detailed ornamental friezes!', 'Multi-story pillared pavilions (kutas) act as horizontal structural struts, bracing the vertical walls against lateral soil pressure.',
      150, 'Earthworks Engineer', 'RANI-PAV-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-GJ-01-3', 'HUNT-IN-GJ-01', 3, 'The Dashavatara Gallery (Varaha & Narasimha)',
      'Fourth Level Wall Niches', 23.859, 72.102,
      25, 'Walk along the fourth-tier walkway where the wall recesses are filled with life-sized stone deities.', 'Look at the magnificent carving on the north wall: a powerful divine figure with the head of a wild boar lifts a tiny, gentle goddess safely on his tusk from the bottom of the cosmic ocean. What avatar of Vishnu is this?',
      ARRAY['varaha', 'varaha avatar', 'boar avatar', 'varaha murti']::TEXT[], 'The boar incarnation of Lord Vishnu.', 'It begins with the letter ''V''.',
      'Find the panel of Vamana (the dwarf avatar) holding an open umbrella made of woven palm leaf carved from stone.', 'Why are water and Vishnu so closely connected throughout this stepwell?',
      'In Hindu cosmology, Vishnu rests on the cosmic serpent upon the primeval waters (Kshira Sagara); honoring water was seen as honoring the preserver of life!', 'Contains over 500 major sculptures in ornate niches showcasing the Dashavatara (ten incarnations) of Lord Vishnu.',
      200, 'Avatar Chronicler', 'RANI-VARA-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-GJ-01-4', 'HUNT-IN-GJ-01', 4, 'The 16 Apsaras & Solanki Adornment',
      'Fifth Level Retaining Walls', 23.8591, 72.1022,
      25, 'Descend to the cool, shaded fifth level where tall, graceful female figures stand between the main god niches.', 'Look at the graceful stone lady carved on the pillar bracket: she has just stepped out of the water and is twisting her long, braided hair with both hands. Look at her feet—what small bird or animal is opening its beak to catch the dripping drops of water?',
      ARRAY['swan', 'hamsa', 'bird', 'swans']::TEXT[], 'A graceful white water bird known for swimming on lakes.', 'It is often depicted beside maidens in classical Indian art as a symbol of elegance.',
      'Look at the earrings and waistbands carved on the figures: notice how crisp and undamaged the soapstone details remain after 900 years.', 'What is the artistic term for these celestial female figures carved across ancient Indian temples?',
      'Apsaras or Surasundaris (celestial beauties)!', 'Depicts sixteen classic types of celestial maidens (Solah Shringar) showcasing ancient Patan Patola textile patterns.',
      250, 'Patola Heritage Scout', 'RANI-APS-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-GJ-01-5', 'HUNT-IN-GJ-01', 5, 'Sheshashayi Vishnu at the Deep Well Shaft',
      'Lowest Accessible Well Level', 23.8592, 72.1025,
      25, 'Approach the final viewing barrier looking directly into the deep, circular brick well cylinder.', 'At the very edge of the deepest water well, carved in relief overlooking the subterranean water, a serene deity lies reclining horizontally on the coiled body of a thousand-headed snake. What is the name of this cosmic resting posture?',
      ARRAY['sheshashayi vishnu', 'anantasayana', 'reclining vishnu', 'anantasayana vishnu', 'sheshashayi']::TEXT[], 'Shesha refers to the cosmic serpent king.', 'The god is shown lying down in deep cosmic rest rather than standing or sitting.',
      'Look into the cylindrical well shaft: notice the circular tiers of stone rings bracing the vertical shaft against cave-ins.', 'Why did the architects carve three different Sheshashayi Vishnu panels at three different height levels inside the well?',
      'So that as the water level naturally rose during the monsoon and dropped during the dry summer, one carving would always touch the water!', 'At the 10m diameter well shaft, three tiered Sheshashayi Vishnu reliefs ensured a deity sculpture was always in contact with seasonal water levels. Featured on the ₹100 banknote.',
      300, 'Sovereign of the Subterranean', 'RANI-SHESH-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-TN-01-1', 'HUNT-IN-TN-01', 1, 'Keralanthakan & Rajarajan Gopurams',
      'Eastern Main Gateways', 10.7825, 79.1335,
      35, 'Begin your quest at the double stone gateways on the eastern perimeter, flanked by monumental door guardians (Dwarapalakas).', 'In later South Indian temples, the outer entrance towers (Gopurams) were built taller than the inner sanctum. But here in the Big Temple, which tower is built far taller—the entrance gateway or the central temple tower inside the courtyard?',
      ARRAY['the central temple tower', 'central tower', 'vimana', 'inner tower', 'the vimana']::TEXT[], 'Look through the archway: notice the giant pyramid tower rising high inside the courtyard.', 'The 66-meter Vimana over the sanctum is more than double the height of the entrance gate!',
      'Look at the feet of the right-hand Dwarapalaka: spot the tiny relief carving of an elephant being swallowed by a serpent, illustrating the scale!', 'Why did Rajaraja Chola build the inner tower taller than the outer gates?',
      'In classic Chola architecture, the primary focus of grandeur was the sanctum of the deity (Vimana), rather than the outer boundary walls!', 'Unlike later Vijayanagara temples where Gopurams overpower the sanctum, Chola Gopurams remained modest (30m) so the central Vimana dominates.',
      100, 'Chola Gatekeeper', 'BRIH-GATE-1'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-TN-01-2', 'HUNT-IN-TN-01', 2, 'The Colossal Monolithic Nandi Mandapa',
      'Forecourt Central Axis', 10.7827, 79.1325,
      30, 'Walk down the central paved courtyard to the high open pavilion where an enormous black granite bull sits resting on folded hooves.', 'I sit quietly on my stone pedestal, gazing directly into the sanctum at Lord Shiva. Carved from a single massive rock of granite, I wear bells, garlands, and a decorative harness. What sacred animal mount am I?',
      ARRAY['nandi', 'bull', 'sacred bull', 'nandi bull']::TEXT[], 'The divine vahana (mount) of Lord Shiva.', 'It begins with the letter ''N''.',
      'Look at the bells carved around Nandi’s neck: notice how individual clappers inside the stone bells are carved free from the surrounding collar.', 'How heavy is the monolithic Nandi at Thanjavur?',
      'Approximately 20 to 25 tons, carved from a single block of dark granite!', 'Carved from a single granite block measuring 6m long, 2.6m wide, and 3.7m tall, weighing roughly 25 tons.',
      150, 'Guardian of the Bull', 'BRIH-NANDI-2'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-TN-01-3', 'HUNT-IN-TN-01', 3, 'Northern Base Inscriptions (Rajaraja’s Public Ledger)',
      'North Plinth of Vimana', 10.783, 79.1318,
      30, 'Walk to the northern base wall of the great tower where stone letters cover the polished granite basement like a printed book.', 'The king did not just engrave his own royal name here. He recorded the names, addresses, and daily wages of over four hundred dancers, musicians, drummers, and masons who built and served this temple! What ancient South Indian language and script is carved here?',
      ARRAY['tamil', 'tamil-grantha', 'tamil grantha', 'grantha']::TEXT[], 'One of the world''s oldest classical languages, spoken widely across Tamil Nadu.', 'It begins with the letter ''T''.',
      'Find the carved stone water spout (Gomukhi) jutting from the northern wall: look at the mythical makara mouth from which holy bathwater flows.', 'Why are these inscriptions considered one of the world''s most democratic royal records?',
      'Because the Emperor gave permanent, equal public credit to ordinary workers, artisans, and performers alongside royal family members!', 'Hundreds of meters of Tamil-Grantha inscriptions list military victories and the exact names, duties, and grain salaries of 400 temple dancers and artisans.',
      200, 'Epigraphy Scribe', 'BRIH-INSC-3'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-TN-01-4', 'HUNT-IN-TN-01', 4, 'The 216-Foot Vimana & 80-Ton Monolithic Kumbam',
      'Tower Apex & Viewing Axis', 10.7828, 79.1318,
      35, 'Step back to the far edge of the courtyard lawn and look up toward the octagonal rounded dome capping the towering pyramid.', 'Eighty tons of solid granite sit balanced atop a sixty-six-meter tower! Without modern engines or steel cranes, our ancestors moved this giant stone to the top using teams of elephants, log rollers, and an enormous earthen ramp stretching four kilometers from a nearby village. What shape is the golden finial (Kalasha) sitting at the very top?',
      ARRAY['pot', 'vase', 'kalasha', 'water pot', 'kalasa', 'stupi']::TEXT[], 'The traditional sacred brass/copper vessel shaped like an Indian water pot.', 'In Sanskrit and Tamil temple architecture, it is known as a Stupi or Kalasa.',
      'Count how many stepped horizontal tiers make up the pyramid between the base cornice and the upper dome platform (13 tiers).', 'Is the popular myth that ''the Vimana of Thanjavur casts no shadow at noon'' scientifically true?',
      'No! At noon, the shadow simply falls onto the stepped base of the temple''s own wide lower plinth, creating the optical illusion that it has disappeared!', 'The hollow 13-tiered pyramidal tower rises 66m (216 ft). The 80-ton octagonal Kumbam was hauled to the summit using an earthen ramp from Sarapallam (4 km away).',
      250, 'Titan of the Cholas', 'BRIH-KUMB-4'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

INSERT INTO checkpoints (
      checkpoint_id, hunt_id, checkpoint_number, title, landmark,
      latitude, longitude, geofence_radius_meters, clue_text, riddle_text,
      accepted_answers, hint_1, hint_2, observation_challenge, fun_question,
      question_answer, historical_fact, points_reward, badge_title, qr_code
    ) VALUES (
      'CP-IN-TN-01-5', 'HUNT-IN-TN-01', 5, 'Outer Cloistered Corridor & Monolithic Lingams',
      'Perimeter Cloister', 10.7828, 79.1308,
      30, 'Walk to the shaded pillared gallery running along the outer boundary wall behind the great tower.', 'Hundreds of stone columns shade this continuous covered gallery along the courtyard wall. Sitting beneath the roof in long silent rows are sacred stone emblems of Lord Shiva. What sacred symbol is repeated all along this covered corridor?',
      ARRAY['lingam', 'shiva lingam', 'lingams', 'shivalinga', 'linga']::TEXT[], 'The aniconic stone representation of Lord Shiva worshipped across Hindu temples.', 'Each sits mounted upon a circular stone pedestal (Avudaiyar).',
      'Look at the inner wall of the cloister: find an area where original colorful mineral paintings are visible beneath the newer lime plaster layers.', 'What world-famous dynamic dance form is carved in 81 progressive postures along the sanctum corridors?',
      'Bharatanatyam, India''s classical dance form rooted in the Natyashastra!', 'The outer cloistered gallery houses 108 stone Lingams, 81 dance poses of Nataraja, and 11th-century Chola mineral fresco corridors.',
      300, 'Rajaraja’s Architect', 'BRIH-CLOIST-5'
    ) ON CONFLICT (checkpoint_id) DO UPDATE SET
      title = EXCLUDED.title,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude;

-- 4. SEED LEADERBOARD ENTRIES
INSERT INTO leaderboard (display_name, site_id, hunt_title, score, time_taken_seconds)
    VALUES ('Aarav Deshmukh', 'IN-KA-01', 'The Royal Architect''s Granite Ledger', 1000, 2420);
INSERT INTO leaderboard (display_name, site_id, hunt_title, score, time_taken_seconds)
    VALUES ('Priya Sundaram', 'IN-TN-01', 'The Granite Titan of the Cholas', 980, 2610);
INSERT INTO leaderboard (display_name, site_id, hunt_title, score, time_taken_seconds)
    VALUES ('Kabir Sengupta', 'IN-UP-01', 'The Symphony of White Marble', 950, 2890);
INSERT INTO leaderboard (display_name, site_id, hunt_title, score, time_taken_seconds)
    VALUES ('Sneha Tiwari', 'IN-GJ-01', 'The Inverted Subterranean Temple', 920, 3100);
INSERT INTO leaderboard (display_name, site_id, hunt_title, score, time_taken_seconds)
    VALUES ('Rahul Mehta', 'IN-KA-04', 'The Seven-Fold Stone Trap', 890, 3450);
