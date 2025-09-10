import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

// --- Firebase Configuration ---
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
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// --- Context Definitions ---
export const PageContext = createContext();
export const AuthContext = createContext();

// --- Custom Hooks to access context easily ---
export const usePage = () => useContext(PageContext);
export const useAuth = () => useContext(AuthContext);

// --- Provider Components to wrap the app ---
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const value = { user, loading, signIn: () => signInWithPopup(auth, googleProvider), signOut: () => firebaseSignOut(auth) };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  useEffect(() => {
    document.documentElement.className = darkMode ? 'dark' : '';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const value = { currentPage, setCurrentPage, darkMode, toggleDarkMode };
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

