import json, os

def cp(cid, seq, landmark, lat, lng, radius, story, clue, task, riddle, ans, aliases, h1, h2, fact, quiz, opts, correct, pts=50, xp=100, img=None):
    return {
        'id': cid,
        'sequence': seq,
        'landmark': landmark,
        'latitude': lat,
        'longitude': lng,
        'radius': radius,
        'image': img or 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        'story': story,
        'clue': clue,
        'observationTask': task,
        'riddle': riddle,
        'riddleAnswer': ans,
        'acceptableAnswers': [a.lower(strip()) for a in ([ans] + aliases)],
        'hint1': h1,
        'hint2': h2,
        'learnFact': fact,
        'quizQuestion': quiz,
        'quizOptions': opts,
        'correctOptionIndex': correct,
        'points': pts,
        'xp': xp
    }

print('build_karnataka.py module defined')
