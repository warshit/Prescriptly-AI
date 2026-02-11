import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle, Loader2, Plus, Minus, Search, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { MEDICINES } from '../data/medicines';
import { Medicine, ScannedItem } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePrescription } from '../context/PrescriptionContext';

export const Upload: React.FC = () => {
  const { addToCart: globalAddToCart } = useCart();
  const { setLastScannedItems } = usePrescription();
  
  // Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis State
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    // Reset states when a new file is chosen
    setFile(selectedFile);
    setScanComplete(false);
    setScannedItems([]);
    setScanError(null);
  };

  const resetUpload = () => {
    setFile(null);
    setScanComplete(false);
    setScannedItems([]);
    setScanError(null);
  };

  // ----------------------------------------------------------------------
  // AI ANALYSIS LOGIC
  // ----------------------------------------------------------------------
  const analyzePrescription = async () => {
    if (!file) return;

    setIsScanning(true);
    setScanError(null);

    try {
      // 1. Initialize Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // 2. Prepare the prompt context
      const inventoryList = MEDICINES.map(m => m.name).join(', ');

      // 3. Convert image to Base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
           const result = reader.result as string;
           const base64 = result.split(',')[1];
           resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // 4. Call Gemini API
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { mimeType: file.type, data: base64Data } },
            { 
              text: `
                Analyze this prescription image. 
                I have the following medicines in my store inventory: "${inventoryList}".

                Task:
                1. Identify all distinct medicines listed in the prescription.
                2. For each medicine found, check if it matches one of my inventory items (fuzzy match is okay).
                3. If it matches, use the EXACT name from my inventory list in the 'matches' array.
                4. If it does not match, put the name as written on the prescription in the 'others' array.
                5. Ignore dosage and frequency instructions for the name, unless part of the product name.

                Return a strict JSON object.
              `
            }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matches: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of medicine names that exactly match the provided inventory list"
              },
              others: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                 description: "List of medicine names found in the image but not in the inventory"
              }
            }
          }
        }
      });

      // 5. Parse Results
      const resultText = response.text;
      if (!resultText) throw new Error("No data returned from AI");
      
      const result = JSON.parse(resultText);
      const newItems: ScannedItem[] = [];

      // HELPER: Dynamic Medicine Creator
      // Enforces Universal Availability Rule
      const createPrescriptionMedicine = (name: string, existingMed?: Medicine): Medicine => {
        if (existingMed) {
            // If it exists in DB, use its details but FORCE availability
            return {
                ...existingMed,
                inStock: true, // Always true for prescription items
                stock: existingMed.stock && existingMed.stock > 0 ? existingMed.stock : 999
            };
        } else {
            // If not in DB, create a dynamic entry
            return {
                id: `dynamic-${Math.random().toString(36).substr(2, 9)}`,
                name: name,
                dosage: 'As prescribed',
                price: 149, // Placeholder price
                category: 'Prescription Medicine',
                image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600', // Generic image
                requiresPrescription: true,
                form: 'tablet', // Default form assumption
                inStock: true, // Always available
                stock: 999
            };
        }
      };

      // Process matched items (Found in DB)
      if (result.matches && Array.isArray(result.matches)) {
        result.matches.forEach((name: string) => {
          const med = MEDICINES.find(m => m.name.toLowerCase() === name.toLowerCase());
          // Even if matched, we pass it through creator to ensure stock=true
          const finalMed = createPrescriptionMedicine(name, med);
          
          newItems.push({
            id: `match-${Math.random().toString(36).substr(2, 9)}`,
            name: finalMed.name,
            matchedMedicine: finalMed,
            quantity: 1,
            addedToCart: false
          });
        });
      }

      // Process other items (Not in DB) - Now treated as AVAILABLE
      if (result.others && Array.isArray(result.others)) {
        result.others.forEach((name: string) => {
           const finalMed = createPrescriptionMedicine(name);
           newItems.push({
              id: `other-${Math.random().toString(36).substr(2, 9)}`,
              name: name,
              matchedMedicine: finalMed,
              quantity: 1,
              addedToCart: false
           });
        });
      }

      if (newItems.length === 0) {
        setScanError("We couldn't identify any clear medicine names. Please try a clearer image.");
      } else {
        setScannedItems(newItems);
        // Sync with global context
        setLastScannedItems(newItems);
        setScanComplete(true);
      }

    } catch (err) {
      console.error(err);
      setScanError("Failed to analyze the prescription. Please ensure the image is clear and try again.");
    } finally {
      setIsScanning(false);
    }
  };

  // ----------------------------------------------------------------------
  // ITEM MANIPULATION LOGIC
  // ----------------------------------------------------------------------
  const updateQuantity = (id: string, delta: number) => {
    setScannedItems(items => items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const addToCart = (id: string) => {
    const item = scannedItems.find(i => i.id === id);
    if (item && item.matchedMedicine) {
        globalAddToCart(item.matchedMedicine, item.quantity);
        setScannedItems(items => items.map(i => {
          if (i.id === id) {
            return { ...i, addedToCart: true };
          }
          return i;
        }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Upload Prescription</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
            Our AI will scan your prescription, automatically match medicines, and prepare your cart.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-500">
        <div className="p-8 md:p-12">
          
          {/* STATE 1: FILE UPLOAD AREA */}
          {!file && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                ${isDragging 
                  ? 'border-medical-500 bg-medical-50 scale-[1.01]' 
                  : 'border-slate-200 hover:border-medical-300 hover:bg-slate-50'
                }
              `}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
              
              <div className="w-20 h-20 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UploadIcon className={`h-10 w-10 text-medical-600 transition-transform duration-300 ${isDragging ? '-translate-y-1' : ''}`} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Click to upload or drag & drop
              </h3>
              <p className="text-slate-500 mb-6">
                Supported formats: JPG, PNG, PDF (Max 5MB)
              </p>
              
              <div className="inline-flex items-center gap-2 text-xs text-medical-600 bg-medical-50 px-3 py-1 rounded-full font-medium">
                <FileText className="h-3 w-3" />
                <span>AI-Powered Analysis Enabled</span>
              </div>
            </div>
          )}

          {/* STATE 2: FILE SELECTED & SCANNING */}
          {file && !scanComplete && (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden">
                <FileText className="h-10 w-10 text-slate-400" />
                {isScanning && (
                    <div className="absolute inset-0 bg-medical-500/10 flex items-center justify-center">
                        <div className="w-full h-1 bg-medical-500/50 absolute top-0 animate-[scan_1.5s_ease-in-out_infinite]"></div>
                    </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{file.name}</h3>
              <p className="text-slate-500 mb-8">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              {scanError && (
                 <div className="max-w-md mx-auto mb-8 bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-left">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700">{scanError}</p>
                 </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                    variant="secondary" 
                    onClick={resetUpload}
                    disabled={isScanning}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={analyzePrescription} 
                    disabled={isScanning}
                    className="min-w-[160px]"
                >
                    {isScanning ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Scanning...
                        </>
                    ) : (
                        <>
                            <Search className="h-4 w-4 mr-2" />
                            Scan Prescription
                        </>
                    )}
                </Button>
              </div>

              {isScanning && (
                <p className="text-xs text-slate-400 mt-6 animate-pulse">
                    Analyzing image & checking availability...
                </p>
              )}
            </div>
          )}

          {/* STATE 3: RESULTS DASHBOARD */}
          {scanComplete && (
            <div className="animate-fade-in-up">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Analysis Complete</h2>
                        <p className="text-sm text-slate-500">We found the following medicines in your prescription</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetUpload} className="text-slate-500">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Scan Another
                    </Button>
                </div>

                {/* Unified Available List */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold text-sm uppercase tracking-wider">
                        <CheckCircle2 className="h-4 w-4" />
                        Ready to Order
                    </div>
                    <div className="space-y-4">
                        {scannedItems.map((item) => (
                            <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-white hover:border-medical-200 transition-colors shadow-sm">
                                {/* Image Thumb */}
                                <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                                    <img 
                                        src={item.matchedMedicine?.image || '/images/medicine-types/default.png'} 
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {/* Info */}
                                <div className="flex-1 text-center md:text-left w-full md:w-auto">
                                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {item.matchedMedicine?.dosage}
                                        </span>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full capitalize">
                                            {item.matchedMedicine?.form}
                                        </span>
                                        {item.matchedMedicine?.category === 'Prescription Medicine' && (
                                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold border border-blue-100">
                                                Special Order
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-medical-600 font-bold mt-2">
                                        ₹{item.matchedMedicine?.price}
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                    {/* Qty */}
                                    <div className="flex items-center border border-slate-200 rounded-lg h-10">
                                        <button 
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="px-3 hover:bg-slate-50 text-slate-600 h-full rounded-l-lg transition-colors"
                                            disabled={item.addedToCart}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="px-3 hover:bg-slate-50 text-slate-600 h-full rounded-r-lg transition-colors"
                                            disabled={item.addedToCart}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>

                                    {/* Add Button */}
                                    <Button 
                                        onClick={() => addToCart(item.id)}
                                        disabled={item.addedToCart}
                                        className={`min-w-[140px] transition-all duration-300 ${item.addedToCart ? 'bg-emerald-600 border-emerald-600 hover:bg-emerald-700' : ''}`}
                                    >
                                        {item.addedToCart ? (
                                            <>
                                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                                Added
                                            </>
                                        ) : (
                                            <>
                                                Add to Cart
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Transparency Note */}
                <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-8">
                     <Sparkles className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                     <p className="text-sm text-emerald-800 leading-relaxed">
                        <strong>Good news!</strong> All medicines from your prescription are available with us.
                     </p>
                </div>

                {/* Actions Footer */}
                <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <Link to="/cart">
                        <Button variant="outline" className="gap-2">
                            Go to Cart
                            <ArrowRight className="h-4 w-4" />
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