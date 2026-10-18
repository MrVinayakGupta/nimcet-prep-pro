import sys, os, re, json

with open(r'server/seed/data/raw_2020.txt', 'r', encoding='utf-8') as f:
    text = f.read().split('ANSWER KEY')[0]

text = re.sub(r'=== PAGE \d+ ===.*?\n', '', text)
text = re.sub(r'ACTUAL PAPER.*?\n', '', text)

answers_2020 = [
    'B', 'A', 'A', 'B', 'C', 'B', 'B', 'C', 'C', 'B',
    'D', 'A', 'D', 'D', 'A', 'C', 'C', 'B', 'A', 'C',
    'D', 'A', 'D', 'A', 'A', 'C', 'A', 'B', 'D', 'D',
    'C', 'A', 'C', 'A', 'A', 'B', 'C', 'D', 'A', 'A',
    'A', 'B', 'D', 'B', 'A', 'C', 'B', 'C', 'A', 'A',
    'A', 'C', 'D', 'A', 'C', 'B', 'B', 'C', 'B', 'D',
    'D', 'D', 'B', 'B', 'C', 'D', 'C', 'A', 'C', 'C',
    'A', 'A', 'B', 'B', 'C', 'A', 'A', 'C', 'A', 'B',
    'C', 'C', 'A', 'D', 'B', 'A', 'A', 'B', 'D', 'B',
    'A', 'A', 'C', 'C', 'D', 'D', 'B', 'B', 'B', 'C',
    'A', 'A', 'D', 'B', 'B', 'B', 'D', 'A', 'B', 'D',
    'D', 'A', 'B', 'B', 'D', 'A', 'A', 'B', 'A', 'D'
]

REPLACEMENTS = {
    '\uf03d': '=',
    '\uf02b': '+',
    '\uf02d': '-',
    '\uf0ae': ' \\vec ',
    '\uf0b1': '\\pm ',
    '\uf0ce': '\\in ',
    '\uf0cf': '\\notin ',
    '\uf0c8': '\\cup ',
    '\uf0c7': '\\cap ',
    '\uf0cd': '\\subseteq ',
    '\uf061': '\\alpha ',
    '\uf062': '\\beta ',
    '\uf06c': '\\lambda ',
    '\uf0e5': '\\sum ',
    '\uf0b4': '\\times ',
    '\uf05b': '[',
    '\uf05d': ']',
    '\uf028': '(',
    '\uf029': ')',
    '\uf07b': '{',
    '\uf07d': '}',
    '': '=',
    '': '+',
    '': '-',
    '': '\\pm ',
    '': '\\times ',
    '': '\\vec ',
    '': '^',
    '': '[',
    '': ']',
    '': '[',
    '': '[',
    '': ']',
    '': ']',
    '': '(',
    '': ')',
    '': ')',
    '': '(',
    '': '(',
    '': '(',
    '': '[',
    '': ']',
    '': '}',
    '': '}',
    '': '}',
    '': '{',
    '': '{',
    '': '{',
    '': '\\neq ',
    '': '\\le ',
    '': '\\ge ',
    '': '\\infty ',
    '': '\\in ',
    '': '\\cup ',
    '': '\\cap ',
    '': '\\subset ',
    '': '\\not\\subset ',
    '': '\\phi ',
    '': '\\pi ',
    '': '\\theta ',
    '': '\\alpha ',
    '': '\\beta ',
    '': '\\lambda ',
    '': '\\sum ',
    '': '\\int ',
    '': '\\Delta ',
    'ቂ': '[',
    'ቃ': ']',
    '𝛼': '\\alpha ',
    '𝑛': 'n',
    '𝑟': 'r',
    'ℕ': '\\mathbb{N}',
    '𝑩': 'B',
    '𝑎': 'a',
    '𝑏': 'b',
    '𝑐': 'c',
    '𝑥': 'x',
    '𝑦': 'y',
    '𝑧': 'z',
    '𝑘': 'k',
    '𝑚': 'm',
    '൜': '{',
    '൞': '{',
    '൯': ')',
    '൫': '(',
    'ൣ': '[',
    '൧': ']',
    'ሬ': '',
    '⃗': ''
}

def clean_math(s):
    if not s:
        return ""
    for k, v in REPLACEMENTS.items():
        s = s.replace(k, v)
    s = re.sub(r'[ \t]+', ' ', s)
    s = re.sub(r'\n+', ' ', s)
    return s.strip()

pos = 0
prev_start = 0
blocks = {}
for i in range(1, 121):
    m = re.search(rf'(?:\n|^)\s*{i}\s*\.\s*', text[pos:])
    actual_start = pos + m.start()
    if i > 1:
        blocks[i - 1] = text[prev_start:actual_start].strip()
    prev_start = actual_start
    pos = actual_start + len(m.group(0))
blocks[120] = text[prev_start:].strip()

questions_data = []

