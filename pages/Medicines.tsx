import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowDownAZ, Stethoscope } from 'lucide-react';
import { MedicineCard } from '../components/MedicineCard';
import { MEDICINES, CATEGORIES } from '../data/medicines';

export const Medicines: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredMedicines = MEDICINES.filter(med => {
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
             <div className="flex items-center gap-2 mb-2 text-medical-600">
                <Stethoscope className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Pharmacy Catalog</span>
             </div>
             <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Medicines</h1>
             <p className="text-slate-500 mt-2 max-w-2xl">
               Browse our extensive catalog of verified medicines. Order online for fast, secure home delivery.
             </p>
          </div>
        </div>

        {/* Sticky Toolbar */}
        <div className="sticky top-20 z-30 mb-8 transition-all duration-300">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-medical-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search medicines..."
                className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Actions */}
            <div className="flex w-full md:w-auto gap-3 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${showFilters ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              
              <div className="h-auto w-px bg-slate-200 mx-1 hidden md:block"></div>

              <div className="flex gap-2">
                 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all whitespace-nowrap">
                    <ArrowDownAZ className="h-4 w-4" />
                    Sort
                 </button>
                 <select 
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-medical-500/20"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                 >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                 </select>
              </div>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-6 animate-fade-in-up">
                <h3 className="font-bold text-slate-900 mb-4">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedCategory === category 
                                ? 'bg-medical-100 text-medical-700' 
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
          )}
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {isLoading ? (
             Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-full">
                    <div className="aspect-[4/3] bg-slate-100 animate-pulse"></div>
                    <div className="p-5 space-y-4">
                    <div className="space-y-2">
                        <div className="h-3 w-1/3 bg-slate-100 rounded animate-pulse"></div>
                        <div className="h-5 w-3/4 bg-slate-100 rounded animate-pulse"></div>
                        <div className="h-5 w-1/2 bg-slate-100 rounded animate-pulse"></div>
                    </div>
                    <div className="h-3 w-1/4 bg-slate-100 rounded animate-pulse"></div>
                    <div className="pt-4 flex justify-between items-center border-t border-slate-50">
                        <div className="h-6 w-16 bg-slate-100 rounded animate-pulse"></div>
                        <div className="h-9 w-24 bg-slate-100 rounded-xl animate-pulse"></div>
                    </div>
                    </div>
                </div>
             ))
          ) : filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No medicines found</h3>
                <p className="text-slate-500">
                    Try adjusting your search or filters to find what you're looking for.
                </p>
                <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="mt-6 text-medical-600 font-bold hover:underline"
                >
                    Clear all filters
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};