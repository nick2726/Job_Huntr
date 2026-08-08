import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIChatBot from './components/AIChatBot';
import ATSMatcher from './components/ATSMatcher';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Internships from './pages/Internships';
import Profile from './pages/Profile';
import CompanyDetails from './pages/CompanyDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/ats-scanner" element={<ATSMatcher />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/companies/:id" element={<CompanyDetails />} />
          </Routes>
        </main>
        
        {/* Global AI Chat Bot */}
        <AIChatBot />
      </div>
    </Router>
  );
}

export default App;
