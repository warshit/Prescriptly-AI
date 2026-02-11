import React, { createContext, useContext, useState } from 'react';
import { ScannedItem } from '../types';

interface PrescriptionContextType {
  lastScannedItems: ScannedItem[];
  setLastScannedItems: (items: ScannedItem[]) => void;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export const PrescriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastScannedItems, setLastScannedItems] = useState<ScannedItem[]>([]);

  return (
    <PrescriptionContext.Provider value={{ lastScannedItems, setLastScannedItems }}>
      {children}
    </PrescriptionContext.Provider>
  );
};

export const usePrescription = () => {
  const context = useContext(PrescriptionContext);
  if (context === undefined) {
    throw new Error('usePrescription must be used within a PrescriptionProvider');
  }
  return context;
};