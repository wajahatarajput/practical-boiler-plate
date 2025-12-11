import { CheckCircle, TrendingUp, Award, Target } from 'lucide-react';
import type { Progress } from './TopicExplorer';

interface ProgressTrackerProps {
  progress: Progress;
}

const ProgressTracker = ({ progress }: ProgressTrackerProps) => {
  const topics = [
    { id: 'arithmetic', name: 'Arithmetic', icon: '🔢' },
    { id: 'algebra', name: 'Algebra', icon: '📐' },
    { id: 'geometry', name: 'Geometry', icon: '📏' },
    { id: 'percentages', name: 'Percentages', icon: '📊' },
    { id: 'ratios', name: 'Ratios', icon: '⚖️' },
    { id: 'qc', name: 'Quantitative Comparison', icon: '🎯' },
    { id: 'data', name: 'Data Interpretation', icon: '📉' },
  ];

  const calculateTopicProgress = (topicId: string) => {
    const topicProgress = progress[topicId];
    if (!topicProgress) return 0;
    const total = topicProgress.beginner + topicProgress.intermediate + topicProgress.advanced;
    return Math.round(total / 3);
  };

  const calculateOverallProgress = () => {
    const topicProgresses = topics.map((topic) => calculateTopicProgress(topic.id));
    const total = topicProgresses.reduce((sum, p) => sum + p, 0);
    return Math.round(total / topics.length);
  };

  const calculateLevelProgress = (level: 'beginner' | 'intermediate' | 'advanced') => {
    const levelProgresses = topics.map((topic) => {
      const topicProgress = progress[topic.id];
      return topicProgress ? topicProgress[level] : 0;
    });
    const total = levelProgresses.reduce((sum, p) => sum + p, 0);
    return Math.round(total / topics.length);
  };

  const overallProgress = calculateOverallProgress();
  const beginnerProgress = calculateLevelProgress('beginner');
  const intermediateProgress = calculateLevelProgress('intermediate');
  const advancedProgress = calculateLevelProgress('advanced');

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAchievementBadge = (percentage: number) => {
    if (percentage === 100) return { icon: Award, text: 'Master', color: 'text-yellow-600' };
    if (percentage >= 80) return { icon: CheckCircle, text: 'Excellent', color: 'text-green-600' };
    if (percentage >= 50) return { icon: TrendingUp, text: 'Good Progress', color: 'text-blue-600' };
    return { icon: Target, text: 'Getting Started', color: 'text-gray-600' };
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Your Progress</h2>
        <p className="text-gray-600">Track your learning journey across all topics</p>
      </div>

      {/* Overall Progress */}
      <div className="p-8 mb-8 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="mb-2 text-2xl font-bold">Overall Progress</h3>
            <p className="text-blue-100">Keep up the great work!</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{overallProgress}%</div>
            <div className="mt-1 text-sm text-blue-100">Complete</div>
          </div>
        </div>
        <div className="w-full h-4 bg-blue-700 rounded-full">
          <div
            className={`h-4 rounded-full transition-all ${getProgressColor(overallProgress)}`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Level Progress */}
      <div className="grid gap-6 mb-8 md:grid-cols-3">
        {[
          { level: 'beginner', progress: beginnerProgress, color: 'green' },
          { level: 'intermediate', progress: intermediateProgress, color: 'yellow' },
          { level: 'advanced', progress: advancedProgress, color: 'red' },
        ].map(({ level, progress, color }) => {
          const badge = getAchievementBadge(progress);
          const BadgeIcon = badge.icon;
          return (
            <div key={level} className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-gray-900 capitalize">{level}</h4>
                <BadgeIcon className={badge.color} size={24} />
              </div>
              <div className="mb-2 text-3xl font-bold text-gray-900">{progress}%</div>
              <div className="mb-2 w-full h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all bg-${color}-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-600">{badge.text}</div>
            </div>
          );
        })}
      </div>

      {/* Topic Progress */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="mb-6 text-xl font-bold text-gray-900">Topic Breakdown</h3>
        <div className="space-y-4">
          {topics.map((topic) => {
            const topicProgress = progress[topic.id];
            const beginner = topicProgress?.beginner || 0;
            const intermediate = topicProgress?.intermediate || 0;
            const advanced = topicProgress?.advanced || 0;
            const total = Math.round((beginner + intermediate + advanced) / 3);

            return (
              <div key={topic.id} className="pb-4 border-b border-gray-200 last:border-0">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-3 items-center">
                    <span className="text-2xl">{topic.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900">{topic.name}</h4>
                      <div className="flex gap-4 mt-1 text-xs text-gray-600">
                        <span>Beginner: {beginner}%</span>
                        <span>Intermediate: {intermediate}%</span>
                        <span>Advanced: {advanced}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{total}%</div>
                    <div className="text-xs text-gray-500">Overall</div>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div className="flex h-3">
                    <div
                      className="bg-green-500 rounded-l-full"
                      style={{ width: `${beginner}%` }}
                    />
                    <div
                      className="bg-yellow-500"
                      style={{ width: `${intermediate}%` }}
                    />
                    <div
                      className="bg-red-500 rounded-r-full"
                      style={{ width: `${advanced}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="p-6 mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <h3 className="flex gap-2 items-center mb-4 text-xl font-bold text-gray-900">
          <Award className="text-purple-600" size={24} />
          Achievements
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {topics.map((topic) => {
            const progress = calculateTopicProgress(topic.id);
            if (progress === 100) {
              return (
                <div key={topic.id} className="flex gap-3 items-center p-4 bg-white rounded-lg">
                  <Award className="text-yellow-500" size={24} />
                  <div>
                    <div className="font-bold text-gray-900">Mastered {topic.name}</div>
                    <div className="text-sm text-gray-600">100% Complete</div>
                  </div>
                </div>
              );
            }
            return null;
          })}
          {topics.every((topic) => calculateTopicProgress(topic.id) < 100) && (
            <div className="text-gray-600">Complete topics to unlock achievements!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;

