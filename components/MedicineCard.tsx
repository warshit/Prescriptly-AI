import React, { useState, useEffect } from 'react';
import { ShoppingBag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Medicine } from '../types';
import { Button } from './Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Remote backups used as the final failsafe
const REMOTE_BACKUPS: Record<string, string> = {
  tablet: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
  capsule: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600',
  syrup: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=600',
  cream: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
  injection: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZmRmYSIvPjxyZWN0IHg9IjgwIiB5PSI2MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjgwIiByeD0iNSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMGQ5NDg4IiBzdHJva2Utd2lkdGg9IjQiLz48cmVjdCB4PSI3MCIgeT0iNTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIxMCIgcng9IjIiIGZpbGw9IiMwZDk0ODgiLz48cGF0aCBkPSJNOTAgODAgTDExMCA4MCIgc3Ryb2tlPSIjMTRiOGE2IiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNOTAgMTAwIEwxMTAgMTAwIiBzdHJva2U9IiMxNGI4YTYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik05MCAxMjAgTDExMCAxMjAiIHN0cm9rZT0iIzE0YjhhNiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
  drops: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZmRmYSIvPjxwYXRoIGQ9Ik0xMDAgNDAgTDEwMCAxNjAiIHN0cm9rZT0iIzBkOTQ4OCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtZGFzaGFycmF5PSI1LDUiLz48cGF0aCBkPSJNMTAwIDYwIEMxMDAgNjAgNjAgMTEwIDYwIDE0MCBBNDAgNDAgMCAwIDAgMTQwIDE0MCBDMTQwIDExMCAxMDAgNjAgMTAwIDYwIFoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzBkOTQ4OCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTQwIiByPSIxNSIgZmlsbD0iIzE0YjhhNiIvPjwvc3ZnPg==',
  other: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600',
};

interface MedicineCardProps {
  medicine: Medicine;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const formKey = (medicine.form || 'other').toLowerCase();
  
  // Define image paths according to priority strategy
  const categoryPath = `/images/medicine-types/${formKey}.png`;
  const defaultPath = `/images/medicine-types/default.png`;
  const remoteBackup = REMOTE_BACKUPS[formKey] || REMOTE_BACKUPS['other'];

  const [imgSrc, setImgSrc] = useState<string>('');
  const [fallbackStage, setFallbackStage] = useState<'specific' | 'category' | 'default' | 'remote'>('specific');
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Default to true if not specified
  const inStock = medicine.inStock !== false;

  useEffect(() => {
    if (medicine.image) {
      setImgSrc(medicine.image);
      setFallbackStage('specific');
    } else {
      setImgSrc(categoryPath);
      setFallbackStage('category');
    }
  }, [medicine, categoryPath]);

  const handleError = () => {
    if (fallbackStage === 'specific') {
      setImgSrc(categoryPath);
      setFallbackStage('category');
    } else if (fallbackStage === 'category') {
      setImgSrc(defaultPath);
      setFallbackStage('default');
    } else if (fallbackStage === 'default') {
      setImgSrc(remoteBackup);
      setFallbackStage('remote');
    }
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate('/login', { 
        state: { 
          from: location, 
          message: "Please log in to add items to your cart" 
        } 
      });
      return;
    }

    addToCart(medicine);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <article className={`group relative flex flex-col h-full bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
      inStock 
        ? 'border-slate-200 hover:border-medical-300 hover:shadow-lg hover:-translate-y-1' 
        : 'border-slate-100 opacity-80'
    }`}>
      
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center">
        <img 
          src={imgSrc} 
          alt={medicine.name} 
          onError={handleError}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            inStock ? 'group-hover:scale-110' : 'grayscale opacity-70'
          }`}
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
           {medicine.requiresPrescription ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-amber-700 border border-amber-200/50 shadow-sm backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
              <AlertCircle className="h-3 w-3" />
              Rx
            </span>
           ) : <span />}

           {!inStock && (
             <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-900/90 text-white shadow-sm backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
               Out of Stock
             </span>
           )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-5">
        
        {/* Header */}
        <div className="mb-2">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1 block">
            {medicine.category}
          </span>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-medical-700 transition-colors leading-snug line-clamp-2 min-h-[2.5rem]" title={medicine.name}>
            {medicine.name}
          </h3>
        </div>

        {/* Stock Status - Explicit requirement */}
        <div className="mb-4">
           {inStock ? (
             <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
               <span className="text-xs font-medium text-emerald-700">In Stock</span>
             </div>
           ) : (
             <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
               <span className="text-xs font-medium text-slate-400">Unavailable</span>
             </div>
           )}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-slate-900">
            ₹{medicine.price}
          </span>
          
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`
              flex-1 max-w-[120px] rounded-xl transition-all duration-300 shadow-md 
              ${inStock 
                ? (isAdded ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-medical-600 hover:bg-medical-700 hover:shadow-lg hover:shadow-medical-500/20 text-white')
                : 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed border-transparent'
              }
            `}
          >
            {inStock ? (
              isAdded ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 mr-2" />
                  <span className="text-xs font-bold">Added</span>
                </>
              ) : (
                <>
                  <span className="text-xs font-bold mr-2">Add</span>
                  <ShoppingBag className="h-3.5 w-3.5" />
                </>
              )
            ) : (
              <span className="text-xs font-bold">Sold Out</span>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
};