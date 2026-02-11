import React from 'react';

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  price: number;
  category: string;
  image?: string; // Made optional to support fallback strategy
  requiresPrescription: boolean;
  form: 'tablet' | 'capsule' | 'syrup' | 'cream' | 'injection' | 'drops' | 'other';
  frequency?: string;
  inStock?: boolean;
  stock?: number;
}

export interface CartItem extends Medicine {
  quantity: number;
}

export interface ScannedItem {
  id: string;
  name: string; // The name returned by AI or the matched product name
  matchedMedicine?: Medicine; // If we found a match in our DB
  quantity: number;
  addedToCart: boolean;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}