import json
import os
import subprocess

# Load curriculum by executing node command
node_code = 'const c = require("./curriculum"); console.log(JSON.stringify({subjects: c.subjects, chapters: c.chapters, topics: c.topics}));'
result = subprocess.run(['node', '-e', node_code], cwd=os.path.dirname(os.path.abspath(__file__)), capture_output=True, text=True, check=True)
curriculum = json.loads(result.stdout)

subjects = curriculum['subjects']
chapters = curriculum['chapters']
topics = curriculum['topics']

print(f"Loaded {len(subjects)} subjects, {len(chapters)} chapters, {len(topics)} topics.")

# Years covering 10 full NIMCET exams
YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
