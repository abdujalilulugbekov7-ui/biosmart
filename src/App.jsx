import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DialogProvider } from './context/DialogContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DigitalLibrary from './pages/DigitalLibrary';
import BookReader from './pages/BookReader';
import TestEngine from './pages/TestEngine';
import Analytics from './pages/Analytics';
import AdminDashboard from './pages/AdminDashboard';
import AdminQuestionBank from './pages/AdminQuestionBank';
import MistakesReview from './pages/MistakesReview';
import Settings from './pages/Settings';
import Premium from './pages/Premium';
import './App.css';

function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DialogProvider>
        <AuthProvider>
          <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/library" element={
              <ProtectedRoute>
                <MainLayout>
                  <DigitalLibrary />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/library/read/:topicId" element={
              <ProtectedRoute>
                <MainLayout>
                  <BookReader />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/library/mistakes" element={
              <ProtectedRoute>
                <MainLayout>
                  <MistakesReview />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/test/:topicId" element={
              <ProtectedRoute>
                <MainLayout>
                  <TestEngine />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/analytics" element={
              <ProtectedRoute>
                <MainLayout>
                  <Analytics />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/premium" element={
              <ProtectedRoute>
                <MainLayout>
                  <Premium />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <MainLayout>
                  <AdminDashboard />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/questions" element={
              <ProtectedRoute adminOnly>
                <MainLayout>
                  <AdminQuestionBank />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
      </DialogProvider>
    </ThemeProvider>
  );
}
