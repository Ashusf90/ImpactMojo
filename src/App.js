// src/App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Sun, Moon, Bookmark, MessageCircle, 
  ExternalLink, BookOpen, FileText, Target, Users, 
  Clock, CheckCircle, PlayCircle, Bot, Trophy, 
  Headphones, MapPin, Library, Music, Download, 
  Search, Plus, Edit3, Save, Filter, BookmarkIcon, Tag,
  Install, AlertTriangle, ChevronDown, ChevronRight, Gamepad2,
  BarChart, Star, ArrowRight, Calendar, TrendingUp, Scale, 
  Award, Puzzle, Zap, Send, Lightbulb
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';

// Data imports
import { courseData, upcomingCourses } from './data/course-data';
import { labsData } from './data/labs-data';
import { premiumResources } from './data/premium-resources-data';
import { aiToolsData } from './data/ai-tools-data';

// NEW COMPONENT IMPORTS
import { FloatingActionButtons } from './components/floating-action-buttons';
import { 
  FeaturedContentSection, 
  TestimonialsSection, 
  PopularCoursesSection 
} from './components/homepage-components';
import { LearningTracksSection } from './components/learning-tracks-component';

// Updated Games Data
const gamesData = [
  {
    id: "G1",
    title: "The Real Middle Game",
    description: "An interactive strategy game for development professionals",
    url: "https://101.www.impactmojo.in/theREALmiddlegame",
    category: "Strategy",
    difficulty: "Intermediate"
  }
];

// Updated Premium Resources Data (with corrected URLs)
const updatedPremiumResources = [
  {
    id: "PR1",
    title: "Field Notes from a Development Economist",
    description: "In-depth analysis and insights from development economics practice",
    url: "https://marginmuse.space/themarginmuse",
    category: "Blog/Newsletter",
    access: "Premium"
  },
  {
    id: "PR2", 
    title: "Qualitative Research Lab",
    description: "Interactive tools and resources for qualitative research methods",
    url: "https://101.www.impactmojo.in/IMQualLab",
    category: "Research Tools",
    access: "Premium"
  },
  {
    id: "PR3",
    title: "Statistical Analysis Assistant", 
    description: "AI-powered statistical analysis tools and guidance",
    url: "https://101.www.impactmojo.in/IMStatsAssist",
    category: "Data Analysis",
    access: "Premium"
  }
];

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnF0eJsTULzOJUnBskybd44dG5w-f46vE",
  authDomain: "impactmojo.firebaseapp.com",
  projectId: "impactmojo",
  storageBucket: "impactmojo.firebasestorage.app",
  messagingSenderId: "529198336589",
  appId: "1:529198336589:web:1664b5344de5bfb31bea04",
  measurementId: "G-ZHPPXXMRGV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Multi-dimensional browse system
const browseByRole = {
  "New to Development": {
    description: "Just starting your development journey",
    courses: ["development-economics-101", "global-development-architecture-101", "law-and-constitution-101"],
    color: "blue"
  },
  "Researcher/Academic": {
    description: "Conducting research and generating knowledge",
    courses: ["research-ethics-101", "qualitative-research-methods-101", "econometrics-101", "data-literacy-101"],
    color: "purple"
  },
  "Practitioner/Field Worker": {
    description: "Implementing programs and working directly with communities",
    courses: ["community-development-101", "monitoring-evaluation-accountability-and-learning-101", "advocacy-and-communications-101"],
    color: "green"
  },
  "Student/Policy Maker": {
    description: "Learning and shaping policy decisions",
    courses: ["law-and-constitution-101", "political-economy-101", "global-development-architecture-101"],
    color: "orange"
  }
};

