import { useState } from 'react';
import { ChevronRight, BookOpen, Clock } from 'lucide-react';
import TopicDetail from './TopicDetail';

export type TopicId = 'arithmetic' | 'algebra' | 'geometry' | 'percentages' | 'ratios' | 'qc' | 'data';

interface Topic {
  id: TopicId;
  title: string;
  icon: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  concepts: number;
}

export interface Progress {
  [key: string]: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
}

interface TopicExplorerProps {
  progress: Progress;
  setProgress: (progress: Progress) => void;
}

const TopicExplorer = ({ progress, setProgress }: TopicExplorerProps) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const topics: Topic[] = [
    {
      id: 'arithmetic',
      title: 'Arithmetic Fundamentals',
      icon: '🔢',
      description: 'Master basic operations, number properties, factors, multiples, and prime numbers',
      difficulty: 'beginner',
      estimatedTime: '2-3 hours',
      concepts: 8,
    },
    {
      id: 'algebra',
      title: 'Algebra & Equations',
      icon: '📐',
      description: 'Learn algebraic identities, solving equations, and word problem translation',
      difficulty: 'intermediate',
      estimatedTime: '3-4 hours',
      concepts: 6,
    },
    {
      id: 'geometry',
      title: 'Geometry & Shapes',
      icon: '📏',
      description: 'Understand lines, angles, triangles, circles, and all geometric formulas',
      difficulty: 'intermediate',
      estimatedTime: '4-5 hours',
      concepts: 10,
    },
    {
      id: 'percentages',
      title: 'Percentages & Fractions',
      icon: '📊',
      description: 'Master percentage calculations, fraction comparisons, and decimal conversions',
      difficulty: 'beginner',
      estimatedTime: '2-3 hours',
      concepts: 5,
    },
    {
      id: 'ratios',
      title: 'Ratios & Proportions',
      icon: '⚖️',
      description: 'Learn ratio calculations, proportions, and distribution problems',
      difficulty: 'beginner',
      estimatedTime: '2 hours',
      concepts: 4,
    },
    {
      id: 'qc',
      title: 'Quantitative Comparison',
      icon: '🎯',
      description: 'Master QC strategies, systematic testing, and common traps',
      difficulty: 'advanced',
      estimatedTime: '3-4 hours',
      concepts: 7,
    },
    {
      id: 'data',
      title: 'Data Interpretation',
      icon: '📉',
      description: 'Analyze graphs, charts, tables, and estimation strategies',
      difficulty: 'advanced',
      estimatedTime: '3-4 hours',
      concepts: 6,
    },
  ];

  const filteredTopics = topics.filter(
    (topic) => difficultyFilter === 'all' || topic.difficulty === difficultyFilter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (topicId: TopicId) => {
    const topicProgress = progress[topicId];
    if (!topicProgress) return 0;
    const total = topicProgress.beginner + topicProgress.intermediate + topicProgress.advanced;
    return Math.round((total / 3) * 100);
  };

  if (selectedTopic) {
    return (
      <TopicDetail
        topicId={selectedTopic}
        onBack={() => setSelectedTopic(null)}
        progress={progress}
        setProgress={setProgress}
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Explore All Topics</h2>
        <p className="text-gray-600">Click on any topic to start learning with detailed explanations</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setDifficultyFilter(filter)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${
                difficultyFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTopics.map((topic) => {
          const progressPercent = getProgressPercentage(topic.id);
          return (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className="p-6 bg-white rounded-xl border-2 border-transparent shadow-md transition-all cursor-pointer hover:shadow-xl hover:border-blue-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{topic.icon}</div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>
              
              <h3 className="mb-2 text-xl font-bold text-gray-900">{topic.title}</h3>
              <p className="mb-4 text-sm text-gray-600">{topic.description}</p>
              
              <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                <div className="flex gap-1 items-center">
                  <BookOpen size={14} />
                  {topic.concepts} concepts
                </div>
                <div className="flex gap-1 items-center">
                  <Clock size={14} />
                  {topic.estimatedTime}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1 text-xs text-gray-600">
                  <span>Progress</span>
                  <span className="font-medium">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <button className="flex gap-2 justify-center items-center mt-4 w-full font-medium text-blue-600 hover:text-blue-700">
                Start Learning <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicExplorer;

