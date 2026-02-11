import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Home, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';

export const Payment: React.FC = () => {
  const { clearCart, subtotal } = useCart();
  const [status, setStatus] = useState<'processing' | 'success'>('processing');

  // Pricing Logic Reuse
  const deliveryFee = 49;
  const freeDeliveryThreshold = 500;
  const isFreeDelivery = subtotal > freeDeliveryThreshold;
  const finalDeliveryFee = isFreeDelivery ? 0 : deliveryFee;
  const total = subtotal + finalDeliveryFee;

  useEffect(() => {
    // Simulate payment processing time
    const timer = setTimeout(() => {
      setStatus('success');
      clearCart();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Decorative Top */}
        <div className="h-2 bg-gradient-to-r from-medical-400 to-medical-600"></div>

        <div className="p-8 text-center">
          
          {status === 'processing' ? (
            <div className="py-10">
              <div className="relative w-20 h-20 mx-auto mb-6">
                 <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-medical-500 rounded-full border-t-transparent animate-spin"></div>
                 <Loader2 className="absolute inset-0 m-auto h-8 w-8 text-medical-600 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Processing Payment</h2>
              <p className="text-slate-500 text-sm">
                Please wait while we securely process your payment of <span className="font-bold text-slate-900">₹{total}</span>
              </p>
              <div className="mt-8 flex justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4" />
                <span>256-bit SSL Encrypted Connection</span>
              </div>
            </div>
          ) : (
            <div className="py-6 animate-fade-in-up">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Thank you for your purchase. Your order has been placed successfully and will be delivered shortly.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left border border-slate-100">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Order ID</span>
                    <span className="font-mono font-bold text-slate-900">#PRES-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Amount Paid</span>
                    <span className="font-bold text-emerald-700">₹{total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/">
                    <Button fullWidth size="lg">
                        <Home className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
                <Link to="/medicines">
                    <Button variant="ghost" fullWidth size="lg">
                        Continue Shopping
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};