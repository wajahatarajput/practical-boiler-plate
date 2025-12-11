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
              question: 'If x < 0 (x is negative) and y > 0 (y is positive), what is the sign of the expression (x²y)/(−x)?',
              solution: 'Step 1: Analyze x². Since x is negative, x² = (negative) × (negative) = positive. Remember: any number squared is always positive, regardless of whether the original number was positive or negative. Step 2: Analyze x² × y. We have: positive × positive (since y > 0) = positive. So x²y is positive. Step 3: Analyze the division (x²y) ÷ (−x). We have: positive ÷ negative. Since −x means the negative of x, and x is negative, −x is positive. Wait, let\'s recalculate: if x < 0, then −x > 0. So we have: positive ÷ positive = positive. Actually, let\'s be more careful: (x²y)/(−x) = (positive × positive)/(positive) = positive/positive = positive. Step 4: Final answer. The sign of (x²y)/(−x) is positive.',
              explanation: 'This problem requires careful step-by-step analysis. First, x² is always positive (any number squared is positive). Then x² × y is positive × positive = positive. Finally, we divide by −x. Since x is negative, −x is positive. So positive ÷ positive = positive. The key insight is that x² is always positive, and we must carefully determine the sign of −x based on the fact that x is negative.',
            },
            {
              question: 'Evaluate the expression step by step: (−3) × (−4) ÷ (−2) × (−1)',
              solution: 'Step 1: Work from left to right, one operation at a time. Start with the first multiplication: (−3) × (−4). Step 2: Apply sign rule for multiplication: negative × negative = positive. So (−3) × (−4) = +12. Step 3: Now we have: +12 ÷ (−2) × (−1). Perform the division next: +12 ÷ (−2). Step 4: Apply sign rule for division: positive ÷ negative = negative. So +12 ÷ (−2) = −6. Step 5: Now we have: −6 × (−1). Perform the final multiplication: negative × negative = positive. So −6 × (−1) = +6. Step 6: Final answer is +6 or simply 6.',
              explanation: 'When evaluating expressions with multiple operations, work from left to right. Each operation follows the sign rules: (1) Two negatives multiply or divide to give positive, (2) One positive and one negative multiply or divide to give negative. By working step by step, we avoid errors. The expression simplifies to 6.',
            },
            {
              question: 'A temperature drops by 5°C each hour for 3 hours. If the starting temperature is −10°C, what is the final temperature?',
              solution: 'Step 1: Understand the problem. Starting temperature = −10°C. Temperature drops by 5°C each hour for 3 hours. Step 2: Set up the calculation. Each hour, we subtract 5°C. After 3 hours, total drop = 3 × 5°C = 15°C. Step 3: Calculate final temperature. Starting: −10°C. Drop: −15°C (negative because it\'s a decrease). Final = −10 + (−15) = −25°C. Step 4: Verify with sign rules. Adding two negative numbers: negative + negative = more negative. So −10 + (−15) = −25. Therefore, the final temperature is −25°C.',
              explanation: 'This word problem involves negative numbers and operations. The starting temperature is negative (−10°C). Each hour, the temperature decreases by 5°C, which we represent as −5°C. After 3 hours, the total decrease is 3 × (−5) = −15°C. To find the final temperature, we add the starting temperature and the change: −10 + (−15) = −25°C. When adding two negative numbers, the result is more negative.',
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
              question: 'Bus A arrives at a bus stop every 15 minutes, and Bus B arrives every 20 minutes. If both buses arrive together at 9:00 AM, at what time will they next arrive together?',
              solution: 'Step 1: Understand the problem. We need to find when both buses will be at the stop at the same time again. This requires finding the Least Common Multiple (LCM) of 15 and 20. Step 2: Find the prime factorization of each number. For 15: 15 = 3 × 5. For 20: 20 = 2 × 2 × 5 = 2² × 5. Step 3: Find the LCM using prime factors. LCM takes the highest power of each prime factor: LCM(15, 20) = 2² × 3 × 5 = 4 × 3 × 5 = 60. Step 4: Interpret the result. LCM(15, 20) = 60 means both buses will be together again after 60 minutes. Step 5: Calculate the next meeting time. Starting time: 9:00 AM. Add 60 minutes: 9:00 AM + 60 minutes = 9:00 AM + 1 hour = 10:00 AM. Therefore, the buses will next arrive together at 10:00 AM. Step 6: Verify. Bus A schedule (every 15 min): 9:00, 9:15, 9:30, 9:45, 10:00, ... Bus B schedule (every 20 min): 9:00, 9:20, 9:40, 10:00, ... Both are at 9:00 and 10:00. ✓',
              explanation: 'LCM (Least Common Multiple) finds the smallest number that is a multiple of both numbers. For time-based problems like this, LCM tells us when cycles align. We use prime factorization to find LCM efficiently: take the highest power of each prime factor that appears in either number. The LCM of 15 and 20 is 60, meaning after 60 minutes (1 hour), both cycles complete and align again.',
            },
            {
              question: 'You have 24 apples and 36 oranges. You want to divide them into identical baskets (each basket has the same number of apples and same number of oranges). What is the maximum number of baskets you can make?',
              solution: 'Step 1: Understand the problem. We need to divide both 24 and 36 evenly into the same number of baskets. This requires finding the Greatest Common Divisor (GCD) of 24 and 36. Step 2: Find the prime factorization of each number. For 24: 24 = 2 × 2 × 2 × 3 = 2³ × 3. For 36: 36 = 2 × 2 × 3 × 3 = 2² × 3². Step 3: Find the GCD using prime factors. GCD takes the lowest power of each common prime factor: GCD(24, 36) = 2² × 3 = 4 × 3 = 12. Step 4: Interpret the result. GCD(24, 36) = 12 means we can make 12 baskets. Step 5: Calculate items per basket. Apples per basket: 24 ÷ 12 = 2 apples. Oranges per basket: 36 ÷ 12 = 3 oranges. Step 6: Verify. Total apples: 12 baskets × 2 apples = 24 apples. ✓ Total oranges: 12 baskets × 3 oranges = 36 oranges. ✓ Therefore, the maximum number of baskets is 12, with each basket containing 2 apples and 3 oranges.',
              explanation: 'GCD (Greatest Common Divisor) finds the largest number that divides both numbers evenly. For distribution problems, GCD tells us the maximum number of equal groups we can make. We use prime factorization: take the lowest power of each common prime factor. The GCD of 24 and 36 is 12, meaning we can make 12 baskets, each with 2 apples (24÷12) and 3 oranges (36÷12).',
            },
            {
              question: 'Three friends go jogging together. Friend A jogs every 2 days, Friend B every 3 days, and Friend C every 4 days. If they all jog together on Monday, on which day will they next jog together?',
              solution: 'Step 1: Understand the problem. We need to find when all three friends will jog together again. This requires finding the LCM of 2, 3, and 4. Step 2: Find the prime factorization of each number. For 2: 2 = 2 (prime). For 3: 3 = 3 (prime). For 4: 4 = 2 × 2 = 2². Step 3: Find the LCM using prime factors. LCM takes the highest power of each prime: LCM(2, 3, 4) = 2² × 3 = 4 × 3 = 12. Step 4: Interpret the result. LCM(2, 3, 4) = 12 means they will jog together again after 12 days. Step 5: Calculate the day. Starting day: Monday (Day 0). After 12 days: Monday + 12 days. Since 12 ÷ 7 = 1 remainder 5, we add 5 days to Monday: Monday → Tuesday → Wednesday → Thursday → Friday → Saturday. Therefore, they will next jog together on Saturday. Step 6: Verify. Friend A (every 2 days): Mon, Wed, Fri, Sun, Tue, Thu, Sat, ... Friend B (every 3 days): Mon, Thu, Sun, Wed, Sat, ... Friend C (every 4 days): Mon, Fri, Tue, Sat, ... All are together on Monday and Saturday. ✓',
              explanation: 'For multiple cycles, we find the LCM of all the cycle lengths. The LCM of 2, 3, and 4 is 12, meaning after 12 days, all cycles align. To find the day of the week, we divide 12 by 7 (days in a week) and use the remainder to count forward from the starting day.',
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
              question: 'If n is an integer, which of the following expressions MUST be even? A) n²+n+1  B) n(n+1)  C) n²+1  D) 2n+1',
              solution: 'Step 1: Understand the problem. We need to find which expression is ALWAYS even, regardless of what integer n is. Step 2: Test option A: n²+n+1. Test n=1: 1²+1+1 = 1+1+1 = 3 (odd). Since we found one case where it\'s odd, A is NOT always even. Step 3: Test option B: n(n+1). This is the product of two consecutive integers. For any integer n, either n is even or n+1 is even (consecutive integers always include one even number). The product of an even number with any integer is always even. Therefore, n(n+1) is ALWAYS even. Step 4: Verify with test cases. Test n=0: 0(0+1) = 0 (even). Test n=1: 1(2) = 2 (even). Test n=2: 2(3) = 6 (even). Test n=-1: (-1)(0) = 0 (even). All cases give even results. Step 5: Check other options to confirm. Option C: n²+1. Test n=1: 1+1=2 (even), but test n=2: 4+1=5 (odd). Not always even. Option D: 2n+1. This is always odd (2n is always even, even+1=odd). Step 6: Final answer. B) n(n+1) is the only expression that MUST be even for all integers n.',
              explanation: 'The key insight is recognizing that n(n+1) represents the product of two consecutive integers. Consecutive integers always include one even number, and multiplying any number by an even number results in an even product. This is a fundamental property that makes this expression always even, regardless of whether n itself is even or odd.',
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
              question: 'Solve the inequality: 3 − 2x ≤ 7',
              solution: 'Step 1: Start with the given inequality. 3 − 2x ≤ 7. Step 2: Isolate the term with x. We need to get x by itself. First, subtract 3 from both sides to move the constant term. 3 − 2x − 3 ≤ 7 − 3. This simplifies to: −2x ≤ 4. Step 3: Divide both sides by −2 to solve for x. Here is the CRITICAL step: when dividing (or multiplying) both sides of an inequality by a NEGATIVE number, we must REVERSE the inequality sign. So: −2x ÷ (−2) ≥ 4 ÷ (−2). Notice the sign changed from ≤ to ≥. Step 4: Simplify both sides. x ≥ −2. Step 5: Verify the answer. Test x = −2 (boundary): 3 − 2(−2) = 3 + 4 = 7 ≤ 7 ✓. Test x = 0 (greater than −2): 3 − 2(0) = 3 ≤ 7 ✓. Test x = −3 (less than −2): 3 − 2(−3) = 3 + 6 = 9 ≤ 7 ✗. This confirms our answer is correct. Therefore, the solution is x ≥ −2.',
              explanation: 'The most critical point in solving this inequality is remembering to reverse the inequality sign when dividing by a negative number. This is a common mistake that leads to incorrect answers. The rule is: if a < b and c < 0, then ac > bc (the inequality reverses). Always check the sign of the number you\'re dividing by!',
            },
            {
              question: 'If x = 0.25, which is greater: x² or √x?',
              solution: 'Step 1: Understand the problem. We need to compare x² and √x when x = 0.25. Step 2: Calculate x². x² = (0.25)² = 0.25 × 0.25. To calculate: 0.25 × 0.25 = (25/100) × (25/100) = 625/10000 = 0.0625. Step 3: Calculate √x. √x = √0.25. We know that 0.25 = 1/4, and √(1/4) = 1/√4 = 1/2 = 0.5. Alternatively, we can think: what number squared equals 0.25? Since 0.5 × 0.5 = 0.25, we have √0.25 = 0.5. Step 4: Compare the values. x² = 0.0625 and √x = 0.5. Since 0.5 > 0.0625, we have √x > x². Step 5: Understand the general principle. For any number x where 0 < x < 1, we have: x² < x < √x. This is because squaring a number between 0 and 1 makes it smaller (multiplying two fractions less than 1), while taking the square root makes it larger (closer to 1). Therefore, √x > x².',
              explanation: 'This problem demonstrates an important property: for numbers between 0 and 1, squaring makes them smaller while taking the square root makes them larger. This is the opposite of what happens for numbers greater than 1. Understanding this property helps solve many comparison problems quickly.',
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
              solution: 'Step 1: Recall the divisibility rule for 3. A number is divisible by 3 if the sum of its digits is divisible by 3. Step 2: Find the sum of all digits. 4,572: 4 + 5 + 7 + 2 = 18. Step 3: Check if the sum is divisible by 3. 18 ÷ 3 = 6, so 18 is divisible by 3. Step 4: Apply the rule. Since the sum of digits (18) is divisible by 3, the original number (4,572) is also divisible by 3. Step 5: Verify (optional). 4,572 ÷ 3 = 1,524 ✓. Therefore, yes, 4,572 is divisible by 3.',
              explanation: 'The divisibility rule for 3 is simple: add all digits, and if that sum is divisible by 3, the original number is divisible by 3. This works because of the properties of the number system. This rule saves time compared to actually dividing the number.',
            },
            {
              question: 'Is 8,436 divisible by 4?',
              solution: 'Step 1: Recall the divisibility rule for 4. A number is divisible by 4 if the number formed by its last two digits is divisible by 4. Step 2: Identify the last two digits. For 8,436, the last two digits are 36. Step 3: Check if the last two digits form a number divisible by 4. 36 ÷ 4 = 9, so 36 is divisible by 4. Step 4: Apply the rule. Since the last two digits (36) form a number divisible by 4, the whole number (8,436) is divisible by 4. Step 5: Verify (optional). 8,436 ÷ 4 = 2,109 ✓. Therefore, yes, 8,436 is divisible by 4.',
              explanation: 'The divisibility rule for 4 only requires checking the last two digits. This is because 100 is divisible by 4, so any number can be written as (hundreds part × 100) + (last two digits), and since 100 is divisible by 4, only the last two digits matter. This makes checking divisibility by 4 very quick.',
            },
            {
              question: 'Which of the following numbers is divisible by 6? A) 234  B) 235  C) 237',
              solution: 'Step 1: Understand divisibility by 6. A number is divisible by 6 if it is divisible by BOTH 2 AND 3. This is because 6 = 2 × 3, and 2 and 3 are relatively prime. Step 2: Test option A) 234. Check divisibility by 2: Last digit is 4 (even) ✓, so 234 is divisible by 2. Check divisibility by 3: Sum of digits = 2 + 3 + 4 = 9. Since 9 is divisible by 3, 234 is divisible by 3 ✓. Since 234 is divisible by both 2 and 3, it is divisible by 6. Step 3: Test option B) 235. Check divisibility by 2: Last digit is 5 (odd) ✗, so 235 is NOT divisible by 2. Since it fails the first condition, 235 is NOT divisible by 6. Step 4: Test option C) 237. Check divisibility by 2: Last digit is 7 (odd) ✗, so 237 is NOT divisible by 2. Since it fails the first condition, 237 is NOT divisible by 6. Step 5: Final answer. Only option A) 234 is divisible by 6. Step 6: Verify. 234 ÷ 6 = 39 ✓.',
              explanation: 'For divisibility by composite numbers like 6, check divisibility by its prime factors (2 and 3). Both conditions must be satisfied. Always check the easier condition first (divisibility by 2 is just checking if the last digit is even).',
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
              question: 'Evaluate the expression: 8 + 2 × 3²',
              solution: 'Step 1: Recall PEMDAS order. Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right). Step 2: Identify operations. We have: addition (+), multiplication (×), and exponent (²). Step 3: Apply exponents first (E in PEMDAS). 3² = 3 × 3 = 9. The expression becomes: 8 + 2 × 9. Step 4: Apply multiplication before addition (M before A). 2 × 9 = 18. The expression becomes: 8 + 18. Step 5: Perform addition. 8 + 18 = 26. Step 6: Common mistake to avoid. Many people incorrectly do: (8 + 2) × 3² = 10 × 9 = 90. This is WRONG because it ignores the order of operations. Step 7: Final answer. Therefore, 8 + 2 × 3² = 26.',
              explanation: 'Order of operations is critical! Exponents come before multiplication, and multiplication comes before addition. The common mistake is doing addition first, which gives the wrong answer. Always follow PEMDAS systematically.',
            },
            {
              question: 'Evaluate the expression: 20 − 8 ÷ 2 × 3',
              solution: 'Step 1: Identify operations. We have: subtraction (−), division (÷), and multiplication (×). Step 2: Apply PEMDAS. There are no parentheses or exponents, so we move to multiplication and division. Step 3: Important rule: Multiplication and division have the SAME priority. When operations have the same priority, work from LEFT TO RIGHT. Step 4: Work left to right. Starting from the left: 8 ÷ 2 comes first. 8 ÷ 2 = 4. The expression becomes: 20 − 4 × 3. Step 5: Continue left to right. Next is: 4 × 3 = 12. The expression becomes: 20 − 12. Step 6: Perform subtraction. 20 − 12 = 8. Step 7: Common mistake. Some people incorrectly do: 20 − (8 ÷ 2 × 3) = 20 − 12 = 8 (this happens to be correct by coincidence), but the wrong approach is: 20 − 8 ÷ (2 × 3) = 20 − 8 ÷ 6 = 20 − 1.33... which is wrong. Step 8: Final answer. Therefore, 20 − 8 ÷ 2 × 3 = 8.',
              explanation: 'When multiplication and division appear together, they have equal priority and must be done from left to right. This is a common source of errors. Always work systematically from left to right for operations with the same priority.',
            },
            {
              question: 'Evaluate the expression: 2(3 + 4)²',
              solution: 'Step 1: Identify operations. We have: parentheses, exponent, and multiplication. Step 2: Apply PEMDAS order. P (Parentheses) comes first, then E (Exponents), then M (Multiplication). Step 3: Evaluate parentheses first (P in PEMDAS). (3 + 4) = 7. The expression becomes: 2(7)², which is the same as 2 × 7². Step 4: Apply exponent next (E in PEMDAS). 7² = 7 × 7 = 49. The expression becomes: 2 × 49. Step 5: Perform multiplication (M in PEMDAS). 2 × 49 = 98. Step 6: Common mistake. Some people incorrectly do: 2(3 + 4)² = 2(7)² = 14² = 196. This is WRONG because it multiplies before applying the exponent. The exponent applies only to what\'s inside the parentheses, not to the 2. Step 7: Final answer. Therefore, 2(3 + 4)² = 98.',
              explanation: 'Parentheses must be evaluated first, then exponents, then multiplication. The exponent applies to the value inside the parentheses (7), not to the entire expression. Always follow PEMDAS order strictly.',
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
              question: 'Solve the equation: |x − 3| = 5',
              solution: 'Step 1: Understand absolute value. The absolute value |x − 3| represents the distance from x to 3 on the number line. If this distance equals 5, then x is either 5 units to the right of 3 or 5 units to the left of 3. Step 2: Set up two cases. When |expression| = a (where a > 0), we have two possibilities: expression = a OR expression = −a. So: |x − 3| = 5 means: x − 3 = 5 OR x − 3 = −5. Step 3: Solve Case 1: x − 3 = 5. Add 3 to both sides: x − 3 + 3 = 5 + 3, which gives: x = 8. Step 4: Solve Case 2: x − 3 = −5. Add 3 to both sides: x − 3 + 3 = −5 + 3, which gives: x = −2. Step 5: Verify both solutions. Check x = 8: |8 − 3| = |5| = 5 ✓. Check x = −2: |−2 − 3| = |−5| = 5 ✓. Step 6: Final answer. The solutions are x = 8 or x = −2.',
              explanation: 'Absolute value equations always have two cases when the right side is positive. The expression inside the absolute value can equal either the positive or negative value on the right side. Always check both solutions to verify they work.',
            },
            {
              question: 'Solve the inequality: |2x + 1| < 7',
              solution: 'Step 1: Understand the inequality. |2x + 1| < 7 means the distance from (2x + 1) to 0 is less than 7. This means (2x + 1) is between −7 and 7. Step 2: Convert to compound inequality. When |expression| < a (where a > 0), we have: −a < expression < a. So: |2x + 1| < 7 becomes: −7 < 2x + 1 < 7. Step 3: Solve the compound inequality. We need to isolate x in the middle. Subtract 1 from all three parts: −7 − 1 < 2x + 1 − 1 < 7 − 1. This gives: −8 < 2x < 6. Step 4: Divide all three parts by 2. Since 2 is positive, the inequality signs do NOT reverse: −8 ÷ 2 < 2x ÷ 2 < 6 ÷ 2. This gives: −4 < x < 3. Step 5: Interpret the solution. This means x is greater than −4 AND less than 3. In interval notation: (−4, 3). Step 6: Verify with test values. Test x = 0 (in range): |2(0) + 1| = |1| = 1 < 7 ✓. Test x = −4 (boundary): |2(−4) + 1| = |−7| = 7, NOT < 7 ✗ (boundary not included). Test x = 3 (boundary): |2(3) + 1| = |7| = 7, NOT < 7 ✗ (boundary not included). Test x = −5 (outside): |2(−5) + 1| = |−9| = 9, NOT < 7 ✗. Therefore, the solution is −4 < x < 3.',
              explanation: 'For absolute value inequalities with <, we convert to a compound inequality: −a < expression < a. Then we solve this compound inequality by performing the same operations on all three parts. Remember: only reverse inequality signs when multiplying or dividing by a negative number.',
            },
            {
              question: 'Calculate: |−15| + |−8|',
              solution: 'Step 1: Understand absolute value. The absolute value of a number is its distance from 0 on the number line, which is always non-negative. Step 2: Calculate |−15|. The absolute value of −15 is 15, because −15 is 15 units away from 0. So: |−15| = 15. Step 3: Calculate |−8|. The absolute value of −8 is 8, because −8 is 8 units away from 0. So: |−8| = 8. Step 4: Add the results. |−15| + |−8| = 15 + 8 = 23. Step 5: Final answer. Therefore, |−15| + |−8| = 23.',
              explanation: 'Absolute value always returns a non-negative number. For negative numbers, the absolute value is the positive version of that number. For positive numbers, the absolute value is the number itself. The absolute value of 0 is 0.',
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
          why: 'Recognizing patterns helps find missing terms quickly and solve sequence problems efficiently. Sequences appear in many word problems involving time, growth, or patterns.',
          when: 'Use when: finding missing terms in sequences, determining nth term, solving pattern problems, or word problems involving sequences (like savings, population growth, or repeating patterns).',
          where: 'Applied in: number theory problems, pattern recognition, word problems about savings, population growth, geometric patterns, and time-based sequences.',
          conditions: [
            'Arithmetic sequence: Add same number each time (common difference d)',
            'Geometric sequence: Multiply by same number each time (common ratio r)',
            'Arithmetic nth term: aₙ = a₁ + (n−1)d',
            'Geometric nth term: aₙ = a₁ × rⁿ⁻¹',
            'Sum of arithmetic: Sₙ = n/2 × (first + last)',
            'To identify: Check if difference between consecutive terms is constant (arithmetic) or ratio is constant (geometric)',
          ],
          formula: 'Arithmetic: aₙ = a₁ + (n−1)d   |   Geometric: aₙ = a₁ × rⁿ⁻¹',
          examples: [
            {
              question: 'Find the 10th term in the sequence: 5, 8, 11, 14, ...',
              solution: 'Step 1: Identify the pattern. Look at differences: 8−5=3, 11−8=3, 14−11=3. Since the difference is constant (3), this is an arithmetic sequence. Step 2: Identify first term (a₁) and common difference (d). a₁ = 5 (the first number), d = 3 (the constant difference). Step 3: Use the arithmetic formula: aₙ = a₁ + (n−1)d. For the 10th term: a₁₀ = 5 + (10−1)×3. Step 4: Calculate inside parentheses first: (10−1) = 9. Step 5: Multiply: 9 × 3 = 27. Step 6: Add: 5 + 27 = 32. Therefore, the 10th term is 32.',
              explanation: 'This is an arithmetic sequence because we add the same number (3) each time. The formula aₙ = a₁ + (n−1)d works by starting with the first term (5), then adding the common difference (3) multiplied by (n−1) times. For the 10th term, we add 3 a total of (10−1) = 9 times, giving us 5 + 27 = 32.',
            },
            {
              question: 'Find the 6th term in the sequence: 2, 6, 18, 54, ...',
              solution: 'Step 1: Identify the pattern. Check ratios: 6÷2=3, 18÷6=3, 54÷18=3. Since the ratio is constant (3), this is a geometric sequence. Step 2: Identify first term (a₁) and common ratio (r). a₁ = 2 (the first number), r = 3 (each term is multiplied by 3). Step 3: Use the geometric formula: aₙ = a₁ × rⁿ⁻¹. For the 6th term: a₆ = 2 × 3⁶⁻¹. Step 4: Calculate the exponent: 6−1 = 5, so we need 3⁵. Step 5: Calculate 3⁵ step by step: 3¹=3, 3²=9, 3³=27, 3⁴=81, 3⁵=243. Step 6: Multiply: 2 × 243 = 486. Therefore, the 6th term is 486.',
              explanation: 'This is a geometric sequence because we multiply by the same number (3) each time. The formula aₙ = a₁ × rⁿ⁻¹ means we start with the first term (2) and multiply by the common ratio (3) raised to the power of (n−1). For the 6th term, we multiply by 3 raised to the 5th power (3⁵ = 243), giving us 2 × 243 = 486.',
            },
            {
              question: 'Find the sum of the first 10 terms in the sequence: 3, 7, 11, 15, ...',
              solution: 'Step 1: Identify the sequence type. Differences: 7−3=4, 11−7=4, 15−11=4. Constant difference = 4, so this is arithmetic. Step 2: Identify values. First term a₁ = 3, common difference d = 4. Step 3: Find the 10th term using a₁₀ = a₁ + (10−1)d = 3 + 9×4 = 3 + 36 = 39. Step 4: Use the sum formula: Sₙ = n/2 × (first + last). For 10 terms: S₁₀ = 10/2 × (3 + 39). Step 5: Calculate: 10/2 = 5, and 3 + 39 = 42. Step 6: Multiply: 5 × 42 = 210. Therefore, the sum of the first 10 terms is 210.',
              explanation: 'For arithmetic sequences, the sum formula Sₙ = n/2 × (first + last) works because we can pair terms from the beginning and end that add to the same value. We need both the first term (3) and the last term (the 10th term, which is 39). Then we multiply the average of these two terms by the number of terms (10), giving us 5 × 42 = 210.',
            },
            {
              question: 'Sarah saves money each month. In January she saves $50, in February $75, in March $100, and continues this pattern. How much will she save in August (the 8th month)?',
              solution: 'Step 1: Understand the problem. January = $50, February = $75, March = $100. Step 2: Identify the pattern. Differences: 75−50=25, 100−75=25. Constant difference of $25 means this is an arithmetic sequence. Step 3: Set up the sequence. Month 1 (January) = $50, so a₁ = 50. Common difference d = 25. Step 4: Find August (8th month). Use formula: a₈ = a₁ + (8−1)×d = 50 + 7×25. Step 5: Calculate: 7 × 25 = 175. Step 6: Add: 50 + 175 = 225. Therefore, Sarah will save $225 in August.',
              explanation: 'This is a word problem involving an arithmetic sequence. Each month, Sarah increases her savings by $25. January is month 1 with $50. To find August (month 8), we add the common difference ($25) seven times to the first month\'s amount, giving us $50 + $175 = $225.',
            },
            {
              question: 'A bacteria culture doubles every hour. If there are 100 bacteria at the start, how many will there be after 6 hours?',
              solution: 'Step 1: Understand the problem. Starting amount = 100 bacteria. It doubles every hour, so this is a geometric sequence. Step 2: Identify the pattern. After 1 hour: 100 × 2 = 200. After 2 hours: 200 × 2 = 400. The ratio is 2 (doubling). Step 3: Set up the sequence. First term a₁ = 100, common ratio r = 2. Step 4: Find the amount after 6 hours (this is the 7th term: hour 0 = 100, hour 1 = 200, ..., hour 6 = 7th term). Use formula: a₇ = a₁ × r⁷⁻¹ = 100 × 2⁶. Step 5: Calculate 2⁶ step by step: 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64. Step 6: Multiply: 100 × 64 = 6,400. Therefore, there will be 6,400 bacteria after 6 hours.',
              explanation: 'This is a geometric sequence because we multiply by the same number (2) each hour. Starting with 100, after 6 hours we have multiplied by 2 a total of 6 times, which is 2⁶ = 64. So 100 × 64 = 6,400 bacteria.',
            },
            {
              question: 'A staircase has steps numbered 1, 2, 3, ... The height of step n is given by the formula: height = 2n + 1 centimeters. What is the height of step 15?',
              solution: 'Step 1: Understand the problem. We have a formula: height = 2n + 1, where n is the step number. Step 2: Identify this creates a sequence. For step 1: 2(1)+1 = 3 cm. For step 2: 2(2)+1 = 5 cm. For step 3: 2(3)+1 = 7 cm. This is arithmetic with first term 3 and difference 2. Step 3: Find step 15. We can use the formula directly: height = 2(15) + 1. Step 4: Calculate: 2 × 15 = 30. Step 5: Add: 30 + 1 = 31. Therefore, step 15 has a height of 31 centimeters.',
              explanation: 'This problem gives us a formula that generates an arithmetic sequence. Each step increases by 2 cm from the previous step. For step 15, we substitute n=15 into the formula: 2(15)+1 = 30+1 = 31 cm. We can verify this is arithmetic: the sequence is 3, 5, 7, 9, ... with common difference 2.',
            },
          ],
          commonMistakes: [
            'Confusing arithmetic and geometric sequences - always check if you add (arithmetic) or multiply (geometric)',
            'Using wrong formula for nth term - remember arithmetic uses addition, geometric uses multiplication',
            'Not identifying the pattern correctly - calculate differences for arithmetic, ratios for geometric',
            'Forgetting to count the first term correctly - if something happens "after n periods", check if you need term n or term n+1',
            'Making calculation errors with exponents in geometric sequences - work step by step',
          ],
          tips: [
            'Check if adding (arithmetic) or multiplying (geometric) - calculate a few differences or ratios to be sure',
            'Find common difference or ratio first - this is the key to identifying the sequence type',
            'Use formulas once pattern is identified - don\'t try to list all terms for large n',
            'For word problems, identify what represents the "nth term" - is it time, position, or something else?',
            'Double-check your work by calculating a few terms manually to verify your formula',
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
              question: 'On a number line, what is the distance between −5 and 3?',
              solution: 'Step 1: Understand distance. Distance is always a positive value representing how far apart two numbers are on the number line. Step 2: Use the distance formula. Distance between two numbers a and b is: |a − b| or |b − a| (both give the same result). Step 3: Apply the formula. Distance = |3 − (−5)|. Step 4: Simplify inside the absolute value. 3 − (−5) = 3 + 5 = 8. Step 5: Apply absolute value. |8| = 8. Step 6: Verify. We can also use: |−5 − 3| = |−8| = 8 ✓. Both methods give the same answer. Step 7: Visualize on number line. On a number line, −5 is 5 units left of 0, and 3 is 3 units right of 0. The distance from −5 to 0 is 5, and from 0 to 3 is 3, so total distance = 5 + 3 = 8 ✓. Step 8: Final answer. Therefore, the distance between −5 and 3 is 8 units.',
              explanation: 'Distance is always positive and represents the absolute difference between two numbers. The formula |a − b| works regardless of which number is larger. Distance can never be negative.',
            },
            {
              question: 'Represent the inequality −2 < x ≤ 4 on a number line.',
              solution: 'Step 1: Understand the inequality. −2 < x ≤ 4 means: x is greater than −2 AND x is less than or equal to 4. This is a compound inequality. Step 2: Identify the boundaries. Lower boundary: x = −2 (not included, because of <). Upper boundary: x = 4 (included, because of ≤). Step 3: Draw the number line. Draw a horizontal line with numbers marked. Step 4: Mark the lower boundary (−2). Since −2 < x (strict inequality, not ≤), −2 is NOT included. Use an OPEN circle (or parenthesis) at −2. Step 5: Mark the upper boundary (4). Since x ≤ 4 (includes equality), 4 IS included. Use a CLOSED circle (or bracket) at 4. Step 6: Shade the region. Shade the region between −2 and 4, including all numbers greater than −2 and less than or equal to 4. Step 7: Verify with test points. Test x = 0 (should be included): −2 < 0 ≤ 4 ✓. Test x = −2 (should NOT be included): −2 < −2 is false ✗. Test x = 4 (should be included): −2 < 4 ≤ 4 ✓. Test x = 5 (should NOT be included): 5 ≤ 4 is false ✗. Step 8: Final representation. On the number line: Open circle at −2, closed circle at 4, with the line between them shaded. In interval notation: (−2, 4].',
              explanation: 'Inequalities on number lines: < or > use open circles (not included), ≤ or ≥ use closed circles (included). Always test boundary points to verify. The shading shows all numbers that satisfy the inequality.',
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
              question: 'Estimate the sum: 487 + 623',
              solution: 'Step 1: Understand estimation. Estimation gives a quick approximate answer, not the exact value. It\'s useful for checking if an answer is reasonable. Step 2: Round each number to the nearest hundred. 487: The tens digit is 8, which is ≥ 5, so round up. 487 rounds to 500. 623: The tens digit is 2, which is < 5, so round down. 623 rounds to 600. Step 3: Add the rounded numbers. 500 + 600 = 1,100. Step 4: Compare with actual answer. Actual: 487 + 623 = 1,110. Our estimate: 1,100. The estimate is very close (only 10 off), which is good! Step 5: Interpret. The estimate of 1,100 is within 1% of the actual answer (1,110), which is excellent for a quick mental calculation. Therefore, the estimated sum is 1,100 (actual: 1,110).',
              explanation: 'For addition, round all numbers to the same place value (hundreds, tens, etc.), then add. Rounding to the nearest hundred gives a good balance between accuracy and simplicity. The estimate helps verify that your exact calculation is reasonable.',
            },
            {
              question: 'Estimate the product: 23 × 48',
              solution: 'Step 1: Understand estimation for multiplication. For multiplication, we can round to make calculation easier. Step 2: Round strategically. For multiplication, it\'s often better to round one number up and one down to balance errors. 23: Round to 20 (round down by 3). 48: Round to 50 (round up by 2). Step 3: Multiply the rounded numbers. 20 × 50 = 1,000. Step 4: Compare with actual answer. Actual: 23 × 48 = 1,104. Our estimate: 1,000. The estimate is close (only 104 off, about 9.4% error). Step 5: Why this method works. By rounding one up and one down, the errors partially cancel each other out. If we had rounded both down (20 × 40 = 800) or both up (30 × 50 = 1,500), the error would be larger. Step 6: Final answer. Therefore, the estimated product is 1,000 (actual: 1,104).',
              explanation: 'For multiplication, rounding one number up and one down helps balance errors. This is because the errors multiply together, so having opposite errors (one too high, one too low) partially cancels them out. This gives better estimates than rounding both in the same direction.',
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
              question: 'Add the decimals: 12.45 + 3.7',
              solution: 'Step 1: Understand the problem. We need to add two decimal numbers. Step 2: Align decimal points. For addition and subtraction, decimal points must be aligned vertically. Write: 12.45 + 3.7. Step 3: Add zeros to make decimal places match. 3.7 has one decimal place, while 12.45 has two. Add a zero to 3.7: 3.7 = 3.70. This doesn\'t change the value (3.7 = 3.70). Step 4: Write vertically with aligned decimals. 12.45 + 3.70. Step 5: Add column by column from right to left. Start with the rightmost column (hundredths): 5 + 0 = 5. Next column (tenths): 4 + 7 = 11. Write 1, carry 1. Next column (ones): 2 + 3 + 1 (carry) = 6. Next column (tens): 1 + 0 = 1. Step 6: Place the decimal point. The decimal point goes directly below the aligned decimal points. Result: 16.15. Step 7: Verify. 12.45 + 3.70 = 16.15 ✓. Therefore, 12.45 + 3.7 = 16.15.',
              explanation: 'The key to decimal addition is aligning decimal points. You can add zeros after the decimal point to make the number of decimal places match - this doesn\'t change the value. Then add column by column, just like whole number addition, making sure to place the decimal point in the correct position.',
            },
            {
              question: 'Multiply the decimals: 2.5 × 0.4',
              solution: 'Step 1: Understand the problem. We need to multiply two decimal numbers. Step 2: Count decimal places. 2.5 has 1 decimal place. 0.4 has 1 decimal place. Total decimal places = 1 + 1 = 2. Step 3: Multiply as if they were whole numbers. Ignore the decimal points temporarily: 25 × 4 = 100. Step 4: Place the decimal point. Since we need 2 decimal places total, count 2 places from the right in the product (100). 100 with 2 decimal places = 1.00. Step 5: Simplify if possible. 1.00 = 1.0 = 1. However, 1.00 is also correct. Step 6: Verify. 2.5 × 0.4. We can think: 2.5 × 0.4 = (25/10) × (4/10) = 100/100 = 1 ✓. Therefore, 2.5 × 0.4 = 1.00 (or simply 1).',
              explanation: 'For decimal multiplication, multiply as if they were whole numbers, then count the total number of decimal places in both factors and place the decimal point that many places from the right in the product. This is much easier than trying to work with decimals during multiplication.',
            },
            {
              question: 'Divide the decimals: 12.6 ÷ 0.3',
              solution: 'Step 1: Understand the problem. We need to divide 12.6 by 0.3. Step 2: Convert divisor to whole number. For division, we want the divisor (0.3) to be a whole number. To do this, move the decimal point one place to the right: 0.3 becomes 3. Step 3: Move decimal in dividend by same amount. Since we moved the divisor\'s decimal 1 place right, we must move the dividend\'s decimal 1 place right as well: 12.6 becomes 126. Step 4: Perform the division. Now we have: 126 ÷ 3. 126 ÷ 3 = 42. Step 5: Verify. Check: 42 × 0.3 = 12.6 ✓. We can also verify: 12.6 ÷ 0.3 = (12.6/0.3) = (126/3) = 42 ✓. Therefore, 12.6 ÷ 0.3 = 42.',
              explanation: 'For decimal division, move the decimal point in the divisor to make it a whole number, then move the decimal point in the dividend the same number of places. This is equivalent to multiplying both numbers by the same power of 10, which doesn\'t change the quotient. This makes division much easier.',
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
              question: 'Add the fractions: 1/3 + 1/4',
              solution: 'Step 1: Understand the problem. We need to add two fractions with different denominators. Step 2: Find a common denominator. To add fractions, they must have the same denominator. We need the LCM (Least Common Multiple) of 3 and 4. The multiples of 3 are: 3, 6, 9, 12, 15, ... The multiples of 4 are: 4, 8, 12, 16, ... The LCM is 12. Step 3: Convert first fraction to denominator 12. 1/3 = ?/12. Since 3 × 4 = 12, multiply numerator and denominator by 4: 1/3 = (1 × 4)/(3 × 4) = 4/12. Step 4: Convert second fraction to denominator 12. 1/4 = ?/12. Since 4 × 3 = 12, multiply numerator and denominator by 3: 1/4 = (1 × 3)/(4 × 3) = 3/12. Step 5: Add the fractions. Now both have denominator 12: 4/12 + 3/12 = (4 + 3)/12 = 7/12. Step 6: Check if simplification is needed. 7/12 is already in simplest form (7 and 12 have no common factors other than 1). Step 7: Verify. 1/3 = 4/12 ≈ 0.333, 1/4 = 3/12 = 0.25, sum = 7/12 ≈ 0.583. Also, 1/3 + 1/4 = 4/12 + 3/12 = 7/12 ✓. Therefore, 1/3 + 1/4 = 7/12.',
              explanation: 'To add fractions with different denominators, find a common denominator (preferably the LCM), convert each fraction to that denominator, then add the numerators while keeping the denominator the same. Never add denominators directly - this is a common mistake!',
            },
            {
              question: 'Multiply the fractions: 2/3 × 3/5',
              solution: 'Step 1: Understand the problem. We need to multiply two fractions. Step 2: Recall the multiplication rule. To multiply fractions, multiply the numerators together and multiply the denominators together. Step 3: Multiply numerators. Numerator: 2 × 3 = 6. Step 4: Multiply denominators. Denominator: 3 × 5 = 15. Step 5: Write the product. 2/3 × 3/5 = 6/15. Step 6: Simplify the fraction. Find the GCD of 6 and 15. Factors of 6: 1, 2, 3, 6. Factors of 15: 1, 3, 5, 15. GCD = 3. Divide both numerator and denominator by 3: 6/15 = (6 ÷ 3)/(15 ÷ 3) = 2/5. Step 7: Verify. 2/3 × 3/5 = (2 × 3)/(3 × 5) = 6/15 = 2/5. We can also verify: 2/3 ≈ 0.667, 3/5 = 0.6, product = 0.4, and 2/5 = 0.4 ✓. Therefore, 2/3 × 3/5 = 2/5.',
              explanation: 'Fraction multiplication is straightforward: multiply numerators and multiply denominators. Always simplify the result to lowest terms. Notice that we could have simplified before multiplying: 2/3 × 3/5, the 3 in numerator and denominator cancel, giving 2/5 directly.',
            },
            {
              question: 'Divide the fractions: 3/4 ÷ 2/5',
              solution: 'Step 1: Understand the problem. We need to divide 3/4 by 2/5. Step 2: Recall the division rule. To divide fractions, multiply by the reciprocal (flip) of the second fraction. The reciprocal of a/b is b/a. Step 3: Find the reciprocal of the divisor. The divisor is 2/5. Its reciprocal is 5/2 (flip numerator and denominator). Step 4: Change division to multiplication. 3/4 ÷ 2/5 = 3/4 × 5/2. Step 5: Multiply the fractions. Multiply numerators: 3 × 5 = 15. Multiply denominators: 4 × 2 = 8. So: 3/4 × 5/2 = 15/8. Step 6: Convert to mixed number (if needed). 15/8 is an improper fraction. Divide: 15 ÷ 8 = 1 remainder 7. So: 15/8 = 1 7/8. Step 7: Verify. Check: (1 7/8) × (2/5) = (15/8) × (2/5) = 30/40 = 3/4 ✓. Also, 3/4 ÷ 2/5 = (3/4) × (5/2) = 15/8 = 1.875, and 3/4 = 0.75, 2/5 = 0.4, so 0.75 ÷ 0.4 = 1.875 ✓. Therefore, 3/4 ÷ 2/5 = 15/8 = 1 7/8.',
              explanation: 'Division of fractions is done by multiplying by the reciprocal. The reciprocal is found by flipping the numerator and denominator. This is much easier than trying to divide fractions directly. Always remember: "flip and multiply" for fraction division.',
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
              solution: 'Step 1: Understand scientific notation format. Scientific notation is written as a × 10ⁿ, where 1 ≤ a < 10 and n is an integer. Step 2: Identify the current decimal position. 45,000 = 45000.0 (the decimal point is after the last zero). Step 3: Move the decimal point to create a number between 1 and 10. We need to move the decimal point left until we have a number between 1 and 10. Starting from 45000.0, move left: 4500.0 (1 place), 450.0 (2 places), 45.0 (3 places), 4.5 (4 places). We stop at 4.5 because it\'s between 1 and 10. Step 4: Count how many places we moved. We moved the decimal point 4 places to the left. Step 5: Determine the exponent. Since we moved left (making the number smaller), we need a positive exponent to compensate. The exponent is +4. Step 6: Write in scientific notation. 45,000 = 4.5 × 10⁴. Step 7: Verify. 4.5 × 10⁴ = 4.5 × 10,000 = 45,000 ✓. Therefore, 45,000 = 4.5 × 10⁴.',
              explanation: 'For large numbers, move the decimal point left to create a number between 1 and 10. The number of places moved left becomes the positive exponent. The coefficient must be between 1 and 10 (1 ≤ coefficient < 10).',
            },
            {
              question: 'Express 0.00032 in scientific notation',
              solution: 'Step 1: Understand the number. We have a very small number: 0.00032. Step 2: Identify the current decimal position. The decimal point is before the first non-zero digit. Step 3: Move the decimal point to create a number between 1 and 10. We need to move the decimal point right until we have a number between 1 and 10. Starting from 0.00032, move right: 0.0032 (1 place), 0.032 (2 places), 0.32 (3 places), 3.2 (4 places). We stop at 3.2 because it\'s between 1 and 10. Step 4: Count how many places we moved. We moved the decimal point 4 places to the right. Step 5: Determine the exponent. Since we moved right (making the number larger), we need a negative exponent to compensate. The exponent is −4. Step 6: Write in scientific notation. 0.00032 = 3.2 × 10⁻⁴. Step 7: Verify. 3.2 × 10⁻⁴ = 3.2 × 0.0001 = 0.00032 ✓. Therefore, 0.00032 = 3.2 × 10⁻⁴.',
              explanation: 'For small numbers (less than 1), move the decimal point right to create a number between 1 and 10. The number of places moved right becomes the negative exponent. This makes very small numbers easier to work with.',
            },
            {
              question: 'Multiply: (2 × 10³) × (3 × 10⁵)',
              solution: 'Step 1: Understand the problem. We need to multiply two numbers in scientific notation. Step 2: Recall the multiplication rule. When multiplying numbers in scientific notation: (a × 10ᵐ) × (b × 10ⁿ) = (a × b) × 10ᵐ⁺ⁿ. We multiply the coefficients and add the exponents. Step 3: Multiply the coefficients. Coefficient 1: 2, Coefficient 2: 3. Product: 2 × 3 = 6. Step 4: Add the exponents. Exponent 1: 3, Exponent 2: 5. Sum: 3 + 5 = 8. Step 5: Write the result. (2 × 10³) × (3 × 10⁵) = (2 × 3) × 10³⁺⁵ = 6 × 10⁸. Step 6: Verify. 2 × 10³ = 2,000, 3 × 10⁵ = 300,000. Product: 2,000 × 300,000 = 600,000,000 = 6 × 10⁸ ✓. Also, 6 × 10⁸ = 600,000,000 ✓. Therefore, (2 × 10³) × (3 × 10⁵) = 6 × 10⁸.',
              explanation: 'Multiplying numbers in scientific notation is easy: multiply the coefficients and add the exponents. This is much simpler than converting to standard form, multiplying, and converting back. The rule comes from the properties of exponents: 10ᵐ × 10ⁿ = 10ᵐ⁺ⁿ.',
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
              question: 'Simplify the square root: √72',
              solution: 'Step 1: Understand the goal. We want to simplify √72 by factoring out perfect squares. Step 2: Factor 72 to find perfect squares. Find the prime factorization or look for perfect square factors. 72 = 36 × 2 (since 36 is a perfect square: 6² = 36). We could also use: 72 = 9 × 8 = 9 × 4 × 2, but 36 × 2 is simpler. Step 3: Apply the square root property. Use the property: √(ab) = √a × √b (when a, b ≥ 0). So: √72 = √(36 × 2) = √36 × √2. Step 4: Simplify the perfect square. √36 = 6 (since 6² = 36). Step 5: Write the simplified form. √72 = 6 × √2 = 6√2. Step 6: Verify. Check: (6√2)² = 6² × (√2)² = 36 × 2 = 72 ✓. Also, √72 ≈ 8.485, and 6√2 = 6 × 1.414 ≈ 8.485 ✓. Therefore, √72 = 6√2.',
              explanation: 'To simplify square roots, factor the number under the radical to find perfect square factors. Then use the property √(ab) = √a × √b to separate them. The largest perfect square factor gives the simplest form. Remember: √(a+b) ≠ √a + √b (this is a common mistake!).',
            },
            {
              question: 'Simplify the square root: √(50/2)',
              solution: 'Step 1: Understand the problem. We have a square root of a fraction: √(50/2). Step 2: Method 1 - Simplify inside first. Simplify the fraction inside: 50/2 = 25. So: √(50/2) = √25 = 5. Step 3: Method 2 - Use the division property. We can also use the property: √(a/b) = √a / √b (when a, b > 0). So: √(50/2) = √50 / √2. Step 4: Simplify further if needed. √50 = √(25 × 2) = 5√2, and √2 = √2. So: √50 / √2 = (5√2) / √2 = 5 (since √2/√2 = 1). Step 5: Compare both methods. Method 1 (simplify first) is simpler: 50/2 = 25, √25 = 5. Method 2 also works but requires more steps. Step 6: Verify. Check: (5)² = 25, and 50/2 = 25, so √(50/2) = √25 = 5 ✓. Therefore, √(50/2) = 5.',
              explanation: 'When simplifying square roots of fractions, you can either simplify the fraction first (if possible) or use the property √(a/b) = √a / √b. Simplifying first is usually easier. Always check if the fraction can be reduced before applying square root properties.',
            },
            {
              question: 'Solve the equation: x² = 49',
              solution: 'Step 1: Understand the equation. We have x² = 49, which means x squared equals 49. Step 2: Take the square root of both sides. To solve for x, take the square root of both sides: √(x²) = √49. Step 3: Apply the square root property. √(x²) = |x| (absolute value of x), and √49 = 7. So: |x| = 7. Step 4: Consider both cases. Since |x| = 7, we have two possibilities: x = 7 OR x = −7. Step 5: Verify both solutions. Check x = 7: 7² = 49 ✓. Check x = −7: (−7)² = 49 ✓. Both solutions work. Step 6: Write the answer. The solutions are x = 7 or x = −7. We can also write: x = ±7 (where ± means "plus or minus"). Step 7: Common mistake. Many people forget the negative solution and only write x = 7. This is incorrect! When solving x² = a (where a > 0), there are always TWO solutions: x = √a and x = −√a. Therefore, x = ±7.',
              explanation: 'When solving x² = a (where a > 0), there are always two solutions: x = √a and x = −√a. This is because both positive and negative numbers, when squared, give positive results. Always remember the ± (plus or minus) sign when taking square roots to solve equations.',
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
              question: 'Find the cube root of 64: ∛64',
              solution: 'Step 1: Understand cube root. The cube root of a number x is the number that, when multiplied by itself three times, gives x. In other words, if y³ = x, then y = ∛x. Step 2: Recognize perfect cubes. We need to find what number cubed equals 64. Let\'s check: 1³ = 1, 2³ = 8, 3³ = 27, 4³ = 64. Step 3: Identify the answer. Since 4³ = 4 × 4 × 4 = 16 × 4 = 64, we have ∛64 = 4. Step 4: Verify. Check: 4³ = 4 × 4 × 4 = 64 ✓. Step 5: Final answer. Therefore, ∛64 = 4.',
              explanation: 'Perfect cubes to memorize: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³=216, 7³=343, 8³=512, 9³=729, 10³=1000. Recognizing these helps find cube roots quickly. Unlike square roots, cube roots of negative numbers are also real numbers.',
            },
            {
              question: 'Find the cube root of −125: ∛−125',
              solution: 'Step 1: Understand cube roots of negative numbers. Unlike square roots, cube roots of negative numbers are real numbers. This is because a negative number cubed gives a negative result: (−a)³ = −a³. Step 2: Find what number cubed equals −125. We know that 5³ = 125. So (−5)³ should equal −125. Let\'s verify: (−5)³ = (−5) × (−5) × (−5) = 25 × (−5) = −125 ✓. Step 3: Apply the cube root. Since (−5)³ = −125, we have ∛−125 = −5. Step 4: Important note. Unlike square roots (where √(−125) is not a real number), cube roots of negative numbers ARE real numbers. The cube root preserves the sign. Step 5: Verify. Check: (−5)³ = −125 ✓. Step 6: Final answer. Therefore, ∛−125 = −5.',
              explanation: 'Cube roots of negative numbers are negative. This is different from square roots: √(−125) is not a real number, but ∛−125 = −5 is real. The key: an odd root (cube, fifth, etc.) of a negative number is negative, while an even root (square, fourth, etc.) of a negative number is not a real number.',
            },
            {
              question: 'Simplify the expression: ∛(8 × 27)',
              solution: 'Step 1: Understand the problem. We need to find the cube root of the product 8 × 27. Step 2: Method 1 - Use the property. The cube root property states: ∛(ab) = ∛a × ∛b (when a, b are real numbers). So: ∛(8 × 27) = ∛8 × ∛27. Step 3: Find individual cube roots. ∛8 = 2 (since 2³ = 8). ∛27 = 3 (since 3³ = 27). Step 4: Multiply the results. ∛(8 × 27) = ∛8 × ∛27 = 2 × 3 = 6. Step 5: Method 2 - Verify by calculating directly. First, find 8 × 27 = 216. Then find ∛216. We know 6³ = 216, so ∛216 = 6. This matches our answer ✓. Step 6: Final answer. Therefore, ∛(8 × 27) = 6.',
              explanation: 'The property ∛(ab) = ∛a × ∛b allows us to simplify cube roots of products. This is similar to the square root property √(ab) = √a × √b. However, remember: ∛(a+b) ≠ ∛a + ∛b (this does NOT work for addition).',
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
              question: 'Which of the following numbers is irrational? A) 0.5  B) √4  C) √2  D) 3/4',
              solution: 'Step 1: Recall the definition. A rational number can be expressed as a fraction p/q where p and q are integers and q ≠ 0. An irrational number cannot be expressed as such a fraction. Step 2: Test option A) 0.5. 0.5 = 1/2, which is a fraction of two integers. Therefore, 0.5 is rational. Step 3: Test option B) √4. √4 = 2, which can be written as 2/1 (a fraction). Therefore, √4 is rational. Important: Not all square roots are irrational - only those that don\'t simplify to integers or fractions. Step 4: Test option C) √2. √2 ≈ 1.41421356... This is a non-terminating, non-repeating decimal. It cannot be expressed as a fraction of two integers. Therefore, √2 is irrational. Step 5: Test option D) 3/4. This is already written as a fraction of two integers. Therefore, 3/4 is rational. Step 6: Final answer. Therefore, only option C) √2 is irrational.',
              explanation: 'Rational numbers can be written as fractions. Irrational numbers cannot. Common irrationals include √2, √3, π, and e. However, √4 = 2 is rational because it simplifies to an integer. The key is whether the number can be expressed as a fraction, not whether it\'s written as one.',
            },
            {
              question: 'Is the decimal 0.333... (repeating) a rational or irrational number?',
              solution: 'Step 1: Understand repeating decimals. 0.333... means the digit 3 repeats infinitely: 0.3333333... Step 2: Recall the property. All repeating (or terminating) decimals can be expressed as fractions, which means they are rational numbers. Step 3: Convert to fraction. Let x = 0.333... Multiply both sides by 10: 10x = 3.333... Subtract the original equation: 10x − x = 3.333... − 0.333..., which gives: 9x = 3. Solve: x = 3/9 = 1/3. Step 4: Verify. Check: 1/3 = 0.333... ✓. Step 5: Apply the definition. Since 0.333... = 1/3, and 1/3 is a fraction of two integers (1 and 3), 0.333... is rational. Step 6: Final answer. Therefore, 0.333... is a rational number (it equals 1/3).',
              explanation: 'Any repeating or terminating decimal is rational because it can be converted to a fraction. The conversion method: let x equal the decimal, multiply by an appropriate power of 10, subtract, and solve. This works for any repeating decimal.',
            },
            {
              question: 'What is √2 + √2? Is the result rational or irrational?',
              solution: 'Step 1: Simplify the expression. √2 + √2 = 2√2 (combining like terms, just like 2x + 2x = 4x). Step 2: Determine if 2√2 is rational or irrational. We know that √2 is irrational (cannot be expressed as a fraction). Step 3: Apply the property. When you multiply a rational number (2) by an irrational number (√2), the result is irrational. Rational × Irrational = Irrational (unless the rational is 0). Step 4: Verify. If 2√2 were rational, then 2√2 = p/q for some integers p, q. Then √2 = p/(2q), which would make √2 rational. But we know √2 is irrational, so this is a contradiction. Therefore, 2√2 must be irrational. Step 5: Final answer. √2 + √2 = 2√2, and this is an irrational number.',
              explanation: 'The sum of two irrational numbers can be either rational or irrational. For example, √2 + (−√2) = 0 (rational), but √2 + √2 = 2√2 (irrational). When you multiply a non-zero rational by an irrational, the result is always irrational.',
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
              question: 'Which of the following numbers is prime? A) 1  B) 2  C) 4  D) 6',
              solution: 'Step 1: Recall the definition of prime. A prime number is a natural number greater than 1 that has exactly two distinct positive divisors: 1 and itself. Step 2: Test option A) 1. Factors of 1: Only 1 itself. Since 1 has only one factor (not two), 1 is NOT prime. Also, by definition, prime numbers must be greater than 1. Step 3: Test option B) 2. Factors of 2: 1 and 2. Since 2 has exactly two factors (1 and itself), 2 IS prime. Also, 2 is the only even prime number. Step 4: Test option C) 4. Factors of 4: 1, 2, and 4. Since 4 has more than two factors, 4 is NOT prime. 4 is composite. Step 5: Test option D) 6. Factors of 6: 1, 2, 3, and 6. Since 6 has more than two factors, 6 is NOT prime. 6 is composite. Step 6: Final answer. Therefore, only option B) 2 is prime.',
              explanation: 'Prime numbers have exactly two factors: 1 and the number itself. The number 1 is special - it is neither prime nor composite. The number 2 is the only even prime number. All other even numbers (4, 6, 8, etc.) are composite because they are divisible by 2.',
            },
            {
              question: 'What is the smallest composite number?',
              solution: 'Step 1: Recall the definition of composite. A composite number is a natural number greater than 1 that has more than two positive divisors (factors). Step 2: Check small numbers systematically. Start with 1: Has only 1 factor → Neither prime nor composite. Check 2: Factors are 1 and 2 (exactly 2 factors) → Prime, not composite. Check 3: Factors are 1 and 3 (exactly 2 factors) → Prime, not composite. Check 4: Factors are 1, 2, and 4 (3 factors, which is more than 2) → Composite! Step 3: Verify 4 is composite. 4 = 1 × 4 and 4 = 2 × 2, so it has factors: 1, 2, and 4. Since it has more than 2 factors, 4 is composite. Step 4: Confirm it\'s the smallest. Since 1, 2, and 3 are not composite, and 4 is composite, 4 is the smallest composite number. Step 5: Final answer. Therefore, the smallest composite number is 4.',
              explanation: 'Composite numbers have more than two factors. The first few natural numbers are: 1 (neither), 2 (prime), 3 (prime), 4 (composite - first one!). All numbers greater than 1 are either prime or composite, except 1 which is special.',
            },
            {
              question: 'Is 0 a natural number?',
              solution: 'Step 1: Understand number classifications. Natural numbers are the counting numbers used for counting objects. Step 2: Recall the definition. Natural numbers are the positive integers starting from 1: {1, 2, 3, 4, 5, ...}. Step 3: Check if 0 fits this definition. 0 is not a positive integer (it\'s neither positive nor negative). Natural numbers start from 1, not 0. Step 4: Understand where 0 belongs. 0 is a whole number. Whole numbers include 0 and all natural numbers: {0, 1, 2, 3, 4, ...}. Step 5: Final answer. Therefore, 0 is NOT a natural number. 0 is a whole number, but natural numbers start from 1.',
              explanation: 'Natural numbers = positive integers (1, 2, 3, ...). Whole numbers = natural numbers + 0 (0, 1, 2, 3, ...). Integers = whole numbers + negative numbers (..., -2, -1, 0, 1, 2, ...). This classification is important for number theory problems.',
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
              question: 'What is the remainder when 47 is divided by 5?',
              solution: 'Step 1: Understand division with remainder. When we divide a number by another, we get a quotient and a remainder. The relationship is: Dividend = Divisor × Quotient + Remainder, where 0 ≤ Remainder < Divisor. Step 2: Perform the division. 47 ÷ 5. How many times does 5 go into 47? 5 × 9 = 45, and 5 × 10 = 50 (too big). So the quotient is 9. Step 3: Calculate the remainder. 47 = 5 × 9 + Remainder. So: 47 = 45 + Remainder. Therefore: Remainder = 47 − 45 = 2. Step 4: Verify. Check: 47 = 5 × 9 + 2 = 45 + 2 = 47 ✓. Also, the remainder (2) is less than the divisor (5) ✓. Step 5: Final answer. Therefore, when 47 is divided by 5, the remainder is 2.',
              explanation: 'The remainder is what\'s left over after dividing as many times as possible. It must always be less than the divisor. The formula a = bq + r helps find remainders, where a is the dividend, b is the divisor, q is the quotient, and r is the remainder (0 ≤ r < b).',
            },
            {
              question: 'What is the remainder when 100 is divided by 7?',
              solution: 'Step 1: Set up the division. We need to find 100 ÷ 7. Step 2: Find the quotient. How many times does 7 go into 100? 7 × 14 = 98, and 7 × 15 = 105 (too big). So the quotient is 14. Step 3: Calculate the remainder. Using the formula: 100 = 7 × 14 + Remainder. So: 100 = 98 + Remainder. Therefore: Remainder = 100 − 98 = 2. Step 4: Verify. Check: 100 = 7 × 14 + 2 = 98 + 2 = 100 ✓. The remainder (2) is less than the divisor (7) ✓. Step 5: Alternative method. We can also think: 100 ÷ 7 = 14.2857... The whole number part is 14, and 100 − 7×14 = 100 − 98 = 2. Step 6: Final answer. Therefore, when 100 is divided by 7, the remainder is 2.',
              explanation: 'To find remainders, find the largest multiple of the divisor that doesn\'t exceed the dividend, subtract it, and what\'s left is the remainder. This is faster than doing long division completely.',
            },
            {
              question: 'If a number leaves a remainder of 3 when divided by 5, what are the possible remainders when this number is divided by 10?',
              solution: 'Step 1: Understand the problem. We know: Number mod 5 = 3 (remainder 3 when divided by 5). We need to find: Number mod 10 (possible remainders when divided by 10). Step 2: Find numbers that satisfy the first condition. Numbers that leave remainder 3 when divided by 5 are: 3, 8, 13, 18, 23, 28, 33, 38, ... (all numbers of the form 5k + 3, where k is an integer). Step 3: Check what remainders these give when divided by 10. Test 3: 3 ÷ 10 = 0 remainder 3. Test 8: 8 ÷ 10 = 0 remainder 8. Test 13: 13 ÷ 10 = 1 remainder 3. Test 18: 18 ÷ 10 = 1 remainder 8. Test 23: 23 ÷ 10 = 2 remainder 3. Test 28: 28 ÷ 10 = 2 remainder 8. Step 4: Identify the pattern. The remainders when divided by 10 alternate between 3 and 8. Step 5: Understand why. Numbers of the form 5k + 3: If k is even (k = 2m), then 5(2m) + 3 = 10m + 3, remainder = 3. If k is odd (k = 2m+1), then 5(2m+1) + 3 = 10m + 5 + 3 = 10m + 8, remainder = 8. Step 6: Final answer. Therefore, when a number with remainder 3 mod 5 is divided by 10, the possible remainders are 3 or 8.',
              explanation: 'This problem demonstrates modular arithmetic relationships. When a number has remainder r mod m, and we want to know its remainder mod n (where n is a multiple or factor of m), we need to check the pattern. In this case, numbers of form 5k+3 give remainders 3 or 8 when divided by 10, depending on whether k is even or odd.',
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
              question: 'Convert 2.5 kilometers to meters.',
              solution: 'Step 1: Identify the conversion. We need to convert from kilometers (km) to meters (m). Step 2: Recall the conversion factor. 1 kilometer = 1,000 meters. This means there are 1,000 meters in every kilometer. Step 3: Set up the conversion. Since we\'re going from a larger unit (km) to a smaller unit (m), we multiply. The conversion factor is: 1 km = 1,000 m, or written as a fraction: (1,000 m) / (1 km) = 1. Step 4: Multiply by the conversion factor. 2.5 km × (1,000 m / 1 km) = 2.5 × 1,000 m = 2,500 m. Notice that the "km" units cancel out, leaving "m". Step 5: Verify the answer makes sense. 2.5 km should be 2,500 m. Since meters are smaller than kilometers, we should have more meters than kilometers, which is correct (2,500 > 2.5) ✓. Step 6: Final answer. Therefore, 2.5 km = 2,500 m.',
              explanation: 'When converting from larger to smaller units, multiply. When converting from smaller to larger units, divide. Always check that your answer makes sense: larger unit = smaller number, smaller unit = larger number. Using conversion factors as fractions helps ensure units cancel correctly.',
            },
            {
              question: 'Convert 3 hours 25 minutes to total minutes.',
              solution: 'Step 1: Understand the problem. We have a mixed time: 3 hours and 25 minutes. We need to express this entirely in minutes. Step 2: Convert hours to minutes. 1 hour = 60 minutes. So: 3 hours = 3 × 60 minutes = 180 minutes. Step 3: Add the remaining minutes. We already have 25 minutes. Total minutes = 180 + 25 = 205 minutes. Step 4: Verify. Check: 205 minutes = 180 minutes (3 hours) + 25 minutes = 3 hours 25 minutes ✓. We can also verify: 205 ÷ 60 = 3 remainder 25, which means 3 hours and 25 minutes ✓. Step 5: Final answer. Therefore, 3 hours 25 minutes = 205 minutes.',
              explanation: 'For mixed units, convert each part separately, then combine. Always convert to the smaller unit first, then add. This method works for any mixed unit conversion (hours/minutes, km/m, etc.).',
            },
            {
              question: 'Convert 4,500 grams to kilograms.',
              solution: 'Step 1: Identify the conversion. We need to convert from grams (g) to kilograms (kg). Step 2: Recall the conversion factor. 1 kilogram = 1,000 grams. This means 1 kg contains 1,000 g. Step 3: Set up the conversion. Since we\'re going from a smaller unit (g) to a larger unit (kg), we divide. The conversion factor is: 1 kg = 1,000 g, or: 1 kg / 1,000 g = 1. Step 4: Divide by the conversion factor. 4,500 g ÷ 1,000 = 4.5 kg. Alternatively, using the fraction method: 4,500 g × (1 kg / 1,000 g) = 4,500 / 1,000 kg = 4.5 kg. Step 5: Verify the answer makes sense. 4,500 g should be 4.5 kg. Since kilograms are larger than grams, we should have fewer kilograms than grams, which is correct (4.5 < 4,500) ✓. Step 6: Verify by converting back. Check: 4.5 kg × 1,000 = 4,500 g ✓. Step 7: Final answer. Therefore, 4,500 g = 4.5 kg.',
              explanation: 'When converting from smaller to larger units, divide. When converting from larger to smaller units, multiply. A helpful trick: "larger unit = smaller number" - if you\'re converting to a larger unit, your number should get smaller. Always verify by converting back or checking that the answer makes logical sense.',
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
              question: 'Find the mean, median, and mode of the data set: 5, 7, 3, 7, 9, 5, 7',
              solution: 'Step 1: Understand the three measures. Mean = average, Median = middle value, Mode = most frequent value. Step 2: Calculate the mean. Mean = (Sum of all values) / (Number of values). Sum = 5 + 7 + 3 + 7 + 9 + 5 + 7 = 43. Number of values = 7. Mean = 43 / 7 ≈ 6.14. Step 3: Find the median. First, sort the data in ascending order: 3, 5, 5, 7, 7, 7, 9. Since there are 7 values (odd number), the median is the middle value. The 4th value (position (7+1)/2 = 4) is 7. So Median = 7. Step 4: Find the mode. Count the frequency of each value: 3 appears 1 time, 5 appears 2 times, 7 appears 3 times, 9 appears 1 time. The value 7 appears most frequently (3 times). So Mode = 7. Step 5: Final answers. Mean ≈ 6.14, Median = 7, Mode = 7.',
              explanation: 'Mean is the arithmetic average. Median requires sorting the data first, then finding the middle value (or average of two middle values if even count). Mode is the value that appears most often. These three measures give different insights into the data set.',
            },
            {
              question: 'The mean of 5 numbers is 20. Four of the numbers are 15, 18, 22, and 25. Find the fifth number.',
              solution: 'Step 1: Understand the problem. We know the mean of 5 numbers is 20, and we know 4 of the numbers. We need to find the 5th number. Step 2: Use the mean formula. Mean = (Sum of all values) / (Number of values). Rearranging: Sum of all values = Mean × Number of values. Step 3: Calculate the total sum. Total sum = Mean × Count = 20 × 5 = 100. Step 4: Calculate the sum of the four known numbers. Sum of four = 15 + 18 + 22 + 25 = 80. Step 5: Find the fifth number. Since Total = Sum of four + Fifth number, we have: 100 = 80 + Fifth number. Therefore: Fifth number = 100 − 80 = 20. Step 6: Verify. Check: Mean of {15, 18, 22, 25, 20} = (15 + 18 + 22 + 25 + 20) / 5 = 100 / 5 = 20 ✓. Step 7: Final answer. Therefore, the fifth number is 20.',
              explanation: 'When you know the mean and all but one value, use the formula: Total = Mean × Count to find the total sum, then subtract the sum of known values to find the missing value. This technique is very useful in statistics problems.',
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
              question: 'What is the probability of rolling a 6 on a fair six-sided die?',
              solution: 'Step 1: Understand probability. Probability = (Number of favorable outcomes) / (Total number of possible outcomes). Step 2: Identify favorable outcomes. We want to roll a 6. There is 1 favorable outcome (rolling a 6). Step 3: Identify total possible outcomes. A fair die has 6 faces: 1, 2, 3, 4, 5, 6. So there are 6 possible outcomes. Step 4: Calculate the probability. P(rolling 6) = Favorable outcomes / Total outcomes = 1 / 6. Step 5: Interpret the result. The probability is 1/6, which means there is a 1 in 6 chance of rolling a 6, or approximately 16.67%. Step 6: Verify. Since the die is fair, each number (1 through 6) has equal probability, so P(6) = 1/6 makes sense. Therefore, the probability of rolling a 6 is 1/6.',
              explanation: 'For a fair die, each outcome is equally likely. The probability of any specific number is 1 divided by the total number of faces. This is the most basic probability calculation.',
            },
            {
              question: 'What is the probability of NOT rolling a 6 on a fair six-sided die?',
              solution: 'Step 1: Understand the problem. We want the probability of rolling any number except 6. Step 2: Method 1 - Direct calculation. Favorable outcomes: rolling 1, 2, 3, 4, or 5. That\'s 5 favorable outcomes. Total outcomes: 6. P(not 6) = 5/6. Step 3: Method 2 - Complement rule. The complement rule states: P(not A) = 1 − P(A). We know P(rolling 6) = 1/6. So: P(not 6) = 1 − P(6) = 1 − 1/6 = 6/6 − 1/6 = 5/6. Step 4: Verify both methods. Method 1: 5 favorable outcomes out of 6 total = 5/6. Method 2: 1 − 1/6 = 5/6. Both give the same answer ✓. Step 5: Interpret. The probability of not rolling a 6 is 5/6, which means there is a 5 in 6 chance (approximately 83.33%) of rolling something other than 6. Therefore, the probability of NOT rolling a 6 is 5/6.',
              explanation: 'The complement rule is very useful: P(not A) = 1 − P(A). This is often easier than counting all the "not A" outcomes directly. The complement rule works because either A happens or it doesn\'t, and the probabilities must sum to 1.',
            },
            {
              question: 'Two fair dice are rolled. What is the probability that both dice show 6?',
              solution: 'Step 1: Understand the problem. We have two independent events: rolling a 6 on the first die AND rolling a 6 on the second die. Step 2: Identify that events are independent. The outcome of the first die does not affect the outcome of the second die. They are independent events. Step 3: Recall the rule for independent events. For independent events A and B: P(A and B) = P(A) × P(B). We multiply the probabilities. Step 4: Find individual probabilities. P(first die shows 6) = 1/6. P(second die shows 6) = 1/6. Step 5: Calculate the combined probability. P(both show 6) = P(first is 6) × P(second is 6) = (1/6) × (1/6) = 1/36. Step 6: Verify by listing outcomes (optional). Total outcomes when rolling two dice: 6 × 6 = 36 possible outcomes. Only one outcome is (6, 6). So P(both 6) = 1/36 ✓. Step 7: Final answer. Therefore, the probability that both dice show 6 is 1/36.',
              explanation: 'For independent events, multiply the probabilities. This is different from "or" events (which use addition) or mutually exclusive events. The key is recognizing independence: one event doesn\'t affect the other. Always check if events are independent before multiplying probabilities.',
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
              question: 'In how many ways can 3 different books be arranged on a shelf?',
              solution: 'Step 1: Identify the problem type. We need to arrange (order) 3 books. Since order matters (Book1-Book2-Book3 is different from Book3-Book2-Book1), this is a permutation problem. Step 2: Determine if it\'s a permutation. We\'re arranging all 3 books (selecting all of them), and order matters. This is a permutation of 3 objects taken 3 at a time: 3P3. Step 3: Apply the permutation formula. When selecting all n objects: nPn = n! (n factorial). So: 3P3 = 3! = 3 × 2 × 1 = 6. Step 4: Verify by listing (optional). The 6 arrangements are: ABC, ACB, BAC, BCA, CAB, CBA. That\'s 6 different ways ✓. Step 5: Understand the calculation. For the first position: 3 choices. For the second position: 2 remaining choices. For the third position: 1 remaining choice. Total: 3 × 2 × 1 = 6. Step 6: Final answer. Therefore, there are 6 ways to arrange 3 books on a shelf.',
              explanation: 'When arranging all objects and order matters, use n! (n factorial). This counts all possible orderings. Permutations are used when the arrangement/order is important.',
            },
            {
              question: 'How many ways can you choose 2 items from a set of 5 items?',
              solution: 'Step 1: Identify the problem type. We need to choose 2 items from 5. The key question: Does order matter? Step 2: Determine if order matters. If we\'re just "choosing" or "selecting", order typically doesn\'t matter. Choosing items A and B is the same as choosing B and A. So this is a combination problem. Step 3: Apply the combination formula. Combination formula: nCr = n! / [r!(n−r)!], where n = total items, r = items to choose. Here: 5C2 = 5! / [2!(5−2)!] = 5! / (2! × 3!). Step 4: Calculate factorials. 5! = 5 × 4 × 3 × 2 × 1 = 120. 2! = 2 × 1 = 2. 3! = 3 × 2 × 1 = 6. Step 5: Simplify. 5C2 = 120 / (2 × 6) = 120 / 12 = 10. Step 6: Alternative calculation (faster). 5C2 = (5 × 4) / (2 × 1) = 20 / 2 = 10. This works because: 5!/(2!3!) = (5×4×3!)/(2!×3!) = (5×4)/(2×1) = 10. Step 7: Verify by listing (optional). If items are A, B, C, D, E, the 10 combinations are: AB, AC, AD, AE, BC, BD, BE, CD, CE, DE. That\'s 10 ✓. Step 8: Final answer. Therefore, there are 10 ways to choose 2 items from 5.',
              explanation: 'Combinations are used when order doesn\'t matter - you\'re just selecting a group. The formula nCr = n! / [r!(n−r)!] counts selections without regard to order. A faster method: nCr = (n × (n−1) × ... × (n−r+1)) / (r × (r−1) × ... × 1).',
            },
            {
              question: 'How many different 3-letter codes can be formed from the letters A, B, C, D if no letter can be repeated?',
              solution: 'Step 1: Understand the problem. We need to form 3-letter codes from 4 letters (A, B, C, D), with no repetition allowed. Step 2: Determine if order matters. Yes, order matters! The code ABC is different from CBA. So this is a permutation problem. Step 3: Apply the permutation formula. We\'re selecting 3 letters from 4, and order matters. This is: 4P3 = 4! / (4−3)! = 4! / 1! = 4! / 1 = 24. Step 4: Calculate 4!. 4! = 4 × 3 × 2 × 1 = 24. Step 5: Verify by counting. For the first letter: 4 choices (A, B, C, or D). For the second letter: 3 remaining choices (can\'t repeat the first). For the third letter: 2 remaining choices (can\'t repeat the first two). Total: 4 × 3 × 2 = 24 codes. Step 6: List a few examples (optional). Some codes: ABC, ABD, ACB, ACD, ADB, ADC, BAC, BAD, ... There are 24 total. Step 7: Final answer. Therefore, there are 24 different 3-letter codes that can be formed.',
              explanation: 'When forming codes, passwords, or arrangements where order matters and items can\'t be repeated, use permutations. The formula nPr = n! / (n−r)! counts ordered selections. Think: first position has n choices, second has (n−1), third has (n−2), etc.',
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
              question: 'In a class survey: 20 students like math, 15 students like science, and 8 students like both math and science. How many students like at least one of these subjects?',
              solution: 'Step 1: Understand the problem. We have overlapping groups: some students like math, some like science, and some like both. We need to find how many like at least one (math OR science OR both). Step 2: Identify the sets. Let M = students who like math, n(M) = 20. Let S = students who like science, n(S) = 15. The intersection: n(M ∩ S) = 8 (students who like both). Step 3: Understand the union formula. The formula for union is: n(M ∪ S) = n(M) + n(S) − n(M ∩ S). We subtract the intersection to avoid counting those students twice. Step 4: Apply the formula. n(M ∪ S) = 20 + 15 − 8 = 35 − 8 = 27. Step 5: Verify with Venn diagram logic. Students who like only math: 20 − 8 = 12. Students who like only science: 15 − 8 = 7. Students who like both: 8. Total who like at least one: 12 + 7 + 8 = 27 ✓. Step 6: Final answer. Therefore, 27 students like at least one of the subjects (math or science or both).',
              explanation: 'The union formula n(A ∪ B) = n(A) + n(B) − n(A ∩ B) prevents double-counting. Those in the intersection are counted in both n(A) and n(B), so we subtract them once. This is essential for overlapping set problems.',
            },
            {
              question: 'In a survey: 30 people like product A, 25 people like product B, 10 people like both products A and B, and 5 people like neither product. How many people were surveyed in total?',
              solution: 'Step 1: Understand the problem. We need to find the total number of people surveyed. We have information about overlapping groups and a "neither" group. Step 2: Find how many like at least one product. Use the union formula: n(A ∪ B) = n(A) + n(B) − n(A ∩ B). n(A) = 30, n(B) = 25, n(A ∩ B) = 10. So: n(A ∪ B) = 30 + 25 − 10 = 55 − 10 = 45. Step 3: Add those who like neither. The total surveyed includes: Those who like at least one (45) + Those who like neither (5). Total = 45 + 5 = 50. Step 4: Verify with Venn diagram. Like only A: 30 − 10 = 20. Like only B: 25 − 10 = 15. Like both: 10. Like neither: 5. Total: 20 + 15 + 10 + 5 = 50 ✓. Step 5: Final answer. Therefore, a total of 50 people were surveyed.',
              explanation: 'When a problem includes a "neither" group, first find the union (those who like at least one), then add the "neither" group to get the total. The key is: Total = (Like at least one) + (Like neither). Always account for all groups when finding totals.',
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
              question: 'Evaluate: log₂(8) = ?',
              solution: 'Step 1: Understand logarithms. log₂(8) asks: "What power of 2 equals 8?" In other words, if 2ˣ = 8, what is x? Step 2: Recognize the relationship. Logarithms are the inverse of exponents. log₂(8) = x means 2ˣ = 8. Step 3: Find the power. We need to find what power of 2 gives 8. Try: 2¹ = 2, 2² = 4, 2³ = 8. So 2³ = 8. Step 4: Apply the definition. Since 2³ = 8, we have log₂(8) = 3. Step 5: Verify. Check: 2³ = 2 × 2 × 2 = 8 ✓. Step 6: Final answer. Therefore, log₂(8) = 3.',
              explanation: 'Logarithms are the inverse of exponents. log_b(a) = c means b^c = a. To evaluate logarithms, ask: "What power of the base gives the argument?" Memorizing powers of 2, 3, and 10 helps evaluate common logarithms quickly.',
            },
            {
              question: 'Simplify: log(100) + log(10)',
              solution: 'Step 1: Understand the notation. "log" without a base typically means base 10 (common logarithm). So log(100) = log₁₀(100) and log(10) = log₁₀(10). Step 2: Apply the logarithm addition property. The property states: log(a) + log(b) = log(ab). This works for any base. So: log(100) + log(10) = log(100 × 10) = log(1000). Step 3: Evaluate log(1000). log(1000) asks: "What power of 10 equals 1000?" Since 10³ = 1000, we have log(1000) = 3. Step 4: Verify by evaluating each term separately. log(100) = 2 (since 10² = 100). log(10) = 1 (since 10¹ = 10). Sum: 2 + 1 = 3 ✓. This matches our answer. Step 5: Final answer. Therefore, log(100) + log(10) = 3.',
              explanation: 'The logarithm addition property log(a) + log(b) = log(ab) is very useful for simplifying expressions. This comes from the exponent rule: 10ᵃ × 10ᵇ = 10ᵃ⁺ᵇ. Always verify by checking if you can evaluate each term separately.',
            },
            {
              question: 'Solve the exponential equation: 2ˣ = 16',
              solution: 'Step 1: Understand the equation. We have an exponential equation where the variable is in the exponent. Step 2: Method 1 - Recognize the power. Notice that 16 = 2⁴ (since 2⁴ = 2 × 2 × 2 × 2 = 16). So: 2ˣ = 2⁴. Step 3: Apply the property. If the bases are equal and positive (not equal to 1), then the exponents must be equal. So: x = 4. Step 4: Method 2 - Use logarithms. Take the logarithm (base 2) of both sides: log₂(2ˣ) = log₂(16). Using the property log_b(bˣ) = x: x = log₂(16). Since 2⁴ = 16, we have log₂(16) = 4. So: x = 4. Step 5: Verify. Check: 2⁴ = 16 ✓. Step 6: Final answer. Therefore, x = 4.',
              explanation: 'To solve exponential equations, either recognize the power (faster) or use logarithms. When bases are the same, set exponents equal. When bases differ, take the logarithm of both sides. Always verify by substituting back into the original equation.',
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
              solution: 'Step 1: Understand the problem. We need to find the square root of a negative number. In the real number system, square roots of negative numbers don\'t exist. We use complex numbers. Step 2: Recall the imaginary unit. The imaginary unit i is defined as i = √(−1), so i² = −1. Step 3: Factor out −1. √(−16) = √(16 × −1) = √16 × √(−1). Step 4: Simplify. √16 = 4 (since 4² = 16). √(−1) = i. So: √(−16) = 4 × i = 4i. Step 5: Verify. Check: (4i)² = 4² × i² = 16 × (−1) = −16 ✓. Step 6: Final answer. Therefore, √(−16) = 4i.',
              explanation: 'Square roots of negative numbers require complex numbers. Factor out −1, take the square root of the positive part, and multiply by i. Remember: i = √(−1) and i² = −1. This allows us to work with square roots of negative numbers.',
            },
            {
              question: 'Add the complex numbers: (3 + 2i) + (1 − 5i)',
              solution: 'Step 1: Understand complex number addition. To add complex numbers, add the real parts together and add the imaginary parts together separately. Step 2: Identify the parts. First complex number: 3 + 2i (real part = 3, imaginary part = 2). Second complex number: 1 − 5i (real part = 1, imaginary part = −5). Step 3: Add the real parts. Real part: 3 + 1 = 4. Step 4: Add the imaginary parts. Imaginary part: 2i + (−5i) = 2i − 5i = (2 − 5)i = −3i. Step 5: Combine the results. (3 + 2i) + (1 − 5i) = (3 + 1) + (2i − 5i) = 4 + (−3i) = 4 − 3i. Step 6: Verify. We can think of it like combining like terms: (3 + 1) + (2 − 5)i = 4 − 3i ✓. Step 7: Final answer. Therefore, (3 + 2i) + (1 − 5i) = 4 − 3i.',
              explanation: 'Complex number addition is straightforward: add real parts, add imaginary parts. Think of it like combining like terms in algebra. The format a + bi makes it clear: a is the real part, b is the coefficient of the imaginary part.',
            },
            {
              question: 'Multiply the complex numbers: (2 + i)(2 − i)',
              solution: 'Step 1: Recognize the pattern. This looks like (a + b)(a − b), which is a difference of squares: a² − b². Step 2: Apply the difference of squares formula. (2 + i)(2 − i) = 2² − i² = 4 − i². Step 3: Substitute i² = −1. Since i² = −1, we have: 4 − i² = 4 − (−1) = 4 + 1 = 5. Step 4: Alternative method - Expand directly. (2 + i)(2 − i) = 2(2) + 2(−i) + i(2) + i(−i) = 4 − 2i + 2i − i² = 4 − i² = 4 − (−1) = 5. Step 5: Notice the result. The product is a real number (5), with no imaginary part. This happens because (2 + i) and (2 − i) are conjugates. Step 6: Verify. Check: (2 + i)(2 − i) = 4 − 2i + 2i − i² = 4 − (−1) = 5 ✓. Step 7: Final answer. Therefore, (2 + i)(2 − i) = 5.',
              explanation: 'When multiplying complex conjugates (a + bi)(a − bi), the result is always a real number: a² + b². The imaginary parts cancel out. This is a useful property: the product of a complex number and its conjugate is always real and positive (or zero).',
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
              question: 'Calculate 103 × 97 using algebraic identities',
              solution: 'Step 1: Observe the numbers. Notice that 103 and 97 are both close to 100. Specifically: 103 = 100 + 3 and 97 = 100 − 3. Step 2: Recognize the pattern. This matches the form (a+b)(a−b), where a = 100 and b = 3. Step 3: Apply the difference of squares identity. The identity (a+b)(a−b) = a² − b² allows us to calculate this quickly. So: 103 × 97 = (100 + 3)(100 − 3) = 100² − 3². Step 4: Calculate the squares. 100² = 10,000 and 3² = 9. Step 5: Subtract. 100² − 3² = 10,000 − 9 = 9,991. Step 6: Verify (optional). We can verify: 103 × 97. Using standard multiplication: 100 × 97 = 9,700, and 3 × 97 = 291, so 9,700 + 291 = 9,991 ✓. Therefore, 103 × 97 = 9,991.',
              explanation: 'The difference of squares identity (a+b)(a−b) = a² − b² is extremely useful for mental math when multiplying numbers that are equidistant from a round number. This technique saves time and reduces calculation errors compared to standard multiplication.',
            },
            {
              question: 'If x + y = 8 and xy = 12, find the value of x² + y²',
              solution: 'Step 1: Understand the given information. We know: x + y = 8 (sum of x and y) and xy = 12 (product of x and y). We need to find x² + y² (sum of squares). Step 2: Recall the algebraic identity. The identity (x + y)² = x² + 2xy + y² relates the sum, product, and sum of squares. Step 3: Expand (x + y)². (x + y)² = x² + 2xy + y². We can rearrange this to: x² + y² = (x + y)² − 2xy. Step 4: Substitute the known values. We know x + y = 8 and xy = 12. So: x² + y² = (8)² − 2(12). Step 5: Calculate. (8)² = 64, and 2(12) = 24. So: x² + y² = 64 − 24 = 40. Step 6: Final answer. Therefore, x² + y² = 40.',
              explanation: 'This problem demonstrates how algebraic identities can help us find relationships between different expressions. The key identity (x + y)² = x² + 2xy + y² allows us to find the sum of squares when we know the sum and product. This technique is very useful in algebra problems.',
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
              question: 'Solve the equation: ½x + 3(x−2) = 2(x+1) + 1',
              solution: 'Step 1: Clear fractions/decimals. The equation has a fraction: ½x. The LCD (Lowest Common Denominator) of all denominators is 2. Multiply every term by 2: 2 × [½x + 3(x−2)] = 2 × [2(x+1) + 1]. This gives: x + 6(x−2) = 4(x+1) + 2. Step 2: Remove parentheses. Expand all expressions with parentheses: x + 6(x−2) = x + 6x − 12 = 7x − 12 (left side). 4(x+1) + 2 = 4x + 4 + 2 = 4x + 6 (right side). So: 7x − 12 = 4x + 6. Step 3: Combine like terms. Left side: 7x − 12 (already combined). Right side: 4x + 6 (already combined). The equation is: 7x − 12 = 4x + 6. Step 4: Get variables on one side. Subtract 4x from both sides to move x terms to the left: 7x − 12 − 4x = 4x + 6 − 4x, which gives: 3x − 12 = 6. Step 5: Get constants on the other side. Add 12 to both sides to move constants to the right: 3x − 12 + 12 = 6 + 12, which gives: 3x = 18. Step 6: Solve for the variable. Divide both sides by 3: 3x ÷ 3 = 18 ÷ 3, which gives: x = 6. Step 7: Verify the solution. Substitute x = 6 into the original equation: Left side: ½(6) + 3(6−2) = 3 + 3(4) = 3 + 12 = 15. Right side: 2(6+1) + 1 = 2(7) + 1 = 14 + 1 = 15. Both sides equal 15 ✓. Therefore, x = 6 is the solution.',
              explanation: 'The 6-step method ensures you don\'t miss any steps: (1) Clear fractions/decimals, (2) Remove parentheses, (3) Combine like terms, (4) Get variables on one side, (5) Get constants on the other side, (6) Solve. Always verify by substituting back into the original equation.',
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
              question: 'Translate the word problem into an equation and solve: "Five less than twice a number equals thirteen."',
              solution: 'Step 1: Identify what we\'re looking for. The problem asks for "a number". Let this number be x. Step 2: Translate phrase by phrase. "Twice a number" means 2 times x, which is 2x. "Five less than twice a number" means we subtract 5 from 2x. IMPORTANT: "Five less than" means we subtract 5 FROM the expression that comes after "than". So: 2x − 5. "Equals thirteen" means = 13. Step 3: Write the equation. Combining all parts: 2x − 5 = 13. Step 4: Solve the equation. Add 5 to both sides: 2x − 5 + 5 = 13 + 5, which gives: 2x = 18. Divide both sides by 2: 2x ÷ 2 = 18 ÷ 2, which gives: x = 9. Step 5: Verify the answer. Check: "Five less than twice 9" = 2(9) − 5 = 18 − 5 = 13 ✓. The answer makes sense. Step 6: Final answer. Therefore, the number is 9.',
              explanation: 'Word problems require careful translation. Key phrases: "twice" = 2×, "less than" = subtract (be careful with order - "A less than B" means B − A), "equals" = =. Always read the problem carefully and translate phrase by phrase. Verify your answer by checking it makes sense in the original wording.',
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
              question: 'Solve the quadratic equation: x² − 5x + 6 = 0',
              solution: 'Step 1: Identify the equation type. This is a quadratic equation in standard form: ax² + bx + c = 0, where a = 1, b = −5, and c = 6. Step 2: Try factoring method. For x² + bx + c form, we need two numbers that multiply to c (6) and add to b (−5). Step 3: Find the two numbers. We need numbers that: multiply to 6 and add to −5. The pairs that multiply to 6 are: (1, 6), (2, 3), (−1, −6), (−2, −3). Which pair adds to −5? (−2) + (−3) = −5 ✓. So the numbers are −2 and −3. Step 4: Factor the quadratic. x² − 5x + 6 = (x − 2)(x − 3). We can verify: (x − 2)(x − 3) = x² − 3x − 2x + 6 = x² − 5x + 6 ✓. Step 5: Apply the zero product property. If (x − 2)(x − 3) = 0, then either x − 2 = 0 OR x − 3 = 0. Step 6: Solve each equation. Case 1: x − 2 = 0 → x = 2. Case 2: x − 3 = 0 → x = 3. Step 7: Verify the solutions. Check x = 2: (2)² − 5(2) + 6 = 4 − 10 + 6 = 0 ✓. Check x = 3: (3)² − 5(3) + 6 = 9 − 15 + 6 = 0 ✓. Therefore, the solutions are x = 2 or x = 3.',
              explanation: 'Factoring is the fastest method when it works. The key is finding two numbers that multiply to c and add to b. Once factored, use the zero product property: if ab = 0, then a = 0 or b = 0. Always verify your solutions by substituting back into the original equation.',
            },
            {
              question: 'Solve the quadratic equation: 2x² + 7x + 3 = 0',
              solution: 'Step 1: Identify coefficients. Standard form: ax² + bx + c = 0, where a = 2, b = 7, and c = 3. Step 2: Check if factoring is easy. For ax² + bx + c where a ≠ 1, factoring can be more complex. We need two numbers that multiply to ac = 2 × 3 = 6 and add to b = 7. The numbers are 6 and 1. However, this requires more complex factoring. Let\'s use the quadratic formula instead. Step 3: Apply the quadratic formula. The formula is: x = (−b ± √(b² − 4ac)) / (2a). Step 4: Calculate the discriminant. Discriminant = b² − 4ac = 7² − 4(2)(3) = 49 − 24 = 25. Since the discriminant is positive (25 > 0), there are two real solutions. Step 5: Substitute into the formula. x = (−7 ± √25) / (2 × 2) = (−7 ± 5) / 4. Step 6: Calculate both solutions. Case 1 (using +): x = (−7 + 5) / 4 = (−2) / 4 = −1/2. Case 2 (using −): x = (−7 − 5) / 4 = (−12) / 4 = −3. Step 7: Verify the solutions. Check x = −1/2: 2(−1/2)² + 7(−1/2) + 3 = 2(1/4) − 7/2 + 3 = 1/2 − 7/2 + 3 = −6/2 + 3 = −3 + 3 = 0 ✓. Check x = −3: 2(−3)² + 7(−3) + 3 = 2(9) − 21 + 3 = 18 − 21 + 3 = 0 ✓. Therefore, the solutions are x = −1/2 or x = −3.',
              explanation: 'When factoring is difficult (especially when a ≠ 1), the quadratic formula is reliable. Always calculate the discriminant first to determine the number of solutions. A positive discriminant means two real solutions, zero means one solution, and negative means no real solutions (complex solutions).',
            },
            {
              question: 'Determine how many real solutions the equation x² + 4x + 5 = 0 has',
              solution: 'Step 1: Identify the coefficients. Standard form: ax² + bx + c = 0, where a = 1, b = 4, and c = 5. Step 2: Calculate the discriminant. The discriminant is: b² − 4ac. Substituting: b² − 4ac = 4² − 4(1)(5) = 16 − 20 = −4. Step 3: Interpret the discriminant. The discriminant is −4, which is negative (less than 0). Step 4: Apply the discriminant rule. When discriminant < 0: The quadratic equation has NO real solutions. The solutions would be complex numbers (involving √(−1) = i). Step 5: Understand why. In the quadratic formula x = (−b ± √(b² − 4ac)) / (2a), we have √(b² − 4ac) = √(−4) = 2i (where i = √(−1)). This gives complex solutions, not real numbers. Step 6: Final answer. The equation x² + 4x + 5 = 0 has NO real solutions. It has two complex solutions: x = −2 + i and x = −2 − i.',
              explanation: 'The discriminant (b² − 4ac) tells us the nature of the solutions: positive = two real solutions, zero = one real solution (repeated), negative = no real solutions (two complex solutions). This is a quick way to determine solution types without solving the full equation.',
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
              question: 'Solve the system of equations: x + y = 10 and x − y = 4',
              solution: 'Step 1: Identify the method. Both equations have x and y terms. Notice that if we add the equations, the y terms will cancel (y + (−y) = 0). This suggests using the elimination method. Step 2: Add the equations. Write both equations: x + y = 10, x − y = 4. Add them: (x + y) + (x − y) = 10 + 4. Step 3: Simplify. Left side: x + y + x − y = 2x. Right side: 10 + 4 = 14. So: 2x = 14. Step 4: Solve for x. Divide both sides by 2: 2x ÷ 2 = 14 ÷ 2, which gives: x = 7. Step 5: Substitute x into one equation to find y. Use the first equation: x + y = 10. Substitute x = 7: 7 + y = 10. Subtract 7 from both sides: y = 10 − 7 = 3. Step 6: Verify the solution. Check in both equations: Equation 1: x + y = 7 + 3 = 10 ✓. Equation 2: x − y = 7 − 3 = 4 ✓. Both equations are satisfied. Step 7: Final answer. Therefore, x = 7 and y = 3.',
              explanation: 'The elimination method works well when adding or subtracting equations eliminates one variable. Here, adding the equations eliminated y, making it easy to solve for x. Always verify your solution by substituting into both original equations.',
            },
            {
              question: 'Solve the system of equations: 2x + 3y = 12 and x = y + 1',
              solution: 'Step 1: Identify the method. The second equation already has x isolated (x = y + 1). This makes substitution the best method. Step 2: Substitute the second equation into the first. The second equation tells us x = y + 1. Substitute this into the first equation: 2x + 3y = 12 becomes: 2(y + 1) + 3y = 12. Step 3: Expand and simplify. Expand: 2(y + 1) = 2y + 2. So: 2y + 2 + 3y = 12. Combine like terms: (2y + 3y) + 2 = 12, which gives: 5y + 2 = 12. Step 4: Solve for y. Subtract 2 from both sides: 5y + 2 − 2 = 12 − 2, which gives: 5y = 10. Divide both sides by 5: 5y ÷ 5 = 10 ÷ 5, which gives: y = 2. Step 5: Find x using the second equation. From x = y + 1, substitute y = 2: x = 2 + 1 = 3. Step 6: Verify the solution. Check in both equations: Equation 1: 2x + 3y = 2(3) + 3(2) = 6 + 6 = 12 ✓. Equation 2: x = y + 1, so 3 = 2 + 1 = 3 ✓. Both equations are satisfied. Step 7: Final answer. Therefore, x = 3 and y = 2.',
              explanation: 'Substitution is ideal when one variable is already isolated. Substitute the expression into the other equation, solve for one variable, then use that value to find the other. Always check your solution in both equations.',
            },
            {
              question: 'Two numbers sum to 25. One number is 7 more than the other. Find both numbers.',
              solution: 'Step 1: Define variables. Let the smaller number be y, and the larger number be x. Step 2: Translate the first condition. "Two numbers sum to 25" means: x + y = 25. Step 3: Translate the second condition. "One is 7 more than the other" means: x = y + 7 (the larger number is 7 more than the smaller). Step 4: Set up the system. We have: x + y = 25 and x = y + 7. Step 5: Solve using substitution. Since x = y + 7, substitute into the first equation: (y + 7) + y = 25. Step 6: Simplify and solve for y. Combine like terms: 2y + 7 = 25. Subtract 7 from both sides: 2y = 25 − 7 = 18. Divide by 2: y = 18 ÷ 2 = 9. Step 7: Find x. From x = y + 7, substitute y = 9: x = 9 + 7 = 16. Step 8: Verify the answer. Check: Sum = 16 + 9 = 25 ✓. Difference: 16 − 9 = 7 ✓ (one is 7 more than the other). Step 9: Final answer. Therefore, the two numbers are 16 and 9.',
              explanation: 'Word problems require translating English into mathematical equations. Identify what you\'re looking for, assign variables, translate each condition into an equation, then solve the system. Always verify that your answer satisfies all the given conditions.',
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
              question: 'Factor the expression: 6x² + 9x',
              solution: 'Step 1: Identify the type. This is a binomial (two terms) with a common factor. Step 2: Find the Greatest Common Factor (GCF). Look at the coefficients: 6 and 9. The GCF of 6 and 9 is 3. Look at the variables: x² and x. The GCF is x (the lowest power). So the GCF is 3x. Step 3: Factor out the GCF. Divide each term by 3x: 6x² ÷ 3x = 2x, and 9x ÷ 3x = 3. So: 6x² + 9x = 3x(2x + 3). Step 4: Verify by expanding. Check: 3x(2x + 3) = 3x × 2x + 3x × 3 = 6x² + 9x ✓. Step 5: Final answer. Therefore, 6x² + 9x = 3x(2x + 3).',
              explanation: 'Always look for a GCF first before trying other factoring methods. The GCF includes both the numerical coefficient and the variable part. Factoring out the GCF simplifies the expression and may reveal other factoring opportunities.',
            },
            {
              question: 'Factor the expression: x² − 16',
              solution: 'Step 1: Recognize the pattern. This is a difference of two terms, both perfect squares: x² and 16 (which is 4²). This matches the form a² − b². Step 2: Identify a and b. a² = x², so a = x. b² = 16, so b = 4. Step 3: Apply the difference of squares formula. The formula is: a² − b² = (a + b)(a − b). So: x² − 16 = (x + 4)(x − 4). Step 4: Verify by expanding. Check: (x + 4)(x − 4) = x² − 4x + 4x − 16 = x² − 16 ✓. Step 5: Final answer. Therefore, x² − 16 = (x + 4)(x − 4).',
              explanation: 'The difference of squares pattern a² − b² = (a + b)(a − b) is very common. Recognize it when you see two perfect squares separated by a minus sign. This is one of the most useful factoring patterns.',
            },
            {
              question: 'Factor the trinomial: x² + 8x + 15',
              solution: 'Step 1: Identify the form. This is a trinomial in the form x² + bx + c, where b = 8 and c = 15. Step 2: Find two numbers. We need two numbers that: multiply to c (15) and add to b (8). Step 3: List factor pairs of 15. The pairs that multiply to 15 are: (1, 15), (3, 5), (−1, −15), (−3, −5). Step 4: Find the pair that adds to 8. Check each pair: 1 + 15 = 16 ✗, 3 + 5 = 8 ✓, −1 + (−15) = −16 ✗, −3 + (−5) = −8 ✗. The pair (3, 5) works! Step 5: Write the factors. Since the numbers are 3 and 5, and both are positive (because b and c are positive), the factors are: (x + 3)(x + 5). Step 6: Verify by expanding. Check: (x + 3)(x + 5) = x² + 5x + 3x + 15 = x² + 8x + 15 ✓. Step 7: Final answer. Therefore, x² + 8x + 15 = (x + 3)(x + 5).',
              explanation: 'For trinomials x² + bx + c, find two numbers that multiply to c and add to b. The signs depend on b and c: if both b and c are positive, both factors have + signs. If c is positive but b is negative, both factors have − signs. If c is negative, one factor has + and one has −.',
            },
            {
              question: 'Factor the trinomial: 2x² + 7x + 3',
              solution: 'Step 1: Identify the form. This is a trinomial in the form ax² + bx + c, where a = 2, b = 7, and c = 3. Since a ≠ 1, we need a different method. Step 2: Use the ac method. Multiply a × c: 2 × 3 = 6. We need two numbers that multiply to 6 and add to b (7). Step 3: Find the two numbers. Factor pairs of 6: (1, 6), (2, 3), (−1, −6), (−2, −3). Which pair adds to 7? 1 + 6 = 7 ✓. So the numbers are 1 and 6. Step 4: Split the middle term. Rewrite 7x as 6x + x: 2x² + 7x + 3 = 2x² + 6x + x + 3. Step 5: Factor by grouping. Group: (2x² + 6x) + (x + 3). Factor each group: 2x(x + 3) + 1(x + 3). Step 6: Factor out the common binomial. Both terms have (x + 3): (x + 3)(2x + 1). Step 7: Verify by expanding. Check: (x + 3)(2x + 1) = 2x² + x + 6x + 3 = 2x² + 7x + 3 ✓. Step 8: Final answer. Therefore, 2x² + 7x + 3 = (x + 3)(2x + 1).',
              explanation: 'For trinomials ax² + bx + c where a ≠ 1, use the ac method: multiply a×c, find two numbers that multiply to ac and add to b, split the middle term, then factor by grouping. This method always works when the trinomial is factorable.',
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
              question: 'Simplify the rational expression: (x²−4)/(x+2)',
              solution: 'Step 1: Factor the numerator. The numerator x² − 4 is a difference of squares. Using the identity a² − b² = (a+b)(a−b): x² − 4 = x² − 2² = (x+2)(x−2). Step 2: Rewrite the expression. (x²−4)/(x+2) = (x+2)(x−2)/(x+2). Step 3: Cancel common factors. Both numerator and denominator have the factor (x+2). We can cancel it: (x+2)(x−2)/(x+2) = x−2. Step 4: Important: State domain restrictions. When we canceled (x+2), we must note that x+2 ≠ 0, so x ≠ −2. This is because the original expression is undefined when x = −2 (division by zero). Step 5: Write the simplified form. (x²−4)/(x+2) = x−2, where x ≠ −2. Step 6: Verify by expanding. Check: (x−2)(x+2) = x² + 2x − 2x − 4 = x² − 4 ✓. Therefore, (x²−4)/(x+2) = x−2 (x ≠ −2).',
              explanation: 'To simplify rational expressions, factor both numerator and denominator, then cancel common FACTORS (not terms!). Always state domain restrictions - any value that makes the original denominator zero must be excluded. Remember: you can only cancel factors that appear in both numerator and denominator.',
            },
            {
              question: 'Add the rational expressions: 1/(x+1) + 2/(x−1)',
              solution: 'Step 1: Understand the problem. We need to add two fractions with different denominators. Step 2: Find the LCD (Lowest Common Denominator). The denominators are (x+1) and (x−1). Since they have no common factors, the LCD is their product: (x+1)(x−1). Note: (x+1)(x−1) = x² − 1 (difference of squares). Step 3: Convert first fraction to LCD. 1/(x+1) needs denominator (x+1)(x−1). Multiply numerator and denominator by (x−1): 1/(x+1) = [1(x−1)] / [(x+1)(x−1)] = (x−1)/(x²−1). Step 4: Convert second fraction to LCD. 2/(x−1) needs denominator (x+1)(x−1). Multiply numerator and denominator by (x+1): 2/(x−1) = [2(x+1)] / [(x−1)(x+1)] = (2x+2)/(x²−1). Step 5: Add the fractions. Now both have the same denominator: (x−1)/(x²−1) + (2x+2)/(x²−1) = [(x−1) + (2x+2)] / (x²−1). Step 6: Simplify the numerator. (x−1) + (2x+2) = x − 1 + 2x + 2 = 3x + 1. Step 7: Write the final answer. 1/(x+1) + 2/(x−1) = (3x+1)/(x²−1). Step 8: State domain restrictions. The original expressions are undefined when x+1 = 0 (x = −1) or x−1 = 0 (x = 1). So x ≠ −1 and x ≠ 1. Therefore, 1/(x+1) + 2/(x−1) = (3x+1)/(x²−1), where x ≠ −1 and x ≠ 1.',
              explanation: 'To add rational expressions, find the LCD, convert each fraction to have that denominator, then add the numerators while keeping the common denominator. Always factor and simplify the result if possible. Don\'t forget to state domain restrictions.',
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
              question: 'Solve the radical equation: √(x+3) = 5',
              solution: 'Step 1: Understand the equation. We have a square root equal to a number. The radical is already isolated on one side, which is good. Step 2: Square both sides. To eliminate the square root, square both sides: [√(x+3)]² = 5². This gives: x + 3 = 25. Step 3: Solve for x. Subtract 3 from both sides: x + 3 − 3 = 25 − 3, which gives: x = 22. Step 4: CRITICAL: Check the solution. When solving radical equations, we MUST check our answer because squaring can introduce extraneous solutions. Substitute x = 22 into the original equation: √(22+3) = √25 = 5. Since 5 = 5 ✓, the solution is valid. Step 5: Final answer. Therefore, x = 22 is the solution.',
              explanation: 'Always check solutions to radical equations! Squaring both sides can introduce extraneous solutions (solutions that don\'t actually work). This happens because squaring loses information about the sign. For example, if we had √(x+3) = −5, squaring would give the same equation, but −5 is not a valid square root (square roots are non-negative).',
            },
            {
              question: 'Solve the radical equation: √(2x+1) = x−1',
              solution: 'Step 1: Check the domain. For the equation to make sense, we need: 2x+1 ≥ 0 (radicand must be non-negative) and x−1 ≥ 0 (right side must be non-negative since left side is). So: x ≥ −1/2 and x ≥ 1, which means x ≥ 1. Step 2: Square both sides. Square both sides to eliminate the radical: [√(2x+1)]² = (x−1)². This gives: 2x + 1 = (x−1)². Step 3: Expand the right side. (x−1)² = x² − 2x + 1. So: 2x + 1 = x² − 2x + 1. Step 4: Rearrange to form a quadratic equation. Subtract (2x+1) from both sides: 0 = x² − 2x + 1 − 2x − 1, which gives: 0 = x² − 4x. Factor: 0 = x(x − 4). Step 5: Solve the quadratic. Using the zero product property: x = 0 or x − 4 = 0, so x = 0 or x = 4. Step 6: Check both solutions. Check x = 0: Left side: √(2(0)+1) = √1 = 1. Right side: 0 − 1 = −1. Since 1 ≠ −1, x = 0 is NOT a valid solution (it\'s extraneous). Check x = 4: Left side: √(2(4)+1) = √9 = 3. Right side: 4 − 1 = 3. Since 3 = 3 ✓, x = 4 is a valid solution. Step 7: Verify domain. x = 4 satisfies x ≥ 1 ✓. Step 8: Final answer. Therefore, the solution is x = 4. (x = 0 is extraneous and must be rejected).',
              explanation: 'Radical equations often produce extraneous solutions when squaring. Always check every solution in the ORIGINAL equation, not the squared version. Also check domain restrictions: the radicand must be ≥ 0, and if the radical equals an expression, that expression should also be ≥ 0 (since square roots are non-negative).',
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
              question: 'If f(x) = 2x + 3, find f(5)',
              solution: 'Step 1: Understand the notation. f(x) = 2x + 3 means "f is a function of x" where the rule is: multiply x by 2, then add 3. f(5) means "evaluate the function when x = 5". Step 2: Substitute x = 5 into the function. Replace every x in the function with 5: f(5) = 2(5) + 3. Step 3: Evaluate the expression. Follow order of operations: First multiply: 2(5) = 10. Then add: 10 + 3 = 13. Step 4: Write the answer. f(5) = 13. Step 5: Interpret the result. When the input is 5, the function outputs 13. Therefore, f(5) = 13.',
              explanation: 'To evaluate a function f(x) at a specific value, substitute that value for x in the function rule and simplify. This is one of the most fundamental operations with functions.',
            },
            {
              question: 'If f(x) = x² − 4, find f(−2)',
              solution: 'Step 1: Understand the function. f(x) = x² − 4 means: square x, then subtract 4. Step 2: Substitute x = −2. Replace x with −2: f(−2) = (−2)² − 4. Step 3: Evaluate carefully. First, calculate (−2)². Important: (−2)² = (−2) × (−2) = 4 (not −4!). The square of a negative number is positive. Step 4: Complete the calculation. f(−2) = 4 − 4 = 0. Step 5: Verify. We can check: f(−2) = (−2)² − 4 = 4 − 4 = 0 ✓. Step 6: Final answer. Therefore, f(−2) = 0.',
              explanation: 'When substituting negative numbers, be careful with signs. Remember that (−a)² = a² (squaring a negative gives a positive). Always use parentheses when substituting to avoid sign errors.',
            },
            {
              question: 'What is the domain of the function f(x) = 1/(x − 3)?',
              solution: 'Step 1: Understand domain. The domain of a function is all possible input values (x-values) for which the function is defined. Step 2: Identify restrictions. This function has a fraction with denominator (x − 3). The denominator cannot be zero because division by zero is undefined. Step 3: Find when denominator equals zero. Set the denominator equal to zero: x − 3 = 0. Solve: x = 3. Step 4: Determine the domain. Since x = 3 makes the denominator zero, we must exclude x = 3. The domain is all real numbers EXCEPT x = 3. Step 5: Write in proper notation. Domain: {x | x ∈ ℝ, x ≠ 3} or in interval notation: (−∞, 3) ∪ (3, ∞). Step 6: Verify. Test x = 3: f(3) = 1/(3 − 3) = 1/0, which is undefined ✓. Test x = 0: f(0) = 1/(0 − 3) = 1/(−3) = −1/3, which is defined ✓. Therefore, the domain is all real numbers except 3.',
              explanation: 'For rational functions (fractions), the domain excludes any x-values that make the denominator zero. Always check for division by zero, square roots of negative numbers, and logarithms of non-positive numbers when finding domains.',
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
              question: 'If f(x) = x + 2 and g(x) = 3x, find f(g(4)).',
              solution: 'Step 1: Understand function composition. f(g(4)) means: first apply g to 4, then apply f to that result. We work from the inside out. Step 2: Apply the inner function first. Evaluate g(4): g(x) = 3x, so g(4) = 3(4) = 12. Step 3: Apply the outer function. Now evaluate f(12): f(x) = x + 2, so f(12) = 12 + 2 = 14. Step 4: Write the final answer. f(g(4)) = f(12) = 14. Step 5: Verify the order. f(g(4)) means "f of g of 4". We read from right to left: g of 4 first, then f of that result. This is correct. Step 6: Note about order. f(g(4)) is different from g(f(4)). If we did g(f(4)): f(4) = 4 + 2 = 6, then g(6) = 3(6) = 18, which is different from 14. Step 7: Final answer. Therefore, f(g(4)) = 14.',
              explanation: 'Function composition f(g(x)) means apply g first, then apply f to the result. Always work from the inside out. The notation f(g(x)) is read as "f of g of x", which tells you the order: g first, then f.',
            },
            {
              question: 'If f(x) = x² and g(x) = x + 1, find f(g(x)) and simplify.',
              solution: 'Step 1: Understand the composition. f(g(x)) means: substitute g(x) into the function f. We need to find the expression for f(g(x)). Step 2: Find g(x). g(x) = x + 1. Step 3: Substitute g(x) into f. f(g(x)) = f(x + 1). Since f(x) = x², we substitute (x + 1) for x: f(x + 1) = (x + 1)². Step 4: Expand the expression. (x + 1)² = (x + 1)(x + 1). Using FOIL or the identity (a + b)² = a² + 2ab + b²: (x + 1)² = x² + 2(x)(1) + 1² = x² + 2x + 1. Step 5: Write the final answer. f(g(x)) = x² + 2x + 1. Step 6: Verify with a test value. Test x = 2: g(2) = 2 + 1 = 3, then f(3) = 3² = 9. Check f(g(2)): f(g(2)) = (2 + 1)² = 3² = 9 ✓. Step 7: Final answer. Therefore, f(g(x)) = x² + 2x + 1.',
              explanation: 'To find f(g(x)), substitute the entire expression g(x) wherever x appears in f(x). Then simplify the resulting expression. This gives you a new function that represents the composition.',
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
              question: 'Find the inverse function of f(x) = 2x + 3.',
              solution: 'Step 1: Understand inverse functions. The inverse function f⁻¹(x) "undoes" what f(x) does. If f(a) = b, then f⁻¹(b) = a. Step 2: Replace f(x) with y. Write: y = 2x + 3. Step 3: Swap x and y. This is the key step: x = 2y + 3. Step 4: Solve for y. We need to isolate y: x = 2y + 3. Subtract 3 from both sides: x − 3 = 2y. Divide both sides by 2: (x − 3) / 2 = y. So: y = (x − 3) / 2. Step 5: Write the inverse function. f⁻¹(x) = (x − 3) / 2. Step 6: Verify the inverse. Check: f(f⁻¹(x)) = f((x−3)/2) = 2((x−3)/2) + 3 = (x−3) + 3 = x ✓. Also: f⁻¹(f(x)) = f⁻¹(2x+3) = ((2x+3)−3)/2 = (2x)/2 = x ✓. Both compositions give x, confirming it\'s the correct inverse. Step 7: Final answer. Therefore, f⁻¹(x) = (x − 3) / 2.',
              explanation: 'To find the inverse: (1) Replace f(x) with y, (2) Swap x and y, (3) Solve for y, (4) Replace y with f⁻¹(x). Always verify that f(f⁻¹(x)) = x and f⁻¹(f(x)) = x. The inverse "undoes" the original function.',
            },
            {
              question: 'If f(x) = x² for x ≥ 0, find the inverse function f⁻¹(x).',
              solution: 'Step 1: Understand the restriction. The function f(x) = x² has domain x ≥ 0. This restriction is necessary because x² is not one-to-one on all real numbers (both 2 and −2 give 4). With x ≥ 0, the function is one-to-one and has an inverse. Step 2: Replace f(x) with y. Write: y = x², where x ≥ 0. Step 3: Swap x and y. x = y², where y ≥ 0 (since the original x ≥ 0, and we swapped, the new y ≥ 0). Step 4: Solve for y. x = y². Taking the square root: y = √x. Since we had y ≥ 0, we take the positive square root, so y = √x (not −√x). Step 5: Write the inverse function. f⁻¹(x) = √x. Step 6: Determine the domain of the inverse. Since the range of f(x) = x² (with x ≥ 0) is y ≥ 0, the domain of f⁻¹(x) = √x is x ≥ 0. Step 7: Verify the inverse. Check: f(f⁻¹(x)) = f(√x) = (√x)² = x (for x ≥ 0) ✓. f⁻¹(f(x)) = f⁻¹(x²) = √(x²) = x (for x ≥ 0) ✓. Step 8: Final answer. Therefore, f⁻¹(x) = √x, with domain x ≥ 0.',
              explanation: 'For functions that aren\'t one-to-one on their entire domain (like x²), we need to restrict the domain to make them one-to-one before finding the inverse. The domain of f becomes the range of f⁻¹, and the range of f becomes the domain of f⁻¹.',
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
              question: 'What is the degree of the polynomial 3x⁴ − 2x² + 5?',
              solution: 'Step 1: Understand polynomial degree. The degree of a polynomial is the highest power of the variable that appears in the polynomial. Step 2: Identify all terms and their powers. Term 1: 3x⁴ (power = 4). Term 2: −2x² (power = 2). Term 3: 5 (power = 0, since 5 = 5x⁰). Step 3: Find the highest power. The powers are: 4, 2, and 0. The highest is 4. Step 4: Determine the degree. Since the highest power is 4, the degree of the polynomial is 4. Step 5: Note about the constant term. The constant term 5 has degree 0 (it can be written as 5x⁰), but it doesn\'t affect the overall degree since 0 < 4. Step 6: Final answer. Therefore, the degree of the polynomial 3x⁴ − 2x² + 5 is 4.',
              explanation: 'The degree is determined by the term with the highest exponent. Coefficients don\'t affect the degree. A constant term has degree 0. The degree tells us the highest power behavior of the polynomial.',
            },
            {
              question: 'Add the polynomials: (2x² + 3x − 1) + (x² − 2x + 4)',
              solution: 'Step 1: Understand polynomial addition. To add polynomials, combine like terms (terms with the same variable and exponent). Step 2: Identify like terms. x² terms: 2x² and x². x terms: 3x and −2x. Constant terms: −1 and 4. Step 3: Combine x² terms. 2x² + x² = (2 + 1)x² = 3x². Step 4: Combine x terms. 3x + (−2x) = 3x − 2x = (3 − 2)x = x (or 1x). Step 5: Combine constant terms. −1 + 4 = 3. Step 6: Write the result. (2x² + 3x − 1) + (x² − 2x + 4) = 3x² + x + 3. Step 7: Verify. Check: 3x² + x + 3. x² terms: 3x² ✓, x terms: x ✓, constants: 3 ✓. Step 8: Final answer. Therefore, (2x² + 3x − 1) + (x² − 2x + 4) = 3x² + x + 3.',
              explanation: 'Polynomial addition is done by combining like terms. Like terms have the same variable raised to the same power. Add the coefficients, keep the variable part the same. Always verify by checking that all terms are accounted for.',
            },
            {
              question: 'Multiply the binomials: (x + 2)(x − 3)',
              solution: 'Step 1: Understand the problem. We need to multiply two binomials. Step 2: Method 1 - Use the distributive property. (x + 2)(x − 3) = x(x − 3) + 2(x − 3). Step 3: Distribute x. x(x − 3) = x × x + x × (−3) = x² − 3x. Step 4: Distribute 2. 2(x − 3) = 2 × x + 2 × (−3) = 2x − 6. Step 5: Combine the results. (x + 2)(x − 3) = (x² − 3x) + (2x − 6) = x² − 3x + 2x − 6. Step 6: Combine like terms. −3x + 2x = −x. So: x² − x − 6. Step 7: Method 2 - Use FOIL. FOIL stands for First, Outer, Inner, Last. First: x × x = x². Outer: x × (−3) = −3x. Inner: 2 × x = 2x. Last: 2 × (−3) = −6. Sum: x² − 3x + 2x − 6 = x² − x − 6. Step 8: Verify by expanding. Check: (x + 2)(x − 3) = x² − 3x + 2x − 6 = x² − x − 6 ✓. Step 9: Final answer. Therefore, (x + 2)(x − 3) = x² − x − 6.',
              explanation: 'To multiply binomials, use the distributive property (each term in first multiplies each term in second) or FOIL method. Both give the same result. Always combine like terms in the final answer. FOIL is just a mnemonic for the distributive property applied to two binomials.',
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
              question: 'Solve the quadratic equation x² − 5x + 6 = 0 using the quadratic formula.',
              solution: 'Step 1: Identify coefficients. Standard form: ax² + bx + c = 0. For x² − 5x + 6 = 0: a = 1, b = −5, c = 6. Step 2: Recall the quadratic formula. x = (−b ± √(b² − 4ac)) / (2a). Step 3: Calculate the discriminant. Discriminant = b² − 4ac = (−5)² − 4(1)(6) = 25 − 24 = 1. Since the discriminant is positive (1 > 0), there are two real solutions. Step 4: Substitute into the formula. x = (−(−5) ± √1) / (2 × 1) = (5 ± 1) / 2. Step 5: Calculate both solutions. Case 1 (using +): x = (5 + 1) / 2 = 6 / 2 = 3. Case 2 (using −): x = (5 − 1) / 2 = 4 / 2 = 2. Step 6: Verify both solutions. Check x = 3: (3)² − 5(3) + 6 = 9 − 15 + 6 = 0 ✓. Check x = 2: (2)² − 5(2) + 6 = 4 − 10 + 6 = 0 ✓. Step 7: Final answer. Therefore, the solutions are x = 3 or x = 2.',
              explanation: 'The quadratic formula works for any quadratic equation. Calculate the discriminant first to determine the number of solutions. Be careful with signs, especially with −b. Always verify your solutions by substituting back into the original equation.',
            },
            {
              question: 'How many real solutions does the equation x² + 4x + 5 = 0 have?',
              solution: 'Step 1: Identify coefficients. Standard form: ax² + bx + c = 0. For x² + 4x + 5 = 0: a = 1, b = 4, c = 5. Step 2: Calculate the discriminant. Discriminant = b² − 4ac = 4² − 4(1)(5) = 16 − 20 = −4. Step 3: Interpret the discriminant. The discriminant is −4, which is negative (< 0). Step 4: Apply the discriminant rule. When discriminant < 0: The quadratic equation has NO real solutions. The solutions would be complex numbers (involving the imaginary unit i). Step 5: Understand why. In the quadratic formula x = (−b ± √(b²−4ac)) / (2a), we have √(b²−4ac) = √(−4) = 2i (where i = √(−1)). This gives complex solutions: x = (−4 ± 2i) / 2 = −2 ± i. Step 6: Verify by checking if the quadratic can be factored. Try to factor: We need two numbers that multiply to 5 and add to 4. The factors of 5 are 1 and 5, or −1 and −5. None of these add to 4, confirming it doesn\'t factor over real numbers. Step 7: Final answer. Therefore, the equation x² + 4x + 5 = 0 has NO real solutions. It has two complex solutions: x = −2 + i and x = −2 − i.',
              explanation: 'The discriminant (b² − 4ac) determines the nature of solutions: positive = two real solutions, zero = one real solution (repeated), negative = no real solutions (two complex solutions). This is a quick way to determine solution types without solving the full equation.',
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
              question: 'Complete the square for the expression: x² + 6x + 5',
              solution: 'Step 1: Understand completing the square. We want to write x² + 6x + 5 in the form (x + h)² + k. Step 2: Focus on the x² and x terms. Look at x² + 6x. To complete the square, we need to add (b/2)², where b is the coefficient of x. Here b = 6, so we add (6/2)² = 3² = 9. Step 3: Add and subtract 9. To maintain equality, we add 9 and subtract 9: x² + 6x + 5 = x² + 6x + 9 − 9 + 5. Step 4: Group the perfect square. x² + 6x + 9 is a perfect square: (x + 3)² (since (x + 3)² = x² + 6x + 9). Step 5: Simplify the constant. −9 + 5 = −4. Step 6: Write in completed square form. x² + 6x + 5 = (x² + 6x + 9) + 5 − 9 = (x + 3)² − 4. Step 7: Verify by expanding. Check: (x + 3)² − 4 = x² + 6x + 9 − 4 = x² + 6x + 5 ✓. Step 8: Final answer. Therefore, x² + 6x + 5 = (x + 3)² − 4.',
              explanation: 'Completing the square: take half the coefficient of x, square it, add and subtract that value. This creates a perfect square trinomial. The formula: x² + bx + c = (x + b/2)² + (c − (b/2)²).',
            },
            {
              question: 'Solve the quadratic equation by completing the square: x² − 4x − 5 = 0',
              solution: 'Step 1: Move the constant to the right side. x² − 4x − 5 = 0 becomes: x² − 4x = 5. Step 2: Complete the square on the left side. For x² − 4x, the coefficient of x is −4. Half of −4 is −2. Square it: (−2)² = 4. Add 4 to both sides: x² − 4x + 4 = 5 + 4. Step 3: Write as a perfect square. The left side is now a perfect square: x² − 4x + 4 = (x − 2)². So: (x − 2)² = 9. Step 4: Take the square root of both sides. √[(x − 2)²] = √9. This gives: |x − 2| = 3. Since we\'re solving, we have: x − 2 = 3 OR x − 2 = −3. Step 5: Solve each case. Case 1: x − 2 = 3 → x = 3 + 2 = 5. Case 2: x − 2 = −3 → x = −3 + 2 = −1. Step 6: Verify both solutions. Check x = 5: (5)² − 4(5) − 5 = 25 − 20 − 5 = 0 ✓. Check x = −1: (−1)² − 4(−1) − 5 = 1 + 4 − 5 = 0 ✓. Step 7: Final answer. Therefore, the solutions are x = 5 or x = −1.',
              explanation: 'Completing the square is an alternative to the quadratic formula. The steps: (1) Move constant to right, (2) Add (b/2)² to both sides, (3) Write left side as perfect square, (4) Take square root, (5) Solve for x. Always check both the positive and negative square root.',
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
              question: 'Solve the system of equations: 2x + y = 7 and x − y = 2',
              solution: 'Step 1: Choose a method. Both equations have y terms with opposite coefficients (y and −y). This makes elimination ideal - we can add the equations to eliminate y. Step 2: Add the equations. (2x + y = 7) + (x − y = 2). Add left sides: 2x + y + x − y = 3x. Add right sides: 7 + 2 = 9. So: 3x = 9. Step 3: Solve for x. Divide both sides by 3: 3x ÷ 3 = 9 ÷ 3, which gives: x = 3. Step 4: Substitute x into one equation to find y. Use the simpler equation: x − y = 2. Substitute x = 3: 3 − y = 2. Subtract 3 from both sides: −y = 2 − 3 = −1. Multiply by −1: y = 1. Step 5: Verify the solution. Check in first equation: 2(3) + 1 = 6 + 1 = 7 ✓. Check in second equation: 3 − 1 = 2 ✓. Both equations are satisfied. Step 6: Final answer. Therefore, the solution is x = 3 and y = 1.',
              explanation: 'Elimination works well when coefficients of one variable are opposites or can be made opposites. Adding equations eliminates that variable. Always verify your solution by checking in both original equations.',
            },
            {
              question: 'How many solutions does the system 2x + 3y = 6 and 4x + 6y = 12 have?',
              solution: 'Step 1: Analyze the equations. Equation 1: 2x + 3y = 6. Equation 2: 4x + 6y = 12. Step 2: Check if one is a multiple of the other. Notice: 4x + 6y = 2(2x + 3y). And 12 = 2(6). So: 4x + 6y = 2(2x + 3y) = 2(6) = 12. This means Equation 2 is exactly 2 times Equation 1. Step 3: Understand what this means. If one equation is a constant multiple of the other, they represent the SAME line (not two different lines). Step 4: Determine the number of solutions. Since both equations represent the same line, every point on that line satisfies both equations. There are infinitely many solutions. This is called a "dependent" system. Step 5: Verify by solving. If we try to solve: From Equation 1: 2x + 3y = 6, so 3y = 6 − 2x, so y = 2 − (2/3)x. This gives infinitely many (x, y) pairs. Step 6: Final answer. Therefore, the system has INFINITE solutions (the equations are dependent - they represent the same line).',
              explanation: 'When one equation is a multiple of the other, they\'re the same line = infinite solutions (dependent system). When lines are parallel (same slope, different y-intercept) = no solution (inconsistent). When lines intersect = one solution (independent). Always check the relationship between equations first.',
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
          why: 'Age problems are common word problems that test your ability to translate relationships into equations. They require understanding that age differences remain constant over time.',
          when: 'Use when: problems involve ages, time passing (past or future), age relationships (like "twice as old", "5 years older"), or comparing ages at different times.',
          where: 'Applied in: word problems involving people\'s ages, time-based relationships, and problems where quantities change over time but differences remain constant.',
          conditions: [
            'Set up: Current ages first, then ages in past/future',
            'Key principle: Age difference is constant - if A is x years older than B now, A will always be x years older than B',
            'If A is x years older than B now, always x years older',
            'Use variables for unknown ages - typically let the younger person\'s age be x',
            'When time passes: add the same number of years to all ages',
            'When going to the past: subtract the same number of years from all ages',
          ],
          examples: [
            {
              question: 'John is currently 3 times as old as Mary. In 5 years from now, the sum of their ages will be 50 years. What are their current ages?',
              solution: 'Step 1: Define variables for current ages. Let Mary\'s current age = x years. Since John is 3 times as old as Mary, John\'s current age = 3x years. Step 2: Determine ages in 5 years. In 5 years, Mary will be: x + 5 years old. In 5 years, John will be: 3x + 5 years old. Step 3: Set up the equation from the given information. The sum of their ages in 5 years is 50: (x + 5) + (3x + 5) = 50. Step 4: Simplify the equation. Combine like terms: x + 5 + 3x + 5 = 50, which gives: 4x + 10 = 50. Step 5: Solve for x. Subtract 10 from both sides: 4x = 50 − 10 = 40. Divide both sides by 4: x = 40 ÷ 4 = 10. Step 6: Find both current ages. Mary\'s current age = x = 10 years. John\'s current age = 3x = 3 × 10 = 30 years. Step 7: Verify the answer. Current ages: Mary = 10, John = 30. In 5 years: Mary = 15, John = 35. Sum = 15 + 35 = 50. ✓ Correct!',
              explanation: 'This problem requires setting up variables for current ages, then expressing future ages, and finally creating an equation. The key is that when 5 years pass, both people age by 5 years. We let Mary\'s age be x because she is younger, making John\'s age 3x. The equation comes from the sum of their future ages equaling 50.',
            },
            {
              question: 'A father is currently 4 times as old as his son. In 20 years from now, the father will be exactly twice as old as his son. What are their current ages?',
              solution: 'Step 1: Define variables for current ages. Let son\'s current age = x years. Since father is 4 times as old, father\'s current age = 4x years. Step 2: Determine ages in 20 years. In 20 years, son will be: x + 20 years old. In 20 years, father will be: 4x + 20 years old. Step 3: Set up the equation from the relationship in 20 years. In 20 years, father will be twice as old as son: 4x + 20 = 2(x + 20). Step 4: Expand the right side. 4x + 20 = 2x + 40. Step 5: Solve for x. Subtract 2x from both sides: 4x − 2x + 20 = 40, which gives: 2x + 20 = 40. Subtract 20 from both sides: 2x = 40 − 20 = 20. Divide both sides by 2: x = 20 ÷ 2 = 10. Step 6: Find both current ages. Son\'s current age = x = 10 years. Father\'s current age = 4x = 4 × 10 = 40 years. Step 7: Verify the answer. Current ages: Son = 10, Father = 40. In 20 years: Son = 30, Father = 60. Check: Is 60 = 2 × 30? Yes! ✓ Correct!',
              explanation: 'This problem involves a changing ratio relationship. Currently, the father is 4 times as old, but in 20 years, he will only be 2 times as old. This happens because the age difference (30 years) remains constant, but as they both age, the ratio changes. We set up an equation based on the future relationship and solve for the current ages.',
            },
            {
              question: 'Sarah is 5 years older than her brother Tom. Three years ago, Sarah was twice as old as Tom. What are their current ages?',
              solution: 'Step 1: Define variables for current ages. Let Tom\'s current age = x years. Since Sarah is 5 years older, Sarah\'s current age = x + 5 years. Step 2: Determine ages 3 years ago. Three years ago, Tom was: x − 3 years old. Three years ago, Sarah was: (x + 5) − 3 = x + 2 years old. Step 3: Set up the equation from the past relationship. Three years ago, Sarah was twice as old as Tom: x + 2 = 2(x − 3). Step 4: Expand the right side. x + 2 = 2x − 6. Step 5: Solve for x. Subtract x from both sides: 2 = 2x − x − 6, which gives: 2 = x − 6. Add 6 to both sides: 2 + 6 = x, so x = 8. Step 6: Find both current ages. Tom\'s current age = x = 8 years. Sarah\'s current age = x + 5 = 8 + 5 = 13 years. Step 7: Verify the answer. Current ages: Tom = 8, Sarah = 13. Three years ago: Tom = 5, Sarah = 10. Check: Is 10 = 2 × 5? Yes! ✓ Correct!',
              explanation: 'This problem involves going back in time. The key is that the age difference (5 years) remains constant. Three years ago, both were 3 years younger. We set up an equation based on the past relationship where Sarah was twice Tom\'s age, then solve for current ages.',
            },
            {
              question: 'The sum of the ages of a mother and her daughter is 45 years. Five years ago, the mother was 6 times as old as her daughter. What are their current ages?',
              solution: 'Step 1: Define variables for current ages. Let daughter\'s current age = x years. Then mother\'s current age = (45 − x) years (since their sum is 45). Step 2: Determine ages 5 years ago. Five years ago, daughter was: x − 5 years old. Five years ago, mother was: (45 − x) − 5 = 40 − x years old. Step 3: Set up the equation from the past relationship. Five years ago, mother was 6 times as old as daughter: 40 − x = 6(x − 5). Step 4: Expand the right side. 40 − x = 6x − 30. Step 5: Solve for x. Add x to both sides: 40 = 6x + x − 30, which gives: 40 = 7x − 30. Add 30 to both sides: 40 + 30 = 7x, so 70 = 7x. Divide both sides by 7: x = 70 ÷ 7 = 10. Step 6: Find both current ages. Daughter\'s current age = x = 10 years. Mother\'s current age = 45 − x = 45 − 10 = 35 years. Step 7: Verify the answer. Current ages: Daughter = 10, Mother = 35. Sum = 10 + 35 = 45. ✓ Five years ago: Daughter = 5, Mother = 30. Check: Is 30 = 6 × 5? Yes! ✓ Correct!',
              explanation: 'This problem gives us the sum of current ages and a past relationship. We use the sum to express one age in terms of the other, then set up an equation based on the past relationship. The key is carefully handling the subtraction when going back in time.',
            },
          ],
          commonMistakes: [
            'Not accounting for time passing correctly - remember to add/subtract the same number to ALL ages',
            'Confusing current and future ages - clearly label which time period you\'re working with',
            'Not using age difference property - the difference between ages never changes',
            'Making errors when going to the past - subtract years, not add',
            'Forgetting to verify the answer by checking both the current relationship and the time-based relationship',
          ],
          tips: [
            'Age difference never changes - this is the most important principle',
            'Set up: current ages first, then future/past ages - be systematic',
            'Use variables clearly - typically let the younger person\'s age be x',
            'Always verify by checking both the given relationships',
            'Draw a timeline if it helps visualize the problem',
            'When the problem mentions "in n years", add n to all current ages',
            'When the problem mentions "n years ago", subtract n from all current ages',
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
              question: 'If you mix 20 liters of 30% acid solution with 30 liters of 50% acid solution, what is the final concentration of acid?',
              solution: 'Step 1: Understand the problem. We\'re mixing two solutions with different acid concentrations. We need to find the concentration of the resulting mixture. Step 2: Calculate the amount of pure acid in the first solution. First solution: 20L of 30% acid. Pure acid = Volume × Concentration = 20L × 0.30 = 6L. Step 3: Calculate the amount of pure acid in the second solution. Second solution: 30L of 50% acid. Pure acid = Volume × Concentration = 30L × 0.50 = 15L. Step 4: Find the total amount of pure acid. Total pure acid = Acid from first + Acid from second = 6L + 15L = 21L. Step 5: Find the total volume of the mixture. Total volume = Volume of first + Volume of second = 20L + 30L = 50L. Step 6: Calculate the final concentration. Final concentration = (Total pure acid / Total volume) × 100% = (21L / 50L) × 100% = 0.42 × 100% = 42%. Step 7: Verify. Check: 50L of 42% solution contains: 50 × 0.42 = 21L of pure acid ✓. This matches our calculation. Step 8: Final answer. Therefore, the final concentration is 42%.',
              explanation: 'For mixture problems, find the amount of the "pure substance" (acid in this case) in each part, add them together, then divide by the total volume to get the concentration. The key principle: Total pure substance before mixing = Total pure substance after mixing.',
            },
            {
              question: 'How much of a 40% acid solution must be mixed with 20 liters of a 60% acid solution to obtain a 50% acid solution?',
              solution: 'Step 1: Define the variable. Let x = the amount (in liters) of 40% solution needed. Step 2: Set up a table to organize information. Solution 1: x liters of 40% acid. Solution 2: 20 liters of 60% acid. Final mixture: (x + 20) liters of 50% acid. Step 3: Calculate pure acid in each solution. Pure acid in 40% solution = x × 0.40 = 0.40x liters. Pure acid in 60% solution = 20 × 0.60 = 12 liters. Pure acid in final mixture = (x + 20) × 0.50 = 0.50(x + 20) liters. Step 4: Set up the equation. The key principle: Pure acid before mixing = Pure acid after mixing. So: 0.40x + 12 = 0.50(x + 20). Step 5: Solve the equation. Expand the right side: 0.40x + 12 = 0.50x + 10. Subtract 0.40x from both sides: 12 = 0.10x + 10. Subtract 10 from both sides: 2 = 0.10x. Divide by 0.10: x = 2 / 0.10 = 20 liters. Step 6: Verify the answer. Check: Mix 20L of 40% with 20L of 60%. Pure acid: 20×0.40 + 20×0.60 = 8 + 12 = 20L. Total volume: 40L. Concentration: 20/40 = 0.50 = 50% ✓. Step 7: Final answer. Therefore, 20 liters of the 40% solution must be mixed with 20 liters of the 60% solution.',
              explanation: 'For mixture problems where you need to find an unknown quantity, set up an equation based on: Amount of pure substance before = Amount of pure substance after. Use a table to organize: Solution | Volume | Concentration | Pure Substance. This helps avoid errors.',
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
          why: 'Distance problems are very common in tests. Understanding the relationship between distance, rate (speed), and time is essential. These problems test your ability to set up equations from word descriptions.',
          when: 'Use when: problems involve travel, speed, distance, time, meeting points, catching up, or relative motion. Also use for problems about trains, cars, boats, planes, or any moving objects.',
          where: 'Applied in: word problems involving motion, travel, transportation, and any scenario where objects move at constant speeds.',
          conditions: [
            'Fundamental formula: Distance = Rate × Time (d = rt)',
            'Derived formulas: Rate = Distance ÷ Time, Time = Distance ÷ Rate',
            'When objects move toward each other (opposite directions): add their speeds to get relative speed',
            'When objects move in same direction: subtract speeds to get relative speed',
            'When objects meet: sum of distances traveled = total distance between starting points',
            'When one catches up: distances traveled are equal at the meeting point',
            'Always use consistent units (all distances in same unit, all times in same unit)',
            'Convert units if necessary before calculating',
          ],
          examples: [
            {
              question: 'Two cars start 200 km apart and drive toward each other. Car A travels at 60 km/h and Car B travels at 80 km/h. How long will it take for them to meet?',
              solution: 'Step 1: Understand the situation. The cars are moving toward each other, so they are closing the distance between them. Step 2: Identify given information. Distance between starting points = 200 km. Car A speed = 60 km/h. Car B speed = 80 km/h. Step 3: Calculate relative speed. When objects move toward each other, we add their speeds: Relative speed = 60 + 80 = 140 km/h. This means they are closing the gap at 140 km per hour. Step 4: Use the formula: Time = Distance ÷ Rate. Time to meet = 200 km ÷ 140 km/h. Step 5: Calculate: 200 ÷ 140 = 200/140 = 20/14 = 10/7 hours. Step 6: Convert to decimal if needed: 10/7 ≈ 1.43 hours. Step 7: Convert to hours and minutes: 1.43 hours = 1 hour + 0.43 × 60 minutes = 1 hour 26 minutes (approximately). Therefore, they will meet in approximately 1 hour and 26 minutes.',
              explanation: 'When two objects move toward each other, their speeds combine to close the distance faster. We add the speeds to find how fast the gap between them is closing. Then we use Time = Distance ÷ Rate to find when they meet. The key insight is that the relative speed is the sum of individual speeds when moving toward each other.',
            },
            {
              question: 'Car A leaves a town at 9:00 AM traveling at 50 km/h. Car B leaves the same town at 10:00 AM traveling at 70 km/h in the same direction. At what time will Car B catch up to Car A?',
              solution: 'Step 1: Understand the situation. Both cars travel in the same direction, with Car B starting later but traveling faster. Step 2: Find Car A\'s head start. Car A starts at 9:00 AM, Car B starts at 10:00 AM. Time difference = 1 hour. In that 1 hour, Car A travels: Distance = Rate × Time = 50 km/h × 1 hour = 50 km. So Car A has a 50 km head start. Step 3: Calculate relative speed. Since they move in the same direction, we subtract speeds: Relative speed = 70 − 50 = 20 km/h. This means Car B closes the gap at 20 km per hour. Step 4: Find time for Car B to catch up. Time = Distance ÷ Rate = 50 km ÷ 20 km/h = 2.5 hours. Step 5: Calculate the meeting time. Car B starts at 10:00 AM. After 2.5 hours: 10:00 AM + 2 hours 30 minutes = 12:30 PM. Therefore, Car B will catch up to Car A at 12:30 PM. Step 6: Verify. At 12:30 PM: Car A has been traveling for 3.5 hours: 50 × 3.5 = 175 km. Car B has been traveling for 2.5 hours: 70 × 2.5 = 175 km. Both are at the same distance! ✓',
              explanation: 'This is a "catching up" problem. The key steps are: (1) Calculate the head start distance that the first car gains, (2) Find the relative speed (difference in speeds when going same direction), (3) Use Time = Distance ÷ Rate to find catch-up time, (4) Add this time to the later start time. Always verify by checking that both have traveled the same distance at the meeting time.',
            },
            {
              question: 'A train travels 300 km at a constant speed. If it had traveled 10 km/h faster, it would have taken 1 hour less. What was the original speed of the train?',
              solution: 'Step 1: Define variables. Let the original speed = r km/h. Let the original time = t hours. Step 2: Set up the first equation from the original trip. Using d = rt: 300 = r × t. This gives us: t = 300/r. Step 3: Set up the second scenario. New speed = (r + 10) km/h. New time = (t − 1) hours (1 hour less). Step 4: Set up the second equation. Using d = rt for the new scenario: 300 = (r + 10) × (t − 1). Step 5: Substitute t from step 2. 300 = (r + 10) × (300/r − 1). Step 6: Expand and simplify. 300 = (r + 10) × (300/r − 1) = (r + 10) × (300 − r)/r = (r + 10)(300 − r)/r. Step 7: Multiply both sides by r. 300r = (r + 10)(300 − r). Step 8: Expand the right side. 300r = 300r − r² + 3000 − 10r = 290r − r² + 3000. Step 9: Rearrange to form quadratic equation. Subtract 300r from both sides: 0 = 290r − r² + 3000 − 300r = −r² − 10r + 3000. Multiply by −1: r² + 10r − 3000 = 0. Step 10: Solve the quadratic equation. Factor: (r + 60)(r − 50) = 0. So r = −60 (reject, speed cannot be negative) or r = 50. Step 11: Final answer. The original speed was 50 km/h. Step 12: Verify. Original: 300 km ÷ 50 km/h = 6 hours. New: 300 km ÷ 60 km/h = 5 hours. Difference = 1 hour. ✓ Correct!',
              explanation: 'This problem requires setting up two equations based on the distance-rate-time relationship. We use the fact that distance is constant (300 km) but speed and time change. The key is to express time in terms of speed, then set up an equation comparing the two scenarios. This leads to a quadratic equation that we solve to find the original speed.',
            },
            {
              question: 'A boat travels 24 km upstream (against the current) in 4 hours and the same distance downstream (with the current) in 3 hours. What is the speed of the boat in still water and the speed of the current?',
              solution: 'Step 1: Define variables. Let boat speed in still water = b km/h. Let current speed = c km/h. Step 2: Understand effective speeds. Upstream (against current): Effective speed = b − c (current slows the boat). Downstream (with current): Effective speed = b + c (current helps the boat). Step 3: Set up upstream equation. Distance = 24 km, Time = 4 hours, Speed = (b − c) km/h. Using d = rt: 24 = (b − c) × 4. Divide both sides by 4: b − c = 24 ÷ 4 = 6. So: b − c = 6. (Equation 1) Step 4: Set up downstream equation. Distance = 24 km, Time = 3 hours, Speed = (b + c) km/h. Using d = rt: 24 = (b + c) × 3. Divide both sides by 3: b + c = 24 ÷ 3 = 8. So: b + c = 8. (Equation 2) Step 5: Solve the system of equations. Add Equation 1 and Equation 2: (b − c) + (b + c) = 6 + 8. This gives: 2b = 14, so b = 7 km/h. Step 6: Find current speed. Substitute b = 7 into Equation 2: 7 + c = 8, so c = 8 − 7 = 1 km/h. Step 7: Verify. Upstream: (7 − 1) × 4 = 6 × 4 = 24 km. ✓ Downstream: (7 + 1) × 3 = 8 × 3 = 24 km. ✓ Correct! Therefore, boat speed in still water = 7 km/h, current speed = 1 km/h.',
              explanation: 'This is a classic upstream/downstream problem. The key is understanding that the current affects the boat\'s effective speed: subtract current speed when going upstream, add when going downstream. We set up two equations using the distance-rate-time formula, then solve the system to find both the boat speed and current speed. Always verify by checking both scenarios.',
            },
          ],
          commonMistakes: [
            'Not accounting for head starts - calculate how far the first object travels before the second starts',
            'Wrong relative speed calculation - remember: opposite directions = add speeds, same direction = subtract speeds',
            'Time unit errors - make sure all times are in the same units before calculating',
            'Forgetting to convert time to the requested format (hours to hours:minutes)',
            'Not verifying answers by checking that distances or times match in both scenarios',
            'Confusing when to add vs subtract speeds - draw a diagram to visualize direction',
          ],
          tips: [
            'Draw a diagram - visualize the situation with arrows showing directions',
            'Opposite directions: add speeds to get relative speed',
            'Same direction: subtract speeds to get relative speed',
            'Check time units - convert everything to the same unit (hours, minutes, or seconds)',
            'Always verify your answer by plugging back into the original problem',
            'For catching up problems: find head start distance first, then use relative speed',
            'For meeting problems: use relative speed and total distance',
            'Set up a table: Object | Rate | Time | Distance, then fill in what you know',
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
              question: 'Solve the exponential equation: 2ˣ = 16',
              solution: 'Step 1: Understand the equation. We have an exponential equation where the variable is in the exponent. Step 2: Express 16 as a power of 2. We need to write 16 as 2 raised to some power. 16 = 2⁴ (since 2⁴ = 2 × 2 × 2 × 2 = 16). Step 3: Rewrite the equation with the same base. 2ˣ = 16 becomes: 2ˣ = 2⁴. Step 4: Apply the property. If bᵐ = bⁿ (where b > 0 and b ≠ 1), then m = n. Since both sides have base 2, we can set the exponents equal: x = 4. Step 5: Verify the solution. Check: 2⁴ = 16 ✓. Step 6: Final answer. Therefore, x = 4.',
              explanation: 'To solve exponential equations, try to express both sides with the same base. Then set the exponents equal. This is the fastest method when you can recognize powers (like 16 = 2⁴, 27 = 3³, etc.).',
            },
            {
              question: 'Solve the exponential equation: 3ˣ⁺¹ = 27',
              solution: 'Step 1: Understand the equation. We have 3 raised to the power (x + 1) equals 27. Step 2: Express 27 as a power of 3. 27 = 3³ (since 3³ = 3 × 3 × 3 = 27). Step 3: Rewrite the equation. 3ˣ⁺¹ = 27 becomes: 3ˣ⁺¹ = 3³. Step 4: Set exponents equal. Since both sides have base 3, the exponents must be equal: x + 1 = 3. Step 5: Solve for x. Subtract 1 from both sides: x + 1 − 1 = 3 − 1, which gives: x = 2. Step 6: Verify the solution. Check: 3²⁺¹ = 3³ = 27 ✓. Step 7: Final answer. Therefore, x = 2.',
              explanation: 'When the bases are the same, set the exponents equal and solve the resulting equation. This works because exponential functions are one-to-one (each input gives a unique output).',
            },
            {
              question: 'Solve the exponential equation: 5ˣ = 25',
              solution: 'Step 1: Express 25 as a power of 5. 25 = 5² (since 5² = 5 × 5 = 25). Step 2: Rewrite the equation. 5ˣ = 25 becomes: 5ˣ = 5². Step 3: Set exponents equal. Since both sides have base 5: x = 2. Step 4: Verify. Check: 5² = 25 ✓. Step 5: Final answer. Therefore, x = 2.',
              explanation: 'This is a straightforward case where we recognize 25 as 5². Memorizing common powers (2²=4, 2³=8, 2⁴=16, 3²=9, 3³=27, 5²=25, etc.) speeds up solving exponential equations.',
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
              question: 'Solve the logarithmic equation: log₂(x) = 3',
              solution: 'Step 1: Understand the logarithm. log₂(x) = 3 asks: "What power of 2 equals x?" In other words, 2³ = x. Step 2: Convert to exponential form. The definition: log_b(a) = c means b^c = a. So: log₂(x) = 3 means 2³ = x. Step 3: Calculate 2³. 2³ = 2 × 2 × 2 = 8. Step 4: Write the solution. x = 8. Step 5: Verify. Check: log₂(8) = ? We ask: 2^? = 8. Since 2³ = 8, we have log₂(8) = 3 ✓. Step 6: Check domain. For log₂(x), we need x > 0. Since x = 8 > 0, the solution is valid. Step 7: Final answer. Therefore, x = 8.',
              explanation: 'To solve log_b(x) = c, convert to exponential form: x = b^c. This is the definition of logarithms. Always check that the solution satisfies the domain requirement (argument of log must be positive).',
            },
            {
              question: 'Solve the logarithmic equation: log(x) + log(x + 3) = 1',
              solution: 'Step 1: Understand the notation. "log" without a base means base 10 (common logarithm). Step 2: Combine the logarithms. Use the property: log(a) + log(b) = log(ab). So: log(x) + log(x + 3) = log(x(x + 3)) = log(x² + 3x). The equation becomes: log(x² + 3x) = 1. Step 3: Convert to exponential form. log(x² + 3x) = 1 means 10¹ = x² + 3x. So: x² + 3x = 10. Step 4: Rearrange to form a quadratic equation. x² + 3x − 10 = 0. Step 5: Solve the quadratic. Factor: (x + 5)(x − 2) = 0. So: x + 5 = 0 or x − 2 = 0, which gives: x = −5 or x = 2. Step 6: Check domain restrictions. For log(x), we need x > 0. For log(x + 3), we need x + 3 > 0, so x > −3. Both conditions require x > 0. Step 7: Verify each solution. Check x = −5: log(−5) is undefined (negative argument) ✗. So x = −5 is rejected. Check x = 2: log(2) + log(2 + 3) = log(2) + log(5) = log(10) = 1 ✓. Step 8: Final answer. Therefore, the solution is x = 2. (x = −5 is extraneous and must be rejected).',
              explanation: 'When solving logarithmic equations, always check domain restrictions. The argument of any logarithm must be positive. Extraneous solutions often arise when solving logarithmic equations, so verification is essential. Combine logs using properties, convert to exponential form, solve, then check all solutions.',
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
              question: 'y varies directly with x. If y = 12 when x = 3, find y when x = 7.',
              solution: 'Step 1: Understand direct variation. "y varies directly with x" means y is proportional to x. The relationship is: y = kx, where k is the constant of variation (proportionality constant). Step 2: Find the constant k. We know y = 12 when x = 3. Substitute into y = kx: 12 = k(3). Solve for k: k = 12 / 3 = 4. Step 3: Write the variation equation. Now we know k = 4, so: y = 4x. Step 4: Find y when x = 7. Substitute x = 7 into y = 4x: y = 4(7) = 28. Step 5: Verify. Check: When x = 3, y = 4(3) = 12 ✓. When x = 7, y = 4(7) = 28 ✓. Also, the ratio y/x is constant: 12/3 = 4 and 28/7 = 4 ✓. Step 6: Final answer. Therefore, when x = 7, y = 28.',
              explanation: 'Direct variation: y = kx, where k is constant. The ratio y/x is always the same. To solve: (1) Find k using given values, (2) Write equation y = kx, (3) Substitute new x value. Direct variation means both increase or decrease together.',
            },
            {
              question: 'y varies inversely with x. If y = 8 when x = 5, find y when x = 10.',
              solution: 'Step 1: Understand inverse variation. "y varies inversely with x" means y is inversely proportional to x. The relationship is: y = k/x, where k is the constant of variation. Step 2: Find the constant k. We know y = 8 when x = 5. Substitute into y = k/x: 8 = k/5. Solve for k: Multiply both sides by 5: k = 8 × 5 = 40. Step 3: Write the variation equation. Now we know k = 40, so: y = 40/x. Step 4: Find y when x = 10. Substitute x = 10 into y = 40/x: y = 40/10 = 4. Step 5: Verify. Check: When x = 5, y = 40/5 = 8 ✓. When x = 10, y = 40/10 = 4 ✓. Also, the product xy is constant: 5 × 8 = 40 and 10 × 4 = 40 ✓. Step 6: Interpret. Notice that when x doubled (from 5 to 10), y halved (from 8 to 4). This is characteristic of inverse variation. Step 7: Final answer. Therefore, when x = 10, y = 4.',
              explanation: 'Inverse variation: y = k/x, where k is constant. The product xy is always the same. To solve: (1) Find k using given values, (2) Write equation y = k/x, (3) Substitute new x value. Inverse variation means as one increases, the other decreases, and vice versa.',
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
              question: 'A triangle has two angles measuring 55° and 65°. What is the measure of the third angle?',
              solution: 'Step 1: Recall the triangle angle sum property. In any triangle, the sum of all three interior angles always equals 180°. This is a fundamental property of triangles. Step 2: Set up the equation. Let the third angle be x. Then: 55° + 65° + x = 180°. Step 3: Calculate the sum of known angles. 55° + 65° = 120°. Step 4: Solve for the third angle. 120° + x = 180°. Subtract 120° from both sides: x = 180° − 120° = 60°. Step 5: Verify the answer. Check: 55° + 65° + 60° = 180° ✓. All angles are positive and less than 180°, which is valid for a triangle. Therefore, the third angle measures 60°.',
              explanation: 'The triangle angle sum property (sum of angles = 180°) is one of the most fundamental properties in geometry. It applies to ALL triangles, regardless of their type (right, acute, obtuse, equilateral, etc.). This property is essential for solving many triangle problems.',
            },
            {
              question: 'A right triangle has legs measuring 9 units and 12 units. Find the length of the hypotenuse.',
              solution: 'Step 1: Identify the triangle type. This is a right triangle, so we can use the Pythagorean theorem. Step 2: Recall the Pythagorean theorem. For a right triangle with legs a and b and hypotenuse c: a² + b² = c². Step 3: Assign values. Let a = 9 and b = 12. We need to find c (the hypotenuse). Step 4: Method 1 - Recognize Pythagorean triple. Notice that 9:12:? could be a multiple of the 3-4-5 triple. Check: 9 = 3 × 3, 12 = 4 × 3. So the scale factor is 3. Therefore, the hypotenuse = 5 × 3 = 15. Step 5: Method 2 - Use the formula directly. Apply the Pythagorean theorem: c² = a² + b² = 9² + 12² = 81 + 144 = 225. Step 6: Find the hypotenuse. c = √225 = 15. Step 7: Verify the answer. Check: 9² + 12² = 81 + 144 = 225, and 15² = 225 ✓. Also, 9:12:15 = 3:4:5 (dividing by 3), confirming it\'s a 3-4-5 triple scaled by 3. Therefore, the hypotenuse is 15 units.',
              explanation: 'The Pythagorean theorem (a² + b² = c²) is essential for right triangles. Recognizing common Pythagorean triples (like 3-4-5, 5-12-13, 8-15-17) can save time, but you can always use the formula directly. Always verify your answer by checking that a² + b² = c².',
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
              question: 'A circle has a radius of 10.5 cm. Find its circumference and area.',
              solution: 'Step 1: Identify given information. Radius r = 10.5 cm. Step 2: Find the circumference. Formula: C = 2πr. Substitute r = 10.5: C = 2 × π × 10.5 = 21π cm. Step 3: Calculate numerical value (if needed). Using π ≈ 3.14159: C = 21 × 3.14159 ≈ 65.97 cm. Step 4: Find the area. Formula: A = πr². Substitute r = 10.5: A = π × (10.5)² = π × 110.25 = 110.25π cm². Step 5: Calculate numerical value (if needed). A = 110.25 × 3.14159 ≈ 346.36 cm². Step 6: Write the answers. Exact values: Circumference = 21π cm, Area = 110.25π cm². Approximate values: Circumference ≈ 65.97 cm, Area ≈ 346.36 cm². Step 7: Verify units. Both answers are in cm and cm² respectively, which is correct. Therefore, the circumference is 21π cm (≈ 65.97 cm) and the area is 110.25π cm² (≈ 346.36 cm²).',
              explanation: 'Remember: circumference uses r (radius), area uses r² (radius squared). Always use radius, not diameter. Leaving answers in terms of π gives exact values, while using π ≈ 3.14 gives approximations. Both are acceptable depending on the problem requirements.',
            },
            {
              question: 'Find the area of a 72° sector of a circle with radius 15 units.',
              solution: 'Step 1: Understand a sector. A sector is a "slice" of a circle, like a piece of pie. The area of a sector is a fraction of the total circle area. Step 2: Find the total circle area. Formula: A = πr². With r = 15: A = π × 15² = π × 225 = 225π square units. Step 3: Determine the fraction of the circle. The sector has a central angle of 72°. A full circle is 360°. So the fraction is: 72/360. Step 4: Simplify the fraction. 72/360 = 72÷72 / 360÷72 = 1/5. So the sector is 1/5 of the circle. Step 5: Calculate the sector area. Sector area = (fraction of circle) × (total area) = (1/5) × 225π = 225π/5 = 45π square units. Step 6: Verify. We can also use the formula directly: Sector area = (θ/360°) × πr² = (72/360) × π × 15² = (1/5) × 225π = 45π ✓. Step 7: Final answer. Therefore, the area of the 72° sector is 45π square units (or approximately 141.37 square units if using π ≈ 3.14159).',
              explanation: 'A sector\'s area is proportional to its central angle. The formula is: Sector area = (θ/360°) × πr², where θ is the central angle in degrees. Always find the fraction first (angle/360°), then multiply by the total area. This makes the calculation clear and easy to verify.',
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
              question: 'Find the sum of the interior angles of a hexagon.',
              solution: 'Step 1: Identify the polygon. A hexagon has 6 sides, so n = 6. Step 2: Recall the formula. The sum of interior angles of an n-sided polygon is: Sum = (n − 2) × 180°. Step 3: Substitute n = 6. Sum = (6 − 2) × 180° = 4 × 180° = 720°. Step 4: Verify (optional). We can think: A hexagon can be divided into 4 triangles (by drawing diagonals from one vertex). Each triangle has 180°, so 4 × 180° = 720° ✓. Step 5: Final answer. Therefore, the sum of interior angles of a hexagon is 720°.',
              explanation: 'The formula (n − 2) × 180° comes from dividing the polygon into triangles. An n-sided polygon can be divided into (n − 2) triangles, each with 180°. This formula works for any polygon, regular or irregular.',
            },
            {
              question: 'A regular octagon has all sides and angles equal. What is the measure of each interior angle?',
              solution: 'Step 1: Identify the polygon. A regular octagon has 8 equal sides and 8 equal angles, so n = 8. Step 2: Find the sum of all interior angles. Use the formula: Sum = (n − 2) × 180°. With n = 8: Sum = (8 − 2) × 180° = 6 × 180° = 1,080°. Step 3: Find each interior angle. Since it\'s a regular polygon, all angles are equal. Each interior angle = Total sum / Number of sides = 1,080° / 8 = 135°. Step 4: Verify. Check: 8 angles × 135° = 1,080° ✓. Also, we can use the direct formula: Each interior angle = [(n − 2) × 180°] / n = [(8 − 2) × 180°] / 8 = 1,080° / 8 = 135° ✓. Step 5: Final answer. Therefore, each interior angle of a regular octagon measures 135°.',
              explanation: 'For regular polygons, divide the total sum of interior angles by the number of sides to get each angle. The direct formula is: Each interior angle = [(n − 2) × 180°] / n. Regular polygons have all sides and angles equal, which makes calculations simpler.',
            },
            {
              question: 'If a regular polygon has an exterior angle of 30°, how many sides does it have?',
              solution: 'Step 1: Understand exterior angles. An exterior angle is formed by extending one side of the polygon. For any polygon, the sum of all exterior angles is always 360°. Step 2: Use the property of regular polygons. In a regular polygon, all exterior angles are equal. If each exterior angle is 30°, and there are n sides (and therefore n exterior angles), then: n × 30° = 360°. Step 3: Solve for n. Divide both sides by 30°: n = 360° / 30° = 12. Step 4: Verify. Check: A 12-sided polygon (dodecagon) with exterior angles of 30°: 12 × 30° = 360° ✓. Also, interior angle = 180° − 30° = 150°, and 12 × 150° = 1,800° = (12 − 2) × 180° = 10 × 180° = 1,800° ✓. Step 5: Final answer. Therefore, the polygon has 12 sides (it is a dodecagon).',
              explanation: 'The sum of exterior angles of any polygon is always 360°, regardless of the number of sides. For regular polygons, divide 360° by the exterior angle to find the number of sides. This is often easier than working with interior angles. Also remember: Interior angle + Exterior angle = 180° (they form a straight line).',
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
              question: 'A rectangular box (rectangular prism) has length = 8 units, width = 5 units, and height = 3 units. Find its volume and surface area.',
              solution: 'Step 1: Calculate the volume. Volume of a rectangular box = length × width × height. Volume = 8 × 5 × 3. Step 2: Perform the multiplication. 8 × 5 = 40, then 40 × 3 = 120. So Volume = 120 cubic units. Step 3: Calculate the surface area. A rectangular box has 6 faces. Surface Area = 2(lw + lh + wh), which represents: 2 faces of area lw, 2 faces of area lh, and 2 faces of area wh. Step 4: Calculate each face area. lw = 8 × 5 = 40, lh = 8 × 3 = 24, wh = 5 × 3 = 15. Step 5: Apply the formula. SA = 2(40 + 24 + 15) = 2(79) = 158 square units. Step 6: Verify by calculating all 6 faces. Face 1 (bottom): 8 × 5 = 40. Face 2 (top): 8 × 5 = 40. Face 3 (front): 8 × 3 = 24. Face 4 (back): 8 × 3 = 24. Face 5 (left): 5 × 3 = 15. Face 6 (right): 5 × 3 = 15. Total: 40 + 40 + 24 + 24 + 15 + 15 = 158 ✓. Step 7: Final answer. Therefore, Volume = 120 cubic units, Surface Area = 158 square units.',
              explanation: 'Volume measures the space inside (3D), surface area measures the area of the outside (2D). For a box, volume = lwh, and surface area = 2(lw + lh + wh). Always use consistent units and remember: volume is cubic units, surface area is square units.',
            },
            {
              question: 'A cylinder has a radius of 4 units and a height of 10 units. Find its volume.',
              solution: 'Step 1: Recall the cylinder volume formula. Volume of a cylinder = π × r² × h, where r is the radius and h is the height. Step 2: Identify the given values. Radius (r) = 4 units, Height (h) = 10 units. Step 3: Apply the formula. Volume = π × r² × h = π × 4² × 10. Step 4: Calculate r². 4² = 4 × 4 = 16. Step 5: Complete the calculation. Volume = π × 16 × 10 = 160π cubic units. Step 6: Understand the formula. A cylinder is like a "stacked circle" - the base is a circle (area = πr²), and we multiply by height to get volume. Step 7: Approximate value (if needed). Using π ≈ 3.14159: Volume ≈ 160 × 3.14159 ≈ 502.65 cubic units. Step 8: Final answer. Therefore, the volume is 160π cubic units (or approximately 502.65 cubic units).',
              explanation: 'Cylinder volume = πr²h. Think of it as: (area of circular base) × height. Always use radius, not diameter. The formula comes from the fact that a cylinder is essentially a circular prism.',
            },
            {
              question: 'A sphere has a radius of 6 units. Find its volume and surface area.',
              solution: 'Step 1: Calculate the volume. Volume of a sphere = (4/3)πr³. With r = 6: Volume = (4/3) × π × 6³. Step 2: Calculate 6³. 6³ = 6 × 6 × 6 = 216. Step 3: Complete volume calculation. Volume = (4/3) × π × 216 = (4 × 216 × π) / 3 = 864π / 3 = 288π cubic units. Step 4: Calculate the surface area. Surface area of a sphere = 4πr². With r = 6: SA = 4 × π × 6². Step 5: Calculate 6². 6² = 6 × 6 = 36. Step 6: Complete surface area calculation. SA = 4 × π × 36 = 144π square units. Step 7: Verify the formulas. Volume formula: (4/3)πr³. Surface area formula: 4πr². Note: Volume uses r³ (cubed), surface area uses r² (squared). Step 8: Approximate values (if needed). Volume ≈ 288 × 3.14159 ≈ 904.78 cubic units. Surface area ≈ 144 × 3.14159 ≈ 452.39 square units. Step 9: Final answer. Therefore, Volume = 288π cubic units and Surface Area = 144π square units.',
              explanation: 'Sphere formulas: Volume = (4/3)πr³ and Surface Area = 4πr². Remember: volume uses r³ (radius cubed), surface area uses r² (radius squared). The (4/3) factor in volume is important - don\'t forget it! Always use radius, not diameter.',
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
              question: 'Find the distance between the points (3, 4) and (7, 1)',
              solution: 'Step 1: Recall the distance formula. The distance between two points (x₁, y₁) and (x₂, y₂) is: d = √[(x₂ − x₁)² + (y₂ − y₁)²]. Step 2: Identify the coordinates. Point 1: (x₁, y₁) = (3, 4). Point 2: (x₂, y₂) = (7, 1). Step 3: Calculate the difference in x-coordinates. x₂ − x₁ = 7 − 3 = 4. Step 4: Calculate the difference in y-coordinates. y₂ − y₁ = 1 − 4 = −3. Step 5: Apply the distance formula. d = √[(7 − 3)² + (1 − 4)²] = √[4² + (−3)²] = √[16 + 9] = √25. Step 6: Calculate the square root. √25 = 5. Step 7: Final answer. Therefore, the distance between (3, 4) and (7, 1) is 5 units. Step 8: Verify (optional). We can visualize: moving from (3, 4) to (7, 1) is 4 units right and 3 units down, forming a 3-4-5 right triangle, so the distance is 5 ✓.',
              explanation: 'The distance formula comes from the Pythagorean theorem. The distance is the hypotenuse of a right triangle with legs equal to the differences in x and y coordinates. Always be careful with the order: (x₂ − x₁) and (y₂ − y₁), not the other way around.',
            },
            {
              question: 'Find the midpoint of the line segment from (2, 5) to (8, 9)',
              solution: 'Step 1: Recall the midpoint formula. The midpoint M between (x₁, y₁) and (x₂, y₂) is: M = ((x₁ + x₂)/2, (y₁ + y₂)/2). Step 2: Identify the coordinates. Point 1: (x₁, y₁) = (2, 5). Point 2: (x₂, y₂) = (8, 9). Step 3: Calculate the x-coordinate of the midpoint. x-coordinate = (x₁ + x₂)/2 = (2 + 8)/2 = 10/2 = 5. Step 4: Calculate the y-coordinate of the midpoint. y-coordinate = (y₁ + y₂)/2 = (5 + 9)/2 = 14/2 = 7. Step 5: Write the midpoint. M = (5, 7). Step 6: Verify. Check: The midpoint should be halfway between the endpoints. From (2, 5) to (5, 7): x increases by 3, y increases by 2. From (5, 7) to (8, 9): x increases by 3, y increases by 2. The distances are equal ✓. Therefore, the midpoint is (5, 7).',
              explanation: 'The midpoint is simply the average of the x-coordinates and the average of the y-coordinates. This gives the point exactly halfway between the two endpoints. The midpoint formula is easy to remember: average the x\'s, average the y\'s.',
            },
            {
              question: 'Find the slope of the line passing through the points (1, 2) and (4, 8)',
              solution: 'Step 1: Recall the slope formula. The slope m of a line through points (x₁, y₁) and (x₂, y₂) is: m = (y₂ − y₁)/(x₂ − x₁). Step 2: Identify the coordinates. Point 1: (x₁, y₁) = (1, 2). Point 2: (x₂, y₂) = (4, 8). Step 3: Calculate the change in y (rise). y₂ − y₁ = 8 − 2 = 6. Step 4: Calculate the change in x (run). x₂ − x₁ = 4 − 1 = 3. Step 5: Calculate the slope. m = (y₂ − y₁)/(x₂ − x₁) = 6/3 = 2. Step 6: Interpret the slope. A slope of 2 means: for every 1 unit we move to the right, we move 2 units up. Step 7: Verify. We can check: from (1, 2), if we move 3 units right (to x = 4), we should move 2 × 3 = 6 units up, giving y = 2 + 6 = 8 ✓. Therefore, the slope is 2.',
              explanation: 'Slope measures the steepness of a line. It\'s the ratio of vertical change (rise) to horizontal change (run). Be careful with the order: (y₂ − y₁)/(x₂ − x₁), not (y₁ − y₂)/(x₁ − x₂), though both give the same result. Positive slope means the line goes up from left to right.',
            },
            {
              question: 'Find the equation of the line with slope 3 that passes through the point (2, 5)',
              solution: 'Step 1: Recall the slope-intercept form. The equation of a line is y = mx + b, where m is the slope and b is the y-intercept. Step 2: Identify known values. We know: slope m = 3, and the point (2, 5) is on the line, so when x = 2, y = 5. Step 3: Substitute into the equation. Substitute m = 3, x = 2, and y = 5 into y = mx + b: 5 = 3(2) + b. Step 4: Solve for b. Simplify: 5 = 6 + b. Subtract 6 from both sides: 5 − 6 = b, which gives: b = −1. Step 5: Write the equation. Now we have m = 3 and b = −1, so: y = 3x + (−1) = 3x − 1. Step 6: Verify. Check that (2, 5) satisfies the equation: y = 3(2) − 1 = 6 − 1 = 5 ✓. Also check another point: when x = 0, y = 3(0) − 1 = −1, so the y-intercept is (0, −1) ✓. Therefore, the equation is y = 3x − 1.',
              explanation: 'To find the equation of a line given a point and slope, substitute the point coordinates and slope into y = mx + b, solve for b, then write the complete equation. Always verify by checking that the given point satisfies your equation.',
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
              question: 'Two triangles are similar. The smaller triangle has sides measuring 3, 4, and 5 units. In the larger triangle, the side corresponding to the side of length 3 in the smaller triangle is 9 units. Find the lengths of the other two sides of the larger triangle.',
              solution: 'Step 1: Understand similar triangles. Similar triangles have the same shape but different sizes. Corresponding sides are proportional, meaning they have the same ratio. Step 2: Identify corresponding sides. The side of length 3 in the small triangle corresponds to the side of length 9 in the large triangle. Step 3: Find the scale factor. Scale factor = (Large side) / (Corresponding small side) = 9 / 3 = 3. This means the large triangle is 3 times larger than the small triangle. Step 4: Apply the scale factor to find the second side. The side corresponding to 4 in the small triangle: Large side = 4 × 3 = 12 units. Step 5: Apply the scale factor to find the third side. The side corresponding to 5 in the small triangle: Large side = 5 × 3 = 15 units. Step 6: Verify the ratios. Check that all ratios are equal: 9/3 = 3, 12/4 = 3, 15/5 = 3. All ratios equal 3 ✓. Step 7: Final answer. Therefore, the other two sides of the larger triangle are 12 units and 15 units.',
              explanation: 'For similar triangles, find the scale factor from one pair of corresponding sides, then multiply all sides of the smaller triangle by that factor. Always verify that all corresponding side ratios are equal. This ensures the triangles are truly similar.',
            },
            {
              question: 'Two similar triangles have areas of 16 square units and 64 square units respectively. What is the ratio of their corresponding sides?',
              solution: 'Step 1: Understand the relationship. For similar figures, the area ratio equals the square of the side ratio. If side ratio = k, then area ratio = k². Step 2: Calculate the area ratio. Area ratio = (Larger area) / (Smaller area) = 64 / 16 = 4. Step 3: Find the side ratio. Since area ratio = (side ratio)², we have: (side ratio)² = 4. Taking the square root of both sides: side ratio = √4 = 2. Step 4: Interpret the result. A side ratio of 2 means the larger triangle\'s sides are 2 times the corresponding sides of the smaller triangle. Step 5: Verify. Check: If side ratio = 2, then area ratio should be 2² = 4. And 64/16 = 4 ✓. Step 6: Alternative verification. If a triangle with area 16 has sides scaled by factor 2, the new area = 16 × 2² = 16 × 4 = 64 ✓. Step 7: Final answer. Therefore, the ratio of corresponding sides is 2:1 (or simply 2).',
              explanation: 'The key relationship: Area scales as the square of the linear scale factor. If sides are multiplied by k, area is multiplied by k². To find side ratio from area ratio, take the square root. This relationship applies to all similar 2D figures.',
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
              question: 'Two triangles have sides measuring 5, 6, and 7 units respectively. Are these triangles congruent?',
              solution: 'Step 1: Understand congruence. Congruent triangles are identical in size and shape - they can be placed on top of each other and match exactly. Step 2: Check the given information. Both triangles have sides: 5, 6, and 7. All three corresponding sides are equal. Step 3: Apply the SSS criterion. SSS (Side-Side-Side) is a valid congruence criterion. If all three sides of one triangle are equal to the corresponding three sides of another triangle, then the triangles are congruent. Step 4: Verify the criterion applies. Triangle 1: sides 5, 6, 7. Triangle 2: sides 5, 6, 7. All corresponding sides match: 5 = 5, 6 = 6, 7 = 7. Step 5: Check triangle inequality (to ensure triangles are valid). For triangle with sides 5, 6, 7: 5 + 6 = 11 > 7 ✓, 5 + 7 = 12 > 6 ✓, 6 + 7 = 13 > 5 ✓. Both triangles are valid. Step 6: Final answer. Therefore, yes, the triangles are congruent by the SSS (Side-Side-Side) criterion.',
              explanation: 'SSS is one of the valid congruence criteria. If all three sides match, the triangles must be congruent. The valid criteria are: SSS, SAS, ASA, AAS. Note: SSA is NOT valid (this is the ambiguous case).',
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
              question: 'In a 30-60-90 triangle, the shortest side (opposite the 30° angle) is 5 units. Find the lengths of the other two sides.',
              solution: 'Step 1: Recall the 30-60-90 triangle ratio. In a 30-60-90 triangle, the sides are in the ratio: Short leg : Long leg : Hypotenuse = 1 : √3 : 2. The short leg is opposite the 30° angle, the long leg is opposite the 60° angle, and the hypotenuse is opposite the 90° angle. Step 2: Identify the given side. The short side (short leg) = 5 units. This corresponds to the "1" in the ratio. Step 3: Find the scale factor. Since the short leg in the ratio is 1, and our short leg is 5, the scale factor is 5. Step 4: Calculate the long leg. Long leg in ratio = √3. Multiply by scale factor: Long leg = 5 × √3 = 5√3 units. Step 5: Calculate the hypotenuse. Hypotenuse in ratio = 2. Multiply by scale factor: Hypotenuse = 5 × 2 = 10 units. Step 6: Verify using Pythagorean theorem. Check: (Short leg)² + (Long leg)² = (Hypotenuse)². 5² + (5√3)² = 25 + 25(3) = 25 + 75 = 100. Hypotenuse² = 10² = 100 ✓. Step 7: Final answer. Therefore, the sides are: Short leg = 5, Long leg = 5√3, Hypotenuse = 10.',
              explanation: '30-60-90 triangles have a fixed ratio of 1 : √3 : 2. Once you identify which side is given, multiply the corresponding ratio value by the scale factor to find all sides. The short leg is always opposite the 30° angle. Memorizing this ratio saves significant time on tests.',
            },
            {
              question: 'In a 45-45-90 triangle, one leg measures 6 units. Find the length of the hypotenuse.',
              solution: 'Step 1: Understand the 45-45-90 triangle. A 45-45-90 triangle is an isosceles right triangle. It has two 45° angles and one 90° angle. The two legs are equal in length. Step 2: Recall the 45-45-90 triangle ratio. In a 45-45-90 triangle, the sides are in the ratio: Leg : Leg : Hypotenuse = 1 : 1 : √2. Both legs are equal, and the hypotenuse is √2 times the leg. Step 3: Identify the given side. One leg = 6 units. Since both legs are equal, the other leg is also 6 units. Step 4: Calculate the hypotenuse. Using the ratio: Hypotenuse = Leg × √2. So: Hypotenuse = 6 × √2 = 6√2 units. Step 5: Verify using Pythagorean theorem. Check: (Leg)² + (Leg)² = (Hypotenuse)². 6² + 6² = 36 + 36 = 72. Hypotenuse² = (6√2)² = 36 × 2 = 72 ✓. Step 6: Final answer. Therefore, the hypotenuse is 6√2 units (approximately 8.49 units if using √2 ≈ 1.414).',
              explanation: '45-45-90 triangles are isosceles right triangles. The key relationship is: Hypotenuse = Leg × √2. This comes from the Pythagorean theorem: if both legs are x, then hypotenuse = √(x² + x²) = √(2x²) = x√2. Memorizing this ratio is essential for quick calculations.',
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
              question: 'A triangle has sides measuring 5, 6, and 7 units. Find its area using Heron\'s formula.',
              solution: 'Step 1: Understand Heron\'s formula. Heron\'s formula finds the area of a triangle when all three sides are known, without needing the height. Formula: Area = √[s(s−a)(s−b)(s−c)], where s is the semi-perimeter and a, b, c are the three sides. Step 2: Calculate the semi-perimeter. Semi-perimeter s = (a + b + c) / 2. With sides 5, 6, 7: s = (5 + 6 + 7) / 2 = 18 / 2 = 9. Step 3: Apply Heron\'s formula. Area = √[s(s−a)(s−b)(s−c)] = √[9(9−5)(9−6)(9−7)] = √[9 × 4 × 3 × 2]. Step 4: Calculate inside the square root. 9 × 4 = 36, 36 × 3 = 108, 108 × 2 = 216. So: Area = √216. Step 5: Simplify the square root. Factor 216: 216 = 36 × 6 = 6² × 6. So: √216 = √(36 × 6) = √36 × √6 = 6√6. Step 6: Verify (optional). Check: (6√6)² = 36 × 6 = 216 ✓. Step 7: Final answer. Therefore, the area of the triangle is 6√6 square units (approximately 14.70 square units if using √6 ≈ 2.449).',
              explanation: 'Heron\'s formula is useful when you know all three sides but not the height. The semi-perimeter is half the perimeter. Always calculate s first, then substitute into the formula. Simplify the square root if possible for the final answer.',
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
              question: 'A parallelogram has a base of 10 units and a height of 6 units. What is its area?',
              solution: 'Step 1: Recall the parallelogram area formula. Area of parallelogram = base × height, where height is the perpendicular distance from the base to the opposite side. Step 2: Identify the given values. Base = 10 units, Height = 6 units. Step 3: Apply the formula. Area = base × height = 10 × 6 = 60 square units. Step 4: Verify units. Area should be in square units, which is correct. Step 5: Understand the formula. A parallelogram can be "cut" and rearranged into a rectangle with the same base and height, which is why the area formula is the same as a rectangle. Step 6: Final answer. Therefore, the area of the parallelogram is 60 square units.',
              explanation: 'Parallelogram area = base × height, where height is the perpendicular distance (not the slanted side length). The height must be perpendicular to the base. This is the same formula as a rectangle because a parallelogram can be transformed into a rectangle.',
            },
            {
              question: 'A rhombus has diagonals measuring 8 units and 6 units. What is its area?',
              solution: 'Step 1: Understand a rhombus. A rhombus is a parallelogram with all sides equal. It has special properties, including that its diagonals are perpendicular bisectors of each other. Step 2: Recall the rhombus area formula. For a rhombus, Area = (d₁ × d₂) / 2, where d₁ and d₂ are the lengths of the two diagonals. Step 3: Identify the diagonals. Diagonal 1 (d₁) = 8 units, Diagonal 2 (d₂) = 6 units. Step 4: Apply the formula. Area = (d₁ × d₂) / 2 = (8 × 6) / 2 = 48 / 2 = 24 square units. Step 5: Understand why this works. The diagonals divide the rhombus into 4 right triangles. Each triangle has area = ½ × (d₁/2) × (d₂/2) = d₁d₂/8. Four triangles: 4 × (d₁d₂/8) = d₁d₂/2. Step 6: Verify. Check: (8 × 6) / 2 = 48 / 2 = 24 ✓. Step 7: Final answer. Therefore, the area of the rhombus is 24 square units.',
              explanation: 'The rhombus area formula using diagonals is: Area = (d₁ × d₂) / 2. This works because the diagonals are perpendicular and divide the rhombus into 4 equal right triangles. This formula is often easier than using base × height when diagonals are given.',
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
              question: 'A trapezoid has bases measuring 8 units and 12 units, and a height of 5 units. What is the area of the trapezoid?',
              solution: 'Step 1: Understand a trapezoid. A trapezoid is a quadrilateral with exactly one pair of parallel sides. The parallel sides are called the bases. Step 2: Recall the trapezoid area formula. Area = ½ × (base₁ + base₂) × height, where height is the perpendicular distance between the bases. Step 3: Identify the values. Base 1 (b₁) = 8 units, Base 2 (b₂) = 12 units, Height (h) = 5 units. Step 4: Apply the formula. Area = ½ × (b₁ + b₂) × h = ½ × (8 + 12) × 5. Step 5: Calculate step by step. First, add the bases: 8 + 12 = 20. Then multiply by height: 20 × 5 = 100. Finally, multiply by ½: ½ × 100 = 50. Step 6: Alternative calculation. Area = ½(8 + 12) × 5 = ½(20) × 5 = 10 × 5 = 50 square units. Step 7: Understand the formula. The formula averages the two bases (finds the "middle" length) and multiplies by height. This works because a trapezoid can be thought of as having an "average width" equal to the average of the two bases. Step 8: Final answer. Therefore, the area of the trapezoid is 50 square units.',
              explanation: 'The trapezoid area formula is: Area = ½(b₁ + b₂)h. This averages the two bases and multiplies by the height. Always use the perpendicular height, not the slanted side length. The ½ factor comes from averaging the bases.',
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
              question: 'Find the equation of a line parallel to y = 2x + 3 that passes through the point (1, 4).',
              solution: 'Step 1: Understand parallel lines. Parallel lines have the same slope but different y-intercepts. They never intersect. Step 2: Identify the slope of the given line. The line y = 2x + 3 is in slope-intercept form (y = mx + b), where m = 2 is the slope. Step 3: Determine the slope of the parallel line. Since parallel lines have the same slope, the new line also has slope m = 2. Step 4: Use point-slope form. We know the slope (m = 2) and a point (1, 4). Point-slope form: y − y₁ = m(x − x₁). Substituting: y − 4 = 2(x − 1). Step 5: Simplify to slope-intercept form. Expand: y − 4 = 2x − 2. Add 4 to both sides: y = 2x − 2 + 4 = 2x + 2. Step 6: Verify. Check that (1, 4) is on the line: y = 2(1) + 2 = 2 + 2 = 4 ✓. Also verify slopes: both lines have slope 2, so they\'re parallel ✓. Step 7: Final answer. Therefore, the equation of the parallel line is y = 2x + 2.',
              explanation: 'Parallel lines have identical slopes. To find a parallel line through a given point, use that same slope with the point-slope form. The y-intercepts will be different (unless the point happens to be on the original line).',
            },
            {
              question: 'Find the equation of a line perpendicular to y = 2x + 3 that passes through the point (1, 4).',
              solution: 'Step 1: Understand perpendicular lines. Perpendicular lines intersect at a 90° angle. Their slopes multiply to −1. Step 2: Identify the slope of the given line. The line y = 2x + 3 has slope m₁ = 2. Step 3: Find the perpendicular slope. If m₁ × m₂ = −1, then m₂ = −1/m₁. So: m₂ = −1/2. Step 4: Verify the relationship. Check: 2 × (−1/2) = −1 ✓. This confirms the slopes are perpendicular. Step 5: Use point-slope form. We know the slope (m = −1/2) and a point (1, 4). Point-slope form: y − y₁ = m(x − x₁). Substituting: y − 4 = (−1/2)(x − 1). Step 6: Simplify to slope-intercept form. Expand: y − 4 = (−1/2)x + 1/2. Add 4 to both sides: y = (−1/2)x + 1/2 + 4 = (−1/2)x + 1/2 + 8/2 = (−1/2)x + 9/2 = −½x + 4.5. Step 7: Verify. Check that (1, 4) is on the line: y = −½(1) + 4.5 = −0.5 + 4.5 = 4 ✓. Check slopes multiply to −1: 2 × (−1/2) = −1 ✓. Step 8: Final answer. Therefore, the equation of the perpendicular line is y = −½x + 4.5 (or y = −x/2 + 9/2).',
              explanation: 'Perpendicular lines have slopes that are negative reciprocals. If one line has slope m, the perpendicular line has slope −1/m. Always verify that m₁ × m₂ = −1. Remember: horizontal lines (slope 0) are perpendicular to vertical lines (undefined slope).',
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
              question: 'Translate the point (3, 4) by the vector (2, −1). What are the coordinates of the new point?',
              solution: 'Step 1: Understand translation. Translation moves a point by adding a vector to its coordinates. The translation vector (2, −1) means: move 2 units right (positive x) and 1 unit down (negative y). Step 2: Apply the translation rule. To translate point (x, y) by vector (h, k), the new coordinates are: (x + h, y + k). Step 3: Substitute the values. Original point: (3, 4). Translation vector: (2, −1). New point: (3 + 2, 4 + (−1)) = (3 + 2, 4 − 1) = (5, 3). Step 4: Verify. The point moved from (3, 4) to (5, 3). This is 2 units right (3 → 5) and 1 unit down (4 → 3) ✓. Step 5: Final answer. Therefore, after translation, the point is at (5, 3).',
              explanation: 'Translation is simply adding the translation vector to the original coordinates. The vector (h, k) means move h units horizontally and k units vertically. Positive h = right, negative h = left. Positive k = up, negative k = down.',
            },
            {
              question: 'Reflect the point (3, 4) over the x-axis. What are the coordinates of the reflected point?',
              solution: 'Step 1: Understand reflection over x-axis. Reflection over the x-axis means the point is "flipped" across the horizontal x-axis. The x-coordinate stays the same, but the y-coordinate changes sign. Step 2: Apply the reflection rule. Reflection over x-axis: (x, y) → (x, −y). The x-coordinate remains unchanged, and the y-coordinate becomes its opposite. Step 3: Apply to the given point. Point (3, 4): x = 3, y = 4. After reflection: x stays 3, y becomes −4. So: (3, 4) → (3, −4). Step 4: Visualize. The point (3, 4) is 4 units above the x-axis. After reflection, it becomes (3, −4), which is 4 units below the x-axis. The distance from the x-axis is the same (4 units), but on the opposite side. Step 5: Verify. Check: The midpoint between (3, 4) and (3, −4) is (3, 0), which lies on the x-axis ✓. Step 6: Final answer. Therefore, the reflected point is (3, −4).',
              explanation: 'Reflection over x-axis: keep x, change sign of y. Reflection over y-axis: change sign of x, keep y. Reflection over origin: change signs of both. Reflection over line y=x: swap x and y. Memorize these rules for quick application.',
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
              question: 'A circle has center at (2, −3) and radius 5. What is the equation of the circle?',
              solution: 'Step 1: Recall the standard form of a circle equation. The standard form is: (x − h)² + (y − k)² = r², where (h, k) is the center and r is the radius. Step 2: Identify the values. Center: (h, k) = (2, −3), so h = 2 and k = −3. Radius: r = 5. Step 3: Substitute into the standard form. (x − h)² + (y − k)² = r² becomes: (x − 2)² + (y − (−3))² = 5². Step 4: Simplify. (x − 2)² + (y + 3)² = 25. Note: y − (−3) = y + 3. Step 5: Verify. Check: If we substitute the center (2, −3): (2 − 2)² + (−3 + 3)² = 0² + 0² = 0, which should equal r² = 25? Wait, that\'s not right. Actually, at the center, the distance is 0, so the equation gives 0 = 25? Let me recalculate: At center (2, −3): (2−2)² + (−3−(−3))² = 0² + 0² = 0. But the equation is (x−2)² + (y+3)² = 25. At center: (2−2)² + (−3+3)² = 0 + 0 = 0, but the equation says it should equal 25. Actually, I need to check: y − k, and k = −3, so y − (−3) = y + 3. At center: (2, −3), so (2−2)² + (−3+3)² = 0. But the equation is = 25, not 0. Actually, the standard form is correct. A point on the circle satisfies the equation. The center itself doesn\'t satisfy (x−h)² + (y−k)² = r² because at the center, the left side is 0, not r². Points on the circle are at distance r from center. Let me verify with a point on the circle: A point 5 units from (2, −3) would be (2+5, −3) = (7, −3). Check: (7−2)² + (−3+3)² = 5² + 0² = 25 ✓. Step 6: Final answer. Therefore, the equation is (x − 2)² + (y + 3)² = 25.',
              explanation: 'The standard form (x−h)² + (y−k)² = r² represents all points at distance r from center (h, k). Be careful with signs: if center is (2, −3), then h = 2 and k = −3, so the equation has (x−2) and (y−(−3)) = (y+3). The right side is r², not r.',
            },
            {
              question: 'Given the circle equation (x + 1)² + (y − 4)² = 9, find the center and radius of the circle.',
              solution: 'Step 1: Compare with standard form. Standard form: (x − h)² + (y − k)² = r². Given: (x + 1)² + (y − 4)² = 9. Step 2: Find the center (h, k). For the x-term: (x + 1) = (x − (−1)), so h = −1. For the y-term: (y − 4) matches the form (y − k), so k = 4. Therefore, center = (−1, 4). Step 3: Find the radius. The right side is 9, which equals r². So: r² = 9. Taking the square root: r = √9 = 3 (radius is positive). Step 4: Verify. Check: The equation (x + 1)² + (y − 4)² = 9 means points at distance 3 from center (−1, 4). Test a point on the circle: (−1 + 3, 4) = (2, 4). Check: (2 + 1)² + (4 − 4)² = 3² + 0² = 9 ✓. Step 5: Final answer. Therefore, the center is (−1, 4) and the radius is 3.',
              explanation: 'To find center and radius from standard form, match the pattern: (x−h)² + (y−k)² = r². Watch the signs carefully: (x+1) means h = −1, not h = 1. The radius is the square root of the right side (r = √r²).',
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
              question: 'Can three line segments with lengths 5, 7, and 12 units form a triangle?',
              solution: 'Step 1: Recall the Triangle Inequality Theorem. For three sides to form a triangle, the sum of any two sides must be STRICTLY greater than the third side. All three conditions must be satisfied. Step 2: Check condition 1: a + b > c. Using sides 5, 7, 12: 5 + 7 = 12. Is 12 > 12? No! 12 is NOT greater than 12 (it\'s equal). Step 3: Since one condition fails, we can stop. The Triangle Inequality requires STRICT inequality (>), not ≥. Since 5 + 7 = 12 (not > 12), this condition fails. Step 4: Interpret the result. If 5 + 7 = 12, the three segments would lie on a straight line, not forming a triangle. They would be collinear. Step 5: Verify with other combinations (optional). Check: 5 + 12 = 17 > 7 ✓, 7 + 12 = 19 > 5 ✓. But since the first check failed, we cannot form a triangle. Step 6: Final answer. Therefore, NO, sides 5, 7, and 12 cannot form a triangle because 5 + 7 is not greater than 12 (they are equal).',
              explanation: 'The Triangle Inequality requires STRICT inequality: a + b > c, not a + b ≥ c. If a + b = c, the three points are collinear (on a straight line), which doesn\'t form a triangle. Always check all three combinations, but if one fails, the answer is no.',
            },
            {
              question: 'Can three line segments with lengths 6, 8, and 10 units form a triangle?',
              solution: 'Step 1: Apply the Triangle Inequality Theorem. We need to check all three conditions: a + b > c, a + c > b, and b + c > a. Step 2: Check condition 1: 6 + 8 > 10. 6 + 8 = 14. Is 14 > 10? Yes ✓. Step 3: Check condition 2: 6 + 10 > 8. 6 + 10 = 16. Is 16 > 8? Yes ✓. Step 4: Check condition 3: 8 + 10 > 6. 8 + 10 = 18. Is 18 > 6? Yes ✓. Step 5: Analyze the results. All three conditions are satisfied. Each sum of two sides is greater than the third side. Step 6: Verify this is a valid triangle. These sides (6, 8, 10) actually form a right triangle (6² + 8² = 36 + 64 = 100 = 10², so it\'s a 3-4-5 right triangle scaled by 2). Step 7: Final answer. Therefore, YES, sides 6, 8, and 10 can form a triangle. In fact, they form a right triangle.',
              explanation: 'All three Triangle Inequality conditions must be checked and satisfied. If any one fails, a triangle cannot be formed. When all pass, a triangle is possible. Note: These particular sides (6, 8, 10) form a right triangle, which is a special case.',
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
              question: 'A price increases by 30%, then decreases by 30%. What is the net percentage change?',
              solution: 'Step 1: Set up a base value. Let the original price = Rs. 100 (using 100 makes percentage calculations easier). Step 2: Apply the first change (30% increase). To increase by 30%, multiply by (1 + 0.30) = 1.30. New price = 100 × 1.30 = Rs. 130. Step 3: Apply the second change (30% decrease). To decrease by 30%, multiply by (1 − 0.30) = 0.70. IMPORTANT: This decrease is applied to the NEW price (Rs. 130), not the original. Final price = 130 × 0.70 = Rs. 91. Step 4: Calculate the net change. Original price = Rs. 100, Final price = Rs. 91. Change = 91 − 100 = −Rs. 9 (a decrease). Step 5: Calculate the net percentage change. Percentage change = (Change / Original) × 100% = (−9 / 100) × 100% = −9%. Step 6: Interpret the result. The net effect is a 9% decrease, NOT 0% as many people mistakenly think. Step 7: Understand why. Percentages are NOT reversible! The 30% decrease is applied to the larger number (130), so it removes more value than the 30% increase added to the smaller number (100). Therefore, the net result is a decrease.',
              explanation: 'This demonstrates a critical concept: percentages are NOT reversible. An x% increase followed by an x% decrease does NOT return to the original value. The decrease is applied to a larger base, so it removes more than the increase added. Always calculate step-by-step, applying each percentage change to the new value, not the original.',
            },
            {
              question: 'After a 15% discount, the price of an item is Rs. 425. What was the original price?',
              solution: 'Step 1: Understand the problem. We know the final price (Rs. 425) after a 15% discount, and we need to find the original price. Step 2: Recognize the common mistake. Many people incorrectly think: Original = Final × (1 + discount%) = 425 × 1.15 = Rs. 488.75. This is WRONG! Step 3: Understand why the common approach is wrong. If the original was Rs. 488.75, then after 15% discount: 488.75 × 0.85 = Rs. 415.44, which is NOT Rs. 425. The error occurs because we\'re applying the percentage to the wrong value. Step 4: Set up the correct equation. If original price = P, then after 15% discount: Final = P × (1 − 0.15) = P × 0.85. We know Final = 425, so: 425 = P × 0.85. Step 5: Solve for P. To reverse a percentage decrease, we divide by (1 − percentage), not multiply by (1 + percentage). P = 425 / 0.85 = 425 / (85/100) = 425 × (100/85) = 425 × (20/17) = 8,500 / 17 = Rs. 500. Step 6: Verify the answer. Original = Rs. 500. After 15% discount: 500 × 0.85 = Rs. 425 ✓. This confirms our answer is correct. Step 7: General formula. To reverse a percentage change: Original = Final / (1 ± percentage). Use (1 − %) for discounts, (1 + %) for increases. Therefore, the original price was Rs. 500.',
              explanation: 'This is one of the most common percentage traps! To reverse a percentage change, you must DIVIDE by (1 ± percentage), not multiply. The key insight: if Final = Original × (1 − %), then Original = Final / (1 − %). Always verify your answer by applying the percentage change forward to check if you get the given final value.',
            },
            {
              question: 'A store marks up the cost price by 25% to get the selling price. If the selling price is Rs. 1,500, what was the cost price?',
              solution: 'Step 1: Understand the problem. The cost price was increased by 25% to get the selling price of Rs. 1,500. We need to find the original cost price. This is a "reverse percentage increase" problem. Step 2: Set up the relationship. Cost price + 25% markup = Selling price. Mathematically: Cost × (1 + 25/100) = 1,500. Step 3: Convert percentage to decimal. 25% = 25/100 = 0.25. So: Cost × (1 + 0.25) = 1,500, which gives: Cost × 1.25 = 1,500. Step 4: Solve for the cost price. To reverse a percentage increase, we divide by (1 + percentage). Cost = 1,500 ÷ 1.25. Step 5: Calculate step by step. 1,500 ÷ 1.25 = 1,500 ÷ (5/4) = 1,500 × (4/5) = 6,000/5 = 1,200. Step 6: Verify the answer. Cost price = Rs. 1,200. 25% markup = 25% of 1,200 = 0.25 × 1,200 = 300. Selling price = 1,200 + 300 = 1,500. ✓ This matches the given selling price! Step 7: Common mistake to avoid. WRONG approach: Some people think: Cost = 1,500 × 0.75 = 1,125. This is INCORRECT! If we check: 1,125 + 25% of 1,125 = 1,125 + 281.25 = 1,406.25, which is NOT 1,500. The correct method is to DIVIDE by (1 + markup%), not multiply by (1 − markup%). Therefore, the cost price was Rs. 1,200.',
              explanation: 'To reverse a percentage increase, we divide by (1 + percentage). If Cost × 1.25 = 1,500, then Cost = 1,500 ÷ 1.25. This is the inverse operation of the markup. Always verify by checking that the calculated cost price, when increased by the given percentage, gives the known selling price. This is another common trap - students often try to "undo" an increase by subtracting, but that\'s incorrect.',
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
              question: 'Compare the fractions 3/5 and 4/7. Which is larger?',
              solution: 'Step 1: Understand the problem. We need to determine which fraction is larger: 3/5 or 4/7. Step 2: Choose a comparison method. Since the denominators are different (5 and 7) and the numerators are also different (3 and 4), we\'ll use cross-multiplication, which always works. Step 3: Apply cross-multiplication. For fractions a/b and c/d, cross-multiply: compare a × d with b × c. If a × d > b × c, then a/b > c/d. For 3/5 and 4/7: Compare 3 × 7 with 5 × 4. Step 4: Calculate the cross products. 3 × 7 = 21. 5 × 4 = 20. Step 5: Compare the results. Since 21 > 20, we have: 3 × 7 > 5 × 4. Step 6: Apply the rule. Since 3 × 7 > 5 × 4, it follows that 3/5 > 4/7. Step 7: Verify (optional). Convert to decimals: 3/5 = 0.6, 4/7 ≈ 0.571. Since 0.6 > 0.571, we confirm 3/5 > 4/7 ✓. Step 8: Final answer. Therefore, 3/5 is larger than 4/7.',
              explanation: 'Cross-multiplication is the most reliable method for comparing fractions with different numerators and denominators. The rule is: if ad > bc, then a/b > c/d. This works because we\'re essentially comparing the fractions after converting them to have the same denominator (bd). Always cross-multiply in the same direction to avoid errors.',
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
              question: 'Rs. 1,000 is invested at 10% annual compound interest for 3 years. What is the final amount?',
              solution: 'Step 1: Identify the given values. Principal (P) = Rs. 1,000, Rate (r) = 10% = 0.10, Time (t) = 3 years, Compounding frequency: annual (n = 1). Step 2: Use the compound interest formula. For annual compounding: A = P(1 + r)ᵗ. Step 3: Substitute the values. A = 1,000(1 + 0.10)³ = 1,000(1.1)³. Step 4: Calculate (1.1)³. (1.1)³ = 1.1 × 1.1 × 1.1. First: 1.1 × 1.1 = 1.21. Then: 1.21 × 1.1 = 1.331. So (1.1)³ = 1.331. Step 5: Calculate the final amount. A = 1,000 × 1.331 = Rs. 1,331. Step 6: Calculate the interest earned. Interest = Final amount − Principal = 1,331 − 1,000 = Rs. 331. Step 7: Verify (optional). Year 1: 1,000 × 1.10 = 1,100. Year 2: 1,100 × 1.10 = 1,210. Year 3: 1,210 × 1.10 = 1,331 ✓. Therefore, the final amount is Rs. 1,331.',
              explanation: 'Compound interest means interest is calculated on the principal AND previously earned interest. Each period, the amount grows by (1+r), so after t periods, it\'s multiplied by (1+r)ᵗ. This creates exponential growth, which is why compound interest grows faster than simple interest over time.',
            },
            {
              question: 'Rs. 5,000 is invested at 8% simple interest for 5 years. What is the final amount?',
              solution: 'Step 1: Identify the given values. Principal (P) = Rs. 5,000, Rate (r) = 8% = 0.08, Time (t) = 5 years. Step 2: Use the simple interest formula. Simple interest formula: A = P(1 + rt), where A is the final amount. Step 3: Calculate rt. rt = 0.08 × 5 = 0.40. Step 4: Substitute into the formula. A = 5,000(1 + 0.40) = 5,000 × 1.40 = Rs. 7,000. Step 5: Alternative method - calculate interest separately. Simple Interest = P × r × t = 5,000 × 0.08 × 5 = 5,000 × 0.40 = Rs. 2,000. Final amount = Principal + Interest = 5,000 + 2,000 = Rs. 7,000. Step 6: Verify. Check: 5,000(1 + 0.08×5) = 5,000(1.40) = 7,000 ✓. Step 7: Final answer. Therefore, the final amount is Rs. 7,000.',
              explanation: 'Simple interest is calculated only on the principal, not on previously earned interest. The formula A = P(1 + rt) is equivalent to A = P + Prt = P + Interest. Simple interest grows linearly, while compound interest grows exponentially.',
            },
            {
              question: 'A population doubles every 20 years. If the current population is 10,000, what will the population be in 60 years?',
              solution: 'Step 1: Understand the problem. The population follows exponential growth with a doubling period of 20 years. Current population = 10,000. Step 2: Determine the number of doubling periods. Time period = 60 years. Doubling period = 20 years. Number of doublings = 60 ÷ 20 = 3. Step 3: Apply the doubling. Each doubling multiplies the population by 2. After 3 doublings: Final population = Initial × 2³ = 10,000 × 2³. Step 4: Calculate 2³. 2³ = 2 × 2 × 2 = 8. Step 5: Calculate the final population. Final = 10,000 × 8 = 80,000. Step 6: Verify step by step. After 20 years (1st doubling): 10,000 × 2 = 20,000. After 40 years (2nd doubling): 20,000 × 2 = 40,000. After 60 years (3rd doubling): 40,000 × 2 = 80,000 ✓. Step 7: Final answer. Therefore, the population will be 80,000 in 60 years.',
              explanation: 'Exponential growth with a known doubling period is straightforward: divide the time by the doubling period to get the number of doublings, then multiply the initial amount by 2 raised to that power. This is a special case of exponential growth where the growth factor is 2.',
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
              question: 'An item costs Rs. 500 and is sold for Rs. 600. What is the profit percentage?',
              solution: 'Step 1: Identify the given values. Cost Price (CP) = Rs. 500, Selling Price (SP) = Rs. 600. Step 2: Calculate the profit. Profit = Selling Price − Cost Price = 600 − 500 = Rs. 100. Step 3: Recall the profit percentage formula. Profit % = (Profit / Cost Price) × 100%. IMPORTANT: Profit percentage is always calculated on the COST PRICE, not the selling price. Step 4: Calculate the profit percentage. Profit % = (100 / 500) × 100% = 0.20 × 100% = 20%. Step 5: Verify. Check: If CP = 500 and profit % = 20%, then Profit = 500 × 0.20 = 100, and SP = 500 + 100 = 600 ✓. Step 6: Final answer. Therefore, the profit percentage is 20%.',
              explanation: 'Profit percentage is always calculated on the cost price (the original amount paid). The formula is: Profit % = (Profit/CP) × 100%. Never calculate profit percentage on the selling price - this is a common mistake. Always verify your answer by working backwards.',
            },
            {
              question: 'An item costs Rs. 800. If it is sold at a 25% profit, what is the selling price?',
              solution: 'Step 1: Identify the given values. Cost Price (CP) = Rs. 800, Profit % = 25%. Step 2: Understand what 25% profit means. A 25% profit means the selling price is 25% more than the cost price. Step 3: Use the selling price formula. Selling Price = Cost Price × (1 + Profit % as decimal). SP = CP × (1 + 25/100) = CP × (1 + 0.25) = CP × 1.25. Step 4: Calculate the selling price. SP = 800 × 1.25 = Rs. 1,000. Step 5: Verify. Check: Profit = SP − CP = 1,000 − 800 = Rs. 200. Profit % = (200/800) × 100% = 25% ✓. Step 6: Alternative method. Calculate profit first: Profit = 25% of 800 = 0.25 × 800 = Rs. 200. Then: SP = CP + Profit = 800 + 200 = Rs. 1,000. Step 7: Final answer. Therefore, the selling price is Rs. 1,000.',
              explanation: 'To find selling price when cost and profit percentage are given, multiply the cost by (1 + profit% as decimal). This is equivalent to: SP = CP + (Profit% of CP). The multiplier method is faster and less error-prone.',
            },
            {
              question: 'An item is sold for Rs. 450 at a 10% loss. What was the original cost price?',
              solution: 'Step 1: Identify the given values. Selling Price (SP) = Rs. 450, Loss % = 10%. Step 2: Understand the relationship. A 10% loss means the selling price is 10% less than the cost price. So: SP = CP × (1 − 10/100) = CP × (1 − 0.10) = CP × 0.90. Step 3: Set up the equation. We know SP = 450, so: 450 = CP × 0.90. Step 4: Solve for CP. To find CP, divide both sides by 0.90: CP = 450 / 0.90 = 450 / (9/10) = 450 × (10/9) = 4,500 / 9 = Rs. 500. Step 5: Verify. Check: If CP = 500 and loss % = 10%, then Loss = 10% of 500 = 0.10 × 500 = Rs. 50. SP = CP − Loss = 500 − 50 = Rs. 450 ✓. Step 6: Common mistake to avoid. Many people incorrectly calculate: CP = 450 × 1.10 = Rs. 495. This is WRONG! To reverse a percentage decrease, you must DIVIDE by (1 − %), not multiply by (1 + %). Step 7: Final answer. Therefore, the original cost price was Rs. 500.',
              explanation: 'To find the cost price when selling price and loss percentage are given, divide the selling price by (1 − loss% as decimal). This reverses the percentage decrease. Remember: to reverse a decrease, divide by (1 − %), not multiply by (1 + %). Always verify by checking that applying the loss percentage to your answer gives the given selling price.',
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
              question: 'Divide Rs. 1,200 among three people A, B, and C in the ratio 2:3:5. How much does each person receive?',
              solution: 'Step 1: Understand the ratio. The ratio 2:3:5 means A gets 2 parts, B gets 3 parts, and C gets 5 parts. Step 2: Find the total number of parts. Total parts = 2 + 3 + 5 = 10 parts. Step 3: Determine the value of one part. Total amount = Rs. 1,200. Value of one part = 1,200 ÷ 10 = Rs. 120. Step 4: Calculate each person\'s share. Person A: 2 parts × Rs. 120 = Rs. 240. Person B: 3 parts × Rs. 120 = Rs. 360. Person C: 5 parts × Rs. 120 = Rs. 600. Step 5: Verify the answer. Total = 240 + 360 + 600 = Rs. 1,200 ✓. The ratio is also correct: 240:360:600 = 2:3:5 (dividing by 120) ✓. Step 6: Alternative method (using fractions). A gets 2/10 of total = (2/10) × 1,200 = 240. B gets 3/10 of total = (3/10) × 1,200 = 360. C gets 5/10 of total = (5/10) × 1,200 = 600. Therefore, A receives Rs. 240, B receives Rs. 360, and C receives Rs. 600.',
              explanation: 'When dividing in a ratio, first find the total number of parts, then determine the value of one part. Each person\'s share is their number of parts multiplied by the value per part. Always verify by checking that the shares sum to the total and maintain the correct ratio.',
            },
            {
              question: 'If 3 oranges cost Rs. 5, how many oranges can you buy for Rs. 100?',
              solution: 'Step 1: Understand the problem. We have a rate: 3 oranges cost Rs. 5. We need to find how many oranges can be bought with Rs. 100. Step 2: Set up a proportion. A proportion states that two ratios are equal. We have: (oranges) / (cost) = (oranges) / (cost). So: 3 oranges / Rs. 5 = x oranges / Rs. 100. Step 3: Ensure same units on same side. In our proportion, oranges are on the left side of both ratios, and cost (rupees) are on the right side. This is correct: 3/5 = x/100. Step 4: Cross multiply. When we have a/b = c/d, we can cross multiply to get: a × d = b × c. So: 3 × 100 = 5 × x, which gives: 300 = 5x. Step 5: Solve for x. Divide both sides by 5: 300 ÷ 5 = 5x ÷ 5, which gives: 60 = x. Step 6: Interpret the answer. x = 60 means we can buy 60 oranges for Rs. 100. Step 7: Verify the answer. Check: If 3 oranges cost Rs. 5, then 1 orange costs Rs. 5/3. For Rs. 100, we can buy: 100 ÷ (5/3) = 100 × (3/5) = 300/5 = 60 oranges ✓. Therefore, you can buy 60 oranges for Rs. 100.',
              explanation: 'Proportions are powerful tools for solving rate problems. The key is setting up the proportion correctly with the same units on the same side. Then cross multiply to solve. Always verify your answer by checking if it makes sense with the given rate.',
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
              question: 'Person A can complete a job in 6 hours working alone. Person B can complete the same job in 4 hours working alone. How long will it take for both A and B to complete the job if they work together?',
              solution: 'Step 1: Understand the problem. We need to find how long it takes when A and B work together. The key is to work with rates, not times. Step 2: Calculate Person A\'s work rate. If A completes the job in 6 hours, A\'s rate = 1 job ÷ 6 hours = 1/6 of the job per hour. Step 3: Calculate Person B\'s work rate. If B completes the job in 4 hours, B\'s rate = 1 job ÷ 4 hours = 1/4 of the job per hour. Step 4: Calculate the combined work rate. When working together, their rates add up: Combined rate = A\'s rate + B\'s rate = 1/6 + 1/4. Step 5: Find a common denominator and add. Common denominator of 6 and 4 is 12. 1/6 = 2/12 and 1/4 = 3/12. Combined rate = 2/12 + 3/12 = 5/12 of the job per hour. Step 6: Calculate the time to complete the job together. Using Time = Work ÷ Rate: Time = 1 job ÷ (5/12 job/hour) = 1 × (12/5) = 12/5 hours. Step 7: Convert to decimal and mixed number. 12/5 = 2.4 hours = 2 hours and 0.4 × 60 minutes = 2 hours 24 minutes. Therefore, working together, A and B will complete the job in 12/5 hours (or 2 hours 24 minutes). Step 8: Verify. In 12/5 hours: A completes (1/6) × (12/5) = 12/30 = 2/5 of the job. B completes (1/4) × (12/5) = 12/20 = 3/5 of the job. Together: 2/5 + 3/5 = 5/5 = 1 complete job. ✓',
              explanation: 'Work problems require thinking in terms of rates (work per unit time), not times. Each person\'s rate is 1 divided by their time to complete the job alone. When people work together, their rates add up. To find the time together, we divide 1 (the whole job) by the combined rate. This gives us the time needed to complete one full job.',
            },
            {
              question: 'Pipe A can fill a water tank in 3 hours. Pipe B can fill the same tank in 5 hours. How long will it take to fill the tank if both pipes are opened at the same time?',
              solution: 'Step 1: Understand the problem. This is similar to work problems - pipes filling a tank is like workers completing a job. Step 2: Calculate Pipe A\'s filling rate. If Pipe A fills the tank in 3 hours, A\'s rate = 1 tank ÷ 3 hours = 1/3 of the tank per hour. Step 3: Calculate Pipe B\'s filling rate. If Pipe B fills the tank in 5 hours, B\'s rate = 1 tank ÷ 5 hours = 1/5 of the tank per hour. Step 4: Calculate the combined filling rate. When both pipes are open, their rates add up: Combined rate = 1/3 + 1/5. Step 5: Find a common denominator and add. Common denominator of 3 and 5 is 15. 1/3 = 5/15 and 1/5 = 3/15. Combined rate = 5/15 + 3/15 = 8/15 of the tank per hour. Step 6: Calculate the time to fill the tank. Using Time = Work ÷ Rate: Time = 1 tank ÷ (8/15 tank/hour) = 1 × (15/8) = 15/8 hours. Step 7: Convert to decimal and mixed number. 15/8 = 1.875 hours = 1 hour + 0.875 × 60 minutes = 1 hour 52.5 minutes = 1 hour 52 minutes 30 seconds. Therefore, with both pipes open, the tank will be filled in 15/8 hours (or 1 hour 52 minutes 30 seconds). Step 8: Verify. In 15/8 hours: Pipe A fills (1/3) × (15/8) = 15/24 = 5/8 of the tank. Pipe B fills (1/5) × (15/8) = 15/40 = 3/8 of the tank. Together: 5/8 + 3/8 = 8/8 = 1 full tank. ✓',
              explanation: 'Pipe problems work exactly like work problems. Each pipe has a filling rate (tank per hour). When multiple pipes are open, their rates add together. We divide 1 (the full tank) by the combined rate to find how long it takes to fill the tank completely.',
            },
            {
              question: 'Three workers A, B, and C working together can complete a project in 2 hours. Worker A alone can complete it in 6 hours, and Worker B alone can complete it in 9 hours. How long would it take Worker C to complete the project alone?',
              solution: 'Step 1: Understand the problem. We know the combined rate of all three workers and the individual rates of A and B. We need to find C\'s individual rate, then C\'s time. Step 2: Calculate the combined work rate of all three. If A, B, and C together complete the job in 2 hours, their combined rate = 1 job ÷ 2 hours = 1/2 of the job per hour. Step 3: Calculate Worker A\'s individual rate. If A alone takes 6 hours, A\'s rate = 1 job ÷ 6 hours = 1/6 of the job per hour. Step 4: Calculate Worker B\'s individual rate. If B alone takes 9 hours, B\'s rate = 1 job ÷ 9 hours = 1/9 of the job per hour. Step 5: Calculate Worker C\'s rate. Since combined rate = A\'s rate + B\'s rate + C\'s rate, we have: 1/2 = 1/6 + 1/9 + C\'s rate. Step 6: Solve for C\'s rate. C\'s rate = 1/2 − 1/6 − 1/9. Step 7: Find a common denominator. The denominators are 2, 6, and 9. LCM of 2, 6, 9 = 18. Convert: 1/2 = 9/18, 1/6 = 3/18, 1/9 = 2/18. Step 8: Subtract. C\'s rate = 9/18 − 3/18 − 2/18 = (9 − 3 − 2)/18 = 4/18 = 2/9 of the job per hour. Step 9: Calculate C\'s time to complete the job alone. Using Time = Work ÷ Rate: C\'s time = 1 job ÷ (2/9 job/hour) = 1 × (9/2) = 9/2 hours = 4.5 hours. Step 10: Convert to hours and minutes. 4.5 hours = 4 hours 30 minutes. Therefore, Worker C alone would take 9/2 hours (or 4 hours 30 minutes) to complete the project. Step 11: Verify. Combined rate check: 1/6 + 1/9 + 2/9 = 1/6 + 3/9 = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. ✓ This matches the given combined rate!',
              explanation: 'When we know the combined rate and some individual rates, we can find the unknown rate by subtraction. The combined rate equals the sum of all individual rates. Once we find C\'s rate, we invert it to find how long C takes alone. Always verify by checking that the rates add up correctly.',
            },
            {
              question: 'A factory has two machines. Machine X can produce 100 widgets per hour, and Machine Y can produce 150 widgets per hour. If both machines work together for 4 hours, how many widgets will they produce?',
              solution: 'Step 1: Understand the problem. We need to find the total production when both machines work together for 4 hours. Step 2: Identify the rates. Machine X rate = 100 widgets per hour. Machine Y rate = 150 widgets per hour. Step 3: Calculate the combined production rate. When both machines work together: Combined rate = 100 + 150 = 250 widgets per hour. Step 4: Calculate the total production in 4 hours. Using the formula: Total = Rate × Time. Total widgets = 250 widgets/hour × 4 hours = 1,000 widgets. Step 5: Verify by calculating each machine separately. Machine X in 4 hours: 100 × 4 = 400 widgets. Machine Y in 4 hours: 150 × 4 = 600 widgets. Total: 400 + 600 = 1,000 widgets. ✓ Therefore, both machines working together for 4 hours will produce 1,000 widgets.',
              explanation: 'When machines (or workers) work together, their production rates add up. We multiply the combined rate by the time to get the total production. This is a straightforward application of the rate × time = work formula.',
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
              question: 'A car travels a distance of 240 kilometers in 3 hours. What is the average speed of the car?',
              solution: 'Step 1: Identify the given information. Distance traveled = 240 km. Time taken = 3 hours. Step 2: Recall the formula. Speed = Distance ÷ Time. Step 3: Substitute the values into the formula. Speed = 240 km ÷ 3 hours. Step 4: Perform the division. 240 ÷ 3 = 80. Step 5: Include the units. Speed = 80 km/h (kilometers per hour). Therefore, the average speed of the car is 80 km/h. Step 6: Verify the answer makes sense. If the car travels at 80 km/h for 3 hours: Distance = 80 × 3 = 240 km. ✓ This matches the given distance!',
              explanation: 'This is a straightforward application of the speed formula. Speed is defined as distance divided by time. We simply divide the total distance (240 km) by the total time (3 hours) to get the average speed. The units km/h tell us how many kilometers the car travels in one hour.',
            },
            {
              question: 'A person travels 60 kilometers at a speed of 40 km/h, then travels another 60 kilometers at a speed of 60 km/h. What is the average speed for the entire journey?',
              solution: 'Step 1: Understand the problem. This journey has two parts with different speeds. We cannot simply average the speeds - we must use the formula: Average Speed = Total Distance ÷ Total Time. Step 2: Calculate the time for the first part. Distance = 60 km, Speed = 40 km/h. Using Time = Distance ÷ Speed: Time₁ = 60 km ÷ 40 km/h = 1.5 hours. Step 3: Calculate the time for the second part. Distance = 60 km, Speed = 60 km/h. Using Time = Distance ÷ Speed: Time₂ = 60 km ÷ 60 km/h = 1 hour. Step 4: Find the total time. Total Time = Time₁ + Time₂ = 1.5 hours + 1 hour = 2.5 hours. Step 5: Find the total distance. Total Distance = 60 km + 60 km = 120 km. Step 6: Calculate the average speed. Average Speed = Total Distance ÷ Total Time = 120 km ÷ 2.5 hours = 48 km/h. Step 7: Verify (and show why averaging speeds is wrong). If we incorrectly averaged speeds: (40 + 60) ÷ 2 = 50 km/h. But this is wrong! The person spent more time at the slower speed (1.5 hours) than at the faster speed (1 hour), so the average should be closer to 40 km/h than 60 km/h. Our answer of 48 km/h makes sense. Therefore, the average speed for the entire journey is 48 km/h.',
              explanation: 'This is a common trap! You cannot simply average the two speeds. The average speed must account for how long the person traveled at each speed. Since more time was spent at the slower speed (1.5 hours vs 1 hour), the average speed is weighted toward the slower speed. We must calculate total distance and total time separately, then divide to get the true average speed.',
            },
            {
              question: 'Two trains are approaching each other on parallel tracks. Train A is 200 meters long and travels at 60 km/h. Train B is 150 meters long and travels at 40 km/h. How long will it take for the trains to completely pass each other (from when the fronts meet until the rears separate)?',
              solution: 'Step 1: Understand the problem. When trains pass each other, we need to consider the total distance that must be covered. This is the sum of both train lengths. Step 2: Calculate the total distance to be covered. Total distance = Length of Train A + Length of Train B = 200 m + 150 m = 350 m. Step 3: Calculate the relative speed. Since the trains are moving toward each other (opposite directions), we add their speeds: Relative speed = 60 km/h + 40 km/h = 100 km/h. Step 4: Convert units to be consistent. The distance is in meters, but speed is in km/h. We need to convert speed to m/s (meters per second). Conversion: 1 km/h = 1000 m / 3600 s = 5/18 m/s. So 100 km/h = 100 × (5/18) = 500/18 = 250/9 ≈ 27.78 m/s. Step 5: Calculate the time. Using Time = Distance ÷ Speed: Time = 350 m ÷ 27.78 m/s ≈ 12.6 seconds. Step 6: Verify with exact calculation. Using fractions: Time = 350 m ÷ (250/9 m/s) = 350 × (9/250) = 3150/250 = 12.6 seconds. Therefore, it will take approximately 12.6 seconds for the trains to completely pass each other.',
              explanation: 'When two objects move toward each other, their relative speed is the sum of their individual speeds. The total distance to be covered is the sum of both train lengths because we need to account for both trains passing completely. Unit conversion is crucial here - we convert km/h to m/s by multiplying by 5/18 (since 1 km/h = 1000 m / 3600 s = 5/18 m/s).',
            },
            {
              question: 'A cyclist rides from Town A to Town B at an average speed of 20 km/h, then immediately returns from Town B to Town A at an average speed of 30 km/h. If the distance between the towns is 60 km, what is the cyclist\'s average speed for the entire round trip?',
              solution: 'Step 1: Understand the problem. This is a round trip with different speeds for each direction. We need total distance and total time. Step 2: Calculate the time for the trip from A to B. Distance = 60 km, Speed = 20 km/h. Time₁ = 60 km ÷ 20 km/h = 3 hours. Step 3: Calculate the time for the return trip from B to A. Distance = 60 km, Speed = 30 km/h. Time₂ = 60 km ÷ 30 km/h = 2 hours. Step 4: Find the total time. Total Time = Time₁ + Time₂ = 3 hours + 2 hours = 5 hours. Step 5: Find the total distance. Total Distance = 60 km + 60 km = 120 km (round trip). Step 6: Calculate the average speed. Average Speed = Total Distance ÷ Total Time = 120 km ÷ 5 hours = 24 km/h. Step 7: Verify. Note that this is NOT the average of 20 and 30 (which would be 25). The cyclist spent more time at the slower speed (3 hours vs 2 hours), so the average is closer to 20 than 30. Our answer of 24 km/h makes sense. Therefore, the average speed for the entire round trip is 24 km/h.',
              explanation: 'For round trips with different speeds, we must calculate the total distance and total time. The average speed is NOT simply the average of the two speeds because different amounts of time are spent at each speed. Since more time is spent at the slower speed (3 hours vs 2 hours), the average speed is weighted toward the slower speed.',
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
              question: 'An alloy is made of copper and zinc in the ratio 3:2. If there are 15 kg of copper in the alloy, how much zinc is there?',
              solution: 'Step 1: Understand the ratio. The ratio 3:2 means for every 3 parts of copper, there are 2 parts of zinc. Step 2: Set up the relationship. If the ratio is 3:2, then: Copper = 3 parts, Zinc = 2 parts. We know Copper = 15 kg. Step 3: Find the value of one part. Since 15 kg = 3 parts, we divide: 1 part = 15 kg ÷ 3 = 5 kg. Step 4: Calculate the amount of zinc. Zinc = 2 parts = 2 × 5 kg = 10 kg. Step 5: Verify the ratio. Check: Copper : Zinc = 15 : 10 = 3 : 2 (dividing both by 5) ✓. Step 6: Final answer. Therefore, there are 10 kg of zinc in the alloy.',
              explanation: 'When given one quantity in a ratio, find the value of one "part" first, then multiply by the number of parts for the other quantity. This method works for any ratio problem where you know one actual value.',
            },
            {
              question: 'A mixture has components A and B in the ratio 2:3, with a total weight of 50 kg. If 10 kg of component A is added to the mixture, what is the new ratio of A to B?',
              solution: 'Step 1: Find the original amounts. Ratio A:B = 2:3, total = 50 kg. Total parts = 2 + 3 = 5. Component A: (2/5) × 50 = 20 kg. Component B: (3/5) × 50 = 30 kg. Step 2: Add the new quantity. After adding 10 kg of A: New A = 20 + 10 = 30 kg. Component B remains: 30 kg (unchanged). Step 3: Find the new ratio. New A : New B = 30 : 30 = 1 : 1 (dividing both by 30). Step 4: Verify. Check: Original ratio was 2:3. After adding A, we have equal amounts (30 kg each), so ratio is 1:1 ✓. Step 5: Final answer. Therefore, the new ratio is 1:1.',
              explanation: 'When adding to a mixture, find the original amounts first using the ratio, then add the new quantity to the appropriate component, and find the new ratio. The component not being added remains unchanged.',
            },
            {
              question: 'A solution has components A and B in the ratio 4:5. If 18 liters are removed from the solution and then 18 liters of pure A are added, the new ratio becomes 1:1. What was the original total volume of the solution?',
              solution: 'Step 1: Set up variables using ratio parts. Let the original solution have components in ratio 4:5. If we let the parts be 4x and 5x, then: Original A = 4x liters, Original B = 5x liters, Original total = 9x liters. Step 2: Calculate what is removed. When 18L is removed, it\'s removed in the same ratio 4:5. A removed = (4/9) × 18 = 8L, B removed = (5/9) × 18 = 10L. Total removed = 8 + 10 = 18L ✓. Step 3: Find amounts after removal. After removal: A = 4x − 8, B = 5x − 10. Step 4: Add 18L of pure A. After adding 18L of A: A = (4x − 8) + 18 = 4x + 10, B = 5x − 10 (unchanged). Step 5: Set up equation from new ratio. The new ratio is 1:1, meaning A = B. So: 4x + 10 = 5x − 10. Step 6: Solve for x. Subtract 4x from both sides: 10 = x − 10. Add 10 to both sides: 20 = x. So x = 20. Step 7: Find the original total. Original total = 9x = 9 × 20 = 180 liters. Step 8: Verify. Original: A = 80L, B = 100L (ratio 4:5) ✓. Remove 18L (8L A, 10L B): A = 72L, B = 90L. Add 18L A: A = 90L, B = 90L. New ratio = 90:90 = 1:1 ✓. Therefore, the original total volume was 180 liters.',
              explanation: 'For complex mixture problems with removal and addition, set up algebra with ratio parts. Track each step: (1) Original amounts in ratio, (2) Calculate removal amounts (in same ratio), (3) Subtract removed amounts, (4) Add new amounts, (5) Set up equation from final ratio, (6) Solve for x, (7) Find original total. Always verify by working through the steps with your answer.',
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
              question: 'Quantitative Comparison: Column A: x², Column B: x. Condition: x is a real number. Which is greater?',
              solution: 'Step 1: Follow the QC systematic approach. The problem has a variable (x), so we need to test different values. Step 2: Test x = 0 (always test 0 first). Column A: x² = 0² = 0. Column B: x = 0. Result: A = B (they are equal). Step 3: Test x = 1 (always test 1). Column A: x² = 1² = 1. Column B: x = 1. Result: A = B (they are equal). Step 4: Test x = 2 (a positive number greater than 1). Column A: x² = 2² = 4. Column B: x = 2. Result: A > B (Column A is greater). Step 5: Test x = ½ (a fraction between 0 and 1). Column A: x² = (½)² = ¼ = 0.25. Column B: x = ½ = 0.5. Result: A < B (Column A is smaller). Step 6: Analyze the results. We found: x = 0 or 1: A = B. x = 2: A > B. x = ½: A < B. Since different test values give different relationships (equal, A>B, A<B), the relationship depends on the value of x. Step 7: Determine the answer. In QC, if the relationship can change depending on the value of the variable, the answer is D (The relationship cannot be determined from the information given). Step 8: Final answer. Therefore, the answer is D - the relationship cannot be determined.',
              explanation: 'For QC problems with variables, you must test multiple values systematically. Always test: 0, 1, a positive number > 1, a fraction between 0 and 1, and a negative number if applicable. If you get different relationships, the answer is D. If you always get the same relationship, that\'s your answer.',
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
              question: 'Quantitative Comparison: Column A: Area of a square with side 5. Column B: Area of a rectangle with length 4 and width 6. Which is greater?',
              solution: 'Step 1: Calculate Column A. Square area = side². With side = 5: Area = 5² = 25 square units. Step 2: Calculate Column B. Rectangle area = length × width. With length = 4 and width = 6: Area = 4 × 6 = 24 square units. Step 3: Compare the values. Column A = 25, Column B = 24. Since 25 > 24, Column A is greater. Step 4: Verify calculations. Square: 5 × 5 = 25 ✓. Rectangle: 4 × 6 = 24 ✓. Step 5: Final answer. Therefore, Column A is greater than Column B.',
              explanation: 'For QC problems without variables, calculate both columns directly and compare. Make sure to use the correct formulas: square area = side², rectangle area = length × width. Always double-check your calculations.',
            },
            {
              question: 'Quantitative Comparison: Column A: Perimeter of a triangle with sides 3, 4, and 5. Column B: Perimeter of a square with side 3. Which is greater?',
              solution: 'Step 1: Calculate Column A. Triangle perimeter = sum of all three sides. With sides 3, 4, and 5: Perimeter = 3 + 4 + 5 = 12 units. Step 2: Calculate Column B. Square perimeter = 4 × side. With side = 3: Perimeter = 4 × 3 = 12 units. Step 3: Compare the values. Column A = 12, Column B = 12. Since 12 = 12, the two columns are equal. Step 4: Verify calculations. Triangle: 3 + 4 + 5 = 12 ✓. Square: 4 × 3 = 12 ✓. Step 5: Final answer. Therefore, Column A equals Column B.',
              explanation: 'When both columns calculate to the same value, the answer is C (the two quantities are equal). Always verify your calculations, especially when the answer is C, to make sure you didn\'t make an error.',
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
              question: 'A bar graph shows monthly sales as follows: January = 50 units, February = 70 units, March = 60 units, April = 80 units. What is the average monthly sales?',
              solution: 'Step 1: Understand the problem. We need to find the average (mean) of the four monthly sales values. Step 2: Read the values from the graph. January: 50, February: 70, March: 60, April: 80. Step 3: Calculate the sum. Total sales = 50 + 70 + 60 + 80 = 260 units. Step 4: Calculate the average. Average = Total / Number of values = 260 / 4 = 65 units. Step 5: Verify. Check: (50 + 70 + 60 + 80) / 4 = 260 / 4 = 65 ✓. Step 6: Interpret. The average monthly sales is 65 units, meaning if sales were constant, each month would have 65 units. Step 7: Final answer. Therefore, the average monthly sales is 65 units.',
              explanation: 'To find the average from a bar graph, read all values, sum them, then divide by the count. Always double-check that you\'ve read the correct values from the bars and haven\'t missed any data points.',
            },
            {
              question: 'Using the same bar graph data (Jan=50, Feb=70, Mar=60, Apr=80), which month had the highest growth from the previous month?',
              solution: 'Step 1: Understand growth. Growth means the increase (or decrease) from the previous month. We need to calculate the change for each month compared to the previous month. Step 2: Calculate growth for February (compared to January). February: 70, January: 50. Growth = 70 − 50 = +20 units (positive means increase). Step 3: Calculate growth for March (compared to February). March: 60, February: 70. Growth = 60 − 70 = −10 units (negative means decrease). Step 4: Calculate growth for April (compared to March). April: 80, March: 60. Growth = 80 − 60 = +20 units (positive means increase). Step 5: Compare the growth values. February: +20, March: −10, April: +20. The highest growth is +20, which occurs in both February and April. Step 6: Interpret. Both February and April had the same growth of 20 units from their respective previous months. February grew from 50 to 70 (+20), and April grew from 60 to 80 (+20). Step 7: Final answer. Therefore, February and April are tied for the highest growth, each with +20 units from the previous month.',
              explanation: 'Growth is calculated as the difference between consecutive values. Positive values indicate increases, negative values indicate decreases. When comparing growth, look at the absolute change, not just whether it\'s positive or negative. Always calculate each period\'s growth separately.',
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
              question: 'A line graph shows values over 4 years: Year 1 = 100, Year 2 = 120, Year 3 = 150, Year 4 = 140. What is the overall trend?',
              solution: 'Step 1: Identify the data points. Year 1: 100, Year 2: 120, Year 3: 150, Year 4: 140. Step 2: Analyze year-by-year changes. Year 1 to Year 2: 100 → 120 (increase of 20). Year 2 to Year 3: 120 → 150 (increase of 30). Year 3 to Year 4: 150 → 140 (decrease of 10). Step 3: Identify the peak. The highest value is 150 in Year 3. This is the peak. Step 4: Determine overall trend. Starting value: 100. Ending value: 140. Overall change: 140 − 100 = +40 (an increase). Step 5: Note any reversals. While the overall trend is upward (from 100 to 140), there was a decrease in the final year (Year 3 to Year 4: 150 → 140). Step 6: Describe the trend. The overall trend is upward (increasing) from Year 1 to Year 4, with the value increasing from 100 to 140. However, there was a peak at Year 3 (150), followed by a decrease in Year 4. Step 7: Final answer. Overall trend: Increasing from 100 to 140, but with a peak at 150 in Year 3 and a decrease in the final year.',
              explanation: 'When analyzing trends, look at both the overall change (start to end) and any intermediate changes. A trend can be overall upward but have periods of decrease. Always identify peaks and valleys, and note any reversals in the trend.',
            },
            {
              question: 'Using the same line graph data (Year 1=100, Year 2=120, Year 3=150, Year 4=140), which year-to-year period had the highest growth rate?',
              solution: 'Step 1: Understand growth rate. Growth rate is the percentage change from one period to the next. Formula: Growth rate = [(New − Old) / Old] × 100%. Step 2: Calculate growth rate for Year 1 to Year 2. Old value = 100, New value = 120. Growth rate = [(120 − 100) / 100] × 100% = [20 / 100] × 100% = 0.20 × 100% = 20%. Step 3: Calculate growth rate for Year 2 to Year 3. Old value = 120, New value = 150. Growth rate = [(150 − 120) / 120] × 100% = [30 / 120] × 100% = 0.25 × 100% = 25%. Step 4: Calculate growth rate for Year 3 to Year 4. Old value = 150, New value = 140. Growth rate = [(140 − 150) / 150] × 100% = [−10 / 150] × 100% = −0.0667 × 100% = −6.67% (negative means decrease). Step 5: Compare the growth rates. Year 1→2: 20%, Year 2→3: 25%, Year 3→4: −6.67%. The highest growth rate is 25% from Year 2 to Year 3. Step 6: Verify. Year 2→3 had the largest percentage increase (25%), even though Year 1→2 had a larger absolute increase (20 vs 30, but from a smaller base). Step 7: Final answer. Therefore, the period from Year 2 to Year 3 had the highest growth rate at 25%.',
              explanation: 'Growth rate measures percentage change, not absolute change. A smaller absolute increase can have a higher growth rate if it\'s from a smaller base. Always use the formula: [(New − Old) / Old] × 100% to calculate growth rates. Compare percentage changes, not absolute changes.',
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
              question: 'A data table shows Product A sales by quarter: Q1 = 100 units, Q2 = 120 units, Q3 = 110 units, Q4 = 130 units. Find the total sales and average quarterly sales.',
              solution: 'Step 1: Understand the problem. We need to find the total sales for all four quarters and the average sales per quarter. Step 2: Calculate the total sales. Total = Q1 + Q2 + Q3 + Q4 = 100 + 120 + 110 + 130. Step 3: Add the values. 100 + 120 = 220. 220 + 110 = 330. 330 + 130 = 460. So Total = 460 units. Step 4: Calculate the average. Average = Total / Number of quarters = 460 / 4 = 115 units per quarter. Step 5: Verify. Check: If average is 115 per quarter, then total for 4 quarters = 115 × 4 = 460 ✓. Step 6: Interpret. Product A sold a total of 460 units over the year, with an average of 115 units per quarter. Step 7: Final answer. Therefore, total sales = 460 units, and average quarterly sales = 115 units.',
              explanation: 'For tables, read values carefully from the correct row and column intersection. To find totals, sum all relevant values. To find averages, divide the total by the count. Always verify by checking that average × count = total.',
            },
            {
              question: 'A data table shows quarterly sales for multiple products. Which product had the highest sales in Q4?',
              solution: 'Step 1: Locate the Q4 column. In the table, find the column header labeled "Q4" or "Quarter 4". Step 2: Read all Q4 values. Scan down the Q4 column and read the sales value for each product. For example: Product A: 130, Product B: 95, Product C: 150, Product D: 120. Step 3: Compare the values. Compare all Q4 values: 130, 95, 150, 120. The highest value is 150. Step 4: Identify which product. Product C has 150 units in Q4, which is the highest. Step 5: Verify. Double-check by reading the Q4 column again to ensure you didn\'t misread any values. Step 6: Final answer. Therefore, Product C had the highest Q4 sales with 150 units.',
              explanation: 'When finding maximum or minimum values in a table, scan the relevant column (or row) systematically. Read each value carefully, compare them, and identify the highest (or lowest). Always double-check to avoid reading errors.',
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
              question: 'A pie chart shows the distribution of a total of 200 items into three categories: Category A = 30%, Category B = 25%, Category C = 45%. What are the actual values (number of items) in each category?',
              solution: 'Step 1: Understand pie charts. A pie chart shows percentages that represent parts of a whole. To find actual values, we multiply each percentage by the total. Step 2: Verify percentages sum to 100%. Check: 30% + 25% + 45% = 100% ✓. This confirms the pie chart is complete. Step 3: Calculate actual value for Category A. Category A = 30% of 200. Actual value = 30% × 200 = 0.30 × 200 = 60 items. Step 4: Calculate actual value for Category B. Category B = 25% of 200. Actual value = 25% × 200 = 0.25 × 200 = 50 items. Step 5: Calculate actual value for Category C. Category C = 45% of 200. Actual value = 45% × 200 = 0.45 × 200 = 90 items. Step 6: Verify the total. Check: 60 + 50 + 90 = 200 ✓. The actual values sum to the given total. Step 7: Final answer. Therefore, Category A has 60 items, Category B has 50 items, and Category C has 90 items.',
              explanation: 'Pie charts show percentages, but questions often ask for actual values. To convert: Actual value = (Percentage / 100) × Total. Always verify that the percentages sum to 100% and that the actual values sum to the total. This prevents calculation errors.',
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
    'sentence-completion': {
      title: 'Sentence Completion',
      icon: '✍️',
      concepts: [
        {
          id: 'predict-before-choices',
          title: 'Predict Before Looking at Choices',
          level: 'beginner',
          why: 'Predicting the answer before seeing options helps you avoid being misled by tempting but incorrect choices. It keeps you focused on what the sentence actually needs.',
          when: 'Use this technique for every sentence completion question. Read the sentence carefully, identify the blank(s), and think about what word would logically complete the sentence before looking at answer choices.',
          where: 'Applied in: all sentence completion questions, especially those testing vocabulary and grammar.',
          conditions: [
            'Read the entire sentence first',
            'Identify the blank(s) and what type of word is needed',
            'Look for context clues (words around the blank)',
            'Predict a word that would fit logically',
            'Then check answer choices to find the best match',
          ],
          examples: [
            {
              question: 'The scientist\'s research was so _____ that it revolutionized the entire field of medicine.',
              solution: 'Step 1: Read the sentence completely. Step 2: Identify the blank - it needs an adjective describing research. Step 3: Look for context clues: "revolutionized the entire field" suggests something very significant, groundbreaking, or important. Step 4: Predict: words like "groundbreaking," "revolutionary," "significant," or "important" would fit. Step 5: Check answer choices: A) trivial B) groundbreaking C) ordinary D) minor. Answer: B) groundbreaking matches our prediction perfectly.',
              explanation: 'The context clue "revolutionized the entire field" strongly indicates that the research was groundbreaking or highly significant. Predicting before looking at choices helps you identify that trivial, ordinary, and minor are opposite in meaning to what\'s needed.',
            },
            {
              question: 'Despite facing numerous _____, the team managed to complete the project on time.',
              solution: 'Step 1: Read the sentence. Step 2: The blank needs a noun (something the team faced). Step 3: Context clue: "Despite" indicates contrast - they faced something negative but still succeeded. Step 4: Predict: words like "obstacles," "challenges," "difficulties," or "problems." Step 5: Check choices: A) advantages B) obstacles C) opportunities D) benefits. Answer: B) obstacles fits the prediction and the contrast indicated by "despite."',
              explanation: 'The word "despite" signals that what follows will be something negative or challenging. This context clue helps predict that obstacles, challenges, or difficulties would fit, while advantages, opportunities, and benefits would not make sense in this context.',
            },
            {
              question: 'The author\'s writing style is both _____ and _____, making her books accessible to both scholars and general readers.',
              solution: 'Step 1: Read the sentence - this is a two-blank question. Step 2: Both blanks need adjectives describing writing style. Step 3: Context clue: "accessible to both scholars and general readers" suggests the style is sophisticated (for scholars) but also clear/understandable (for general readers). Step 4: Predict: first blank could be "sophisticated," "scholarly," or "erudite"; second blank could be "clear," "accessible," or "understandable." Step 5: Check choices: A) complex...simple B) scholarly...accessible C) obscure...difficult D) simple...complex. Answer: B) scholarly...accessible matches the prediction.',
              explanation: 'Two-blank questions require careful analysis. The phrase "accessible to both scholars and general readers" indicates the writing must be sophisticated enough for experts (scholarly) yet clear enough for everyone (accessible). This creates a contrast that helps predict both blanks.',
            },
          ],
          commonMistakes: [
            'Looking at answer choices before understanding the sentence',
            'Ignoring context clues around the blank',
            'Choosing words that sound good but don\'t fit the context',
            'Not considering the overall meaning of the sentence',
          ],
          tips: [
            'Always read the entire sentence first',
            'Look for signal words like "despite," "although," "because," "however"',
            'Identify whether the blank needs a positive or negative word',
            'Consider the tone and formality level of the sentence',
            'For two-blank questions, ensure both words work together',
          ],
        },
        {
          id: 'check-all-options',
          title: 'Check All Options Methodically',
          level: 'beginner',
          why: 'Even if you think you found the answer quickly, checking all options ensures you haven\'t missed a better choice. Some questions have multiple plausible answers, and you need to find the BEST one.',
          when: 'Use after making your prediction. Systematically evaluate each answer choice against your prediction and the sentence context.',
          where: 'Applied in: all sentence completion questions, especially when multiple choices seem possible.',
          conditions: [
            'Read each answer choice carefully',
            'Plug each choice into the sentence mentally',
            'Eliminate choices that don\'t fit grammatically',
            'Eliminate choices that don\'t fit the meaning',
            'Choose the best remaining option',
          ],
          examples: [
            {
              question: 'The manager\'s _____ approach to problem-solving earned her the respect of her team.',
              solution: 'Step 1: Predict: we need a positive adjective describing approach. Step 2: Check all options: A) systematic - organized, methodical (could work) B) haphazard - random, disorganized (negative, eliminate) C) systematic - wait, let me check all: A) systematic B) haphazard C) careless D) negligent. Step 3: Eliminate negatives: B) haphazard, C) careless, D) negligent are all negative. Step 4: A) systematic fits perfectly - it\'s positive and describes a good problem-solving approach. Answer: A) systematic.',
              explanation: 'By checking all options, we can eliminate the three negative choices (haphazard, careless, negligent) immediately. This leaves only systematic, which fits the positive context of earning respect.',
            },
            {
              question: 'The ancient manuscript was so _____ that scholars could barely read it.',
              solution: 'Step 1: Predict: adjective meaning old, faded, or hard to read. Step 2: Check all options: A) legible - easy to read (opposite, eliminate) B) illegible - hard to read (fits!) C) modern - new (doesn\'t fit context) D) clear - easy to read (opposite, eliminate). Step 3: B) illegible is the only choice that matches "could barely read it." Answer: B) illegible.',
              explanation: 'Checking all options reveals that legible and clear mean the opposite of what\'s needed. Illegible directly matches the context of being hard to read.',
            },
            {
              question: 'Her speech was both _____ and inspiring, moving the audience to action.',
              solution: 'Step 1: Predict: adjective meaning powerful, persuasive, or compelling. Step 2: Check all options: A) eloquent - fluent, persuasive (could work) B) boring - uninteresting (opposite, eliminate) C) confusing - unclear (negative, eliminate) D) eloquent - wait, let me see all: A) eloquent B) boring C) confusing D) monotonous. Step 3: Eliminate negatives: B, C, D are all negative. Step 4: A) eloquent fits perfectly with "inspiring" and "moving to action." Answer: A) eloquent.',
              explanation: 'Systematically eliminating negative options (boring, confusing, monotonous) leaves eloquent, which perfectly complements "inspiring" and fits the positive context.',
            },
          ],
          commonMistakes: [
            'Stopping at the first answer that seems right',
            'Not reading all choices carefully',
            'Missing subtle differences between similar words',
            'Choosing based on partial understanding',
          ],
          tips: [
            'Always read all answer choices, even if the first one seems correct',
            'Eliminate obviously wrong answers first',
            'Compare remaining choices carefully',
            'Consider which word fits BEST, not just which one works',
            'Watch for words that are similar but have different connotations',
          ],
        },
        {
          id: 'two-blank-questions',
          title: 'Handling Two-Blank Questions',
          level: 'intermediate',
          why: 'Two-blank questions are more complex because both words must work together and fit the sentence. A systematic approach prevents errors.',
          when: 'Use when encountering sentence completion questions with two blanks. Work on one blank at a time, but ensure both words work together.',
          where: 'Applied in: two-blank sentence completion questions, which test both vocabulary and logical reasoning.',
          conditions: [
            'Read the entire sentence first',
            'Identify the relationship between the blanks',
            'Start with the blank that has clearer context clues',
            'Eliminate answer pairs where one word doesn\'t fit',
            'Verify that both words work together logically',
          ],
          examples: [
            {
              question: 'The new policy was both _____ and _____, addressing concerns while maintaining efficiency.',
              solution: 'Step 1: Read sentence - two blanks, both need adjectives. Step 2: Context: "addressing concerns" (positive) and "maintaining efficiency" (positive). Both blanks likely need positive words. Step 3: Check answer pairs: A) effective...inefficient (second word negative, eliminate) B) ineffective...efficient (first word negative, eliminate) C) effective...efficient (both positive, could work) D) problematic...inefficient (both negative, eliminate). Step 4: Verify C) effective...efficient: "effective" addresses concerns, "efficient" maintains efficiency. Both work together. Answer: C) effective...efficient.',
              explanation: 'For two-blank questions, eliminate pairs where either word doesn\'t fit. Here, we need both words to be positive (addressing concerns positively, maintaining efficiency). Only "effective...efficient" satisfies both requirements.',
            },
            {
              question: 'Although the evidence was _____, the jury found it _____ enough to convict.',
              solution: 'Step 1: Read sentence - "Although" signals contrast. Step 2: First blank: could be positive or negative. Second blank: "enough to convict" suggests it was sufficient/convincing (positive). Step 3: The contrast means if second is positive, first might be negative. Check pairs: A) compelling...insufficient (second negative, eliminate) B) weak...compelling (first negative, second positive - contrast works!) C) strong...weak (second negative, eliminate) D) insufficient...compelling (first negative, second positive - could work). Step 4: Test B) weak...compelling: "Although weak, it was compelling enough" - makes sense! Test D) insufficient...compelling: "Although insufficient, it was compelling enough" - contradictory. Answer: B) weak...compelling.',
              explanation: 'The word "although" creates a contrast. The second blank must be positive ("enough to convict"). The first blank should contrast with this, so it\'s likely negative. "Weak...compelling" creates the perfect contrast: evidence seemed weak but was actually compelling enough.',
            },
            {
              question: 'The scientist was both _____ in her research methods and _____ in her conclusions.',
              solution: 'Step 1: Read sentence - two blanks describing the scientist. Step 2: Context suggests both should be positive (good scientist). Step 3: Check pairs: A) meticulous...careful (both positive, could work) B) sloppy...careful (first negative, eliminate) C) meticulous...hasty (second negative, eliminate) D) careless...precise (first negative, eliminate). Step 4: Verify A) meticulous...careful: "meticulous" means very careful and detailed in methods, "careful" means cautious in conclusions. Both are positive and complement each other. Answer: A) meticulous...careful.',
              explanation: 'Both blanks need positive adjectives describing a good scientist. "Meticulous" (very careful and detailed) fits research methods, and "careful" fits drawing conclusions. They work together to describe a thorough scientist.',
            },
          ],
          commonMistakes: [
            'Only checking if one blank fits',
            'Ignoring the relationship between blanks',
            'Not testing both words together',
            'Missing contrast words like "although" or "despite"',
          ],
          tips: [
            'Look for signal words indicating relationship (both, and, although, despite)',
            'Start with the blank that has clearer context',
            'Eliminate pairs where either word doesn\'t fit',
            'Test the complete pair in the sentence',
            'Ensure both words work together logically',
          ],
        },
        {
          id: 'grammar-based-questions',
          title: 'Grammar-Based Sentence Completion',
          level: 'beginner',
          why: 'Many sentence completion questions test grammar rules, not just vocabulary. Understanding grammar helps you eliminate incorrect choices.',
          when: 'Use when the blank requires a specific grammatical form (verb tense, subject-verb agreement, pronoun case, etc.).',
          where: 'Applied in: sentence completion questions testing grammar alongside vocabulary.',
          conditions: [
            'Identify the grammatical function needed (noun, verb, adjective, etc.)',
            'Check subject-verb agreement',
            'Verify verb tense consistency',
            'Ensure pronoun case is correct',
            'Check for parallel structure',
          ],
          examples: [
            {
              question: 'Neither the students nor the teacher _____ satisfied with the results.',
              solution: 'Step 1: Identify subject: "Neither...nor" construction. Step 2: Grammar rule: With "neither...nor," the verb agrees with the subject closer to it. Here, "teacher" (singular) is closer. Step 3: Need singular verb form. Check choices: A) were (plural, wrong) B) was (singular, correct!) C) are (plural, wrong) D) be (base form, wrong). Answer: B) was.',
              explanation: 'This tests subject-verb agreement with "neither...nor." The verb must agree with the subject closer to it. Since "teacher" (singular) is closer, we need the singular verb "was."',
            },
            {
              question: 'The committee _____ its decision after _____ all the evidence.',
              solution: 'Step 1: First blank: verb, subject is "committee" (can be singular or plural, but "its" indicates singular). Need past tense. Step 2: Second blank: after + verb-ing form or noun. Step 3: Check choices: A) made...reviewing (first: past tense ✓, second: -ing form ✓) B) make...review (first: present, wrong) C) made...review (second: base form, wrong after "after") D) make...reviewing (first: present, wrong). Answer: A) made...reviewing.',
              explanation: 'This tests verb tense and gerund usage. "Committee" with "its" is singular, so we need past tense "made." After "after," we need the -ing form "reviewing" (gerund).',
            },
            {
              question: 'Between you and _____, I think the plan needs revision.',
              solution: 'Step 1: Identify: pronoun after preposition "between." Step 2: Grammar rule: After prepositions, use object pronouns (me, him, her, us, them), not subject pronouns. Step 3: Check choices: A) I (subject pronoun, wrong) B) me (object pronoun, correct!) C) myself (reflexive, unnecessary here) D) we (subject pronoun, wrong). Answer: B) me.',
              explanation: 'This tests pronoun case. After the preposition "between," we need the object pronoun "me," not the subject pronoun "I." "Between you and me" is the correct form.',
            },
          ],
          commonMistakes: [
            'Using subject pronouns after prepositions',
            'Mismatching verb tense with time indicators',
            'Ignoring subject-verb agreement rules',
            'Not recognizing parallel structure requirements',
          ],
          tips: [
            'Memorize common grammar rules (subject-verb agreement, pronoun case)',
            'Look for time indicators that determine verb tense',
            'Check if the sentence requires parallel structure',
            'Remember: after prepositions, use object pronouns',
            'With "neither...nor" or "either...or," verb agrees with closer subject',
          ],
        },
        {
          id: 'vocabulary-context-clues',
          title: 'Using Context Clues for Vocabulary',
          level: 'intermediate',
          why: 'Context clues help you determine the meaning of difficult words or identify what type of word is needed, even if you don\'t know all the answer choices.',
          when: 'Use when you encounter unfamiliar vocabulary or when multiple words seem possible. Look for definitions, examples, contrasts, or cause-effect relationships in the sentence.',
          where: 'Applied in: vocabulary-based sentence completion questions.',
          conditions: [
            'Look for definitions or explanations near the blank',
            'Identify examples that illustrate the word',
            'Find contrast words (but, however, although)',
            'Notice cause-effect relationships',
            'Check for tone indicators (positive/negative)',
          ],
          examples: [
            {
              question: 'The professor was known for being _____, always arriving exactly on time and never missing a deadline.',
              solution: 'Step 1: Context clue: "always arriving exactly on time and never missing a deadline" - this DEFINES the word. Step 2: The word means punctual, reliable, or time-conscious. Step 3: Check choices: A) punctual (exactly on time, fits!) B) tardy (late, opposite) C) unreliable (doesn\'t fit) D) flexible (doesn\'t match "exactly"). Answer: A) punctual.',
              explanation: 'The phrase "always arriving exactly on time" directly defines "punctual." This is a definition context clue - the sentence explains what the word means.',
            },
            {
              question: 'Unlike her _____ sister, Maria was outgoing and loved meeting new people.',
              solution: 'Step 1: Context clue: "Unlike" signals CONTRAST. Step 2: Maria is "outgoing and loved meeting new people" (sociable). Step 3: The sister must be the OPPOSITE - shy, reserved, or introverted. Step 4: Check choices: A) extroverted (same as Maria, wrong) B) introverted (opposite, correct!) C) friendly (same as Maria, wrong) D) social (same as Maria, wrong). Answer: B) introverted.',
              explanation: 'The word "unlike" creates a contrast. Since Maria is outgoing (extroverted), her sister must be introverted (shy, reserved). This is a contrast context clue.',
            },
            {
              question: 'The _____ of the ancient artifact, including its age, origin, and cultural significance, fascinated archaeologists.',
              solution: 'Step 1: Context clue: "including its age, origin, and cultural significance" - these are EXAMPLES. Step 2: The word must mean details, aspects, or characteristics. Step 3: Check choices: A) simplicity (opposite of having many details) B) aspects (different parts/details, fits!) C) disappearance (doesn\'t fit) D) destruction (doesn\'t fit). Answer: B) aspects.',
              explanation: 'The phrase "including its age, origin, and cultural significance" provides examples of what the word refers to. These are different "aspects" or parts of the artifact. This is an example context clue.',
            },
          ],
          commonMistakes: [
            'Ignoring context clues in the sentence',
            'Choosing words that contradict the context',
            'Not recognizing definition, example, or contrast clues',
            'Focusing only on vocabulary knowledge without using context',
          ],
          tips: [
            'Look for definitions (the word is explained)',
            'Find examples (specific instances are given)',
            'Watch for contrast words (but, however, unlike, although)',
            'Notice cause-effect relationships',
            'Identify positive/negative tone to narrow choices',
          ],
        },
      ],
    },
    'analogy': {
      title: 'Analogy Questions',
      icon: '🔗',
      concepts: [
        {
          id: 'synonym-analogies',
          title: 'Synonym Analogies',
          level: 'beginner',
          why: 'Synonym analogies test your vocabulary knowledge and ability to recognize words with similar meanings. They are among the most common analogy types.',
          when: 'Use when the relationship between the word pair is that the words mean the same or nearly the same thing. Look for answer choices where both words are synonyms.',
          where: 'Applied in: analogy questions where word pairs share similar meanings.',
          conditions: [
            'Identify that both words in the given pair are synonyms',
            'Find the answer choice where both words are also synonyms',
            'Ensure the synonym relationship matches in strength',
            'Watch for near-synonyms vs. exact synonyms',
          ],
          examples: [
            {
              question: 'HAPPY : JOYFUL ::',
              solution: 'Step 1: Identify relationship: HAPPY and JOYFUL are synonyms (both mean feeling pleasure). Step 2: Find answer choice with synonym pair: A) sad : happy (antonyms, wrong) B) big : large (synonyms, correct!) C) fast : slow (antonyms, wrong) D) hot : cold (antonyms, wrong). Answer: B) big : large.',
              explanation: 'Happy and joyful are synonyms (words with similar meanings). Big and large are also synonyms, maintaining the same relationship type.',
            },
            {
              question: 'BRAVE : COURAGEOUS ::',
              solution: 'Step 1: Relationship: BRAVE and COURAGEOUS are synonyms. Step 2: Find synonym pair: A) cowardly : brave (antonyms, wrong) B) intelligent : smart (synonyms, correct!) C) old : young (antonyms, wrong) D) dark : light (antonyms, wrong). Answer: B) intelligent : smart.',
              explanation: 'Brave and courageous are synonyms. Intelligent and smart are also synonyms, creating the same relationship pattern.',
            },
            {
              question: 'BRIEF : SHORT ::',
              solution: 'Step 1: Relationship: BRIEF and SHORT are synonyms (both mean not long in duration or length). Step 2: Find synonym pair: A) long : brief (antonyms, wrong) B) quick : fast (synonyms, correct!) C) tall : short (antonyms, wrong) D) wide : narrow (antonyms, wrong). Answer: B) quick : fast.',
              explanation: 'Brief and short are synonyms. Quick and fast are also synonyms, maintaining the same relationship.',
            },
          ],
          commonMistakes: [
            'Confusing synonyms with antonyms',
            'Choosing words that are related but not true synonyms',
            'Not matching the strength of the synonym relationship',
          ],
          tips: [
            'Remember: synonyms = same or very similar meaning',
            'Test by substituting one word for the other in a sentence',
            'Watch for near-synonyms (similar but not identical)',
            'Ensure both pairs have the same type of relationship',
          ],
        },
        {
          id: 'antonym-analogies',
          title: 'Antonym Analogies',
          level: 'beginner',
          why: 'Antonym analogies test your understanding of word opposites. They are common in analogy questions and help assess vocabulary depth.',
          when: 'Use when the relationship between the word pair is that the words are opposites. Look for answer choices where both words are antonyms.',
          where: 'Applied in: analogy questions where word pairs are opposites.',
          conditions: [
            'Identify that both words in the given pair are antonyms',
            'Find the answer choice where both words are also antonyms',
            'Ensure the antonym relationship is clear and direct',
          ],
          examples: [
            {
              question: 'HOT : COLD ::',
              solution: 'Step 1: Identify relationship: HOT and COLD are antonyms (opposites). Step 2: Find answer choice with antonym pair: A) warm : cool (near-antonyms, but not as strong) B) day : night (antonyms, correct!) C) bright : light (synonyms, wrong) D) fast : quick (synonyms, wrong). Answer: B) day : night.',
              explanation: 'Hot and cold are direct antonyms. Day and night are also direct antonyms, maintaining the same opposite relationship.',
            },
            {
              question: 'LOVE : HATE ::',
              solution: 'Step 1: Relationship: LOVE and HATE are antonyms (opposite emotions). Step 2: Find antonym pair: A) like : love (similar, not opposite) B) peace : war (antonyms, correct!) C) friend : enemy (antonyms, but different type - people vs. emotions) D) happy : sad (antonyms, correct but let\'s check: peace : war is stronger match for love : hate as both are abstract concepts). Actually both B and D work, but B) peace : war is better as both are abstract concepts like love/hate. Answer: B) peace : war.',
              explanation: 'Love and hate are antonyms (opposite emotions). Peace and war are also antonyms (opposite states), and both pairs represent abstract concepts, making it the best match.',
            },
            {
              question: 'LIGHT : DARK ::',
              solution: 'Step 1: Relationship: LIGHT and DARK are antonyms. Step 2: Find antonym pair: A) bright : dim (near-antonyms, could work) B) white : black (antonyms, correct!) C) day : day (same, wrong) D) sun : moon (related but not direct antonyms). Answer: B) white : black.',
              explanation: 'Light and dark are antonyms. White and black are also direct antonyms, maintaining the same opposite relationship. While bright : dim could work, white : black is a stronger, more direct antonym pair.',
            },
          ],
          commonMistakes: [
            'Confusing antonyms with synonyms',
            'Choosing words that are related but not true opposites',
            'Not recognizing indirect vs. direct antonyms',
          ],
          tips: [
            'Remember: antonyms = opposite meanings',
            'Look for clear, direct opposites',
            'Match the type of antonym (abstract concepts, physical properties, etc.)',
            'Ensure both pairs have equally strong opposite relationships',
          ],
        },
        {
          id: 'describing-qualities',
          title: 'Describing Qualities Analogies',
          level: 'intermediate',
          why: 'These analogies test your ability to recognize how one word describes a quality or characteristic of another. They assess understanding of word relationships beyond simple synonyms/antonyms.',
          when: 'Use when one word describes a quality, characteristic, or attribute of the other word. The relationship is "X is characterized by Y" or "Y describes X."',
          where: 'Applied in: analogy questions testing descriptive relationships.',
          conditions: [
            'Identify that one word describes a quality of the other',
            'Find answer choice with the same descriptive relationship',
            'Ensure the quality relationship matches in type',
          ],
          examples: [
            {
              question: 'LION : FEROCIOUS ::',
              solution: 'Step 1: Identify relationship: FEROCIOUS describes a quality of LION (lions are ferocious). Step 2: Find answer choice with quality relationship: A) dog : animal (category, wrong) B) honey : sweet (sweet describes honey, correct!) C) car : vehicle (category, wrong) D) book : read (function, wrong). Answer: B) honey : sweet.',
              explanation: 'Ferocious describes a quality of a lion. Sweet describes a quality of honey. Both follow the pattern "X is characterized by quality Y."',
            },
            {
              question: 'DIAMOND : HARD ::',
              solution: 'Step 1: Relationship: HARD describes a quality of DIAMOND (diamonds are hard). Step 2: Find quality relationship: A) water : wet (wet describes water, correct!) B) bird : fly (function, wrong) C) tree : plant (category, wrong) D) knife : cut (function, wrong). Answer: A) water : wet.',
              explanation: 'Hard describes a physical quality of diamond. Wet describes a physical quality of water. Both represent physical characteristics.',
            },
            {
              question: 'ROSE : FRAGRANT ::',
              solution: 'Step 1: Relationship: FRAGRANT describes a quality of ROSE (roses are fragrant). Step 2: Find quality relationship: A) lemon : sour (sour describes lemon, correct!) B) flower : plant (category, wrong) C) bird : wings (part-whole, wrong) D) car : drive (function, wrong). Answer: A) lemon : sour.',
              explanation: 'Fragrant describes a sensory quality of rose. Sour describes a sensory quality of lemon. Both represent sensory characteristics (smell/taste).',
            },
          ],
          commonMistakes: [
            'Confusing quality relationships with category or function',
            'Not matching the type of quality (physical, sensory, abstract)',
            'Choosing words that are related but don\'t show quality description',
          ],
          tips: [
            'Look for adjectives describing nouns',
            'Identify what type of quality is being described',
            'Match the quality type (physical, sensory, abstract, etc.)',
            'Test: "X is Y" should make sense (lion is ferocious, honey is sweet)',
          ],
        },
        {
          id: 'class-member',
          title: 'Class and Member Analogies',
          level: 'intermediate',
          why: 'Class-member analogies test your ability to recognize category relationships. They assess logical thinking and classification skills.',
          when: 'Use when one word is a member or example of a class/category represented by the other word. The relationship is "X is a type/kind of Y" or "Y is a category containing X."',
          where: 'Applied in: analogy questions testing classification and category relationships.',
          conditions: [
            'Identify that one word is a member of a class',
            'Find answer choice with the same class-member relationship',
            'Ensure the classification level matches',
          ],
          examples: [
            {
              question: 'APPLE : FRUIT ::',
              solution: 'Step 1: Identify relationship: APPLE is a type/member of FRUIT (apple is a fruit). Step 2: Find answer choice with class-member relationship: A) carrot : vegetable (carrot is a vegetable, correct!) B) tree : apple (reverse relationship, wrong) C) red : apple (quality, wrong) D) eat : apple (function, wrong). Answer: A) carrot : vegetable.',
              explanation: 'Apple is a member of the class "fruit." Carrot is a member of the class "vegetable." Both follow the pattern "member : class."',
            },
            {
              question: 'ROBIN : BIRD ::',
              solution: 'Step 1: Relationship: ROBIN is a type of BIRD (robin is a bird). Step 2: Find class-member relationship: A) dog : animal (dog is an animal, correct!) B) wing : bird (part-whole, wrong) C) fly : bird (function, wrong) D) bird : robin (reverse, wrong). Answer: A) dog : animal.',
              explanation: 'Robin is a member of the class "bird." Dog is a member of the class "animal." Both represent specific examples of broader categories.',
            },
            {
              question: 'NOVEL : BOOK ::',
              solution: 'Step 1: Relationship: NOVEL is a type of BOOK (novel is a book). Step 2: Find class-member relationship: A) poem : literature (poem is a type of literature, correct!) B) page : book (part-whole, wrong) C) read : book (function, wrong) D) library : book (location, wrong). Answer: A) poem : literature.',
              explanation: 'Novel is a member of the class "book." Poem is a member of the class "literature." Both represent specific types within broader categories.',
            },
          ],
          commonMistakes: [
            'Reversing the class-member relationship',
            'Confusing class-member with part-whole relationships',
            'Not matching the classification level',
          ],
          tips: [
            'Test: "X is a type of Y" should make sense',
            'Watch for reverse relationships (class : member vs. member : class)',
            'Distinguish from part-whole (wing is part of bird, not a type)',
            'Match the level of specificity',
          ],
        },
        {
          id: 'function-analogies',
          title: 'Function Analogies',
          level: 'intermediate',
          why: 'Function analogies test your understanding of what something does or its purpose. They assess logical reasoning about actions and purposes.',
          when: 'Use when one word represents the function, purpose, or action of the other. The relationship is "X is used to Y" or "Y is the function of X."',
          where: 'Applied in: analogy questions testing functional relationships.',
          conditions: [
            'Identify that one word represents a function of the other',
            'Find answer choice with the same function relationship',
            'Ensure the function relationship is clear and direct',
          ],
          examples: [
            {
              question: 'KNIFE : CUT ::',
              solution: 'Step 1: Identify relationship: CUT is the function of KNIFE (knife is used to cut). Step 2: Find answer choice with function relationship: A) pen : write (pen is used to write, correct!) B) sharp : knife (quality, wrong) C) handle : knife (part-whole, wrong) D) cut : food (object, wrong). Answer: A) pen : write.',
              explanation: 'Cut is the function of knife. Write is the function of pen. Both follow the pattern "tool/object : its function."',
            },
            {
              question: 'SCISSORS : CUT ::',
              solution: 'Step 1: Relationship: CUT is the function of SCISSORS. Step 2: Find function relationship: A) hammer : hit (hammer is used to hit, correct!) B) sharp : scissors (quality, wrong) C) paper : scissors (object, could work but not function) D) cut : paper (reverse, wrong). Answer: A) hammer : hit.',
              explanation: 'Cut is the function of scissors. Hit is the function of hammer. Both represent the primary purpose or action of the tool.',
            },
            {
              question: 'THERMOMETER : MEASURE ::',
              solution: 'Step 1: Relationship: MEASURE (temperature) is the function of THERMOMETER. Step 2: Find function relationship: A) scale : weigh (scale is used to weigh, correct!) B) hot : thermometer (quality, wrong) C) doctor : thermometer (user, wrong) D) temperature : measure (reverse, wrong). Answer: A) scale : weigh.',
              explanation: 'Measure (temperature) is the function of thermometer. Weigh is the function of scale. Both represent measuring functions of instruments.',
            },
          ],
          commonMistakes: [
            'Confusing function with user or object',
            'Reversing the function relationship',
            'Not identifying the primary function',
          ],
          tips: [
            'Test: "X is used to Y" should make sense',
            'Identify the primary or main function',
            'Distinguish from user relationships (doctor uses thermometer)',
            'Watch for reverse relationships (function : tool vs. tool : function)',
          ],
        },
        {
          id: 'manner-behavior',
          title: 'Manner/Behavior Analogies',
          level: 'intermediate',
          why: 'These analogies test understanding of how actions are performed or behaviors are characterized. They assess knowledge of adverbs, action characteristics, and behavioral patterns.',
          when: 'Use when one word describes the manner, way, or style in which an action is performed or a behavior occurs.',
          where: 'Applied in: analogy questions testing manner and behavioral relationships.',
          conditions: [
            'Identify that one word describes how an action is performed',
            'Find answer choice with the same manner relationship',
            'Ensure the manner relationship matches in type',
          ],
          examples: [
            {
              question: 'SPEAK : LOUDLY ::',
              solution: 'Step 1: Identify relationship: LOUDLY describes the manner of SPEAKING (how one speaks). Step 2: Find answer choice with manner relationship: A) walk : quickly (quickly describes how one walks, correct!) B) speak : talk (synonyms, wrong) C) loudly : voice (quality, wrong) D) hear : loudly (function, wrong). Answer: A) walk : quickly.',
              explanation: 'Loudly describes the manner of speaking. Quickly describes the manner of walking. Both follow the pattern "action : manner of performing action."',
            },
            {
              question: 'EAT : HUNGRILY ::',
              solution: 'Step 1: Relationship: HUNGRILY describes the manner of EATING. Step 2: Find manner relationship: A) sleep : soundly (soundly describes how one sleeps, correct!) B) food : eat (object, wrong) C) hungry : eat (cause, wrong) D) eat : food (object, wrong). Answer: A) sleep : soundly.',
              explanation: 'Hungrily describes the manner of eating. Soundly describes the manner of sleeping. Both represent how actions are performed.',
            },
            {
              question: 'WORK : DILIGENTLY ::',
              solution: 'Step 1: Relationship: DILIGENTLY describes the manner of WORKING. Step 2: Find manner relationship: A) study : carefully (carefully describes how one studies, correct!) B) work : job (synonym/category, wrong) C) diligent : worker (quality, wrong) D) job : work (reverse, wrong). Answer: A) study : carefully.',
              explanation: 'Diligently describes the manner of working. Carefully describes the manner of studying. Both represent the way actions are performed.',
            },
          ],
          commonMistakes: [
            'Confusing manner with quality or function',
            'Not recognizing adverb relationships',
            'Mixing up action with manner',
          ],
          tips: [
            'Look for adverbs describing actions',
            'Test: "X in a Y manner" should make sense',
            'Identify the action and how it\'s performed',
            'Match the type of manner (speed, style, intensity, etc.)',
          ],
        },
        {
          id: 'worker-workplace',
          title: 'Worker-Workplace Analogies',
          level: 'beginner',
          why: 'These analogies test your knowledge of where people work or the relationship between workers and their work environments. They assess general knowledge and logical associations.',
          when: 'Use when one word represents a worker/profession and the other represents their workplace or vice versa.',
          where: 'Applied in: analogy questions testing worker-workplace relationships.',
          conditions: [
            'Identify that one word is a worker and the other is their workplace',
            'Find answer choice with the same worker-workplace relationship',
            'Ensure the workplace matches the profession',
          ],
          examples: [
            {
              question: 'TEACHER : SCHOOL ::',
              solution: 'Step 1: Identify relationship: SCHOOL is the workplace of TEACHER (teachers work in schools). Step 2: Find answer choice with worker-workplace relationship: A) doctor : hospital (doctor works in hospital, correct!) B) student : school (not worker-workplace) C) learn : school (function, wrong) D) school : building (category, wrong). Answer: A) doctor : hospital.',
              explanation: 'School is the workplace of teacher. Hospital is the workplace of doctor. Both follow the pattern "worker : workplace."',
            },
            {
              question: 'CHEF : KITCHEN ::',
              solution: 'Step 1: Relationship: KITCHEN is the workplace of CHEF. Step 2: Find worker-workplace relationship: A) judge : courtroom (judge works in courtroom, correct!) B) cook : kitchen (synonym, not workplace) C) food : kitchen (object, wrong) D) kitchen : room (category, wrong). Answer: A) judge : courtroom.',
              explanation: 'Kitchen is the workplace of chef. Courtroom is the workplace of judge. Both represent where professionals work.',
            },
            {
              question: 'LAWYER : COURT ::',
              solution: 'Step 1: Relationship: COURT is the workplace of LAWYER. Step 2: Find worker-workplace relationship: A) pilot : cockpit (pilot works in cockpit, correct!) B) law : court (object, wrong) C) judge : lawyer (colleague, wrong) D) court : building (category, wrong). Answer: A) pilot : cockpit.',
              explanation: 'Court is the workplace of lawyer. Cockpit is the workplace of pilot. Both represent professional work environments.',
            },
          ],
          commonMistakes: [
            'Confusing worker-workplace with other relationships',
            'Not matching the specific workplace to profession',
            'Choosing related but incorrect workplace associations',
          ],
          tips: [
            'Test: "X works in Y" should make sense',
            'Know common profession-workplace pairs',
            'Distinguish from user-tool relationships',
            'Ensure the workplace is specific to that profession',
          ],
        },
        {
          id: 'intensity-analogies',
          title: 'Intensity Analogies',
          level: 'advanced',
          why: 'Intensity analogies test your understanding of degrees or levels of meaning. They assess vocabulary depth and ability to recognize subtle differences in word strength.',
          when: 'Use when one word represents a more intense or less intense version of the other. The relationship shows degrees of the same concept.',
          where: 'Applied in: analogy questions testing intensity or degree relationships.',
          conditions: [
            'Identify that words represent different intensities of the same concept',
            'Find answer choice with the same intensity relationship',
            'Match the direction of intensity (more/less intense)',
          ],
          examples: [
            {
              question: 'HAPPY : ECSTATIC ::',
              solution: 'Step 1: Identify relationship: ECSTATIC is a more intense version of HAPPY (ecstatic = very happy). Step 2: Find answer choice with intensity relationship: A) sad : depressed (depressed is more intense than sad, correct!) B) happy : sad (antonyms, wrong) C) big : small (antonyms, wrong) D) hot : warm (warm is less intense, wrong direction). Answer: A) sad : depressed.',
              explanation: 'Ecstatic is a more intense version of happy. Depressed is a more intense version of sad. Both show increasing intensity in the same direction.',
            },
            {
              question: 'WARM : HOT ::',
              solution: 'Step 1: Relationship: HOT is more intense than WARM. Step 2: Find intensity relationship: A) cool : cold (cold is more intense than cool, correct!) B) hot : warm (reverse direction, wrong) C) big : small (antonyms, wrong) D) light : dark (antonyms, wrong). Answer: A) cool : cold.',
              explanation: 'Hot is more intense than warm. Cold is more intense than cool. Both show increasing intensity in temperature.',
            },
            {
              question: 'LIKE : LOVE ::',
              solution: 'Step 1: Relationship: LOVE is more intense than LIKE. Step 2: Find intensity relationship: A) dislike : hate (hate is more intense than dislike, correct!) B) love : like (reverse, wrong) C) friend : enemy (antonyms, wrong) D) happy : sad (antonyms, wrong). Answer: A) dislike : hate.',
              explanation: 'Love is a more intense version of like. Hate is a more intense version of dislike. Both show increasing emotional intensity.',
            },
          ],
          commonMistakes: [
            'Reversing the intensity direction',
            'Confusing intensity with antonyms',
            'Not recognizing degrees of the same concept',
          ],
          tips: [
            'Identify if it\'s more or less intense',
            'Match the direction of intensity',
            'Distinguish from antonyms (hot/cold are opposites, not intensities)',
            'Look for words representing the same concept at different levels',
          ],
        },
        {
          id: 'antonym-selection',
          title: 'Antonym Selection for Given Words',
          level: 'beginner',
          why: 'Some analogy questions ask you to find the antonym (opposite) of a given word. This directly tests vocabulary knowledge.',
          when: 'Use when the question asks for the antonym of a word or when you need to identify which word is opposite in meaning.',
          where: 'Applied in: direct antonym questions and some analogy formats.',
          conditions: [
            'Identify the meaning of the given word',
            'Find the word with opposite meaning',
            'Ensure it\'s a direct, clear opposite',
          ],
          examples: [
            {
              question: 'What is the antonym of GENEROUS?',
              solution: 'Step 1: Understand GENEROUS: means giving, willing to share, unselfish. Step 2: Find opposite: words meaning selfish, unwilling to share, stingy. Step 3: Check choices: A) kind (similar, not opposite) B) selfish (opposite, correct!) C) giving (synonym, wrong) D) friendly (related but not opposite). Answer: B) selfish.',
              explanation: 'Generous means giving and unselfish. Selfish means concerned only with oneself, the direct opposite.',
            },
            {
              question: 'What is the antonym of TRANSPARENT?',
              solution: 'Step 1: Understand TRANSPARENT: means clear, see-through, obvious. Step 2: Find opposite: words meaning opaque, unclear, hidden. Step 3: Check choices: A) clear (synonym, wrong) B) obvious (synonym, wrong) C) opaque (opposite, correct!) D) visible (related but not opposite). Answer: C) opaque.',
              explanation: 'Transparent means see-through or clear. Opaque means not see-through, the direct opposite.',
            },
            {
              question: 'What is the antonym of TEMPORARY?',
              solution: 'Step 1: Understand TEMPORARY: means lasting for a short time, not permanent. Step 2: Find opposite: words meaning permanent, lasting, enduring. Step 3: Check choices: A) brief (synonym, wrong) B) permanent (opposite, correct!) C) short (synonym, wrong) D) quick (related but not opposite). Answer: B) permanent.',
              explanation: 'Temporary means not lasting, short-term. Permanent means lasting indefinitely, the direct opposite.',
            },
          ],
          commonMistakes: [
            'Choosing synonyms instead of antonyms',
            'Selecting words that are related but not true opposites',
            'Not understanding the given word\'s meaning',
          ],
          tips: [
            'Clearly understand the given word first',
            'Think of the opposite meaning',
            'Eliminate synonyms and related words',
            'Choose the clearest, most direct opposite',
          ],
        },
      ],
    },
    'critical-reading': {
      title: 'Critical Reading',
      icon: '📖',
      concepts: [
        {
          id: 'central-idea-main-theme',
          title: 'Central Idea / Main Theme Questions',
          level: 'intermediate',
          why: 'Understanding the main idea is fundamental to reading comprehension. These questions test your ability to identify what the passage is primarily about.',
          when: 'Use when asked: "What is the main idea?" "What is the primary purpose?" "What is the central theme?" "What is the passage mainly about?"',
          where: 'Applied in: reading comprehension passages where you need to identify the overall message or purpose.',
          conditions: [
            'Read the entire passage first',
            'Identify the topic (what is it about?)',
            'Identify the main point (what does it say about the topic?)',
            'Look for repeated ideas or concepts',
            'Check the first and last paragraphs for thesis statements',
          ],
          examples: [
            {
              question: 'Passage: "Climate change has become one of the most pressing issues of our time. Scientists worldwide have documented rising global temperatures, melting ice caps, and extreme weather patterns. While some debate the causes, the evidence for climate change itself is overwhelming. Governments and organizations are implementing policies to reduce carbon emissions, but many argue these efforts are insufficient. The challenge requires global cooperation and immediate action."\n\nQuestion: What is the main idea of this passage?',
              solution: 'Step 1: Read the entire passage. Step 2: Identify topic: climate change. Step 3: Identify main point: Climate change is a serious, well-documented problem requiring urgent global action. Step 4: Check answer choices: A) Scientists debate climate change causes (too narrow, focuses on one detail) B) Climate change is a serious global problem requiring urgent action (matches main idea!) C) Governments are doing enough (contradicts passage) D) Ice caps are melting (too specific, just one detail). Answer: B) Climate change is a serious global problem requiring urgent action.',
              explanation: 'The main idea encompasses the entire passage: climate change is a pressing, well-documented issue that needs immediate global action. While the passage mentions specific details (scientists, evidence, policies), the central theme is the seriousness of the problem and need for action.',
            },
            {
              question: 'Passage: "The invention of the printing press in the 15th century revolutionized information dissemination. Before Gutenberg\'s innovation, books were handwritten and extremely expensive, limiting knowledge to the wealthy and clergy. The printing press made books affordable and accessible, leading to increased literacy, the spread of new ideas, and ultimately, the Renaissance and Reformation. This technological advancement fundamentally changed society\'s relationship with information."\n\nQuestion: What is the primary purpose of this passage?',
              solution: 'Step 1: Read passage. Step 2: Topic: printing press. Step 3: Main point: The printing press revolutionized society by making information accessible. Step 4: Check choices: A) To describe Gutenberg\'s life (not the focus) B) To explain how the printing press transformed society (matches purpose!) C) To compare books before and after printing (too narrow) D) To discuss the Renaissance (only mentioned as an effect). Answer: B) To explain how the printing press transformed society.',
              explanation: 'The primary purpose is to explain the transformative impact of the printing press on society. While specific details are mentioned (Gutenberg, books, Renaissance), the overall purpose is to show how this invention changed the world.',
            },
            {
              question: 'Passage: "Exercise provides numerous physical and mental health benefits. Regular physical activity strengthens the heart, improves circulation, and helps maintain healthy weight. Mentally, exercise reduces stress, improves mood, and enhances cognitive function. Studies show that even moderate exercise, such as 30 minutes of walking daily, can significantly improve overall well-being. Despite these benefits, many people struggle to maintain regular exercise routines due to time constraints and lack of motivation."\n\nQuestion: What is the central theme of this passage?',
              solution: 'Step 1: Read passage. Step 2: Topic: exercise. Step 3: Main point: Exercise has many benefits (physical and mental) but people struggle to maintain it. Step 4: Check choices: A) Exercise is only for athletes (contradicts passage) B) The benefits and challenges of exercise (matches theme!) C) How to exercise properly (not discussed) D) Exercise causes stress (contradicts - exercise reduces stress). Answer: B) The benefits and challenges of exercise.',
              explanation: 'The central theme covers both the benefits of exercise (physical and mental health) and the challenge people face in maintaining regular exercise. This encompasses the full message of the passage.',
            },
          ],
          commonMistakes: [
            'Choosing a detail instead of the main idea',
            'Selecting an idea that\'s too narrow or too broad',
            'Confusing supporting details with the main point',
            'Not reading the entire passage before answering',
          ],
          tips: [
            'The main idea should cover the entire passage',
            'Look for the thesis statement (usually in first or last paragraph)',
            'Eliminate choices that are too specific (details) or too general',
            'Ask: "What is the passage trying to tell me overall?"',
            'The correct answer will be supported by most or all of the passage',
          ],
        },
        {
          id: 'specific-details',
          title: 'Specific Details Questions',
          level: 'beginner',
          why: 'These questions test your ability to locate and understand specific information in the passage. They assess careful reading and attention to detail.',
          when: 'Use when asked: "According to the passage..." "The passage states that..." "Which of the following is mentioned?" "The author notes that..."',
          where: 'Applied in: reading comprehension questions asking for specific facts or information from the passage.',
          conditions: [
            'Locate the relevant section in the passage',
            'Read the specific sentences carefully',
            'Match the wording or meaning to answer choices',
            'Avoid making inferences beyond what\'s stated',
          ],
          examples: [
            {
              question: 'Passage: "The Great Wall of China, built over centuries, stretches approximately 13,000 miles. Construction began in the 7th century BC and continued through various dynasties. The wall was built primarily for defense against northern invaders. Today, it stands as one of the world\'s most visited tourist attractions."\n\nQuestion: According to the passage, how long is the Great Wall of China?',
              solution: 'Step 1: Locate information about length. Step 2: Find in passage: "stretches approximately 13,000 miles." Step 3: Match to answer choices: A) 7,000 miles (not stated) B) 13,000 miles (matches passage!) C) Built in 7th century (this is when, not length) D) One of the most visited (not about length). Answer: B) 13,000 miles.',
              explanation: 'This is a direct detail question. The answer is explicitly stated in the passage: "approximately 13,000 miles." No inference is needed.',
            },
            {
              question: 'Passage: "Photosynthesis is the process by which plants convert sunlight into energy. This process requires three main components: sunlight, water, and carbon dioxide. During photosynthesis, plants produce glucose (sugar) and release oxygen as a byproduct. Without photosynthesis, life on Earth as we know it would not exist, as it produces the oxygen we breathe."\n\nQuestion: The passage states that photosynthesis requires which of the following?',
              solution: 'Step 1: Locate information about requirements. Step 2: Find in passage: "requires three main components: sunlight, water, and carbon dioxide." Step 3: Check answer choices: A) Only sunlight (incomplete) B) Sunlight, water, and carbon dioxide (matches passage!) C) Glucose and oxygen (these are products, not requirements) D) Only water (incomplete). Answer: B) Sunlight, water, and carbon dioxide.',
              explanation: 'The passage explicitly lists the three requirements: sunlight, water, and carbon dioxide. This is directly stated, not inferred.',
            },
            {
              question: 'Passage: "Marie Curie was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences. She won the Physics Prize in 1903 (shared with her husband) and the Chemistry Prize in 1911. Her research on radioactivity was groundbreaking and dangerous - she died from radiation exposure."\n\nQuestion: According to the passage, in which year did Marie Curie win the Chemistry Nobel Prize?',
              solution: 'Step 1: Locate information about Chemistry Prize. Step 2: Find in passage: "the Chemistry Prize in 1911." Step 3: Match to choices: A) 1903 (this is Physics Prize year) B) 1911 (matches passage!) C) First woman (not a year) D) Two different sciences (not a year). Answer: B) 1911.',
              explanation: 'The year is directly stated: "the Chemistry Prize in 1911." This is a straightforward detail question requiring no inference.',
            },
          ],
          commonMistakes: [
            'Making inferences instead of using stated information',
            'Confusing similar details',
            'Not locating the exact information in the passage',
            'Choosing answers that are true but not stated in the passage',
          ],
          tips: [
            'Look for the exact wording or close paraphrasing',
            'Go back to the passage to verify',
            'Don\'t use outside knowledge - only use what\'s in the passage',
            'Be careful with numbers, dates, and specific facts',
            'Eliminate choices that aren\'t mentioned in the passage',
          ],
        },
        {
          id: 'inference-questions',
          title: 'Inference-Based Questions',
          level: 'advanced',
          why: 'Inference questions test your ability to draw logical conclusions from the passage. They assess higher-order thinking and reading between the lines.',
          when: 'Use when asked: "It can be inferred that..." "The passage suggests that..." "The author implies that..." "Which of the following is most likely true?"',
          where: 'Applied in: reading comprehension questions requiring logical conclusions from stated information.',
          conditions: [
            'Base inferences only on information in the passage',
            'Look for clues and implications',
            'Draw logical conclusions, not assumptions',
            'Ensure the inference is strongly supported by the passage',
          ],
          examples: [
            {
              question: 'Passage: "John arrived at the meeting 20 minutes early, reviewed his notes three times, and had prepared a 50-slide presentation. When his turn came, he spoke confidently and answered all questions thoroughly. His colleagues were impressed by his thorough preparation."\n\nQuestion: It can be inferred that John:',
              solution: 'Step 1: Read passage for clues. Step 2: Clues: arrived early, reviewed notes multiple times, prepared extensive presentation, spoke confidently, answered thoroughly, colleagues impressed. Step 3: Inference: John is diligent, prepared, and takes his work seriously. Step 4: Check choices: A) doesn\'t care about work (contradicts evidence) B) is well-prepared and takes his work seriously (matches inference!) C) is always late (contradicts - arrived early) D) doesn\'t prepare (contradicts - extensive preparation). Answer: B) is well-prepared and takes his work seriously.',
              explanation: 'While the passage doesn\'t explicitly state that John is diligent, all the evidence (early arrival, multiple reviews, extensive preparation, thorough answers) strongly supports this inference. The conclusion is logically drawn from the details.',
            },
            {
              question: 'Passage: "The company\'s profits have declined for three consecutive quarters. Employee morale is low, and several key executives have resigned. The board of directors is meeting next week to discuss the company\'s future direction."\n\nQuestion: The passage suggests that:',
              solution: 'Step 1: Read passage for implications. Step 2: Clues: declining profits, low morale, executives resigning, board meeting about future. Step 3: Inference: The company is facing serious challenges and may be considering major changes. Step 4: Check choices: A) The company is doing well (contradicts evidence) B) The company is facing significant challenges (matches inference!) C) All employees are happy (contradicts - low morale) D) Profits are increasing (contradicts - declining). Answer: B) The company is facing significant challenges.',
              explanation: 'The combination of declining profits, low morale, executive resignations, and a board meeting about "future direction" strongly suggests the company faces serious challenges. This is a logical inference from the evidence.',
            },
            {
              question: 'Passage: "Sarah spent every weekend at the library, often staying until closing time. Her bookshelf at home contained hundreds of books, and she was always reading something new. When friends asked for book recommendations, she could suggest the perfect title for any interest."\n\nQuestion: It can be inferred that Sarah:',
              solution: 'Step 1: Read for clues. Step 2: Clues: weekends at library, stays late, hundreds of books, always reading, gives recommendations. Step 3: Inference: Sarah is an avid reader who loves books. Step 4: Check choices: A) doesn\'t like reading (contradicts all evidence) B) is an avid reader who loves books (matches inference!) C) never goes to the library (contradicts - every weekend) D) has no books (contradicts - hundreds of books). Answer: B) is an avid reader who loves books.',
              explanation: 'All the evidence (library time, book collection, constant reading, recommendations) strongly supports the inference that Sarah is an avid reader. This is a logical conclusion from the details.',
            },
          ],
          commonMistakes: [
            'Making assumptions not supported by the passage',
            'Confusing inference with stated facts',
            'Drawing conclusions that are too broad or too specific',
            'Using outside knowledge instead of passage evidence',
          ],
          tips: [
            'Base inferences only on passage information',
            'Look for patterns and implications in the details',
            'Ensure the inference is the most logical conclusion',
            'Avoid extreme conclusions unless strongly supported',
            'Test: "Does the passage strongly support this conclusion?"',
          ],
        },
        {
          id: 'meaning-in-context',
          title: 'Meaning in Context Questions',
          level: 'intermediate',
          why: 'These questions test your ability to understand how words are used in specific contexts. They assess vocabulary in context rather than dictionary definitions.',
          when: 'Use when asked: "As used in the passage, the word X most nearly means..." "In context, the word Y refers to..." "The phrase Z is used to mean..."',
          where: 'Applied in: reading comprehension questions asking for word or phrase meaning based on context.',
          conditions: [
            'Read the sentence containing the word',
            'Read surrounding sentences for context',
            'Determine meaning from how it\'s used, not dictionary definition',
            'Substitute answer choices to see which fits best',
          ],
          examples: [
            {
              question: 'Passage: "The politician\'s speech was so ambiguous that listeners couldn\'t determine his actual position on the issue. His vague statements left everyone confused."\n\nQuestion: As used in the passage, the word "ambiguous" most nearly means:',
              solution: 'Step 1: Read sentence with "ambiguous": "speech was so ambiguous that listeners couldn\'t determine his actual position." Step 2: Context clue: "vague statements left everyone confused" - this defines ambiguous. Step 3: Meaning: unclear, vague, having multiple possible meanings. Step 4: Check choices: A) clear (opposite) B) unclear or vague (matches context!) C) honest (not indicated) D) long (not about length). Answer: B) unclear or vague.',
              explanation: 'The context provides a definition: "couldn\'t determine his actual position" and "vague statements" both indicate that ambiguous means unclear or having uncertain meaning. The context, not a dictionary, provides the meaning.',
            },
            {
              question: 'Passage: "The ancient manuscript was so fragile that historians handled it with extreme care. They wore special gloves and worked under controlled conditions to preserve the delicate document."\n\nQuestion: As used in the passage, the word "fragile" most nearly means:',
              solution: 'Step 1: Read sentence: "so fragile that historians handled it with extreme care." Step 2: Context clues: "extreme care," "special gloves," "controlled conditions," "delicate." Step 3: Meaning: easily damaged, delicate, breakable. Step 4: Check choices: A) strong (opposite) B) easily damaged or delicate (matches context!) C) old (related but not the meaning) D) valuable (not indicated by context). Answer: B) easily damaged or delicate.',
              explanation: 'The context shows that fragile means easily damaged - evidenced by the extreme care, special gloves, and the word "delicate" used later. The context defines the word.',
            },
            {
              question: 'Passage: "The company\'s innovative approach to problem-solving set it apart from competitors. Their creative solutions often surprised the industry."\n\nQuestion: As used in the passage, the word "innovative" most nearly means:',
              solution: 'Step 1: Read sentence: "innovative approach to problem-solving." Step 2: Context clue: "creative solutions" - this defines innovative. Step 3: Meaning: new, creative, original. Step 4: Check choices: A) traditional (opposite) B) new and creative (matches context!) C) expensive (not indicated) D) simple (contradicts - creative solutions). Answer: B) new and creative.',
              explanation: 'The context provides "creative solutions" as a definition of innovative. The word means new and creative, as shown by how it\'s used in the passage.',
            },
          ],
          commonMistakes: [
            'Using dictionary definition instead of context',
            'Not reading surrounding sentences',
            'Choosing a meaning that fits the word but not the context',
            'Ignoring context clues that define the word',
          ],
          tips: [
            'Read the sentence with the word and surrounding sentences',
            'Look for context clues that define or explain the word',
            'Substitute each answer choice in the sentence',
            'Choose the meaning that fits the specific context',
            'Remember: context meaning may differ from dictionary meaning',
          ],
        },
        {
          id: 'authors-tone-approach',
          title: 'Author\'s Tone / Approach Questions',
          level: 'advanced',
          why: 'These questions test your ability to identify the author\'s attitude, style, and approach. They assess understanding of writing style and perspective.',
          when: 'Use when asked: "What is the author\'s tone?" "The author\'s attitude is..." "The passage is written in a _____ manner." "The author approaches the topic with..."',
          where: 'Applied in: reading comprehension questions about the author\'s style, attitude, or perspective.',
          conditions: [
            'Identify word choices that reveal attitude',
            'Notice the overall style (formal, informal, objective, subjective)',
            'Look for emotional language or neutral language',
            'Consider the purpose (inform, persuade, entertain, criticize)',
          ],
          examples: [
            {
              question: 'Passage: "The new policy, while well-intentioned, has unfortunately created more problems than it has solved. The implementation was rushed, and the consequences are now evident. It is clear that more careful planning was needed."\n\nQuestion: What is the author\'s tone in this passage?',
              solution: 'Step 1: Identify word choices: "unfortunately," "more problems," "rushed," "consequences," "clear that more careful planning was needed." Step 2: Analyze attitude: The author is critical but measured - pointing out problems, using "unfortunately" (regretful), suggesting what should have been done. Step 3: Determine tone: Critical but constructive, not angry or dismissive. Step 4: Check choices: A) enthusiastic (contradicts - points out problems) B) critical but measured (matches tone!) C) indifferent (contradicts - clearly cares) D) celebratory (contradicts - discusses problems). Answer: B) critical but measured.',
              explanation: 'The author is critical (points out problems, rushed implementation) but measured (uses "unfortunately," suggests solutions). The tone is not harsh or angry, but constructively critical.',
            },
            {
              question: 'Passage: "The discovery of this new species is absolutely fascinating! Scientists are thrilled by the unique characteristics they\'ve observed. This finding opens up exciting possibilities for further research."\n\nQuestion: The author\'s attitude toward the discovery is:',
              solution: 'Step 1: Identify word choices: "absolutely fascinating," "thrilled," "exciting possibilities." Step 2: Analyze attitude: Very positive, enthusiastic, excited. Step 3: Determine tone: Enthusiastic and positive. Step 4: Check choices: A) skeptical (contradicts - very positive) B) enthusiastic and positive (matches!) C) neutral (contradicts - uses emotional language) D) critical (contradicts - very positive). Answer: B) enthusiastic and positive.',
              explanation: 'Words like "absolutely fascinating," "thrilled," and "exciting" clearly show an enthusiastic and positive attitude. The author is clearly excited about the discovery.',
            },
            {
              question: 'Passage: "The data shows a 15% increase in sales over the previous quarter. Market analysis indicates this trend may continue. Several factors contributed to this growth, including improved marketing strategies and seasonal demand."\n\nQuestion: The passage is written in a _____ manner.',
              solution: 'Step 1: Identify style: Presents facts ("data shows," "analysis indicates"), uses neutral language, no emotional words, objective reporting. Step 2: Analyze approach: Informative, factual, objective. Step 3: Determine style: Objective and analytical. Step 4: Check choices: A) emotional (contradicts - neutral language) B) objective and analytical (matches!) C) persuasive (contradicts - just presents facts) D) humorous (contradicts - serious, factual). Answer: B) objective and analytical.',
              explanation: 'The passage presents facts and data without emotional language or attempts to persuade. It\'s written in an objective, analytical manner - simply reporting information.',
            },
          ],
          commonMistakes: [
            'Confusing the author\'s tone with the topic\'s nature',
            'Not identifying emotional vs. neutral language',
            'Missing subtle tone indicators',
            'Choosing extreme tones when the tone is moderate',
          ],
          tips: [
            'Look for emotional words (excited, disappointed, concerned)',
            'Notice if language is neutral/factual or emotional',
            'Identify the purpose (inform, persuade, criticize, praise)',
            'Consider word choice, sentence structure, and overall style',
            'Match the tone to the language used throughout',
          ],
        },
        {
          id: 'title-selection',
          title: 'Title Selection Questions',
          level: 'intermediate',
          why: 'Title questions test your understanding of the main idea and ability to summarize the passage. A good title captures the essence of the passage.',
          when: 'Use when asked: "Which of the following would be the best title?" "The passage could be titled..." "Which title best summarizes the passage?"',
          where: 'Applied in: reading comprehension questions asking you to choose an appropriate title.',
          conditions: [
            'Identify the main idea of the passage',
            'Ensure the title captures the main topic and point',
            'Avoid titles that are too broad or too narrow',
            'Choose a title that would make sense to someone who hasn\'t read the passage',
          ],
          examples: [
            {
              question: 'Passage: "Exercise provides numerous physical and mental health benefits. Regular physical activity strengthens the heart, improves circulation, and helps maintain healthy weight. Mentally, exercise reduces stress, improves mood, and enhances cognitive function. Studies show that even moderate exercise can significantly improve overall well-being."\n\nQuestion: Which of the following would be the best title for this passage?',
              solution: 'Step 1: Identify main idea: Exercise has many health benefits (physical and mental). Step 2: Evaluate titles: A) "How to Exercise" (not discussed - passage is about benefits, not methods) B) "The Health Benefits of Exercise" (matches main idea perfectly!) C) "Types of Exercise" (not discussed) D) "Exercise Equipment" (not discussed). Answer: B) "The Health Benefits of Exercise."',
              explanation: 'The passage focuses on the benefits of exercise (physical and mental health). The title should reflect this main focus. "The Health Benefits of Exercise" accurately captures what the passage is about.',
            },
            {
              question: 'Passage: "The printing press, invented by Johannes Gutenberg in the 15th century, revolutionized information dissemination. Before this innovation, books were handwritten and expensive. The printing press made books affordable and accessible, leading to increased literacy and the spread of new ideas, ultimately contributing to the Renaissance and Reformation."\n\nQuestion: The passage could be titled:',
              solution: 'Step 1: Identify main idea: The printing press revolutionized society by making information accessible. Step 2: Evaluate titles: A) "Gutenberg\'s Life" (too narrow - not about his life) B) "How the Printing Press Changed Society" (matches main idea!) C) "Books Before Printing" (too narrow - only one detail) D) "The Renaissance" (too narrow - only mentioned as an effect). Answer: B) "How the Printing Press Changed Society."',
              explanation: 'The passage focuses on how the printing press transformed society. While it mentions Gutenberg, books, and the Renaissance, the central theme is the transformative impact. The title should reflect this main idea.',
            },
            {
              question: 'Passage: "Climate change poses significant threats to global ecosystems. Rising temperatures affect weather patterns, sea levels, and biodiversity. Scientists warn that without immediate action, the consequences could be irreversible. International cooperation is essential to address this crisis."\n\nQuestion: Which title best summarizes this passage?',
              solution: 'Step 1: Identify main idea: Climate change is a serious threat requiring urgent global action. Step 2: Evaluate titles: A) "Weather Patterns" (too narrow) B) "The Urgent Need to Address Climate Change" (matches main idea!) C) "Scientists\' Warnings" (too narrow) D) "International Cooperation" (too narrow - only one aspect). Answer: B) "The Urgent Need to Address Climate Change."',
              explanation: 'The passage emphasizes the seriousness of climate change and the need for urgent action. The title should capture both the problem (climate change) and the urgency (need for action). This title best summarizes the passage\'s main message.',
            },
          ],
          commonMistakes: [
            'Choosing a title that\'s too specific (focuses on one detail)',
            'Choosing a title that\'s too general (doesn\'t capture the specific focus)',
            'Selecting a title that doesn\'t match the main idea',
            'Picking a catchy title that doesn\'t accurately represent the content',
          ],
          tips: [
            'The title should reflect the main idea, not just a detail',
            'Avoid titles that are too broad or too narrow',
            'Ensure the title would make sense to someone who hasn\'t read the passage',
            'Match the title to the passage\'s primary focus',
            'Test: Does this title accurately describe what the passage is about?',
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

