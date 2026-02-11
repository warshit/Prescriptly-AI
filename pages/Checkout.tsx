import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, MapPin, Truck, CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

interface FormData {
  fullName: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface FormErrors {
  [key: string]: string;
}

export const Checkout: React.FC = () => {
  const { items, subtotal, isInitialized } = useCart();
  const navigate = useNavigate();
  
  // Pricing Logic (Consistent with Cart)
  const deliveryFee = 49;
  const freeDeliveryThreshold = 500;
  const isFreeDelivery = subtotal > freeDeliveryThreshold;
  const finalDeliveryFee = isFreeDelivery ? 0 : deliveryFee;
  const total = subtotal + finalDeliveryFee;

  // Form State
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow spaces in text fields, only numbers in mobile/pin
    if ((name === 'mobile' || name === 'pincode') && !/^\d*$/.test(value)) {
        return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof FormData]);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    const trimmedValue = value.trim();
    
    switch (name) {
      case 'fullName':
        if (!trimmedValue) error = 'Full name is required';
        else if (trimmedValue.length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'mobile':
        if (!trimmedValue) error = 'Mobile number is required';
        else if (!/^\d{10}$/.test(trimmedValue)) error = 'Enter a valid 10-digit mobile number';
        break;
      case 'address':
        if (!trimmedValue) error = 'Address is required';
        else if (trimmedValue.length < 10) error = 'Please enter a complete address';
        break;
      case 'city':
        if (!trimmedValue) error = 'City is required';
        break;
      case 'state':
        if (!trimmedValue) error = 'State is required';
        break;
      case 'pincode':
        if (!trimmedValue) error = 'Pincode is required';
        else if (!/^\d{6}$/.test(trimmedValue)) error = 'Enter a valid 6-digit pincode';
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const fieldValid = validateField(key, formData[key as keyof FormData]);
      if (!formData[key as keyof FormData]) {
         newErrors[key] = 'This field is required';
         isValid = false;
      } else if (!fieldValid) {
         isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    setTouched({
        fullName: true, mobile: true, address: true, city: true, state: true, pincode: true
    });

    if (isValid) {
      // Navigate to payment simulation
      navigate('/payment');
    } else {
       // Scroll to top error
       const firstError = document.querySelector('.text-red-500');
       if (firstError) {
           firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
       }
    }
  };

  // LOADING STATE: Wait for Cart Context to initialize from LocalStorage
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
             <Loader2 className="h-8 w-8 text-medical-600 animate-spin" />
             <p className="text-slate-500 font-medium">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // EMPTY STATE: Only show if initialized AND empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Truck className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Checkout Unavailable</h1>
        <p className="text-slate-500 mb-8 text-center max-w-sm">
          Your cart is empty. Please add medicines before proceeding to checkout.
        </p>
        <Link to="/medicines">
          <Button>Browse Medicines</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Link */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-medical-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Secure Checkout</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Forms */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Section 1: Delivery Address */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="bg-medical-50 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-medical-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Delivery Details</h2>
              </div>
              
              <div className="p-6 md:p-8">
                <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all ${errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-medical-500 focus:ring-medical-500/20'}`}
                      placeholder="e.g. Rahul Sharma"
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.fullName}</p>}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">+91</span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={10}
                        className={`block w-full pl-12 pr-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all ${errors.mobile ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-medical-500 focus:ring-medical-500/20'}`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.mobile && <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.mobile}</p>}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Pincode <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={6}
                      className={`block w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all ${errors.pincode ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-medical-500 focus:ring-medical-500/20'}`}
                      placeholder="e.g. 400001"
                    />
                    {errors.pincode && <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.pincode}</p>}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Flat, House no., Building, Company, Apartment <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all ${errors.address ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-medical-500 focus:ring-medical-500/20'}`}
                      placeholder="e.g. 102, Green Valley Apts, MG Road"
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.address}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">City <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all ${errors.city ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-medical-500 focus:ring-medical-500/20'}`}
                      placeholder="e.g. Mumbai"
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.city}</p>}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">State <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all ${errors.state ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-medical-500 focus:ring-medical-500/20'}`}
                      placeholder="e.g. Maharashtra"
                    />
                    {errors.state && <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.state}</p>}
                  </div>

                </form>
              </div>
            </section>

            {/* Section 2: Order Review */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="bg-medical-50 p-2 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-medical-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Review Items</h2>
              </div>
              
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex gap-4 items-center">
                    {/* Tiny Image */}
                    <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image || '/images/medicine-types/default.png'} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{item.dosage} • {item.form}</p>
                    </div>

                    {/* Price & Qty */}
                    <div className="text-right">
                       <p className="font-bold text-slate-900 text-sm">₹{item.price * item.quantity}</p>
                       <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Summary (Sticky) */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
             <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Payment Details</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span className="flex items-center gap-1">
                      Delivery Charges
                      {isFreeDelivery && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded-sm font-bold">FREE</span>}
                    </span>
                    <span className="font-medium text-slate-900">
                      {isFreeDelivery ? <span className="line-through text-slate-400 mr-2">₹{deliveryFee}</span> : null}
                      {isFreeDelivery ? '₹0' : `₹${deliveryFee}`}
                    </span>
                  </div>
                   <div className="flex justify-between text-slate-600 text-sm">
                    <span>Taxes (Included)</span>
                    <span className="font-medium text-slate-900">₹0</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mb-6">
                   <div className="flex justify-between items-end">
                      <span className="text-base font-bold text-slate-900">Total Amount</span>
                      <span className="text-2xl font-extrabold text-medical-700">₹{total}</span>
                   </div>
                </div>

                <Button 
                    type="submit" 
                    form="checkout-form"
                    fullWidth 
                    size="lg" 
                    className="shadow-xl shadow-medical-500/20 py-3.5"
                >
                    Proceed to Payment
                    <CreditCard className="ml-2 h-4 w-4" />
                </Button>

                <div className="mt-6 flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <ShieldCheck className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-500 leading-relaxed">
                        By proceeding, you agree to our Terms of Service. Your personal information is securely processed.
                    </p>
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};