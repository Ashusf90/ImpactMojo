import React, { useContext } from 'react';

// CORRECTED IMPORTS: Using standard relative paths starting with './'
import { PageProvider, AuthProvider, usePage } from './context/AppContext.js';
import { 
    HomePage, CoursesPage, LabsPage, GamesPage, ResourcesPage, 
    AboutPage, FAQPage, DashboardPage, AIToolsPage 
} from './pages/index.js';
import { 
    Navigation, ImprovedFloatingActionButtons, Footer 
} from './components/index.js';

// The main App component remains clean and acts as a controller.
function App() {
  const { currentPage } = usePage();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'courses': return <CoursesPage />;
      case 'labs': return <LabsPage />;
      case 'games': return <GamesPage />;
      case 'resources': return <ResourcesPage />;
      case 'about': return <AboutPage />;
      case 'faq': return <FAQPage />;
      case 'dashboard': return <DashboardPage />;
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

// The final component that wraps the entire app in the necessary providers.
const AppWithProviders = () => (
  <AuthProvider>
    <PageProvider>
      <App />
    </PageProvider>
  </AuthProvider>
);

export default AppWithProviders;

