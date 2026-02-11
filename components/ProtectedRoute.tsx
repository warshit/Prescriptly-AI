import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 text-medical-600 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location, message: "Please log in to continue" }} replace />;
  }

  return <>{children}</>;
};