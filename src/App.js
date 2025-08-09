// src/App.js - Complete ImpactMojo with ALL components and pages
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Sun, Moon, Search, Bookmark, Heart, MessageCircle, 
  Download, ExternalLink, Play, Pause, SkipForward, Volume2,
  User, LogOut, ChevronRight, Star, Clock, Users, Target,
  Gamepad2, BookOpen, Mail, Phone, Globe, Twitter, Linkedin,
  Github, Coffee, Zap, TrendingUp, Award, Filter, Calendar,
  FileText, BarChart, Settings, ArrowRight, CheckCircle,
  AlertCircle, Info, HelpCircle, Share2, PlayCircle, Scale,
  Lightbulb, Compare, Send, Edit3, Brain, PenTool
} from 'lucide-react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  query, 
  where, 
  getDocs,
  deleteDoc 
} from 'firebase/firestore';

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

// Course Data - ALL 34 courses
const courseData = [
  { id: 'C1', title: 'Development Economics 101', track: 'Policy & Economics', description: 'Core principles of development economics and their practical applications.', level: 'Beginner', duration: '2 hours' },
  { id: 'C2', title: 'Law and Constitution 101', track: 'Policy & Economics', description: 'Understanding legal frameworks and constitutional principles.', level: 'Beginner', duration: '2.5 hours' },
  { id: 'C3', title: 'Climate Science 101', track: 'Research Methods', description: 'Scientific foundations of climate change and environmental systems.', level: 'Beginner', duration: '3 hours' },
  { id: 'C4', title: 'Pedagogy and Education 101', track: 'Research Methods', description: 'Teaching methodologies and educational theory.', level: 'Beginner', duration: '2 hours' },
  { id: 'C5', title: 'Public Health 101', track: 'Policy & Economics', description: 'Fundamentals of public health systems and interventions.', level: 'Beginner', duration: '2.5 hours' },
  { id: 'C6', title: 'Livelihoods 101', track: 'Policy & Economics', description: 'Understanding sustainable livelihood approaches.', level: 'Beginner', duration: '2 hours' },
  { id: 'C7', title: 'Gender Studies 101', track: 'Gender Studies', description: 'Introduction to gender theory and its practical implications.', level: 'Beginner', duration: '3 hours', quote: '"Eye-opening exploration of gender norms."' },
  { id: 'C8', title: "Women's Economic Empowerment 101", track: 'Gender Studies', description: 'Strategies and frameworks for women\'s economic participation.', level: 'Intermediate', duration: '2.5 hours' },
  { id: 'C9', title: 'Participatory Development 101', track: 'Social Impact', description: 'Community-led approaches to development initiatives.', level: 'Intermediate', duration: '2 hours' },
  { id: 'C10', title: 'Understanding Inequality 101', track: 'Justice & Equity', description: 'Explore the roots and manifestations of inequality in South Asian societies.', level: 'Beginner', duration: '2.5 hours' },
  { id: 'C11', title: 'Community Development Strategies', track: 'Social Impact', description: 'Practical approaches to sustainable community development.', level: 'Intermediate', duration: '3 hours' },
  { id: 'C12', title: 'Policy Analysis Framework', track: 'Policy & Economics', description: 'Tools and methods for effective policy analysis and evaluation.', level: 'Advanced', duration: '3.5 hours' },
  { id: 'C13', title: 'Social Justice Theory', track: 'Justice & Equity', description: 'Theoretical foundations of social justice and its applications.', level: 'Intermediate', duration: '2.5 hours' },
  { id: 'C14', title: 'Impact Measurement', track: 'Social Impact', description: 'Methods for measuring and evaluating social impact initiatives.', level: 'Advanced', duration: '3 hours' },
  { id: 'C15', title: 'Microfinance Fundamentals', track: 'Policy & Economics', description: 'Understanding microfinance as a development tool.', level: 'Beginner', duration: '2 hours' },
  { id: 'C16', title: 'Gender and Development', track: 'Gender Studies', description: 'Gender perspectives in development theory and practice.', level: 'Intermediate', duration: '2.5 hours' },
  { id: 'C17', title: 'Research Methodology 101', track: 'Research Methods', description: 'Essential research methods for social impact work.', level: 'Beginner', duration: '3 hours' },
  { id: 'C18', title: 'Data Analysis for Development', track: 'Research Methods', description: 'Statistical analysis techniques for development projects.', level: 'Advanced', duration: '4 hours' },
  { id: 'C19', title: 'Environmental Justice', track: 'Justice & Equity', description: 'Intersection of environmental issues and social justice.', level: 'Intermediate', duration: '2.5 hours' },
  { id: 'C20', title: 'Urban Planning and Development', track: 'Policy & Economics', description: 'Sustainable urban development strategies.', level: 'Advanced', duration: '3.5 hours' },
  { id: 'C21', title: 'Rural Development Approaches', track: 'Social Impact', description: 'Strategies for rural economic and social development.', level: 'Intermediate', duration: '3 hours' },
  { id: 'C22', title: 'Digital Divide and Technology', track: 'Research Methods', description: 'Technology access and digital equity issues.', level: 'Intermediate', duration: '2.5 hours' },
  { id: 'C23', title: 'Healthcare Systems', track: 'Policy & Economics', description: 'Understanding healthcare delivery and policy.', level: 'Advanced', duration: '3.5 hours' },
  { id: 'C24', title: 'Education Policy and Access', track: 'Policy & Economics', description: 'Educational systems and policy frameworks.', level: 'Intermediate', duration: '3 hours' },
  { id: 'C25', title: 'Women in Leadership', track: 'Gender Studies', description: 'Leadership development and gender dynamics.', level: 'Intermediate', duration: '2.5 hours' },
  { id: 'C26', title: 'Youth Development Programs', track: 'Social Impact', description: 'Designing effective youth-focused initiatives.', level: 'Intermediate', duration: '2.5 hours' },
  { id: 'C27', title: 'Financial Inclusion', track: 'Policy & Economics', description: 'Expanding access to financial services.', level: 'Advanced', duration: '3 hours' },
  { id: 'C28', title: 'Conflict Resolution', track: 'Justice & Equity', description: 'Mediation and peacebuilding techniques.', level: 'Advanced', duration: '4 hours' },
  { id: 'C29', title: 'Monitoring and Evaluation', track: 'Research Methods', description: 'M&E frameworks for development projects.', level: 'Advanced', duration: '4 hours' },
  { id: 'C30', title: 'Social Entrepreneurship', track: 'Social Impact', description: 'Building sustainable social enterprises.', level: 'Advanced', duration: '3.5 hours' },
  { id: 'C31', title: 'Human Rights Frameworks', track: 'Justice & Equity', description: 'International human rights law and practice.', level: 'Advanced', duration: '4 hours' },
  { id: 'C32', title: 'Agricultural Development', track: 'Policy & Economics', description: 'Sustainable agriculture and food security.', level: 'Intermediate', duration: '3 hours' },
  { id: 'C33', title: 'Water and Sanitation', track: 'Policy & Economics', description: 'WASH programs and infrastructure development.', level: 'Intermediate', duration: '2.5 hours' },
  { id: 'C34', title: 'Inclusive Design Research', track: 'Research Methods', description: 'User-centered research for inclusive solutions.', level: 'Advanced', duration: '3.5 hours' }
];

