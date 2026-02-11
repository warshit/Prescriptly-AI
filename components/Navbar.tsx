import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Pill, ShoppingCart, Menu, X, LogIn, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { currentUser, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Medicines', path: '/medicines' },
    { name: 'Upload Prescription', path: '/upload' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-medical-600 p-1.5 rounded-lg group-hover:bg-medical-700 transition-colors">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Prescriptly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-medical-600'
                    : 'text-slate-600 hover:text-medical-600'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Cart Icon */}
            <div className="pl-4 border-l border-slate-200">
              <Link to="/cart" className="group p-2 text-slate-600 hover:text-medical-600 transition-colors">
                <div className="relative inline-block">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-1 ring-white group-hover:scale-110 transition-transform">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="text-xs text-right hidden lg:block">
                  <p className="text-slate-500">Hello,</p>
                  <p className="font-bold text-slate-900 max-w-[120px] truncate">{currentUser.displayName || currentUser.email?.split('@')[0]}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                  <LogIn className="h-4 w-4" />
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="group p-2 mr-2 text-slate-600">
                <div className="relative inline-block">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-1 ring-white">
                      {itemCount}
                    </span>
                  )}
                </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-medical-600 hover:bg-slate-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-medical-50 text-medical-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-medical-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-slate-100 my-2"></div>
            
            {currentUser ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-xs text-slate-500">Signed in as</p>
                  <p className="font-bold text-slate-900 truncate">{currentUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-slate-900 hover:bg-slate-100"
              >
                <LogIn className="h-4 w-4" />
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};