import React, { useContext } from 'react';

// CORRECTED IMPORTS: Using explicit relative paths to ensure the compiler finds the files.
import { PageProvider, AuthProvider, usePage, useAuth } from './context/AppContext.js';
import { 
    HomePage, CoursesPage, LabsPage, GamesPage, ResourcesPage, 
    AboutPage, FAQPage, DashboardPage, AIToolsPage 
} from './pages/index.js';
import { 
    Navigation, ImprovedFloatingActionButtons, Footer 
} from './components/index.js';

// The main App component remains clean.
function App() {
  const { currentPage } = usePage();
  const { user } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'courses': return <CoursesPage />;
      case 'labs': return <LabsPage />;
      case 'games': return <GamesPage />;
      case 'resources': return <ResourcesPage />;
      case 'about': return <AboutPage />;
      case 'faq': return <FAQPage />;
      case 'dashboard': return <DashboardPage user={user} />; 
      case 'ai-tools': return <AIToolsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navigation />
      <main>{renderPage()}</main>
      <ImprovedFloatingActionButtons />
      <Footer />
    </div>
  );
}

// The final component that wraps the entire app.
const AppWithProviders = () => (
  <AuthProvider>
    <PageProvider>
      <App />
    </PageProvider>
  </AuthProvider>
);

export default AppWithProviders;

