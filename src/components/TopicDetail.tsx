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

