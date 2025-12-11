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
        {
          id: 'number-line',
          title: 'Number Line & Intervals',
          level: 'beginner',
          why: 'Number lines help visualize relationships between numbers and solve inequality problems.',
          when: 'Use when: representing numbers, solving inequalities, or understanding distance between numbers.',
          where: 'Applied in: algebra problems, inequality solving, and coordinate geometry.',
          conditions: [
            'Numbers increase from left to right',
            'Distance between numbers = absolute difference',
            'Intervals: (a,b) = open, [a,b] = closed, [a,b) = half-open',
            'Negative numbers are to the left of zero',
          ],
          examples: [
            {
              question: 'On number line, what is distance between −5 and 3?',
              solution: 'Distance = |3 − (−5)| = |3 + 5| = |8| = 8',
              explanation: 'Use absolute value to find distance. Distance is always positive.',
            },
            {
              question: 'Represent on number line: −2 < x ≤ 4',
              solution: 'Open circle at −2, closed circle at 4, shade between them',
              explanation: '< means open (not included), ≤ means closed (included).',
            },
          ],
          commonMistakes: [
            'Confusing open and closed intervals',
            'Not using absolute value for distance',
            'Reversing direction on number line',
          ],
          tips: [
            'Remember: < or > = open circle, ≤ or ≥ = closed circle',
            'Distance = |a − b|',
            'Left is smaller, right is larger',
          ],
        },
        {
          id: 'rounding-estimation',
          title: 'Rounding & Estimation',
          level: 'beginner',
          why: 'Estimation saves time and helps verify answers. Essential for quick problem solving.',
          when: 'Use when: checking answers, eliminating choices, or when exact calculation is time-consuming.',
          where: 'Applied in: all problem types, especially data interpretation and word problems.',
          conditions: [
            'Round to nearest: 0.5 and above round up, below 0.5 round down',
            'For addition: round to same place value',
            'For multiplication: round one up, one down',
            'Estimation error should be < 10% for useful estimates',
          ],
          examples: [
            {
              question: 'Estimate: 487 + 623',
              solution: 'Round: 500 + 600 = 1,100 (actual: 1,110)',
              explanation: 'Round both numbers to nearest hundred, then add.',
            },
            {
              question: 'Estimate: 23 × 48',
              solution: 'Round: 20 × 50 = 1,000 (actual: 1,104)',
              explanation: 'Round one down, one up to balance error.',
            },
          ],
          commonMistakes: [
            'Rounding in wrong direction consistently',
            'Not accounting for rounding errors',
            'Over-estimating accuracy',
          ],
          tips: [
            'Round to make calculation easier',
            'Round up and down to balance errors',
            'Use estimation to check reasonableness',
          ],
        },
        {
          id: 'decimal-operations',
          title: 'Decimal Operations',
          level: 'beginner',
          why: 'Decimal operations are fundamental. Mastering them prevents calculation errors.',
          when: 'Use when: adding, subtracting, multiplying, or dividing decimals.',
          where: 'Applied in: all arithmetic problems involving decimals, money problems, measurements.',
          conditions: [
            'Addition/Subtraction: Align decimal points',
            'Multiplication: Count decimal places, product has sum of decimal places',
            'Division: Move decimal points to make divisor whole number',
            'Multiplying by 10: move decimal right, dividing: move left',
          ],
          examples: [
            {
              question: 'Add: 12.45 + 3.7',
              solution: 'Align: 12.45 + 3.70 = 16.15',
              explanation: 'Add zero to 3.7 to align decimal points, then add normally.',
            },
            {
              question: 'Multiply: 2.5 × 0.4',
              solution: '2.5 × 0.4 = 1.00 (2 decimal places total)',
              explanation: 'Multiply as if whole numbers: 25 × 4 = 100, then place decimal: 1.00',
            },
            {
              question: 'Divide: 12.6 ÷ 0.3',
              solution: 'Move decimals: 126 ÷ 3 = 42',
              explanation: 'Move decimal one place right in both numbers, then divide.',
            },
          ],
          commonMistakes: [
            'Not aligning decimal points in addition',
            'Wrong number of decimal places in multiplication',
            'Forgetting to move decimals in division',
          ],
          tips: [
            'Always align decimals for addition/subtraction',
            'Count total decimal places for multiplication',
            'Make divisor whole number for division',
          ],
        },
        {
          id: 'fraction-operations',
          title: 'Fraction Operations',
          level: 'beginner',
          why: 'Fraction operations are essential. Common errors occur here, so mastery is critical.',
          when: 'Use when: adding, subtracting, multiplying, or dividing fractions.',
          where: 'Applied in: all problems involving fractions, ratios, and proportions.',
          conditions: [
            'Add/Subtract: Need common denominator',
            'Multiply: Multiply numerators, multiply denominators',
            'Divide: Multiply by reciprocal (flip second fraction)',
            'Simplify before or after operations',
          ],
          examples: [
            {
              question: 'Add: 1/3 + 1/4',
              solution: 'LCM of 3 and 4 = 12 → 4/12 + 3/12 = 7/12',
              explanation: 'Find common denominator (LCM), convert fractions, then add numerators.',
            },
            {
              question: 'Multiply: 2/3 × 3/5',
              solution: '(2 × 3)/(3 × 5) = 6/15 = 2/5',
              explanation: 'Multiply numerators and denominators, then simplify.',
            },
            {
              question: 'Divide: 3/4 ÷ 2/5',
              solution: '3/4 × 5/2 = 15/8 = 1 7/8',
              explanation: 'Multiply by reciprocal: flip second fraction, then multiply.',
            },
          ],
          commonMistakes: [
            'Adding numerators and denominators directly',
            'Not finding common denominator for addition',
            'Forgetting to flip fraction when dividing',
          ],
          tips: [
            'Always find common denominator for add/subtract',
            'Multiply straight across for multiplication',
            'Flip and multiply for division',
          ],
        },
        {
          id: 'scientific-notation',
          title: 'Scientific Notation',
          level: 'intermediate',
          why: 'Scientific notation simplifies very large or very small numbers. Common in science and data problems.',
          when: 'Use when: working with very large or very small numbers, or when asked to express in scientific notation.',
          where: 'Applied in: data interpretation, science problems, and large number calculations.',
          conditions: [
            'Format: a × 10ⁿ where 1 ≤ a < 10',
            'Positive exponent: large number, move decimal right',
            'Negative exponent: small number, move decimal left',
            'Multiplying: multiply coefficients, add exponents',
            'Dividing: divide coefficients, subtract exponents',
          ],
          formula: 'a × 10ⁿ where 1 ≤ a < 10',
          examples: [
            {
              question: 'Express 45,000 in scientific notation',
              solution: '45,000 = 4.5 × 10⁴',
              explanation: 'Move decimal 4 places left, so exponent is 4.',
            },
            {
              question: 'Express 0.00032 in scientific notation',
              solution: '0.00032 = 3.2 × 10⁻⁴',
              explanation: 'Move decimal 4 places right, so exponent is −4.',
            },
            {
              question: 'Multiply: (2 × 10³) × (3 × 10⁵)',
              solution: '(2 × 3) × 10³⁺⁵ = 6 × 10⁸',
              explanation: 'Multiply coefficients (2×3=6), add exponents (3+5=8).',
            },
          ],
          commonMistakes: [
            'Not having coefficient between 1 and 10',
            'Wrong sign on exponent',
            'Adding instead of multiplying coefficients',
          ],
          tips: [
            'Coefficient must be 1 to 9.99...',
            'Count decimal places moved for exponent',
            'Right = negative exponent, left = positive',
          ],
        },
        {
          id: 'square-roots',
          title: 'Square Roots & Perfect Squares',
          level: 'intermediate',
          why: 'Square roots appear frequently. Recognizing perfect squares speeds up calculations.',
          when: 'Use when: simplifying radicals, solving equations with squares, or finding side lengths.',
          where: 'Applied in: geometry, algebra, and quantitative comparisons.',
          conditions: [
            '√(a²) = |a| (absolute value)',
            '√(ab) = √a × √b',
            '√(a/b) = √a / √b',
            'CRITICAL: √(a+b) ≠ √a + √b',
            'Perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225',
          ],
          formula: '√(ab) = √a × √b   |   √(a/b) = √a / √b   |   √a² = |a|',
          examples: [
            {
              question: 'Simplify: √72',
              solution: '√72 = √(36 × 2) = √36 × √2 = 6√2',
              explanation: 'Factor out perfect square (36), simplify.',
            },
            {
              question: 'Simplify: √(50/2)',
              solution: '√(50/2) = √50 / √2 = √25 = 5',
              explanation: 'Use property: √(a/b) = √a / √b, or simplify inside first.',
            },
            {
              question: 'Solve: x² = 49',
              solution: 'x = ±√49 = ±7',
              explanation: 'Square root of 49 is 7, but x² = 49 means x = 7 or x = −7.',
            },
          ],
          commonMistakes: [
            'Assuming √(a+b) = √a + √b (WRONG!)',
            'Forgetting ± when solving x² = number',
            'Not simplifying radicals completely',
          ],
          tips: [
            'Factor out perfect squares',
            'Remember: x² = a means x = ±√a',
            'Memorize perfect squares up to 225',
          ],
        },
        {
          id: 'cube-roots',
          title: 'Cube Roots & Perfect Cubes',
          level: 'intermediate',
          why: 'Cube roots appear in advanced problems. Understanding them expands problem-solving ability.',
          when: 'Use when: solving cubic equations, finding cube roots, or working with volumes.',
          where: 'Applied in: algebra problems, geometry (volumes), and advanced calculations.',
          conditions: [
            '∛(a³) = a (unlike squares, no absolute value needed)',
            '∛(ab) = ∛a × ∛b',
            'Perfect cubes: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000',
            'Cube root of negative is negative',
          ],
          formula: '∛(ab) = ∛a × ∛b   |   ∛a³ = a',
          examples: [
            {
              question: 'Find: ∛64',
              solution: '64 = 4³, so ∛64 = 4',
              explanation: 'Recognize 64 as perfect cube: 4³ = 64.',
            },
            {
              question: 'Find: ∛−125',
              solution: '−125 = (−5)³, so ∛−125 = −5',
              explanation: 'Cube root of negative is negative. −5 × −5 × −5 = −125.',
            },
            {
              question: 'Simplify: ∛(8 × 27)',
              solution: '∛(8 × 27) = ∛8 × ∛27 = 2 × 3 = 6',
              explanation: 'Use property: ∛(ab) = ∛a × ∛b.',
            },
          ],
          commonMistakes: [
            'Forgetting cube root of negative is negative',
            'Not recognizing perfect cubes',
            'Confusing with square roots',
          ],
          tips: [
            'Memorize perfect cubes: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000',
            'Cube root preserves sign (unlike square root)',
            'Factor out perfect cubes when simplifying',
          ],
        },
        {
          id: 'rational-irrational',
          title: 'Rational & Irrational Numbers',
          level: 'intermediate',
          why: 'Understanding number types helps in quantitative comparison and number theory problems.',
          when: 'Use when: classifying numbers, comparing quantities, or solving number theory problems.',
          where: 'Applied in: quantitative comparisons, number theory, and algebra problems.',
          conditions: [
            'Rational: Can be expressed as fraction p/q where p, q are integers, q ≠ 0',
            'Irrational: Cannot be expressed as fraction (e.g., √2, π, e)',
            'All integers are rational',
            'All terminating or repeating decimals are rational',
            'Sum/product of rational numbers is rational',
            'Sum of rational and irrational is irrational',
          ],
          examples: [
            {
              question: 'Which is irrational? A) 0.5  B) √4  C) √2  D) 3/4',
              solution: 'C) √2 is irrational (cannot be expressed as fraction)',
              explanation: 'A, B, D are all rational (can be fractions). √2 cannot be fraction.',
            },
            {
              question: 'Is 0.333... rational?',
              solution: 'Yes, 0.333... = 1/3, which is rational',
              explanation: 'Repeating decimals can be expressed as fractions, so they are rational.',
            },
            {
              question: 'What is √2 + √2?',
              solution: '√2 + √2 = 2√2, which is irrational',
              explanation: 'Sum of irrational numbers can be irrational (or rational if they cancel).',
            },
          ],
          commonMistakes: [
            'Thinking all square roots are irrational',
            'Confusing rational with whole numbers',
            'Not recognizing repeating decimals as rational',
          ],
          tips: [
            'Rational = can be fraction, Irrational = cannot be fraction',
            'Perfect square roots are rational (√4 = 2)',
            'Repeating decimals = rational',
          ],
        },
        {
          id: 'number-properties',
          title: 'Number Properties & Classifications',
          level: 'beginner',
          why: 'Understanding number properties helps eliminate wrong answers and solve problems faster.',
          when: 'Use when: classifying numbers, eliminating answer choices, or solving number theory problems.',
          where: 'Applied in: all problem types, especially quantitative comparisons.',
          conditions: [
            'Natural numbers: 1, 2, 3, 4, ... (positive integers)',
            'Whole numbers: 0, 1, 2, 3, ... (natural + 0)',
            'Integers: ..., −2, −1, 0, 1, 2, ... (positive, negative, zero)',
            'Real numbers: All rational and irrational numbers',
            'Prime: Exactly 2 factors (1 and itself)',
            'Composite: More than 2 factors',
          ],
          examples: [
            {
              question: 'Which is prime? A) 1  B) 2  C) 4  D) 6',
              solution: 'B) 2 is prime (only factors: 1 and 2)',
              explanation: '1 is not prime (only one factor), 4 and 6 are composite (multiple factors).',
            },
            {
              question: 'Smallest composite number?',
              solution: '4 (factors: 1, 2, 4)',
              explanation: 'Composite means more than 2 factors. 4 is smallest composite.',
            },
            {
              question: 'Is 0 a natural number?',
              solution: 'No, natural numbers start from 1',
              explanation: 'Natural numbers = positive integers (1, 2, 3, ...). 0 is whole number, not natural.',
            },
          ],
          commonMistakes: [
            'Thinking 1 is prime',
            'Including 0 in natural numbers',
            'Confusing prime and composite',
          ],
          tips: [
            'Prime: exactly 2 factors, Composite: more than 2 factors',
            '1 is neither prime nor composite',
            'Natural = positive integers, Whole = natural + 0',
          ],
        },
        {
          id: 'remainders',
          title: 'Remainders & Modular Arithmetic',
          level: 'intermediate',
          why: 'Remainder problems test understanding of division. Common in number theory and word problems.',
          when: 'Use when: finding remainders, solving division problems, or working with cycles.',
          where: 'Applied in: number theory, word problems about cycles, and divisibility problems.',
          conditions: [
            'When dividing a by b: a = bq + r, where 0 ≤ r < b',
            'Remainder is always less than divisor',
            'To find remainder: divide and take remainder',
            'Patterns in remainders can be found for large numbers',
          ],
          examples: [
            {
              question: 'What is remainder when 47 is divided by 5?',
              solution: '47 ÷ 5 = 9 remainder 2, so remainder = 2',
              explanation: '47 = 5 × 9 + 2, so remainder is 2.',
            },
            {
              question: 'What is remainder when 100 is divided by 7?',
              solution: '100 ÷ 7 = 14 remainder 2, so remainder = 2',
              explanation: '100 = 7 × 14 + 2, so remainder is 2.',
            },
            {
              question: 'If number leaves remainder 3 when divided by 5, what possible remainders when divided by 10?',
              solution: 'Number could be 3, 8, 13, 18, ... → When divided by 10: remainders 3 or 8',
              explanation: 'Numbers with remainder 3 mod 5: 3, 8, 13, 18, 23, ... These give remainders 3 or 8 mod 10.',
            },
          ],
          commonMistakes: [
            'Getting remainder ≥ divisor',
            'Not understanding remainder concept',
            'Confusing quotient and remainder',
          ],
          tips: [
            'Remainder is always less than divisor',
            'a = bq + r, find r',
            'Look for patterns in remainders',
          ],
        },
        {
          id: 'unit-conversions',
          title: 'Unit Conversions',
          level: 'beginner',
          why: 'Unit conversions are essential for solving real-world problems and avoiding calculation errors.',
          when: 'Use when: converting between units, solving measurement problems, or working with different systems.',
          where: 'Applied in: word problems, geometry problems, and real-world applications.',
          conditions: [
            'Use conversion factors (multiply by 1 in different form)',
            'Length: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm',
            'Time: 1 hour = 60 min, 1 min = 60 sec',
            'Mass: 1 kg = 1000 g',
            'Set up proportions or multiply by conversion factor',
          ],
          examples: [
            {
              question: 'Convert 2.5 km to meters',
              solution: '2.5 km × 1000 m/km = 2,500 m',
              explanation: 'Multiply by conversion factor: 1 km = 1000 m.',
            },
            {
              question: 'Convert 3 hours 25 minutes to minutes',
              solution: '3 hours = 3 × 60 = 180 min → Total = 180 + 25 = 205 minutes',
              explanation: 'Convert hours to minutes, then add remaining minutes.',
            },
            {
              question: 'Convert 4500 g to kg',
              solution: '4500 g ÷ 1000 = 4.5 kg',
              explanation: 'Divide by conversion factor: 1 kg = 1000 g.',
            },
          ],
          commonMistakes: [
            'Multiplying instead of dividing (or vice versa)',
            'Using wrong conversion factor',
            'Not converting all units consistently',
          ],
          tips: [
            'Write conversion as fraction: 1000 m / 1 km',
            'Units should cancel correctly',
            'Check answer makes sense (larger unit = smaller number)',
          ],
        },
        {
          id: 'mean-median-mode',
          title: 'Mean, Median & Mode',
          level: 'intermediate',
          why: 'Understanding central tendencies is essential for data analysis and statistics problems.',
          when: 'Use when: analyzing data sets, finding averages, or solving statistics problems.',
          where: 'Applied in: data interpretation, statistics problems, and word problems about averages.',
          conditions: [
            'Mean (Average): Sum of values / Number of values',
            'Median: Middle value when arranged in order (or average of two middle if even)',
            'Mode: Most frequently occurring value',
            'Outliers affect mean more than median',
          ],
          formula: 'Mean = Sum / Count   |   Median = middle value   |   Mode = most frequent',
          examples: [
            {
              question: 'Find mean, median, mode: 5, 7, 3, 7, 9, 5, 7',
              solution: 'Mean: (5+7+3+7+9+5+7)/7 = 43/7 ≈ 6.14 → Median: 3,5,5,7,7,7,9 = 7 → Mode: 7 (appears 3 times)',
              explanation: 'Mean = sum divided by count. Median = middle when sorted. Mode = most frequent.',
            },
            {
              question: 'If mean of 5 numbers is 20, and four numbers are 15, 18, 22, 25, find fifth',
              solution: 'Total = 20 × 5 = 100 → Sum of four = 15+18+22+25 = 80 → Fifth = 100 − 80 = 20',
              explanation: 'Use formula: Total = Mean × Count. Subtract known sum from total.',
            },
          ],
          commonMistakes: [
            'Not sorting for median',
            'Confusing mean and median',
            'Not counting all values for mean',
          ],
          tips: [
            'Always sort data for median',
            'Mean = total / count',
            'Mode = most frequent (can be multiple or none)',
          ],
        },
        {
          id: 'range-variance',
          title: 'Range & Spread',
          level: 'intermediate',
          why: 'Understanding data spread helps interpret data sets and solve statistics problems.',
          when: 'Use when: analyzing data variability, comparing data sets, or solving statistics problems.',
          where: 'Applied in: data interpretation, statistics problems, and analysis questions.',
          conditions: [
            'Range = Maximum − Minimum',
            'Larger range = more spread out data',
            'Range is affected by outliers',
            'Interquartile range (IQR) = Q3 − Q1 (less affected by outliers)',
          ],
          formula: 'Range = Max − Min   |   IQR = Q3 − Q1',
          examples: [
            {
              question: 'Find range: 12, 15, 18, 20, 25, 30',
              solution: 'Range = 30 − 12 = 18',
              explanation: 'Maximum is 30, minimum is 12, so range = 30 − 12 = 18.',
            },
            {
              question: 'Data set A: range 10, Data set B: range 25. Which more spread out?',
              solution: 'Data set B (range 25 > range 10)',
              explanation: 'Larger range indicates more spread in the data.',
            },
          ],
          commonMistakes: [
            'Confusing range with mean',
            'Not identifying max and min correctly',
            'Forgetting range is difference, not ratio',
          ],
          tips: [
            'Range = largest − smallest',
            'Range measures spread, not center',
            'Outliers greatly affect range',
          ],
        },
        {
          id: 'probability-basics',
          title: 'Basic Probability',
          level: 'intermediate',
          why: 'Probability appears in many problems. Understanding basics is essential.',
          when: 'Use when: calculating chances, solving probability problems, or analyzing likelihood.',
          where: 'Applied in: probability problems, statistics, and word problems about chances.',
          conditions: [
            'Probability = Favorable outcomes / Total outcomes',
            'Probability ranges from 0 to 1 (or 0% to 100%)',
            'P(not A) = 1 − P(A)',
            'P(A or B) = P(A) + P(B) if mutually exclusive',
            'P(A and B) = P(A) × P(B) if independent',
          ],
          formula: 'P(Event) = Favorable / Total   |   P(not A) = 1 − P(A)',
          examples: [
            {
              question: 'Probability of rolling 6 on die?',
              solution: 'P(6) = 1/6 (one favorable outcome out of 6 total)',
              explanation: 'One way to get 6, six total outcomes, so probability = 1/6.',
            },
            {
              question: 'Probability of NOT rolling 6?',
              solution: 'P(not 6) = 1 − 1/6 = 5/6',
              explanation: 'Use complement rule: P(not A) = 1 − P(A).',
            },
            {
              question: 'Two dice, probability both show 6?',
              solution: 'P(6 and 6) = 1/6 × 1/6 = 1/36',
              explanation: 'Independent events: multiply probabilities.',
            },
          ],
          commonMistakes: [
            'Not counting total outcomes correctly',
            'Adding probabilities for "and" events',
            'Confusing "or" and "and"',
          ],
          tips: [
            'Probability = favorable / total',
            '"And" = multiply (if independent), "Or" = add (if mutually exclusive)',
            'Check if events are independent or mutually exclusive',
          ],
        },
        {
          id: 'permutations-combinations',
          title: 'Permutations & Combinations',
          level: 'advanced',
          why: 'Counting problems require understanding of permutations and combinations. Advanced but important.',
          when: 'Use when: counting arrangements, selecting groups, or solving counting problems.',
          where: 'Applied in: probability problems, counting problems, and advanced word problems.',
          conditions: [
            'Permutation (order matters): nPr = n!/(n−r)!',
            'Combination (order doesn\'t matter): nCr = n!/(r!(n−r)!)',
            'n! = n × (n−1) × ... × 2 × 1',
            '0! = 1',
          ],
          formula: 'nPr = n!/(n−r)!   |   nCr = n!/(r!(n−r)!)',
          examples: [
            {
              question: 'How many ways to arrange 3 books on shelf?',
              solution: '3P3 = 3! = 3 × 2 × 1 = 6 ways',
              explanation: 'Order matters (arrangement), so use permutation. All 3 selected: 3!',
            },
            {
              question: 'How many ways to choose 2 from 5?',
              solution: '5C2 = 5!/(2!3!) = (5×4)/(2×1) = 10 ways',
              explanation: 'Order doesn\'t matter (just choosing), so use combination.',
            },
            {
              question: 'How many 3-letter codes from A,B,C,D (no repeats)?',
              solution: '4P3 = 4!/(4−3)! = 24/1 = 24 codes',
              explanation: 'Order matters (ABC ≠ CBA), no repeats, so permutation.',
            },
          ],
          commonMistakes: [
            'Using permutation when combination needed (or vice versa)',
            'Not accounting for restrictions',
            'Calculation errors with factorials',
          ],
          tips: [
            'Order matters? → Permutation, Order doesn\'t matter? → Combination',
            'nCr = nC(n−r) (choosing r same as choosing n−r)',
            'Simplify factorials before calculating',
          ],
        },
        {
          id: 'sets-venn',
          title: 'Sets & Venn Diagrams',
          level: 'intermediate',
          why: 'Set theory helps solve complex problems involving overlapping groups. Visual representation aids understanding.',
          when: 'Use when: problems involve overlapping groups, "both/neither" scenarios, or set operations.',
          where: 'Applied in: word problems about groups, probability, and logic problems.',
          conditions: [
            'Union (A ∪ B): Elements in A or B or both',
            'Intersection (A ∩ B): Elements in both A and B',
            'Complement: Elements not in set',
            'n(A ∪ B) = n(A) + n(B) − n(A ∩ B)',
          ],
          formula: 'n(A ∪ B) = n(A) + n(B) − n(A ∩ B)',
          examples: [
            {
              question: 'In class: 20 like math, 15 like science, 8 like both. How many like at least one?',
              solution: 'n(Math ∪ Science) = 20 + 15 − 8 = 27',
              explanation: 'Use formula: total = sum of individual − intersection (to avoid double counting).',
            },
            {
              question: 'Survey: 30 like A, 25 like B, 10 like both, 5 like neither. Total surveyed?',
              solution: 'Like at least one: 30 + 25 − 10 = 45 → Total = 45 + 5 = 50',
              explanation: 'Find union, then add those who like neither.',
            },
          ],
          commonMistakes: [
            'Double counting intersection',
            'Forgetting "neither" group',
            'Not using Venn diagram to visualize',
          ],
          tips: [
            'Draw Venn diagram for visualization',
            'Remember: union = sum − intersection',
            'Account for "neither" separately',
          ],
        },
        {
          id: 'logarithms',
          title: 'Logarithms',
          level: 'advanced',
          why: 'Logarithms appear in advanced problems. Understanding them expands problem-solving capability.',
          when: 'Use when: solving exponential equations, working with very large/small numbers, or advanced algebra.',
          where: 'Applied in: advanced algebra, exponential growth problems, and scientific calculations.',
          conditions: [
            'logₐ(b) = c means aᶜ = b',
            'log(ab) = log(a) + log(b)',
            'log(a/b) = log(a) − log(b)',
            'log(aⁿ) = n × log(a)',
            'logₐ(a) = 1, logₐ(1) = 0',
            'Common log: log₁₀, Natural log: ln (base e)',
          ],
          formula: 'log(ab) = log(a) + log(b)   |   log(a/b) = log(a) − log(b)   |   log(aⁿ) = n×log(a)',
          examples: [
            {
              question: 'Solve: log₂(8) = ?',
              solution: 'log₂(8) = 3 because 2³ = 8',
              explanation: 'Logarithm asks: what power of 2 gives 8? Answer is 3.',
            },
            {
              question: 'Simplify: log(100) + log(10)',
              solution: 'log(100) + log(10) = log(100 × 10) = log(1000) = 3',
              explanation: 'Use property: log(a) + log(b) = log(ab).',
            },
            {
              question: 'Solve: 2ˣ = 16',
              solution: 'Take log: x = log₂(16) = 4, or recognize 2⁴ = 16',
              explanation: 'Use logarithm to solve exponential equation, or recognize power.',
            },
          ],
          commonMistakes: [
            'Confusing log properties',
            'Not recognizing log as inverse of exponent',
            'Base errors in calculations',
          ],
          tips: [
            'Log is inverse of exponent: logₐ(aˣ) = x',
            'Memorize: log(ab) = log(a) + log(b)',
            'Common log (base 10) often written as just "log"',
          ],
        },
        {
          id: 'complex-numbers',
          title: 'Complex Numbers',
          level: 'advanced',
          why: 'Complex numbers appear in advanced algebra. Understanding them is needed for some test problems.',
          when: 'Use when: solving equations with no real solutions, or working with √(−1).',
          where: 'Applied in: advanced algebra problems and quadratic equations with negative discriminants.',
          conditions: [
            'i = √(−1), so i² = −1',
            'Complex number: a + bi where a, b are real',
            'Adding: (a+bi) + (c+di) = (a+c) + (b+d)i',
            'Multiplying: (a+bi)(c+di) = ac + adi + bci + bdi² = (ac−bd) + (ad+bc)i',
            'Conjugate: a+bi and a−bi (multiply to get real number)',
          ],
          formula: 'i = √(−1), i² = −1   |   (a+bi)(c+di) = (ac−bd) + (ad+bc)i',
          examples: [
            {
              question: 'Simplify: √(−16)',
              solution: '√(−16) = √(16 × −1) = 4i',
              explanation: 'Factor out −1, use i = √(−1).',
            },
            {
              question: 'Add: (3+2i) + (1−5i)',
              solution: '(3+2i) + (1−5i) = (3+1) + (2−5)i = 4 − 3i',
              explanation: 'Add real parts and imaginary parts separately.',
            },
            {
              question: 'Multiply: (2+i)(2−i)',
              solution: '(2+i)(2−i) = 4 − 2i + 2i − i² = 4 − (−1) = 5',
              explanation: 'This is difference of squares. Result is real number (no i).',
            },
          ],
          commonMistakes: [
            'Forgetting i² = −1',
            'Not separating real and imaginary parts',
            'Calculation errors in multiplication',
          ],
          tips: [
            'Remember: i² = −1 (not 1!)',
            'Add/subtract real and imaginary parts separately',
            'Conjugate pairs multiply to real numbers',
          ],
        },
        {
          id: 'matrices-basics',
          title: 'Matrices Basics',
          level: 'advanced',
          why: 'Matrices appear in some advanced problems. Basic understanding helps solve them.',
          when: 'Use when: solving systems using matrices, or working with matrix operations.',
          where: 'Applied in: advanced algebra problems and systems of equations.',
          conditions: [
            'Matrix: rectangular array of numbers',
            'Dimensions: m × n (m rows, n columns)',
            'Adding: same dimensions, add corresponding entries',
            'Multiplying: (m×n) × (n×p) = (m×p) matrix',
            'Identity matrix: 1s on diagonal, 0s elsewhere',
          ],
          examples: [
            {
              question: 'Add matrices: [1 2] + [3 4]',
              solution: '[1 2] + [3 4] = [1+3 2+4] = [4 6]',
              explanation: 'Add corresponding entries.',
            },
            {
              question: 'Multiply: [1 2] × [3; 4] (column vector)',
              solution: '[1 2] × [3; 4] = 1×3 + 2×4 = 3 + 8 = 11',
              explanation: 'Row × column: multiply and sum.',
            },
          ],
          commonMistakes: [
            'Adding matrices of different sizes',
            'Wrong order in multiplication',
            'Not checking dimensions',
          ],
          tips: [
            'Can only add same-size matrices',
            'For multiplication: columns of first = rows of second',
            'Check dimensions before operations',
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
        {
          id: 'rational-expressions',
          title: 'Rational Expressions',
          level: 'intermediate',
          why: 'Rational expressions appear in advanced algebra. Simplifying them is essential.',
          when: 'Use when: simplifying fractions with variables, solving rational equations, or combining rational expressions.',
          where: 'Applied in: advanced algebra problems and equation solving.',
          conditions: [
            'Factor numerator and denominator',
            'Cancel common factors (but not terms!)',
            'Find LCD for addition/subtraction',
            'Domain: denominator ≠ 0',
          ],
          examples: [
            {
              question: 'Simplify: (x²−4)/(x+2)',
              solution: '(x²−4)/(x+2) = (x+2)(x−2)/(x+2) = x−2 (x ≠ −2)',
              explanation: 'Factor numerator (difference of squares), cancel common factor.',
            },
            {
              question: 'Add: 1/(x+1) + 2/(x−1)',
              solution: 'LCD = (x+1)(x−1) → [1(x−1) + 2(x+1)] / [(x+1)(x−1)] = (3x+1)/(x²−1)',
              explanation: 'Find LCD, convert to common denominator, add numerators.',
            },
          ],
          commonMistakes: [
            'Canceling terms instead of factors',
            'Not finding LCD correctly',
            'Forgetting domain restrictions',
          ],
          tips: [
            'Only cancel factors, not terms',
            'Factor first, then simplify',
            'Always state domain restrictions',
          ],
        },
        {
          id: 'radical-equations',
          title: 'Radical Equations',
          level: 'advanced',
          why: 'Radical equations require special techniques. Understanding them expands problem-solving ability.',
          when: 'Use when: solving equations with square roots or other radicals.',
          where: 'Applied in: advanced algebra problems.',
          conditions: [
            'Isolate radical on one side',
            'Square both sides (or raise to appropriate power)',
            'Check solutions (extraneous solutions possible)',
            'May need to square twice for nested radicals',
          ],
          examples: [
            {
              question: 'Solve: √(x+3) = 5',
              solution: 'Square both sides: x+3 = 25 → x = 22. Check: √(22+3) = √25 = 5 ✓',
              explanation: 'Square both sides to eliminate radical, then solve. Always check!',
            },
            {
              question: 'Solve: √(2x+1) = x−1',
              solution: 'Square: 2x+1 = (x−1)² = x²−2x+1 → x²−4x = 0 → x(x−4) = 0 → x = 0 or 4. Check: x=0 gives √1 = −1 ✗, x=4 gives √9 = 3 ✓. So x = 4',
              explanation: 'Square, solve quadratic, but check both solutions (x=0 is extraneous).',
            },
          ],
          commonMistakes: [
            'Not checking solutions',
            'Forgetting to isolate radical first',
            'Not squaring correctly',
          ],
          tips: [
            'Always check solutions (extraneous solutions common)',
            'Isolate radical before squaring',
            'May need to square twice for complex cases',
          ],
        },
        {
          id: 'absolute-value-equations',
          title: 'Absolute Value Equations',
          level: 'intermediate',
          why: 'Absolute value equations have two cases. Systematic approach prevents errors.',
          when: 'Use when: solving equations with absolute values.',
          where: 'Applied in: algebra problems and distance problems.',
          conditions: [
            '|expression| = a means: expression = a OR expression = −a',
            'Solve both cases separately',
            'Check solutions in original equation',
            'If |expression| = negative number, no solution',
          ],
          examples: [
            {
              question: 'Solve: |2x−3| = 7',
              solution: 'Case 1: 2x−3 = 7 → 2x = 10 → x = 5. Case 2: 2x−3 = −7 → 2x = −4 → x = −2. Solutions: x = 5 or x = −2',
              explanation: 'Absolute value equals 7 means expression equals 7 or −7. Solve both.',
            },
            {
              question: 'Solve: |x+1| = −5',
              solution: 'No solution (absolute value cannot be negative)',
              explanation: 'Absolute value is always ≥ 0, so cannot equal negative number.',
            },
          ],
          commonMistakes: [
            'Forgetting negative case',
            'Not checking solutions',
            'Thinking |x| = negative has solution',
          ],
          tips: [
            'Always consider both positive and negative cases',
            'Check solutions in original',
            '|x| = negative → no solution',
          ],
        },
        {
          id: 'inequality-compound',
          title: 'Compound Inequalities',
          level: 'intermediate',
          why: 'Compound inequalities combine multiple conditions. Understanding them is essential.',
          when: 'Use when: solving problems with "and" or "or" conditions, or ranges of values.',
          where: 'Applied in: algebra problems and word problems with constraints.',
          conditions: [
            '"And" (∩): Both conditions must be true (intersection)',
            '"Or" (∪): Either condition can be true (union)',
            'Solve each inequality separately, then combine',
            'Graph on number line to visualize',
          ],
          examples: [
            {
              question: 'Solve: −3 < 2x+1 < 7',
              solution: 'Split: −3 < 2x+1 AND 2x+1 < 7 → −4 < 2x AND 2x < 6 → −2 < x AND x < 3 → −2 < x < 3',
              explanation: 'Solve both parts simultaneously, find intersection.',
            },
            {
              question: 'Solve: x < −2 OR x > 3',
              solution: 'x < −2 OR x > 3 (union of two intervals)',
              explanation: '"Or" means either condition. Solution is union of both intervals.',
            },
          ],
          commonMistakes: [
            'Confusing "and" and "or"',
            'Not finding intersection correctly',
            'Reversing inequality signs',
          ],
          tips: [
            '"And" = intersection (both true), "Or" = union (either true)',
            'Graph to visualize',
            'Solve each part, then combine appropriately',
          ],
        },
        {
          id: 'functions-basics',
          title: 'Functions Basics',
          level: 'intermediate',
          why: 'Functions are fundamental in algebra. Understanding them is essential for advanced problems.',
          when: 'Use when: working with f(x) notation, evaluating functions, or finding domains/ranges.',
          where: 'Applied in: algebra problems, coordinate geometry, and advanced mathematics.',
          conditions: [
            'Function: Each input (x) gives exactly one output f(x)',
            'Domain: All possible x values',
            'Range: All possible f(x) values',
            'Vertical line test: If vertical line intersects graph more than once, not a function',
          ],
          examples: [
            {
              question: 'If f(x) = 2x+3, find f(5)',
              solution: 'f(5) = 2(5) + 3 = 10 + 3 = 13',
              explanation: 'Substitute x = 5 into function.',
            },
            {
              question: 'If f(x) = x²−4, find f(−2)',
              solution: 'f(−2) = (−2)² − 4 = 4 − 4 = 0',
              explanation: 'Substitute and evaluate.',
            },
            {
              question: 'Domain of f(x) = 1/(x−3)?',
              solution: 'x−3 ≠ 0, so x ≠ 3. Domain: all real numbers except 3',
              explanation: 'Denominator cannot be zero, so exclude x = 3.',
            },
          ],
          commonMistakes: [
            'Confusing function with equation',
            'Not finding domain restrictions',
            'Evaluation errors',
          ],
          tips: [
            'f(x) means "function of x"',
            'Check domain: denominators ≠ 0, square roots ≥ 0',
            'Substitute carefully when evaluating',
          ],
        },
        {
          id: 'function-composition',
          title: 'Function Composition',
          level: 'advanced',
          why: 'Composition appears in advanced problems. Understanding it expands capability.',
          when: 'Use when: finding f(g(x)) or g(f(x)), or working with composite functions.',
          where: 'Applied in: advanced algebra problems.',
          conditions: [
            'f(g(x)) means: apply g first, then apply f to result',
            'Read from right to left: f(g(x)) = f of g of x',
            'Domain of composition: x must be in domain of g, and g(x) in domain of f',
          ],
          examples: [
            {
              question: 'If f(x) = x+2 and g(x) = 3x, find f(g(4))',
              solution: 'g(4) = 3(4) = 12 → f(12) = 12+2 = 14',
              explanation: 'Apply g first: g(4) = 12, then apply f: f(12) = 14.',
            },
            {
              question: 'If f(x) = x² and g(x) = x+1, find f(g(x))',
              solution: 'f(g(x)) = f(x+1) = (x+1)² = x²+2x+1',
              explanation: 'Substitute g(x) = x+1 into f: f(x+1) = (x+1)².',
            },
          ],
          commonMistakes: [
            'Applying functions in wrong order',
            'Not substituting correctly',
            'Domain errors',
          ],
          tips: [
            'Read right to left: f(g(x)) = f of g of x',
            'Apply inner function first',
            'Check domain of composition',
          ],
        },
        {
          id: 'inverse-functions',
          title: 'Inverse Functions',
          level: 'advanced',
          why: 'Inverse functions reverse operations. Important for solving certain equations.',
          when: 'Use when: finding inverse functions, or solving equations using inverses.',
          where: 'Applied in: advanced algebra problems.',
          conditions: [
            'f⁻¹(f(x)) = x and f(f⁻¹(x)) = x',
            'To find inverse: swap x and y, solve for y',
            'Graph of inverse is reflection over y=x line',
            'Function must be one-to-one to have inverse',
          ],
          examples: [
            {
              question: 'Find inverse of f(x) = 2x+3',
              solution: 'y = 2x+3 → Swap: x = 2y+3 → Solve: x−3 = 2y → y = (x−3)/2 → f⁻¹(x) = (x−3)/2',
              explanation: 'Swap x and y, then solve for y to get inverse.',
            },
            {
              question: 'If f(x) = x² (x≥0), find f⁻¹(x)',
              solution: 'y = x² → x = y² → y = √x (since x≥0) → f⁻¹(x) = √x',
              explanation: 'Swap and solve. Note: need x≥0 restriction for inverse to exist.',
            },
          ],
          commonMistakes: [
            'Not swapping x and y',
            'Forgetting domain restrictions',
            'Not checking if inverse exists',
          ],
          tips: [
            'Swap x and y, then solve for y',
            'Check domain: function must be one-to-one',
            'Verify: f(f⁻¹(x)) = x',
          ],
        },
        {
          id: 'polynomials',
          title: 'Polynomials',
          level: 'intermediate',
          why: 'Polynomials are fundamental. Understanding degree, terms, and operations is essential.',
          when: 'Use when: working with polynomial expressions, finding degrees, or polynomial operations.',
          where: 'Applied in: algebra problems and equation solving.',
          conditions: [
            'Polynomial: Sum of terms like axⁿ',
            'Degree: Highest power of x',
            'Leading coefficient: Coefficient of highest degree term',
            'Adding: Combine like terms',
            'Multiplying: Distribute each term',
          ],
          examples: [
            {
              question: 'Degree of 3x⁴ − 2x² + 5?',
              solution: 'Degree = 4 (highest power)',
              explanation: 'Find the term with highest exponent.',
            },
            {
              question: 'Add: (2x²+3x−1) + (x²−2x+4)',
              solution: 'Combine like terms: (2x²+x²) + (3x−2x) + (−1+4) = 3x² + x + 3',
              explanation: 'Add coefficients of like terms.',
            },
            {
              question: 'Multiply: (x+2)(x−3)',
              solution: 'x(x−3) + 2(x−3) = x²−3x+2x−6 = x²−x−6',
              explanation: 'Use FOIL or distribute each term.',
            },
          ],
          commonMistakes: [
            'Not combining like terms',
            'Wrong degree calculation',
            'Distribution errors',
          ],
          tips: [
            'Like terms have same variable and exponent',
            'Degree = highest exponent',
            'Distribute carefully in multiplication',
          ],
        },
        {
          id: 'polynomial-division',
          title: 'Polynomial Division',
          level: 'advanced',
          why: 'Polynomial division appears in advanced problems. Understanding it is needed for some solutions.',
          when: 'Use when: dividing polynomials, finding factors, or simplifying rational expressions.',
          where: 'Applied in: advanced algebra problems.',
          conditions: [
            'Long division: Similar to number division',
            'Synthetic division: For dividing by (x−a)',
            'Remainder theorem: f(a) is remainder when dividing by (x−a)',
            'Factor theorem: If f(a)=0, then (x−a) is factor',
          ],
          examples: [
            {
              question: 'Divide x²+5x+6 by x+2',
              solution: 'x²+5x+6 = (x+2)(x+3), so quotient is x+3, remainder 0',
              explanation: 'Factor or use long division. Since it factors, remainder is 0.',
            },
            {
              question: 'If f(x) = x³−2x+1, find f(1)',
              solution: 'f(1) = 1³−2(1)+1 = 1−2+1 = 0',
              explanation: 'By remainder theorem, f(1) is remainder when dividing by (x−1).',
            },
          ],
          commonMistakes: [
            'Long division errors',
            'Not accounting for all terms',
            'Sign errors',
          ],
          tips: [
            'Use long division methodically',
            'Synthetic division faster for (x−a)',
            'Check: (divisor)(quotient) + remainder = dividend',
          ],
        },
        {
          id: 'quadratic-formula',
          title: 'Quadratic Formula',
          level: 'intermediate',
          why: 'Quadratic formula solves any quadratic equation. Essential when factoring is difficult.',
          when: 'Use when: quadratic cannot be easily factored, or when asked to use formula.',
          where: 'Applied in: algebra problems and equation solving.',
          conditions: [
            'For ax²+bx+c=0: x = (−b ± √(b²−4ac)) / 2a',
            'Discriminant: b²−4ac',
            'If discriminant > 0: two real solutions',
            'If discriminant = 0: one solution',
            'If discriminant < 0: no real solutions (complex)',
          ],
          formula: 'x = (−b ± √(b²−4ac)) / 2a',
          examples: [
            {
              question: 'Solve: x²−5x+6=0 using quadratic formula',
              solution: 'a=1, b=−5, c=6 → x = (5 ± √(25−24)) / 2 = (5 ± 1) / 2 → x = 3 or x = 2',
              explanation: 'Substitute into formula, calculate discriminant, solve.',
            },
            {
              question: 'How many solutions: x²+4x+5=0?',
              solution: 'Discriminant: 16−20 = −4 < 0 → No real solutions',
              explanation: 'Negative discriminant means no real solutions.',
            },
          ],
          commonMistakes: [
            'Sign errors with −b',
            'Not calculating discriminant correctly',
            'Forgetting ±',
          ],
          tips: [
            'Memorize formula',
            'Calculate discriminant first',
            'Check: b²−4ac determines number of solutions',
          ],
        },
        {
          id: 'completing-square',
          title: 'Completing the Square',
          level: 'advanced',
          why: 'Completing square is alternative method for solving quadratics. Useful for some problems.',
          when: 'Use when: solving quadratics, finding vertex form, or when quadratic formula is cumbersome.',
          where: 'Applied in: algebra problems and coordinate geometry.',
          conditions: [
            'Goal: Write ax²+bx+c as a(x−h)²+k',
            'Steps: 1) Factor out a, 2) Complete square, 3) Simplify',
            'To complete square: add (b/2)², subtract same',
            'Vertex form: a(x−h)²+k, vertex at (h,k)',
          ],
          examples: [
            {
              question: 'Complete square: x²+6x+5',
              solution: 'x²+6x+5 = (x²+6x+9) + 5−9 = (x+3)² − 4',
              explanation: 'Add (6/2)² = 9, subtract 9 to balance. Perfect square: (x+3)².',
            },
            {
              question: 'Solve by completing square: x²−4x−5=0',
              solution: 'x²−4x = 5 → x²−4x+4 = 5+4 → (x−2)² = 9 → x−2 = ±3 → x = 5 or x = −1',
              explanation: 'Complete square, then take square root of both sides.',
            },
          ],
          commonMistakes: [
            'Not balancing (adding and subtracting same)',
            'Wrong coefficient when a≠1',
            'Sign errors',
          ],
          tips: [
            'Add (b/2)², subtract same to balance',
            'If a≠1, factor out a first',
            'Check: expand to verify',
          ],
        },
        {
          id: 'simultaneous-linear',
          title: 'Simultaneous Linear Equations',
          level: 'intermediate',
          why: 'Systems of equations are common. Multiple methods provide flexibility.',
          when: 'Use when: problems have multiple unknowns with multiple equations.',
          where: 'Applied in: word problems and algebra problems.',
          conditions: [
            'Number of equations should equal number of unknowns',
            'Methods: Substitution, Elimination, Graphing',
            'Consistent: One solution',
            'Inconsistent: No solution (parallel lines)',
            'Dependent: Infinite solutions (same line)',
          ],
          examples: [
            {
              question: 'Solve: 2x+y=7, x−y=2',
              solution: 'Add equations: 3x=9 → x=3 → Substitute: 3−y=2 → y=1',
              explanation: 'Elimination works well here. Add to eliminate y.',
            },
            {
              question: 'How many solutions: 2x+3y=6, 4x+6y=12?',
              solution: 'Second equation is 2×first → Same line → Infinite solutions (dependent)',
              explanation: 'If one equation is multiple of other, same line = infinite solutions.',
            },
          ],
          commonMistakes: [
            'Not checking if system is consistent',
            'Arithmetic errors',
            'Wrong method choice',
          ],
          tips: [
            'Choose method: substitution if variable isolated, elimination if coefficients match',
            'Check solution in both equations',
            'Recognize special cases (no solution, infinite solutions)',
          ],
        },
        {
          id: 'word-problems-age',
          title: 'Age Problems',
          level: 'intermediate',
          why: 'Age problems are common word problems. Systematic approach is essential.',
          when: 'Use when: problems involve ages, time passing, or age relationships.',
          where: 'Applied in: word problems.',
          conditions: [
            'Set up: Current ages, ages in past/future',
            'Key: Age difference is constant',
            'If A is x years older than B now, always x years older',
            'Use variables for unknown ages',
          ],
          examples: [
            {
              question: 'John is 3 times as old as Mary. In 5 years, sum of ages is 50. Current ages?',
              solution: 'Let Mary = x, John = 3x. In 5 years: (x+5)+(3x+5)=50 → 4x+10=50 → x=10. Mary=10, John=30',
              explanation: 'Set up current ages, then future ages equation.',
            },
            {
              question: 'Father is 4 times son\'s age. In 20 years, father twice son\'s age. Current ages?',
              solution: 'Let son=x, father=4x. In 20 years: 4x+20=2(x+20) → 4x+20=2x+40 → 2x=20 → x=10. Son=10, Father=40',
              explanation: 'Set up equation for future relationship.',
            },
          ],
          commonMistakes: [
            'Not accounting for time passing correctly',
            'Confusing current and future ages',
            'Not using age difference property',
          ],
          tips: [
            'Age difference never changes',
            'Set up: current ages, then future/past',
            'Use variables clearly',
          ],
        },
        {
          id: 'word-problems-mixture',
          title: 'Mixture Word Problems',
          level: 'advanced',
          why: 'Mixture problems combine algebra with real-world scenarios. Systematic approach is key.',
          when: 'Use when: problems involve mixing solutions, alloys, or combining quantities.',
          where: 'Applied in: word problems.',
          conditions: [
            'Set up: Amount × Concentration = Pure substance',
            'Total amount before = Total amount after',
            'Pure substance before = Pure substance after',
            'Use table to organize information',
          ],
          examples: [
            {
              question: 'Mix 20L of 30% acid with 30L of 50% acid. Final concentration?',
              solution: 'Acid in first: 20×0.30=6L. Acid in second: 30×0.50=15L. Total acid: 21L, Total solution: 50L. Concentration: 21/50=42%',
              explanation: 'Find pure acid in each, add, divide by total volume.',
            },
            {
              question: 'How much 40% solution to mix with 20L of 60% to get 50%?',
              solution: 'Let x = amount of 40%. Acid: 0.40x + 0.60(20) = 0.50(x+20) → 0.40x+12=0.50x+10 → 2=0.10x → x=20L',
              explanation: 'Set up equation: acid before = acid after.',
            },
          ],
          commonMistakes: [
            'Not setting up equation correctly',
            'Confusing percentages with amounts',
            'Not accounting for total volume',
          ],
          tips: [
            'Use table: Amount × % = Pure',
            'Set up: pure before = pure after',
            'Check total volumes add up',
          ],
        },
        {
          id: 'word-problems-distance',
          title: 'Distance-Rate-Time Problems',
          level: 'intermediate',
          why: 'Distance problems are very common. Understanding the relationship is essential.',
          when: 'Use when: problems involve travel, speed, distance, or time.',
          where: 'Applied in: word problems.',
          conditions: [
            'Distance = Rate × Time',
            'When objects meet: sum of distances = total distance',
            'When one catches up: distances equal',
            'Use d = rt for each object',
          ],
          examples: [
            {
              question: 'Two cars: A at 60 km/h, B at 80 km/h, 200 km apart, opposite directions. When meet?',
              solution: 'Relative speed = 60+80 = 140 km/h. Time = 200/140 = 10/7 hours ≈ 1.43 hours',
              explanation: 'Opposite directions: add speeds. Time = distance / relative speed.',
            },
            {
              question: 'Car A leaves at 9 AM at 50 km/h. Car B leaves same place at 10 AM at 70 km/h. When does B catch A?',
              solution: 'At 10 AM, A has traveled 50 km. Relative speed = 70−50=20 km/h. Time to catch = 50/20 = 2.5 hours. B catches at 12:30 PM',
              explanation: 'Find head start distance, then time to close gap at relative speed.',
            },
          ],
          commonMistakes: [
            'Not accounting for head starts',
            'Wrong relative speed calculation',
            'Time unit errors',
          ],
          tips: [
            'Draw diagram',
            'Opposite directions: add speeds, Same direction: subtract speeds',
            'Check time units',
          ],
        },
        {
          id: 'exponential-equations',
          title: 'Exponential Equations',
          level: 'advanced',
          why: 'Exponential equations appear in growth/decay problems. Solving them requires special techniques.',
          when: 'Use when: solving equations with variables in exponents.',
          where: 'Applied in: algebra problems and growth/decay problems.',
          conditions: [
            'If bases equal, exponents equal: aˣ = aʸ → x = y',
            'Make bases same when possible',
            'Take logarithm of both sides if needed',
            'Check solutions',
          ],
          examples: [
            {
              question: 'Solve: 2ˣ = 16',
              solution: '16 = 2⁴, so 2ˣ = 2⁴ → x = 4',
              explanation: 'Make bases same, then set exponents equal.',
            },
            {
              question: 'Solve: 3ˣ⁺¹ = 27',
              solution: '27 = 3³, so 3ˣ⁺¹ = 3³ → x+1 = 3 → x = 2',
              explanation: 'Express 27 as power of 3, then equate exponents.',
            },
            {
              question: 'Solve: 5ˣ = 25',
              solution: '25 = 5², so 5ˣ = 5² → x = 2',
              explanation: 'Recognize 25 as 5².',
            },
          ],
          commonMistakes: [
            'Not making bases same',
            'Exponent errors',
            'Not checking solutions',
          ],
          tips: [
            'Try to make bases same first',
            'If bases same, exponents equal',
            'Use logarithms if bases cannot be made same',
          ],
        },
        {
          id: 'logarithmic-equations',
          title: 'Logarithmic Equations',
          level: 'advanced',
          why: 'Logarithmic equations require understanding of log properties. Advanced but important.',
          when: 'Use when: solving equations with logarithms.',
          where: 'Applied in: advanced algebra problems.',
          conditions: [
            'If logₐ(x) = logₐ(y), then x = y',
            'logₐ(x) = b means aᵇ = x',
            'Combine logs using properties',
            'Check domain: argument of log must be > 0',
          ],
          examples: [
            {
              question: 'Solve: log₂(x) = 3',
              solution: 'x = 2³ = 8',
              explanation: 'log₂(x) = 3 means 2³ = x.',
            },
            {
              question: 'Solve: log(x) + log(x+3) = 1',
              solution: 'log(x(x+3)) = 1 → x(x+3) = 10 → x²+3x−10=0 → (x+5)(x−2)=0 → x=2 (x=−5 rejected, log of negative undefined)',
              explanation: 'Combine logs, convert to exponential, solve, check domain.',
            },
          ],
          commonMistakes: [
            'Not checking domain',
            'Log property errors',
            'Not converting to exponential form',
          ],
          tips: [
            'Always check domain: argument > 0',
            'Use log properties to combine',
            'Convert log equation to exponential when needed',
          ],
        },
        {
          id: 'inequalities-absolute',
          title: 'Absolute Value Inequalities',
          level: 'advanced',
          why: 'Absolute value inequalities have different rules than equations. Understanding is essential.',
          when: 'Use when: solving inequalities with absolute values.',
          where: 'Applied in: algebra problems.',
          conditions: [
            '|x| < a means −a < x < a',
            '|x| > a means x < −a OR x > a',
            'For |expression| < number: compound inequality',
            'For |expression| > number: two separate inequalities',
          ],
          examples: [
            {
              question: 'Solve: |x−3| < 5',
              solution: '−5 < x−3 < 5 → −2 < x < 8',
              explanation: '|expression| < a means −a < expression < a.',
            },
            {
              question: 'Solve: |2x+1| > 7',
              solution: '2x+1 < −7 OR 2x+1 > 7 → 2x < −8 OR 2x > 6 → x < −4 OR x > 3',
              explanation: '|expression| > a means expression < −a OR expression > a.',
            },
          ],
          commonMistakes: [
            'Reversing inequality signs incorrectly',
            'Not splitting into two cases for >',
            'Confusing < and > rules',
          ],
          tips: [
            '|x| < a: compound inequality (and)',
            '|x| > a: two separate (or)',
            'Check with test values',
          ],
        },
        {
          id: 'variation-direct-inverse',
          title: 'Direct & Inverse Variation',
          level: 'intermediate',
          why: 'Variation problems model real-world relationships. Understanding them helps solve word problems.',
          when: 'Use when: problems state "varies directly" or "varies inversely".',
          where: 'Applied in: word problems.',
          conditions: [
            'Direct: y = kx (y proportional to x)',
            'Inverse: y = k/x (y inversely proportional to x)',
            'Find k from given values, then use to find other values',
          ],
          examples: [
            {
              question: 'y varies directly with x. If y=12 when x=3, find y when x=7',
              solution: 'y = kx → 12 = k(3) → k = 4 → y = 4(7) = 28',
              explanation: 'Find constant k, then use to find y for new x.',
            },
            {
              question: 'y varies inversely with x. If y=8 when x=5, find y when x=10',
              solution: 'y = k/x → 8 = k/5 → k = 40 → y = 40/10 = 4',
              explanation: 'Find k, then use inverse variation formula.',
            },
          ],
          commonMistakes: [
            'Confusing direct and inverse',
            'Wrong formula',
            'Calculation errors',
          ],
          tips: [
            'Direct: y = kx (both increase together)',
            'Inverse: y = k/x (one increases, other decreases)',
            'Find k first, then use formula',
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
        {
          id: 'similar-triangles',
          title: 'Similar Triangles',
          level: 'intermediate',
          why: 'Similar triangles have proportional sides. Essential for solving many geometry problems.',
          when: 'Use when: triangles have same angles, or when ratios of sides are given.',
          where: 'Applied in: geometry problems and real-world applications.',
          conditions: [
            'Similar: Same angles, proportional sides',
            'Ratio of corresponding sides is constant',
            'Ratio of areas = (ratio of sides)²',
            'AA similarity: Two angles equal → triangles similar',
          ],
          formula: 'If triangles similar: a₁/a₂ = b₁/b₂ = c₁/c₂ = k, Area ratio = k²',
          examples: [
            {
              question: 'Triangles similar. Small: sides 3,4,5. Large: corresponding side 9. Find other sides.',
              solution: 'Scale factor = 9/3 = 3 → Other sides: 4×3=12, 5×3=15',
              explanation: 'Find scale factor from one pair, apply to all sides.',
            },
            {
              question: 'Similar triangles: areas 16 and 64. Side ratio?',
              solution: 'Area ratio = 64/16 = 4 → Side ratio = √4 = 2',
              explanation: 'Area ratio = (side ratio)², so side ratio = √(area ratio).',
            },
          ],
          commonMistakes: [
            'Not identifying corresponding sides',
            'Using wrong ratio',
            'Confusing area and side ratios',
          ],
          tips: [
            'Match corresponding angles to find corresponding sides',
            'Area ratio = (side ratio)²',
            'Check: all ratios should be equal',
          ],
        },
        {
          id: 'congruent-triangles',
          title: 'Congruent Triangles',
          level: 'intermediate',
          why: 'Congruent triangles are identical. Understanding congruence criteria is essential.',
          when: 'Use when: triangles are identical in size and shape.',
          where: 'Applied in: geometry proofs and problems.',
          conditions: [
            'Congruent: Same size and shape',
            'SSS: Three sides equal',
            'SAS: Two sides and included angle equal',
            'ASA: Two angles and included side equal',
            'AAS: Two angles and non-included side equal',
          ],
          examples: [
            {
              question: 'Triangles: sides 5,6,7 and 5,6,7. Are they congruent?',
              solution: 'Yes, by SSS (all three sides equal)',
              explanation: 'SSS criterion: if all three sides match, triangles are congruent.',
            },
          ],
          commonMistakes: [
            'Using SSA (not valid)',
            'Not checking included angle',
            'Confusing similar and congruent',
          ],
          tips: [
            'SSS, SAS, ASA, AAS are valid (not SSA)',
            'Congruent = same size, Similar = same shape',
            'Check corresponding parts',
          ],
        },
        {
          id: 'special-triangles',
          title: 'Special Right Triangles',
          level: 'intermediate',
          why: 'Special triangles (30-60-90, 45-45-90) have fixed ratios. Memorizing saves time.',
          when: 'Use when: angles are 30°, 60°, 90° or 45°, 45°, 90°.',
          where: 'Applied in: geometry problems and trigonometry.',
          conditions: [
            '30-60-90: sides in ratio 1 : √3 : 2',
            '45-45-90: sides in ratio 1 : 1 : √2',
            'Shortest side opposite smallest angle',
          ],
          formula: '30-60-90: 1 : √3 : 2   |   45-45-90: 1 : 1 : √2',
          examples: [
            {
              question: '30-60-90 triangle, short side = 5. Find other sides.',
              solution: 'Short: 5, Long leg: 5√3, Hypotenuse: 10',
              explanation: 'Use ratio 1 : √3 : 2. Short side = 5, so multiply ratio by 5.',
            },
            {
              question: '45-45-90 triangle, leg = 6. Find hypotenuse.',
              solution: 'Hypotenuse = 6√2',
              explanation: 'In 45-45-90, hypotenuse = leg × √2.',
            },
          ],
          commonMistakes: [
            'Using wrong ratios',
            'Not identifying triangle type',
            'Confusing which side is which',
          ],
          tips: [
            'Memorize the ratios',
            '30-60-90: 1-√3-2, 45-45-90: 1-1-√2',
            'Shortest side opposite smallest angle',
          ],
        },
        {
          id: 'area-triangle-heron',
          title: 'Triangle Area - Heron\'s Formula',
          level: 'advanced',
          why: 'Heron\'s formula finds area when height is unknown. Useful for advanced problems.',
          when: 'Use when: all three sides known but height not given.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'Heron\'s: s = (a+b+c)/2, Area = √[s(s−a)(s−b)(s−c)]',
            's = semi-perimeter',
            'Works for any triangle',
          ],
          formula: 's = (a+b+c)/2, Area = √[s(s−a)(s−b)(s−c)]',
          examples: [
            {
              question: 'Triangle sides: 5, 6, 7. Find area.',
              solution: 's = (5+6+7)/2 = 9 → Area = √[9(9−5)(9−6)(9−7)] = √[9×4×3×2] = √216 = 6√6',
              explanation: 'Find semi-perimeter, then apply Heron\'s formula.',
            },
          ],
          commonMistakes: [
            'Calculation errors',
            'Not finding semi-perimeter first',
            'Sign errors in subtraction',
          ],
          tips: [
            'Find s first',
            'Check all subtractions',
            'Simplify square root if possible',
          ],
        },
        {
          id: 'parallelogram-area',
          title: 'Parallelogram & Rhombus',
          level: 'intermediate',
          why: 'Parallelograms and rhombuses are common. Understanding properties is essential.',
          when: 'Use when: finding area, perimeter, or working with parallelograms/rhombuses.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'Parallelogram: Area = base × height (height ⟂ to base)',
            'Rhombus: Area = (d₁ × d₂)/2 (diagonals)',
            'Opposite sides parallel and equal',
            'Opposite angles equal',
          ],
          formula: 'Parallelogram: A = bh   |   Rhombus: A = (d₁d₂)/2',
          examples: [
            {
              question: 'Parallelogram: base=10, height=6. Area?',
              solution: 'Area = 10 × 6 = 60',
              explanation: 'Use base × height formula.',
            },
            {
              question: 'Rhombus: diagonals 8 and 6. Area?',
              solution: 'Area = (8 × 6)/2 = 24',
              explanation: 'Use diagonal formula for rhombus.',
            },
          ],
          commonMistakes: [
            'Using wrong height',
            'Confusing formulas',
            'Not using perpendicular height',
          ],
          tips: [
            'Height must be perpendicular to base',
            'Rhombus: use diagonal formula',
            'Check: opposite sides equal',
          ],
        },
        {
          id: 'trapezoid-area',
          title: 'Trapezoid Area',
          level: 'intermediate',
          why: 'Trapezoids appear frequently. Area formula is essential.',
          when: 'Use when: finding area of trapezoid.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'Area = ½(b₁ + b₂)h',
            'b₁, b₂ = lengths of parallel sides (bases)',
            'h = height (perpendicular distance between bases)',
          ],
          formula: 'A = ½(b₁ + b₂)h',
          examples: [
            {
              question: 'Trapezoid: bases 8 and 12, height 5. Area?',
              solution: 'Area = ½(8 + 12) × 5 = ½(20) × 5 = 50',
              explanation: 'Average the bases, multiply by height.',
            },
          ],
          commonMistakes: [
            'Not averaging bases',
            'Using wrong height',
            'Confusing with parallelogram',
          ],
          tips: [
            'Average the two bases first',
            'Height is perpendicular distance',
            'Formula: ½(sum of bases) × height',
          ],
        },
        {
          id: 'circle-arc-chord',
          title: 'Arcs, Chords & Tangents',
          level: 'intermediate',
          why: 'Understanding circle parts expands problem-solving ability.',
          when: 'Use when: working with arcs, chords, or tangents.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'Arc length = (θ/360°) × 2πr',
            'Chord: line segment connecting two points on circle',
            'Tangent: line touching circle at one point, ⟂ to radius at point',
            'Central angle = measure of intercepted arc',
          ],
          formula: 'Arc length = (θ/360°) × 2πr   |   Sector area = (θ/360°) × πr²',
          examples: [
            {
              question: 'Circle radius 10, central angle 60°. Arc length?',
              solution: 'Arc = (60/360) × 2π(10) = (1/6) × 20π = 10π/3',
              explanation: 'Use arc length formula with angle and radius.',
            },
          ],
          commonMistakes: [
            'Not converting degrees to fraction',
            'Confusing arc and chord',
            'Not using correct formula',
          ],
          tips: [
            'Arc length = fraction × circumference',
            'Central angle = arc measure',
            'Tangent ⟂ to radius at point of contact',
          ],
        },
        {
          id: 'inscribed-angles',
          title: 'Inscribed Angles',
          level: 'advanced',
          why: 'Inscribed angles have special properties. Understanding them helps solve circle problems.',
          when: 'Use when: angles are inscribed in circles.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'Inscribed angle = ½ intercepted arc',
            'Angle inscribed in semicircle = 90°',
            'Angles intercepting same arc are equal',
          ],
          formula: 'Inscribed angle = ½(intercepted arc)',
          examples: [
            {
              question: 'Inscribed angle intercepts arc of 100°. Angle measure?',
              solution: 'Angle = ½(100°) = 50°',
              explanation: 'Inscribed angle is half the intercepted arc.',
            },
          ],
          commonMistakes: [
            'Not halving arc measure',
            'Confusing inscribed and central angles',
            'Not identifying intercepted arc',
          ],
          tips: [
            'Inscribed = ½ arc, Central = arc',
            'Angles intercepting same arc are equal',
            'Semicircle → 90° angle',
          ],
        },
        {
          id: 'surface-area-3d',
          title: 'Surface Area of 3D Shapes',
          level: 'advanced',
          why: 'Surface area calculations are needed for many problems.',
          when: 'Use when: finding surface area of 3D shapes.',
          where: 'Applied in: geometry and word problems.',
          conditions: [
            'Box: SA = 2(lw + lh + wh)',
            'Cylinder: SA = 2πr² + 2πrh',
            'Sphere: SA = 4πr²',
            'Cone: SA = πr² + πrl (l = slant height)',
          ],
          formula: 'Box: 2(lw+lh+wh)   |   Cylinder: 2πr²+2πrh   |   Sphere: 4πr²',
          examples: [
            {
              question: 'Cylinder: r=3, h=5. Surface area?',
              solution: 'SA = 2π(3)² + 2π(3)(5) = 18π + 30π = 48π',
              explanation: 'Two circles (2πr²) plus rectangle (2πrh).',
            },
          ],
          commonMistakes: [
            'Forgetting some faces',
            'Not including all parts',
            'Calculation errors',
          ],
          tips: [
            'Count all faces',
            'Cylinder: 2 circles + rectangle',
            'Check units',
          ],
        },
        {
          id: 'volume-ratio',
          title: 'Volume Ratios & Scaling',
          level: 'advanced',
          why: 'Understanding how volume scales helps solve many problems.',
          when: 'Use when: comparing volumes of similar shapes or scaling.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'If linear scale factor = k, volume scale factor = k³',
            'If volumes in ratio 8:1, linear ratio = 2:1 (cube root)',
            'Area scales as k², volume as k³',
          ],
          formula: 'Linear: k, Area: k², Volume: k³',
          examples: [
            {
              question: 'Cube side doubles. Volume increases by?',
              solution: 'Linear factor = 2 → Volume factor = 2³ = 8 → Increases 8 times',
              explanation: 'Volume scales as cube of linear factor.',
            },
          ],
          commonMistakes: [
            'Not cubing linear factor',
            'Confusing area and volume scaling',
            'Calculation errors',
          ],
          tips: [
            'Volume = (linear)³',
            'Area = (linear)²',
            'Check: if side ×2, volume ×8',
          ],
        },
        {
          id: 'coordinate-slope-intercept',
          title: 'Slope-Intercept Form',
          level: 'intermediate',
          why: 'Slope-intercept form is most common. Understanding it is essential.',
          when: 'Use when: writing or interpreting line equations.',
          where: 'Applied in: coordinate geometry.',
          conditions: [
            'y = mx + b',
            'm = slope, b = y-intercept',
            'To graph: plot y-intercept, use slope to find other points',
          ],
          formula: 'y = mx + b (m = slope, b = y-intercept)',
          examples: [
            {
              question: 'Line: slope 2, y-intercept −3. Equation?',
              solution: 'y = 2x − 3',
              explanation: 'Use form y = mx + b with m=2, b=−3.',
            },
            {
              question: 'Graph y = 3x + 1',
              solution: 'Y-intercept: (0,1). Slope 3 means: up 3, right 1. Plot points and draw line.',
              explanation: 'Start at y-intercept, use slope to find other points.',
            },
          ],
          commonMistakes: [
            'Confusing slope and intercept',
            'Sign errors',
            'Not using correct form',
          ],
          tips: [
            'm = slope (rise/run), b = y-intercept',
            'Graph: start at (0,b), use slope',
            'Positive slope: up right, Negative: down right',
          ],
        },
        {
          id: 'coordinate-point-slope',
          title: 'Point-Slope Form',
          level: 'intermediate',
          why: 'Point-slope form is useful when point and slope are known.',
          when: 'Use when: given point and slope, or converting between forms.',
          where: 'Applied in: coordinate geometry.',
          conditions: [
            'y − y₁ = m(x − x₁)',
            '(x₁, y₁) = point on line',
            'm = slope',
          ],
          formula: 'y − y₁ = m(x − x₁)',
          examples: [
            {
              question: 'Line through (2,5) with slope 3. Equation?',
              solution: 'y − 5 = 3(x − 2) → y − 5 = 3x − 6 → y = 3x − 1',
              explanation: 'Use point-slope form, then simplify to slope-intercept.',
            },
          ],
          commonMistakes: [
            'Sign errors with coordinates',
            'Not simplifying',
            'Confusing forms',
          ],
          tips: [
            'Use given point for (x₁, y₁)',
            'Watch signs: y − y₁, x − x₁',
            'Can convert to slope-intercept',
          ],
        },
        {
          id: 'parallel-perpendicular-lines',
          title: 'Parallel & Perpendicular Lines',
          level: 'intermediate',
          why: 'Understanding parallel and perpendicular relationships is essential.',
          when: 'Use when: finding equations of parallel/perpendicular lines.',
          where: 'Applied in: coordinate geometry.',
          conditions: [
            'Parallel: same slope (m₁ = m₂)',
            'Perpendicular: slopes multiply to −1 (m₁ × m₂ = −1)',
            'Perpendicular: m₂ = −1/m₁',
          ],
          formula: 'Parallel: m₁ = m₂   |   Perpendicular: m₁ × m₂ = −1',
          examples: [
            {
              question: 'Line: y = 2x+3. Find parallel line through (1,4).',
              solution: 'Same slope: m = 2 → y − 4 = 2(x − 1) → y = 2x + 2',
              explanation: 'Parallel means same slope. Use point-slope form.',
            },
            {
              question: 'Line: y = 2x+3. Find perpendicular line through (1,4).',
              solution: 'Perpendicular slope: m = −1/2 → y − 4 = −½(x − 1) → y = −½x + 4.5',
              explanation: 'Perpendicular: negative reciprocal slope.',
            },
          ],
          commonMistakes: [
            'Not using negative reciprocal',
            'Confusing parallel and perpendicular',
            'Calculation errors',
          ],
          tips: [
            'Parallel: same slope',
            'Perpendicular: negative reciprocal',
            'Check: perpendicular slopes multiply to −1',
          ],
        },
        {
          id: 'distance-point-line',
          title: 'Distance from Point to Line',
          level: 'advanced',
          why: 'Distance formulas appear in advanced problems.',
          when: 'Use when: finding shortest distance from point to line.',
          where: 'Applied in: coordinate geometry.',
          conditions: [
            'Distance from (x₁,y₁) to line ax+by+c=0: d = |ax₁+by₁+c|/√(a²+b²)',
            'Or: find perpendicular line, find intersection, then distance',
          ],
          formula: 'd = |ax₁+by₁+c|/√(a²+b²)',
          examples: [
            {
              question: 'Distance from (0,0) to line 3x+4y−5=0?',
              solution: 'd = |3(0)+4(0)−5|/√(3²+4²) = |−5|/√25 = 5/5 = 1',
              explanation: 'Use distance formula with line in standard form.',
            },
          ],
          commonMistakes: [
            'Not using absolute value',
            'Wrong formula',
            'Calculation errors',
          ],
          tips: [
            'Use absolute value in numerator',
            'Line must be in ax+by+c=0 form',
            'Check calculation',
          ],
        },
        {
          id: 'transformations',
          title: 'Geometric Transformations',
          level: 'intermediate',
          why: 'Transformations appear in coordinate geometry. Understanding them is useful.',
          when: 'Use when: translating, rotating, reflecting, or dilating shapes.',
          where: 'Applied in: coordinate geometry.',
          conditions: [
            'Translation: (x,y) → (x+h, y+k)',
            'Reflection over x-axis: (x,y) → (x,−y)',
            'Reflection over y-axis: (x,y) → (−x,y)',
            'Dilation: (x,y) → (kx, ky)',
          ],
          examples: [
            {
              question: 'Translate (3,4) by (2,−1)',
              solution: '(3+2, 4+(−1)) = (5, 3)',
              explanation: 'Add translation vector to coordinates.',
            },
            {
              question: 'Reflect (3,4) over x-axis',
              solution: '(3, −4)',
              explanation: 'Reflection over x-axis: change sign of y.',
            },
          ],
          commonMistakes: [
            'Wrong direction for reflection',
            'Not applying transformation correctly',
            'Confusing transformations',
          ],
          tips: [
            'Translation: add vector',
            'Reflection: change sign of coordinate',
            'Dilation: multiply by scale factor',
          ],
        },
        {
          id: 'quadrilateral-properties',
          title: 'Quadrilateral Properties',
          level: 'intermediate',
          why: 'Understanding quadrilateral properties helps solve many problems.',
          when: 'Use when: working with quadrilaterals and their properties.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'Square: all sides equal, all angles 90°',
            'Rectangle: opposite sides equal, all angles 90°',
            'Parallelogram: opposite sides parallel and equal',
            'Rhombus: all sides equal',
            'Trapezoid: one pair parallel sides',
          ],
          examples: [
            {
              question: 'Square: side 5. Area and perimeter?',
              solution: 'Area = 5² = 25, Perimeter = 4×5 = 20',
              explanation: 'Square: all sides equal, all angles 90°.',
            },
          ],
          commonMistakes: [
            'Confusing types',
            'Using wrong formulas',
            'Not identifying properties',
          ],
          tips: [
            'Square = rectangle + rhombus',
            'Check properties systematically',
            'Use appropriate formulas',
          ],
        },
        {
          id: 'circle-equation',
          title: 'Circle Equation',
          level: 'advanced',
          why: 'Circle equations appear in coordinate geometry. Understanding them is essential.',
          when: 'Use when: working with circles in coordinate plane.',
          where: 'Applied in: coordinate geometry.',
          conditions: [
            'Standard form: (x−h)² + (y−k)² = r²',
            'Center: (h,k), Radius: r',
            'General form: x²+y²+Dx+Ey+F=0 (complete square to get standard)',
          ],
          formula: '(x−h)² + (y−k)² = r² (center (h,k), radius r)',
          examples: [
            {
              question: 'Circle: center (2,−3), radius 5. Equation?',
              solution: '(x−2)² + (y+3)² = 25',
              explanation: 'Use standard form with h=2, k=−3, r=5.',
            },
            {
              question: 'Equation: (x+1)² + (y−4)² = 9. Center and radius?',
              solution: 'Center: (−1, 4), Radius: 3',
              explanation: 'Standard form: (x−h)² + (y−k)² = r². Note: (x+1) = (x−(−1)).',
            },
          ],
          commonMistakes: [
            'Sign errors with center',
            'Not identifying radius correctly',
            'Confusing forms',
          ],
          tips: [
            'Center: (h,k) from (x−h)² + (y−k)²',
            'Watch signs: (x+1) means h = −1',
            'Radius = √(r²)',
          ],
        },
        {
          id: 'triangle-inequality',
          title: 'Triangle Inequality Theorem',
          level: 'intermediate',
          why: 'Triangle inequality determines if sides can form triangle. Essential property.',
          when: 'Use when: checking if three sides can form triangle.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'For sides a, b, c: a + b > c, a + c > b, b + c > a',
            'All three inequalities must hold',
            'Sum of any two sides > third side',
          ],
          examples: [
            {
              question: 'Can sides 5, 7, 12 form triangle?',
              solution: 'Check: 5+7=12, NOT > 12 → Cannot form triangle',
              explanation: 'Sum of two sides must be STRICTLY greater than third.',
            },
            {
              question: 'Can sides 6, 8, 10 form triangle?',
              solution: 'Check: 6+8=14>10 ✓, 6+10=16>8 ✓, 8+10=18>6 ✓ → Yes, can form triangle',
              explanation: 'All three inequalities must be satisfied.',
            },
          ],
          commonMistakes: [
            'Using ≥ instead of >',
            'Not checking all three',
            'Calculation errors',
          ],
          tips: [
            'Must be >, not ≥',
            'Check all three combinations',
            'If one fails, cannot form triangle',
          ],
        },
        {
          id: 'angle-bisector',
          title: 'Angle Bisector & Median',
          level: 'advanced',
          why: 'Special lines in triangles have properties. Understanding them helps solve problems.',
          when: 'Use when: working with angle bisectors, medians, or altitudes.',
          where: 'Applied in: geometry problems.',
          conditions: [
            'Angle bisector: divides angle in half',
            'Median: from vertex to midpoint of opposite side',
            'Altitude: from vertex ⟂ to opposite side',
            'All three meet at special points',
          ],
          examples: [
            {
              question: 'Triangle: angle 60°. Angle bisector divides into?',
              solution: 'Two 30° angles',
              explanation: 'Angle bisector divides angle into two equal parts.',
            },
          ],
          commonMistakes: [
            'Confusing types of lines',
            'Not using properties correctly',
            'Calculation errors',
          ],
          tips: [
            'Bisector: divides angle',
            'Median: to midpoint',
            'Altitude: perpendicular',
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
        {
          id: 'percentage-increase-decrease',
          title: 'Percentage Increase & Decrease',
          level: 'beginner',
          why: 'Calculating percentage changes is fundamental. Mastery prevents errors.',
          when: 'Use when: finding how much something increased or decreased.',
          where: 'Applied in: all percentage problems.',
          conditions: [
            '% increase = [(New−Old)/Old] × 100%',
            '% decrease = [(Old−New)/Old] × 100%',
            'Always use original (old) as base',
          ],
          formula: '% change = [(New−Old)/Old] × 100%',
          examples: [
            {
              question: 'Price: Rs. 100 → Rs. 120. % increase?',
              solution: '% increase = [(120−100)/100] × 100% = 20%',
              explanation: 'Use old value (100) as base for percentage.',
            },
          ],
          commonMistakes: [
            'Using wrong base',
            'Confusing increase and decrease',
            'Sign errors',
          ],
          tips: [
            'Always use original as denominator',
            'Positive = increase, Negative = decrease',
            'Check: does answer make sense?',
          ],
        },
        {
          id: 'successive-percentages',
          title: 'Successive Percentage Changes',
          level: 'intermediate',
          why: 'Multiple percentage changes require careful calculation. Common trap area.',
          when: 'Use when: multiple percentage changes occur in sequence.',
          where: 'Applied in: price problems, investment problems.',
          conditions: [
            'Apply each change to the NEW value, not original',
            'Use multiplier method: multiply by (1 ± %) for each change',
            'Final = Original × (1 ± %₁) × (1 ± %₂) × ...',
          ],
          examples: [
            {
              question: 'Price: 100, increase 20%, then decrease 15%. Final?',
              solution: '100 × 1.20 × 0.85 = 102 → 2% increase overall',
              explanation: 'Apply each change sequentially using multipliers.',
            },
          ],
          commonMistakes: [
            'Adding percentages',
            'Applying to original each time',
            'Not using multipliers',
          ],
          tips: [
            'Use multiplier method',
            'Each change applies to new value',
            'Don\'t add percentages',
          ],
        },
        {
          id: 'percentage-of-percentage',
          title: 'Percentage of a Percentage',
          level: 'intermediate',
          why: 'Understanding nested percentages prevents calculation errors.',
          when: 'Use when: calculating percentage of another percentage.',
          where: 'Applied in: complex percentage problems.',
          conditions: [
            'a% of b% = (a/100) × (b/100) = (a×b)/10000',
            'Convert to decimals, multiply, convert back',
          ],
          examples: [
            {
              question: 'What is 20% of 30%?',
              solution: '20% of 30% = 0.20 × 0.30 = 0.06 = 6%',
              explanation: 'Convert to decimals, multiply, convert back to percentage.',
            },
          ],
          commonMistakes: [
            'Multiplying percentages directly',
            'Not converting properly',
            'Calculation errors',
          ],
          tips: [
            'Convert to decimals first',
            'Multiply decimals',
            'Convert back to percentage',
          ],
        },
        {
          id: 'base-percentage',
          title: 'Finding Base from Percentage',
          level: 'intermediate',
          why: 'Reversing percentage calculations is common. Essential skill.',
          when: 'Use when: given percentage and result, find original.',
          where: 'Applied in: all percentage problems.',
          conditions: [
            'If x is p% of base: Base = x / (p/100) = x × 100/p',
            'If result after p% increase: Base = Result / (1 + p/100)',
            'If result after p% decrease: Base = Result / (1 − p/100)',
          ],
          examples: [
            {
              question: '30 is 25% of what number?',
              solution: 'Base = 30 / 0.25 = 120',
              explanation: 'Divide by percentage as decimal.',
            },
          ],
          commonMistakes: [
            'Multiplying instead of dividing',
            'Using wrong formula',
            'Not converting percentage',
          ],
          tips: [
            'To find base: divide by percentage',
            'Check: does answer make sense?',
            'Use reverse of percentage formula',
          ],
        },
        {
          id: 'percentage-points',
          title: 'Percentage Points vs Percentages',
          level: 'advanced',
          why: 'Distinguishing percentage points from percentages prevents errors.',
          when: 'Use when: comparing percentage changes or differences.',
          where: 'Applied in: data interpretation and statistics.',
          conditions: [
            'Percentage point: absolute difference (e.g., 5% to 7% = 2 percentage points)',
            'Percentage change: relative change (e.g., 5% to 7% = 40% increase)',
            'Don\'t confuse the two',
          ],
          examples: [
            {
              question: 'Rate: 10% → 15%. Change in percentage points? Percentage change?',
              solution: 'Percentage points: 15−10 = 5 points. Percentage change: (15−10)/10 = 50% increase',
              explanation: 'Points = absolute difference, Change = relative difference.',
            },
          ],
          commonMistakes: [
            'Confusing points and percentage',
            'Using wrong calculation',
            'Not distinguishing',
          ],
          tips: [
            'Points = absolute difference',
            'Percentage = relative change',
            'Be careful with wording',
          ],
        },
        {
          id: 'discount-markup',
          title: 'Discount & Markup',
          level: 'intermediate',
          why: 'Discount and markup problems are very common. Essential to master.',
          when: 'Use when: calculating discounts, markups, or final prices.',
          where: 'Applied in: word problems and business scenarios.',
          conditions: [
            'Discount: reduction from original price',
            'Markup: increase from cost price',
            'Sale price = Original × (1 − discount%)',
            'Selling price = Cost × (1 + markup%)',
          ],
          examples: [
            {
              question: 'Item: Rs. 500, 20% discount. Sale price?',
              solution: 'Sale price = 500 × (1 − 0.20) = 500 × 0.80 = Rs. 400',
              explanation: 'Apply discount as multiplier.',
            },
          ],
          commonMistakes: [
            'Confusing discount and markup',
            'Using wrong base',
            'Calculation errors',
          ],
          tips: [
            'Discount: reduce from original',
            'Markup: increase from cost',
            'Use multiplier method',
          ],
        },
        {
          id: 'tax-tip',
          title: 'Tax & Tip Calculations',
          level: 'beginner',
          why: 'Tax and tip calculations are practical applications of percentages.',
          when: 'Use when: calculating taxes, tips, or service charges.',
          where: 'Applied in: real-world problems.',
          conditions: [
            'Tax = Price × (tax rate)',
            'Tip = Bill × (tip rate)',
            'Total = Original + Tax + Tip',
            'Or: Total = Original × (1 + tax% + tip%)',
          ],
          examples: [
            {
              question: 'Bill: Rs. 200, 10% tax, 15% tip. Total?',
              solution: 'Tax = 200 × 0.10 = 20, Tip = 200 × 0.15 = 30, Total = 200 + 20 + 30 = 250',
              explanation: 'Calculate each separately, then add.',
            },
          ],
          commonMistakes: [
            'Adding percentages incorrectly',
            'Using wrong base',
            'Calculation errors',
          ],
          tips: [
            'Calculate each separately',
            'Or use: Total = Original × (1 + sum of rates)',
            'Check: does total make sense?',
          ],
        },
        {
          id: 'population-growth',
          title: 'Population Growth & Decay',
          level: 'advanced',
          why: 'Exponential growth/decay uses percentages. Important for advanced problems.',
          when: 'Use when: calculating population growth, decay, or exponential change.',
          where: 'Applied in: growth problems and real-world applications.',
          conditions: [
            'Exponential growth: P = P₀(1 + r)ᵗ',
            'Exponential decay: P = P₀(1 − r)ᵗ',
            'r = growth/decay rate, t = time',
          ],
          formula: 'Growth: P = P₀(1+r)ᵗ   |   Decay: P = P₀(1−r)ᵗ',
          examples: [
            {
              question: 'Population: 10,000, grows 5% annually. After 3 years?',
              solution: 'P = 10,000(1.05)³ = 10,000 × 1.157625 = 11,576.25 ≈ 11,576',
              explanation: 'Use exponential growth formula.',
            },
          ],
          commonMistakes: [
            'Not using exponential formula',
            'Calculation errors',
            'Not converting percentage',
          ],
          tips: [
            'Use exponential formula for growth/decay',
            'Convert percentage to decimal',
            'Check calculation',
          ],
        },
        {
          id: 'weighted-average-percent',
          title: 'Weighted Average with Percentages',
          level: 'advanced',
          why: 'Weighted averages appear in many problems. Understanding percentages in context is key.',
          when: 'Use when: calculating averages where different items have different weights.',
          where: 'Applied in: statistics and data problems.',
          conditions: [
            'Weighted average = Σ(weight × value) / Σ(weights)',
            'Or: (w₁×v₁ + w₂×v₂ + ...) / (w₁ + w₂ + ...)',
          ],
          examples: [
            {
              question: 'Test 1 (30%): 80, Test 2 (40%): 90, Test 3 (30%): 85. Final grade?',
              solution: 'Weighted = (0.30×80 + 0.40×90 + 0.30×85) / 1.0 = (24 + 36 + 25.5) = 85.5',
              explanation: 'Multiply each score by its weight, sum, divide by total weight.',
            },
          ],
          commonMistakes: [
            'Not using weights correctly',
            'Averaging percentages incorrectly',
            'Calculation errors',
          ],
          tips: [
            'Multiply value by weight',
            'Sum all, divide by sum of weights',
            'Check: weights should sum to 1 (or 100%)',
          ],
        },
        {
          id: 'percentage-error',
          title: 'Percentage Error',
          level: 'intermediate',
          why: 'Percentage error calculations appear in measurement problems.',
          when: 'Use when: comparing measured value to actual value.',
          where: 'Applied in: measurement and accuracy problems.',
          conditions: [
            '% error = |Measured − Actual| / Actual × 100%',
            'Always use absolute value',
            'Use actual as denominator',
          ],
          formula: '% error = |Measured − Actual| / Actual × 100%',
          examples: [
            {
              question: 'Measured: 48, Actual: 50. % error?',
              solution: '% error = |48−50| / 50 × 100% = 2/50 × 100% = 4%',
              explanation: 'Use absolute difference, divide by actual, convert to percentage.',
            },
          ],
          commonMistakes: [
            'Not using absolute value',
            'Using wrong denominator',
            'Sign errors',
          ],
          tips: [
            'Always use absolute value',
            'Actual value is denominator',
            'Check: error should be positive',
          ],
        },
        {
          id: 'fraction-to-percent',
          title: 'Converting Fractions to Percentages',
          level: 'beginner',
          why: 'Converting between fractions and percentages is fundamental.',
          when: 'Use when: converting fractions to percentages or vice versa.',
          where: 'Applied in: all percentage and fraction problems.',
          conditions: [
            'Fraction to %: divide numerator by denominator, multiply by 100',
            '% to fraction: write % over 100, simplify',
            'Common: 1/2=50%, 1/4=25%, 3/4=75%, 1/5=20%, etc.',
          ],
          examples: [
            {
              question: 'Convert 3/8 to percentage',
              solution: '3/8 = 0.375 = 37.5%',
              explanation: 'Divide 3 by 8, multiply by 100.',
            },
          ],
          commonMistakes: [
            'Not multiplying by 100',
            'Calculation errors',
            'Not simplifying',
          ],
          tips: [
            'Divide, then multiply by 100',
            'Memorize common conversions',
            'Check: does answer make sense?',
          ],
        },
        {
          id: 'decimal-to-percent',
          title: 'Converting Decimals to Percentages',
          level: 'beginner',
          why: 'Decimal-percentage conversion is basic but essential.',
          when: 'Use when: converting between decimals and percentages.',
          where: 'Applied in: all percentage problems.',
          conditions: [
            'Decimal to %: multiply by 100, add % sign',
            '% to decimal: divide by 100, remove % sign',
            '0.25 = 25%, 0.5 = 50%, 1.0 = 100%',
          ],
          examples: [
            {
              question: 'Convert 0.125 to percentage',
              solution: '0.125 × 100 = 12.5%',
              explanation: 'Multiply by 100, add percentage sign.',
            },
          ],
          commonMistakes: [
            'Forgetting to multiply by 100',
            'Decimal point errors',
            'Sign errors',
          ],
          tips: [
            'Multiply by 100 to convert to %',
            'Move decimal point 2 places right',
            'Check: 1.0 = 100%',
          ],
        },
        {
          id: 'percentage-comparison',
          title: 'Comparing Percentages',
          level: 'intermediate',
          why: 'Comparing percentages correctly is essential for data interpretation.',
          when: 'Use when: comparing two or more percentages.',
          where: 'Applied in: data interpretation and statistics.',
          conditions: [
            'Compare percentages directly if same base',
            'If different bases, convert to actual values first',
            'Percentage of percentage: multiply, don\'t add',
          ],
          examples: [
            {
              question: 'Group A: 40% pass, Group B: 50% pass. Which better?',
              solution: 'If same size groups: B better (50% > 40%). If different sizes, need actual numbers.',
              explanation: 'Direct comparison only if same base. Otherwise convert to actual values.',
            },
          ],
          commonMistakes: [
            'Comparing percentages of different bases',
            'Not converting to actual values',
            'Calculation errors',
          ],
          tips: [
            'Same base: compare directly',
            'Different bases: convert to actual values',
            'Be careful with wording',
          ],
        },
        {
          id: 'percentage-proportion',
          title: 'Percentage as Proportion',
          level: 'beginner',
          why: 'Understanding percentage as proportion helps solve many problems.',
          when: 'Use when: working with percentages as parts of whole.',
          where: 'Applied in: all percentage problems.',
          conditions: [
            'Percentage = part / whole × 100%',
            'Part = percentage × whole / 100',
            'Whole = part × 100 / percentage',
          ],
          formula: 'Part = (Percentage/100) × Whole   |   Whole = Part / (Percentage/100)',
          examples: [
            {
              question: '30% of 200 = ?',
              solution: '30% of 200 = 0.30 × 200 = 60',
              explanation: 'Convert percentage to decimal, multiply by whole.',
            },
          ],
          commonMistakes: [
            'Not converting percentage',
            'Using wrong formula',
            'Calculation errors',
          ],
          tips: [
            'Percentage = part/whole × 100',
            'Part = % × whole / 100',
            'Convert % to decimal first',
          ],
        },
        {
          id: 'effective-rate',
          title: 'Effective Interest Rate',
          level: 'advanced',
          why: 'Effective rate accounts for compounding. Important for financial problems.',
          when: 'Use when: comparing different compounding frequencies.',
          where: 'Applied in: financial and investment problems.',
          conditions: [
            'Effective rate = (1 + r/n)ⁿ − 1',
            'r = nominal rate, n = compounding periods per year',
            'Higher n → higher effective rate',
          ],
          formula: 'Effective rate = (1 + r/n)ⁿ − 1',
          examples: [
            {
              question: '10% annual, compounded quarterly. Effective rate?',
              solution: 'Effective = (1 + 0.10/4)⁴ − 1 = (1.025)⁴ − 1 ≈ 0.1038 = 10.38%',
              explanation: 'Use formula with n=4 (quarterly).',
            },
          ],
          commonMistakes: [
            'Not using correct formula',
            'Calculation errors',
            'Confusing nominal and effective',
          ],
          tips: [
            'Effective rate > nominal rate (with compounding)',
            'More frequent compounding = higher effective rate',
            'Use formula carefully',
          ],
        },
        {
          id: 'percentage-break-even',
          title: 'Break-Even Percentage',
          level: 'advanced',
          why: 'Break-even analysis uses percentages. Important for business problems.',
          when: 'Use when: finding break-even point or required percentage.',
          where: 'Applied in: business and economics problems.',
          conditions: [
            'Break-even: Revenue = Cost',
            'Required % = (Target / Base) × 100%',
            'Set up equation and solve',
          ],
          examples: [
            {
              question: 'Cost: 100, need profit 20. What % markup?',
              solution: 'Selling = 120, Markup % = (120−100)/100 × 100% = 20%',
              explanation: 'Calculate selling price, then markup percentage.',
            },
          ],
          commonMistakes: [
            'Not setting up equation',
            'Using wrong base',
            'Calculation errors',
          ],
          tips: [
            'Set up: Revenue = Cost + Profit',
            'Use appropriate base for percentage',
            'Check answer',
          ],
        },
        {
          id: 'percentage-allocation',
          title: 'Percentage Allocation',
          level: 'intermediate',
          why: 'Allocating amounts by percentage is common in word problems.',
          when: 'Use when: dividing amounts according to percentages.',
          where: 'Applied in: distribution and allocation problems.',
          conditions: [
            'Each part = (its percentage / 100) × total',
            'Percentages should sum to 100%',
            'Check: parts should sum to total',
          ],
          examples: [
            {
              question: 'Budget: 1000. Allocate: 40% A, 35% B, 25% C.',
              solution: 'A = 0.40 × 1000 = 400, B = 0.35 × 1000 = 350, C = 0.25 × 1000 = 250. Check: 400+350+250=1000 ✓',
              explanation: 'Calculate each allocation, verify sum equals total.',
            },
          ],
          commonMistakes: [
            'Not checking sum',
            'Calculation errors',
            'Using wrong percentages',
          ],
          tips: [
            'Calculate each part separately',
            'Verify percentages sum to 100%',
            'Check: parts sum to total',
          ],
        },
        {
          id: 'percentage-ratio-relationship',
          title: 'Percentage & Ratio Relationship',
          level: 'intermediate',
          why: 'Understanding relationship between percentages and ratios helps solve problems.',
          when: 'Use when: converting between percentages and ratios.',
          where: 'Applied in: problems involving both percentages and ratios.',
          conditions: [
            'Ratio a:b means a/(a+b) and b/(a+b) as percentages',
            'Percentage can be written as ratio',
            'Convert appropriately for problem',
          ],
          examples: [
            {
              question: 'Ratio 3:2. What percentages?',
              solution: 'Total parts = 5. First: 3/5 = 60%, Second: 2/5 = 40%',
              explanation: 'Convert ratio parts to fractions, then to percentages.',
            },
          ],
          commonMistakes: [
            'Not finding total parts',
            'Calculation errors',
            'Confusing ratio and percentage',
          ],
          tips: [
            'Ratio → find total parts → convert to percentage',
            'Percentage → convert to fraction → ratio',
            'Check: percentages should sum to 100%',
          ],
        },
        {
          id: 'percentage-approximation',
          title: 'Percentage Approximation',
          level: 'intermediate',
          why: 'Quick percentage approximations save time on tests.',
          when: 'Use when: exact calculation is time-consuming or for estimation.',
          where: 'Applied in: all percentage problems when speed matters.',
          conditions: [
            'Use benchmarks: 10%, 25%, 50%, 75%',
            'Round numbers for easier calculation',
            'Accept small error for speed',
          ],
          examples: [
            {
              question: 'Approximate: 23% of 487',
              solution: '≈ 25% of 500 = 125 (actual: 112.01, close enough)',
              explanation: 'Round to nearby benchmark for quick estimate.',
            },
          ],
          commonMistakes: [
            'Too much rounding',
            'Not checking reasonableness',
            'Using wrong benchmark',
          ],
          tips: [
            'Use 10%, 25%, 50% as benchmarks',
            'Round to make calculation easier',
            'Check: is estimate reasonable?',
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
        {
          id: 'ratio-simplification',
          title: 'Simplifying Ratios',
          level: 'beginner',
          why: 'Simplifying ratios makes problems easier and answers clearer.',
          when: 'Use when: ratios have common factors or need to be in simplest form.',
          where: 'Applied in: all ratio problems.',
          conditions: [
            'Divide all parts by their GCD',
            'Ratio should be in lowest terms',
            'Keep same relationship',
          ],
          examples: [
            {
              question: 'Simplify ratio 12:18:24',
              solution: 'GCD of 12, 18, 24 = 6 → 12:18:24 = 2:3:4',
              explanation: 'Find GCD, divide all parts by it.',
            },
          ],
          commonMistakes: [
            'Not finding GCD correctly',
            'Not dividing all parts',
            'Calculation errors',
          ],
          tips: [
            'Find GCD of all parts',
            'Divide each part by GCD',
            'Check: no common factor remains',
          ],
        },
        {
          id: 'ratio-equivalent',
          title: 'Equivalent Ratios',
          level: 'beginner',
          why: 'Understanding equivalent ratios helps solve proportion problems.',
          when: 'Use when: checking if ratios are equal or finding equivalent ratios.',
          where: 'Applied in: proportion and ratio problems.',
          conditions: [
            'Ratios equivalent if cross products equal',
            'a:b = c:d if ad = bc',
            'Multiply/divide all parts by same number',
          ],
          examples: [
            {
              question: 'Are 3:4 and 6:8 equivalent?',
              solution: 'Check: 3×8 = 24, 4×6 = 24 → Yes, equivalent',
              explanation: 'Cross products equal means ratios equivalent.',
            },
          ],
          commonMistakes: [
            'Not checking cross products',
            'Confusing with equality',
            'Calculation errors',
          ],
          tips: [
            'Use cross multiplication',
            'Equivalent = same relationship',
            'Can multiply/divide by same number',
          ],
        },
        {
          id: 'ratio-three-quantities',
          title: 'Ratios with Three Quantities',
          level: 'intermediate',
          why: 'Many problems involve three or more quantities in ratio.',
          when: 'Use when: dividing among three or more parties or comparing multiple quantities.',
          where: 'Applied in: distribution and comparison problems.',
          conditions: [
            'Ratio a:b:c means a parts, b parts, c parts',
            'Total parts = a + b + c',
            'Each share = (its part / total parts) × total',
          ],
          examples: [
            {
              question: 'Divide 360 in ratio 2:3:4',
              solution: 'Total parts = 9 → First: (2/9)×360 = 80, Second: (3/9)×360 = 120, Third: (4/9)×360 = 160',
              explanation: 'Find total parts, then each share.',
            },
          ],
          commonMistakes: [
            'Not finding total parts',
            'Calculation errors',
            'Not checking sum',
          ],
          tips: [
            'Sum all ratio parts first',
            'Calculate each share separately',
            'Verify: shares sum to total',
          ],
        },
        {
          id: 'ratio-change',
          title: 'Changing Ratios',
          level: 'advanced',
          why: 'Problems often involve ratios that change. Understanding how to handle this is key.',
          when: 'Use when: ratios change due to addition, removal, or other operations.',
          where: 'Applied in: word problems with changing ratios.',
          conditions: [
            'Set up algebra with ratio parts',
            'Track changes step by step',
            'Set up equation from new ratio',
          ],
          examples: [
            {
              question: 'Ratio A:B = 3:5. Add 10 to A, ratio becomes 2:3. Original A?',
              solution: 'Let A=3x, B=5x → (3x+10):5x = 2:3 → 3(3x+10) = 2(5x) → 9x+30=10x → x=30 → A=90',
              explanation: 'Set up with ratio parts, use new ratio to form equation.',
            },
          ],
          commonMistakes: [
            'Not setting up algebra',
            'Wrong equation setup',
            'Calculation errors',
          ],
          tips: [
            'Use variables for ratio parts',
            'Set up equation from new ratio',
            'Solve systematically',
          ],
        },
        {
          id: 'ratio-percentage',
          title: 'Ratio to Percentage Conversion',
          level: 'intermediate',
          why: 'Converting ratios to percentages is common in problems.',
          when: 'Use when: need to express ratio parts as percentages.',
          where: 'Applied in: problems involving both ratios and percentages.',
          conditions: [
            'Ratio a:b → a/(a+b) and b/(a+b) as percentages',
            'Convert each part to percentage',
            'Percentages sum to 100%',
          ],
          examples: [
            {
              question: 'Ratio 3:7. What percentages?',
              solution: 'Total = 10 → First: 3/10 = 30%, Second: 7/10 = 70%',
              explanation: 'Find total parts, convert each to percentage.',
            },
          ],
          commonMistakes: [
            'Not finding total',
            'Calculation errors',
            'Not checking sum',
          ],
          tips: [
            'Total parts = sum of ratio',
            'Each part / total = percentage',
            'Check: sum = 100%',
          ],
        },
        {
          id: 'inverse-ratio',
          title: 'Inverse Ratios',
          level: 'advanced',
          why: 'Inverse ratios appear in some problems. Understanding them expands capability.',
          when: 'Use when: relationship is inverse (more of one means less of other).',
          where: 'Applied in: inverse variation and some word problems.',
          conditions: [
            'If a:b is direct ratio, b:a is inverse',
            'Inverse: as one increases, other decreases',
            'Product remains constant',
          ],
          examples: [
            {
              question: 'Time and speed inversely related. Ratio 2:3. Inverse ratio?',
              solution: 'Inverse = 3:2',
              explanation: 'Swap the ratio parts.',
            },
          ],
          commonMistakes: [
            'Not understanding inverse',
            'Confusing with direct',
            'Calculation errors',
          ],
          tips: [
            'Inverse = swap ratio parts',
            'Inverse: one up, other down',
            'Product constant',
          ],
        },
        {
          id: 'ratio-word-problems',
          title: 'Ratio Word Problems',
          level: 'intermediate',
          why: 'Most ratio problems are word problems. Translation skills are essential.',
          when: 'Use when: word problems mention ratios or comparisons.',
          where: 'Applied in: all word problems involving ratios.',
          conditions: [
            'Identify quantities being compared',
            'Set up ratio from words',
            'Use ratio to solve',
          ],
          examples: [
            {
              question: 'A is twice B, B is three times C. Ratio A:B:C?',
              solution: 'Let C = x, then B = 3x, A = 2(3x) = 6x → Ratio = 6:3:1',
              explanation: 'Assign variable to smallest, work up, then form ratio.',
            },
          ],
          commonMistakes: [
            'Not translating correctly',
            'Wrong order in ratio',
            'Not checking answer',
          ],
          tips: [
            'Read carefully',
            'Assign variable to smallest',
            'Work up to others',
          ],
        },
        {
          id: 'ratio-scaling',
          title: 'Ratio Scaling',
          level: 'intermediate',
          why: 'Scaling ratios is common in problems.',
          when: 'Use when: need to scale ratio up or down.',
          where: 'Applied in: scaling and proportion problems.',
          conditions: [
            'Multiply all parts by same number',
            'Ratio relationship unchanged',
            'Use to match given total',
          ],
          examples: [
            {
              question: 'Ratio 2:3, need total 50. Scale ratio.',
              solution: 'Total parts = 5, need 50 → Scale factor = 10 → Ratio becomes 20:30',
              explanation: 'Find scale factor to match total, multiply all parts.',
            },
          ],
          commonMistakes: [
            'Not finding scale factor',
            'Not multiplying all parts',
            'Calculation errors',
          ],
          tips: [
            'Find scale factor = desired total / current total',
            'Multiply all parts',
            'Check: new total correct',
          ],
        },
        {
          id: 'ratio-comparison',
          title: 'Comparing Ratios',
          level: 'intermediate',
          why: 'Comparing ratios helps in quantitative comparison and problem solving.',
          when: 'Use when: need to determine which ratio is larger.',
          where: 'Applied in: quantitative comparisons and ratio problems.',
          conditions: [
            'Convert to decimals or fractions',
            'Or use cross multiplication',
            'Compare the values',
          ],
          examples: [
            {
              question: 'Compare 3:5 and 2:3',
              solution: '3/5 = 0.6, 2/3 ≈ 0.667 → 2:3 is larger',
              explanation: 'Convert to decimals and compare.',
            },
          ],
          commonMistakes: [
            'Comparing wrong way',
            'Calculation errors',
            'Not converting properly',
          ],
          tips: [
            'Convert to same form',
            'Compare as fractions or decimals',
            'Check answer',
          ],
        },
        {
          id: 'ratio-proportion-word',
          title: 'Proportion Word Problems',
          level: 'intermediate',
          why: 'Proportion word problems are very common. Mastery is essential.',
          when: 'Use when: word problems involve proportional relationships.',
          where: 'Applied in: all word problems with proportions.',
          conditions: [
            'Set up proportion: a/b = c/d',
            'Same units on same side',
            'Cross multiply to solve',
          ],
          examples: [
            {
              question: '5 workers in 8 days. How many workers for 4 days?',
              solution: 'Inverse proportion: 5 × 8 = x × 4 → 40 = 4x → x = 10 workers',
              explanation: 'More days = fewer workers (inverse). Use product constant.',
            },
          ],
          commonMistakes: [
            'Not identifying direct vs inverse',
            'Wrong proportion setup',
            'Calculation errors',
          ],
          tips: [
            'Direct: both increase together',
            'Inverse: one up, other down',
            'Set up correctly',
          ],
        },
        {
          id: 'ratio-continued',
          title: 'Continued Ratios',
          level: 'advanced',
          why: 'Continued ratios link multiple relationships. Advanced but useful.',
          when: 'Use when: multiple ratios are connected.',
          where: 'Applied in: complex ratio problems.',
          conditions: [
            'Link ratios through common quantity',
            'Find equivalent ratios',
            'Combine into single ratio',
          ],
          examples: [
            {
              question: 'A:B = 2:3, B:C = 4:5. Find A:B:C',
              solution: 'Make B same: A:B = 8:12, B:C = 12:15 → A:B:C = 8:12:15',
              explanation: 'Find LCM of B values, scale ratios, combine.',
            },
          ],
          commonMistakes: [
            'Not making common quantity same',
            'Calculation errors',
            'Not combining correctly',
          ],
          tips: [
            'Make common quantity same',
            'Scale ratios appropriately',
            'Combine into single ratio',
          ],
        },
        {
          id: 'ratio-part-whole',
          title: 'Part-to-Whole Ratios',
          level: 'beginner',
          why: 'Understanding part-to-whole relationships is fundamental.',
          when: 'Use when: expressing part as ratio of whole.',
          where: 'Applied in: all ratio problems.',
          conditions: [
            'Part:Whole ratio',
            'Can convert to percentage',
            'Part + Other parts = Whole',
          ],
          examples: [
            {
              question: 'In ratio 2:5, what is part-to-whole?',
              solution: 'Part = 2, Whole = 2+5 = 7 → Part:Whole = 2:7',
              explanation: 'Whole is sum of all parts.',
            },
          ],
          commonMistakes: [
            'Not finding whole',
            'Confusing part and whole',
            'Calculation errors',
          ],
          tips: [
            'Whole = sum of all parts',
            'Part:Whole ratio',
            'Can convert to fraction/percentage',
          ],
        },
        {
          id: 'ratio-golden',
          title: 'Golden Ratio & Special Ratios',
          level: 'advanced',
          why: 'Some special ratios appear in problems. Recognition helps.',
          when: 'Use when: encountering special ratios like golden ratio.',
          where: 'Applied in: advanced problems.',
          conditions: [
            'Golden ratio ≈ 1.618:1',
            'Recognize common ratios: 1:1, 2:1, 3:2, etc.',
            'Use properties if known',
          ],
          examples: [
            {
              question: 'Rectangle in golden ratio (long:short). If short=10, long?',
              solution: 'Long = 10 × 1.618 ≈ 16.18',
              explanation: 'Use golden ratio approximation.',
            },
          ],
          commonMistakes: [
            'Not recognizing special ratios',
            'Calculation errors',
            'Using wrong value',
          ],
          tips: [
            'Memorize common ratios',
            'Golden ratio ≈ 1.618',
            'Use when recognized',
          ],
        },
        {
          id: 'ratio-unitary-method',
          title: 'Unitary Method with Ratios',
          level: 'intermediate',
          why: 'Unitary method uses ratios effectively. Common technique.',
          when: 'Use when: finding value of one unit, then scaling.',
          where: 'Applied in: proportion and ratio problems.',
          conditions: [
            'Find value of one unit',
            'Multiply by required number',
            'Works with ratios',
          ],
          examples: [
            {
              question: '3 items cost 15. Cost of 7 items?',
              solution: '1 item = 15/3 = 5 → 7 items = 7 × 5 = 35',
              explanation: 'Find cost of one, multiply by number needed.',
            },
          ],
          commonMistakes: [
            'Wrong division',
            'Calculation errors',
            'Not checking',
          ],
          tips: [
            'Find one unit first',
            'Then multiply',
            'Check reasonableness',
          ],
        },
        {
          id: 'ratio-maps-scales',
          title: 'Maps & Scale Ratios',
          level: 'intermediate',
          why: 'Scale ratios appear in map and model problems.',
          when: 'Use when: working with maps, models, or scale drawings.',
          where: 'Applied in: geometry and measurement problems.',
          conditions: [
            'Scale = Map:Actual or Model:Real',
            'All dimensions scale by same factor',
            'Area scales as square, volume as cube',
          ],
          examples: [
            {
              question: 'Map scale 1:50000. 2 cm on map = ? km actual',
              solution: '2 cm × 50000 = 100000 cm = 1000 m = 1 km',
              explanation: 'Multiply map distance by scale factor.',
            },
          ],
          commonMistakes: [
            'Not converting units',
            'Using wrong scale',
            'Calculation errors',
          ],
          tips: [
            'Scale = map:actual',
            'Multiply map by scale',
            'Convert units carefully',
          ],
        },
        {
          id: 'ratio-efficiency',
          title: 'Efficiency Ratios',
          level: 'advanced',
          why: 'Efficiency ratios appear in work problems.',
          when: 'Use when: comparing work efficiency or rates.',
          where: 'Applied in: work and rate problems.',
          conditions: [
            'Efficiency = Work / Time',
            'Higher efficiency = more work in same time',
            'Ratio of efficiencies = inverse ratio of times',
          ],
          examples: [
            {
              question: 'A takes 6 hours, B takes 4 hours. Efficiency ratio?',
              solution: 'Efficiency A:B = (1/6):(1/4) = 4:6 = 2:3',
              explanation: 'Efficiency inversely related to time.',
            },
          ],
          commonMistakes: [
            'Not using inverse',
            'Calculation errors',
            'Confusing with time ratio',
          ],
          tips: [
            'Efficiency = 1/time',
            'Efficiency ratio = inverse of time ratio',
            'Higher efficiency = faster',
          ],
        },
        {
          id: 'ratio-investment',
          title: 'Investment Ratios',
          level: 'advanced',
          why: 'Investment problems use ratios. Important for business problems.',
          when: 'Use when: dividing profits or investments in ratio.',
          where: 'Applied in: business and investment problems.',
          conditions: [
            'Profit divided in ratio of investments',
            'Or in ratio of investment × time',
            'Set up from given information',
          ],
          examples: [
            {
              question: 'Investments: A=5000, B=3000. Profit 1600. Divide in investment ratio.',
              solution: 'Ratio = 5000:3000 = 5:3 → A: (5/8)×1600 = 1000, B: (3/8)×1600 = 600',
              explanation: 'Find investment ratio, divide profit accordingly.',
            },
          ],
          commonMistakes: [
            'Not finding ratio correctly',
            'Using wrong base',
            'Calculation errors',
          ],
          tips: [
            'Investment ratio = amounts invested',
            'Divide profit in same ratio',
            'Check: sum = total profit',
          ],
        },
        {
          id: 'ratio-age',
          title: 'Age Ratios',
          level: 'intermediate',
          why: 'Age problems often use ratios. Common word problem type.',
          when: 'Use when: age problems mention ratios.',
          where: 'Applied in: age word problems.',
          conditions: [
            'Age difference constant',
            'Set up ratio, account for time passing',
            'Use algebra to solve',
          ],
          examples: [
            {
              question: 'A:B age ratio 3:2. In 5 years, 4:3. Current ages?',
              solution: 'Let A=3x, B=2x → (3x+5):(2x+5) = 4:3 → 3(3x+5) = 4(2x+5) → 9x+15=8x+20 → x=5 → A=15, B=10',
              explanation: 'Set up with ratio, form equation from future ratio.',
            },
          ],
          commonMistakes: [
            'Not accounting for time',
            'Wrong equation',
            'Calculation errors',
          ],
          tips: [
            'Use variables for ages',
            'Account for time passing',
            'Set up equation from ratio',
          ],
        },
        {
          id: 'ratio-concentration',
          title: 'Concentration Ratios',
          level: 'advanced',
          why: 'Concentration problems use ratios. Important for mixture problems.',
          when: 'Use when: working with solution concentrations.',
          where: 'Applied in: mixture and chemistry problems.',
          conditions: [
            'Concentration = (solute / solution) × 100%',
            'Or as ratio: solute:solvent or solute:solution',
            'Set up from concentration information',
          ],
          examples: [
            {
              question: 'Solution: 20% salt means?',
              solution: 'Salt:Water = 20:80 = 1:4, or Salt:Solution = 20:100 = 1:5',
              explanation: 'Convert percentage to ratio.',
            },
          ],
          commonMistakes: [
            'Confusing solute:solvent vs solute:solution',
            'Calculation errors',
            'Not converting properly',
          ],
          tips: [
            '20% = 20 parts in 100 total',
            'Solute:Solution = %:(100−%)',
            'Be careful with which ratio',
          ],
        },
        {
          id: 'ratio-speed',
          title: 'Speed Ratios',
          level: 'intermediate',
          why: 'Speed ratios appear in motion problems.',
          when: 'Use when: comparing speeds or working with speed ratios.',
          where: 'Applied in: speed and motion problems.',
          conditions: [
            'Speed ratio = distance ratio (same time)',
            'Speed ratio = inverse time ratio (same distance)',
            'Use appropriately',
          ],
          examples: [
            {
              question: 'Same time: A travels 60 km, B travels 80 km. Speed ratio?',
              solution: 'Speed A:B = 60:80 = 3:4',
              explanation: 'Same time: speed ratio = distance ratio.',
            },
          ],
          commonMistakes: [
            'Not identifying condition',
            'Using wrong relationship',
            'Calculation errors',
          ],
          tips: [
            'Same time: speed = distance ratio',
            'Same distance: speed = inverse time ratio',
            'Identify condition first',
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
        {
          id: 'qc-numbers',
          title: 'QC with Numbers',
          level: 'beginner',
          why: 'Number QC questions test basic calculation and comparison skills.',
          when: 'Use when: comparing numbers directly without variables.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Calculate both columns',
            'Compare directly',
            'Watch for tricks',
          ],
          examples: [
            {
              question: 'Column A: 15% of 200, Column B: 20% of 150',
              solution: 'A: 0.15×200 = 30, B: 0.20×150 = 30 → A = B',
              explanation: 'Calculate each, then compare.',
            },
          ],
          commonMistakes: [
            'Calculation errors',
            'Not calculating both',
            'Rushing',
          ],
          tips: [
            'Calculate carefully',
            'Check both columns',
            'Verify answer',
          ],
        },
        {
          id: 'qc-fractions',
          title: 'QC with Fractions',
          level: 'intermediate',
          why: 'Fraction comparisons require careful analysis.',
          when: 'Use when: comparing fractions in QC format.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Use cross-multiplication',
            'Or convert to decimals',
            'Compare systematically',
          ],
          examples: [
            {
              question: 'Column A: 3/7, Column B: 4/9',
              solution: 'Cross multiply: 3×9 = 27, 7×4 = 28 → Since 27 < 28, A < B',
              explanation: 'Use cross-multiplication to compare.',
            },
          ],
          commonMistakes: [
            'Not using cross-multiplication',
            'Calculation errors',
            'Wrong comparison',
          ],
          tips: [
            'Cross-multiplication always works',
            'Or convert to decimals',
            'Check answer',
          ],
        },
        {
          id: 'qc-percentages',
          title: 'QC with Percentages',
          level: 'intermediate',
          why: 'Percentage comparisons appear frequently in QC.',
          when: 'Use when: comparing percentages or percentage calculations.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Convert to same form',
            'Calculate actual values if needed',
            'Compare carefully',
          ],
          examples: [
            {
              question: 'Column A: 30% of 80, Column B: 40% of 60',
              solution: 'A: 0.30×80 = 24, B: 0.40×60 = 24 → A = B',
              explanation: 'Calculate each percentage, then compare.',
            },
          ],
          commonMistakes: [
            'Not calculating',
            'Confusing percentages',
            'Calculation errors',
          ],
          tips: [
            'Calculate both',
            'Convert percentages to decimals',
            'Compare results',
          ],
        },
        {
          id: 'qc-exponents',
          title: 'QC with Exponents',
          level: 'advanced',
          why: 'Exponent comparisons require understanding of power relationships.',
          when: 'Use when: comparing expressions with exponents.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Test with different values',
            'Consider special cases: 0, 1, negative, fractions',
            'Use exponent properties',
          ],
          examples: [
            {
              question: 'Column A: x³, Column B: x², Condition: x > 1',
              solution: 'Test x=2: A=8, B=4 → A>B. For x>1, x³ > x² → A > B',
              explanation: 'For x>1, higher power is larger.',
            },
          ],
          commonMistakes: [
            'Not testing values',
            'Assuming relationship',
            'Not considering conditions',
          ],
          tips: [
            'Test with actual values',
            'Consider special cases',
            'Use exponent rules',
          ],
        },
        {
          id: 'qc-roots',
          title: 'QC with Square Roots',
          level: 'advanced',
          why: 'Square root comparisons require careful analysis.',
          when: 'Use when: comparing expressions with square roots.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Square both sides if needed (if both positive)',
            'Consider domain restrictions',
            'Test with values',
          ],
          examples: [
            {
              question: 'Column A: √25, Column B: √16',
              solution: 'A: √25 = 5, B: √16 = 4 → A > B',
              explanation: 'Calculate square roots, compare.',
            },
          ],
          commonMistakes: [
            'Not calculating',
            'Domain errors',
            'Sign errors',
          ],
          tips: [
            'Calculate square roots',
            'Check domain',
            'Compare results',
          ],
        },
        {
          id: 'qc-absolute-value',
          title: 'QC with Absolute Values',
          level: 'advanced',
          why: 'Absolute value comparisons require considering both cases.',
          when: 'Use when: comparing expressions with absolute values.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Consider both positive and negative cases',
            'Test with different values',
            'Use absolute value properties',
          ],
          examples: [
            {
              question: 'Column A: |x−3|, Column B: |3−x|, Condition: x is real',
              solution: '|x−3| = |3−x| always (absolute value) → A = B',
              explanation: 'Absolute value of (a−b) equals absolute value of (b−a).',
            },
          ],
          commonMistakes: [
            'Not recognizing equality',
            'Testing unnecessarily',
            'Calculation errors',
          ],
          tips: [
            'Use absolute value properties',
            '|a−b| = |b−a|',
            'Test if unsure',
          ],
        },
        {
          id: 'qc-inequalities',
          title: 'QC with Inequalities',
          level: 'advanced',
          why: 'Inequality QC tests understanding of relationships.',
          when: 'Use when: comparing quantities with inequality conditions.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Use given conditions',
            'Test boundary cases',
            'Consider all possibilities',
          ],
          examples: [
            {
              question: 'Column A: x, Column B: y, Condition: x < y',
              solution: 'Given x < y, so B > A',
              explanation: 'Use given condition directly.',
            },
          ],
          commonMistakes: [
            'Not using conditions',
            'Reversing inequality',
            'Not testing',
          ],
          tips: [
            'Use given conditions',
            'Test boundary values',
            'Check answer',
          ],
        },
        {
          id: 'qc-triangles',
          title: 'QC with Triangles',
          level: 'advanced',
          why: 'Triangle QC questions test geometric understanding.',
          when: 'Use when: comparing triangle properties.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Use triangle properties',
            'Consider different triangle types',
            'Calculate when needed',
          ],
          examples: [
            {
              question: 'Column A: Area of triangle base 10 height 6, Column B: Area of triangle base 8 height 8',
              solution: 'A: ½×10×6 = 30, B: ½×8×8 = 32 → B > A',
              explanation: 'Calculate areas, compare.',
            },
          ],
          commonMistakes: [
            'Using wrong formula',
            'Calculation errors',
            'Not considering types',
          ],
          tips: [
            'Use correct area formula',
            'Calculate both',
            'Check triangle types',
          ],
        },
        {
          id: 'qc-circles',
          title: 'QC with Circles',
          level: 'advanced',
          why: 'Circle QC questions test understanding of circle properties.',
          when: 'Use when: comparing circle measurements.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Use circle formulas',
            'Compare areas, circumferences, radii',
            'Consider relationships',
          ],
          examples: [
            {
              question: 'Column A: Circumference of circle r=5, Column B: Area of circle r=5',
              solution: 'A: 2π×5 = 10π, B: π×5² = 25π → B > A',
              explanation: 'Calculate both, compare (note: different units, but can compare numerically).',
            },
          ],
          commonMistakes: [
            'Using wrong formulas',
            'Unit confusion',
            'Calculation errors',
          ],
          tips: [
            'Use correct formulas',
            'Calculate both',
            'Check units',
          ],
        },
        {
          id: 'qc-sequences',
          title: 'QC with Sequences',
          level: 'advanced',
          why: 'Sequence QC tests pattern recognition.',
          when: 'Use when: comparing sequence terms or properties.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Identify sequence type',
            'Find pattern',
            'Compare terms',
          ],
          examples: [
            {
              question: 'Column A: 10th term of 5,8,11,14..., Column B: 32',
              solution: 'Arithmetic: d=3, a₁₀ = 5+9×3 = 32 → A = B',
              explanation: 'Find sequence type, calculate term, compare.',
            },
          ],
          commonMistakes: [
            'Not identifying pattern',
            'Calculation errors',
            'Wrong formula',
          ],
          tips: [
            'Identify sequence type first',
            'Use correct formula',
            'Calculate carefully',
          ],
        },
        {
          id: 'qc-probability',
          title: 'QC with Probability',
          level: 'advanced',
          why: 'Probability QC tests understanding of chance calculations.',
          when: 'Use when: comparing probabilities.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Calculate probabilities',
            'Compare fractions',
            'Use probability rules',
          ],
          examples: [
            {
              question: 'Column A: P(rolling 6 on die), Column B: 1/6',
              solution: 'A: 1/6, B: 1/6 → A = B',
              explanation: 'Calculate probability, compare.',
            },
          ],
          commonMistakes: [
            'Calculation errors',
            'Not using correct formula',
            'Confusing events',
          ],
          tips: [
            'Use probability formula',
            'Calculate both',
            'Compare fractions',
          ],
        },
        {
          id: 'qc-statistics',
          title: 'QC with Statistics',
          level: 'advanced',
          why: 'Statistics QC tests understanding of data measures.',
          when: 'Use when: comparing means, medians, or other statistics.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Calculate statistics',
            'Compare values',
            'Consider data sets',
          ],
          examples: [
            {
              question: 'Column A: Mean of 10,20,30, Column B: Median of 10,20,30',
              solution: 'A: (10+20+30)/3 = 20, B: 20 (middle) → A = B',
              explanation: 'Calculate mean and median, compare.',
            },
          ],
          commonMistakes: [
            'Calculation errors',
            'Confusing mean and median',
            'Not calculating both',
          ],
          tips: [
            'Calculate both statistics',
            'Use correct formulas',
            'Compare results',
          ],
        },
        {
          id: 'qc-word-problems',
          title: 'QC Word Problems',
          level: 'advanced',
          why: 'Word problem QC requires translation and comparison.',
          when: 'Use when: QC questions involve word problems.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Translate to math',
            'Set up both columns',
            'Compare',
          ],
          examples: [
            {
              question: 'Column A: Age in 5 years if now 20, Column B: 25',
              solution: 'A: 20+5 = 25, B: 25 → A = B',
              explanation: 'Translate word problem, calculate, compare.',
            },
          ],
          commonMistakes: [
            'Translation errors',
            'Not setting up correctly',
            'Calculation errors',
          ],
          tips: [
            'Translate carefully',
            'Set up both columns',
            'Calculate and compare',
          ],
        },
        {
          id: 'qc-trap-answers',
          title: 'QC Common Traps',
          level: 'advanced',
          why: 'Understanding common traps prevents errors.',
          when: 'Use when: answer seems obvious but might be trap.',
          where: 'Applied in: all QC questions.',
          conditions: [
            'Watch for: variables can be equal',
            'Zero and one are special',
            'Fractions between 0 and 1 behave differently',
            'Negative numbers reverse relationships',
          ],
          examples: [
            {
              question: 'Column A: x², Column B: x, Condition: x ≥ 0',
              solution: 'Test x=0: A=0, B=0 → Equal. Test x=1: A=1, B=1 → Equal. Test x=2: A=4, B=2 → A>B. Since can be equal or A>B, answer depends → D',
              explanation: 'Variable can be 0 or 1 giving equal, or >1 giving A>B. Cannot determine.',
            },
          ],
          commonMistakes: [
            'Not testing 0 and 1',
            'Assuming variables different',
            'Not considering all cases',
          ],
          tips: [
            'Always test 0 and 1',
            'Variables can be equal',
            'Test multiple cases',
          ],
        },
        {
          id: 'qc-simplification',
          title: 'QC Simplification Strategies',
          level: 'intermediate',
          why: 'Simplifying before comparing saves time and prevents errors.',
          when: 'Use when: expressions can be simplified.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Simplify both columns',
            'Cancel common terms',
            'Factor when possible',
            'Then compare',
          ],
          examples: [
            {
              question: 'Column A: (x+5)−(x+3), Column B: 2',
              solution: 'Simplify A: x+5−x−3 = 2 → A = B',
              explanation: 'Simplify first, then compare.',
            },
          ],
          commonMistakes: [
            'Not simplifying',
            'Simplification errors',
            'Rushing to answer',
          ],
          tips: [
            'Always simplify first',
            'Cancel common terms',
            'Then compare',
          ],
        },
        {
          id: 'qc-estimation',
          title: 'QC Estimation Techniques',
          level: 'intermediate',
          why: 'Estimation helps eliminate wrong answers quickly.',
          when: 'Use when: exact calculation is time-consuming.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Round numbers',
            'Estimate both columns',
            'Use to eliminate choices',
          ],
          examples: [
            {
              question: 'Column A: 23% of 487, Column B: 115',
              solution: 'Estimate A: ≈25% of 500 = 125 → A > B (actual: 112.01, but estimate suggests A)',
              explanation: 'Use estimation to get approximate answer.',
            },
          ],
          commonMistakes: [
            'Too much rounding',
            'Not checking reasonableness',
            'Using estimate as final answer',
          ],
          tips: [
            'Use for elimination',
            'Check reasonableness',
            'Calculate exactly if close',
          ],
        },
        {
          id: 'qc-picking-numbers',
          title: 'QC Picking Numbers Strategy',
          level: 'intermediate',
          why: 'Picking numbers is powerful QC strategy.',
          when: 'Use when: variables present and relationship unclear.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Pick easy numbers',
            'Test systematically',
            'Try different types: positive, negative, zero, fraction',
          ],
          examples: [
            {
              question: 'Column A: x+5, Column B: 2x+3, Condition: x > 0',
              solution: 'Test x=1: A=6, B=5 → A>B. Test x=10: A=15, B=23 → A<B. Different → D',
              explanation: 'Different values give different relationships.',
            },
          ],
          commonMistakes: [
            'Not testing enough values',
            'Only testing one type',
            'Assuming from one test',
          ],
          tips: [
            'Test multiple values',
            'Try different types',
            'If different results → D',
          ],
        },
        {
          id: 'qc-plug-in-answers',
          title: 'QC Plug-in Strategy',
          level: 'intermediate',
          why: 'Plugging in answer choices works for some QC problems.',
          when: 'Use when: QC question has answer choices to test.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Test each choice',
            'See which gives consistent relationship',
            'Eliminate wrong ones',
          ],
          examples: [
            {
              question: 'If x+3=8, Column A: x, Column B: 5',
              solution: 'Solve: x=5 → A=5, B=5 → A = B',
              explanation: 'Solve equation, then compare.',
            },
          ],
          commonMistakes: [
            'Not solving first',
            'Calculation errors',
            'Not checking',
          ],
          tips: [
            'Solve any equations first',
            'Then compare',
            'Check answer',
          ],
        },
        {
          id: 'qc-visual',
          title: 'QC Visual Strategies',
          level: 'intermediate',
          why: 'Visualizing helps understand relationships.',
          when: 'Use when: geometry or number line problems.',
          where: 'Applied in: quantitative comparison questions.',
          conditions: [
            'Draw diagrams',
            'Use number line',
            'Visualize relationships',
          ],
          examples: [
            {
              question: 'Column A: Distance from 0 to 5, Column B: Distance from 0 to −5',
              solution: 'Both distances = 5 → A = B',
              explanation: 'Visualize on number line, both same distance.',
            },
          ],
          commonMistakes: [
            'Not visualizing',
            'Wrong visualization',
            'Calculation errors',
          ],
          tips: [
            'Draw when helpful',
            'Use number line',
            'Visualize relationships',
          ],
        },
        {
          id: 'qc-time-management',
          title: 'QC Time Management',
          level: 'beginner',
          why: 'Time management is crucial for QC success.',
          when: 'Use always: manage time effectively on QC questions.',
          where: 'Applied in: all QC sections.',
          conditions: [
            'Easy questions: 30-45 seconds',
            'Medium: 60-75 seconds',
            'Hard: 90-120 seconds',
            'If stuck >2 min: eliminate, guess, move on',
          ],
          examples: [
            {
              question: 'Time management example',
              solution: 'Set time limits, stick to them, move on if stuck',
              explanation: 'Better to answer all questions than perfect a few.',
            },
          ],
          commonMistakes: [
            'Spending too much time',
            'Not moving on',
            'Perfectionism',
          ],
          tips: [
            'Set time limits',
            'Move on if stuck',
            'Answer all questions',
          ],
        },
        {
          id: 'qc-practice',
          title: 'QC Practice Strategies',
          level: 'beginner',
          why: 'Practice improves QC performance.',
          when: 'Use when: preparing for QC sections.',
          where: 'Applied in: test preparation.',
          conditions: [
            'Practice regularly',
            'Review mistakes',
            'Time yourself',
            'Learn patterns',
          ],
          examples: [
            {
              question: 'How to practice QC',
              solution: 'Do practice problems, time yourself, review solutions, identify patterns',
              explanation: 'Consistent practice builds skills.',
            },
          ],
          commonMistakes: [
            'Not practicing',
            'Not timing',
            'Not reviewing',
          ],
          tips: [
            'Practice daily',
            'Time yourself',
            'Review mistakes',
            'Learn from errors',
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
        {
          id: 'pie-charts',
          title: 'Pie Charts',
          level: 'intermediate',
          why: 'Pie charts show parts of whole. Common in DI questions.',
          when: 'Use when: analyzing pie charts or parts of whole.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Total = 100% or given total',
            'Each slice = percentage of total',
            'Actual value = % × total',
            'Compare slices carefully',
          ],
          examples: [
            {
              question: 'Pie chart: A=30%, B=25%, C=45%. Total=200. Actual values?',
              solution: 'A: 0.30×200=60, B: 0.25×200=50, C: 0.45×200=90',
              explanation: 'Convert percentages to actual values using total.',
            },
          ],
          commonMistakes: [
            'Confusing % with actual',
            'Not using total',
            'Calculation errors',
          ],
          tips: [
            'Convert % to actual: % × total',
            'Check: slices sum to 100%',
            'Use total when given',
          ],
        },
        {
          id: 'scatter-plots',
          title: 'Scatter Plots',
          level: 'advanced',
          why: 'Scatter plots show relationships. Understanding them helps analyze data.',
          when: 'Use when: analyzing scatter plots or correlations.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Each point = (x, y) pair',
            'Pattern indicates relationship',
            'Upward trend = positive correlation',
            'Downward trend = negative correlation',
          ],
          examples: [
            {
              question: 'Scatter plot: points trend upward. Relationship?',
              solution: 'Positive correlation (as x increases, y increases)',
              explanation: 'Upward trend indicates positive relationship.',
            },
          ],
          commonMistakes: [
            'Not identifying pattern',
            'Confusing correlation types',
            'Reading points incorrectly',
          ],
          tips: [
            'Look for overall pattern',
            'Upward = positive, Downward = negative',
            'Read coordinates carefully',
          ],
        },
        {
          id: 'histograms',
          title: 'Histograms',
          level: 'intermediate',
          why: 'Histograms show frequency distributions. Common in statistics.',
          when: 'Use when: analyzing frequency or distribution data.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Bars show frequency in ranges',
            'Width = range, Height = frequency',
            'Area represents frequency',
            'Read ranges carefully',
          ],
          examples: [
            {
              question: 'Histogram: 0-10 range has height 5, 10-20 has height 8. Which more frequent?',
              solution: '10-20 range (height 8 > height 5)',
              explanation: 'Height represents frequency.',
            },
          ],
          commonMistakes: [
            'Not reading ranges',
            'Confusing height and width',
            'Calculation errors',
          ],
          tips: [
            'Height = frequency',
            'Read ranges carefully',
            'Compare heights',
          ],
        },
        {
          id: 'data-averages',
          title: 'Averages from Data',
          level: 'intermediate',
          why: 'Calculating averages from data is essential.',
          when: 'Use when: finding mean, median, or mode from data.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Mean = sum / count',
            'Median = middle value',
            'Mode = most frequent',
            'Calculate carefully',
          ],
          examples: [
            {
              question: 'Data: 10, 15, 20, 25, 30. Mean?',
              solution: 'Mean = (10+15+20+25+30)/5 = 100/5 = 20',
              explanation: 'Sum all values, divide by count.',
            },
          ],
          commonMistakes: [
            'Calculation errors',
            'Not counting all values',
            'Confusing mean and median',
          ],
          tips: [
            'Calculate mean carefully',
            'Count all values',
            'Check answer',
          ],
        },
        {
          id: 'data-percentiles',
          title: 'Percentiles & Quartiles',
          level: 'advanced',
          why: 'Percentiles help understand data distribution.',
          when: 'Use when: analyzing data distribution or percentiles.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Percentile: % of data below value',
            'Quartiles: Q1=25%, Q2=50% (median), Q3=75%',
            'IQR = Q3 − Q1',
          ],
          examples: [
            {
              question: 'Data sorted: 10,20,30,40,50. Q1, median, Q3?',
              solution: 'Q1=20 (25th percentile), Median=30 (50th), Q3=40 (75th)',
              explanation: 'Find values at percentiles.',
            },
          ],
          commonMistakes: [
            'Not sorting data',
            'Wrong percentile calculation',
            'Confusing quartiles',
          ],
          tips: [
            'Sort data first',
            'Q1=25%, Q2=50%, Q3=75%',
            'Calculate carefully',
          ],
        },
        {
          id: 'data-trends',
          title: 'Identifying Trends',
          level: 'intermediate',
          why: 'Identifying trends helps answer many DI questions.',
          when: 'Use when: analyzing data over time or sequences.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Increasing trend: values go up',
            'Decreasing trend: values go down',
            'Stable: little change',
            'Cyclical: repeating pattern',
          ],
          examples: [
            {
              question: 'Data: 100, 120, 140, 160. Trend?',
              solution: 'Increasing trend (each value larger than previous)',
              explanation: 'Identify pattern in data.',
            },
          ],
          commonMistakes: [
            'Not identifying pattern',
            'Confusing trends',
            'Not looking at overall',
          ],
          tips: [
            'Look at overall pattern',
            'Identify direction',
            'Note any changes',
          ],
        },
        {
          id: 'data-comparison',
          title: 'Comparing Data Sets',
          level: 'intermediate',
          why: 'Comparing data sets is common in DI questions.',
          when: 'Use when: comparing two or more data sets.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Compare same measures',
            'Use actual values, not just percentages',
            'Calculate differences',
            'Consider context',
          ],
          examples: [
            {
              question: 'Set A: mean 50, Set B: mean 60. Which higher?',
              solution: 'Set B higher (60 > 50)',
              explanation: 'Compare means directly.',
            },
          ],
          commonMistakes: [
            'Comparing different measures',
            'Not using actual values',
            'Calculation errors',
          ],
          tips: [
            'Compare same measures',
            'Use actual values',
            'Calculate differences',
          ],
        },
        {
          id: 'data-extrapolation',
          title: 'Extrapolation & Prediction',
          level: 'advanced',
          why: 'Predicting from data tests understanding of trends.',
          when: 'Use when: asked to predict or extrapolate.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Identify trend',
            'Extend trend forward',
            'Be cautious: trends may change',
            'Use linear approximation if appropriate',
          ],
          examples: [
            {
              question: 'Trend: 100, 110, 120, 130. Predict next?',
              solution: 'Pattern: +10 each time → Next ≈ 140',
              explanation: 'Identify pattern, extend forward.',
            },
          ],
          commonMistakes: [
            'Assuming trend continues',
            'Not identifying pattern',
            'Over-extrapolating',
          ],
          tips: [
            'Identify pattern first',
            'Extend carefully',
            'Note: predictions uncertain',
          ],
        },
        {
          id: 'data-interpolation',
          title: 'Interpolation',
          level: 'advanced',
          why: 'Interpolating between data points is useful.',
          when: 'Use when: finding values between known points.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Use linear interpolation',
            'Find value between two points',
            'Assume linear relationship',
          ],
          examples: [
            {
              question: 'At x=1, y=10; at x=3, y=30. Estimate y at x=2?',
              solution: 'Linear: y = 10 + (30−10)/(3−1) × (2−1) = 10 + 10 = 20',
              explanation: 'Use linear interpolation formula.',
            },
          ],
          commonMistakes: [
            'Not using linear assumption',
            'Calculation errors',
            'Wrong formula',
          ],
          tips: [
            'Assume linear between points',
            'Use interpolation formula',
            'Check reasonableness',
          ],
        },
        {
          id: 'data-outliers',
          title: 'Identifying Outliers',
          level: 'advanced',
          why: 'Outliers affect statistics. Identifying them is important.',
          when: 'Use when: analyzing data for unusual values.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Outlier: value far from others',
            'Affects mean more than median',
            'May indicate error or special case',
          ],
          examples: [
            {
              question: 'Data: 10, 12, 11, 13, 50. Outlier?',
              solution: '50 is outlier (much larger than others)',
              explanation: 'Value far from rest of data.',
            },
          ],
          commonMistakes: [
            'Not identifying outliers',
            'Including in calculations',
            'Ignoring when should exclude',
          ],
          tips: [
            'Look for values far from others',
            'Consider excluding from some calculations',
            'Note their impact',
          ],
        },
        {
          id: 'data-range',
          title: 'Range & Spread from Data',
          level: 'intermediate',
          why: 'Understanding data spread helps interpret results.',
          when: 'Use when: analyzing data variability.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Range = Max − Min',
            'Larger range = more spread',
            'Calculate from data',
          ],
          examples: [
            {
              question: 'Data: 10, 15, 20, 25, 30. Range?',
              solution: 'Range = 30 − 10 = 20',
              explanation: 'Maximum minus minimum.',
            },
          ],
          commonMistakes: [
            'Calculation errors',
            'Not finding max/min',
            'Confusing with mean',
          ],
          tips: [
            'Find maximum and minimum',
            'Range = max − min',
            'Larger = more spread',
          ],
        },
        {
          id: 'data-percentage-change',
          title: 'Percentage Change from Data',
          level: 'intermediate',
          why: 'Calculating percentage changes from data is common.',
          when: 'Use when: finding growth, decline, or change rates.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            '% change = [(New−Old)/Old] × 100%',
            'Use actual values, not percentages',
            'Calculate carefully',
          ],
          examples: [
            {
              question: 'Year 1: 100, Year 2: 120. % change?',
              solution: '% change = [(120−100)/100] × 100% = 20% increase',
              explanation: 'Use percentage change formula.',
            },
          ],
          commonMistakes: [
            'Using wrong base',
            'Calculation errors',
            'Not converting properly',
          ],
          tips: [
            'Use old value as base',
            'Calculate carefully',
            'Check sign (increase/decrease)',
          ],
        },
        {
          id: 'data-ratios',
          title: 'Ratios from Data',
          level: 'intermediate',
          why: 'Calculating ratios from data is common.',
          when: 'Use when: comparing quantities as ratios.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Ratio = first / second',
            'Simplify if possible',
            'Compare ratios',
          ],
          examples: [
            {
              question: 'Group A: 60, Group B: 40. Ratio A:B?',
              solution: 'Ratio = 60:40 = 3:2',
              explanation: 'Find ratio, simplify.',
            },
          ],
          commonMistakes: [
            'Not simplifying',
            'Wrong order',
            'Calculation errors',
          ],
          tips: [
            'Calculate ratio',
            'Simplify',
            'Check order',
          ],
        },
        {
          id: 'data-multi-graph',
          title: 'Multiple Graphs',
          level: 'advanced',
          why: 'Some questions use multiple graphs. Understanding relationships is key.',
          when: 'Use when: analyzing multiple related graphs.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Read each graph separately',
            'Find relationships between graphs',
            'Use information from all',
          ],
          examples: [
            {
              question: 'Graph 1: sales, Graph 2: profits. Relationship?',
              solution: 'Compare trends, see if profits follow sales',
              explanation: 'Analyze both graphs, find relationship.',
            },
          ],
          commonMistakes: [
            'Not reading all graphs',
            'Missing relationships',
            'Confusing graphs',
          ],
          tips: [
            'Read all graphs',
            'Find relationships',
            'Use all information',
          ],
        },
        {
          id: 'data-estimation',
          title: 'Estimation in DI',
          level: 'intermediate',
          why: 'Estimation saves time in DI questions.',
          when: 'Use when: exact calculation is time-consuming.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Round numbers',
            'Estimate calculations',
            'Use to eliminate choices',
          ],
          examples: [
            {
              question: 'Estimate: 23% of 487',
              solution: '≈ 25% of 500 = 125',
              explanation: 'Round to nearby values for quick estimate.',
            },
          ],
          commonMistakes: [
            'Too much rounding',
            'Not checking reasonableness',
            'Using estimate as final',
          ],
          tips: [
            'Round appropriately',
            'Use for elimination',
            'Calculate exactly if needed',
          ],
        },
        {
          id: 'data-units',
          title: 'Unit Conversions in DI',
          level: 'intermediate',
          why: 'Unit conversions appear in DI questions.',
          when: 'Use when: data in different units.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Convert to same units',
            'Use conversion factors',
            'Check units carefully',
          ],
          examples: [
            {
              question: 'Convert 5000 meters to kilometers',
              solution: '5000 m = 5 km (divide by 1000)',
              explanation: 'Use conversion factor.',
            },
          ],
          commonMistakes: [
            'Wrong conversion',
            'Not converting',
            'Unit errors',
          ],
          tips: [
            'Convert to same units',
            'Use correct factors',
            'Check units',
          ],
        },
        {
          id: 'data-cumulative',
          title: 'Cumulative Data',
          level: 'advanced',
          why: 'Cumulative data shows running totals. Understanding helps analyze.',
          when: 'Use when: working with cumulative frequencies or totals.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Cumulative = running total',
            'Add each value to previous total',
            'Last value = grand total',
          ],
          examples: [
            {
              question: 'Data: 10, 15, 20. Cumulative?',
              solution: 'Cumulative: 10, 25, 45',
              explanation: 'Add each to running total.',
            },
          ],
          commonMistakes: [
            'Not adding correctly',
            'Confusing with regular data',
            'Calculation errors',
          ],
          tips: [
            'Cumulative = running sum',
            'Add sequentially',
            'Check: last = total',
          ],
        },
        {
          id: 'data-frequency',
          title: 'Frequency Distributions',
          level: 'intermediate',
          why: 'Frequency distributions organize data. Common in statistics.',
          when: 'Use when: analyzing frequency data.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Frequency = how often value occurs',
            'Total frequency = sum of all',
            'Relative frequency = frequency / total',
          ],
          examples: [
            {
              question: 'Value 5 appears 8 times out of 40. Frequency? Relative frequency?',
              solution: 'Frequency = 8, Relative frequency = 8/40 = 0.20 = 20%',
              explanation: 'Frequency is count, relative is proportion.',
            },
          ],
          commonMistakes: [
            'Confusing frequency types',
            'Calculation errors',
            'Not finding total',
          ],
          tips: [
            'Frequency = count',
            'Relative = frequency / total',
            'Check: relative frequencies sum to 1',
          ],
        },
        {
          id: 'data-sampling',
          title: 'Sampling & Representative Data',
          level: 'advanced',
          why: 'Understanding sampling helps interpret data correctly.',
          when: 'Use when: analyzing sample data or surveys.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Sample should represent population',
            'Larger sample = more reliable',
            'Random sampling best',
          ],
          examples: [
            {
              question: 'Sample of 100 from population 10000. Representative?',
              solution: '1% sample - may be representative if random',
              explanation: 'Consider sample size and method.',
            },
          ],
          commonMistakes: [
            'Not considering sample size',
            'Assuming representativeness',
            'Ignoring sampling method',
          ],
          tips: [
            'Consider sample size',
            'Check sampling method',
            'Be cautious with small samples',
          ],
        },
        {
          id: 'data-accuracy',
          title: 'Data Accuracy & Precision',
          level: 'advanced',
          why: 'Understanding accuracy helps interpret data correctly.',
          when: 'Use when: evaluating data quality or precision.',
          where: 'Applied in: data interpretation questions.',
          conditions: [
            'Accuracy: how close to true value',
            'Precision: how consistent',
            'Consider measurement errors',
          ],
          examples: [
            {
              question: 'Measurements: 10.1, 10.2, 10.1. Precise?',
              solution: 'Yes, very consistent (precise)',
              explanation: 'Close values indicate precision.',
            },
          ],
          commonMistakes: [
            'Confusing accuracy and precision',
            'Not considering errors',
            'Assuming perfect data',
          ],
          tips: [
            'Precision = consistency',
            'Accuracy = correctness',
            'Consider measurement limitations',
          ],
        },
        {
          id: 'data-visualization',
          title: 'Data Visualization Tips',
          level: 'beginner',
          why: 'Effective visualization reading saves time.',
          when: 'Use when: reading any graph or chart.',
          where: 'Applied in: all data interpretation questions.',
          conditions: [
            'Read title first',
            'Check axes and labels',
            'Note scale',
            'Identify what is shown',
          ],
          examples: [
            {
              question: 'How to read bar graph?',
              solution: 'Read title, check axes, note scale, read values from bars',
              explanation: 'Systematic approach to reading graphs.',
            },
          ],
          commonMistakes: [
            'Not reading title',
            'Missing scale',
            'Reading wrong axis',
          ],
          tips: [
            'Always read title first',
            'Check all labels',
            'Note scale carefully',
            'Systematic approach',
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

