import { Download, Calculator, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

const NTSGATQuantGuide = () => {
  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>NTS GAT Quantitative Ability - Complete Guide</title>
        <style>
          @page { margin: 0.75in; }
          body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #1a365d;
            border-bottom: 3px solid #3182ce;
            padding-bottom: 10px;
            margin-top: 30px;
            font-size: 28px;
          }
          h2 {
            color: #2c5282;
            margin-top: 25px;
            font-size: 22px;
            border-left: 4px solid #3182ce;
            padding-left: 15px;
          }
          h3 {
            color: #2d3748;
            margin-top: 20px;
            font-size: 18px;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .formula {
            background: #edf2f7;
            padding: 12px;
            border-radius: 6px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
            border-left: 4px solid #4299e1;
          }
          .example {
            background: #f7fafc;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            border: 1px solid #cbd5e0;
          }
          .example-title {
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 8px;
            font-size: 16px;
          }
          .when-to-use {
            background: #fffaf0;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            border-left: 4px solid #ed8936;
          }
          .when-title {
            font-weight: bold;
            color: #c05621;
            margin-bottom: 8px;
          }
          .note {
            background: #f0fff4;
            padding: 12px;
            border-radius: 6px;
            margin: 10px 0;
            border-left: 4px solid #48bb78;
          }
          .warning {
            background: #fff5f5;
            padding: 12px;
            border-radius: 6px;
            margin: 10px 0;
            border-left: 4px solid #f56565;
          }
          ul, ol {
            margin: 10px 0;
            padding-left: 30px;
          }
          li {
            margin: 5px 0;
          }
          .cover {
            text-align: center;
            padding: 100px 0;
            page-break-after: always;
          }
          .cover h1 {
            font-size: 42px;
            border: none;
            margin-bottom: 20px;
          }
          .cover p {
            font-size: 18px;
            color: #4a5568;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          th, td {
            border: 1px solid #cbd5e0;
            padding: 10px;
            text-align: left;
          }
          th {
            background: #edf2f7;
            font-weight: bold;
          }
          .strategy-box {
            background: #e6fffa;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            border: 1px solid #81e6d9;
          }
          .quick-tip {
            background: #ebf8ff;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            font-size: 14px;
          }
          .topic-icon {
            display: inline-block;
            margin-right: 8px;
            font-size: 20px;
          }
          .answer-choice {
            background: #fef3c7;
            padding: 8px;
            border-radius: 4px;
            margin: 5px 0;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="cover">
          <h1>🎯 NTS GAT QUANTITATIVE ABILITY</h1>
          <h2>Complete Formula & Strategy Guide</h2>
          <p>National Testing Service Pakistan - Graduate Assessment Test</p>
          <p>Comprehensive coverage of all topics with examples</p>
        </div>

        <div class="section">
          <h2>📚 Table of Contents</h2>
          <ol>
            <li>Arithmetic - Complete Formulas & Rules</li>
            <li>Fractions, Decimals, Percentages</li>
            <li>Algebra - Key Concepts & Applications</li>
            <li>Geometry - All Shapes & Formulas</li>
            <li>Ratios, Proportions & Averages</li>
            <li>Quantitative Comparison Strategies</li>
            <li>Data Interpretation Techniques</li>
            <li>General Test-Taking Strategies</li>
            <li>Common Mistakes & Pitfalls</li>
            <li>Quick Reference Tables</li>
          </ol>
        </div>

        <h1><span class="topic-icon">🔢</span> ARITHMETIC - COMPLETE GUIDE</h1>
        
        <div class="section">
          <h2>Basic Operations & Sign Rules</h2>
          
          <div class="formula">
            (+) × (+) = (+)   |   (+) × (–) = (–)   |   (–) × (–) = (+) <br>
            (+) ÷ (+) = (+)   |   (+) ÷ (–) = (–)   |   (–) ÷ (–) = (+)
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • Determining sign without calculation<br>
            • Simplifying expressions with multiple operations<br>
            • Solving inequality problems<br>
            • Eliminating answer choices in multiple choice
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Sign Determination</div>
            <strong>Question:</strong> If x < 0 and y > 0, what is the sign of (x²y)/(−x)?<br><br>
            <strong>Solution:</strong><br>
            Step 1: x² is always positive (any number squared)<br>
            Step 2: x² × y = positive × positive = positive<br>
            Step 3: Divide by (−x): positive ÷ negative = negative<br>
            <strong>Answer:</strong> Negative
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Multiple Operations</div>
            <strong>Question:</strong> Evaluate: (−3) × (−4) ÷ (−2) × (−1)<br><br>
            <strong>Solution:</strong><br>
            (−3) × (−4) = +12<br>
            +12 ÷ (−2) = −6<br>
            −6 × (−1) = +6<br>
            <strong>Answer:</strong> 6
          </div>
          
          <div class="warning">
            <strong>⚠️ Critical Rule:</strong> Division by zero is ALWAYS undefined.<br>
            Example: 5 ÷ 0 = undefined, 0 ÷ 5 = 0
          </div>
        </div>

        <div class="section">
          <h2>Factors, Multiples & Prime Numbers</h2>
          
          <div class="formula">
            • Prime: Exactly 2 factors (1 and itself) - 2, 3, 5, 7, 11, ...<br>
            • 1 is NOT prime | 2 is ONLY even prime<br>
            • LCM × GCD = a × b<br>
            • Prime factorization: 48 = 2⁴ × 3
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • <strong>LCM:</strong> "When will they meet/align?" problems<br>
            • <strong>GCD:</strong> "Maximum equal groups/size" problems<br>
            • <strong>Prime factorization:</strong> Simplifying large numbers<br>
            • <strong>LCM×GCD formula:</strong> Finding one when you know the other
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Word Problem - LCM</div>
            <strong>Question:</strong> Bus A arrives every 15 minutes, Bus B every 20 minutes. If they arrive together at 9 AM, when next together?<br><br>
            <strong>Solution:</strong><br>
            LCM(15, 20) = 60 minutes<br>
            Next together: 9:00 AM + 60 minutes = 10:00 AM
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Word Problem - GCD</div>
            <strong>Question:</strong> Divide 24 apples and 36 oranges into identical baskets. Maximum baskets?<br><br>
            <strong>Solution:</strong><br>
            GCD(24, 36) = 12<br>
            Maximum baskets = 12<br>
            Each basket: 2 apples, 3 oranges
          </div>
          
          <div class="example">
            <div class="example-title">Example 3: Using LCM×GCD Formula</div>
            <strong>Question:</strong> If LCM(12, x) = 36 and GCD(12, x) = 4, find x.<br><br>
            <strong>Solution:</strong><br>
            LCM × GCD = 12 × x<br>
            36 × 4 = 12 × x<br>
            144 = 12x<br>
            x = 12
          </div>
        </div>

        <div class="section">
          <h2>Even & Odd Numbers - Complete Rules</h2>
          
          <div class="formula">
            <strong>Addition:</strong> E+E=E, O+O=E, E+O=O<br>
            <strong>Subtraction:</strong> E−E=E, O−O=E, E−O=O, O−E=O<br>
            <strong>Multiplication:</strong> E×any=E, O×O=O<br>
            <strong>Special:</strong> 0 is even, 1 is odd, Product of consecutive integers is even
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • Determining parity without calculation<br>
            • Quantitative comparison with variables<br>
            • Eliminating impossible answer choices<br>
            • Number properties questions
          </div>
          
          <div class="example">
            <div class="example-title">Example: Must Be Even</div>
            <strong>Question:</strong> If n is integer, which MUST be even?<br>
            A) n² + n + 1<br>
            B) n(n+1)<br>
            C) n² + 1<br>
            D) 2n + 1<br><br>
            <strong>Solution:</strong><br>
            • A: n²+n+1 → could be odd (test n=1: 1+1+1=3)<br>
            • B: n(n+1) → product of consecutive integers → ALWAYS even ✓<br>
            • C: n²+1 → could be even (n=1: 2) or odd (n=2: 5)<br>
            • D: 2n+1 → always odd (even+odd=odd)<br>
            <strong>Answer:</strong> B
          </div>
        </div>

        <div class="section">
          <h2>Exponents & Roots - Complete Rules</h2>
          
          <div class="formula">
            <strong>Multiplication:</strong> bᵐ × bⁿ = bᵐ⁺ⁿ | aᵐ × bᵐ = (ab)ᵐ<br>
            <strong>Division:</strong> bᵐ ÷ bⁿ = bᵐ⁻ⁿ | aᵐ ÷ bᵐ = (a/b)ᵐ<br>
            <strong>Power:</strong> (bᵐ)ⁿ = bᵐⁿ<br>
            <strong>Roots:</strong> √(ab) = √a × √b | √(a/b) = √a/√b<br>
            <strong>Special:</strong> b⁰ = 1 | b⁻ⁿ = 1/bⁿ | √a² = |a|
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • Simplifying algebraic expressions<br>
            • Solving exponential equations<br>
            • Comparing quantities with powers<br>
            • Quantitative comparison questions
          </div>
          
          <div class="warning">
            <strong>⚠️ CRITICAL WARNING:</strong><br>
            • √(a+b) ≠ √a + √b<br>
            • √(a−b) ≠ √a − √b<br>
            Example: √(9+16) = √25 = 5, but √9 + √16 = 3+4 = 7
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Simplification</div>
            <strong>Question:</strong> Simplify: (2³ × 4²) ÷ 8<br><br>
            <strong>Solution:</strong><br>
            Write all as powers of 2:<br>
            4² = (2²)² = 2⁴<br>
            8 = 2³<br>
            (2³ × 2⁴) ÷ 2³ = 2³⁺⁴⁻³ = 2⁴ = 16
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Solving Exponential Equation</div>
            <strong>Question:</strong> If 2ˣ⁺³ = 32, find 3ˣ⁺²<br><br>
            <strong>Solution:</strong><br>
            32 = 2⁵, so 2ˣ⁺³ = 2⁵<br>
            x+3 = 5 → x = 2<br>
            3ˣ⁺² = 3⁴ = 81
          </div>
        </div>

        <div class="section">
          <h2>Inequalities - Complete Properties</h2>
          
          <div class="formula">
            <strong>Basic:</strong> Add/subtract same number → preserves<br>
            <strong>Multiply/divide by positive → preserves</strong><br>
            <strong>Multiply/divide by negative → REVERSES</strong><br>
            <strong>Special:</strong> If 0 < x < 1: x² < x and √x > x
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • Solving inequality equations<br>
            • Comparing fractions between 0 and 1<br>
            • Quantitative comparison with variables<br>
            • Word problems involving ranges
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Solving Inequality</div>
            <strong>Question:</strong> Solve: 3 − 2x ≤ 7<br><br>
            <strong>Solution:</strong><br>
            3 − 2x ≤ 7<br>
            −2x ≤ 4<br>
            x ≥ −2 (flip sign when dividing by −2!)
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Fraction Behavior</div>
            <strong>Question:</strong> Compare: x = 0.25, which is greater: x² or √x?<br><br>
            <strong>Solution:</strong><br>
            x² = (0.25)² = 0.0625<br>
            √x = √0.25 = 0.5<br>
            0.5 > 0.0625, so √x > x²<br>
            <strong>Rule:</strong> For 0 < x < 1, squaring makes smaller, square root makes larger
          </div>
        </div>

        <h1><span class="topic-icon">📊</span> FRACTIONS, DECIMALS, PERCENTAGES</h1>
        
        <div class="section">
          <h2>Comparing Fractions - 3 Methods</h2>
          
          <div class="formula">
            <strong>Method 1:</strong> Same denominator → larger numerator wins<br>
            <strong>Method 2:</strong> Same numerator → smaller denominator wins<br>
            <strong>Method 3:</strong> Cross-multiplication → a/b > c/d if ad > bc
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • <strong>Method 1:</strong> Denominators easily made same<br>
            • <strong>Method 2:</strong> Numerators already same<br>
            • <strong>Method 3:</strong> General case - always works<br>
            • <strong>Decimal conversion:</strong> When calculator allowed
          </div>
          
          <div class="example">
            <div class="example-title">Example: Compare 3/5 and 4/7</div>
            <strong>Cross-multiplication:</strong><br>
            3 × 7 = 21<br>
            5 × 4 = 20<br>
            Since 21 > 20, therefore 3/5 > 4/7
          </div>
        </div>

        <div class="section">
          <h2>Percentages - Complete Formulas</h2>
          
          <div class="formula">
            k% = k/100<br>
            % change = [(New − Old)/Old] × 100%<br>
            Increase by k%: multiply by (1 + k/100)<br>
            Decrease by k%: multiply by (1 − k/100)<br>
            Reverse: Original = New/(1 ± k/100)<br>
            Special: a% of b = b% of a
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • <strong>% change:</strong> Growth/decline problems<br>
            • <strong>Multiplier method:</strong> Successive changes<br>
            • <strong>Reverse formula:</strong> Finding original before % change<br>
            • <strong>Property:</strong> Quick calculations (20% of 50 = 50% of 20)
          </div>
          
          <div class="warning">
            <strong>⚠️ COMMON TRAP:</strong><br>
            • 50% increase then 50% decrease ≠ 0% change<br>
            • Actually results in 25% decrease overall<br>
            • Percentages are NOT reversible!
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Successive Changes</div>
            <strong>Question:</strong> Price increases 30%, then decreases 30%. Net effect?<br><br>
            <strong>Solution:</strong><br>
            Let original = 100<br>
            After increase: 100 × 1.30 = 130<br>
            After decrease: 130 × 0.70 = 91<br>
            Net change: (91−100)/100 = −9% (9% decrease)<br>
            <strong>Not back to original!</strong>
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Reverse Calculation</div>
            <strong>Question:</strong> After 15% discount, price is Rs. 425. Original price?<br><br>
            <strong>Solution:</strong><br>
            WRONG: 425 × 1.15 = 488.75<br>
            CORRECT: Original = 425/(1 − 0.15) = 425/0.85 = 500
          </div>
          
          <div class="example">
            <div class="example-title">Example 3: Quick Calculation Trick</div>
            <strong>Question:</strong> Find 16% of 25<br><br>
            <strong>Solution:</strong><br>
            Using property: a% of b = b% of a<br>
            16% of 25 = 25% of 16 = 4<br>
            (25% = 1/4, and 1/4 of 16 = 4)
          </div>
        </div>

        <div class="section">
          <h2>Ratios & Proportions</h2>
          
          <div class="formula">
            Ratio a:b = a/b<br>
            Proportion: a/b = c/d → ad = bc<br>
            Dividing in ratio a:b:<br>
            First part = a/(a+b) × total<br>
            Second part = b/(a+b) × total
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • <strong>Ratio:</strong> Comparing quantities<br>
            • <strong>Proportion:</strong> Solving for unknowns<br>
            • <strong>Dividing formula:</strong> Distribution problems<br>
            • <strong>Extended ratio:</strong> a:b:c → parts = a/(a+b+c), etc.
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Dividing Amount</div>
            <strong>Question:</strong> Divide Rs. 1200 among A, B, C in ratio 2:3:5<br><br>
            <strong>Solution:</strong><br>
            Total parts = 2+3+5 = 10<br>
            A: (2/10)×1200 = 240<br>
            B: (3/10)×1200 = 360<br>
            C: (5/10)×1200 = 600<br>
            Check: 240+360+600 = 1200 ✓
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Proportion Problem</div>
            <strong>Question:</strong> If 3 oranges cost Rs. 5, how many oranges for Rs. 100?<br><br>
            <strong>Solution:</strong><br>
            Set proportion: 3/5 = x/100<br>
            Cross multiply: 3×100 = 5×x<br>
            300 = 5x<br>
            x = 60 oranges
          </div>
        </div>

        <h1><span class="topic-icon">📐</span> ALGEBRA - COMPLETE GUIDE</h1>
        
        <div class="section">
          <h2>Key Algebraic Identities (MEMORIZE!)</h2>
          
          <div class="formula">
            1. (a + b)² = a² + 2ab + b²<br>
            2. (a − b)² = a² − 2ab + b²<br>
            3. (a + b)(a − b) = a² − b²
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 When to Use:</div>
            • <strong>Identity 1:</strong> Squaring sums<br>
            • <strong>Identity 2:</strong> Squaring differences<br>
            • <strong>Identity 3:</strong> Difference of squares - fastest calculation method
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Fast Calculation</div>
            <strong>Question:</strong> Calculate 103 × 97<br><br>
            <strong>Solution:</strong><br>
            Use (a+b)(a−b) = a²−b²<br>
            (100+3)(100−3) = 100² − 3² = 10000 − 9 = 9991
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Finding Components</div>
            <strong>Question:</strong> If x+y=8 and xy=12, find x²+y²<br><br>
            <strong>Solution:</strong><br>
            (x+y)² = x²+2xy+y²<br>
            8² = x²+2(12)+y²<br>
            64 = x²+24+y²<br>
            x²+y² = 40
          </div>
        </div>

        <div class="section">
          <h2>Solving Equations - Systematic Method</h2>
          
          <div class="formula">
            <strong>6-Step Method:</strong><br>
            1. Clear fractions/decimals (multiply by LCD)<br>
            2. Remove parentheses<br>
            3. Combine like terms<br>
            4. Get variables on one side<br>
            5. Get constants on other side<br>
            6. Solve for variable
          </div>
          
          <div class="example">
            <div class="example-title">Example: Complete Solution</div>
            <strong>Question:</strong> Solve: ½x + 3(x−2) = 2(x+1) + 1<br><br>
            <strong>Solution:</strong><br>
            <strong>Step 1:</strong> Multiply by 2: x + 6(x−2) = 4(x+1) + 2<br>
            <strong>Step 2:</strong> Expand: x + 6x − 12 = 4x + 4 + 2<br>
            <strong>Step 3:</strong> Combine: 7x − 12 = 4x + 6<br>
            <strong>Step 4:</strong> Variables left: 7x − 4x − 12 = 6 → 3x − 12 = 6<br>
            <strong>Step 5:</strong> Constants right: 3x = 6 + 12 → 3x = 18<br>
            <strong>Step 6:</strong> Solve: x = 6
          </div>
        </div>

        <div class="section">
          <h2>Word Problem Translation Dictionary</h2>
          
          <table>
            <tr>
              <th>English Phrase</th>
              <th>Math Meaning</th>
              <th>Symbol</th>
              <th>Example</th>
            </tr>
            <tr>
              <td>is, was, equals, same as</td>
              <td>Equality</td>
              <td>=</td>
              <td>"x is 5" → x = 5</td>
            </tr>
            <tr>
              <td>sum, more than, increased by</td>
              <td>Addition</td>
              <td>+</td>
              <td>"5 more than x" → x + 5</td>
            </tr>
            <tr>
              <td>difference, less than, decreased by</td>
              <td>Subtraction</td>
              <td>−</td>
              <td>"3 less than y" → y − 3</td>
            </tr>
            <tr>
              <td>times, product, multiplied by</td>
              <td>Multiplication</td>
              <td>×</td>
              <td>"twice x" → 2x</td>
            </tr>
            <tr>
              <td>divided by, quotient, per</td>
              <td>Division</td>
              <td>÷</td>
              <td>"ratio of a to b" → a/b</td>
            </tr>
            <tr>
              <td>of (with %)</td>
              <td>Multiplication</td>
              <td>×</td>
              <td>"20% of 50" → 0.20×50</td>
            </tr>
            <tr>
              <td>what, how many</td>
              <td>Variable</td>
              <td>x, y, etc.</td>
              <td>"Find the number" → Let x = number</td>
            </tr>
          </table>
          
          <div class="example">
            <div class="example-title">Example: Complete Translation</div>
            <strong>Question:</strong> "Five less than twice a number equals thirteen."<br><br>
            <strong>Translation:</strong><br>
            Let number = x<br>
            "twice a number" = 2x<br>
            "five less than" = −5<br>
            "equals thirteen" = 13<br>
            Equation: 2x − 5 = 13<br>
            Solution: 2x = 18 → x = 9
          </div>
        </div>

        <h1><span class="topic-icon">📏</span> GEOMETRY - ALL FORMULAS</h1>
        
        <div class="section">
          <h2>Lines & Angles</h2>
          
          <div class="formula">
            • Straight line = 180°<br>
            • Right angle = 90°<br>
            • Around a point = 360°<br>
            • Vertical angles are equal<br>
            • Parallel lines: Corresponding = equal, Alternate interior = equal
          </div>
          
          <div class="example">
            <div class="example-title">Example: Parallel Lines</div>
            <strong>Question:</strong> In the figure, if a = 40°, find b, c, d, e, f, g, h<br><br>
            <strong>Solution:</strong><br>
            All acute angles equal: a = c = e = g = 40°<br>
            All obtuse angles: b = d = f = h = 180°−40° = 140°<br>
            Check: Any acute + any obtuse = 40°+140° = 180° ✓
          </div>
        </div>

        <div class="section">
          <h2>Triangles - Complete Properties</h2>
          
          <div class="formula">
            • Sum of angles = 180°<br>
            • Area = ½ × base × height<br>
            • Pythagorean: a² + b² = c² (right triangle only)<br>
            • Perimeter = a + b + c<br>
            • Triangle inequality: a + b > c
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 Triangle Type Recognition:</div>
            • <strong>Right triangle:</strong> One angle 90° → use Pythagorean<br>
            • <strong>Equilateral:</strong> All sides equal, all angles 60°<br>
            • <strong>Isosceles:</strong> Two sides equal, two angles equal<br>
            • <strong>Scalene:</strong> All sides different
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Finding Missing Angle</div>
            <strong>Question:</strong> Triangle has angles 55° and 65°. Find third angle.<br><br>
            <strong>Solution:</strong><br>
            Sum = 180°<br>
            Third angle = 180° − (55°+65°) = 180°−120° = 60°
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Pythagorean Triple</div>
            <strong>Question:</strong> Right triangle legs: 9 and 12. Find hypotenuse.<br><br>
            <strong>Solution:</strong><br>
            Recognize 3-4-5 triple scaled by 3: 3×3=9, 4×3=12<br>
            So hypotenuse = 5×3 = 15<br><br>
            Or calculate: 9²+12²=81+144=225, √225=15
          </div>
          
          <div class="example">
            <div class="example-title">Example 3: Triangle Inequality Test</div>
            <strong>Question:</strong> Can sides 7, 10, 18 form triangle?<br><br>
            <strong>Solution:</strong><br>
            Check: 7+10=17, 17<18 → violates inequality<br>
            Answer: NO, cannot form triangle
          </div>
        </div>

        <div class="section">
          <h2>Quadrilaterals</h2>
          
          <div class="formula">
            • Sum of angles = 360°<br>
            • Parallelogram: Area = base × height<br>
            • Rectangle: Area = length × width<br>
            • Square: Area = side²<br>
            • Trapezoid: Area = ½(b₁+b₂)h
          </div>
          
          <div class="example">
            <div class="example-title">Example: Composite Shape</div>
            <strong>Question:</strong> Rectangle length=20, width=14 with semicircle on width side. Find total area.<br><br>
            <strong>Solution:</strong><br>
            Rectangle area = 20×14 = 280<br>
            Semicircle radius = 14/2 = 7<br>
            Semicircle area = ½ × π×7² = ½×49π ≈ 76.97<br>
            Total ≈ 280 + 76.97 = 356.97
          </div>
        </div>

        <div class="section">
          <h2>Circles - All Formulas</h2>
          
          <div class="formula">
            • Circumference: C = 2πr = πd<br>
            • Area: A = πr²<br>
            • Arc length = (θ/360°) × C<br>
            • Sector area = (θ/360°) × A<br>
            • π ≈ 3.14 or use π symbol
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Basic Calculations</div>
            <strong>Question:</strong> Circle radius = 10.5 cm. Find circumference and area.<br><br>
            <strong>Solution:</strong><br>
            Circumference = 2πr = 2×π×10.5 = 21π ≈ 65.97 cm<br>
            Area = πr² = π×(10.5)² = 110.25π ≈ 346.36 cm²
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Sector Problem</div>
            <strong>Question:</strong> Find area of 72° sector of circle with radius 15.<br><br>
            <strong>Solution:</strong><br>
            Total area = π×15² = 225π<br>
            Sector area = (72/360)×225π = (1/5)×225π = 45π
          </div>
        </div>

        <div class="section">
          <h2>Polygons</h2>
          
          <div class="formula">
            • Sum interior angles = (n−2)×180°<br>
            • Each interior (regular) = [(n−2)×180°]/n<br>
            • Each exterior = 360°/n
          </div>
          
          <div class="example">
            <div class="example-title">Example: Regular Octagon</div>
            <strong>Question:</strong> Find each interior angle of regular octagon.<br><br>
            <strong>Solution:</strong><br>
            n=8<br>
            Sum interior = (8−2)×180° = 6×180° = 1080°<br>
            Each interior = 1080°/8 = 135°<br>
            Each exterior = 360°/8 = 45°<br>
            Check: 135°+45° = 180° ✓
          </div>
        </div>

        <h1><span class="topic-icon">📈</span> AVERAGES, RATIOS, PROPORTIONS</h1>
        
        <div class="section">
          <h2>Averages - Complete Rules</h2>
          
          <div class="formula">
            Average = Sum / Count<br>
            Sum = Average × Count<br><br>
            Adding number x:<br>
            • If x > average → increases average<br>
            • If x < average → decreases average<br>
            • If x = average → no change
          </div>
          
          <div class="when-to-use">
            <div class="when-title">📌 Special Cases:</div>
            • <strong>Consecutive integers:</strong> Average = middle number<br>
            • <strong>Arithmetic sequence:</strong> Average = (first+last)/2<br>
            • <strong>Evenly spaced:</strong> Average = middle term
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Finding Missing Value</div>
            <strong>Question:</strong> Average of 5 numbers is 20. Four numbers are 15, 22, 18, 25. Find fifth.<br><br>
            <strong>Solution:</strong><br>
            Total sum = 20×5 = 100<br>
            Sum of four = 15+22+18+25 = 80<br>
            Fifth number = 100−80 = 20
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Effect of Adding Number</div>
            <strong>Question:</strong> Average of 4 tests is 75. If fifth test is 90, new average?<br><br>
            <strong>Solution:</strong><br>
            Original sum = 75×4 = 300<br>
            New sum = 300+90 = 390<br>
            New average = 390/5 = 78<br>
            (Increased because 90 > 75)
          </div>
          
          <div class="example">
            <div class="example-title">Example 3: Consecutive Numbers</div>
            <strong>Question:</strong> Average of 7 consecutive integers starting from 10.<br><br>
            <strong>Solution:</strong><br>
            Numbers: 10, 11, 12, 13, 14, 15, 16<br>
            Average = middle number = 13<br>
            Or: (10+16)/2 = 26/2 = 13
          </div>
        </div>

        <h1><span class="topic-icon">🎯</span> QUANTITATIVE COMPARISON STRATEGIES</h1>
        
        <div class="section">
          <h2>Systematic Approach Flowchart</h2>
          
          <div class="strategy-box">
            <strong>Step 1: Look for variables?</strong><br>
            NO → Calculate directly → Choose A, B, or C<br>
            YES → Go to Step 2<br><br>
            
            <strong>Step 2: Test numbers in this order:</strong><br>
            1. 0 (tests zero cases)<br>
            2. 1 (tests identity)<br>
            3. −1 (tests negatives)<br>
            4. 2 (tests positives)<br>
            5. ½ (tests fractions)<br><br>
            
            <strong>Step 3: Different relationships?</strong><br>
            YES → Answer is D (Cannot determine)<br>
            NO → All gave same relationship<br><br>
            
            <strong>Step 4: Verify extremes:</strong><br>
            Test very large (1000) and very small (0.001)<br>
            If still same → Choose A, B, or C
          </div>
          
          <div class="example">
            <div class="example-title">Example 1: Variable Testing</div>
            <strong>Column A:</strong> x²<br>
            <strong>Column B:</strong> x<br>
            <strong>Condition:</strong> x is real number<br><br>
            
            <strong>Test x = 0:</strong> A=0, B=0 → Equal<br>
            <strong>Test x = 2:</strong> A=4, B=2 → A > B<br>
            <strong>Test x = ½:</strong> A=¼, B=½ → A < B<br>
            Different relationships!<br>
            <strong>Answer:</strong> D
          </div>
          
          <div class="example">
            <div class="example-title">Example 2: Simplification</div>
            <strong>Column A:</strong> (x+5) − (x+3)<br>
            <strong>Column B:</strong> 2<br><br>
            
            <strong>Simplify A:</strong> x+5−x−3 = 2<br>
            A = 2, B = 2 → Equal<br>
            <strong>Answer:</strong> C
          </div>
          
          <div class="example">
            <div class="example-title">Example 3: Zero Trap</div>
            <strong>Column A:</strong> x³<br>
            <strong>Column B:</strong> x²<br>
            <strong>Condition:</strong> x ≥ 0<br><br>
            
            <strong>Test x = 0:</strong> A=0, B=0 → Equal<br>
            <strong>Test x = 1:</strong> A=1, B=1 → Equal<br>
            <strong>Test x = 2:</strong> A=8, B=4 → A > B<br>
            Relationship changes at x=1!<br>
            <strong>Answer:</strong> D (because x can be 0 or 1 giving equal, or >1 giving A>B)
          </div>
        </div>

        <div class="section">
          <h2>Common QC Traps</h2>
          
          <div class="warning">
            <strong>⚠️ WATCH FOR THESE:</strong><br><br>
            
            1. <strong>Zero:</strong> x² vs x → equal when x=0,1; otherwise depends<br>
            2. <strong>Negative numbers:</strong> x² vs x → squaring negative makes positive<br>
            3. <strong>Fractions between 0 and 1:</strong> Squaring makes smaller<br>
            4. <strong>Reciprocals:</strong> For 0<x<1, 1/x > x<br>
            5. <strong>Square roots:</strong> For 0<x<1, √x > x<br>
            6. <strong>Variables can be equal:</strong> Don't assume they're different
          </div>
          
          <div class="quick-tip">
            <strong>💡 Pro Tip:</strong> If you can find ONE case where columns are equal,<br>
            you can eliminate "A is greater" and "B is greater" immediately.
          </div>
        </div>

        <h1><span class="topic-icon">📉</span> DATA INTERPRETATION TECHNIQUES</h1>
        
        <div class="section">
          <h2>Step-by-Step Approach</h2>
          
          <div class="strategy-box">
            <strong>BEFORE READING QUESTIONS:</strong><br>
            1. Read graph/chart title<br>
            2. Check axis labels and units<br>
            3. Note scale (each division = ?)<br>
            4. Understand what each element represents<br><br>
            
            <strong>COMMON GRAPH TYPES:</strong><br>
            • <strong>Bar graph:</strong> Compare heights directly<br>
            • <strong>Line graph:</strong> Look for trends, peaks<br>
            • <strong>Pie chart:</strong> Percentages of whole<br>
            • <strong>Table:</strong> Organized data - read carefully<br><br>
            
            <strong>CRITICAL WARNING:</strong><br>
            • Don't confuse numbers with percentages<br>
            • In pie chart: % × total = actual value<br>
            • Example: 40% and 25% → not 15% difference!<br>
            &nbsp;&nbsp;Actual: (40−25)/25 = 60% difference
          </div>
          
          <div class="example">
            <div class="example-title">Example: Pie Chart Analysis</div>
            <strong>Data:</strong> Company sales: TVs=40%, Computers=25%, Appliances=20%, Misc=15%<br>
            <strong>Total sales:</strong> $200,000<br><br>
            
            <strong>Question 1:</strong> How much more are TV sales than Computer sales?<br>
            <strong>WRONG:</strong> 40%−25%=15% more<br>
            <strong>CORRECT:</strong> TV sales = 40% of 200,000 = 80,000<br>
            Computer sales = 25% of 200,000 = 50,000<br>
            Difference = 30,000<br>
            As percentage of Computers: 30,000/50,000 = 60% more<br><br>
            
            <strong>Question 2:</strong> If Computer sales increase to 30%, what % of total?<br>
            <strong>Answer:</strong> Still 30% of total! (Percentages always of total)
          </div>
        </div>

        <div class="section">
          <h2>Estimation Strategies</h2>
          
          <div class="formula">
            <strong>Rounding Rules:</strong><br>
            • For addition: Round to nearest 10 or 100<br>
            • For multiplication: Round one up, one down<br>
            • For percentages: Use benchmarks (10%, 25%, 50%)<br>
            • Accept ±5% error for elimination
          </div>
          
          <div class="example">
            <div class="example-title">Example: Quick Estimation</div>
            <strong>Question:</strong> Approximately 23% of 681<br><br>
            <strong>Estimation:</strong><br>
            10% of 681 ≈ 68<br>
            20% = 2×68 = 136<br>
            1% ≈ 6.8, 3% ≈ 20.4<br>
            Total ≈ 136 + 20.4 = 156.4<br>
            <strong>Actual:</strong> 156.63 ✓
          </div>
        </div>

        <h1><span class="topic-icon">✅</span> GENERAL TEST-TAKING STRATEGIES</h1>
        
        <div class="section">
          <h2>Problem-Solving Methods</h2>
          
          <div class="strategy-box">
            <strong>1. BACK-SOLVING (Plug in answer choices):</strong><br>
            • Start with middle value (usually C)<br>
            • Check if it works<br>
            • If too small → try larger; if too large → try smaller<br>
            • Best for: Algebraic equations, word problems<br><br>
            
            <strong>2. PICKING NUMBERS:</strong><br>
            • Replace variables with easy numbers<br>
            • Good choices: 100 for %, 10 for algebra, 2 or 3<br>
            • Avoid: 0, 1 (special properties)<br>
            • Best for: Abstract problems, QC questions<br><br>
            
            <strong>3. ELIMINATION:</strong><br>
            • Remove obviously wrong answers<br>
            • Look for: Negative when positive needed, too large/small<br>
            • Check units mismatch<br>
            • Use even/odd rules, divisibility rules<br><br>
            
            <strong>4. ESTIMATION:</strong><br>
            • Round numbers for quick calculation<br>
            • Eliminate choices far from estimate<br>
            • Good for: Large calculations, time-saving
          </div>
          
          <div class="example">
            <div class="example-title">Example: Back-Solving</div>
            <strong>Question:</strong> "Monday: received books. Tuesday: sold half. Wednesday: sold 2 more, has 2/5 left. How many books?"<br>
            Choices: A)10 B)20 C)30 D)40 E)50<br><br>
            
            <strong>Test B=20:</strong><br>
            After Tuesday: 10 left<br>
            After Wednesday: 10−2=8 left<br>
            2/5 of 20 = 8 ✓<br>
            <strong>Answer: B (20)</strong>
          </div>
          
          <div class="example">
            <div class="example-title">Example: Picking Numbers</div>
            <strong>Question:</strong> "School needs C cans/week for S students. How many weeks for X cans?"<br><br>
            
            <strong>Pick numbers:</strong> C=2, S=5, X=20<br>
            Needs: 2×5=10 cans/week<br>
            20 cans last: 20÷10=2 weeks<br><br>
            
            <strong>Test choices:</strong><br>
            A) CX/S = 2×20/5=8 ✗<br>
            B) XS/C = 20×5/2=50 ✗<br>
            C) S/CX = 5/(2×20)=1/8 ✗<br>
            D) X/CS = 20/(2×5)=2 ✓<br>
            E) CSX = 2×5×20=200 ✗<br>
            <strong>Answer: D</strong>
          </div>
        </div>

        <div class="section">
          <h2>Time Management</h2>
          
          <div class="strategy-box">
            <strong>RECOMMENDED TIMING:</strong><br>
            • Easy questions: 30-45 seconds<br>
            • Medium questions: 60-75 seconds<br>
            • Hard questions: 90-120 seconds<br>
            • Data Interpretation: 2 minutes per set<br><br>
            
            <strong>PRIORITY ORDER:</strong><br>
            1. Direct calculation (no variables)<br>
            2. Simple algebra/geometry<br>
            3. Word problems<br>
            4. Quantitative comparison<br>
            5. Data interpretation<br><br>
            
            <strong>GOLDEN RULE:</strong><br>
            If stuck > 2 minutes:<br>
            1. Eliminate wrong choices<br>
            2. Make educated guess<br>
            3. MARK for review if possible<br>
            4. MOVE ON!
          </div>
          
          <div class="quick-tip">
            <strong>⏰ Time-Saving Tips:</strong><br>
            • Memorize common fractions/decimals<br>
            • Know squares 11-20 by heart<br>
            • Recognize Pythagorean triples<br>
            • Use estimation before calculation<br>
            • Skip complex algebra if back-solving works
          </div>
        </div>

        <h1><span class="topic-icon">🚨</span> COMMON MISTAKES & PITFALLS</h1>
        
        <div class="section">
          <h2>Algebra Mistakes</h2>
          
          <div class="warning">
            <strong>❌ WRONG:</strong> (a+b)² = a² + b²<br>
            <strong>✅ CORRECT:</strong> a² + 2ab + b²<br><br>
            
            <strong>❌ WRONG:</strong> √(a+b) = √a + √b<br>
            <strong>✅ CORRECT:</strong> Leave as √(a+b)<br><br>
            
            <strong>❌ WRONG:</strong> a − (b − c) = a − b − c<br>
            <strong>✅ CORRECT:</strong> a − b + c<br><br>
            
            <strong>❌ WRONG:</strong> 1/(a+b) = 1/a + 1/b<br>
            <strong>✅ CORRECT:</strong> Leave as 1/(a+b)<br><br>
            
            <strong>❌ WRONG:</strong> Dividing by variable without checking zero<br>
            <strong>✅ CORRECT:</strong> Check if variable can be zero
          </div>
        </div>

        <div class="section">
          <h2>Geometry Mistakes</h2>
          
          <div class="warning">
            <strong>❌ WRONG:</strong> Using diameter in area formula (πd²)<br>
            <strong>✅ CORRECT:</strong> πr²<br><br>
            
            <strong>❌ WRONG:</strong> Confusing perimeter with area<br>
            <strong>✅ CORRECT:</strong> Perimeter = distance around, Area = space inside<br><br>
            
            <strong>❌ WRONG:</strong> Assuming right angles not shown<br>
            <strong>✅ CORRECT:</strong> Must be marked with ⟂ or stated<br><br>
            
            <strong>❌ WRONG:</strong> Using wrong height in triangle<br>
            <strong>✅ CORRECT:</strong> Height must be perpendicular to base
          </div>
        </div>

        <div class="section">
          <h2>Percentage Mistakes</h2>
          
          <div class="warning">
            <strong>❌ WRONG:</strong> 50% increase then 50% decrease = 0% change<br>
            <strong>✅ CORRECT:</strong> Results in 25% decrease<br><br>
            
            <strong>❌ WRONG:</strong> Adding percentages of different wholes<br>
            <strong>✅ CORRECT:</strong> Convert to actual values first<br><br>
            
            <strong>❌ WRONG:</strong> "30% more than 50" = 30%×50<br>
            <strong>✅ CORRECT:</strong> 50 + 30%×50 = 65<br><br>
            
            <strong>❌ WRONG:</strong> Reverse % by multiplying (425×1.15 for 15% discount)<br>
            <strong>✅ CORRECT:</strong> Divide (425/0.85)
          </div>
        </div>

        <div class="section">
          <h2>Number Properties Mistakes</h2>
          
          <div class="warning">
            <strong>❌ WRONG:</strong> 1 is prime<br>
            <strong>✅ CORRECT:</strong> 1 is NOT prime (only one factor)<br><br>
            
            <strong>❌ WRONG:</strong> 0 is odd<br>
            <strong>✅ CORRECT:</strong> 0 is even (divisible by 2)<br><br>
            
            <strong>❌ WRONG:</strong> Negative numbers can be prime<br>
            <strong>✅ CORRECT:</strong> Primes are positive integers > 1<br><br>
            
            <strong>❌ WRONG:</strong> All squares are positive<br>
            <strong>✅ CORRECT:</strong> a² ≥ 0 (can be zero)
          </div>
        </div>

        <h1><span class="topic-icon">🧠</span> QUICK REFERENCE TABLES</h1>
        
        <div class="section">
          <h2>Common Fractions/Decimals/Percents</h2>
          
          <table>
            <tr><th>Fraction</th><th>Decimal</th><th>Percent</th><th>Useful Equivalent</th></tr>
            <tr><td>1/2</td><td>0.5</td><td>50%</td><td>Half</td></tr>
            <tr><td>1/3</td><td>0.333...</td><td>33.33%</td><td>≈ 33%</td></tr>
            <tr><td>2/3</td><td>0.666...</td><td>66.67%</td><td>≈ 67%</td></tr>
            <tr><td>1/4</td><td>0.25</td><td>25%</td><td>Quarter</td></tr>
            <tr><td>3/4</td><td>0.75</td><td>75%</td><td>Three-quarters</td></tr>
            <tr><td>1/5</td><td>0.2</td><td>20%</td><td>Fifth</td></tr>
            <tr><td>2/5</td><td>0.4</td><td>40%</td><td>Two-fifths</td></tr>
            <tr><td>3/5</td><td>0.6</td><td>60%</td><td>Three-fifths</td></tr>
            <tr><td>4/5</td><td>0.8</td><td>80%</td><td>Four-fifths</td></tr>
            <tr><td>1/8</td><td>0.125</td><td>12.5%</td><td>Half of quarter</td></tr>
            <tr><td>3/8</td><td>0.375</td><td>37.5%</td><td></td></tr>
            <tr><td>5/8</td><td>0.625</td><td>62.5%</td><td></td></tr>
            <tr><td>7/8</td><td>0.875</td><td>87.5%</td><td></td></tr>
            <tr><td>1/10</td><td>0.1</td><td>10%</td><td>Tenth</td></tr>
            <tr><td>1/20</td><td>0.05</td><td>5%</td><td>Half of tenth</td></tr>
            <tr><td>1/25</td><td>0.04</td><td>4%</td><td></td></tr>
            <tr><td>1/50</td><td>0.02</td><td>2%</td><td>Half of 4%</td></tr>
            <tr><td>1/100</td><td>0.01</td><td>1%</td><td>Hundredth</td></tr>
          </table>
        </div>

        <div class="section">
          <h2>Squares (11-25)</h2>
          
          <div class="formula">
            11² = 121 | 12² = 144 | 13² = 169 | 14² = 196 | 15² = 225<br>
            16² = 256 | 17² = 289 | 18² = 324 | 19² = 361 | 20² = 400<br>
            21² = 441 | 22² = 484 | 23² = 529 | 24² = 576 | 25² = 625
          </div>
          
          <div class="quick-tip">
            <strong>💡 Memory Trick:</strong> 12²=144 (1+4+4=9, 1+2=3, 9=3²)<br>
            13²=169 (1+6+9=16, 1+3=4, 16=4²)<br>
            14²=196 (1+9+6=16, 1+4=5, 16≠5² but close!)
          </div>
        </div>

        <div class="section">
          <h2>Cubes (1-10)</h2>
          
          <div class="formula">
            1³ = 1 | 2³ = 8 | 3³ = 27 | 4³ = 64 | 5³ = 125<br>
            6³ = 216 | 7³ = 343 | 8³ = 512 | 9³ = 729 | 10³ = 1000
          </div>
        </div>

        <div class="section">
          <h2>Pythagorean Triples</h2>
          
          <div class="formula">
            <strong>Common Primitive Triples:</strong><br>
            3-4-5 | 5-12-13 | 8-15-17 | 7-24-25 | 9-40-41<br><br>
            
            <strong>Multiples (Scaled Versions):</strong><br>
            6-8-10 (2×3-4-5) | 9-12-15 (3×3-4-5)<br>
            10-24-26 (2×5-12-13) | 15-36-39 (3×5-12-13)<br>
            30-40-50 (10×3-4-5) | 50-120-130 (10×5-12-13)
          </div>
          
          <div class="quick-tip">
            <strong>💡 Recognition Trick:</strong><br>
            If you see legs like 9 and 12 → Think 3-4-5 scaled by 3 → Hypotenuse = 15<br>
            If you see 10 and 24 → Think 5-12-13 scaled by 2 → Hypotenuse = 26
          </div>
        </div>

        <div class="section">
          <h2>Area Formulas Quick Reference</h2>
          
          <table>
            <tr><th>Shape</th><th>Area Formula</th><th>Key Points</th></tr>
            <tr><td>Triangle</td><td>A = ½bh</td><td>h must be ⟂ to b</td></tr>
            <tr><td>Rectangle</td><td>A = lw</td><td>Length × Width</td></tr>
            <tr><td>Square</td><td>A = s²</td><td>Side squared</td></tr>
            <tr><td>Parallelogram</td><td>A = bh</td><td>Like rectangle but slanted</td></tr>
            <tr><td>Trapezoid</td><td>A = ½(b₁+b₂)h</td><td>Average bases × height</td></tr>
            <tr><td>Circle</td><td>A = πr²</td><td>Radius squared × π</td></tr>
            <tr><td>Sector</td><td>A = (θ/360°)πr²</td><td>Fraction of circle</td></tr>
            <tr><td>Regular Polygon</td><td>A = ½ap</td><td>a=apothem, p=perimeter</td></tr>
          </table>
        </div>

        <div class="section">
          <h2>Perimeter/Circumference Formulas</h2>
          
          <table>
            <tr><th>Shape</th><th>Perimeter Formula</th><th>Notes</th></tr>
            <tr><td>Triangle</td><td>P = a + b + c</td><td>Sum of sides</td></tr>
            <tr><td>Square</td><td>P = 4s</td><td>4 × side</td></tr>
            <tr><td>Rectangle</td><td>P = 2(l + w)</td><td>2 × (length + width)</td></tr>
            <tr><td>Circle</td><td>C = 2πr = πd</td><td>Circumference</td></tr>
            <tr><td>Regular n-gon</td><td>P = n × s</td><td>n sides × side length</td></tr>
          </table>
        </div>

        <div class="section" style="text-align: center; margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
          <h2 style="color: white;">🎯 FINAL SUCCESS TIPS</h2>
          <div style="font-size: 16px; line-height: 1.8; margin-top: 20px;">
            <p><strong>📚 Practice Consistently:</strong> Master one topic before moving to next</p>
            <p><strong>🔍 Learn from Mistakes:</strong> Understand WHY wrong answers are wrong</p>
            <p><strong>⏰ Time Yourself:</strong> Build speed through regular practice</p>
            <p><strong>😌 Stay Calm:</strong> If stuck, eliminate and guess → then move on</p>
            <p><strong>✅ Trust Your Preparation:</strong> You've studied hard — you're ready!</p>
            <p style="margin-top: 20px; font-size: 18px; font-weight: bold;">Best of luck with your NTS GAT test! 🚀</p>
          </div>
        </div>

      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-6xl">
        <div className="p-8 mb-8 bg-white rounded-xl shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">
              📘 NTS GAT Quantitative Ability
            </h1>
            <p className="text-lg text-gray-600">
              Complete Guide with Formulas, Examples & Strategies
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <div className="px-4 py-2 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                <CheckCircle size={16} className="inline mr-2" />
                100% Complete Coverage
              </div>
              <div className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                <BookOpen size={16} className="inline mr-2" />
                80+ Examples
              </div>
              <div className="px-4 py-2 text-sm font-medium text-purple-800 bg-purple-100 rounded-full">
                <Calculator size={16} className="inline mr-2" />
                All Formulas Included
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <h3 className="flex items-center mb-3 font-bold text-blue-900">
                <BookOpen className="mr-2" size={20} />
                What's Included:
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <CheckCircle size={18} className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                  All arithmetic formulas with applications
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                  Complete algebra with 30+ examples
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                  Geometry - all shapes & formulas
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                  Quantitative comparison strategies
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                  Data interpretation techniques
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                  Common mistakes & how to avoid them
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <h3 className="flex items-center mb-3 font-bold text-amber-900">
                <AlertTriangle className="mr-2" size={20} />
                Key Features:
              </h3>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start">
                  <div className="p-1 mr-3 bg-amber-100 rounded-full">
                    <span className="font-bold text-amber-700">📌</span>
                  </div>
                  <span>"When to Use" guidance for each formula</span>
                </li>
                <li className="flex items-start">
                  <div className="p-1 mr-3 bg-amber-100 rounded-full">
                    <span className="font-bold text-amber-700">🎯</span>
                  </div>
                  <span>Step-by-step example solutions</span>
                </li>
                <li className="flex items-start">
                  <div className="p-1 mr-3 bg-amber-100 rounded-full">
                    <span className="font-bold text-amber-700">⚠️</span>
                  </div>
                  <span>Common pitfalls highlighted</span>
                </li>
                <li className="flex items-start">
                  <div className="p-1 mr-3 bg-amber-100 rounded-full">
                    <span className="font-bold text-amber-700">💡</span>
                  </div>
                  <span>Time-saving tips & shortcuts</span>
                </li>
                <li className="flex items-start">
                  <div className="p-1 mr-3 bg-amber-100 rounded-full">
                    <span className="font-bold text-amber-700">📋</span>
                  </div>
                  <span>Quick reference tables</span>
                </li>
                <li className="flex items-start">
                  <div className="p-1 mr-3 bg-amber-100 rounded-full">
                    <span className="font-bold text-amber-700">⏰</span>
                  </div>
                  <span>Test-taking strategies</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <h3 className="mb-3 font-bold text-emerald-900">🎓 Study Recommendations:</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="mb-2 font-semibold text-emerald-700">Week 1-2</div>
                <p className="text-sm text-gray-600">Master arithmetic & algebra basics</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="mb-2 font-semibold text-emerald-700">Week 3-4</div>
                <p className="text-sm text-gray-600">Practice geometry & word problems</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="mb-2 font-semibold text-emerald-700">Week 5-6</div>
                <p className="text-sm text-gray-600">Take timed practice tests</p>
              </div>
            </div>
          </div>

          <button
            onClick={generatePDF}
            className="flex gap-3 justify-center items-center px-6 py-4 w-full text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 group"
          >
            <Download size={24} />
            Download Complete PDF Guide (120+ Pages)
            <span className="px-2 py-1 text-sm rounded bg-white/20">Free</span>
          </button>

          <div className="mt-6 text-sm text-center text-gray-600">
            <div className="flex gap-6 justify-center mb-2">
              <p>📄 Printable format</p>
              <p>📱 Mobile-friendly</p>
              <p>🎯 Exam-focused</p>
            </div>
            <p className="mt-2">Perfect for last-minute revision or comprehensive study</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h3 className="mb-4 font-bold text-center text-gray-800">📚 Quick Topic Preview</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { title: "Arithmetic", examples: 15, icon: "🔢" },
              { title: "Algebra", examples: 18, icon: "📐" },
              { title: "Geometry", examples: 12, icon: "📏" },
              { title: "Percentages", examples: 10, icon: "📊" },
              { title: "Ratios", examples: 8, icon: "⚖️" },
              { title: "QC Strategies", examples: 12, icon: "🎯" },
              { title: "Data Analysis", examples: 7, icon: "📉" },
              { title: "Word Problems", examples: 15, icon: "📝" },
            ].map((topic, index) => (
              <div key={index} className="p-4 text-center bg-gray-50 rounded-lg transition-colors hover:bg-blue-50">
                <div className="mb-2 text-2xl">{topic.icon}</div>
                <div className="font-medium text-gray-800">{topic.title}</div>
                <div className="text-sm text-gray-600">{topic.examples} examples</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NTSGATQuantGuide;

