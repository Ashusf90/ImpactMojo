// src/components/homepage-components.js
import React from 'react';
import { ExternalLink, Users } from 'lucide-react';
import { userTestimonials } from '../data/testimonials-data';
import { featuredContent } from '../data/featured-content-data';

// Function to generate mock active learner counts
export const getActiveLearnerCount = (courseId) => {
  const hash = courseId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return Math.abs(hash % 500) + 100; // Between 100-600 learners
};

// Featured Content Section Component
export const FeaturedContentSection = ({ darkMode, setCurrentPage }) => {
  const handleContentClick = (item) => {
    if (item.onClick) {
      // Handle internal navigation
      setCurrentPage('ai-tools');
    } else {
      // Handle external links
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Content</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Explore our spotlight content designed to challenge and inspire
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {featuredContent.map((item) => (
          <div key={item.id} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-white text-blue-600 rounded-full mb-4">
                {item.type}
              </span>
              <p className="text-lg mb-6 opacity-90">{item.description}</p>
              <button 
                onClick={() => handleContentClick(item)}
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Explore Content
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// User Testimonials Section Component
export const TestimonialsSection = ({ darkMode }) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Learners Say</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Real feedback from development professionals worldwide
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <blockquote className="text-gray-600 dark:text-gray-300 text-sm mb-4 italic">
              "{testimonial.quote}"
            </blockquote>
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {testimonial.designation}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {testimonial.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Popular Courses Section Component
export const PopularCoursesSection = ({ darkMode, popularCourses, setCurrentPage }) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Courses</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Start with our most loved courses</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {popularCourses.map((course) => {
          const activeLearners = getActiveLearnerCount(course.id);
          return (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 rounded-full">
                    {course.track}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{activeLearners} learners</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{course.description}</p>
                {course.quote && (
                  <blockquote className="text-sm italic text-gray-500 dark:text-gray-400 border-l-4 border-blue-500 pl-3">
                    {course.quote}
                  </blockquote>
                )}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentPage('courses')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
        >
          View All Courses
        </button>
      </div>
    </div>
  );
};
