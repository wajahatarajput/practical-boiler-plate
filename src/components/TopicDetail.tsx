import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Lightbulb, BookOpen, Target } from 'lucide-react';
import type { Progress, TopicId } from './TopicExplorer';


interface Concept {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  why: string;
  when: string;
  where: string;
  conditions: string[];
  formula?: string;
  examples: Array<{
    question: string;
    solution: string;
    explanation: string;
  }>;
  commonMistakes?: string[];
  tips?: string[];
}

interface TopicDetailProps {
  topicId: TopicId;
  onBack: () => void;
  progress: Progress;
  setProgress: (progress: Progress) => void;
}

const TopicDetail = ({ topicId, onBack, progress, setProgress }: TopicDetailProps) => {
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(new Set());
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const topicData: Record<TopicId, { title: string; icon: string; concepts: Concept[] }> = {
    arithmetic: {
      title: 'Arithmetic Fundamentals',
      icon: '🔢',
      concepts: [
        {
          id: 'sign-rules',
          title: 'Sign Rules & Basic Operations',
          level: 'beginner',
          why: 'Understanding sign rules helps you quickly determine the sign of expressions without full calculation, saving time and reducing errors.',
          when: 'Use when: evaluating expressions with multiple operations, comparing quantities, solving inequalities, or eliminating answer choices.',
          where: 'Applied in: arithmetic problems, algebraic simplifications, quantitative comparisons, and word problems involving positive/negative numbers.',
          conditions: [
            'Multiplication: (+) × (+) = (+), (+) × (-) = (-), (-) × (-) = (+)',
            'Division: (+) ÷ (+) = (+), (+) ÷ (-) = (-), (-) ÷ (-) = (+)',
            'Division by zero is ALWAYS undefined',
            'Zero divided by any number equals zero',
          ],
          formula: '(+) × (+) = (+)   |   (+) × (–) = (–)   |   (–) × (–) = (+)',
          examples: [
            {
              question: 'If x < 0 and y > 0, what is the sign of (x²y)/(−x)?',
              solution: 'x² is always positive → x² × y = positive × positive = positive → positive ÷ negative = negative',
              explanation: 'Since x² is always positive regardless of x, and y is positive, their product is positive. Dividing by negative x gives a negative result.',
            },
            {
              question: 'Evaluate: (−3) × (−4) ÷ (−2) × (−1)',
              solution: '(−3) × (−4) = +12 → +12 ÷ (−2) = −6 → −6 × (−1) = +6',
              explanation: 'Work step by step: two negatives multiply to positive, then divide by negative gives negative, then multiply by negative gives positive.',
            },
          ],
          commonMistakes: [
            'Forgetting that division by zero is undefined',
            'Mixing up multiplication and division rules',
            'Not working step-by-step in complex expressions',
          ],
          tips: [
            'Count the number of negative signs: even number = positive, odd number = negative',
            'Work left to right, one operation at a time',
            'Use sign rules to eliminate wrong answer choices quickly',
          ],
        },
        {
          id: 'factors-multiples',
          title: 'Factors, Multiples & Prime Numbers',
          level: 'beginner',
          why: 'Essential for simplifying fractions, finding common denominators, solving word problems about grouping or timing, and understanding number properties.',
          when: 'Use LCM for "when will they meet/align?" problems. Use GCD for "maximum equal groups/size" problems. Use prime factorization for simplifying large numbers.',
          where: 'Applied in: fraction operations, word problems (buses, groups, cycles), simplifying radicals, and number theory questions.',
          conditions: [
            'Prime: exactly 2 factors (1 and itself)',
            '1 is NOT prime (only one factor)',
            '2 is the ONLY even prime number',
            'LCM × GCD = a × b (for any two numbers a and b)',
          ],
          formula: 'LCM × GCD = a × b',
          examples: [
            {
              question: 'Bus A arrives every 15 minutes, Bus B every 20 minutes. If they arrive together at 9 AM, when next together?',
              solution: 'LCM(15, 20) = 60 minutes → Next together: 9:00 AM + 60 minutes = 10:00 AM',
              explanation: 'LCM finds the smallest time when both cycles align. Prime factors: 15 = 3×5, 20 = 2²×5, so LCM = 2²×3×5 = 60.',
            },
            {
              question: 'Divide 24 apples and 36 oranges into identical baskets. Maximum baskets?',
              solution: 'GCD(24, 36) = 12 → Maximum baskets = 12 → Each basket: 2 apples, 3 oranges',
              explanation: 'GCD finds the largest number that divides both quantities evenly. Prime factors: 24 = 2³×3, 36 = 2²×3², so GCD = 2²×3 = 12.',
            },
          ],
          commonMistakes: [
            'Thinking 1 is prime',
            'Confusing LCM and GCD',
            'Not using prime factorization efficiently',
          ],
          tips: [
            'Use prime factorization to find LCM and GCD quickly',
            'LCM × GCD formula helps when you know one and need the other',
            'For word problems, identify if you need "when" (LCM) or "how many" (GCD)',
          ],
        },
        {
          id: 'even-odd',
          title: 'Even & Odd Numbers',
          level: 'beginner',
          why: 'Allows quick determination of number properties without calculation, helps eliminate impossible answer choices, and essential for quantitative comparison.',
          when: 'Use when: determining parity without calculation, quantitative comparison with variables, eliminating impossible answer choices, or number properties questions.',
          where: 'Applied in: quantitative comparisons, number theory, algebraic expressions, and problem-solving strategies.',
          conditions: [
            'Addition: E+E=E, O+O=E, E+O=O',
            'Subtraction: E−E=E, O−O=E, E−O=O, O−E=O',
            'Multiplication: E×any=E, O×O=O',
            '0 is even, 1 is odd',
            'Product of consecutive integers is always even',
          ],
          examples: [
            {
              question: 'If n is integer, which MUST be even? A) n²+n+1  B) n(n+1)  C) n²+1  D) 2n+1',
              solution: 'B) n(n+1) → product of consecutive integers → ALWAYS even',
              explanation: 'Consecutive integers are one even and one odd. Their product is always even. Test others: A can be odd (n=1), C can be even or odd, D is always odd.',
            },
          ],
          commonMistakes: [
            'Thinking 0 is odd',
            'Assuming all even operations result in even',
            'Not testing with actual numbers',
          ],
          tips: [
            'Test with actual numbers: 0, 1, 2, -1',
            'Remember: product of consecutive integers is always even',
            'Use parity rules to eliminate answer choices quickly',
          ],
        },
        {
          id: 'exponents-roots',
          title: 'Exponents & Roots',
          level: 'intermediate',
          why: 'Critical for simplifying algebraic expressions, solving exponential equations, and comparing quantities with different powers.',
          when: 'Use when: simplifying algebraic expressions, solving exponential equations, comparing quantities with powers, or quantitative comparison questions.',
          where: 'Applied in: algebra problems, exponential growth/decay, radical simplifications, and quantitative comparisons.',
          conditions: [
            'Multiplication: bᵐ × bⁿ = bᵐ⁺ⁿ',
            'Division: bᵐ ÷ bⁿ = bᵐ⁻ⁿ',
            'Power: (bᵐ)ⁿ = bᵐⁿ',
            'Roots: √(ab) = √a × √b',
            'CRITICAL: √(a+b) ≠ √a + √b',
            'b⁰ = 1, b⁻ⁿ = 1/bⁿ',
          ],
          formula: 'bᵐ × bⁿ = bᵐ⁺ⁿ   |   bᵐ ÷ bⁿ = bᵐ⁻ⁿ   |   (bᵐ)ⁿ = bᵐⁿ',
          examples: [
            {
              question: 'Simplify: (2³ × 4²) ÷ 8',
              solution: 'Write all as powers of 2: 4² = (2²)² = 2⁴, 8 = 2³ → (2³ × 2⁴) ÷ 2³ = 2³⁺⁴⁻³ = 2⁴ = 16',
              explanation: 'Convert everything to same base (2), then use exponent rules: add exponents when multiplying, subtract when dividing.',
            },
            {
              question: 'If 2ˣ⁺³ = 32, find 3ˣ⁺²',
              solution: '32 = 2⁵ → 2ˣ⁺³ = 2⁵ → x+3 = 5 → x = 2 → 3ˣ⁺² = 3⁴ = 81',
              explanation: 'Set exponents equal when bases are equal. Then substitute x into the second expression.',
            },
          ],
          commonMistakes: [
            'Assuming √(a+b) = √a + √b (WRONG!)',
            'Mixing up multiplication and addition rules',
            'Forgetting that b⁰ = 1',
          ],
          tips: [
            'Always convert to same base when possible',
            'Remember: √(a+b) ≠ √a + √b',
            'Use exponent rules systematically: multiply = add exponents, divide = subtract exponents',
          ],
        },
        {
          id: 'inequalities',
          title: 'Inequalities',
          level: 'intermediate',
          why: 'Essential for solving range problems, comparing quantities, and understanding how operations affect relationships.',
          when: 'Use when: solving inequality equations, comparing fractions between 0 and 1, quantitative comparison with variables, or word problems involving ranges.',
          where: 'Applied in: algebra problems, quantitative comparisons, optimization problems, and real-world scenarios with constraints.',
          conditions: [
            'Add/subtract same number → preserves inequality',
            'Multiply/divide by positive → preserves inequality',
            'Multiply/divide by negative → REVERSES inequality',
            'If 0 < x < 1: x² < x and √x > x',
          ],
          examples: [
            {
              question: 'Solve: 3 − 2x ≤ 7',
              solution: '3 − 2x ≤ 7 → −2x ≤ 4 → x ≥ −2 (flip sign when dividing by −2!)',
              explanation: 'When dividing by negative number, the inequality sign reverses. Always check if you\'re dividing by negative.',
            },
            {
              question: 'Compare: x = 0.25, which is greater: x² or √x?',
              solution: 'x² = (0.25)² = 0.0625, √x = √0.25 = 0.5 → √x > x²',
              explanation: 'For numbers between 0 and 1, squaring makes smaller, square root makes larger. This is a key property to remember.',
            },
          ],
          commonMistakes: [
            'Forgetting to flip sign when dividing by negative',
            'Assuming operations preserve inequality direction',
            'Not checking special cases (0, 1, negative numbers)',
          ],
          tips: [
            'Always check: am I dividing/multiplying by negative?',
            'Test with actual numbers to verify',
            'Remember: for 0 < x < 1, squaring makes smaller',
          ],
        },
        {
          id: 'divisibility-rules',
          title: 'Divisibility Rules',
          level: 'beginner',
          why: 'Quickly determine if a number is divisible by another without performing division, saving time on tests.',
          when: 'Use when: simplifying fractions, finding factors, eliminating answer choices, or checking if numbers divide evenly.',
          where: 'Applied in: fraction problems, number theory, word problems about grouping, and quantitative comparisons.',
          conditions: [
            'Divisible by 2: Last digit is even (0, 2, 4, 6, 8)',
            'Divisible by 3: Sum of digits is divisible by 3',
            'Divisible by 4: Last two digits form number divisible by 4',
            'Divisible by 5: Last digit is 0 or 5',
            'Divisible by 6: Divisible by both 2 and 3',
            'Divisible by 9: Sum of digits is divisible by 9',
            'Divisible by 10: Last digit is 0',
          ],
          examples: [
            {
              question: 'Is 4,572 divisible by 3?',
              solution: 'Sum of digits: 4+5+7+2 = 18 → 18 is divisible by 3 → Yes, 4,572 is divisible by 3',
              explanation: 'Add all digits. If the sum is divisible by 3, the original number is divisible by 3.',
            },
            {
              question: 'Is 8,436 divisible by 4?',
              solution: 'Last two digits: 36 → 36 ÷ 4 = 9 → Yes, 8,436 is divisible by 4',
              explanation: 'Check only the last two digits. If they form a number divisible by 4, the whole number is divisible by 4.',
            },
            {
              question: 'Which is divisible by 6? A) 234  B) 235  C) 237',
              solution: 'A) 234: Last digit 4 (even) ✓, Sum 2+3+4=9 (divisible by 3) ✓ → Divisible by 6',
              explanation: 'Must be divisible by both 2 (even) and 3 (sum divisible by 3).',
            },
          ],
          commonMistakes: [
            'Confusing rules for 3 and 9',
            'Not checking both conditions for 6',
            'Forgetting to check last two digits for 4',
          ],
          tips: [
            'Memorize: 2 (even), 3 (sum), 4 (last 2), 5 (0 or 5), 6 (both 2 and 3), 9 (sum), 10 (0)',
            'For large numbers, use these rules instead of dividing',
            'Use to quickly eliminate answer choices',
          ],
        },
        {
          id: 'order-of-operations',
          title: 'Order of Operations (PEMDAS)',
          level: 'beginner',
          why: 'Ensures consistent evaluation of expressions. Critical for getting correct answers.',
          when: 'Use when: evaluating any expression with multiple operations, simplifying algebraic expressions, or solving equations.',
          where: 'Applied in: all arithmetic and algebra problems, quantitative comparisons, and word problems.',
          conditions: [
            'P: Parentheses (do innermost first)',
            'E: Exponents (powers and roots)',
            'M/D: Multiplication and Division (left to right)',
            'A/S: Addition and Subtraction (left to right)',
            'Remember: Multiplication and division have same priority, addition and subtraction have same priority',
          ],
          formula: 'PEMDAS: Parentheses → Exponents → Multiplication/Division → Addition/Subtraction',
          examples: [
            {
              question: 'Evaluate: 8 + 2 × 3²',
              solution: 'First: 3² = 9 → Then: 2 × 9 = 18 → Finally: 8 + 18 = 26',
              explanation: 'Exponents before multiplication, multiplication before addition. NOT (8+2) × 9 = 90!',
            },
            {
              question: 'Evaluate: 20 − 8 ÷ 2 × 3',
              solution: 'Division and multiplication have same priority, go left to right: 8 ÷ 2 = 4 → 4 × 3 = 12 → 20 − 12 = 8',
              explanation: 'Do multiplication and division from left to right, then subtraction.',
            },
            {
              question: 'Evaluate: 2(3 + 4)²',
              solution: 'First: (3 + 4) = 7 → Then: 7² = 49 → Finally: 2 × 49 = 98',
              explanation: 'Parentheses first, then exponent, then multiplication.',
            },
          ],
          commonMistakes: [
            'Doing addition before multiplication',
            'Not working left to right for same-priority operations',
            'Forgetting parentheses when they\'re implied',
          ],
          tips: [
            'Remember: Multiplication/division before addition/subtraction',
            'Work left to right for operations with same priority',
            'When in doubt, add parentheses to clarify',
          ],
        },
        {
          id: 'absolute-value',
          title: 'Absolute Value',
          level: 'intermediate',
          why: 'Absolute value represents distance from zero, essential for solving equations and inequalities with absolute values.',
          when: 'Use when: solving |x| = a equations, |x| < a inequalities, or finding distance between numbers on number line.',
          where: 'Applied in: algebra problems, coordinate geometry, word problems about distance, and quantitative comparisons.',
          conditions: [
            '|x| = distance from x to 0 on number line',
            '|x| = x if x ≥ 0, |x| = −x if x < 0',
            '|x| = |−x| (always non-negative)',
            '|a × b| = |a| × |b|',
            '|a + b| ≤ |a| + |b| (triangle inequality)',
          ],
          formula: '|x| = x if x ≥ 0, |x| = −x if x < 0',
          examples: [
            {
              question: 'Solve: |x − 3| = 5',
              solution: 'x − 3 = 5 or x − 3 = −5 → x = 8 or x = −2',
              explanation: 'Absolute value equals 5 means the expression inside equals 5 or −5. Solve both cases.',
            },
            {
              question: 'Solve: |2x + 1| < 7',
              solution: '−7 < 2x + 1 < 7 → −8 < 2x < 6 → −4 < x < 3',
              explanation: '|expression| < a means −a < expression < a. Solve the compound inequality.',
            },
            {
              question: 'What is |−15| + |−8|?',
              solution: '|−15| = 15, |−8| = 8 → 15 + 8 = 23',
              explanation: 'Absolute value of negative number is its positive value.',
            },
          ],
          commonMistakes: [
            'Forgetting the negative case when solving |x| = a',
            'Reversing inequality signs incorrectly',
            'Thinking |x| can be negative',
          ],
          tips: [
            'Always consider both positive and negative cases',
            'Remember: |x| is always ≥ 0',
            'For |x| < a, use −a < x < a',
          ],
        },
        {
          id: 'sequences',
          title: 'Number Sequences & Patterns',
          level: 'intermediate',
          why: 'Recognizing patterns helps find missing terms quickly and solve sequence problems efficiently.',
          when: 'Use when: finding missing terms in sequences, determining nth term, or solving pattern problems.',
          where: 'Applied in: number theory problems, pattern recognition, and some word problems.',
          conditions: [
            'Arithmetic sequence: Add same number each time (common difference d)',
            'Geometric sequence: Multiply by same number each time (common ratio r)',
            'Arithmetic nth term: aₙ = a₁ + (n−1)d',
            'Geometric nth term: aₙ = a₁ × rⁿ⁻¹',
            'Sum of arithmetic: Sₙ = n/2 × (first + last)',
          ],
          formula: 'Arithmetic: aₙ = a₁ + (n−1)d   |   Geometric: aₙ = a₁ × rⁿ⁻¹',
          examples: [
            {
              question: 'Find 10th term: 5, 8, 11, 14, ...',
              solution: 'Arithmetic sequence: d = 3, a₁ = 5 → a₁₀ = 5 + (10−1)×3 = 5 + 27 = 32',
              explanation: 'Common difference is 3. Use formula: first term + (position−1) × difference.',
            },
            {
              question: 'Find 6th term: 2, 6, 18, 54, ...',
              solution: 'Geometric sequence: r = 3, a₁ = 2 → a₆ = 2 × 3⁶⁻¹ = 2 × 3⁵ = 2 × 243 = 486',
              explanation: 'Common ratio is 3 (each term × 3). Use geometric formula.',
            },
            {
              question: 'Sum of first 10 terms: 3, 7, 11, 15, ...',
              solution: 'a₁ = 3, a₁₀ = 3 + 9×4 = 39 → S₁₀ = 10/2 × (3 + 39) = 5 × 42 = 210',
              explanation: 'Find first and last terms, then use sum formula: n/2 × (first + last).',
            },
          ],
          commonMistakes: [
            'Confusing arithmetic and geometric sequences',
            'Using wrong formula for nth term',
            'Not identifying the pattern correctly',
          ],
          tips: [
            'Check if adding (arithmetic) or multiplying (geometric)',
            'Find common difference or ratio first',
            'Use formulas once pattern is identified',
          ],
        },
      ],
    },
    algebra: {
      title: 'Algebra & Equations',
      icon: '📐',
      concepts: [
        {
          id: 'identities',
          title: 'Algebraic Identities',
          level: 'beginner',
          why: 'These identities allow fast calculations, simplify complex expressions, and are fundamental to algebraic manipulation.',
          when: 'Use Identity 1 for squaring sums, Identity 2 for squaring differences, Identity 3 (difference of squares) for fastest calculation method.',
          where: 'Applied in: fast mental calculations, simplifying expressions, factoring, and solving equations.',
          conditions: [
            '(a + b)² = a² + 2ab + b²',
            '(a − b)² = a² − 2ab + b²',
            '(a + b)(a − b) = a² − b²',
          ],
          formula: '(a + b)² = a² + 2ab + b²   |   (a − b)² = a² − 2ab + b²   |   (a + b)(a − b) = a² − b²',
          examples: [
            {
              question: 'Calculate 103 × 97',
              solution: 'Use (a+b)(a−b) = a²−b² → (100+3)(100−3) = 100² − 3² = 10000 − 9 = 9991',
              explanation: 'Recognize numbers close to 100. Use difference of squares for fast calculation without multiplication.',
            },
            {
              question: 'If x+y=8 and xy=12, find x²+y²',
              solution: '(x+y)² = x²+2xy+y² → 8² = x²+2(12)+y² → 64 = x²+24+y² → x²+y² = 40',
              explanation: 'Use the identity (x+y)² to relate the sum and product to the sum of squares.',
            },
          ],
          commonMistakes: [
            'Thinking (a+b)² = a² + b² (missing 2ab)',
            'Not recognizing when to use difference of squares',
            'Forgetting the middle term when expanding',
          ],
          tips: [
            'MEMORIZE these three identities - they appear constantly',
            'Look for numbers close to round numbers (100, 50, etc.)',
            'Use difference of squares for fast multiplication',
          ],
        },
        {
          id: 'solving-equations',
          title: 'Solving Equations - 6-Step Method',
          level: 'intermediate',
          why: 'A systematic approach prevents errors, ensures all steps are covered, and works for any linear equation.',
          when: 'Use for any linear equation with fractions, decimals, parentheses, or multiple terms.',
          where: 'Applied in: algebra problems, word problems translated to equations, and quantitative comparisons.',
          conditions: [
            'Step 1: Clear fractions/decimals (multiply by LCD)',
            'Step 2: Remove parentheses',
            'Step 3: Combine like terms',
            'Step 4: Get variables on one side',
            'Step 5: Get constants on other side',
            'Step 6: Solve for variable',
          ],
          examples: [
            {
              question: 'Solve: ½x + 3(x−2) = 2(x+1) + 1',
              solution: 'Step 1: x + 6(x−2) = 4(x+1) + 2 → Step 2: x + 6x − 12 = 4x + 4 + 2 → Step 3: 7x − 12 = 4x + 6 → Step 4-5: 3x = 18 → Step 6: x = 6',
              explanation: 'Follow the 6-step method systematically. Clear fractions first, then expand, combine, and isolate variable.',
            },
          ],
          commonMistakes: [
            'Not clearing fractions first',
            'Making sign errors when expanding',
            'Not checking the answer',
          ],
          tips: [
            'Always follow the steps in order',
            'Check your answer by substituting back',
            'Be careful with signs, especially with parentheses',
          ],
        },
        {
          id: 'word-problems',
          title: 'Word Problem Translation',
          level: 'intermediate',
          why: 'Most test problems are word problems. Mastering translation is essential for solving them correctly.',
          when: 'Use whenever you encounter a word problem. Translate English phrases to mathematical expressions.',
          where: 'Applied in: all word problems, real-world scenarios, and application questions.',
          conditions: [
            '"is, was, equals" → =',
            '"sum, more than, increased by" → +',
            '"difference, less than, decreased by" → −',
            '"times, product, multiplied by" → ×',
            '"divided by, quotient, per" → ÷',
            '"of" (with %) → ×',
            '"what, how many" → variable (x, y, etc.)',
          ],
          examples: [
            {
              question: '"Five less than twice a number equals thirteen."',
              solution: 'Let number = x → "twice a number" = 2x → "five less than" = −5 → "equals thirteen" = 13 → Equation: 2x − 5 = 13 → x = 9',
              explanation: 'Break down phrase by phrase. "Twice" means 2×, "less than" means subtract, "equals" means =.',
            },
          ],
          commonMistakes: [
            'Misinterpreting "less than" order',
            'Confusing "of" with addition',
            'Not defining variables clearly',
          ],
          tips: [
            'Read carefully - word order matters',
            'Define variables clearly at the start',
            'Translate phrase by phrase',
            'Check that your equation makes sense',
          ],
        },
        {
          id: 'quadratic-equations',
          title: 'Quadratic Equations',
          level: 'intermediate',
          why: 'Quadratic equations appear frequently. Understanding factoring and the quadratic formula is essential.',
          when: 'Use when: solving equations with x² terms, finding roots, or solving word problems that lead to quadratics.',
          where: 'Applied in: algebra problems, geometry problems (area), and optimization problems.',
          conditions: [
            'Standard form: ax² + bx + c = 0',
            'Factoring method: Find two numbers that multiply to ac and add to b',
            'Quadratic formula: x = (−b ± √(b²−4ac)) / 2a',
            'Discriminant: b² − 4ac (determines number of solutions)',
            'If b²−4ac > 0: two real solutions, = 0: one solution, < 0: no real solutions',
          ],
          formula: 'x = (−b ± √(b²−4ac)) / 2a',
          examples: [
            {
              question: 'Solve: x² − 5x + 6 = 0',
              solution: 'Factor: (x − 2)(x − 3) = 0 → x = 2 or x = 3',
              explanation: 'Find two numbers that multiply to 6 and add to −5: −2 and −3. Factor and set each factor equal to zero.',
            },
            {
              question: 'Solve: 2x² + 7x + 3 = 0',
              solution: 'Using quadratic formula: a=2, b=7, c=3 → x = (−7 ± √(49−24)) / 4 = (−7 ± 5) / 4 → x = −1/2 or x = −3',
              explanation: 'When factoring is difficult, use quadratic formula. Calculate discriminant first: 49−24=25.',
            },
            {
              question: 'How many solutions: x² + 4x + 5 = 0?',
              solution: 'Discriminant: b²−4ac = 16−20 = −4 < 0 → No real solutions',
              explanation: 'Negative discriminant means no real solutions (solutions would be complex numbers).',
            },
          ],
          commonMistakes: [
            'Forgetting to set factors equal to zero',
            'Making sign errors in quadratic formula',
            'Not checking if equation is in standard form first',
          ],
          tips: [
            'Try factoring first (faster)',
            'Use quadratic formula when factoring is difficult',
            'Check discriminant to determine number of solutions',
          ],
        },
        {
          id: 'systems-of-equations',
          title: 'Systems of Equations',
          level: 'intermediate',
          why: 'Many word problems involve multiple unknowns. Systems allow solving for all variables.',
          when: 'Use when: problems have two or more unknowns, word problems with multiple relationships, or finding intersection points.',
          where: 'Applied in: word problems, coordinate geometry (line intersections), and mixture problems.',
          conditions: [
            'Substitution: Solve one equation for variable, substitute into other',
            'Elimination: Add/subtract equations to eliminate variable',
            'Number of equations should equal number of unknowns',
            'Check solution by substituting into both equations',
          ],
          examples: [
            {
              question: 'Solve: x + y = 10, x − y = 4',
              solution: 'Add equations: 2x = 14 → x = 7 → Substitute: 7 + y = 10 → y = 3',
              explanation: 'Adding equations eliminates y. Then substitute x into one equation to find y.',
            },
            {
              question: 'Solve: 2x + 3y = 12, x = y + 1',
              solution: 'Substitute: 2(y+1) + 3y = 12 → 2y + 2 + 3y = 12 → 5y = 10 → y = 2 → x = 2 + 1 = 3',
              explanation: 'Substitute second equation into first. Solve for y, then find x.',
            },
            {
              question: 'Two numbers sum to 25. One is 7 more than the other. Find both.',
              solution: 'Let numbers be x and y: x + y = 25, x = y + 7 → (y+7) + y = 25 → 2y = 18 → y = 9, x = 16',
              explanation: 'Set up system from word problem. Use substitution to solve.',
            },
          ],
          commonMistakes: [
            'Not checking solution in both equations',
            'Making arithmetic errors during elimination',
            'Setting up wrong equations from word problem',
          ],
          tips: [
            'Choose method: substitution if one variable is isolated, elimination if coefficients match',
            'Always check your answer',
            'Define variables clearly from word problems',
          ],
        },
        {
          id: 'factoring',
          title: 'Factoring Techniques',
          level: 'intermediate',
          why: 'Factoring simplifies expressions, solves equations, and is faster than quadratic formula when possible.',
          when: 'Use when: simplifying expressions, solving quadratic equations, or finding common factors.',
          where: 'Applied in: algebra problems, equation solving, and expression simplification.',
          conditions: [
            'GCF (Greatest Common Factor): Factor out common terms',
            'Difference of squares: a² − b² = (a+b)(a−b)',
            'Trinomial: Find two numbers that multiply to c and add to b in x²+bx+c',
            'Grouping: For 4 terms, group in pairs',
          ],
          examples: [
            {
              question: 'Factor: 6x² + 9x',
              solution: 'GCF: 3x(2x + 3)',
              explanation: 'Factor out greatest common factor: 3x is common to both terms.',
            },
            {
              question: 'Factor: x² − 16',
              solution: 'Difference of squares: (x + 4)(x − 4)',
              explanation: 'Recognize as a² − b² where a=x, b=4. Use identity (a+b)(a−b).',
            },
            {
              question: 'Factor: x² + 8x + 15',
              solution: 'Find numbers: multiply to 15, add to 8 → 3 and 5 → (x + 3)(x + 5)',
              explanation: 'For x²+bx+c, find two numbers that multiply to c (15) and add to b (8).',
            },
            {
              question: 'Factor: 2x² + 7x + 3',
              solution: 'ac = 6, need numbers that multiply to 6 and add to 7 → 6 and 1 → 2x² + 6x + x + 3 → 2x(x+3) + 1(x+3) → (2x+1)(x+3)',
              explanation: 'For ax²+bx+c, multiply a×c, find factors that add to b, then factor by grouping.',
            },
          ],
          commonMistakes: [
            'Not checking if factored form multiplies back correctly',
            'Forgetting to factor out GCF first',
            'Making sign errors in factors',
          ],
          tips: [
            'Always check: multiply factors back to verify',
            'Factor out GCF first if possible',
            'Practice recognizing patterns (difference of squares, perfect squares)',
          ],
        },
      ],
    },
    geometry: {
      title: 'Geometry & Shapes',
      icon: '📏',
      concepts: [
        {
          id: 'lines-angles',
          title: 'Lines & Angles',
          level: 'beginner',
          why: 'Foundation for all geometry. Understanding angle relationships helps solve complex geometric problems.',
          when: 'Use when: finding missing angles, working with parallel lines, or solving geometric proofs.',
          where: 'Applied in: all geometry problems, triangle problems, polygon problems, and coordinate geometry.',
          conditions: [
            'Straight line = 180°',
            'Right angle = 90°',
            'Around a point = 360°',
            'Vertical angles are equal',
            'Parallel lines: Corresponding angles = equal, Alternate interior angles = equal',
          ],
          examples: [
            {
              question: 'In parallel lines with a transversal, if one angle is 40°, find all other angles',
              solution: 'All acute angles = 40°, all obtuse angles = 180°−40° = 140°',
              explanation: 'With parallel lines, corresponding and alternate interior angles are equal. Supplementary angles add to 180°.',
            },
          ],
          commonMistakes: [
            'Confusing corresponding and alternate angles',
            'Forgetting that supplementary angles add to 180°',
            'Not recognizing parallel line properties',
          ],
          tips: [
            'Draw diagrams to visualize',
            'Remember: vertical angles are always equal',
            'Parallel lines create angle pairs',
          ],
        },
        {
          id: 'triangles',
          title: 'Triangles - Complete Properties',
          level: 'intermediate',
          why: 'Triangles are the most common geometric shape on tests. Mastery is essential.',
          when: 'Use Pythagorean theorem for right triangles. Use angle sum for any triangle. Use area formula when given base and height.',
          where: 'Applied in: geometry problems, coordinate geometry, word problems involving triangles.',
          conditions: [
            'Sum of angles = 180°',
            'Area = ½ × base × height',
            'Pythagorean: a² + b² = c² (right triangle only)',
            'Perimeter = a + b + c',
            'Triangle inequality: a + b > c',
          ],
          formula: 'Area = ½bh   |   a² + b² = c² (right triangle)   |   Sum angles = 180°',
          examples: [
            {
              question: 'Triangle has angles 55° and 65°. Find third angle.',
              solution: 'Sum = 180° → Third angle = 180° − (55°+65°) = 180°−120° = 60°',
              explanation: 'Use the angle sum property. Subtract known angles from 180°.',
            },
            {
              question: 'Right triangle legs: 9 and 12. Find hypotenuse.',
              solution: 'Recognize 3-4-5 triple scaled by 3: 3×3=9, 4×3=12 → Hypotenuse = 5×3 = 15',
              explanation: 'Recognize Pythagorean triples for faster calculation. Or calculate: 9²+12²=81+144=225, √225=15.',
            },
          ],
          commonMistakes: [
            'Using Pythagorean theorem for non-right triangles',
            'Using wrong height in area formula',
            'Not checking triangle inequality',
          ],
          tips: [
            'Memorize common Pythagorean triples (3-4-5, 5-12-13, etc.)',
            'Height must be perpendicular to base',
            'Always check triangle inequality',
          ],
        },
        {
          id: 'circles',
          title: 'Circles - All Formulas',
          level: 'intermediate',
          why: 'Circles appear frequently. Knowing formulas saves time and prevents errors.',
          when: 'Use circumference formula for perimeter problems. Use area formula for area problems. Use sector formulas for partial circles.',
          where: 'Applied in: geometry problems, composite shapes, real-world problems (wheels, areas).',
          conditions: [
            'Circumference: C = 2πr = πd',
            'Area: A = πr²',
            'Arc length = (θ/360°) × C',
            'Sector area = (θ/360°) × A',
            'π ≈ 3.14 or leave as π',
          ],
          formula: 'C = 2πr = πd   |   A = πr²   |   Sector = (θ/360°) × A',
          examples: [
            {
              question: 'Circle radius = 10.5 cm. Find circumference and area.',
              solution: 'Circumference = 2πr = 2×π×10.5 = 21π ≈ 65.97 cm → Area = πr² = π×(10.5)² = 110.25π ≈ 346.36 cm²',
              explanation: 'Use formulas directly. Leave answer in terms of π for exact value, or approximate.',
            },
            {
              question: 'Find area of 72° sector of circle with radius 15.',
              solution: 'Total area = π×15² = 225π → Sector area = (72/360)×225π = (1/5)×225π = 45π',
              explanation: 'Find total area first, then multiply by fraction of circle (72/360 = 1/5).',
            },
          ],
          commonMistakes: [
            'Using diameter in area formula (should be radius)',
            'Confusing circumference and area formulas',
            'Not converting degrees to fraction correctly',
          ],
          tips: [
            'Remember: area uses r², circumference uses r',
            'Sector = fraction × total area',
            'Keep π in answer for exact value',
          ],
        },
        {
          id: 'polygons',
          title: 'Polygons - Regular & Irregular',
          level: 'intermediate',
          why: 'Polygons appear in many geometry problems. Understanding properties helps solve complex problems.',
          when: 'Use when: finding angles, perimeters, areas of polygons, or working with regular polygons.',
          where: 'Applied in: geometry problems, coordinate geometry, and real-world applications.',
          conditions: [
            'Sum of interior angles = (n−2) × 180° where n = number of sides',
            'Each interior angle (regular) = [(n−2) × 180°] / n',
            'Each exterior angle (regular) = 360° / n',
            'Interior + Exterior = 180°',
            'Number of diagonals = n(n−3)/2',
          ],
          formula: 'Interior sum = (n−2) × 180°   |   Each interior (regular) = [(n−2) × 180°] / n',
          examples: [
            {
              question: 'Find sum of interior angles of hexagon.',
              solution: 'n = 6 → Sum = (6−2) × 180° = 4 × 180° = 720°',
              explanation: 'Use formula with n=6. Subtract 2 from number of sides, multiply by 180°.',
            },
            {
              question: 'Each interior angle of regular octagon?',
              solution: 'n = 8 → Sum = (8−2) × 180° = 1080° → Each = 1080° / 8 = 135°',
              explanation: 'Find total sum first, then divide by number of sides for regular polygon.',
            },
            {
              question: 'If exterior angle of regular polygon is 30°, how many sides?',
              solution: '360° / n = 30° → n = 360° / 30° = 12 sides',
              explanation: 'Use formula: 360° divided by number of sides equals exterior angle.',
            },
          ],
          commonMistakes: [
            'Using wrong formula for interior vs exterior angles',
            'Forgetting to divide by n for regular polygons',
            'Confusing number of sides with number of angles',
          ],
          tips: [
            'Memorize: interior sum = (n−2)×180°, exterior = 360°/n',
            'For regular polygons, divide sum by n',
            'Interior + exterior always = 180°',
          ],
        },
        {
          id: '3d-shapes',
          title: '3D Shapes - Volume & Surface Area',
          level: 'advanced',
          why: '3D problems test understanding of volume and surface area. Essential for advanced geometry.',
          when: 'Use when: finding volume or surface area of 3D shapes, word problems about containers, or optimization.',
          where: 'Applied in: geometry problems, word problems (boxes, cylinders, spheres), and real-world applications.',
          conditions: [
            'Rectangular box: V = lwh, SA = 2(lw + lh + wh)',
            'Cube: V = s³, SA = 6s²',
            'Cylinder: V = πr²h, SA = 2πr² + 2πrh',
            'Sphere: V = (4/3)πr³, SA = 4πr²',
            'Cone: V = (1/3)πr²h',
          ],
          formula: 'Box: V=lwh   |   Cylinder: V=πr²h   |   Sphere: V=(4/3)πr³   |   Cone: V=(1/3)πr²h',
          examples: [
            {
              question: 'Rectangular box: length=8, width=5, height=3. Find volume and surface area.',
              solution: 'Volume = 8 × 5 × 3 = 120 → SA = 2(8×5 + 8×3 + 5×3) = 2(40 + 24 + 15) = 2(79) = 158',
              explanation: 'Volume is length × width × height. Surface area is sum of areas of all 6 faces.',
            },
            {
              question: 'Cylinder: radius=4, height=10. Find volume.',
              solution: 'Volume = π × 4² × 10 = π × 16 × 10 = 160π',
              explanation: 'Use formula: π times radius squared times height.',
            },
            {
              question: 'Sphere: radius=6. Find volume and surface area.',
              solution: 'Volume = (4/3) × π × 6³ = (4/3) × π × 216 = 288π → SA = 4 × π × 6² = 4 × π × 36 = 144π',
              explanation: 'Volume uses (4/3)πr³, surface area uses 4πr². Remember to cube radius for volume.',
            },
          ],
          commonMistakes: [
            'Confusing volume and surface area formulas',
            'Using diameter instead of radius',
            'Forgetting the (4/3) factor for sphere volume',
          ],
          tips: [
            'Volume = space inside, Surface area = area of outside',
            'Always use radius, not diameter',
            'Memorize: sphere V=(4/3)πr³, SA=4πr²',
          ],
        },
        {
          id: 'coordinate-geometry',
          title: 'Coordinate Geometry',
          level: 'advanced',
          why: 'Coordinate geometry connects algebra and geometry. Essential for advanced problems.',
          when: 'Use when: finding distances, midpoints, slopes, equations of lines, or working with graphs.',
          where: 'Applied in: coordinate plane problems, line equations, distance problems, and graphing.',
          conditions: [
            'Distance: d = √[(x₂−x₁)² + (y₂−y₁)²]',
            'Midpoint: M = ((x₁+x₂)/2, (y₁+y₂)/2)',
            'Slope: m = (y₂−y₁)/(x₂−x₁)',
            'Line equation: y = mx + b (slope-intercept)',
            'Parallel lines: same slope, Perpendicular: slopes multiply to −1',
          ],
          formula: 'Distance: √[(x₂−x₁)²+(y₂−y₁)²]   |   Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)   |   Slope: (y₂−y₁)/(x₂−x₁)',
          examples: [
            {
              question: 'Distance between (3, 4) and (7, 1)?',
              solution: 'd = √[(7−3)² + (1−4)²] = √[4² + (−3)²] = √[16 + 9] = √25 = 5',
              explanation: 'Use distance formula. Subtract x-coordinates and y-coordinates, square, add, take square root.',
            },
            {
              question: 'Midpoint of segment from (2, 5) to (8, 9)?',
              solution: 'M = ((2+8)/2, (5+9)/2) = (10/2, 14/2) = (5, 7)',
              explanation: 'Average the x-coordinates and y-coordinates separately.',
            },
            {
              question: 'Slope of line through (1, 2) and (4, 8)?',
              solution: 'm = (8−2)/(4−1) = 6/3 = 2',
              explanation: 'Change in y divided by change in x. Rise over run.',
            },
            {
              question: 'Equation of line with slope 3 through point (2, 5)?',
              solution: 'y = mx + b → 5 = 3(2) + b → 5 = 6 + b → b = −1 → y = 3x − 1',
              explanation: 'Substitute point and slope into y=mx+b to find b (y-intercept), then write equation.',
            },
          ],
          commonMistakes: [
            'Mixing up x and y in distance formula',
            'Using wrong order in slope formula',
            'Forgetting to take square root in distance',
          ],
          tips: [
            'Distance formula is like Pythagorean theorem',
            'Slope = rise/run = change in y / change in x',
            'Parallel lines have same slope, perpendicular slopes multiply to −1',
          ],
        },
      ],
    },
    percentages: {
      title: 'Percentages & Fractions',
      icon: '📊',
      concepts: [
        {
          id: 'percentage-formulas',
          title: 'Percentage Formulas',
          level: 'beginner',
          why: 'Percentages appear in almost every test. Mastery is essential for success.',
          when: 'Use % change for growth/decline. Use multiplier method for successive changes. Use reverse formula to find original.',
          where: 'Applied in: word problems, data interpretation, real-world scenarios (discounts, taxes, growth).',
          conditions: [
            'k% = k/100',
            '% change = [(New − Old)/Old] × 100%',
            'Increase by k%: multiply by (1 + k/100)',
            'Decrease by k%: multiply by (1 − k/100)',
            'Reverse: Original = New/(1 ± k/100)',
            'Special: a% of b = b% of a',
          ],
          formula: '% change = [(New−Old)/Old] × 100%   |   Increase: ×(1+k/100)   |   Decrease: ×(1−k/100)',
          examples: [
            {
              question: 'Price increases 30%, then decreases 30%. Net effect?',
              solution: 'Let original = 100 → After increase: 100 × 1.30 = 130 → After decrease: 130 × 0.70 = 91 → Net change: (91−100)/100 = −9% (9% decrease)',
              explanation: 'Percentages are NOT reversible! The decrease is applied to the larger number, so net result is a decrease.',
            },
            {
              question: 'After 15% discount, price is Rs. 425. Original price?',
              solution: 'WRONG: 425 × 1.15 = 488.75 → CORRECT: Original = 425/(1 − 0.15) = 425/0.85 = 500',
              explanation: 'To reverse a percentage change, divide by (1 ± percentage), don\'t multiply. This is a common trap!',
            },
          ],
          commonMistakes: [
            'Thinking 50% increase then 50% decrease = 0% change',
            'Reversing percentage by multiplying instead of dividing',
            'Adding percentages of different wholes',
          ],
          tips: [
            'Percentages are NOT reversible',
            'To reverse: divide by (1 ± %), don\'t multiply',
            'Use multiplier method for successive changes',
            'Remember: a% of b = b% of a (useful trick)',
          ],
        },
        {
          id: 'fraction-comparison',
          title: 'Comparing Fractions',
          level: 'beginner',
          why: 'Essential for quantitative comparison and choosing between answer choices.',
          when: 'Use Method 1 when denominators easily made same. Use Method 2 when numerators same. Use Method 3 (cross-multiplication) for general case.',
          where: 'Applied in: quantitative comparisons, fraction problems, ratio problems.',
          conditions: [
            'Method 1: Same denominator → larger numerator wins',
            'Method 2: Same numerator → smaller denominator wins',
            'Method 3: Cross-multiplication → a/b > c/d if ad > bc',
          ],
          examples: [
            {
              question: 'Compare 3/5 and 4/7',
              solution: 'Cross-multiplication: 3 × 7 = 21, 5 × 4 = 20 → Since 21 > 20, therefore 3/5 > 4/7',
              explanation: 'Cross-multiply: if ad > bc, then a/b > c/d. This method always works.',
            },
          ],
          commonMistakes: [
            'Assuming larger numerator means larger fraction',
            'Not using cross-multiplication when needed',
            'Converting to decimals unnecessarily',
          ],
          tips: [
            'Cross-multiplication always works',
            'If denominators same, compare numerators',
            'If numerators same, smaller denominator wins',
          ],
        },
        {
          id: 'compound-interest',
          title: 'Compound Interest & Growth',
          level: 'advanced',
          why: 'Understanding compound growth is essential for financial problems and exponential growth scenarios.',
          when: 'Use when: calculating investment growth, population growth, or any compound percentage increase.',
          where: 'Applied in: financial problems, growth/decay problems, and real-world applications.',
          conditions: [
            'Compound interest: A = P(1 + r/n)ⁿᵗ',
            'Simple interest: A = P(1 + rt)',
            'A = final amount, P = principal, r = rate, t = time, n = compounding periods per year',
            'For annual compounding: A = P(1 + r)ᵗ',
          ],
          formula: 'A = P(1 + r/n)ⁿᵗ   |   Simple: A = P(1 + rt)',
          examples: [
            {
              question: 'Rs. 1000 at 10% annual compound interest for 3 years. Final amount?',
              solution: 'A = 1000(1 + 0.10)³ = 1000(1.1)³ = 1000 × 1.331 = Rs. 1,331',
              explanation: 'Use compound formula with annual compounding (n=1). Raise (1+r) to power of years.',
            },
            {
              question: 'Rs. 5000 at 8% simple interest for 5 years. Final amount?',
              solution: 'A = 5000(1 + 0.08×5) = 5000(1 + 0.40) = 5000 × 1.40 = Rs. 7,000',
              explanation: 'Simple interest: multiply rate by time, add to 1, multiply by principal.',
            },
            {
              question: 'Population doubles every 20 years. If current is 10,000, what in 60 years?',
              solution: '60 years = 3 doubling periods → 10,000 × 2³ = 10,000 × 8 = 80,000',
              explanation: 'Each doubling multiplies by 2. Number of doublings = time / doubling period.',
            },
          ],
          commonMistakes: [
            'Confusing compound and simple interest',
            'Not raising to correct power',
            'Forgetting to convert percentage to decimal',
          ],
          tips: [
            'Compound: exponential growth, Simple: linear growth',
            'Always convert % to decimal (divide by 100)',
            'Count compounding periods carefully',
          ],
        },
        {
          id: 'profit-loss',
          title: 'Profit & Loss Problems',
          level: 'intermediate',
          why: 'Profit/loss problems are common in tests. Understanding cost, selling price, and profit percentage is essential.',
          when: 'Use when: calculating profit/loss percentages, finding cost/selling price, or solving business problems.',
          where: 'Applied in: word problems, business scenarios, and real-world applications.',
          conditions: [
            'Profit = Selling Price − Cost Price',
            'Loss = Cost Price − Selling Price',
            'Profit % = (Profit/Cost) × 100%',
            'Loss % = (Loss/Cost) × 100%',
            'Selling Price = Cost × (1 ± profit%/100)',
          ],
          formula: 'Profit % = (SP−CP)/CP × 100%   |   SP = CP × (1 ± profit%)',
          examples: [
            {
              question: 'Cost = Rs. 500, Selling = Rs. 600. Profit percentage?',
              solution: 'Profit = 600 − 500 = 100 → Profit % = (100/500) × 100% = 20%',
              explanation: 'Calculate profit first, then divide by cost price and multiply by 100%.',
            },
            {
              question: 'Cost = Rs. 800, sold at 25% profit. Selling price?',
              solution: 'SP = 800 × (1 + 0.25) = 800 × 1.25 = Rs. 1,000',
              explanation: 'Multiply cost by (1 + profit percentage as decimal).',
            },
            {
              question: 'Sold for Rs. 450 at 10% loss. What was cost price?',
              solution: 'SP = CP × (1 − 0.10) → 450 = CP × 0.90 → CP = 450/0.90 = Rs. 500',
              explanation: 'To find original cost from selling price with loss, divide by (1 − loss%).',
            },
          ],
          commonMistakes: [
            'Calculating profit % on selling price instead of cost',
            'Not converting percentage to decimal',
            'Confusing profit and loss formulas',
          ],
          tips: [
            'Profit/Loss % is always on COST PRICE',
            'Profit: SP > CP, Loss: SP < CP',
            'To reverse: divide by (1 ± %), don\'t multiply',
          ],
        },
        {
          id: 'mixtures-percentages',
          title: 'Mixture Problems with Percentages',
          level: 'advanced',
          why: 'Mixture problems test understanding of weighted averages and percentage concentrations.',
          when: 'Use when: mixing solutions, alloys, or any problems involving combining different percentages.',
          where: 'Applied in: chemistry problems, alloy problems, and mixture word problems.',
          conditions: [
            'Final % = (Total of component) / (Total quantity) × 100%',
            'Use weighted average: (quantity₁ × %₁ + quantity₂ × %₂) / (quantity₁ + quantity₂)',
            'Set up equation: amount of pure substance in each part',
          ],
          examples: [
            {
              question: 'Mix 20L of 30% salt solution with 30L of 50% salt solution. Final concentration?',
              solution: 'Salt in first: 20 × 0.30 = 6L → Salt in second: 30 × 0.50 = 15L → Total salt: 21L, Total solution: 50L → Concentration: (21/50) × 100% = 42%',
              explanation: 'Find amount of salt in each solution, add them, divide by total volume.',
            },
            {
              question: 'How much 40% solution mixed with 20L of 60% to get 50% solution?',
              solution: 'Let x = amount of 40% solution → 0.40x + 0.60(20) = 0.50(x + 20) → 0.40x + 12 = 0.50x + 10 → 2 = 0.10x → x = 20L',
              explanation: 'Set up equation: salt from both solutions equals salt in final mixture.',
            },
          ],
          commonMistakes: [
            'Not accounting for total volume correctly',
            'Setting up wrong equation',
            'Confusing percentages with actual amounts',
          ],
          tips: [
            'Find actual amount of pure substance in each part',
            'Set up equation based on total pure substance',
            'Check that volumes add up correctly',
          ],
        },
      ],
    },
    ratios: {
      title: 'Ratios & Proportions',
      icon: '⚖️',
      concepts: [
        {
          id: 'ratios-proportions',
          title: 'Ratios & Proportions',
          level: 'beginner',
          why: 'Essential for distribution problems, scaling, and comparing quantities.',
          when: 'Use ratios for comparing quantities. Use proportions for solving unknowns. Use dividing formula for distribution problems.',
          where: 'Applied in: word problems, distribution problems, scaling problems, mixture problems.',
          conditions: [
            'Ratio a:b = a/b',
            'Proportion: a/b = c/d → ad = bc',
            'Dividing in ratio a:b: First part = a/(a+b) × total, Second part = b/(a+b) × total',
          ],
          formula: 'a/b = c/d → ad = bc   |   Part = (ratio part / total parts) × total',
          examples: [
            {
              question: 'Divide Rs. 1200 among A, B, C in ratio 2:3:5',
              solution: 'Total parts = 2+3+5 = 10 → A: (2/10)×1200 = 240 → B: (3/10)×1200 = 360 → C: (5/10)×1200 = 600',
              explanation: 'Find total parts first, then each person gets their part fraction of the total.',
            },
            {
              question: 'If 3 oranges cost Rs. 5, how many oranges for Rs. 100?',
              solution: 'Set proportion: 3/5 = x/100 → Cross multiply: 3×100 = 5×x → 300 = 5x → x = 60 oranges',
              explanation: 'Set up proportion with same units on same side, then cross multiply to solve.',
            },
          ],
          commonMistakes: [
            'Not finding total parts first',
            'Setting up proportion incorrectly',
            'Confusing ratio order',
          ],
          tips: [
            'Always find total parts first',
            'Set up proportions with same units aligned',
            'Check your answer adds up correctly',
          ],
        },
        {
          id: 'work-problems',
          title: 'Work & Rate Problems',
          level: 'intermediate',
          why: 'Work problems test understanding of rates and combined work. Common in tests.',
          when: 'Use when: calculating time for multiple workers, pipes filling tanks, or any rate problems.',
          where: 'Applied in: word problems about work, pipes, machines, and combined rates.',
          conditions: [
            'Rate = Work / Time',
            'Combined rate = Sum of individual rates',
            'Time = Work / Rate',
            'If A does work in a hours, rate = 1/a per hour',
            'If A and B work together: Combined rate = 1/a + 1/b',
          ],
          formula: 'Rate = Work/Time   |   Combined rate = Rate₁ + Rate₂   |   Time together = 1/(1/a + 1/b)',
          examples: [
            {
              question: 'A can complete work in 6 hours, B in 4 hours. How long together?',
              solution: 'A rate = 1/6 per hour, B rate = 1/4 per hour → Combined = 1/6 + 1/4 = 2/12 + 3/12 = 5/12 per hour → Time = 1 ÷ (5/12) = 12/5 = 2.4 hours',
              explanation: 'Find individual rates (1/time), add them, then time = 1/combined rate.',
            },
            {
              question: 'Pipe A fills tank in 3 hours, Pipe B in 5 hours. Both together?',
              solution: 'A rate = 1/3, B rate = 1/5 → Combined = 1/3 + 1/5 = 5/15 + 3/15 = 8/15 → Time = 15/8 = 1.875 hours',
              explanation: 'Same method as work problems. Add rates, invert to get time.',
            },
            {
              question: 'A, B, C together complete work in 2 hours. A alone takes 6 hours, B alone takes 9 hours. How long for C alone?',
              solution: 'Combined rate = 1/2 → A rate = 1/6, B rate = 1/9 → C rate = 1/2 − 1/6 − 1/9 = 9/18 − 3/18 − 2/18 = 4/18 = 2/9 → C time = 9/2 = 4.5 hours',
              explanation: 'Find combined rate, subtract known rates to get C\'s rate, then find C\'s time.',
            },
          ],
          commonMistakes: [
            'Adding times instead of rates',
            'Not converting to common denominator',
            'Forgetting to invert rate to get time',
          ],
          tips: [
            'Always work with rates (1/time), not times',
            'Add rates, not times',
            'Time = 1/rate',
          ],
        },
        {
          id: 'speed-distance-time',
          title: 'Speed, Distance & Time',
          level: 'intermediate',
          why: 'Speed problems are very common. Understanding the relationship between speed, distance, and time is essential.',
          when: 'Use when: calculating speeds, distances, times, relative speeds, or average speeds.',
          where: 'Applied in: word problems about travel, races, trains, and motion.',
          conditions: [
            'Speed = Distance / Time',
            'Distance = Speed × Time',
            'Time = Distance / Speed',
            'Average speed = Total Distance / Total Time (NOT average of speeds!)',
            'Relative speed: Same direction: difference, Opposite: sum',
          ],
          formula: 'Speed = Distance/Time   |   Distance = Speed × Time   |   Average Speed = Total Distance/Total Time',
          examples: [
            {
              question: 'Car travels 240 km in 3 hours. Average speed?',
              solution: 'Speed = 240 km / 3 hours = 80 km/h',
              explanation: 'Divide distance by time to get speed.',
            },
            {
              question: 'Travels 60 km at 40 km/h, then 60 km at 60 km/h. Average speed?',
              solution: 'Time for first: 60/40 = 1.5h → Time for second: 60/60 = 1h → Total time: 2.5h, Total distance: 120km → Average = 120/2.5 = 48 km/h',
              explanation: 'NOT (40+60)/2 = 50! Find total time first, then average = total distance/total time.',
            },
            {
              question: 'Two trains, 200m and 150m, speeds 60 km/h and 40 km/h, opposite directions. Time to pass?',
              solution: 'Relative speed = 60 + 40 = 100 km/h = 100×1000/3600 = 27.78 m/s → Distance = 200+150 = 350m → Time = 350/27.78 ≈ 12.6 seconds',
              explanation: 'Opposite directions: add speeds. Convert to same units (m/s). Total distance is sum of lengths.',
            },
          ],
          commonMistakes: [
            'Averaging speeds instead of using total distance/time',
            'Not converting units (km/h to m/s)',
            'Forgetting to add train lengths for passing problems',
          ],
          tips: [
            'Average speed = total distance / total time (NOT average of speeds)',
            'Convert units: km/h to m/s: multiply by 1000/3600 = 5/18',
            'For passing: distance = sum of lengths',
          ],
        },
        {
          id: 'mixture-ratios',
          title: 'Mixture Problems with Ratios',
          level: 'advanced',
          why: 'Mixture problems combine ratios and algebra. Essential for advanced problem solving.',
          when: 'Use when: mixing ingredients in given ratios, changing ratios, or finding quantities in mixtures.',
          where: 'Applied in: word problems about alloys, solutions, mixtures, and combinations.',
          conditions: [
            'Set up ratio as parts',
            'Use algebra to solve for unknown quantities',
            'Total parts = sum of ratio parts',
            'Each part = (ratio part / total parts) × total quantity',
          ],
          examples: [
            {
              question: 'Alloy: copper:zinc = 3:2. If 15 kg copper, how much zinc?',
              solution: 'Ratio 3:2 means 3 parts copper, 2 parts zinc → 15 kg = 3 parts → 1 part = 5 kg → Zinc = 2 parts = 10 kg',
              explanation: 'Find value of one part, then multiply by number of parts needed.',
            },
            {
              question: 'Mixture A:B = 2:3, total 50 kg. Add 10 kg of A. New ratio?',
              solution: 'Original: A = (2/5)×50 = 20 kg, B = (3/5)×50 = 30 kg → After adding: A = 30 kg, B = 30 kg → New ratio = 30:30 = 1:1',
              explanation: 'Find original amounts, add new quantity, find new ratio.',
            },
            {
              question: 'Solution A:B = 4:5. Remove 18L, add 18L of A. New ratio 1:1. Original total?',
              solution: 'Let original total = 9x (4x A, 5x B) → After removal: (4x−8) A, (5x−10) B → After adding: (4x+8) A, (5x−10) B → Ratio 1:1: 4x+8 = 5x−10 → x = 18 → Original = 9×18 = 162L',
              explanation: 'Set up algebra with ratio parts. Solve for x, then find total.',
            },
          ],
          commonMistakes: [
            'Not setting up algebra correctly',
            'Forgetting to account for removal/addition',
            'Confusing parts with actual quantities',
          ],
          tips: [
            'Use algebra: let ratio parts be variables',
            'Track changes step by step',
            'Check that ratios simplify correctly',
          ],
        },
      ],
    },
    qc: {
      title: 'Quantitative Comparison',
      icon: '🎯',
      concepts: [
        {
          id: 'qc-strategy',
          title: 'QC Systematic Approach',
          level: 'advanced',
          why: 'QC questions require a different strategy than regular problems. Systematic testing prevents errors.',
          when: 'Use for all quantitative comparison questions. Follow the flowchart systematically.',
          where: 'Applied in: all QC questions on the test.',
          conditions: [
            'Step 1: Look for variables? NO → Calculate directly',
            'YES → Step 2: Test numbers in order: 0, 1, −1, 2, ½',
            'Step 3: Different relationships? YES → Answer D',
            'NO → Step 4: Test extremes (very large, very small)',
          ],
          examples: [
            {
              question: 'Column A: x², Column B: x, Condition: x is real number',
              solution: 'Test x=0: A=0, B=0 → Equal → Test x=2: A=4, B=2 → A>B → Test x=½: A=¼, B=½ → A<B → Different relationships → Answer: D',
              explanation: 'Since different test values give different relationships, the answer cannot be determined.',
            },
          ],
          commonMistakes: [
            'Not testing enough cases',
            'Assuming variables are different',
            'Not testing zero and one',
          ],
          tips: [
            'Always test 0, 1, and a fraction',
            'If you find one equal case, eliminate A and B',
            'Test extremes to be sure',
          ],
        },
        {
          id: 'qc-geometry',
          title: 'QC with Geometry',
          level: 'advanced',
          why: 'Geometry QC questions test understanding of relationships between shapes and measurements.',
          when: 'Use when: comparing areas, perimeters, angles, or dimensions in geometric QC problems.',
          where: 'Applied in: quantitative comparison questions involving geometry.',
          conditions: [
            'Compare formulas: area, perimeter, volume',
            'Use properties: triangle inequality, angle relationships',
            'Consider special cases: right angles, equal sides',
            'Test with actual numbers when possible',
          ],
          examples: [
            {
              question: 'Column A: Area of square with side 5, Column B: Area of rectangle 4×6',
              solution: 'A: 5² = 25, B: 4×6 = 24 → A > B',
              explanation: 'Calculate directly: square area = side², rectangle area = length × width.',
            },
            {
              question: 'Column A: Perimeter of triangle with sides 3, 4, 5, Column B: Perimeter of square with side 3',
              solution: 'A: 3+4+5 = 12, B: 4×3 = 12 → A = B',
              explanation: 'Calculate perimeters directly and compare.',
            },
          ],
          commonMistakes: [
            'Using wrong formulas',
            'Not considering all cases',
            'Confusing area and perimeter',
          ],
          tips: [
            'Calculate both columns when possible',
            'Use geometric properties',
            'Check special cases',
          ],
        },
        {
          id: 'qc-algebra',
          title: 'QC with Algebraic Expressions',
          level: 'advanced',
          why: 'Algebraic QC requires careful testing and understanding of how operations affect relationships.',
          when: 'Use when: comparing algebraic expressions, functions, or equations in QC format.',
          where: 'Applied in: quantitative comparison questions with variables and expressions.',
          conditions: [
            'Simplify expressions when possible',
            'Test with multiple values',
            'Consider positive, negative, zero, fractions',
            'Look for patterns in relationships',
          ],
          examples: [
            {
              question: 'Column A: (x+3)², Column B: x² + 9, Condition: x > 0',
              solution: 'Expand A: x² + 6x + 9 → Compare: x² + 6x + 9 vs x² + 9 → Since x > 0, 6x > 0 → A > B',
              explanation: 'Expand and compare. The 6x term makes Column A larger when x is positive.',
            },
            {
              question: 'Column A: 2x + 3, Column B: 3x + 2, Condition: x is real',
              solution: 'Test x=0: A=3, B=2 → A>B → Test x=5: A=13, B=17 → A<B → Different relationships → Answer: D',
              explanation: 'Different x values give different relationships, so answer is D.',
            },
          ],
          commonMistakes: [
            'Not simplifying first',
            'Testing only one value',
            'Assuming relationship is constant',
          ],
          tips: [
            'Simplify expressions before testing',
            'Test multiple values systematically',
            'Look for when relationship might change',
          ],
        },
      ],
    },
    data: {
      title: 'Data Interpretation',
      icon: '📉',
      concepts: [
        {
          id: 'data-strategy',
          title: 'Data Interpretation Strategy',
          level: 'advanced',
          why: 'DI questions test your ability to read and analyze data quickly and accurately.',
          when: 'Use for all data interpretation questions. Read graph/chart before questions.',
          where: 'Applied in: all data interpretation questions on the test.',
          conditions: [
            'Before reading questions: Read title, check axis labels, note scale',
            'Don\'t confuse numbers with percentages',
            'In pie chart: % × total = actual value',
            'Use estimation for time-saving',
          ],
          examples: [
            {
              question: 'Company sales: TVs=40%, Computers=25%. Total=$200,000. How much more are TV sales?',
              solution: 'TV sales = 40% of 200,000 = 80,000 → Computer sales = 25% of 200,000 = 50,000 → Difference = 30,000 → As % of Computers: 30,000/50,000 = 60% more',
              explanation: 'WRONG: 40%−25%=15% more. CORRECT: Convert to actual values first, then compare.',
            },
          ],
          commonMistakes: [
            'Confusing percentages with actual values',
            'Not reading graph carefully',
            'Not using estimation',
          ],
          tips: [
            'Read graph before questions',
            'Convert percentages to actual values',
            'Use estimation to save time',
            'Check units carefully',
          ],
        },
        {
          id: 'bar-graphs',
          title: 'Bar Graphs & Column Charts',
          level: 'intermediate',
          why: 'Bar graphs are common in DI. Understanding how to read them quickly is essential.',
          when: 'Use when: comparing quantities across categories, finding differences, or calculating totals.',
          where: 'Applied in: data interpretation questions with bar or column charts.',
          conditions: [
            'Read axis labels carefully',
            'Check scale (each division = ?)',
            'Compare heights directly for quick comparisons',
            'Calculate differences by subtracting values',
          ],
          examples: [
            {
              question: 'Bar graph shows sales: Jan=50, Feb=70, Mar=60, Apr=80. Average?',
              solution: 'Total = 50+70+60+80 = 260 → Average = 260/4 = 65',
              explanation: 'Read values from bars, sum them, divide by number of months.',
            },
            {
              question: 'Which month had highest growth from previous?',
              solution: 'Feb: 70−50 = 20, Mar: 60−70 = −10, Apr: 80−60 = 20 → Feb and Apr tied at +20',
              explanation: 'Calculate difference from previous month for each, find maximum.',
            },
          ],
          commonMistakes: [
            'Not checking scale',
            'Reading wrong bar',
            'Not accounting for negative changes',
          ],
          tips: [
            'Always check scale first',
            'Compare visually first, calculate for exact values',
            'Track changes carefully',
          ],
        },
        {
          id: 'line-graphs',
          title: 'Line Graphs & Trends',
          level: 'intermediate',
          why: 'Line graphs show trends over time. Understanding trends helps answer many DI questions.',
          when: 'Use when: analyzing trends, finding peaks/valleys, calculating rates of change, or predicting.',
          where: 'Applied in: data interpretation questions with line graphs showing trends.',
          conditions: [
            'Upward trend: increasing over time',
            'Downward trend: decreasing over time',
            'Steepness indicates rate of change',
            'Peaks = maximum values, Valleys = minimum values',
          ],
          examples: [
            {
              question: 'Line graph: Year 1=100, Year 2=120, Year 3=150, Year 4=140. Overall trend?',
              solution: 'Started at 100, peaked at 150, ended at 140 → Overall increase from 100 to 140, but decreased in final year',
              explanation: 'Look at overall change from start to end, but note any reversals.',
            },
            {
              question: 'Which year had highest growth rate?',
              solution: 'Year 1→2: (120−100)/100 = 20%, Year 2→3: (150−120)/120 = 25%, Year 3→4: (140−150)/150 = −6.7% → Year 2→3 highest',
              explanation: 'Calculate percentage change for each period, find maximum.',
            },
          ],
          commonMistakes: [
            'Confusing absolute change with percentage change',
            'Not identifying peaks correctly',
            'Misreading time scale',
          ],
          tips: [
            'Identify overall trend first',
            'Calculate percentage change for rates',
            'Note any reversals or anomalies',
          ],
        },
        {
          id: 'tables',
          title: 'Reading Tables & Data Tables',
          level: 'intermediate',
          why: 'Tables organize data efficiently. Quick reading and calculation skills are essential.',
          when: 'Use when: finding specific values, calculating totals, averages, or comparing rows/columns.',
          where: 'Applied in: data interpretation questions with tables.',
          conditions: [
            'Read row and column headers carefully',
            'Find intersection for specific values',
            'Sum rows/columns for totals',
            'Calculate averages by dividing totals',
          ],
          examples: [
            {
              question: 'Table: Product A sales: Q1=100, Q2=120, Q3=110, Q4=130. Total and average?',
              solution: 'Total = 100+120+110+130 = 460 → Average = 460/4 = 115',
              explanation: 'Sum all quarters for total, divide by 4 for average.',
            },
            {
              question: 'Which product had highest Q4 sales?',
              solution: 'Read Q4 column, compare all products, find maximum value.',
              explanation: 'Scan the Q4 column, identify the highest number.',
            },
          ],
          commonMistakes: [
            'Reading wrong row/column',
            'Not checking headers',
            'Calculation errors in totals',
          ],
          tips: [
            'Always check row and column headers',
            'Double-check calculations',
            'Use estimation to verify answers',
          ],
        },
      ],
    },
  };

  const concepts = topicData[topicId].concepts;
  const selectedConceptData = concepts.find((c) => c.id === selectedConcept);

  const markConceptComplete = (conceptId: string, level: 'beginner' | 'intermediate' | 'advanced') => {
    setCompletedConcepts(new Set([...completedConcepts, conceptId]));
    const newProgress = { ...progress };
    if (!newProgress[topicId]) {
      newProgress[topicId] = { beginner: 0, intermediate: 0, advanced: 0 };
    }
    newProgress[topicId][level] = Math.min(100, newProgress[topicId][level] + 33);
    setProgress(newProgress);
  };

  if (selectedConceptData) {
    return (
      <div>
        <button
          onClick={() => setSelectedConcept(null)}
          className="flex gap-2 items-center mb-4 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={20} />
          Back to {topicData[topicId].title}
        </button>

        <div className="p-8 bg-white rounded-xl shadow-lg">
          <div className="flex gap-4 items-center mb-6">
            <span className="text-4xl">{topicData[topicId].icon}</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedConceptData.title}</h2>
              <span className={`inline-block mt-2 px-3 py-1 rounded text-sm font-medium ${
                selectedConceptData.level === 'beginner' ? 'bg-green-100 text-green-800' :
                selectedConceptData.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {selectedConceptData.level}
              </span>
            </div>
          </div>

          {/* Why, When, Where */}
          <div className="grid gap-4 mb-8 md:grid-cols-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <Lightbulb className="text-blue-600" size={20} />
                <h3 className="font-bold text-blue-900">WHY</h3>
              </div>
              <p className="text-sm text-gray-700">{selectedConceptData.why}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <Target className="text-green-600" size={20} />
                <h3 className="font-bold text-green-900">WHEN</h3>
              </div>
              <p className="text-sm text-gray-700">{selectedConceptData.when}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <BookOpen className="text-purple-600" size={20} />
                <h3 className="font-bold text-purple-900">WHERE</h3>
              </div>
              <p className="text-sm text-gray-700">{selectedConceptData.where}</p>
            </div>
          </div>

          {/* Conditions */}
          <div className="mb-8">
            <h3 className="flex gap-2 items-center mb-4 text-xl font-bold text-gray-900">
              <AlertTriangle className="text-orange-500" size={24} />
              Conditions & Rules
            </h3>
            <div className="p-4 bg-orange-50 rounded-lg">
              <ul className="space-y-2">
                {selectedConceptData.conditions.map((condition, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-sm text-gray-700">
                    <span className="font-bold text-orange-600">•</span>
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formula */}
          {selectedConceptData.formula && (
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Formula</h3>
              <div className="p-4 font-mono text-sm bg-gray-100 rounded-lg">
                {selectedConceptData.formula}
              </div>
            </div>
          )}

          {/* Examples */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Examples</h3>
            <div className="space-y-4">
              {selectedConceptData.examples.map((example, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-lg">
                  <div className="mb-2">
                    <span className="font-semibold text-gray-900">Question {idx + 1}:</span>
                    <p className="mt-1 text-gray-700">{example.question}</p>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-900">Solution:</span>
                    <p className="mt-1 text-gray-700">{example.solution}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <span className="font-semibold text-blue-900">Explanation:</span>
                    <p className="mt-1 text-sm text-blue-800">{example.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          {selectedConceptData.commonMistakes && (
            <div className="mb-8">
              <h3 className="flex gap-2 items-center mb-4 text-xl font-bold text-gray-900">
                <AlertTriangle className="text-red-500" size={24} />
                Common Mistakes
              </h3>
              <div className="p-4 bg-red-50 rounded-lg">
                <ul className="space-y-2">
                  {selectedConceptData.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm text-gray-700">
                      <span className="font-bold text-red-600">❌</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tips */}
          {selectedConceptData.tips && (
            <div className="mb-8">
              <h3 className="flex gap-2 items-center mb-4 text-xl font-bold text-gray-900">
                <Lightbulb className="text-yellow-500" size={24} />
                Pro Tips
              </h3>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <ul className="space-y-2">
                  {selectedConceptData.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm text-gray-700">
                      <span className="font-bold text-yellow-600">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Complete Button */}
          {!completedConcepts.has(selectedConceptData.id) && (
            <button
              onClick={() => markConceptComplete(selectedConceptData.id, selectedConceptData.level)}
              className="flex gap-2 justify-center items-center px-6 py-3 w-full font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              <CheckCircle size={20} />
              Mark as Complete
            </button>
          )}
          {completedConcepts.has(selectedConceptData.id) && (
            <div className="flex gap-2 justify-center items-center px-6 py-3 w-full font-bold text-green-800 bg-green-100 rounded-lg">
              <CheckCircle size={20} />
              Completed!
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex gap-2 items-center mb-4 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={20} />
        Back to Topics
      </button>

      <div className="p-8 mb-6 bg-white rounded-xl shadow-lg">
        <div className="flex gap-4 items-center mb-4">
          <span className="text-5xl">{topicData[topicId].icon}</span>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{topicData[topicId].title}</h2>
            <p className="mt-2 text-gray-600">Master all concepts from beginner to advanced</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {concepts.map((concept) => {
          const isCompleted = completedConcepts.has(concept.id);
          return (
            <div
              key={concept.id}
              onClick={() => setSelectedConcept(concept.id)}
              className="p-6 bg-white rounded-lg border-2 border-transparent shadow-md transition-all cursor-pointer hover:shadow-xl hover:border-blue-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex gap-3 items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{concept.title}</h3>
                    {isCompleted && <CheckCircle className="text-green-500" size={20} />}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      concept.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      concept.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {concept.level}
                    </span>
                  </div>
                  <div className="grid gap-4 text-sm md:grid-cols-3">
                    <div>
                      <span className="font-semibold text-blue-600">Why:</span>
                      <p className="mt-1 text-gray-600">{concept.why.substring(0, 80)}...</p>
                    </div>
                    <div>
                      <span className="font-semibold text-green-600">When:</span>
                      <p className="mt-1 text-gray-600">{concept.when.substring(0, 80)}...</p>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-600">Where:</span>
                      <p className="mt-1 text-gray-600">{concept.where.substring(0, 80)}...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicDetail;