// Labs Data
const labsData = [
  { id: 'L1', title: 'Climate Change Timeline', topic: 'Climate', description: 'Interactive timeline of climate resilience efforts.', status: 'Available' },
  { id: 'L2', title: 'Gender Equality Simulator', topic: 'Gender', description: 'Simulate policy impacts on gender equality.', status: 'Available' },
  { id: 'L3', title: 'Economic Mobility Lab', topic: 'Economics', description: 'Explore factors affecting economic mobility.', status: 'Coming Soon' },
  { id: 'L4', title: 'Policy Impact Calculator', topic: 'Policy', description: 'Calculate potential impacts of policy changes.', status: 'Available' },
  { id: 'L5', title: 'Community Mapping Tool', topic: 'Research', description: 'Map community assets and challenges.', status: 'Coming Soon' },
  { id: 'L6', title: 'Budget Allocation Game', topic: 'Economics', description: 'Learn budget priorities through simulation.', status: 'Available' }
];

// AI Tools Data
const aiToolsData = [
  { id: 'AI1', name: 'Policy Brief Generator', description: 'Generate structured policy briefs from your research', category: 'Writing' },
  { id: 'AI2', name: 'Research Question Refiner', description: 'Refine and improve your research questions', category: 'Research' },
  { id: 'AI3', name: 'Data Story Creator', description: 'Turn data insights into compelling narratives', category: 'Analysis' },
  { id: 'AI4', name: 'Grant Proposal Assistant', description: 'Help structure and improve grant proposals', category: 'Writing' },
  { id: 'AI5', name: 'Impact Measurement Framework', description: 'Design frameworks to measure social impact', category: 'Analysis' },
  { id: 'AI6', name: 'Stakeholder Mapping Tool', description: 'Identify and map project stakeholders', category: 'Planning' },
  { id: 'AI7', name: 'Literature Review Helper', description: 'Organize and synthesize academic literature', category: 'Research' },
  { id: 'AI8', name: 'Workshop Facilitator', description: 'Plan and structure workshop sessions', category: 'Planning' }
];

