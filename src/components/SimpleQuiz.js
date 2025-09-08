// src/components/SimpleQuiz.js
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePage } from '../App';

const SimpleQuiz = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const { darkMode } = usePage();

  const questions = [
    {
      id: 'experience',
      question: 'What is your experience with development work?',
      options: ['Complete beginner', 'Some exposure', 'Experienced practitioner']
    },
    {
      id: 'interest',
      question: 'What interests you most?',
      options: ['Research and analysis', 'Field work and community engagement', 'Policy and advocacy']
    },
    {
      id: 'goal',
      question: 'What is your main goal?',
      options: ['Learn the basics', 'Develop specific skills', 'Advance my career']
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate simple recommendation
      let recommendation = 'development-economics-101';
      if (newAnswers.interest === 'Research and analysis') {
        recommendation = 'data-literacy-101';
      } else if (newAnswers.interest === 'Field work and community engagement') {
        recommendation = 'public-health-101';
      } else if (newAnswers.interest === 'Policy and advocacy') {
        recommendation = 'climate-science-101';
      }
      
      onComplete({ recommendation, answers: newAnswers });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Find Your Starting Point</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X size={20} />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-gray-900 dark:text-white mb-4">{questions[currentQuestion].question}</h4>
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <span className="text-gray-900 dark:text-white">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleQuiz;
