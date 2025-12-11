import { useState } from 'react';
import { CheckCircle, Lock, ArrowRight, BookOpen, Target, Clock } from 'lucide-react';
import type { Progress } from './TopicExplorer';

interface LearningPathProps {
  progress: Progress;
  setProgress: (progress: Progress) => void;
}

interface PathStep {
  id: string;
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  concepts: string[];
  prerequisites: string[];
  estimatedTime: string;
}

const LearningPath = ({ progress, setProgress }: LearningPathProps) => {
  const [selectedPath, setSelectedPath] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const learningPaths: Record<'beginner' | 'intermediate' | 'advanced', PathStep[]> = {
    beginner: [
      {
        id: 'b1',
        topic: 'arithmetic',
        level: 'beginner',
        title: 'Sign Rules & Basic Operations',
        description: 'Learn how positive and negative numbers work together',
        concepts: ['sign-rules'],
        prerequisites: [],
        estimatedTime: '30 min',
      },
      {
        id: 'b2',
        topic: 'arithmetic',
        level: 'beginner',
        title: 'Factors, Multiples & Prime Numbers',
        description: 'Master LCM, GCD, and prime factorization',
        concepts: ['factors-multiples'],
        prerequisites: ['b1'],
        estimatedTime: '45 min',
      },
      {
        id: 'b3',
        topic: 'arithmetic',
        level: 'beginner',
        title: 'Even & Odd Numbers',
        description: 'Understand number properties and parity rules',
        concepts: ['even-odd'],
        prerequisites: ['b1'],
        estimatedTime: '30 min',
      },
      {
        id: 'b4',
        topic: 'percentages',
        level: 'beginner',
        title: 'Percentage Formulas',
        description: 'Master percentage calculations and changes',
        concepts: ['percentage-formulas'],
        prerequisites: ['b1'],
        estimatedTime: '45 min',
      },
      {
        id: 'b5',
        topic: 'percentages',
        level: 'beginner',
        title: 'Comparing Fractions',
        description: 'Learn three methods to compare fractions',
        concepts: ['fraction-comparison'],
        prerequisites: ['b4'],
        estimatedTime: '30 min',
      },
      {
        id: 'b6',
        topic: 'ratios',
        level: 'beginner',
        title: 'Ratios & Proportions',
        description: 'Solve distribution and proportion problems',
        concepts: ['ratios-proportions'],
        prerequisites: ['b4'],
        estimatedTime: '40 min',
      },
      {
        id: 'b7',
        topic: 'algebra',
        level: 'beginner',
        title: 'Algebraic Identities',
        description: 'Memorize and apply key algebraic identities',
        concepts: ['identities'],
        prerequisites: ['b1'],
        estimatedTime: '45 min',
      },
    ],
    intermediate: [
      {
        id: 'i1',
        topic: 'arithmetic',
        level: 'intermediate',
        title: 'Exponents & Roots',
        description: 'Master exponent rules and radical operations',
        concepts: ['exponents-roots'],
        prerequisites: ['b7'],
        estimatedTime: '60 min',
      },
      {
        id: 'i2',
        topic: 'arithmetic',
        level: 'intermediate',
        title: 'Inequalities',
        description: 'Solve inequalities and understand properties',
        concepts: ['inequalities'],
        prerequisites: ['i1'],
        estimatedTime: '45 min',
      },
      {
        id: 'i3',
        topic: 'algebra',
        level: 'intermediate',
        title: 'Solving Equations - 6-Step Method',
        description: 'Systematic approach to solving any linear equation',
        concepts: ['solving-equations'],
        prerequisites: ['b7'],
        estimatedTime: '60 min',
      },
      {
        id: 'i4',
        topic: 'algebra',
        level: 'intermediate',
        title: 'Word Problem Translation',
        description: 'Translate English phrases to mathematical expressions',
        concepts: ['word-problems'],
        prerequisites: ['i3'],
        estimatedTime: '50 min',
      },
      {
        id: 'i5',
        topic: 'geometry',
        level: 'intermediate',
        title: 'Lines & Angles',
        description: 'Understand angle relationships and parallel lines',
        concepts: ['lines-angles'],
        prerequisites: ['b1'],
        estimatedTime: '40 min',
      },
      {
        id: 'i6',
        topic: 'geometry',
        level: 'intermediate',
        title: 'Triangles - Complete Properties',
        description: 'Master triangle formulas and Pythagorean theorem',
        concepts: ['triangles'],
        prerequisites: ['i5'],
        estimatedTime: '60 min',
      },
      {
        id: 'i7',
        topic: 'geometry',
        level: 'intermediate',
        title: 'Circles - All Formulas',
        description: 'Learn circumference, area, and sector formulas',
        concepts: ['circles'],
        prerequisites: ['i6'],
        estimatedTime: '50 min',
      },
    ],
    advanced: [
      {
        id: 'a1',
        topic: 'qc',
        level: 'advanced',
        title: 'QC Systematic Approach',
        description: 'Master quantitative comparison strategies',
        concepts: ['qc-strategy'],
        prerequisites: ['i2', 'i4'],
        estimatedTime: '90 min',
      },
      {
        id: 'a2',
        topic: 'data',
        level: 'advanced',
        title: 'Data Interpretation Strategy',
        description: 'Analyze graphs, charts, and tables efficiently',
        concepts: ['data-strategy'],
        prerequisites: ['b4', 'i7'],
        estimatedTime: '90 min',
      },
    ],
  };

  const currentPath = learningPaths[selectedPath];
  const completedSteps = new Set<string>(); // This would come from progress tracking

  const isStepUnlocked = (step: PathStep): boolean => {
    if (step.prerequisites.length === 0) return true;
    return step.prerequisites.every((prereq) => completedSteps.has(prereq));
  };

  const getStepStatus = (step: PathStep) => {
    const isUnlocked = isStepUnlocked(step);
    const isCompleted = completedSteps.has(step.id);
    
    if (isCompleted) return 'completed';
    if (isUnlocked) return 'available';
    return 'locked';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Structured Learning Path</h2>
        <p className="text-gray-600">Follow a progressive path from beginner to advanced</p>
      </div>

      {/* Path Selector */}
      <div className="flex gap-2 mb-6">
        {(['beginner', 'intermediate', 'advanced'] as const).map((path) => (
          <button
            key={path}
            onClick={() => setSelectedPath(path)}
            className={`
              px-6 py-3 rounded-lg font-medium transition-colors
              ${
                selectedPath === path
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {path.charAt(0).toUpperCase() + path.slice(1)} Path
          </button>
        ))}
      </div>

      {/* Learning Path */}
      <div className="space-y-4">
        {currentPath.map((step, index) => {
          const status = getStepStatus(step);
          const isLast = index === currentPath.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Connector Line */}
              {!isLast && (
                <div className="flex flex-col items-center pt-2">
                  <div className={`w-0.5 h-full ${
                    status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                  }`} style={{ minHeight: '80px' }} />
                </div>
              )}

              {/* Step Content */}
              <div className="flex-1">
                <div
                  className={`
                    bg-white rounded-lg shadow-md p-6 border-2 transition-all
                    ${
                      status === 'completed'
                        ? 'border-green-500 bg-green-50'
                        : status === 'available'
                        ? 'border-blue-300 hover:border-blue-500 cursor-pointer'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center">
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center font-bold
                          ${
                            status === 'completed'
                              ? 'bg-green-500 text-white'
                              : status === 'available'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }
                        `}
                      >
                        {status === 'completed' ? (
                          <CheckCircle size={24} />
                        ) : status === 'locked' ? (
                          <Lock size={20} />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-gray-500">
                      <Clock size={16} />
                      {step.estimatedTime}
                    </div>
                  </div>

                  <div className="grid gap-4 mt-4 md:grid-cols-2">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Concepts Covered:</span>
                      <ul className="mt-2 space-y-1">
                        {step.concepts.map((concept) => (
                          <li key={concept} className="flex gap-2 items-center text-sm text-gray-600">
                            <BookOpen size={14} />
                            {concept.replace('-', ' ')}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {step.prerequisites.length > 0 && (
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Prerequisites:</span>
                        <ul className="mt-2 space-y-1">
                          {step.prerequisites.map((prereq) => (
                            <li key={prereq} className="flex gap-2 items-center text-sm text-gray-600">
                              <Target size={14} />
                              Step {prereq}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {status === 'available' && (
                    <button className="flex gap-2 justify-center items-center px-4 py-2 mt-4 w-full font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                      Start Learning <ArrowRight size={16} />
                    </button>
                  )}
                  {status === 'locked' && (
                    <div className="mt-4 text-sm text-center text-gray-500">
                      Complete prerequisites to unlock
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="p-6 mt-8 bg-blue-50 rounded-lg">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Path Progress</h3>
        <div className="space-y-2">
          {(['beginner', 'intermediate', 'advanced'] as const).map((path) => {
            const pathSteps = learningPaths[path];
            const completed = pathSteps.filter((step) => completedSteps.has(step.id)).length;
            const total = pathSteps.length;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <div key={path}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium text-gray-700 capitalize">{path}</span>
                  <span className="text-gray-600">{completed}/{total} steps</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;

