import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Book,
  Award,
  Users,
  Shield,
  Globe,
} from "lucide-react";
import { usePage } from "../context/AppContext";
import Navigation from "../components/Navigation";

const faqCategories = [
  {
    title: "Getting Started",
    icon: Book,
    color: "blue",
    faqs: [
      {
        question: "What is ImpactMojo?",
        answer:
          "ImpactMojo is a free, open-source educational platform offering 101 knowledge series for social impact. It covers development economics, gender studies, policy analysis, research methods, and more - all designed for practitioners, students, and anyone interested in creating positive social change.",
      },
      {
        question: "Who can use ImpactMojo?",
        answer:
          "ImpactMojo is for everyone! Whether you're a development professional, student, researcher, NGO worker, policymaker, or simply someone passionate about social impact, our courses are designed to be accessible regardless of your background.",
      },
    ],
  },
  {
    title: "Learning & Certifications",
    icon: Award,
    color: "yellow",
    faqs: [
      {
        question: "Are there certificates?",
        answer:
          "Yes! Many of our courses include a certificate of achievement upon successful completion of course quizzes. This is a great way to demonstrate your learning and commitment to professional growth.",
      },
    ],
  },
  {
    title: "Community & Support",
    icon: Users,
    color: "purple",
    faqs: [
      {
        question: "Is there a discussion forum?",
        answer:
          "Yes! We have an open forum for users to collaborate, ask questions, and discuss key issues in social impact.",
      },
      {
        question: "How can I get help?",
        answer:
          "If you have any issues, reach out via our Contact page or post in the community forum for assistance.",
      },
    ],
  },
  {
    title: "Data & Privacy",
    icon: Shield,
    color: "teal",
    faqs: [
      {
        question: "What data do you collect?",
        answer:
          "We collect only essential information required for your learning journey and to improve the platform experience. Your privacy is extremely important to us.",
      },
    ],
  },
  {
    title: "Global Access",
    icon: Globe,
    color: "green",
    faqs: [
      {
        question: "Is ImpactMojo available worldwide?",
        answer:
          "Yes, ImpactMojo is accessible from anywhere in the world—absolutely free.",
      },
    ],
  },
];

const FAQPage = () => {
  const { darkMode } = usePage();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className={`min-h-screen bg-${darkMode ? "gray-900" : "gray-100"}`}>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300">
          Frequently Asked Questions
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with categories */}
          <div className="md:w-1/4">
            <div className="sticky top-24">
              {(faqCategories ?? []).map((category, i) => (
                <button
                  key={i}
                  className={`flex items-center gap-2 px-4 py-2 rounded mb-2 w-full text-left ${
                    activeCategory === i
                      ? "bg-blue-200 dark:bg-blue-800 font-semibold"
                      : "bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900"
                  }`}
                  onClick={() => setActiveCategory(i)}
                >
                  {category.icon && (
                    <category.icon
                      size={20}
                      className={`text-${category.color}-500`}
                    />
                  )}
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          {/* Main FAQ content */}
          <div className="md:w-3/4">
            {(faqCategories?.[activeCategory]?.faqs ?? []).map((faq, faqIndex) => (
              <div
                key={faqIndex}
                className="bg-white dark:bg-gray-800 rounded-lg mb-4 p-6 shadow"
              >
                <button
                  className="w-full flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFAQ(openFAQ === faqIndex ? null : faqIndex)}
                >
                  <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    {faq.question}
                  </span>
                  {openFAQ === faqIndex ? (
                    <ChevronUp className="text-blue-600" />
                  ) : (
                    <ChevronDown className="text-blue-600" />
                  )}
                </button>
                {openFAQ === faqIndex && (
                  <div className="mt-4 text-gray-800 dark:text-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