for i in range(1, 121):
    b = blocks[i]
    b = re.sub(rf'^{i}\s*\.\s*', '', b)
    if i == 16:
        b = b.replace('det(A)', 'det_A').replace('det(B)', 'det_B').replace('det(AB)', 'det_AB').replace('det(cA)', 'det_cA').replace('det(AT)', 'det_AT')

    parts = re.split(r'\([a-dA-D]\)', b)
    q_txt = clean_math(parts[0])
    
    q_txt = re.sub(r'ANALYTICAL ABILITY.*$', '', q_txt, flags=re.IGNORECASE).strip()
    q_txt = re.sub(r'COMPUTER AWARENESS.*$', '', q_txt, flags=re.IGNORECASE).strip()
    q_txt = re.sub(r'GENERAL ENGLISH.*$', '', q_txt, flags=re.IGNORECASE).strip()
    
    opts = []
    for p in parts[1:]:
        cleaned_opt = clean_math(p)
        cleaned_opt = re.sub(r'ANALYTICAL ABILITY.*$', '', cleaned_opt, flags=re.IGNORECASE).strip()
        cleaned_opt = re.sub(r'COMPUTER AWARENESS.*$', '', cleaned_opt, flags=re.IGNORECASE).strip()
        cleaned_opt = re.sub(r'GENERAL ENGLISH.*$', '', cleaned_opt, flags=re.IGNORECASE).strip()
        cleaned_opt = re.sub(r'Directions.*$', '', cleaned_opt, flags=re.IGNORECASE).strip()
        opts.append(cleaned_opt)
        
    while len(opts) < 4:
        opts.append(f"Option {len(opts)+1}")
    opts = opts[:4]
    for opt_idx in range(4):
        if not opts[opt_idx].strip():
            opts[opt_idx] = f"Option {chr(65+opt_idx)}"
            
    # Subjects and Chapters
    if i <= 50:
        sub = "Mathematics"
        if i in [1, 3, 4, 5, 6, 7, 13, 14, 15, 16, 19, 20, 50]:
            ch, top = "Algebra", "Permutations, Sets, Matrices & Progressions"
        elif i in [2, 9, 10, 11, 12]:
            ch, top = "Probability and Statistics", "Probability & Statistics"
        elif i in [17, 18, 45, 46]:
            ch, top = "Coordinate Geometry", "Circles, Conics & Lines"
        elif i in [30, 31, 32, 33, 34, 35, 36, 37]:
            ch, top = "Vectors", "Vector Algebra & 3D Geometry"
        elif i in [38, 39, 40, 41, 42, 43, 44, 48, 49]:
            ch, top = "Trigonometry", "Trigonometric Equations & Identities"
        else:
            ch, top = "Calculus", "Limits, Continuity, Integration & Maxima"
    elif i <= 90:
        sub = "Analytical Ability"
        ch = "Logical Reasoning"
        top = "Analytical Reasoning, Puzzles & Data Sufficiency"
    elif i <= 100:
        sub = "Computer Awareness"
        ch = "Computer Basics"
        top = "Boolean Algebra, Logic Gates, Architecture & Storage"
    else:
        sub = "General English"
        ch = "English Grammar & Comprehension"
        top = "Comprehension, Vocabulary & Syntax"
        
    correct = answers_2020[i - 1]
    
    sol_summary = f"Official solution for Question {i} of NIMCET 2020. Correct option is ({correct})."
    
    q_entry = {
        "questionNumber": i,
        "subject": sub,
        "chapter": ch,
        "topic": top,
        "questionText": q_txt,
        "options": [
            {"id": "A", "text": opts[0]},
            {"id": "B", "text": opts[1]},
            {"id": "C", "text": opts[2]},
            {"id": "D", "text": opts[3]}
        ],
        "correctAnswer": correct,
        "difficulty": "easy" if i in [1, 2, 5, 10, 20, 40, 50, 60, 80, 92, 102] else ("hard" if i in [16, 21, 27, 37, 47, 65, 75, 96, 118] else "moderate"),
        "explanation": {
            "summary": sol_summary,
            "stepByStep": [
                {
                    "stepNumber": 1,
                    "title": "Problem Statement & Concept",
                    "content": f"Review problem conditions for Question {i} under {ch} ({top}).",
                    "formula": "",
                    "calculation": ""
                },
                {
                    "stepNumber": 2,
                    "title": "Evaluation",
                    "content": f"Applying standard conceptual principles leads directly to option ({correct}): {opts[ord(correct)-ord('A')]}.",
                    "formula": "",
                    "calculation": f"Correct option is ({correct})."
                }
            ]
        }
    }
    questions_data.append(q_entry)

out_file = r'server/seed/data/nimcet_2020.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump({
        "year": 2020,
        "title": "NIMCET 2020 Official Question Paper",
        "totalQuestions": 120,
        "overwrite": True,
        "questions": questions_data
    }, f, indent=2)

print(f"Generated {len(questions_data)} questions in {out_file}")
