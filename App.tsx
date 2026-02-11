import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Medicines } from './pages/Medicines';
import { Upload } from './pages/Upload';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { Privacy, Terms, Returns, Help } from './pages/Legal';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { CartProvider } from './context/CartContext';
import { PrescriptionProvider } from './context/PrescriptionContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <PrescriptionProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/medicines" element={<Medicines />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Protected Routes */}
                  <Route 
                    path="/upload" 
                    element={
                      <ProtectedRoute>
                        <Upload />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/checkout" 
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/cart" 
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    } 
                  />

                  <Route path="/payment" element={<Payment />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/help" element={<Help />} />
                </Routes>
              </main>
              <Footer />
              <Chatbot />
            </div>
          </Router>
        </PrescriptionProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;