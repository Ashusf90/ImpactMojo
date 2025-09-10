import React from 'react';
// CORRECTED IMPORT: This now uses the data "map" file for reliability.
import { courseData } from '../data/index.js'; 

const CoursesPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courseData.map(course => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{course.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>{course.category}</span>
              <span className="font-semibold">{course.difficulty}</span>
            </div>
            <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-center bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-auto">
              Start Course
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

