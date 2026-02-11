import React, { createContext, useContext, useState } from 'react';
import { ScannedItem } from '../types';

interface PrescriptionData {
  imageBase64?: string;
  fileName?: string;
  uploadedAt?: Date;
  analysisText?: string;
}

interface PrescriptionContextType {
  lastScannedItems: ScannedItem[];
  setLastScannedItems: (items: ScannedItem[]) => void;
  prescriptionData: PrescriptionData | null;
  setPrescriptionData: (data: PrescriptionData | null) => void;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export const PrescriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastScannedItems, setLastScannedItems] = useState<ScannedItem[]>([]);
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionData | null>(null);

  return (
    <PrescriptionContext.Provider value={{ 
      lastScannedItems, 
      setLastScannedItems,
      prescriptionData,
      setPrescriptionData
    }}>
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