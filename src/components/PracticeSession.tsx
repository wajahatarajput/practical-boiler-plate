import { useState } from 'react';
import { CheckCircle, X, ArrowRight, RefreshCw } from 'lucide-react';
import type { Progress } from './TopicExplorer';

interface PracticeSessionProps {
  progress: Progress;
  setProgress: (progress: Progress) => void;
}

interface PracticeQuestion {
  id: string;
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  why: string;
  when: string;
  where: string;
}

const PracticeSession = ({ progress, setProgress }: PracticeSessionProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const practiceQuestions: PracticeQuestion[] = [
    {
      id: 'p1',
      topic: 'arithmetic',
      level: 'beginner',
      question: 'If x < 0 and y > 0, what is the sign of (x²y)/(−x)?',
      options: ['Positive', 'Negative', 'Zero', 'Cannot determine'],
      correctAnswer: 1,
      explanation: 'x² is always positive (any number squared). x² × y = positive × positive = positive. Dividing by (−x): positive ÷ negative = negative.',
      why: 'Understanding sign rules helps determine results without full calculation',
      when: 'Use when evaluating expressions with multiple operations',
      where: 'Applied in arithmetic problems and quantitative comparisons',
    },
    {
      id: 'p2',
      topic: 'arithmetic',
      level: 'beginner',
      question: 'Bus A arrives every 15 minutes, Bus B every 20 minutes. If they arrive together at 9 AM, when next together?',
      options: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
      correctAnswer: 1,
      explanation: 'LCM(15, 20) = 60 minutes. Prime factors: 15 = 3×5, 20 = 2²×5, so LCM = 2²×3×5 = 60. Next together: 9:00 AM + 60 minutes = 10:00 AM.',
      why: 'LCM finds when cycles align',
      when: 'Use for "when will they meet/align?" problems',
      where: 'Applied in word problems about timing and cycles',
    },
    {
      id: 'p3',
      topic: 'arithmetic',
      level: 'beginner',
      question: 'Is 4,572 divisible by 3?',
      options: ['Yes', 'No', 'Cannot determine', 'Only by 9'],
      correctAnswer: 0,
      explanation: 'Sum of digits: 4+5+7+2 = 18. Since 18 is divisible by 3, the number 4,572 is divisible by 3.',
      why: 'Divisibility rules allow quick checking without division',
      when: 'Use when checking if numbers divide evenly',
      where: 'Applied in number theory and fraction simplification',
    },
    {
      id: 'p4',
      topic: 'arithmetic',
      level: 'beginner',
      question: 'Evaluate: 8 + 2 × 3²',
      options: ['42', '26', '90', '50'],
      correctAnswer: 1,
      explanation: 'Follow PEMDAS: First 3² = 9, then 2 × 9 = 18, finally 8 + 18 = 26. NOT (8+2) × 9 = 90!',
      why: 'Order of operations ensures correct evaluation',
      when: 'Use when evaluating expressions with multiple operations',
      where: 'Applied in all arithmetic and algebra problems',
    },
    {
      id: 'p5',
      topic: 'arithmetic',
      level: 'intermediate',
      question: 'Solve: |x − 3| = 5',
      options: ['x = 8 only', 'x = −2 only', 'x = 8 or x = −2', 'x = 3 ± 5'],
      correctAnswer: 2,
      explanation: 'Absolute value equals 5 means: x − 3 = 5 or x − 3 = −5. Solving: x = 8 or x = −2.',
      why: 'Absolute value equations have two cases',
      when: 'Use when solving |expression| = number',
      where: 'Applied in algebra and distance problems',
    },
    {
      id: 'p6',
      topic: 'arithmetic',
      level: 'intermediate',
      question: 'Find 10th term: 5, 8, 11, 14, ...',
      options: ['29', '32', '35', '38'],
      correctAnswer: 1,
      explanation: 'Arithmetic sequence: d = 3, a₁ = 5. a₁₀ = 5 + (10−1)×3 = 5 + 27 = 32.',
      why: 'Arithmetic sequences have constant difference',
      when: 'Use when finding terms in arithmetic sequences',
      where: 'Applied in pattern and sequence problems',
    },
    {
      id: 'p7',
      topic: 'algebra',
      level: 'beginner',
      question: 'Calculate 103 × 97 using algebraic identities',
      options: ['9991', '10091', '9891', '10001'],
      correctAnswer: 0,
      explanation: 'Use (a+b)(a−b) = a²−b². (100+3)(100−3) = 100² − 3² = 10000 − 9 = 9991.',
      why: 'Difference of squares allows fast calculation',
      when: 'Use when numbers are close to a round number',
      where: 'Applied in fast mental calculations',
    },
    {
      id: 'p8',
      topic: 'algebra',
      level: 'intermediate',
      question: 'Solve: x² − 5x + 6 = 0',
      options: ['x = 2 or x = 3', 'x = −2 or x = −3', 'x = 1 or x = 6', 'x = 0 or x = 5'],
      correctAnswer: 0,
      explanation: 'Factor: (x − 2)(x − 3) = 0. Set each factor equal to zero: x − 2 = 0 or x − 3 = 0. So x = 2 or x = 3.',
      why: 'Factoring is faster than quadratic formula when possible',
      when: 'Use when quadratic can be easily factored',
      where: 'Applied in solving quadratic equations',
    },
    {
      id: 'p9',
      topic: 'algebra',
      level: 'intermediate',
      question: 'Solve: x + y = 10, x − y = 4',
      options: ['x = 7, y = 3', 'x = 3, y = 7', 'x = 6, y = 4', 'x = 8, y = 2'],
      correctAnswer: 0,
      explanation: 'Add equations: 2x = 14 → x = 7. Substitute: 7 + y = 10 → y = 3.',
      why: 'Elimination method works well when coefficients match',
      when: 'Use when solving systems of equations',
      where: 'Applied in word problems with multiple unknowns',
    },
    {
      id: 'p10',
      topic: 'algebra',
      level: 'intermediate',
      question: 'Factor: x² − 16',
      options: ['(x + 4)(x − 4)', '(x + 8)(x − 8)', '(x − 4)²', '(x + 4)²'],
      correctAnswer: 0,
      explanation: 'Difference of squares: x² − 16 = x² − 4² = (x + 4)(x − 4).',
      why: 'Recognizing patterns speeds up factoring',
      when: 'Use when expression is difference of two squares',
      where: 'Applied in simplifying and solving equations',
    },
    {
      id: 'p11',
      topic: 'geometry',
      level: 'beginner',
      question: 'Triangle has angles 55° and 65°. Find third angle.',
      options: ['50°', '60°', '70°', '80°'],
      correctAnswer: 1,
      explanation: 'Sum of angles = 180°. Third angle = 180° − (55° + 65°) = 180° − 120° = 60°.',
      why: 'Triangle angle sum property is fundamental',
      when: 'Use when finding missing angles in triangles',
      where: 'Applied in all triangle problems',
    },
    {
      id: 'p12',
      topic: 'geometry',
      level: 'intermediate',
      question: 'Right triangle has legs 9 and 12. Find the hypotenuse.',
      options: ['13', '15', '17', '21'],
      correctAnswer: 1,
      explanation: 'Recognize 3-4-5 triple scaled by 3: 3×3=9, 4×3=12, so hypotenuse = 5×3 = 15. Or calculate: 9²+12²=81+144=225, √225=15.',
      why: 'Pythagorean triples allow fast recognition',
      when: 'Use for right triangles with known leg lengths',
      where: 'Applied in geometry and coordinate problems',
    },
    {
      id: 'p13',
      topic: 'geometry',
      level: 'intermediate',
      question: 'Circle radius = 10.5 cm. Find circumference.',
      options: ['21π cm', '10.5π cm', '42π cm', '110.25π cm'],
      correctAnswer: 0,
      explanation: 'Circumference = 2πr = 2 × π × 10.5 = 21π cm.',
      why: 'Circle formulas are essential for geometry',
      when: 'Use when finding circumference or area of circles',
      where: 'Applied in geometry and real-world problems',
    },
    {
      id: 'p14',
      topic: 'geometry',
      level: 'intermediate',
      question: 'Find sum of interior angles of hexagon.',
      options: ['540°', '720°', '900°', '1080°'],
      correctAnswer: 1,
      explanation: 'n = 6. Sum = (6−2) × 180° = 4 × 180° = 720°.',
      why: 'Polygon angle formulas are useful for geometry',
      when: 'Use when working with polygons',
      where: 'Applied in polygon problems',
    },
    {
      id: 'p15',
      topic: 'geometry',
      level: 'advanced',
      question: 'Distance between (3, 4) and (7, 1)?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 2,
      explanation: 'd = √[(7−3)² + (1−4)²] = √[4² + (−3)²] = √[16 + 9] = √25 = 5.',
      why: 'Distance formula connects algebra and geometry',
      when: 'Use when finding distance between two points',
      where: 'Applied in coordinate geometry',
    },
    {
      id: 'p16',
      topic: 'geometry',
      level: 'advanced',
      question: 'Rectangular box: length=8, width=5, height=3. Find volume.',
      options: ['120', '158', '240', '480'],
      correctAnswer: 0,
      explanation: 'Volume = length × width × height = 8 × 5 × 3 = 120.',
      why: 'Volume formulas are essential for 3D problems',
      when: 'Use when finding volume of 3D shapes',
      where: 'Applied in geometry and word problems',
    },
    {
      id: 'p17',
      topic: 'percentages',
      level: 'beginner',
      question: 'After 15% discount, price is Rs. 425. What was the original price?',
      options: ['Rs. 488.75', 'Rs. 500', 'Rs. 510', 'Rs. 490'],
      correctAnswer: 1,
      explanation: 'WRONG: 425 × 1.15 = 488.75. CORRECT: Original = 425/(1 − 0.15) = 425/0.85 = 500. To reverse percentage, divide by (1 ± %), don\'t multiply.',
      why: 'Reversing percentages requires division, not multiplication',
      when: 'Use when finding original value after percentage change',
      where: 'Applied in discount and tax problems',
    },
    {
      id: 'p18',
      topic: 'percentages',
      level: 'beginner',
      question: 'Price increases 30%, then decreases 30%. Net effect?',
      options: ['No change', '9% decrease', '9% increase', '30% decrease'],
      correctAnswer: 1,
      explanation: 'Let original = 100. After increase: 100 × 1.30 = 130. After decrease: 130 × 0.70 = 91. Net change: (91−100)/100 = −9% (9% decrease).',
      why: 'Percentages are not reversible',
      when: 'Use when calculating successive percentage changes',
      where: 'Applied in price and growth problems',
    },
    {
      id: 'p19',
      topic: 'percentages',
      level: 'intermediate',
      question: 'Cost = Rs. 500, Selling = Rs. 600. Profit percentage?',
      options: ['16.67%', '20%', '25%', '30%'],
      correctAnswer: 1,
      explanation: 'Profit = 600 − 500 = 100. Profit % = (100/500) × 100% = 20%.',
      why: 'Profit percentage is calculated on cost price',
      when: 'Use when calculating profit or loss percentages',
      where: 'Applied in business and profit/loss problems',
    },
    {
      id: 'p20',
      topic: 'percentages',
      level: 'advanced',
      question: 'Rs. 1000 at 10% annual compound interest for 3 years. Final amount?',
      options: ['Rs. 1,300', 'Rs. 1,331', 'Rs. 1,400', 'Rs. 1,500'],
      correctAnswer: 1,
      explanation: 'A = 1000(1 + 0.10)³ = 1000(1.1)³ = 1000 × 1.331 = Rs. 1,331.',
      why: 'Compound interest grows exponentially',
      when: 'Use when calculating compound interest or growth',
      where: 'Applied in financial and growth problems',
    },
    {
      id: 'p21',
      topic: 'ratios',
      level: 'beginner',
      question: 'Divide Rs. 1200 among A, B, C in ratio 2:3:5',
      options: ['A=200, B=300, C=500', 'A=240, B=360, C=600', 'A=300, B=400, C=500', 'A=240, B=400, C=560'],
      correctAnswer: 1,
      explanation: 'Total parts = 2+3+5 = 10. A: (2/10)×1200 = 240. B: (3/10)×1200 = 360. C: (5/10)×1200 = 600.',
      why: 'Ratios allow fair distribution',
      when: 'Use when dividing amounts in given ratios',
      where: 'Applied in distribution and sharing problems',
    },
    {
      id: 'p22',
      topic: 'ratios',
      level: 'intermediate',
      question: 'A can complete work in 6 hours, B in 4 hours. How long together?',
      options: ['2 hours', '2.4 hours', '3 hours', '5 hours'],
      correctAnswer: 1,
      explanation: 'A rate = 1/6 per hour, B rate = 1/4 per hour. Combined = 1/6 + 1/4 = 2/12 + 3/12 = 5/12 per hour. Time = 1 ÷ (5/12) = 12/5 = 2.4 hours.',
      why: 'Work rates add when working together',
      when: 'Use when calculating combined work time',
      where: 'Applied in work and rate problems',
    },
    {
      id: 'p23',
      topic: 'ratios',
      level: 'intermediate',
      question: 'Car travels 240 km in 3 hours. Average speed?',
      options: ['70 km/h', '80 km/h', '90 km/h', '100 km/h'],
      correctAnswer: 1,
      explanation: 'Speed = Distance / Time = 240 km / 3 hours = 80 km/h.',
      why: 'Speed is distance divided by time',
      when: 'Use when calculating speed, distance, or time',
      where: 'Applied in motion and travel problems',
    },
    {
      id: 'p24',
      topic: 'qc',
      level: 'advanced',
      question: 'Column A: x², Column B: x, Condition: x is real number. What is the relationship?',
      options: ['A > B', 'B > A', 'A = B', 'Cannot determine'],
      correctAnswer: 3,
      explanation: 'Test x=0: A=0, B=0 → Equal. Test x=2: A=4, B=2 → A>B. Test x=½: A=¼, B=½ → A<B. Different relationships → Answer: Cannot determine.',
      why: 'QC requires testing multiple cases',
      when: 'Use for all quantitative comparison questions',
      where: 'Applied in QC sections of the test',
    },
    {
      id: 'p25',
      topic: 'qc',
      level: 'advanced',
      question: 'Column A: Area of square with side 5, Column B: Area of rectangle 4×6',
      options: ['A > B', 'B > A', 'A = B', 'Cannot determine'],
      correctAnswer: 0,
      explanation: 'A: 5² = 25. B: 4×6 = 24. Since 25 > 24, A > B.',
      why: 'Calculate both columns directly for geometry QC',
      when: 'Use when comparing geometric quantities',
      where: 'Applied in quantitative comparison with geometry',
    },
    {
      id: 'p26',
      topic: 'data',
      level: 'intermediate',
      question: 'Company sales: TVs=40%, Computers=25%. Total=$200,000. How much more are TV sales than Computer sales?',
      options: ['$15,000', '$30,000', '$40,000', '$50,000'],
      correctAnswer: 1,
      explanation: 'TV sales = 40% of 200,000 = 80,000. Computer sales = 25% of 200,000 = 50,000. Difference = 30,000.',
      why: 'Convert percentages to actual values before comparing',
      when: 'Use when comparing percentages in data interpretation',
      where: 'Applied in data interpretation questions',
    },
    {
      id: 'p27',
      topic: 'data',
      level: 'intermediate',
      question: 'Bar graph shows sales: Jan=50, Feb=70, Mar=60, Apr=80. Average?',
      options: ['60', '65', '70', '75'],
      correctAnswer: 1,
      explanation: 'Total = 50+70+60+80 = 260. Average = 260/4 = 65.',
      why: 'Average is total divided by count',
      when: 'Use when finding average from data',
      where: 'Applied in data interpretation',
    },
  ];

  const filteredQuestions = practiceQuestions.filter((q) => {
    const topicMatch = selectedTopic === 'all' || q.topic === selectedTopic;
    const levelMatch = selectedLevel === 'all' || q.level === selectedLevel;
    return topicMatch && levelMatch;
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newScore = {
      correct: score.correct + (answerIndex === currentQuestion.correctAnswer ? 1 : 0),
      total: score.total + 1,
    };
    setScore(newScore);

    // Update progress
    if (answerIndex === currentQuestion.correctAnswer) {
      const newProgress = { ...progress };
      if (!newProgress[currentQuestion.topic]) {
        newProgress[currentQuestion.topic] = { beginner: 0, intermediate: 0, advanced: 0 };
      }
      const currentProgress = newProgress[currentQuestion.topic][currentQuestion.level];
      newProgress[currentQuestion.topic][currentQuestion.level] = Math.min(100, currentProgress + 5);
      setProgress(newProgress);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, total: 0 });
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">No questions available for selected filters.</p>
        <button
          onClick={() => {
            setSelectedTopic('all');
            setSelectedLevel('all');
          }}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Practice Questions</h2>
        <p className="text-gray-600">Test your knowledge with interactive questions</p>
      </div>

      {/* Filters */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
              }}
              className="px-4 py-2 w-full rounded-lg border border-gray-300"
            >
              <option value="all">All Topics</option>
              <option value="arithmetic">Arithmetic</option>
              <option value="algebra">Algebra</option>
              <option value="geometry">Geometry</option>
              <option value="percentages">Percentages</option>
              <option value="ratios">Ratios</option>
              <option value="qc">Quantitative Comparison</option>
              <option value="data">Data Interpretation</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value as 'all' | 'beginner' | 'intermediate' | 'advanced');
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
              }}
              className="px-4 py-2 w-full rounded-lg border border-gray-300"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Score */}
      {score.total > 0 && (
        <div className="p-4 mb-6 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">Score: </span>
              <span className="text-2xl font-bold text-blue-600">
                {score.correct}/{score.total}
              </span>
              <span className="ml-2 text-gray-600">
                ({Math.round((score.correct / score.total) * 100)}%)
              </span>
            </div>
            <button
              onClick={handleReset}
              className="flex gap-2 items-center text-gray-600 hover:text-gray-800"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Question */}
      {currentQuestion && (
        <div className="p-8 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {filteredQuestions.length}
              </span>
              <div className="flex gap-2 items-center mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  currentQuestion.level === 'beginner' ? 'bg-green-100 text-green-800' :
                  currentQuestion.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQuestion.level}
                </span>
                <span className="text-sm text-gray-600 capitalize">{currentQuestion.topic}</span>
              </div>
            </div>
          </div>

          <h3 className="mb-6 text-xl font-bold text-gray-900">{currentQuestion.question}</h3>

          <div className="mb-6 space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showResult = showExplanation;

              let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all ';
              if (showResult) {
                if (isCorrect) {
                  buttonClass += 'bg-green-100 border-green-500 text-green-900';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'bg-red-100 border-red-500 text-red-900';
                } else {
                  buttonClass += 'bg-gray-50 border-gray-200 text-gray-700';
                }
              } else {
                buttonClass += isSelected
                  ? 'bg-blue-100 border-blue-500 text-blue-900'
                  : 'bg-white border-gray-200 hover:border-blue-300 text-gray-700';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex justify-between items-center">
                    <span>{String.fromCharCode(65 + index)}. {option}</span>
                    {showResult && isCorrect && <CheckCircle className="text-green-600" size={20} />}
                    {showResult && isSelected && !isCorrect && <X className="text-red-600" size={20} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="p-6 mb-6 bg-blue-50 rounded-lg">
              <h4 className="mb-3 font-bold text-blue-900">Explanation</h4>
              <p className="mb-4 text-blue-800">{currentQuestion.explanation}</p>
              
              <div className="grid gap-4 mt-4 md:grid-cols-3">
                <div>
                  <span className="text-sm font-semibold text-blue-700">Why:</span>
                  <p className="mt-1 text-sm text-blue-600">{currentQuestion.why}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-700">When:</span>
                  <p className="mt-1 text-sm text-blue-600">{currentQuestion.when}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-700">Where:</span>
                  <p className="mt-1 text-sm text-blue-600">{currentQuestion.where}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && currentQuestionIndex < filteredQuestions.length - 1 && (
            <button
              onClick={handleNext}
              className="flex gap-2 justify-center items-center px-6 py-3 w-full font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Next Question <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticeSession;

