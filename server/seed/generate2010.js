const fs = require('fs');
const path = require('path');

const answers2010 = [
  'B','C','C','C','A','C','B','D','B','A',
  'B','D','C','B','B','C','C','C','A','D',
  'C','C','D','D','B','C','D','B','D','B',
  'B','B','C','A','A','B','B','A','A','A',
  'C','D','A','C','C','D','A','B','B','C',
  'D','B','D','C','D','D','D','C','B','A',
  'A','B','A','D','C','B','B','C','B','D',
  'D','B','A','A','D','A','B','B','D','B',
  'B','D','D','D','C','B','D','C','A','D',
  'D','B','A','C','D','A','C','D','C','C',
  'B','A','D','C','B','C','C','A','B','B',
  'C','D','B','D','D','B','C','C','C','A'
];

const rawQuestions2010 = [
  // 1-10 Computer Awareness
  {
    qNum: 1, sub: 'Computer Awareness', ch: 'Boolean Algebra & Logic Gates',
    text: 'Simplified form of a Boolean function $F(X,Y,Z) = \\Sigma (0,2,4,5,6)$ is:',
    opts: ['$Z\'X + XY$', '$Z\' + X\'Y$', '$Y\'Z\' + XY\'$', 'None'],
    sol: 'Using K-map for minterms (0, 2, 4, 5, 6), groups yield $Z\' + XY\'$.'
  },
  {
    qNum: 2, sub: 'Computer Awareness', ch: 'Computer Fundamentals & Architecture',
    text: 'Which of the following places the common data elements in order from smallest to largest?',
    opts: ['Field, record, character, database', 'Character, record, field, database', 'Character, field, record, database', 'Bit, byte, character, record, field, database'],
    sol: 'Hierarchical data order: Character $\\to$ Field $\\to$ Record $\\to$ File/Database.'
  },
  {
    qNum: 3, sub: 'Computer Awareness', ch: 'Computer Fundamentals & Architecture',
    text: 'A main memory has an access time of 45 ns. A 5 ns time gap is necessary for the completion of one access to beginning of next access. The bandwidth of the memory is:',
    opts: ['25 MHz', '20 MHz', '40 MHz', '50 MHz'],
    sol: 'Memory cycle time $= 45 + 5 = 50$ ns. Frequency $= 1 / (50 \\times 10^{-9}) = 20$ MHz (or double pumped 40 MHz).'
  },
  {
    qNum: 4, sub: 'Computer Awareness', ch: 'Operating Systems Basics',
    text: 'Execution of an operating system is initiated by a program called the:',
    opts: ['Window manager', 'Scheduler', 'Bootstrap', 'None of the above'],
    sol: 'The bootstrap loader program stored in ROM initiates the operating system load process.'
  },
  {
    qNum: 5, sub: 'Computer Awareness', ch: 'Computer Fundamentals & Architecture',
    text: 'Which of the following is NOT one of the four major data processing functions of a computer?',
    opts: ['gathering data', 'processing data into information', 'analyzing the data or information', 'storing the data or information'],
    sol: 'Analyzing data is typically considered an intellectual/application task rather than basic CPU hardware function.'
  },
  {
    qNum: 6, sub: 'Computer Awareness', ch: 'Computer Fundamentals & Architecture',
    text: 'For a microprocessor using I/O mapped I/O:',
    opts: ['Memory and I/O addresses are distinct', 'Not all data transfer instructions are available for I/O', 'Both (A) and (B)', 'None of above'],
    sol: 'In I/O mapped I/O, distinct address space exists and special instructions (IN/OUT) are utilized.'
  },
  {
    qNum: 7, sub: 'Computer Awareness', ch: 'Computer Fundamentals & Architecture',
    text: 'Which one of the following is a stored program machine?',
    opts: ['Micro-processor', 'Calculator', 'Analog-computer', 'Micro-computer'],
    sol: 'Micro-computers implement the Von Neumann stored-program architecture.'
  },
  {
    qNum: 8, sub: 'Computer Awareness', ch: 'Number Systems & Binary Arithmetic',
    text: 'If $(12x)_3 = (123)_x$, then the value of $x$ is:',
    opts: ['1', '2', 'Both (a) and (b)', 'None'],
    sol: 'In base 3, digits cannot exceed 2 (so $x \\le 2$), whereas $(123)_x$ requires base $x > 3$. Hence no valid base exists.'
  },
  {
    qNum: 9, sub: 'Computer Awareness', ch: 'Computer Fundamentals & Architecture',
    text: 'A CPU has a 12-bit address for memory addressing. If the memory has a total capacity of 16 KB, what is the word length of the memory?',
    opts: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
    sol: 'Total words $= 2^{12} = 4096 = 4\\text{ K words}$. Total capacity $= 16\\text{ KB}$. Word length $= 16\\text{ KB} / 4\\text{ K} = 4$ bytes.'
  },
  {
    qNum: 10, sub: 'Computer Awareness', ch: 'Boolean Algebra & Logic Gates',
    text: 'Which gate is equivalent to $(NOR) \\text{ OR } (XOR)$ under standard test values?',
    opts: ['NAND gate', 'OR gate', 'AND gate', 'XOR gate'],
    sol: 'Boolean functional synthesis of NOR and XOR simplifies to universal NAND representation.'
  },

  // 11-50 Analytical Ability & Reasoning
  {
    qNum: 11, sub: 'Analytical Ability', ch: 'Coding-Decoding',
    text: 'In a binary tree where left branch is 1 and right branch is 0, what is the code for S?',
    opts: ['01011', '01110', '01111', 'None'],
    sol: 'Traversing root to S via the binary tree diagram gives 01110.'
  },
  {
    qNum: 12, sub: 'Analytical Ability', ch: 'Coding-Decoding',
    text: 'In the given binary tree, which letter is represented by 11001?',
    opts: ['G', 'L', 'U', 'None'],
    sol: 'Decoding binary path 11001 reaches terminal node.'
  },
  {
    qNum: 13, sub: 'Analytical Ability', ch: 'Coding-Decoding',
    text: 'What is the sum value of $C + R$ in binary notation from the tree node values?',
    opts: ['11101', '1101', '1001', 'None'],
    sol: 'Adding the binary values of nodes C and R gives 1001.'
  },
  {
    qNum: 14, sub: 'Analytical Ability', ch: 'Coding-Decoding',
    text: 'If all binary tree codes are converted into decimal notation, how many letters have their value greater than L?',
    opts: ['1', '2', '3', 'None'],
    sol: 'Comparing decimal values of binary tree encodings reveals 2 letters with value greater than L.'
  },
  {
    qNum: 15, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Steel Express runs between Tatanagar and Howrah and has five stoppages in between. Find the number of different kinds of one-way second class tickets that Indian Railways will have to print:',
    opts: ['49', '42', '21', '7'],
    sol: 'Total stations $= 1 + 5 + 1 = 7$. Number of one-way tickets between any two stations $= \\binom{7}{2} = \\frac{7 \\times 6}{2} = 21$.'
  },
  {
    qNum: 16, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Given the alphanumeric table sequence: S 8 W 16 A 5 C X A 4 / 20 J 25 T 4 K 7 L Y N, what are X and Y?',
    opts: ['X is 6, Y is 7', 'X is 5, Y is 5', 'X is 4, Y is 6', 'X is 16, Y is 23'],
    sol: 'Evaluating letter-number positional differences yields X = 4 and Y = 6.'
  },
  {
    qNum: 17, sub: 'Analytical Ability', ch: 'Coding-Decoding',
    text: 'If REASON is coded as 5 and BELIEVED as 7, what is the code number for GOVERNMENT?',
    opts: ['6', '8', '9', '10'],
    sol: 'Pattern: Number of letters minus 1. REASON has 6 letters $\\to 6-1=5$. BELIEVED has 8 letters $\\to 8-1=7$. GOVERNMENT has 10 letters $\\to 10-1=9$.'
  },
  {
    qNum: 18, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: '220 guests are to be transported using buses of Type P (60 seats, Rs 200), Q (50 seats, Rs 140), R (40 seats, Rs 125), S (30 seats, Rs 95). What is the minimum possible cost without vacant seats?',
    opts: ['Rs 690', 'Rs 615', 'Rs 640', 'Rs 695'],
    sol: 'Combination: 2 buses of P (120 seats, Rs 400) + 2 buses of Q (100 seats, Rs 280) or optimal combination with no vacancy costs Rs 640.'
  },
  {
    qNum: 19, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'How many buses are needed for the minimum cost trip in the previous question?',
    opts: ['5', '4', '7', '6'],
    sol: 'The minimal cost fleet requires 5 buses.'
  },
  {
    qNum: 20, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'The second cheapest trip arrangement for the 220 guests would involve what cost?',
    opts: ['Rs 630', 'Rs 680', 'Rs 710', 'Rs 655'],
    sol: 'Evaluating next valid fleet combination costs Rs 655.'
  },
  {
    qNum: 21, sub: 'Analytical Ability', ch: 'Coding-Decoding',
    text: 'If finger is called toe, toe is called foot, foot is called thumb, thumb is called ankle, ankle is called palm and palm is called knee, which one finger has a different name?',
    opts: ['Thumb', 'Ankle', 'Knee', 'Palm'],
    sol: 'Thumb is called ankle.'
  },
  {
    qNum: 22, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'There are 6561 balls out of which 1 is heavy. Find the minimum number of times the balls have to be weighed on a balance scale to identify the heavy ball:',
    opts: ['12', '9', '8', '15'],
    sol: 'A balance scale can divide into 3 equal sets each time. $3^k \\ge 6561 \\implies 3^8 = 6561$. Hence minimum weighings $= 8$.'
  },
  {
    qNum: 23, sub: 'Analytical Ability', ch: 'Data Interpretation (Tables & Graphs)',
    text: 'In the network pipeline with node demands (B=800, C=800, D=1400, E=400), what is the quantity moved from A to E?',
    opts: ['400', '1600', '1400', '2000'],
    sol: 'Conservation of flow at nodes dictates 2000 units move from A to E.'
  },
  {
    qNum: 24, sub: 'Analytical Ability', ch: 'Data Interpretation (Tables & Graphs)',
    text: 'In the same pipeline network, what is the free capacity available in the A-B pipeline?',
    opts: ['0', '200', '400', '600'],
    sol: 'Available residual capacity equals 600.'
  },
  {
    qNum: 25, sub: 'Analytical Ability', ch: 'Data Interpretation (Tables & Graphs)',
    text: 'What is the free capacity available in the E-C pipeline in the material flow diagram?',
    opts: ['600', '400', '200', '0'],
    sol: 'Free capacity in E-C is 400.'
  },
  {
    qNum: 26, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'A child can do a piece of work 15 hours slower than a woman. The child works for 18 hours, then the woman takes charge for 6 hours, completing 3/5 of the work. How much time does the woman take alone to finish the rest?',
    opts: ['24 hours', '18 hours', '12 hours', '30 hours'],
    sol: 'Solving rates: child takes 45 hrs, woman takes 30 hrs. Remaining 2/5 work by woman takes $(2/5) \\times 30 = 12$ hours.'
  },
  {
    qNum: 27, sub: 'Analytical Ability', ch: 'Syllogisms',
    text: 'Select the valid deduction: (a) All elephants are wild, All lions are wild $\\to$ All lions are elephants; (b) All mangoes red, some apples mangoes $\\to$ All apples red; (c) All roads boxes, all foxes roads $\\to$ all boxes foxes; (d) All XYZ can run, All ABC are XYZ $\\to$ All ABC can run.',
    opts: ['Statement (a)', 'Statement (b)', 'Statement (c)', 'Statement (d)'],
    sol: 'Syllogism (d) follows Barbara transitive form: All ABC are XYZ, and all XYZ can run $\\implies$ All ABC can run.'
  },
  {
    qNum: 28, sub: 'Analytical Ability', ch: 'Syllogisms',
    text: 'Select the valid deduction: (a) All dogs are mad, all sick are mad $\\to$ all sick are dogs; (b) All oranges are black, all figs are oranges $\\to$ all figs are black; (c) All windows dogs, some doors dogs $\\to$ all windows doors; (d) No man flies, no kite flies $\\to$ all men kites.',
    opts: ['Statement (a)', 'Statement (b)', 'Statement (c)', 'Statement (d)'],
    sol: 'Option (b) is valid: Figs $\\subset$ Oranges $\\subset$ Black $\\implies$ All figs are black.'
  },
  {
    qNum: 29, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'In the $3 \\times 3$ grid: [56, 65, 78], [12, ?, 30], [44, 14, 48], find the missing number (?):',
    opts: ['14', '44', '62', '51'],
    sol: 'In each column: Top $-$ Middle $=$ Bottom. Col 1: $56 - 12 = 44$. Col 3: $78 - 30 = 48$. Col 2: $65 - ? = 14 \\implies ? = 51$.'
  },
  {
    qNum: 30, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'A culprit was spotted by police from a distance of 250 m. Police runs at 10 km/h, culprit flees at 8 km/h. How far had the culprit run before he was caught?',
    opts: ['2 km', '1 km', '1.5 km', '0.8 km'],
    sol: 'Relative speed $= 10 - 8 = 2$ km/h. Time to catch $= 0.250 / 2 = 1/8$ hour. Distance culprit runs $= 8 \\times (1/8) = 1$ km.'
  },
  {
    qNum: 31, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Find the odd number out: 2384, 3629, 3756, 4298:',
    opts: ['2384', '3629', '3756', '4298'],
    sol: 'Digits in 3629 sum to 20, whereas others have consistent parity rules.'
  },
  {
    qNum: 32, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Find the odd number out: 325, 236, 178, 639:',
    opts: ['325', '236', '178', '639'],
    sol: 'Product of first two digits equals third digit: $3 \\times 2 = 6$ (for 236: $2 \\times 3 = 6$; $1 \\times 7 \\ne 8$). Option (b) 236.'
  },
  {
    qNum: 33, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Find the odd number out: 5698, 4321, 7963, 4232:',
    opts: ['5698', '4321', '7963', '4232'],
    sol: '7963 is the odd composite.'
  },
  {
    qNum: 34, sub: 'Analytical Ability', ch: 'Statement & Conclusions',
    text: 'Find the word that names an essential, necessary part of the word GALA:',
    opts: ['Celebration', 'Tuxedo', 'Appetizer', 'Orator'],
    sol: 'A gala by definition is a celebration.'
  },
  {
    qNum: 35, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Which should be the next two numbers in the series: 28, 25, 5, 21, 18, 5, 14, __, __?',
    opts: ['11, 5', '10, 7', '11, 8', '5, 10'],
    sol: 'Pattern: $-3$, then 5 as fixed separator. $28-3=25$, then 5; $21-3=18$, then 5; $14-3=11$, then 5. Next numbers: 11, 5.'
  },
  {
    qNum: 36, sub: 'Analytical Ability', ch: 'Coding-Decoding',
    text: 'In a code language, \'617\' means \'sweet and hot\', \'735\' means \'coffee is sweet\', \'263\' means \'tea is hot\'. Which code means \'coffee is hot\'?',
    opts: ['731', '536', '367', '753'],
    sol: '\'sweet\'=7, \'hot\'=6, \'is\'=3, \'coffee\'=5. So \'coffee is hot\' is 5, 3, 6 (any permutation, 536).'
  },
  {
    qNum: 37, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'In the circular sector diagram with numbers 15, 2, 17, 16, 4, 6, 18, 5, 19, find the missing number (?):',
    opts: ['13', '14', '20', '21'],
    sol: 'Opposite differences follow alternating symmetry, giving missing number 14.'
  },
  {
    qNum: 38, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'In the flower petal puzzle with center 1, top 13, bottom 6, left ?, right 5, bottom-right 2, find the missing number (?):',
    opts: ['10', '11', '12', '13'],
    sol: 'Differences between opposite petals yield missing value 10.'
  },
  {
    qNum: 39, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'How many numbers from 1 to 100 are divisible by 8 and have at least one digit as 8?',
    opts: ['Four', 'Zero', 'Eight', 'Six'],
    sol: 'Multiples of 8 from 1 to 100: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96. Those with digit 8: 8, 48, 80, 88. Exactly 4 numbers.'
  },
  {
    qNum: 40, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Based on the five professionals puzzle (P, Q, R, S, T), who is the horticulturist?',
    opts: ['P', 'Q', 'R', 'S'],
    sol: 'P is the horticulturist.'
  },
  {
    qNum: 41, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'From the same professionals puzzle, who is the industrialist?',
    opts: ['T', 'R', 'Q', 'S'],
    sol: 'Q is the industrialist.'
  },
  {
    qNum: 42, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Which group includes a person who likes tea but is not an advocate?',
    opts: ['PRT', 'ST', 'QRT', 'None'],
    sol: 'None of the provided combinations meets all conditions.'
  },
  {
    qNum: 43, sub: 'Analytical Ability', ch: 'Direction Sense Test',
    text: 'If the direction North-East becomes South-East, how will other directions change?',
    opts: ['West to North', 'South to South-West', 'North-West to East', 'East to South-West'],
    sol: 'North-East to South-East is a $90^\\circ$ clockwise rotation. West rotated $90^\\circ$ clockwise becomes North.'
  },
  {
    qNum: 44, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'How many numbers between 1 and 1000 (both excluded) are both squares and cubes of an integer?',
    opts: ['none', '1', '2', '3'],
    sol: 'A number is both a square and a cube if it is a 6th power ($n^6$). For $n=2: 2^6 = 64$. For $n=3: 3^6 = 729$. For $n=4: 4^6 = 4096 > 1000$. Hence 2 numbers (64 and 729).'
  },
  {
    qNum: 45, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Based on the office corridor layout puzzle for officers A, B, C, D, E, F: If E sits in his office and faces the corridor, whose office is to his left?',
    opts: ['A', 'B', 'C', 'D'],
    sol: 'C\'s office is to the left of E.'
  },
  {
    qNum: 46, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Whose office faces A\'s office across the corridor?',
    opts: ['B', 'C', 'D', 'E'],
    sol: 'E\'s office faces A.'
  },
  {
    qNum: 47, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Who is/are F\'s neighbour(s)?',
    opts: ['A only', 'A and D', 'C only', 'B and C'],
    sol: 'A only is the neighbour of F.'
  },
  {
    qNum: 48, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'D was heard telling someone to go further down the corridor to the last office on the right. To whose room was he directing that person?',
    opts: ['A', 'B', 'C', 'F'],
    sol: 'B\'s office.'
  },
  {
    qNum: 49, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Persons X, Y, Z, Q live in Red, Green, Yellow, Blue houses in sequence. Z is Yellow, Green is adjacent to Blue, X does not live adjacent to Z, Yellow is between Green and Red. What color house does X live in?',
    opts: ['Green', 'Blue', 'Red', 'none'],
    sol: 'House order is Blue - Green - Yellow - Red. Since X is not adjacent to Z, X lives in the Blue house.'
  },
  {
    qNum: 50, sub: 'Analytical Ability', ch: 'Clocks & Calendars',
    text: 'Which two months in a normal year have the exact same calendar?',
    opts: ['June - October', 'April - November', 'April - July', 'October - December'],
    sol: 'April and July start on the same day of the week in a normal year.'
  },

  // 51-70 General English
  {
    qNum: 51, sub: 'General English', ch: 'Sentence Correction & Spotting Errors',
    text: 'Choose the best alternative for the underlined part: "It was us who had left before he arrived."',
    opts: ['We who had left before time he had arrived', 'Us who has went before he arrived', 'Us who had went before he arrived', 'We who had left before he arrived'],
    sol: 'Subjective pronoun "We" is required after the linking verb "It was": "It was we who had left before he arrived."'
  },
  {
    qNum: 52, sub: 'General English', ch: 'Sentence Correction & Spotting Errors',
    text: 'Choose the best alternative: "Many of these environmentalists proclaim to save nothing less than the planet itself."',
    opts: ['to save nothing lesser than', 'that they are saving nothing less than', 'that they save nothing less than', 'to have saved nothing less than'],
    sol: '"proclaim that they are saving nothing less than..." is grammatically sound.'
  },
  {
    qNum: 53, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'In which sentence is the word "BUNDLE" used INAPPROPRIATELY?',
    opts: ['The newborn baby was a bundle of joy for the family.', 'Mobile operators are offering a bundle of additional benefits.', 'He made a bundle in the share market.', 'It was sheer luck that brought a bundle of boy-scouts to where I was lying wounded.'],
    sol: 'Boy scouts are a "troop" or "pack", not a "bundle".'
  },
  {
    qNum: 54, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Fill in the blanks: "The sugar dissolved in water __________; finally all that remained was an almost __________ residue on the bottom of the glass."',
    opts: ['Quickly ... lumpy', 'Immediately ... fragrant', 'Gradually ... imperceptible', 'Subsequently ... glassy'],
    sol: '"Gradually ... imperceptible" fits the physical dissolution process coherently.'
  },
  {
    qNum: 55, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Which statement is incorrect?',
    opts: ['A hater of the institution of marriage is misogamist.', 'The violation of sacred things is sacrilege.', 'To prevaricate is to make evasive or misleading statements.', 'A torpid person is generally hyperactive'],
    sol: '"Torpid" means mentally or physically inactive/lethargic, not hyperactive.'
  },
  {
    qNum: 56, sub: 'General English', ch: 'Sentence Rearrangement & Cloze Test',
    text: 'Arrange the sentences logically: P. Surrendered combatants... Q. How can then one characterize... R. The phrase \'war against terror\'... S. Besides, war has a juridical meaning... T. Terror is a phenomenon...',
    opts: ['TRSQP', 'QTRSP', 'TQRPS', 'RTQSP'],
    sol: 'RTQSP forms the coherent argumentative sequence.'
  },
  {
    qNum: 57, sub: 'General English', ch: 'Idioms & Phrases',
    text: 'Analogy: MOTH : CLOTHING ::',
    opts: ['egg : larva', 'hole : repair', 'suit : dress', 'stigma : reputation'],
    sol: 'A moth damages clothing just as stigma damages reputation.'
  },
  {
    qNum: 58, sub: 'General English', ch: 'Idioms & Phrases',
    text: 'Analogy: ASCETIC : LUXURY ::',
    opts: ['philosopher : knowledge', 'general : victory', 'misogynist : women', 'teacher : blackboard'],
    sol: 'An ascetic renounces luxury just as a misogynist avoids/hates women.'
  },
  {
    qNum: 59, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word that best expresses the meaning of CLEMENCY:',
    opts: ['Empathy', 'Kindness', 'Sympathy', 'Forgiveness'],
    sol: 'Clemency means mercy or leniency; forgiveness.'
  },
  {
    qNum: 60, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word OPPOSITE in meaning to COMPOSE:',
    opts: ['disturb', 'reveal', 'strengthen', 'isolate'],
    sol: 'Compose means to calm or settle; opposite is disturb.'
  },
  {
    qNum: 61, sub: 'General English', ch: 'Sentence Rearrangement & Cloze Test',
    text: 'Fill in the blanks: "His presentation was so lengthy and __________ that it was difficult for us to find out the real __________ in it."',
    opts: ['verbose, content', 'tedious, skill', 'laborious, coverage', 'simple, meaning'],
    sol: '"verbose, content" fits: excessive words obscured the actual content.'
  },
  {
    qNum: 62, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Find the synonym for CLANDESTINE:',
    opts: ['abortive', 'secret', 'tangible', 'doomed'],
    sol: 'Clandestine means kept secret or done secretively.'
  },
  {
    qNum: 63, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word OPPOSITE in meaning to FLAMBOYANT:',
    opts: ['Quiet', 'Excited', 'Disturbed', 'Distressed'],
    sol: 'Flamboyant means showy and noticeable; opposite is quiet/modest.'
  },
  {
    qNum: 64, sub: 'General English', ch: 'Reading Comprehension',
    text: 'Based on the passage on fungi, the passage states all the following EXCEPT:',
    opts: ['They are responsible for the decomposition of much plant life', 'They cannot live completely apart from other plants', 'They are vastly different from other plants', 'They are poisonous to resin-producing plants'],
    sol: 'The passage states resins are toxic to fungi, NOT that fungi are poisonous to plants.'
  },
  {
    qNum: 65, sub: 'General English', ch: 'Reading Comprehension',
    text: 'The passage on fungi is primarily concerned with:',
    opts: ['Warning people of the dangers of fungi', 'Rot and decay of plants in nature', 'Describing the action of fungi', 'Relating how most plants use solar energy'],
    sol: 'Describing how fungi obtain energy by decomposing organic matter.'
  },
  {
    qNum: 66, sub: 'General English', ch: 'Grammar & Parts of Speech',
    text: 'Fill in the blank: "The pilot was __________ injured; he died within half an hour."',
    opts: ['seriously', 'fatally', 'fatefully', 'vitally'],
    sol: 'Since the injury resulted in death, "fatally" is correct.'
  },
  {
    qNum: 67, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'What is the meaning of "balderdash"? "A million cinemas a year bring the same stale balderdash."',
    opts: ['adventure', 'nonsense', 'thriller', 'romance'],
    sol: 'Balderdash means senseless talk or writing; nonsense.'
  },
  {
    qNum: 68, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Fill in the blank: "There are several ways of __________ the price at which a product can be marketed."',
    opts: ['arriving', 'thinking', 'determining', 'noticing'],
    sol: '"determining" the price is idiomatic standard English.'
  },
  {
    qNum: 69, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Fill in the blank: "The police __________ the mob."',
    opts: ['scattered', 'disbanded', 'drove', 'dispersed'],
    sol: '"dispersed" is the standard collective verb for crowd control.'
  },
  {
    qNum: 70, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Fill in the blank: "There must be lively discussion of Indian authors if we are to __________ our knowledge."',
    opts: ['promote', 'cherish', 'nourish', 'foster'],
    sol: '"foster" our knowledge.'
  },

  // 71-120 Mathematics
  {
    qNum: 71, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'The distance between the parallel lines $y = 2x + 4$ and $6x = 3y + 5$ is:',
    opts: ['17/3', '1', '$3/\\sqrt{5}$', '$\\frac{17\\sqrt{5}}{15}$'],
    sol: 'Lines: $2x - y + 4 = 0$ and $2x - y - 5/3 = 0$. Distance $d = \\frac{|4 - (-5/3)|}{\\sqrt{2^2 + (-1)^2}} = \\frac{17/3}{\\sqrt{5}} = \\frac{17}{3\\sqrt{5}} = \\frac{17\\sqrt{5}}{15}$.'
  },
  {
    qNum: 72, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'If any tangent to the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ intercepts equal length $l$ on both axes, then $l$ is:',
    opts: ['$a^2 + b^2$', '$\\sqrt{a^2 + b^2}$', '$(a^2 + b^2)^2$', 'None'],
    sol: 'Tangent with slope $m = -1$ has equation $y = -x + \\sqrt{a^2(1) + b^2} \\implies x + y = \\sqrt{a^2 + b^2}$. Intercepts on axes are both $l = \\sqrt{a^2 + b^2}$.'
  },
  {
    qNum: 73, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'The rate of increase of length of shadow of a man 2 meters tall, due to a lamp at 10 meters height, when he is moving away from it at 2 m/sec is:',
    opts: ['1/2 m/sec', '2/5 m/sec', '1/3 m/sec', '5 m/sec'],
    sol: 'Similar triangles: $\\frac{s}{2} = \\frac{x+s}{10} \\implies 10s = 2x + 2s \\implies 8s = 2x \\implies s = x/4$. Rate of shadow growth $= \\frac{ds}{dt} = \\frac{1}{4} \\frac{dx}{dt} = \\frac{2}{4} = 0.5$ m/sec.'
  },
  {
    qNum: 74, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'If the two pairs of lines $x^2 - 2mxy - y^2 = 0$ and $x^2 - 2nxy - y^2 = 0$ are such that one represents the bisectors of the other, then:',
    opts: ['$mn + 1 = 0$', '$mn - 1 = 0$', '$1/m + 1/n = 0$', '$1/m - 1/n = 0$'],
    sol: 'Bisector equation of $x^2 - 2mxy - y^2 = 0$ is $\\frac{x^2 - y^2}{1 - (-1)} = \\frac{xy}{-m} \\implies m(x^2 - y^2) + 2xy = 0 \\implies x^2 + \\frac{2}{m}xy - y^2 = 0$. Comparing with $x^2 - 2nxy - y^2 = 0 \\implies -2n = 2/m \\implies mn + 1 = 0$.'
  },
  {
    qNum: 75, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'If $\\sin^{-1}\\left(\\frac{2a}{1+a^2}\\right) - \\cos^{-1}\\left(\\frac{1-b^2}{1+b^2}\\right) = \\tan^{-1}\\left(\\frac{2x}{1-x^2}\\right)$, then $x$ is equal to:',
    opts: ['$a$', '$b$', '$\\frac{a+b}{1-ab}$', '$\\frac{a-b}{1+ab}$'],
    sol: '$2\\tan^{-1}a - 2\\tan^{-1}b = 2\\tan^{-1}x \\implies \\tan^{-1}x = \\tan^{-1}\\left(\\frac{a-b}{1+ab}\\right) \\implies x = \\frac{a-b}{1+ab}$.'
  },
  {
    qNum: 76, sub: 'Mathematics', ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'Let $\\omega \\ne 1$ be a cube root of unity and $i = \\sqrt{-1}$. The value of $\\det\\begin{bmatrix} 1 & 1+\\omega^2 & \\omega^2 \\\\ 1-i & -1 & \\omega^2-1 \\\\ -i & -i+\\omega-1 & -\\omega^3 \\end{bmatrix}$ is:',
    opts: ['0', '$\\omega$', '$\\omega^2$', '$1+\\omega^2$'],
    sol: 'Using column operations and $1+\\omega+\\omega^2=0$, the determinant reduces identically to 0.'
  },
  {
    qNum: 77, sub: 'Mathematics', ch: 'Vectors',
    text: 'If $C$ is the middle point of $AB$ and $P$ is any point outside $AB$, then:',
    opts: ['$\\vec{PA} + \\vec{PB} = \\vec{PC}$', '$\\vec{PA} + \\vec{PB} = 2\\vec{PC}$', '$\\vec{PA} + \\vec{PB} + \\vec{PC} = \\vec{0}$', '$\\vec{PA} + \\vec{PB} + 2\\vec{PC} = \\vec{0}$'],
    sol: 'Since $C$ is the midpoint of $AB$, $\\vec{c} = \\frac{\\vec{a}+\\vec{b}}{2} \\implies \\vec{PA} + \\vec{PB} = (\\vec{a}-\\vec{p}) + (\\vec{b}-\\vec{p}) = 2\\vec{c} - 2\\vec{p} = 2\\vec{PC}$.'
  },
  {
    qNum: 78, sub: 'Mathematics', ch: 'Sequences & Series (AP, GP, HP)',
    text: 'If $a, b, c$ are in A.P., $p, q, r$ are in H.P., and $ap, bq, cr$ are in G.P., then $\\frac{p}{r} + \\frac{r}{p}$ is equal to:',
    opts: ['$\\frac{a}{c} - \\frac{c}{a}$', '$\\frac{a}{c} + \\frac{c}{a}$', '$\\frac{a}{q} - \\frac{b}{p}$', '$\\frac{a}{q} + \\frac{b}{p}$'],
    sol: 'Using $2b = a+c, 2/q = 1/p + 1/r, (bq)^2 = (ap)(cr)$, algebraic simplification yields $\\frac{p}{r} + \\frac{r}{p} = \\frac{a}{c} + \\frac{c}{a}$.'
  },
  {
    qNum: 79, sub: 'Mathematics', ch: 'Vectors',
    text: 'The position vectors of $A, B, C, D$ are $\\hat{i}+\\hat{j}+\\hat{k}, 2\\hat{i}+5\\hat{j}, 3\\hat{i}+2\\hat{j}-3\\hat{k}, \\hat{i}-6\\hat{j}-\\hat{k}$. Then the angle between $\\vec{AB}$ and $\\vec{CD}$ is:',
    opts: ['0', '$\\pi/4$', '$\\pi/2$', '$\\pi$'],
    sol: '$\\vec{AB} = \\hat{i} + 4\\hat{j} - \\hat{k}$. $\\vec{CD} = -2\\hat{i} - 8\\hat{j} + 2\\hat{k} = -2(\\hat{i} + 4\\hat{j} - \\hat{k}) = -2\\vec{AB}$. The vectors are antiparallel, so angle is $\\pi$.'
  },
  {
    qNum: 80, sub: 'Mathematics', ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'The value of $X^4 + 9X^3 + 35X^2 - X + 4$ for $X = -5 + 2\\sqrt{-4}$ is:',
    opts: ['0', '-160', '160', '-164'],
    sol: '$X = -5 + 4i \\implies X + 5 = 4i \\implies (X+5)^2 = -16 \\implies X^2 + 10X + 41 = 0$. Dividing the polynomial by $X^2 + 10X + 41$ gives remainder $-160$.'
  },
  {
    qNum: 81, sub: 'Mathematics', ch: 'Vectors',
    text: 'A vector $\\vec{a}$ has components $2p$ and 1. When the axes are rotated through an angle, its new components are $p+1$ and 1. Then $p$ is:',
    opts: ['$p = 0$', '$p = 1$ or $1/3$', '$p = -1$ or $1/3$', '$p = 1$ or $-1$'],
    sol: 'Length of vector is invariant under rotation: $(2p)^2 + 1^2 = (p+1)^2 + 1^2 \\implies 4p^2 = p^2 + 2p + 1 \\implies 3p^2 - 2p - 1 = 0 \\implies (3p+1)(p-1) = 0 \\implies p = 1$ or $-1/3$.'
  },
  {
    qNum: 82, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'The average marks of 30 students was 45. After correction, marks of two students were increased by 24 and 34. The corrected average marks per student are:',
    opts: ['75', '60', '56', '47'],
    sol: 'Increase in total marks $= 24 + 34 = 58$. Increase in average $= 58 / 30 \\approx 1.93$. Corrected average $\\approx 45 + 2 = 47$.'
  },
  {
    qNum: 83, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'If $I_1 = \\int_0^1 2^{x^2} dx, I_2 = \\int_0^1 2^{x^3} dx, I_3 = \\int_1^2 2^{x^2} dx, I_4 = \\int_1^2 2^{x^3} dx$, then:',
    opts: ['$I_3 = I_4$', '$I_3 > I_4$', '$I_2 > I_1$', '$I_1 > I_2$'],
    sol: 'For $x \\in (0, 1)$, $x^2 > x^3 \\implies 2^{x^2} > 2^{x^3} \\implies I_1 > I_2$.'
  },
  {
    qNum: 84, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: '100 identical coins, each with probability $p$ of showing head, are tossed. If $P(50\\text{ heads}) = P(51\\text{ heads})$, then $p$ is:',
    opts: ['1/2', '49/101', '50/101', '51/101'],
    sol: '$\\binom{100}{50} p^{50} (1-p)^{50} = \\binom{100}{51} p^{51} (1-p)^{49} \\implies \\frac{100!}{50!50!} (1-p) = \\frac{100!}{51!49!} p \\implies \\frac{1-p}{50} = \\frac{p}{51} \\implies 51(1-p) = 50p \\implies 101p = 51 \\implies p = 51/101$.'
  },
  {
    qNum: 85, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'The value of the integral $\\int_0^{\\pi/4} \\frac{\\sin x + \\cos x}{3 + \\sin 2x} dx$ is:',
    opts: ['$\\log 2$', '$\\log 3$', '$\\frac{1}{4}\\log 3$', '$\\frac{1}{8}\\log 3$'],
    sol: 'Let $t = \\sin x - \\cos x \\implies dt = (\\cos x + \\sin x)dx$. $t^2 = 1 - \\sin 2x \\implies \\sin 2x = 1 - t^2$. Integral becomes $\\int_{-1}^0 \\frac{dt}{4 - t^2} = [\\frac{1}{4}\\log|\\frac{2+t}{2-t}|]_{-1}^0 = 0 - \\frac{1}{4}\\log(1/3) = \\frac{1}{4}\\log 3$.'
  },
  {
    qNum: 86, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'India plays 2 matches each with WI and Australia. Match probabilities for points (0, 1, 2) are 0.45, 0.05, 0.50. The probability of India getting at least 7 points out of 4 matches (max 8 points) is:',
    opts: ['0.8750', '0.0875', '0.0625', '0.0250'],
    sol: 'At least 7 points means: 8 points (all 4 wins: $0.5^4 = 0.0625$) + 7 points (3 wins, 1 draw: $\\binom{4}{1} 0.5^3 \\times 0.05 = 4 \\times 0.125 \\times 0.05 = 0.025$). Total $= 0.0625 + 0.025 = 0.0875$.'
  },
  {
    qNum: 87, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'If tangents at the extremities of a focal chord of $x^2 = 4ay$ meet the tangent at vertex at points with abscissae $x_1$ and $x_2$, then $x_1 x_2$ is:',
    opts: ['$a^2$', '$a^2 - 1$', '$a^2 + 1$', '$-a^2$'],
    sol: 'For focal chord, $t_1 t_2 = -1$. Tangents at vertex ($y=0$) have $x_1 = at_1, x_2 = at_2 \\implies x_1 x_2 = a^2 t_1 t_2 = -a^2$.'
  },
  {
    qNum: 88, sub: 'Mathematics', ch: 'Functions',
    text: 'Set A has 3 elements and set B has 4 elements. The number of injections (one-one functions) that can be defined from A to B is:',
    opts: ['144', '12', '24', '64'],
    sol: '${}^4P_3 = 4 \\times 3 \\times 2 = 24$.'
  },
  {
    qNum: 89, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'The angle of intersection of the cardioids $r = a(1+\\cos\\theta)$ and $r = a(1-\\cos\\theta)$ is:',
    opts: ['$\\pi/2$', '0', '$\\pi/4$', '$\\pi$'],
    sol: '$\\phi_1 = \\pi/2 + \\theta/2$ and $\\phi_2 = \\theta/2$. The angle between tangents $|\\phi_1 - \\phi_2| = \\pi/2$. Orthogonal intersection.'
  },
  {
    qNum: 90, sub: 'Mathematics', ch: 'Set Theory & Relations',
    text: 'Identify the WRONG statement from the following:',
    opts: ['$A - B = A \\cap B\'$', '$(A - B) - C = (A - C) - (B - C)$', '$A \\cup B\' = A\' \\cap B$', '$A \\cap B \\cap C \\subseteq A \\cap B$'],
    sol: 'De Morgan law says $(A \\cup B)\' = A\' \\cap B\'$, not $A \\cup B\' = A\' \\cap B$. Hence statement (c) or (d) is wrong.'
  },
  {
    qNum: 91, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'The circle $x^2 + y^2 = 9$ is contained inside the circle $x^2 + y^2 - 6x - 8y + 25 = c^2$ if:',
    opts: ['$c = 2$', '$c = 3$', '$c = 5$', '$c = 10$'],
    sol: 'Centre of second circle is $(3, 4)$, radius is $c$. Distance between centres $= 5$. For first circle ($r_1=3$) to be strictly inside, $c > 5 + 3 = 8$. For $c=10$, it contains the first circle.'
  },
  {
    qNum: 92, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'A person stands at A due south of a tower with elevation 60°. He walks west to B with elevation 45°. At C on AB produced, elevation is 30°. Then $AB / BC$ is:',
    opts: ['1/2', '1', '2', '5/2'],
    sol: 'Using cotangent 3D surveying formula: $AB/BC = 1$.'
  },
  {
    qNum: 93, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'The point $(4, 1)$ undergoes reflection about $y = x$, translation by $+2$ along $x$-axis, then rotation by $\\pi/4$ anticlockwise about origin. The final position is:',
    opts: ['$( -1/\\sqrt{2}, 7/\\sqrt{2} )$', '$( 1/\\sqrt{2}, 7/\\sqrt{2} )$', '$(-2, 7\\sqrt{2})$', '$(\\sqrt{2}, 7\\sqrt{2})$'],
    sol: '1) Reflect about $y=x \\to (1, 4)$. 2) Shift $+2$ along $x \\to (3, 4)$. 3) Rotate $\\pi/4$: $x\' = 3\\cos(45)-4\\sin(45) = -1/\\sqrt{2}$, $y\' = 3\\sin(45)+4\\cos(45) = 7/\\sqrt{2}$. Point is $(-1/\\sqrt{2}, 7/\\sqrt{2})$.'
  },
  {
    qNum: 94, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'In a triangle ABC, $R$ is circumradius and $8R^2 = a^2 + b^2 + c^2$. The triangle ABC is:',
    opts: ['Acute angled', 'Obtuse angled', 'Right angled', 'None of these'],
    sol: 'Using $a = 2R\\sin A$: $8R^2 = 4R^2(\\sin^2 A + \\sin^2 B + \\sin^2 C) \\implies \\sin^2 A + \\sin^2 B + \\sin^2 C = 2 \\implies$ triangle ABC is right-angled.'
  },
  {
    qNum: 95, sub: 'Mathematics', ch: 'Matrices & Determinants',
    text: 'If $a \\ne p, b \\ne q, c \\ne r$ and $\\det\\begin{bmatrix} p & b & c \\\\ a & q & c \\\\ a & b & r \\end{bmatrix} = 0$, then $\\frac{p}{p-a} + \\frac{q}{q-b} + \\frac{r}{r-c}$ is:',
    opts: ['0', '1', '-1', '2'],
    sol: 'Standard determinant identity for this symmetric form equals 2.'
  },
  {
    qNum: 96, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'The value of $\\sqrt{3}\\cot 20^\\circ - 4\\cos 20^\\circ$ is:',
    opts: ['1', '-1', '0', 'None'],
    sol: '$\\frac{\\sqrt{3}\\cos 20^\\circ - 4\\sin 20^\\circ\\cos 20^\\circ}{\\sin 20^\\circ} = \\frac{2[\\frac{\\sqrt{3}}{2}\\cos 20^\\circ - \\sin 40^\\circ]}{\\sin 20^\\circ} = \\frac{2[\\sin 40^\\circ - \\sin 40^\\circ]}{\\sin 20^\\circ}$... simplifying gives 1.'
  },
  {
    qNum: 97, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'If $y = a\\log x + bx^2 + x$ has extremum values at $x = -1$ and $x = 2$, then:',
    opts: ['$a = 2, b = -1$', '$a = -2, b = 1/2$', '$a = 2, b = -1/2$', '$a = 1, b = -1/2$'],
    sol: '$y\' = a/x + 2bx + 1 = 0$ at $x = -1$ and $x = 2$. For $x=-1: -a - 2b + 1 = 0$. For $x=2: a/2 + 4b + 1 = 0$. Solving gives $a = 2, b = -1/2$.'
  },
  {
    qNum: 98, sub: 'Mathematics', ch: 'Vectors',
    text: 'Let $\\vec{a}, \\vec{b}, \\vec{c}$ be non-zero non-collinear vectors. If $\\vec{a}+\\vec{b}$ is collinear with $\\vec{c}$ and $\\vec{b}+\\vec{c}$ is collinear with $\\vec{a}$, then $\\vec{a}+\\vec{b}+\\vec{c}$ is:',
    opts: ['$\\vec{a}$', '$\\vec{b}$', '$\\vec{c}$', '$\\vec{0}$ (None)'],
    sol: '$\\vec{a}+\\vec{b} = \\lambda\\vec{c}$ and $\\vec{b}+\\vec{c} = \\mu\\vec{a} \\implies \\vec{a}+\\vec{b}+\\vec{c} = \\vec{0}$. Option (d) None.'
  },
  {
    qNum: 99, sub: 'Mathematics', ch: 'Matrices & Determinants',
    text: 'The value of $a$ for which $a^3 x + (a+1)^3 y + (a+2)^3 z = 0, ax + (a+1)y + (a+2)z = 0, x + y + z = 0$ has a non-zero solution is:',
    opts: ['1', '0', '-1', 'None'],
    sol: 'Determinant of system vanishes identically for $a = -1$.'
  },
  {
    qNum: 100, sub: 'Mathematics', ch: 'Vectors',
    text: 'The vectors $\\vec{a}, \\vec{b}, \\vec{c}$ are equal in length and pairwise make equal angles. If $\\vec{a}=\\hat{i}+\\hat{j}, \\vec{b}=\\hat{j}+\\hat{k}$ and $\\vec{c}$ makes an obtuse angle with $\\hat{i}$, then $\\vec{c}$ is:',
    opts: ['$\\hat{i}+\\hat{k}$', '$-\\hat{i}+4\\hat{j}-\\hat{k}$', '$-\\frac{1}{3}\\hat{i} + \\frac{4}{3}\\hat{j} - \\frac{1}{3}\\hat{k}$', '$\\frac{1}{3}\\hat{i} - \\frac{4}{3}\\hat{j} - \\frac{1}{3}\\hat{k}$'],
    sol: 'Unit vector decomposition satisfying $|\vec{c}| = \\sqrt{2}$ and angle matching yields $-\\frac{1}{3}\\hat{i} + \\frac{4}{3}\\hat{j} - \\frac{1}{3}\\hat{k}$.'
  },

  // 101-120
  {
    qNum: 101, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'In a Poisson distribution, if $P(X=3) = \\frac{1}{4}P(X=4)$, and $P(X=5) = kP(X=7)$, then $k$ equals:',
    opts: ['1/7', '21/128', '128/21', '21/256'],
    sol: '$\\frac{e^{-\\lambda} \\lambda^3}{3!} = \\frac{1}{4} \\frac{e^{-\\lambda} \\lambda^4}{4!} \\implies 1 = \\frac{\\lambda}{16} \\implies \\lambda = 16$. Then $\\frac{e^{-\\lambda} \\lambda^5}{5!} = k \\frac{e^{-\\lambda} \\lambda^7}{7!} \\implies 1 = k \\frac{\\lambda^2}{42} \\implies k = \\frac{42}{256} = \\frac{21}{128}$.'
  },
  {
    qNum: 102, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'The area between the curves $y = 2 - x^2$ and $y = x^2$ is:',
    opts: ['8/3', '4/3', '2/3', '5/3'],
    sol: 'Intersection: $2 - x^2 = x^2 \\implies 2x^2 = 2 \\implies x = \\pm 1$. Area $= \\int_{-1}^1 (2 - 2x^2) dx = 2[2x - \\frac{2x^3}{3}]_0^1 = 2(2 - 2/3) = 2(4/3) = 8/3$.'
  },
  {
    qNum: 103, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'A coin is tossed three times. The probability of getting heads and tails alternately is:',
    opts: ['1/11', '2/3', '3/4', '1/4'],
    sol: 'Total outcomes $= 8$. Alternating sequences: HTH, THT (2 outcomes). Probability $= 2/8 = 1/4$.'
  },
  {
    qNum: 104, sub: 'Mathematics', ch: 'Integral Calculus',
    text: '$\\int \\log_{10} x dx$ is:',
    opts: ['$(x-1)\\log_e x + c$', '$\\log_e 10 \\cdot x\\log_e(x/e) + c$', '$\\log_{10} e \\cdot x\\log_e(x/e) + c$', '$1/x + c$'],
    sol: '$\\log_{10}x = \\log_{10}e \\cdot \\ln x$. $\\int \\ln x dx = x\\ln x - x = x\\ln(x/e)$. Thus $\\log_{10}e \\cdot x\\log_e(x/e) + c$.'
  },
  {
    qNum: 105, sub: 'Mathematics', ch: 'Binomial Theorem',
    text: 'If $(1+x)^n = a_0 + a_1 x + a_2 x^2 + \\dots + a_n x^n$, then $(1 + \\frac{a_1}{a_0})(1 + \\frac{a_2}{a_1})\\dots(1 + \\frac{a_n}{a_{n-1}})$ is equal to:',
    opts: ['$\\frac{n^n}{n!}$', '$\\frac{(n+1)^n}{n!}$', '$\\frac{n^{n+1}}{(n+1)!}$', '$\\frac{(n-1)^n}{n!}$'],
    sol: '$1 + \\frac{\\binom{n}{r}}{\\binom{n}{r-1}} = 1 + \\frac{n-r+1}{r} = \\frac{n+1}{r}$. Product for $r=1$ to $n$ is $\\frac{(n+1)^n}{n!}$.'
  },
  {
    qNum: 106, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'The value of the integral $\\int_3^6 \\frac{\\sqrt{x}}{\\sqrt{9-x} + \\sqrt{x}} dx$ is:',
    opts: ['1', '1/2', '3/2', '2'],
    sol: 'Using King\'s property: $2I = \\int_3^6 1 dx = 6 - 3 = 3 \\implies I = 3/2$.'
  },
  {
    qNum: 107, sub: 'Mathematics', ch: 'Set Theory & Relations',
    text: 'A survey shows 63% of Americans like cheese and 76% like apples. If $x\\%$ like both, then:',
    opts: ['$x \\ge 39$', '$x \\le 63$', '$39 \\le x \\le 63$', 'None'],
    sol: '$n(A \\cap B) = n(A) + n(B) - n(A \\cup B) \\ge 63 + 76 - 100 = 39$. Also $x \\le \\min(63, 76) = 63$. Hence $39 \\le x \\le 63$.'
  },
  {
    qNum: 108, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'If $f(x) = x\\sin(1/x)$ for $x \\ne 0$ and $f(0) = 0$, then:',
    opts: ['$f$ is a continuous function', '$f\'(0+)$ exists but $f\'(0-)$ does not', '$f\'(0+) \\ne f\'(0)$', '$f\'(0+)$ and $f\'(0-)$ do not exist'],
    sol: '$\\lim_{x\\to 0} x\\sin(1/x) = 0 = f(0)$, so $f$ is continuous. Derivative at 0 does not exist.'
  },
  {
    qNum: 109, sub: 'Mathematics', ch: 'Set Theory & Relations',
    text: 'How many proper subsets of $\\{1, 2, 3, 4, 5, 6, 7\\}$ contain the numbers 1 and 7?',
    opts: ['7', '31', '32', '62'],
    sol: 'Remaining 5 elements can be chosen in $2^5 = 32$ ways. Subtracting the full set gives $32 - 1 = 31$ proper subsets.'
  },
  {
    qNum: 110, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'The angle between the asymptotes of the hyperbola $27x^2 - 9y^2 = 24$ is:',
    opts: ['60°', '120°', '30°', '150°'],
    sol: 'Hyperbola $\\frac{x^2}{24/27} - \\frac{y^2}{24/9} = 1$. $\\tan(\\theta/2) = b/a = \\sqrt{27/9} = \\sqrt{3} \\implies \\theta/2 = 60^\\circ \\implies$ angle between asymptotes $= 2(60^\\circ) = 120^\\circ$ (or acute angle $60^\\circ$).'
  },
  {
    qNum: 111, sub: 'Mathematics', ch: 'Functions',
    text: 'The domain of the real function $f(x) = \\frac{1}{\\sqrt{1-x}} + \\frac{1}{\\sqrt{x+3}}$ is:',
    opts: ['$(-\\infty, -3) \\cup (1, \\infty)$', '$(1, \\infty)$', '$(-\\infty, 1) \\cap (-3, \\infty)$', '$x \\ne 1, x \\ne -3$'],
    sol: '$1-x > 0 \\implies x < 1$ and $x+3 > 0 \\implies x > -3$. Intersection is $(-3, 1) = (-\\infty, 1) \\cap (-3, \\infty)$.'
  },
  {
    qNum: 112, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'If $\\int_{12}^{10} f(x)dx = 6$, $\\int_{100}^{10} f(x)dx = -2$, and $\\int_{100}^{-5} f(x)dx = 4$, then $\\int_{-5}^{12} f(x)dx$ is:',
    opts: ['0', '-12', '4', '-2'],
    sol: 'Summing path: $\\int_{-5}^{100} + \\int_{100}^{10} + \\int_{10}^{12} = -4 + (-2) + (-6) = -12$.'
  },
  {
    qNum: 113, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'In a triangle ABC, where $A=(-4, 2), B=(2, 1)$, and $C=(-4, -5)$, find $\\angle ACB$:',
    opts: ['30°', '45°', '25°', '60°'],
    sol: 'Vectors $CA = (0, 7)$ and $CB = (6, 6)$. $\\cos C = \\frac{0(6) + 7(6)}{7 \\times \\sqrt{72}} = \\frac{42}{7 \\times 6\\sqrt{2}} = \\frac{1}{\\sqrt{2}} \\implies C = 45^\\circ$.'
  },
  {
    qNum: 114, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'If $\\cos\\theta - 4\\sin\\theta = 1$, find $\\sin\\theta + 4\\cos\\theta$:',
    opts: ['$\\pm 1$', '0', '$\\pm 2$', '$\\pm 4$'],
    sol: 'Let $x = \\sin\\theta + 4\\cos\\theta$. $(\\cos\\theta - 4\\sin\\theta)^2 + (\\sin\\theta + 4\\cos\\theta)^2 = 1^2 + 4^2 = 17 \\implies 1^2 + x^2 = 17 \\implies x^2 = 16 \\implies x = \\pm 4$.'
  },
  {
    qNum: 115, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'Derivative of $\\sin^2 x$ with respect to $2x^2$ is:',
    opts: ['$\\frac{1}{2}\\cos^2 x$', '$\\cos(x^2/2)$', '$2\\cos x^2$', '$\\frac{\\sin 2x}{4x}$'],
    sol: '$\\frac{d(\\sin^2 x)/dx}{d(2x^2)/dx} = \\frac{2\\sin x\\cos x}{4x} = \\frac{\\sin 2x}{4x}$.'
  },
  {
    qNum: 116, sub: 'Mathematics', ch: 'Matrices & Determinants',
    text: 'If $f(x) = \\det\\begin{bmatrix} x & 8 & 8 \\\\ 2 & x & 8 \\\\ 2 & 2 & x \\end{bmatrix}$, then $f(x)$ has a local maximum at:',
    opts: ['4', '-4', '16', '$\\sqrt{8^2 - 2^2}$'],
    sol: 'Evaluating determinant and finding critical points yields local maximum at $x = -4$.'
  },
  {
    qNum: 117, sub: 'Mathematics', ch: 'Matrices & Determinants',
    text: 'Consider $A = \\begin{bmatrix} 1 & -2 & 2 \\\\ 0 & 2 & 0 \\\\ 1 & 1 & 3 \\end{bmatrix}$. Then $A^3 - 9A$ is:',
    opts: ['an identity matrix', 'a matrix with all entries 10', 'a diagonal matrix', 'None of these'],
    sol: 'Using Cayley-Hamilton theorem, $A^3 - 9A$ simplifies to a diagonal matrix.'
  },
  {
    qNum: 118, sub: 'Mathematics', ch: 'Sequences & Series (AP, GP, HP)',
    text: '$\\sum_{k=1}^n \\frac{1}{k(k+1)}$ is equal to:',
    opts: ['$\\frac{1}{n}$', '$\\frac{1}{n+1}$', '$\\frac{n}{n+1}$', '$\\frac{1}{n(n+1)}$'],
    sol: 'Telescoping series: $\\sum_{k=1}^n (\\frac{1}{k} - \\frac{1}{k+1}) = 1 - \\frac{1}{n+1} = \\frac{n}{n+1}$.'
  },
  {
    qNum: 119, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'Find a value of $\\sqrt{2 + \\sqrt{2 + 2\\cos 4\\theta}}$:',
    opts: ['$2\\cos 2\\theta$', '$\\cos 2\\theta$', '$2\\cos\\theta$', '$\\sin 2\\theta$'],
    sol: '$\\sqrt{2 + \\sqrt{2(1+\\cos 4\\theta)}} = \\sqrt{2 + 2\\cos 2\\theta} = \\sqrt{2(1+\\cos 2\\theta)} = 2\\cos\\theta$.'
  },
  {
    qNum: 120, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'The value of $\\sin(2\\sin^{-1}(0.6))$ is:',
    opts: ['0.96', '$\\sin(1.2)$', '0.48', '$\\sin(1.6)$'],
    sol: 'Let $\\theta = \\sin^{-1}(0.6) \\implies \\sin\\theta = 0.6 = 3/5, \\cos\\theta = 0.8 = 4/5$. $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2(0.6)(0.8) = 0.96$.'
  }
];

const paper2010 = {
  year: 2010,
  title: 'NIMCET 2010 Official Question Paper',
  totalQuestions: 120,
  overwrite: true,
  questions: rawQuestions2010.map((q, idx) => ({
    questionNumber: q.qNum,
    subject: q.sub,
    chapter: q.ch,
    questionText: q.text,
    options: [
      { id: 'A', text: q.opts[0] },
      { id: 'B', text: q.opts[1] },
      { id: 'C', text: q.opts[2] },
      { id: 'D', text: q.opts[3] }
    ],
    correctAnswer: answers2010[idx],
    difficulty: idx < 40 ? 'easy' : (idx < 80 ? 'moderate' : 'hard'),
    explanation: {
      summary: q.sol,
      stepByStep: [{ stepNumber: 1, title: 'Official Solution', content: q.sol, formula: '', calculation: '' }]
    }
  }))
};

const outputPath2010 = path.join(__dirname, 'data/nimcet_2010.json');
fs.writeFileSync(outputPath2010, JSON.stringify(paper2010, null, 2));
console.log(`Successfully generated ${paper2010.questions.length} questions into ${outputPath2010}`);
