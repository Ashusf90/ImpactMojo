// src/components/QuizResult.js
import React from 'react';
import { X, ExternalLink, Target } from 'lucide-react';
import { usePage } from '../context/AppContext.js';

const QuizResult = ({ result, onClose }) => {
  const { darkMode } = usePage();

  // Mock course data - in real implementation, import from course-data.js
  const courseRecommendations = {
    'development-economics-101': {
      title: 'Development Economics 101',
      description: 'Perfect introduction to understanding economic development and poverty reduction strategies',
      url: 'https://101.www.impactmojo.in/DevEcon',
      track: 'Policy & Economics'
    },
    'data-literacy-101': {
      title: 'Data Literacy 101',
      description: 'Build essential skills for collecting, analyzing, and interpreting development data',
      url: 'https://101.www.impactmojo.in/data-lit',
      track: 'Data Analysis'
    },
    'public-health-101': {
      title: 'Public Health 101',
      description: 'Discover evidence-based approaches to improving health outcomes in low-resource settings',
      url: 'https://101.www.impactmojo.in/ph',
      track: 'Research Methods'
    },
    'climate-science-101': {
      title: 'Climate Science 101',
      description: 'Learn the science behind climate change and its disproportionate impact on vulnerable communities',
      url: 'https://101.www.impactmojo.in/ClimateScience',
      track: 'Policy & Economics'
    }
  };

  const recommendedCourse = courseRecommendations[result.recommendation];

  const getPersonalizedMessage = () => {
    const { interest, experience, goal } = result.answers;
    
    if (interest === 'Research and analysis') {
      return "You have an analytical mindset! Data literacy will help you turn raw information into actionable insights for development impact.";
    } else if (interest === 'Field work and community engagement') {
      return "You're passionate about direct impact! Understanding public health approaches will enhance your community engagement work.";
    } else if (interest === 'Policy and advocacy') {
      return "You want to drive systemic change! Understanding climate science will strengthen your advocacy for vulnerable communities.";
    } else {
      return "You're interested in understanding the big picture! Development economics will give you frameworks for tackling poverty and inequality.";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Recommended Starting Point</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X size={20} />
        </button>
      </div>

      {/* Personalized Message */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            {getPersonalizedMessage()}
          </p>
        </div>
      </div>

      {/* Course Recommendation */}
      {recommendedCourse && (
        <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6 mb-6">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              {recommendedCourse.title}
            </h4>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
              {recommendedCourse.track}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {recommendedCourse.description}
          </p>
          
          <a
            href={recommendedCourse.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <span>Start Learning</span>
            <ExternalLink size={16} />
          </a>
        </div>
      )}

      {/* Additional Recommendations */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">What's Next?</h5>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>• Explore all four learning tracks to build comprehensive knowledge</p>
          <p>• Use our interactive labs to practice what you learn</p>
          <p>• Join our community by bookmarking courses and taking notes</p>
          <p>• Consider our upcoming courses to stay current with new developments</p>
        </div>
      </div>

      {/* Sign-up prompt */}
      <div className="text-center mt-6">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Want more personalized recommendations? Sign in to access our comprehensive assessment and custom learning pathways.
        </p>
      </div>
    </div>
  );
};

export default QuizResult;