const browseByImpact = {
  "Health & Wellbeing": {
    description: "Improving health outcomes and social welfare",
    courses: ["public-health-101", "sexual-and-reproductive-health-101", "human-rights-101"],
    color: "red"
  },
  "Education & Skills": {
    description: "Building knowledge and capacity",
    courses: ["data-literacy-101", "qualitative-research-methods-101", "econometrics-101"],
    color: "blue"
  },
  "Governance & Justice": {
    description: "Strengthening institutions and rule of law",
    courses: ["law-and-constitution-101", "political-economy-101", "research-ethics-101"],
    color: "purple"
  },
  "Economic Growth": {
    description: "Creating sustainable economic opportunities",
    courses: ["development-economics-101", "monitoring-evaluation-accountability-and-learning-101"],
    color: "green"
  }
};

const browseByTimeCommitment = {
  "Quick Start (< 2 hours)": {
    description: "Get started with fundamental concepts",
    courses: ["development-economics-101", "global-development-architecture-101"],
    color: "green"
  },
  "Deep Dive (2-4 hours)": {
    description: "Comprehensive exploration of topics",
    courses: ["qualitative-research-methods-101", "monitoring-evaluation-accountability-and-learning-101", "econometrics-101"],
    color: "blue"
  },
  "Mastery Track (4+ hours)": {
    description: "Advanced learning with practical application",
    courses: ["data-literacy-101", "research-ethics-101", "political-economy-101"],
    color: "purple"
  }
};

