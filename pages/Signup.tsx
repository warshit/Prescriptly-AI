import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, ShieldCheck, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export const Signup: React.FC = () => {
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await signup(formData.email, formData.password);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      await googleSignIn();
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-slate-400 text-sm mt-2">Join Prescriptly for a seamless pharmacy experience</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-sm text-red-600 animate-fade-in-up">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none transition-all text-sm"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none transition-all text-sm"
                  placeholder="At least 6 characters"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none transition-all text-sm"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              className="py-2.5 shadow-lg bg-slate-900 hover:bg-slate-800"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-4 focus:ring-slate-100 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group"
          >
             <svg className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>

          <div className="mt-8 text-center pt-2">
             <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4">
                <ShieldCheck className="h-3 w-3" />
                <span>Verified & Secure</span>
            </div>
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-medical-600 hover:text-medical-700">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};