import React from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, ShoppingBag, ArrowLeft, Package } from 'lucide-react';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { items: cartItems, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  const deliveryFee = 49;
  const freeDeliveryThreshold = 500;
  const isFreeDelivery = subtotal > freeDeliveryThreshold;
  const total = subtotal + (isFreeDelivery ? 0 : deliveryFee);

  // Empty State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 relative">
          <ShoppingBag className="h-10 w-10 text-slate-300" />
          <div className="absolute top-0 right-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-slate-400 font-bold text-lg">0</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8 max-w-sm text-center">
          Looks like you haven't added any medicines yet. Browse our catalog to find what you need.
        </p>
        <Link to="/medicines">
          <Button size="lg" className="shadow-lg shadow-medical-500/20">
            Browse Medicines
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
            <p className="text-slate-500 mt-1">Review your selected medicines before checkout</p>
          </div>
          <button 
             onClick={() => {
                if(window.confirm("Are you sure you want to remove all items from your cart?")) {
                    clearCart();
                }
             }}
             className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
          >
             <Trash2 className="h-4 w-4" />
             Clear Cart
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm transition-all hover:border-medical-200 hover:shadow-md flex flex-col sm:flex-row gap-6"
              >
                {/* Image */}
                <div className="w-full sm:w-28 h-28 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative group">
                  <img 
                    src={item.image || '/images/medicine-types/default.png'} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[10px] font-bold uppercase bg-slate-900 text-white px-2 py-1 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">{item.category}</span>
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.name}</h3>
                      </div>
                      <div className="text-right">
                         <span className="font-bold text-slate-900 text-lg">₹{(item.price * item.quantity)}</span>
                         {item.quantity > 1 && (
                            <div className="text-xs text-slate-400 font-medium">₹{item.price} / unit</div>
                         )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                       <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-700 capitalize">
                         {item.form}
                       </span>
                       <span className="text-slate-300">•</span>
                       <span>{item.dosage}</span>
                       
                       {item.requiresPrescription && (
                         <>
                           <span className="text-slate-300">•</span>
                           <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                             Rx Required
                           </span>
                         </>
                       )}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
                    <div className="flex items-center gap-6">
                      {/* Quantity Control */}
                      <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 p-0.5">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-medical-600 disabled:opacity-50 disabled:hover:text-slate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 text-center font-bold text-slate-900 text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-medical-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-red-500 transition-colors group"
                      >
                        <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-6">
               <Link to="/medicines" className="inline-flex items-center gap-2 text-sm font-medium text-medical-600 hover:text-medical-700 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
               </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</span>
                  <span className="font-medium text-slate-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-sm">
                  <span className="flex items-center gap-1">
                    Delivery Fee
                    {isFreeDelivery && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded-sm font-bold">FREE</span>
                    )}
                  </span>
                  <span className="font-medium text-slate-900">
                    {isFreeDelivery ? <span className="line-through text-slate-400 mr-2">₹{deliveryFee}</span> : null}
                    {isFreeDelivery ? '₹0' : `₹${deliveryFee}`}
                  </span>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-slate-100 my-2"></div>

                <div className="flex justify-between items-end">
                  <span className="text-slate-900 font-bold">Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-medical-700 leading-none">
                      ₹{total}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                      Includes taxes & fees
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  fullWidth 
                  size="lg" 
                  className="shadow-lg shadow-medical-500/20 py-4 text-base"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-medical-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <strong>Secure Transaction:</strong> Your health data and payment information are encrypted with 256-bit SSL technology.
                  </p>
                </div>
              </div>

              {/* Promo code area (Visual Only) */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                 <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-slate-600 hover:text-medical-600 transition-colors list-none">
                       <span>Have a promo code?</span>
                       <Plus className="h-4 w-4 transition-transform group-open:rotate-45" />
                    </summary>
                    <div className="mt-3 flex gap-2">
                       <input 
                         type="text" 
                         placeholder="Enter code" 
                         className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-medical-500/20"
                       />
                       <Button variant="secondary" size="sm" className="bg-white">Apply</Button>
                    </div>
                 </details>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};