import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  const { getUser, user, loading } = useAuthStore();
  
  useEffect(() => {
    getUser();
  }, [getUser]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/dashboard" 
              element={user ? <DashboardPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/create" 
              element={user ? <CreatePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/edit" 
              element={user ? <EditPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/history" 
              element={user ? <HistoryPage /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;