// Auth Context
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [customPathway, setCustomPathway] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await loadUserData(user.uid);
      } else {
        setBookmarks([]);
        setComparisons([]);
        setCustomPathway([]);
        setNotes([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loadUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setBookmarks(userData.bookmarks || []);
        setComparisons(userData.comparisons || []);
        setCustomPathway(userData.customPathway || []);
        setNotes(userData.notes || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const addBookmark = async (item) => {
    if (!user) return;
    const newBookmarks = [...bookmarks, { ...item, bookmarkedAt: new Date().toISOString() }];
    setBookmarks(newBookmarks);
    try {
      await updateDoc(doc(db, 'users', user.uid), { bookmarks: newBookmarks });
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const removeBookmark = async (itemId) => {
    if (!user) return;
    const newBookmarks = bookmarks.filter(item => item.id !== itemId);
    setBookmarks(newBookmarks);
    try {
      await updateDoc(doc(db, 'users', user.uid), { bookmarks: newBookmarks });
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const isBookmarked = (itemId) => {
    return bookmarks.some(item => item.id === itemId);
  };

  const addToComparison = async (item) => {
    if (!user) return;
    const newComparisons = [...comparisons, item];
    setComparisons(newComparisons);
    try {
      await updateDoc(doc(db, 'users', user.uid), { comparisons: newComparisons });
    } catch (error) {
      console.error('Error saving comparison:', error);
    }
  };

  const removeFromComparison = async (itemId) => {
    if (!user) return;
    const newComparisons = comparisons.filter(item => item.id !== itemId);
    setComparisons(newComparisons);
    try {
      await updateDoc(doc(db, 'users', user.uid), { comparisons: newComparisons });
    } catch (error) {
      console.error('Error removing comparison:', error);
    }
  };

  const addToPathway = async (courseId) => {
    if (!user) return;
    const newPathway = [...customPathway, courseId];
    setCustomPathway(newPathway);
    try {
      await updateDoc(doc(db, 'users', user.uid), { customPathway: newPathway });
    } catch (error) {
      console.error('Error saving pathway:', error);
    }
  };

  const removeFromPathway = async (courseId) => {
    if (!user) return;
    const newPathway = customPathway.filter(id => id !== courseId);
    setCustomPathway(newPathway);
    try {
      await updateDoc(doc(db, 'users', user.uid), { customPathway: newPathway });
    } catch (error) {
      console.error('Error removing from pathway:', error);
    }
  };

  const addNote = async (note) => {
    if (!user) return;
    const newNote = {
      id: Date.now().toString(),
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    try {
      await updateDoc(doc(db, 'users', user.uid), { notes: newNotes });
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const updateNote = async (noteId, updatedNote) => {
    if (!user) return;
    const newNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    );
    setNotes(newNotes);
    try {
      await updateDoc(doc(db, 'users', user.uid), { notes: newNotes });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    if (!user) return;
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotes(newNotes);
    try {
      await updateDoc(doc(db, 'users', user.uid), { notes: newNotes });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const isPremium = user && user.email && user.email.includes('@'); // Simplified check

  const value = {
    user,
    loading,
    signIn,
    signOut,
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    comparisons,
    addToComparison,
    removeFromComparison,
    customPathway,
    addToPathway,
    removeFromPathway,
    notes,
    addNote,
    updateNote,
    deleteNote,
    isPremium
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Page Context
const PageContext = createContext();
const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const value = {
    currentPage,
    setCurrentPage,
    darkMode,
    toggleDarkMode
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

// Navigation Component
const Navigation = () => {
  const { currentPage, setCurrentPage, darkMode, toggleDarkMode } = usePage();
  const { user, signIn, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-2"
              >
                <img 
                  src="/assets/ImpactMojo Logo.png"
                  alt="ImpactMojo Logo"
                  className="h-8 w-8"
                  onError={(e) => {
                    e.target.src = "/assets/android-chrome-192x192.png";
                  }}
                />
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ImpactMojo
                </span>
              </button>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {['home', 'courses', 'labs', 'games', 'resources'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`${currentPage === page ? 'border-blue-600 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium capitalize`}
                >
                  {page}
                </button>
              ))}
              {user && (
                <>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className={`${currentPage === 'dashboard' ? 'border-blue-600 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentPage('ai-tools')}
                    className={`${currentPage === 'ai-tools' ? 'border-blue-600 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    AI Tools
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {user ? (
              <div className="flex items-center space-x-3">
                <img 
                  src={user.photoURL} 
                  alt={user.displayName}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.displayName}
                </span>
                <button
                  onClick={signOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </button>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {['home', 'courses', 'labs', 'games', 'resources'].map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setIsMenuOpen(false);
                }}
                className={`${currentPage === page ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left capitalize`}
              >
                {page}
              </button>
            ))}
            {user && (
              <>
                <button
                  onClick={() => {
                    setCurrentPage('dashboard');
                    setIsMenuOpen(false);
                  }}
                  className={`${currentPage === 'dashboard' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('ai-tools');
                    setIsMenuOpen(false);
                  }}
                  className={`${currentPage === 'ai-tools' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
                >
                  AI Tools
                </button>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center px-4 space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              {user ? (
                <>
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      {user.displayName}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      {user.email}
                    </div>
                  </div>
                  <button
                    onClick={signOut}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={signIn}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium w-full"
                >
                  Sign In with Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Home Page Component
const HomePage = () => {
  const { darkMode } = usePage();
  const { user } = useAuth();
  const { setCurrentPage } = usePage();
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  // Check cookie consent on mount
  useEffect(() => {
    const hasConsent = localStorage.getItem('impactmojo-cookie-consent');
    if (!hasConsent) {
      setShowCookieConsent(true);
    }
  }, []);

  // Social sharing functionality
  const shareOnSocial = (platform) => {
    const url = 'https://www.impactmojo.in';
    const title = 'ImpactMojo - Development Know-How';
    const description = 'Master the art and science of development with expert-curated courses, labs, and AI-powered tools for South Asia.';
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title + ' - ' + description)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' - ' + description + ' ' + url)}`,
      instagram: `https://www.instagram.com/`
    };
    
    if (platform === 'instagram') {
      navigator.clipboard.writeText(`${title} - ${description} ${url}`);
      alert('Link copied to clipboard! You can now paste it in your Instagram story or post.');
    }
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  // Quiz data
  const quizQuestions = [
    {
      question: "What type of work interests you most?",
      answers: [
        { text: "Working with data and numbers", tracks: ["Data Analysis"] },
        { text: "Understanding social dynamics", tracks: ["Gender Studies"] },
        { text: "Policy analysis and economics", tracks: ["Policy & Economics"] },
        { text: "Research design and methodology", tracks: ["Research Methods"] }
      ]
    },
    {
      question: "How do you prefer to learn?",
      answers: [
        { text: "Through hands-on data projects", tracks: ["Data Analysis"] },
        { text: "Case studies and real examples", tracks: ["Gender Studies", "Policy & Economics"] },
        { text: "Theoretical frameworks", tracks: ["Research Methods"] },
        { text: "Interactive analysis", tracks: ["Data Analysis", "Research Methods"] }
      ]
    },
    {
      question: "What's your main goal?",
      answers: [
        { text: "Measure and evaluate impact", tracks: ["Data Analysis", "Research Methods"] },
        { text: "Promote equity and inclusion", tracks: ["Gender Studies"] },
        { text: "Influence policy decisions", tracks: ["Policy & Economics"] },
        { text: "Build research skills", tracks: ["Research Methods"] }
      ]
    }
  ];

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);
    
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Calculate result
      const trackScores = {};
      newAnswers.forEach((answerIdx, questionIdx) => {
        const tracks = quizQuestions[questionIdx].answers[answerIdx].tracks;
        tracks.forEach(track => {
          trackScores[track] = (trackScores[track] || 0) + 1;
        });
      });
      
      const recommendedTrack = Object.keys(trackScores).reduce((a, b) => 
        trackScores[a] > trackScores[b] ? a : b
      );
      
      setQuizResult(recommendedTrack);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  // Get popular courses (first 6 courses)
  const popularCourses = courseData.slice(0, 6);

  // Get upcoming courses (mock data or from upcomingCourses if available)
  const upcomingCoursesData = upcomingCourses || [
    { id: 'UC1', title: 'Digital Development 101', track: 'Technology', status: 'coming-soon' },
    { id: 'UC2', title: 'Sustainable Finance 101', track: 'Economics', status: 'coming-soon' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <FloatingActionButtons user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Development</span>
            <span className="block text-blue-600 dark:text-blue-400">Know-How</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Master the art and science of development with expert-curated courses, labs, and AI-powered tools.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={() => setCurrentPage('courses')}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Start Learning
              </button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <button
                onClick={() => setShowQuizModal(true)}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              >
                Find Your Track
              </button>
            </div>
          </div>
        </div>

        {/* NEW MODULAR COMPONENTS */}
        <PopularCoursesSection 
          darkMode={darkMode} 
          popularCourses={popularCourses} 
          setCurrentPage={setCurrentPage} 
        />
        
        <FeaturedContentSection 
          darkMode={darkMode} 
          setCurrentPage={setCurrentPage} 
        />
        
        <TestimonialsSection darkMode={darkMode} />
        
        <LearningTracksSection 
          darkMode={darkMode} 
          courseData={courseData}
          browseByRole={browseByRole}
        />

        {/* Upcoming Courses Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Coming Soon</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">New courses launching soon</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingCoursesData.map((course) => (
              <div key={course.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden opacity-75">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-full">
                      {course.track}
                    </span>
                    <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                      Launching Soon
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{course.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Get notified when this course becomes available</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social & About Creator Box */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4 overflow-hidden">
                <img 
                  src="/assets/varna-photo.jpg" 
                  alt="Varna Sri Raman"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/android-chrome-192x192.png";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Created by Varna Sri Raman</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ImpactMojo is built to democratize access to development knowledge.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => shareOnSocial('linkedin')}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => shareOnSocial('facebook')}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Facebook
                </button>
                <button
                  onClick={() => shareOnSocial('whatsapp')}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setShowNewsletterModal(true)}
                  className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "Are the courses free?",
                a: "Yes, all courses are freely available. Some premium resources require sign-in."
              },
              {
                q: "Do I get certificates?",
                a: "ImpactMojo focuses on knowledge sharing rather than certification. Our goal is learning, not credentialing."
              },
              {
                q: "Can I use the content for my organization?",
                a: "Yes, all content is licensed under Creative Commons for non-commercial use with attribution."
              },
              {
                q: "How often is new content added?",
                a: "We regularly update our library. Subscribe to our newsletter to stay informed about new releases."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <summary className="p-4 cursor-pointer text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                  {faq.q}
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">ImpactMojo</h3>
              <p className="text-gray-300 mb-4">
                A curated library of knowledge decks exploring justice, equity, and development in South Asia.
              </p>
              <p className="text-sm text-gray-400">
                Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => setCurrentPage('courses')} className="hover:text-white">Courses</button></li>
                <li><button onClick={() => setCurrentPage('labs')} className="hover:text-white">Labs</button></li>
                <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Resources</button></li>
                <li><button onClick={() => setCurrentPage('games')} className="hover:text-white">Games</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="https://varna.substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Newsletter</a></li>
                <li><a href="https://www.linkedin.com/in/varna-sri-raman" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
                <li><a href="https://github.com/Varnasr/ImpactMojo" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
                <li><a href="mailto:varna.sr@gmail.com" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>© 2025 ImpactMojo. No endorsements or certificates. Built for learning and social impact.</p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm">
              We use analytics to improve your experience. By continuing, you agree to our use of cookies.
            </p>
            <button
              onClick={() => {
                localStorage.setItem('impactmojo-cookie-consent', 'true');
                setShowCookieConsent(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-4"
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            {!quizResult ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Find Your Learning Track
                  </h3>
                  <button 
                    onClick={() => setShowQuizModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Question {currentQuizQuestion + 1} of {quizQuestions.length}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {quizQuestions[currentQuizQuestion].question}
                  </h4>
                  <div className="space-y-2">
                    {quizQuestions[currentQuizQuestion].answers.map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full text-left p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {answer.text}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Your Recommended Track
                  </h3>
                  <button 
                    onClick={() => setShowQuizModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="text-center mb-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {quizResult}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Based on your answers, this track aligns best with your interests and goals.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setCurrentPage('courses');
                      setShowQuizModal(false);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Explore Courses
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Retake Quiz
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Subscribe to Newsletter
              </h3>
              <button 
                onClick={() => setShowNewsletterModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get updates on new courses, resources, and development insights.
            </p>
            <button
              onClick={() => {
                window.open('https://varna.substack.com', '_blank');
                setShowNewsletterModal(false);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Visit Newsletter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Courses Page Component
const CoursesPage = () => {
  const { darkMode } = usePage();
  const { addBookmark, removeBookmark, isBookmarked } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [browseMode, setBrowseMode] = useState('role');

  const handleBookmark = (course) => {
    const bookmarkItem = { ...course, type: 'course' };
    if (isBookmarked(course.id)) {
      removeBookmark(course.id);
    } else {
      addBookmark(bookmarkItem);
    }
  };

  const filteredCourses = courseData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTrack === 'all') return matchesSearch;
    
    if (browseMode === 'role') {
      const roleData = browseByRole[selectedTrack];
      return matchesSearch && roleData && roleData.courses.includes(course.id);
    } else if (browseMode === 'impact') {
      const impactData = browseByImpact[selectedTrack];
      return matchesSearch && impactData && impactData.courses.includes(course.id);
    } else if (browseMode === 'time') {
      const timeData = browseByTimeCommitment[selectedTrack];
      return matchesSearch && timeData && timeData.courses.includes(course.id);
    }
    
    return matchesSearch;
  });

  const getBrowseOptions = () => {
    switch (browseMode) {
      case 'role': return browseByRole;
      case 'impact': return browseByImpact;
      case 'time': return browseByTimeCommitment;
      default: return browseByRole;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <FloatingActionButtons />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Courses</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Explore our comprehensive library of development courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={browseMode}
                onChange={(e) => {
                  setBrowseMode(e.target.value);
                  setSelectedTrack('all');
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="role">By Role</option>
                <option value="impact">By Impact</option>
                <option value="time">By Time</option>
              </select>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {Object.keys(getBrowseOptions()).map((track) => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 rounded-full">
                    {course.track}
                  </span>
                  <button
                    onClick={() => handleBookmark(course)}
                    className={`p-2 rounded-full ${isBookmarked(course.id) 
                      ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900' 
                      : 'text-gray-400 hover:text-yellow-500'}`}
                    title="Bookmark"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                </div>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                >
                  Start Course
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Labs Page Component
const LabsPage = () => {
  const { darkMode } = usePage();
  const { addBookmark, removeBookmark, isBookmarked } = useAuth();

  const handleBookmark = (lab) => {
    const bookmarkItem = { ...lab, type: 'lab' };
    if (isBookmarked(lab.id)) {
      removeBookmark(lab.id);
    } else {
      addBookmark(bookmarkItem);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <FloatingActionButtons />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Labs</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Interactive experiments and tools for development professionals</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {labsData.map((lab) => (
            <div key={lab.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 rounded-full">
                    {lab.topic}
                  </span>
                  <button
                    onClick={() => handleBookmark(lab)}
                    className={`p-2 rounded-full ${isBookmarked(lab.id) 
                      ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900' 
                      : 'text-gray-400 hover:text-yellow-500'}`}
                    title="Bookmark"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{lab.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{lab.description}</p>
                <a
                  href={lab.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                >
                  Launch Lab
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Games Page Component
const GamesPage = () => {
  const { darkMode } = usePage();
  const { addBookmark, removeBookmark, isBookmarked } = useAuth();

  const handleBookmark = (game) => {
    const bookmarkItem = { ...game, type: 'game' };
    if (isBookmarked(game.id)) {
      removeBookmark(game.id);
    } else {
      addBookmark(bookmarkItem);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <FloatingActionButtons />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Games</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Interactive games for development learning</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gamesData.map((game) => (
            <div key={game.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-800 dark:text-purple-200 bg-purple-100 dark:bg-purple-900 rounded-full mb-2">
                      {game.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{game.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{game.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    Play Game
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                  
                  <button
                    onClick={() => handleBookmark(game)}
                    className={`p-2 rounded-full ${isBookmarked(game.id) 
                      ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900' 
                      : 'text-gray-400 hover:text-yellow-500'}`}
                    title="Bookmark"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Resources Page Component
const ResourcesPage = () => {
  const { darkMode } = usePage();
  const { addBookmark, removeBookmark, isBookmarked } = useAuth();

  const handleBookmark = (resource) => {
    const bookmarkItem = { ...resource, type: 'resource' };
    if (isBookmarked(resource.id)) {
      removeBookmark(resource.id);
    } else {
      addBookmark(bookmarkItem);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <FloatingActionButtons />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Resources</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Premium tools and resources for development professionals</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {updatedPremiumResources.map((resource) => (
            <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-800 dark:text-orange-200 bg-orange-100 dark:bg-orange-900 rounded-full mb-2">
                      {resource.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{resource.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    Access Resource
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                  
                  <button
                    onClick={() => handleBookmark(resource)}
                    className={`p-2 rounded-full ${isBookmarked(resource.id) 
                      ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900' 
                      : 'text-gray-400 hover:text-yellow-500'}`}
                    title="Bookmark"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// AI Tools Page Component
const AIToolsPage = () => {
  const { darkMode } = usePage();
  const { user } = useAuth();
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Research Methods', 'Data Analysis', 'Program Management', 'Communications'];

  const filteredTools = aiToolsData.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || tool.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const ToolCard = ({ tool }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" 
         onClick={() => setSelectedTool(tool)}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.title}</h3>
        <div className={`p-2 rounded-lg bg-${tool.color}-100 dark:bg-${tool.color}-900`}>
          <Bot className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{tool.description}</p>
      <div className="flex items-center justify-between">
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
          {tool.category}
        </span>
        <ArrowRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <FloatingActionButtons />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">AI Tools</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            AI-powered assistants for development professionals
          </p>
          {!user && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="inline h-5 w-5 mr-2" />
                Sign in to access AI tools
              </p>
            </div>
          )}
        </div>

        {user && (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Tabs */}
            <div className="mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`${activeTab === category
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tools Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No tools found matching your criteria.</p>
              </div>
            )}
          </>
        )}

        {/* Tool Modal */}
        {selectedTool && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedTool.title}
                  </h3>
                  <button onClick={() => setSelectedTool(null)}>
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedTool.description}
                </p>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">How to use this tool:</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedTool.prompt}
                    </p>
                  </div>
                  {selectedTool.exampleInput && (
                    <>
                      <h4 className="font-medium text-gray-900 dark:text-white">Example Input:</h4>
                      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200 whitespace-pre-wrap">
                          {selectedTool.exampleInput}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard Page Component
const DashboardPage = () => {
  const { darkMode } = usePage();
  const { user, bookmarks, customPathway, notes } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Please sign in to access your dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <FloatingActionButtons />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.displayName?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Here's your learning dashboard</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Target },
              { id: 'bookmarks', name: 'Bookmarks', icon: Bookmark },
              { id: 'pathway', name: 'My Pathway', icon: MapPin },
              { id: 'notes', name: 'Notes', icon: FileText },
              { id: 'comparisons', name: 'Comparisons', icon: Scale }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Bookmark className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <div className="ml-4">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{bookmarks.length}</p>
                    <p className="text-gray-600 dark:text-gray-300">Bookmarks</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <div className="ml-4">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{customPathway.length}</p>
                    <p className="text-gray-600 dark:text-gray-300">Pathway Courses</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  <div className="ml-4">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{notes.length}</p>
                    <p className="text-gray-600 dark:text-gray-300">Notes</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  <div className="ml-4">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {Math.floor((bookmarks.length + customPathway.length + notes.length) / 3)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">Activity Score</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {bookmarks.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Bookmark className="h-5 w-5 text-yellow-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Bookmarked</p>
                    </div>
                  </div>
                ))}
                {bookmarks.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Bookmarks</h2>
            {bookmarks.length > 0 ? (
              <div className="space-y-3">
                {bookmarks.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex-shrink-0 ml-2"
                      aria-label="Open course"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">No bookmarks yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Start bookmarking courses to see them here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pathway' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">My Learning Pathway</h2>
            {customPathway.length > 0 ? (
              <div className="space-y-3">
                {customPathway.map((courseId, index) => {
                  const course = courseData.find(c => c.id === courseId);
                  return course ? (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">{course.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{course.track}</p>
                      </div>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex-shrink-0 ml-2"
                        aria-label="Open course"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">No courses in your pathway yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Take the quiz to get started</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Notes</h2>
            {notes.length > 0 ? (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">{note.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{note.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Created: {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">No notes yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Start taking notes to see them here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparisons' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Course Comparisons</h2>
            <div className="text-center py-8">
              <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No comparisons yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Compare courses to make better learning decisions</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// App Content Component (uses the hooks)
const AppContent = () => {
  const { currentPage } = usePage();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'courses':
        return <CoursesPage />;
      case 'labs':
        return <LabsPage />;
      case 'games':
        return <GamesPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'ai-tools':
        return <AIToolsPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
};

// Main App Component (just provides context)
const App = () => {
  return (
    <AuthProvider>
      <PageProvider>
        <AppContent />
      </PageProvider>
    </AuthProvider>
  );
};

export default App;
