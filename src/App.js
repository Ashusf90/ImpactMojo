// src/App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Sun, Moon, Bookmark, MessageCircle, 
  ExternalLink, BookOpen, FileText, Target, Users, 
  Clock, CheckCircle, PlayCircle, Bot, Trophy, 
  Headphones, MapPin, Library, Music, Download, 
  Search, Plus, Edit3, Save, Filter, BookmarkIcon, Tag,
  Install, AlertTriangle, ChevronDown, ChevronRight, Gamepad2
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';

// Data imports
import { courseData, upcomingCourses } from './data/course-data';
import { labsData } from './data/labs-data';
import { premiumResources } from './data/premium-resources-data';

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
    category: "Analysis Tools",
    access: "Premium"
  }
];

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnF0eJsTULzOJUnBskybd44dG5w-f46vE",
  authDomain: "impactmojo.firebaseapp.com",
  projectId: "impactmojo",
  storageBucket: "impactmojo.firebasestorage.app",
  messagingSenderId: "529198336589",
  appId: "1:529198336589:web:1664b5344de5bfb31bea04",
  measurementId: "G-ZHPPXXMRGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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

  const saveUserData = async (data) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), data, { merge: true });
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  const addBookmark = (item) => {
    const newBookmarks = [...bookmarks, item];
    setBookmarks(newBookmarks);
    saveUserData({ bookmarks: newBookmarks });
  };

  const removeBookmark = (itemId) => {
    const newBookmarks = bookmarks.filter(b => b.id !== itemId);
    setBookmarks(newBookmarks);
    saveUserData({ bookmarks: newBookmarks });
  };

  const isBookmarked = (itemId) => {
    return bookmarks.some(b => b.id === itemId);
  };

  const toggleComparison = (item) => {
    const isInComparison = comparisons.some(c => c.id === item.id);
    let newComparisons;
    
    if (isInComparison) {
      newComparisons = comparisons.filter(c => c.id !== item.id);
    } else {
      if (comparisons.length >= 3) {
        alert('You can only compare up to 3 items');
        return;
      }
      newComparisons = [...comparisons, item];
    }
    
    setComparisons(newComparisons);
    saveUserData({ comparisons: newComparisons });
  };

  const isInComparison = (itemId) => {
    return comparisons.some(c => c.id === itemId);
  };

  const getCurrentComparisons = () => comparisons;

  const addToPathway = (item) => {
    const newPathway = [...customPathway, { ...item, addedAt: new Date() }];
    setCustomPathway(newPathway);
    saveUserData({ customPathway: newPathway });
  };

  const removeFromPathway = (itemId) => {
    const newPathway = customPathway.filter(p => p.id !== itemId);
    setCustomPathway(newPathway);
    saveUserData({ customPathway: newPathway });
  };

  const addNote = async (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      lastModified: new Date()
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    saveUserData({ notes: newNotes });
  };

  const updateNote = async (noteId, updatedNote) => {
    const newNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, ...updatedNote, lastModified: new Date() }
        : note
    );
    setNotes(newNotes);
    saveUserData({ notes: newNotes });
  };

  const deleteNote = async (noteId) => {
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotes(newNotes);
    saveUserData({ notes: newNotes });
  };

  const isPremium = true; // For now, everyone has premium access

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      bookmarks,
      comparisons,
      customPathway,
      notes,
      addBookmark,
      removeBookmark,
      isBookmarked,
      toggleComparison,
      isInComparison,
      getCurrentComparisons,
      addToPathway,
      removeFromPathway,
      addNote,
      updateNote,
      deleteNote,
      isPremium
    }}>
      {children}
    </AuthContext.Provider>
  );
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
  const [darkMode, setDarkMode] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  return (
    <PageContext.Provider value={{
      currentPage,
      setCurrentPage,
      darkMode,
      toggleDarkMode,
      showInstallPrompt,
      setShowInstallPrompt,
      handleInstallClick
    }}>
      {children}
    </PageContext.Provider>
  );
};

const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

