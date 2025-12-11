import { useState } from 'react';
import { BookOpen, TrendingUp, Target, Award } from 'lucide-react';
import TopicExplorer from './TopicExplorer';
import type { Progress } from './TopicExplorer';
import LearningPath from './LearningPath';
import PracticeSession from './PracticeSession';
import ProgressTracker from './ProgressTracker';

type TabType = 'explore' | 'learn' | 'practice' | 'progress';

const LearningApp = () => {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [progress, setProgress] = useState<Progress>({
    arithmetic: { beginner: 0, intermediate: 0, advanced: 0 },
    algebra: { beginner: 0, intermediate: 0, advanced: 0 },
    geometry: { beginner: 0, intermediate: 0, advanced: 0 },
    percentages: { beginner: 0, intermediate: 0, advanced: 0 },
    ratios: { beginner: 0, intermediate: 0, advanced: 0 },
    qc: { beginner: 0, intermediate: 0, advanced: 0 },
    data: { beginner: 0, intermediate: 0, advanced: 0 },
  });

  const tabs = [
    { id: 'explore' as TabType, label: 'Explore Topics', icon: BookOpen },
    { id: 'learn' as TabType, label: 'Learning Path', icon: TrendingUp },
    { id: 'practice' as TabType, label: 'Practice', icon: Target },
    { id: 'progress' as TabType, label: 'Progress', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-lg">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📚 NTS GAT Learning Hub</h1>
              <p className="mt-1 text-gray-600">Master Quantitative Ability from Beginner to Advanced</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Progress</div>
                <div className="text-2xl font-bold text-blue-600">
                  {(() => {
                  const total = Object.values(progress).reduce((acc: number, topic) => {
                    if (topic && typeof topic === 'object' && 'beginner' in topic && 'intermediate' in topic && 'advanced' in topic) {
                      const topicTotal = topic.beginner + topic.intermediate + topic.advanced;
                      return acc + topicTotal;
                    }
                    return acc;
                  }, 0);
                  return Math.round(total / (Object.keys(progress).length * 3));
                })()}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {activeTab === 'explore' && <TopicExplorer progress={progress} setProgress={setProgress} />}
        {activeTab === 'learn' && <LearningPath progress={progress} setProgress={setProgress} />}
        {activeTab === 'practice' && <PracticeSession progress={progress} setProgress={setProgress} />}
        {activeTab === 'progress' && <ProgressTracker progress={progress} />}
      </div>
    </div>
  );
};

export default LearningApp;

