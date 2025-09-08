// src/pages/FAQPage.js
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Book, Award, Users, Shield, Globe } from 'lucide-react';
import { usePage } from '../App';
import Navigation from '../components/Navigation';

const FAQPage = () => {
  const { darkMode } = usePage();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Book,
      color: "blue",
      faqs: [
        {
          question: "What is ImpactMojo?",
          answer: "ImpactMojo is a free, open-source educational platform offering 101 knowledge series for social impact. It covers development economics, gender studies, policy analysis, research methods, and more - all designed for practitioners, students, and anyone interested in creating positive social change."
        },
        {
          question: "Who can use ImpactMojo?",
          answer: "ImpactMojo is for everyone! Whether you're a development professional, student, researcher, NGO worker, policymaker, or simply someone passionate about social impact, our courses are designed to be accessible regardless of your background or experience level."
        },
        {
          question: "How do I get started?",
          answer: "Simply browse our courses, labs, and resources. You can start learning immediately without creating an account. For a personalized experience with bookmarks, notes, and progress tracking, sign in with your Google account."
        },
        {
          question: "Is ImpactMojo really free?",
          answer: "Yes! All content on ImpactMojo is completely free. We're supported by donations and our community. If you find value in our platform, consider supporting us via UPI donations to help cover server costs and content development."
        }
      ]
    },
    {
      title: "Courses & Learning",
      icon: Book,
      color: "green",
      faqs: [
        {
          question: "What learning tracks are available?",
          answer: "We offer four main learning tracks: Research Methods (research design and data collection), Data Analysis (statistical analysis and visualization), Gender Studies (gender equality and social inclusion), and Policy & Economics (development economics and policy analysis). Each track contains multiple courses."
        },
        {
          question: "How long are the courses?",
          answer: "Most courses are designed to be completed in 2-4 hours, broken into digestible sections. You can learn at your own pace - there are no deadlines or time restrictions."
        },
        {
          question: "What format are the courses in?",
          answer: "Courses include text-based content, PDFs, interactive labs, timelines, and practical exercises. Some include external resources and recommended readings. All content is optimized for both desktop and mobile learning."
        },
        {
          question: "Can I take notes while learning?",
          answer: "Yes! Logged-in users can access our Cornell Notes system to take structured notes for each course, searchable by keyword and organized by topic."
        }
      ]
    },
    {
      title: "Certificates & Recognition",
      icon: Award,
      color: "purple",
      faqs: [
        {
          question: "Do you provide certificates?",
          answer: "No, ImpactMojo does not provide certificates, endorsements, or formal accreditation. Our focus is on practical learning and knowledge sharing rather than credentialing."
        },
        {
          question: "Can I use ImpactMojo courses for academic credit?",
          answer: "ImpactMojo is not an accredited institution. Whether you can receive academic credit depends on your institution's policies. We recommend checking with your academic advisor."
        },
        {
          question: "How can I demonstrate what I've learned?",
          answer: "You can showcase your learning through the practical skills and knowledge you gain. Many users incorporate ImpactMojo insights into their work, research, or portfolio projects."
        }
      ]
    },
    {
      title: "Technical & Account",
      icon: Users,
      color: "orange",
      faqs: [
        {
          question: "Do I need an account to use ImpactMojo?",
          answer: "No account is required to access courses and content. However, creating a free account (via Google sign-in) unlocks additional features like bookmarks, progress tracking, Cornell notes, and personalized dashboard."
        },
        {
          question: "How do I reset my password?",
          answer: "ImpactMojo uses Google authentication, so password management is handled through your Google account. If you're having trouble signing in, use Google's account recovery options."
        },
        {
          question: "Can I use ImpactMojo offline?",
          answer: "ImpactMojo is a Progressive Web App (PWA) that can be installed on your device. Once installed, previously viewed content may be available offline, though new content requires an internet connection."
        },
        {
          question: "Is my data safe?",
          answer: "Yes. We use Firebase for secure data storage and only collect minimal information necessary for the platform to function. See our Privacy Policy for full details on data handling."
        }
      ]
    },
    {
      title: "Contributing & Community",
      icon: Globe,
      color: "red",
      faqs: [
        {
          question: "Can I contribute content to ImpactMojo?",
          answer: "We welcome content suggestions! Use our feedback system to suggest new courses, improvements, or corrections. While we curate all content to maintain quality and consistency, community input shapes our development."
        },
        {
          question: "How can I support ImpactMojo?",
          answer: "You can support us by: sharing ImpactMojo with others, providing feedback and suggestions, making UPI donations (impactmojo@ibl, @ybl, @axl), and engaging with our community on social media."
        },
        {
          question: "Is ImpactMojo open source?",
          answer: "Yes! ImpactMojo is open source under the MIT license. You can find our code, contribute improvements, or fork the project on GitHub."
        },
        {
          question: "Who created ImpactMojo?",
          answer: "ImpactMojo was created by Varna Sri Raman, a development economist with a PhD, with generous support from PinPoint Ventures and our community of learners and contributors."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
  };

  const getIconComponent = (IconComponent, color) => {
    const colorClasses = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      orange: 'text-orange-600 dark:text-orange-400',
      red: 'text-red-600 dark:text-red-400'
    };
    
    return <IconComponent className={`h-6 w-6 ${colorClasses[color]}`} />;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about ImpactMojo, our courses, and how to make the most of your learning experience.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              
              {/* Category Header */}
              <div className={`bg-gradient-to-r from-${category.color}-600 to-${category.color}-700 p-6`}>
                <div className="flex items-center space-x-3">
                  {getIconComponent(category.icon, 'white')}
                  <h2 className="text-2xl font-bold text-white">
                    {category.title}
                  </h2>
                </div>
              </div>

              {/* FAQs */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {category.faqs.map((faq, faqIndex) => {
                  const isOpen = openFAQ === `${categoryIndex}-${faqIndex}`;
                  
                  return (
                    <div key={faqIndex}>
                      <button
                        onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-lg opacity-90 mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="mailto:varna.sr@gmail.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Us
            </a>
            
            <div className="text-sm opacity-75">
              <p>or use our feedback system for suggestions and improvements</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            For more information, see our{' '}
            <a href="/privacy-policy" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </a>
            {' '}and{' '}
            <a href="/terms-of-use" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Use
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