// Modal Context
const ModalContext = createContext();
const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const openModal = (modalType, data = null) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{
      activeModal,
      modalData,
      openModal,
      closeModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Auth functions
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPage, setCurrentPage, darkMode, toggleDarkMode } = usePage();
  const { user } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xl font-bold text-blue-600 dark:text-blue-400"
            >
              ImpactMojo
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 text-sm font-medium ${
                currentPage === 'home'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('courses')}
              className={`px-3 py-2 text-sm font-medium ${
                currentPage === 'courses'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setCurrentPage('labs')}
              className={`px-3 py-2 text-sm font-medium ${
                currentPage === 'labs'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              Labs
            </button>
            <button
              onClick={() => setCurrentPage('games')}
              className={`px-3 py-2 text-sm font-medium ${
                currentPage === 'games'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              Games
            </button>
            <button
              onClick={() => setCurrentPage('ai-tools')}
              className={`px-3 py-2 text-sm font-medium ${
                currentPage === 'ai-tools'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
              }`}
            >
              AI Tools
            </button>
            {user && (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === 'dashboard'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                Dashboard
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              aria-label="Toggle dark mode"
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
                <button
                  onClick={signOut}
                  className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-500 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('courses');
                  setIsOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              >
                Courses
              </button>
              <button
                onClick={() => {
                  setCurrentPage('labs');
                  setIsOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              >
                Labs
              </button>
              <button
                onClick={() => {
                  setCurrentPage('games');
                  setIsOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              >
                Games
              </button>
              <button
                onClick={() => {
                  setCurrentPage('ai-tools');
                  setIsOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              >
                AI Tools
              </button>
              {user && (
                <button
                  onClick={() => {
                    setCurrentPage('dashboard');
                    setIsOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                >
                  Dashboard
                </button>
              )}
              <div className="flex items-center justify-between px-3 py-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-500 dark:text-gray-300"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                {user ? (
                  <button
                    onClick={signOut}
                    className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { darkMode, setCurrentPage } = usePage();
  const { user, bookmarks, notes, getCurrentComparisons } = useAuth();
  const { openModal } = useModal();
  const comparisons = getCurrentComparisons();

  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Sign in to access your dashboard
            </h1>
            <button
              onClick={signInWithGoogle}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.displayName?.split(' ')[0]}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Continue your learning journey with personalized tools and content.
          </p>
          <button
            onClick={() => setCurrentPage('ai-tools')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Explore AI Tools
          </button>
        </div>
        
        {/* Study Music - Fixed colors */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-4 sm:p-6 text-white mb-8">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold">Lo-Fi Study Beats</h2>
              <p className="mt-1">Focus better with our curated study playlist</p>
            </div>
            <a
              href="https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium flex items-center hover:bg-gray-100 transition-colors"
            >
              <Music className="mr-2 h-5 w-5" />
              Play on Spotify
            </a>
          </div>
        </div>
        
        {/* Premium Features Info */}
        <div className="bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">You have Premium Access!</h3>
              <p className="mt-1 text-gray-800">Enjoy all features including AI Tools, Notes, and Comparisons</p>
            </div>
            <Trophy className="h-12 w-12 text-gray-900 flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Bookmark className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Bookmarks
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {bookmarks.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Notes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {notes.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Comparisons
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {comparisons.length}/3
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Bot className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      AI Access
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      Premium
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">
          {/* Recent Notes */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Notes
            </h2>
            {notes.length > 0 ? (
              <div className="space-y-3">
                {notes.slice(0, 3).map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">{note.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{note.course}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(note.lastModified?.toDate?.() || note.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                <button
                  onClick={() => openModal('notes')}
                  className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-center py-2"
                >
                  View All Notes
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Library className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">No notes yet</p>
                <button
                  onClick={() => openModal('notes')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                >
                  Create Your First Note
                </button>
              </div>
            )}
          </div>

          {/* Bookmarked Items */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Bookmarked Items
            </h2>
            {bookmarks.length > 0 ? (
              <div className="space-y-3">
                {bookmarks.slice(0, 3).map((bookmark) => (
                  <div key={bookmark.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">{bookmark.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{bookmark.type}</p>
                  </div>
                ))}
                <button
                  onClick={() => openModal('bookmarks')}
                  className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-center py-2"
                >
                  View All Bookmarks
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No bookmarks yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Comparison and Pathway */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">
          {/* Comparison */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Item Comparison ({comparisons.length}/3)
            </h2>
            {comparisons.length > 0 ? (
              <div className="space-y-3">
                {comparisons.map((comp) => {
                  const getItemData = (id, type) => {
                    switch (type) {
                      case 'course':
                        return courseData.find(item => item.id === id);
                      case 'lab':
                        return labsData.find(item => item.id === id);
                      case 'resource':
                        return updatedPremiumResources.find(item => item.id === id);
                      case 'game':
                        return gamesData.find(item => item.id === id);
                      default:
                        return null;
                    }
                  };
                  
                  const item = getItemData(comp.id, comp.type);
                  return item ? (
                    <div key={`${comp.id}-${comp.type}`} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{comp.type}</p>
                    </div>
                  ) : null;
                })}
                <button
                  onClick={() => openModal('comparison')}
                  className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-center py-2"
                >
                  View Comparison
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No items selected for comparison</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const Home = () => {
  const { darkMode, setCurrentPage } = usePage();
  const { user, isPremium } = useAuth();
  const { openModal } = useModal();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Welcome to <span className="text-blue-600">ImpactMojo</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your platform for development learning and tools. Explore courses, labs, games, and AI-powered tools to enhance your impact.
          </p>
          <button
            onClick={() => setCurrentPage('ai-tools')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors mt-6"
          >
            Explore AI Tools
          </button>
        </div>
        
        {/* Study Music - Fixed colors */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-4 sm:p-6 text-white mb-8 mt-12">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold">Lo-Fi Study Beats</h2>
              <p className="mt-1">Focus better with our curated study playlist</p>
            </div>
            <a
              href="https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium flex items-center hover:bg-gray-100 transition-colors"
            >
              <Music className="mr-2 h-5 w-5" />
              Play on Spotify
            </a>
          </div>
        </div>
        
        {/* Premium Features Info */}
        <div className="bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">You have Premium Access!</h3>
              <p className="mt-1 text-gray-800">Enjoy all features including AI Tools, Notes, and Comparisons</p>
            </div>
            <Trophy className="h-12 w-12 text-gray-900 flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Tools Page Component
const AIToolsPage = () => {
  const { darkMode } = usePage();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Sign in to access AI Tools
            </h1>
            <button
              onClick={signInWithGoogle}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">AI Tools</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Powerful AI-powered tools for development professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updatedPremiumResources.map((tool) => (
            <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Bot className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Launch Tool
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Courses Page Component
const CoursesPage = () => {
  const { darkMode } = usePage();
  const { toggleComparison, isInComparison, addBookmark, removeBookmark, isBookmarked } = useAuth();

  const handleBookmark = (course) => {
    const bookmarkItem = { ...course, type: 'course' };
    if (isBookmarked(course.id)) {
      removeBookmark(course.id);
    } else {
      addBookmark(bookmarkItem);
    }
  };

  const handleCompare = (course) => {
    const compareItem = { ...course, type: 'course' };
    toggleComparison(compareItem);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Courses</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Comprehensive learning materials on development topics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookmark(course)}
                    className={`p-2 rounded-full ${
                      isBookmarked(course.id)
                        ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    aria-label="Bookmark course"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleCompare(course)}
                    className={`p-2 rounded-full ${
                      isInComparison(course.id)
                        ? 'text-blue-500 bg-blue-100 dark:bg-blue-900'
                        : 'text-gray-400 hover:text-blue-500'
                    }`}
                    aria-label="Add to comparison"
                  >
                    <Target className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{course.track}</span>
                <a
                  href={course.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  View Course
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Labs Page Component
const LabsPage = () => {
  const { darkMode } = usePage();
  const { toggleComparison, isInComparison, addBookmark, removeBookmark, isBookmarked } = useAuth();

  const handleBookmark = (lab) => {
    const bookmarkItem = { ...lab, type: 'lab' };
    if (isBookmarked(lab.id)) {
      removeBookmark(lab.id);
    } else {
      addBookmark(bookmarkItem);
    }
  };

  const handleCompare = (lab) => {
    const compareItem = { ...lab, type: 'lab' };
    toggleComparison(compareItem);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Labs</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Interactive learning experiences and practical tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labsData.map((lab) => (
            <div key={lab.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{lab.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookmark(lab)}
                    className={`p-2 rounded-full ${
                      isBookmarked(lab.id)
                        ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    aria-label="Bookmark lab"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleCompare(lab)}
                    className={`p-2 rounded-full ${
                      isInComparison(lab.id)
                        ? 'text-blue-500 bg-blue-100 dark:bg-blue-900'
                        : 'text-gray-400 hover:text-blue-500'
                    }`}
                    aria-label="Add to comparison"
                  >
                    <Target className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{lab.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{lab.category}</span>
                <a
                  href={lab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Open Lab
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
  const { toggleComparison, isInComparison, addBookmark, removeBookmark, isBookmarked } = useAuth();

  const handleBookmark = (game) => {
    const bookmarkItem = { ...game, type: 'game' };
    if (isBookmarked(game.id)) {
      removeBookmark(game.id);
    } else {
      addBookmark(bookmarkItem);
    }
  };

  const handleCompare = (game) => {
    const compareItem = { ...game, type: 'game' };
    toggleComparison(compareItem);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Games</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Interactive games for development learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesData.map((game) => (
            <div key={game.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Gamepad2 className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{game.title}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookmark(game)}
                    className={`p-2 rounded-full ${
                      isBookmarked(game.id)
                        ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    aria-label="Bookmark game"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleCompare(game)}
                    className={`p-2 rounded-full ${
                      isInComparison(game.id)
                        ? 'text-blue-500 bg-blue-100 dark:bg-blue-900'
                        : 'text-gray-400 hover:text-blue-500'
                    }`}
                    aria-label="Add to comparison"
                  >
                    <Target className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{game.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{game.category}</span>
                <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{game.difficulty}</span>
              </div>
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                Play Game
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Cornell Notes Modal Component
const CornellNotesModal = ({ isOpen, onClose }) => {
  const { notes, addNote, updateNote, deleteNote } = useAuth();
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [noteForm, setNoteForm] = useState({
    title: '',
    course: '',
    topic: '',
    mainNotes: '',
    cues: '',
    summary: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedNote(null);
      setIsCreating(false);
      setNoteForm({
        title: '',
        course: '',
        topic: '',
        mainNotes: '',
        cues: '',
        summary: ''
      });
    }
  }, [isOpen]);

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedNote(null);
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setIsCreating(false);
    setNoteForm({
      title: note.title || '',
      course: note.course || '',
      topic: note.topic || '',
      mainNotes: note.mainNotes || '',
      cues: note.cues || '',
      summary: note.summary || ''
    });
  };

  const handleSave = async () => {
    if (!noteForm.title.trim()) {
      alert('Please enter a title for your note');
      return;
    }

    if (selectedNote) {
      await updateNote(selectedNote.id, noteForm);
    } else {
      await addNote(noteForm);
    }

    setIsCreating(false);
    setSelectedNote(null);
    setNoteForm({
      title: '',
      course: '',
      topic: '',
      mainNotes: '',
      cues: '',
      summary: ''
    });
  };

  const handleDelete = async () => {
    if (selectedNote && window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(selectedNote.id);
      setSelectedNote(null);
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-7xl w-full h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cornell Notes</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Close notes"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Notes List */}
          <div className="w-1/3 border-r dark:border-gray-700 p-4 overflow-y-auto">
            <div className="mb-4">
              <button
                onClick={handleCreateNew}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </button>
            </div>
            
            <div className="space-y-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleSelectNote(note)}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    selectedNote?.id === note.id
                      ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">{note.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{note.course}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(note.lastModified?.toDate?.() || note.lastModified).toLocaleDateString()}
                  </p>
                </div>
              ))}
              
              {notes.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No notes yet. Create your first note!
                </p>
              )}
            </div>
          </div>

          {/* Note Editor */}
          <div className="flex-1 p-4">
            {(selectedNote || isCreating) ? (
              <div className="h-full flex flex-col">
                {/* Note Header */}
                <div className="mb-4 space-y-2">
                  <input
                    type="text"
                    placeholder="Note Title"
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                    className="w-full text-lg font-medium border-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Course"
                      value={noteForm.course}
                      onChange={(e) => setNoteForm({ ...noteForm, course: e.target.value })}
                      className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Topic"
                      value={noteForm.topic}
                      onChange={(e) => setNoteForm({ ...noteForm, topic: e.target.value })}
                      className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Cornell Notes Layout */}
                <div className="flex-1 grid grid-cols-4 gap-4">
                  {/* Cues Column */}
                  <div className="col-span-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Cues & Questions</h3>
                    <textarea
                      placeholder="Key points, questions, keywords..."
                      value={noteForm.cues}
                      onChange={(e) => setNoteForm({ ...noteForm, cues: e.target.value })}
                      className="w-full h-full border border-gray-300 dark:border-gray-600 rounded p-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    />
                  </div>

                  {/* Main Notes Column */}
                  <div className="col-span-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notes</h3>
                    <textarea
                      placeholder="Detailed notes, explanations, examples..."
                      value={noteForm.mainNotes}
                      onChange={(e) => setNoteForm({ ...noteForm, mainNotes: e.target.value })}
                      className="w-full h-full border border-gray-300 dark:border-gray-600 rounded p-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    />
                  </div>
                </div>

                {/* Summary Section */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Summary</h3>
                  <textarea
                    placeholder="Summarize the main concepts and key takeaways..."
                    value={noteForm.summary}
                    onChange={(e) => setNoteForm({ ...noteForm, summary: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <div>
                    {selectedNote && (
                      <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Note
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Select a note to view or create a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Comparison Modal Component
const ComparisonModal = ({ isOpen, onClose }) => {
  const { getCurrentComparisons, toggleComparison } = useAuth();
  const comparisons = getCurrentComparisons();
  
  const getItemData = (id, type) => {
    switch (type) {
      case 'course':
        return courseData.find(item => item.id === id);
      case 'lab':
        return labsData.find(item => item.id === id);
      case 'resource':
        return updatedPremiumResources.find(item => item.id === id);
      case 'game':
        return gamesData.find(item => item.id === id);
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Compare Items ({comparisons.length}/3)</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Close comparison"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4">
          {comparisons.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items to compare</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add items to comparison using the compare button on courses, labs, or resources.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisons.map((comp) => {
                const item = getItemData(comp.id, comp.type);
                if (!item) return null;
                
                return (
                  <div key={`${comp.id}-${comp.type}`} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <span className="text-sm text-blue-600 dark:text-blue-400 capitalize">{comp.type}</span>
                      </div>
                      <button
                        onClick={() => toggleComparison(comp)}
                        className="text-red-500 hover:text-red-700 p-1"
                        aria-label="Remove from comparison"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      {comp.type === 'course' && (
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Track: </span>
                          <span className="text-gray-600 dark:text-gray-300">{item.track}</span>
                        </div>
                      )}
                      {comp.type === 'lab' && (
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Category: </span>
                          <span className="text-gray-600 dark:text-gray-300">{item.category}</span>
                        </div>
                      )}
                      {comp.type === 'game' && (
                        <>
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Category: </span>
                            <span className="text-gray-600 dark:text-gray-300">{item.category}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Difficulty: </span>
                            <span className="text-gray-600 dark:text-gray-300">{item.difficulty}</span>
                          </div>
                        </>
                      )}
                      {comp.type === 'resource' && (
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Category: </span>
                          <span className="text-gray-600 dark:text-gray-300">{item.category}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <a
                        href={item.url || item.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        Open {comp.type}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Bookmark Modal Component
const BookmarkModal = ({ isOpen, onClose }) => {
  const { bookmarks, removeBookmark } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bookmarked Items</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Close bookmarks"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookmarks yet</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Bookmark courses, labs, and resources to save them for later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{bookmark.title}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 capitalize mt-1">{bookmark.type}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{bookmark.description}</p>
                      <a
                        href={bookmark.url || bookmark.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium mt-2"
                      >
                        Open {bookmark.type}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                    <button
                      onClick={() => removeBookmark(bookmark.id)}
                      className="text-red-500 hover:text-red-700 p-1 ml-2"
                      aria-label="Remove bookmark"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Feedback Modal Component
const FeedbackModal = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('feedback', feedback);
      formData.append('email', email);
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch('https://formspree.io/f/xpwdvgzp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
        setFeedback('');
        onClose();
      } else {
        alert('There was an error submitting your feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Send Feedback</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Close feedback"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows={5}
              placeholder="Share your thoughts, suggestions, or report any issues..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md font-medium"
            >
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Suggest Course Modal Component
const SuggestCourseModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [track, setTrack] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('track', track);
      formData.append('email', email);
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch('https://formspree.io/f/xpwdvgzp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you for your course suggestion!');
        setTitle('');
        setDescription('');
        setTrack('');
        onClose();
      } else {
        alert('There was an error submitting your suggestion. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('There was an error submitting your suggestion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Suggest a Course</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Close suggestion form"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Gender Equality in Rural Development"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="track" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Suggested Track
            </label>
            <select
              id="track"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select a track</option>
              <option value="Gender & Equity">Gender & Equity</option>
              <option value="Climate & Environment">Climate & Environment</option>
              <option value="Health & Wellbeing">Health & Wellbeing</option>
              <option value="MEL & Evaluation">MEL & Evaluation</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Describe what this course should cover and why it would be valuable..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Global Modal Manager
const GlobalModals = () => {
  const { activeModal, modalData, closeModal } = useModal();

  return (
    <>
      <CornellNotesModal 
        isOpen={activeModal === 'notes'} 
        onClose={closeModal}
      />
      <ComparisonModal 
        isOpen={activeModal === 'comparison'} 
        onClose={closeModal}
      />
      <BookmarkModal 
        isOpen={activeModal === 'bookmarks'} 
        onClose={closeModal}
      />
      <FeedbackModal 
        isOpen={activeModal === 'feedback'} 
        onClose={closeModal}
      />
      <SuggestCourseModal 
        isOpen={activeModal === 'suggest'} 
        onClose={closeModal}
      />
    </>
  );
};

// Global FABs Component
const GlobalFABs = () => {
  const { openModal } = useModal();
  const { getCurrentComparisons } = useAuth();
  const comparisons = getCurrentComparisons();

  return (
    <>
      {/* Bookmark FAB */}
      <button
        onClick={() => openModal('bookmarks')}
        className="fixed bottom-20 right-4 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg z-40"
        aria-label="View bookmarks"
      >
        <Bookmark className="h-6 w-6" />
      </button>

      {/* Compare FAB */}
      <button
        onClick={() => openModal('comparison')}
        className="fixed bottom-20 left-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-40"
        aria-label="Compare items"
      >
        <Target className="h-6 w-6" fill={comparisons.length > 0 ? 'currentColor' : 'none'} />
        {comparisons.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {comparisons.length}
          </span>
        )}
      </button>

      {/* Feedback FAB */}
      <button
        onClick={() => openModal('feedback')}
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-40"
        aria-label="Send feedback"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Suggest Course FAB */}
      <button
        onClick={() => openModal('suggest')}
        className="fixed bottom-4 left-4 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg z-40"
        aria-label="Suggest a course"
      >
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
};

// PWA Install Prompt Component
const PWAInstallPrompt = () => {
  const { showInstallPrompt, handleInstallClick, setShowInstallPrompt } = usePage();

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed top-16 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-40">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Install ImpactMojo</h3>
          <p className="text-sm opacity-90">Get the app experience!</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium"
          >
            Install
          </button>
          <button
            onClick={() => setShowInstallPrompt(false)}
            className="text-white/80 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Content Component
const AppContent = () => {
  const { loading, user } = useAuth();
  const { currentPage, darkMode } = usePage();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <CoursesPage />;
      case 'labs':
        return <LabsPage />;
      case 'games':
        return <GamesPage />;
      case 'ai-tools':
        return <AIToolsPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {renderCurrentPage()}
      <GlobalFABs />
      <GlobalModals />
      <PWAInstallPrompt />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <PageProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </PageProvider>
    </AuthProvider>
  );
}

export default App;
