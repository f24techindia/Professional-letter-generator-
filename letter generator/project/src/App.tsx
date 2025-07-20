import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminCourses from './pages/Admin/Courses';
import AdminUsers from './pages/Admin/Users';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const RoleBasedRedirect: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" />;
    case 'instructor':
      return <Navigate to="/instructor" />;
    case 'student':
      return <Navigate to="/student" />;
    default:
      return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RoleBasedRedirect />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="instructors" element={<div>Instructors Management</div>} />
            <Route path="enrollments" element={<div>Enrollments Management</div>} />
            <Route path="categories" element={<div>Categories Management</div>} />
            <Route path="analytics" element={<div>Analytics</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          <Route path="/instructor" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<div>Instructor Dashboard</div>} />
            <Route path="courses" element={<div>My Courses</div>} />
            <Route path="students" element={<div>My Students</div>} />
            <Route path="performance" element={<div>Performance</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          <Route path="/student" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<div>Student Dashboard</div>} />
            <Route path="courses" element={<div>My Courses</div>} />
            <Route path="browse" element={<div>Browse Courses</div>} />
            <Route path="progress" element={<div>My Progress</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;