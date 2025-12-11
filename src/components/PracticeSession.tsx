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
      id: 'p4',
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
      id: 'p5',
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
      id: 'p6',
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

