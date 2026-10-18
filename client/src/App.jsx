import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import Layout from './components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/Common/ErrorBoundary';

// Lazy loading pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const LoginPage = React.lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/Auth/RegisterPage'));
const PracticePage = React.lazy(() => import('./pages/Practice/PracticePage'));
const MockTestPage = React.lazy(() => import('./pages/MockTest/MockTestPage'));
const BookmarksPage = React.lazy(() => import('./pages/Bookmarks/BookmarksPage'));
const YearPapersPage = React.lazy(() => import('./pages/YearPapers/YearPapersPage'));
const ProfilePage = React.lazy(() => import('./pages/Profile/ProfilePage'));
const RoadmapPage = React.lazy(() => import('./pages/Roadmap/RoadmapPage'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Toaster position="top-right" />
              <React.Suspense fallback={<div className="loading-screen">Loading NIMCET Prep Pro...</div>}>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="practice" element={<PracticePage />} />
                    <Route path="mock-test" element={<MockTestPage />} />
                    <Route path="bookmarks" element={<BookmarksPage />} />
                    <Route path="year-papers" element={<YearPapersPage />} />
                    <Route path="roadmap" element={<RoadmapPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                  </Route>
                </Routes>
              </React.Suspense>
            </Router>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