// Authentication Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Load user bookmarks
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setBookmarks(userDoc.data().bookmarks || []);
          }
        } catch (error) {
          console.error('Error loading bookmarks:', error);
        }
      } else {
        setBookmarks([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Create or update user document
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date()
      }, { merge: true });
      
      return user;
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
      throw error;
    }
  };

  const toggleBookmark = async (itemId) => {
    if (!user) return;
    
    try {
      const newBookmarks = bookmarks.includes(itemId)
        ? bookmarks.filter(id => id !== itemId)
        : [...bookmarks, itemId];
      
      setBookmarks(newBookmarks);
      
      await setDoc(doc(db, 'users', user.uid), {
        bookmarks: newBookmarks
      }, { merge: true });
    } catch (error) {
      console.error('Error updating bookmarks:', error);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    bookmarks,
    toggleBookmark
  };

  return (
    <AuthContext.Provider value={value}>
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

// Course Card Component
const CourseCard = ({ course, isBookmarked, onBookmark }) => {
  const { user } = useAuth();

  const handleCourseAccess = () => {
    window.open(`https://101.www.impactmojo.in/${course.id}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {course.id}
          </span>
          {user && (
            <button
              onClick={() => onBookmark(course.id)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <Bookmark 
                className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
              />
            </button>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {course.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
            {course.track}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </span>
        </div>
        
        <button
          onClick={handleCourseAccess}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Start Course</span>
        </button>
      </div>
    </div>
  );
};

// HomePage Component
const HomePage = ({ setCurrentPage }) => {
  const { user } = useAuth();
  
  const featuredCourses = courseData.slice(0, 6);
  const tracks = [
    { name: 'Policy & Economics', color: 'blue', courses: courseData.filter(c => c.track === 'Policy & Economics').length },
    { name: 'Gender Studies', color: 'purple', courses: courseData.filter(c => c.track === 'Gender Studies').length },
    { name: 'Justice & Equity', color: 'green', courses: courseData.filter(c => c.track === 'Justice & Equity').length },
    { name: 'Social Impact', color: 'orange', courses: courseData.filter(c => c.track === 'Social Impact').length },
    { name: 'Research Methods', color: 'red', courses: courseData.filter(c => c.track === 'Research Methods').length }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Zap className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ImpactMojo
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              101 Knowledge Series for Social Impact
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-blue-100">
              A curated library exploring justice, equity, and development in South Asia. 
              Learn from 34 courses, interactive labs, and AI-powered tools.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('courses')}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Courses</span>
            </button>
            {user ? (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('about')}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">34</div>
              <div className="text-gray-600 dark:text-gray-300">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">6</div>
              <div className="text-gray-600 dark:text-gray-300">Interactive Labs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">8</div>
              <div className="text-gray-600 dark:text-gray-300">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">Free</div>
              <div className="text-gray-600 dark:text-gray-300">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Learning Tracks
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map(track => (
              <div key={track.name} className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{track.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{track.courses} courses available</p>
                <button
                  onClick={() => setCurrentPage('courses')}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Explore Track →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Featured Courses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isBookmarked={false}
                onBookmark={() => {}}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentPage('courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Courses Page Component
const CoursesPage = () => {
  const { user, bookmarks, toggleBookmark } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = courseData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = selectedTrack === 'all' || course.track === selectedTrack;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesTrack && matchesLevel;
  });

  const uniqueTracks = [...new Set(courseData.map(course => course.track))];
  const uniqueLevels = [...new Set(courseData.map(course => course.level))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our comprehensive collection of development courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Track</label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Tracks</option>
                {uniqueTracks.map(track => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Levels</option>
                {uniqueLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isBookmarked={bookmarks.includes(course.id)}
              onBookmark={toggleBookmark}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Labs Page Component
const LabsPage = () => {
  const handleLabAccess = (lab) => {
    if (lab.status === 'Available') {
      alert(`${lab.title} - This interactive lab is coming soon!`);
    } else {
      alert(`${lab.title} - Coming Soon!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Labs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hands-on practice with real-world scenarios and simulations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labsData.map(lab => (
            <div key={lab.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {lab.id}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    lab.status === 'Available' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {lab.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {lab.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {lab.description}
                </p>
                
                <div className="mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                    {lab.topic}
                  </span>
                </div>
                
                <button
                  onClick={() => handleLabAccess(lab)}
                  disabled={lab.status !== 'Available'}
                  className={`w-full font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    lab.status === 'Available'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{lab.status === 'Available' ? 'Launch Lab' : 'Coming Soon'}</span>
                </button>
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
  const { user } = useAuth();
  const [selectedTool, setSelectedTool] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [toolOutput, setToolOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToolUse = async () => {
    if (!userInput.trim() || !selectedTool) return;
    
    setIsProcessing(true);
    setToolOutput('');
    
    try {
      // Firebase Cloud Function URL for your project
      const response = await fetch('https://us-central1-impactmojo.cloudfunctions.net/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId: selectedTool.id,
          toolName: selectedTool.name,
          userInput: userInput,
          userId: user?.uid
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      const data = await response.json();
      setToolOutput(data.output || 'Tool processed successfully!');
    } catch (error) {
      console.error('Error using AI tool:', error);
      setToolOutput('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            AI Tools Access
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Please sign in to access our AI-powered tools for development work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI-powered tools to enhance your development work
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tools List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Available Tools</h2>
            <div className="space-y-3">
              {aiToolsData.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedTool?.id === tool.id
                      ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{tool.description}</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                    {tool.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tool Interface */}
          <div className="lg:col-span-2">
            {selectedTool ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {selectedTool.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedTool.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      Your Input
                    </label>
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={`Enter your content for ${selectedTool.name}...`}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <button
                    onClick={handleToolUse}
                    disabled={!userInput.trim() || isProcessing}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Brain className="w-4 h-4" />
                    <span>{isProcessing ? 'Processing...' : `Generate ${selectedTool.name}`}</span>
                  </button>
                  
                  {toolOutput && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Output</label>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border">
                        <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-white">{toolOutput}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select an AI Tool
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose a tool from the left to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Page Component
const DashboardPage = () => {
  const { user, bookmarks } = useAuth();
  const bookmarkedCourses = courseData.filter(course => bookmarks.includes(course.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Welcome back, {user?.displayName}!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bookmarked Courses */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Bookmarked Courses</h2>
            {bookmarkedCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {bookmarkedCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    isBookmarked={true}
                    onBookmark={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No bookmarked courses yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start bookmarking courses you're interested in!
                </p>
              </div>
            )}
          </div>

          {/* Profile & Stats */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Profile</h3>
              <div className="flex items-center space-x-4">
                <img 
                  src={user?.photoURL} 
                  alt={user?.displayName}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{user?.displayName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Bookmarked Courses</span>
                  <span className="font-medium text-gray-900 dark:text-white">{bookmarks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Learning Tracks</span>
                  <span className="font-medium text-gray-900 dark:text-white">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Available Tools</span>
                  <span className="font-medium text-gray-900 dark:text-white">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpwdvgzp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get in touch with the ImpactMojo team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Send us a message</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Message sent successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">hello@impactmojo.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">www.impactmojo.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-blue-600" />
                  <a 
                    href="https://github.com/Varnasr/ImpactMojo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
                  >
                    GitHub Repository
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Office Hours</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/Varnasr/ImpactMojo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About ImpactMojo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            101 Knowledge Series for Social Impact
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              ImpactMojo is a curated library of knowledge decks exploring justice, equity, and development 
              in South Asia. We aim to democratize access to high-quality educational content that helps 
              build understanding of complex social issues and empowers individuals to create positive change 
              in their communities.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">📚 34 Comprehensive Courses</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  From development economics to gender studies, our courses cover essential topics for social impact work.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">🔬 Interactive Labs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Hands-on simulations and tools to practice concepts in real-world scenarios.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">🤖 AI-Powered Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Smart tools to help with research, writing, and analysis for development work.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">🌏 South Asia Focus</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Context-specific content that addresses the unique challenges and opportunities in the region.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Learning Tracks</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-blue-600 dark:text-blue-400">Policy & Economics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Economic theory, policy analysis, and development frameworks
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-purple-600 dark:text-purple-400">Gender Studies</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Gender theory, women's empowerment, and inclusive development
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-green-600 dark:text-green-400">Justice & Equity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Social justice frameworks, inequality analysis, and human rights
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-orange-600 dark:text-orange-400">Social Impact</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Community development, impact measurement, and social innovation
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-red-600 dark:text-red-400">Research Methods</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Research design, data analysis, and evidence-based practice
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Open Source</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              ImpactMojo is released under the MIT License, making it free for everyone to use, modify, and distribute. 
              We believe in the power of open collaboration to improve education and welcome contributions from the community.
            </p>
            <a
              href="https://github.com/Varnasr/ImpactMojo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Github className="w-5 h-5" />
              <span>View Source Code</span>
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              ImpactMojo is an educational resource and does not provide official certifications or endorsements. 
              The content is designed for learning purposes and should be supplemented with formal education and 
              professional development as appropriate for your goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Navigation Component 
const Navigation = ({ darkMode, setDarkMode, currentPage, setCurrentPage }) => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', requiresAuth: false },
    { id: 'courses', label: 'Courses', requiresAuth: false },
    { id: 'labs', label: 'Labs', requiresAuth: false },
    { id: 'dashboard', label: 'Dashboard', requiresAuth: true },
    { id: 'ai-tools', label: 'AI Tools', requiresAuth: true },
    { id: 'contact', label: 'Contact', requiresAuth: false },
    { id: 'about', label: 'About', requiresAuth: false }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-xl font-bold text-blue-600 dark:text-blue-400"
            >
              <Zap className="w-8 h-8" />
              <span>ImpactMojo</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => {
              if (item.requiresAuth && !user) return null;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Authentication */}
            {user ? (
              <div className="flex items-center space-x-3">
                <img 
                  src={user.photoURL} 
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-2">
              {navItems.map(item => {
                if (item.requiresAuth && !user) return null;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Main App Component
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCookieAccept = () => {
    setShowCookieConsent(false);
    localStorage.setItem('cookieConsent', 'true');
  };

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      setShowCookieConsent(false);
    }
  }, []);

  return (
    <AuthProvider>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
          <Navigation 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          
          <main className="pt-0">
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'courses' && <CoursesPage />}
            {currentPage === 'labs' && <LabsPage />}
            {currentPage === 'dashboard' && <DashboardPage />}
            {currentPage === 'ai-tools' && <AIToolsPage />}
            {currentPage === 'contact' && <ContactPage />}
            {currentPage === 'about' && <AboutPage />}
          </main>

          {/* Cookie Consent */}
          {showCookieConsent && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                <div className="flex-1">
                  <p className="text-sm">
                    We use cookies and privacy-friendly analytics to improve your experience. 
                    By continuing to use this site, you agree to our use of cookies.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleCookieAccept}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ImpactMojo is an open-source project. No endorsements or certificates are provided.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 ImpactMojo. Released under MIT License.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;