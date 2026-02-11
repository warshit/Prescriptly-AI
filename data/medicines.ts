import { Medicine } from '../types';

export const CATEGORIES = [
  'All', 
  'Fever & Pain Relief', 
  'Antibiotics', 
  'Cold & Cough', 
  'Digestive Health', 
  'Allergy Care', 
  'Skin Care', 
  'Vitamins & Supplements', 
  'Diabetes Care',
  'First Aid',
  'Eye & Ear Care'
];

export const MEDICINES: Medicine[] = [
  // FEVER & PAIN RELIEF
  { 
    id: '1', 
    name: 'Dolo 650', 
    dosage: '650mg', 
    price: 30, 
    category: 'Fever & Pain Relief', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 500,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '2', 
    name: 'Crocin Advance', 
    dosage: '500mg', 
    price: 20, 
    category: 'Fever & Pain Relief', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 450,
    image: 'https://images.unsplash.com/photo-1550572017-4fcd95616d73?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '3', 
    name: 'Combiflam', 
    dosage: '400mg', 
    price: 45, 
    category: 'Fever & Pain Relief', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 300,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '4', 
    name: 'Volini Gel', 
    dosage: '30g', 
    price: 135, 
    category: 'Fever & Pain Relief', 
    requiresPrescription: false,
    form: 'cream',
    inStock: true,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '5', 
    name: 'Meftal Spas', 
    dosage: '500mg', 
    price: 48, 
    category: 'Fever & Pain Relief', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '6', 
    name: 'Voveran Injection', 
    dosage: '1ml', 
    price: 30, 
    category: 'Fever & Pain Relief', 
    requiresPrescription: true,
    form: 'injection',
    inStock: true,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80&w=600'
  },

  // ANTIBIOTICS
  { 
    id: '7', 
    name: 'Azithral 500', 
    dosage: '500mg', 
    price: 120, 
    category: 'Antibiotics', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '8', 
    name: 'Augmentin 625 Duo', 
    dosage: '625mg', 
    price: 200, 
    category: 'Antibiotics', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '9', 
    name: 'Taxim-O 200', 
    dosage: '200mg', 
    price: 110, 
    category: 'Antibiotics', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '10', 
    name: 'Ciplox 500', 
    dosage: '500mg', 
    price: 40, 
    category: 'Antibiotics', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },

  // COLD & COUGH
  { 
    id: '11', 
    name: 'Ascoril D Plus', 
    dosage: '100ml', 
    price: 115, 
    category: 'Cold & Cough', 
    requiresPrescription: false,
    form: 'syrup',
    inStock: true,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '12', 
    name: 'Vicks Vaporub', 
    dosage: '50g', 
    price: 160, 
    category: 'Cold & Cough', 
    requiresPrescription: false,
    form: 'cream',
    inStock: true,
    stock: 300,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '13', 
    name: 'Otrivin Oxy Fast Relief', 
    dosage: '10ml', 
    price: 95, 
    category: 'Cold & Cough', 
    requiresPrescription: false,
    form: 'drops',
    inStock: true,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7f860?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '14', 
    name: 'Cheston Cold', 
    dosage: '10 strips', 
    price: 45, 
    category: 'Cold & Cough', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1550572017-4fcd95616d73?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '15', 
    name: 'Alex Syrup', 
    dosage: '100ml', 
    price: 125, 
    category: 'Cold & Cough', 
    requiresPrescription: false,
    form: 'syrup',
    inStock: true,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '16', 
    name: 'Nasivion Classic', 
    dosage: '10ml', 
    price: 88, 
    category: 'Cold & Cough', 
    requiresPrescription: false,
    form: 'drops',
    inStock: true,
    stock: 110,
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7f860?auto=format&fit=crop&q=80&w=600'
  },

  // DIGESTIVE HEALTH
  { 
    id: '17', 
    name: 'Digene', 
    dosage: '15 tablets', 
    price: 25, 
    category: 'Digestive Health', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 400,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '18', 
    name: 'Gelusil MPS', 
    dosage: '170ml', 
    price: 130, 
    category: 'Digestive Health', 
    requiresPrescription: false,
    form: 'syrup',
    inStock: true,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '19', 
    name: 'Pudin Hara', 
    dosage: '10 pearls', 
    price: 30, 
    category: 'Digestive Health', 
    requiresPrescription: false,
    form: 'capsule',
    inStock: true,
    stock: 350,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '20', 
    name: 'Pantocid 40', 
    dosage: '40mg', 
    price: 150, 
    category: 'Digestive Health', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1550572017-4fcd95616d73?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '21', 
    name: 'Eno Fruit Salt', 
    dosage: '100g', 
    price: 150, 
    category: 'Digestive Health', 
    requiresPrescription: false,
    form: 'other',
    inStock: true,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600'
  },

  // ALLERGY CARE
  { 
    id: '22', 
    name: 'Allegra 120', 
    dosage: '120mg', 
    price: 190, 
    category: 'Allergy Care', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1550572017-4fcd95616d73?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '23', 
    name: 'Okacet', 
    dosage: '10mg', 
    price: 18, 
    category: 'Allergy Care', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 500,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '24', 
    name: 'Avil 25', 
    dosage: '25mg', 
    price: 10, 
    category: 'Allergy Care', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 600,
    image: 'https://images.unsplash.com/photo-1550572017-4fcd95616d73?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '25', 
    name: 'Ctz L', 
    dosage: '5mg', 
    price: 55, 
    category: 'Allergy Care', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },

  // SKIN CARE
  { 
    id: '26', 
    name: 'Betadine Ointment', 
    dosage: '20g', 
    price: 125, 
    category: 'Skin Care', 
    requiresPrescription: false,
    form: 'cream',
    inStock: true,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '27', 
    name: 'Soframycin', 
    dosage: '30g', 
    price: 55, 
    category: 'Skin Care', 
    requiresPrescription: false,
    form: 'cream',
    inStock: true,
    stock: 250,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '28', 
    name: 'Candid-B Cream', 
    dosage: '20g', 
    price: 95, 
    category: 'Skin Care', 
    requiresPrescription: true,
    form: 'cream',
    inStock: true,
    stock: 130,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '29', 
    name: 'Burnol', 
    dosage: '20g', 
    price: 70, 
    category: 'First Aid', 
    requiresPrescription: false,
    form: 'cream',
    inStock: true,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },

  // VITAMINS & SUPPLEMENTS
  { 
    id: '30', 
    name: 'Limcee 500', 
    dosage: '500mg', 
    price: 25, 
    category: 'Vitamins & Supplements', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 600,
    image: 'https://images.unsplash.com/photo-1550572017-4fcd95616d73?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '31', 
    name: 'Becosules Z', 
    dosage: '20 capsules', 
    price: 45, 
    category: 'Vitamins & Supplements', 
    requiresPrescription: false,
    form: 'capsule',
    inStock: true,
    stock: 400,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '32', 
    name: 'Shelcal 500', 
    dosage: '15 tablets', 
    price: 120, 
    category: 'Vitamins & Supplements', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 300,
    image: 'https://images.unsplash.com/photo-1550572017-4fcd95616d73?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '33', 
    name: 'Evion 400', 
    dosage: '400mg', 
    price: 35, 
    category: 'Vitamins & Supplements', 
    requiresPrescription: false,
    form: 'capsule',
    inStock: true,
    stock: 450,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '34', 
    name: 'Neurobion Forte', 
    dosage: '30 tablets', 
    price: 40, 
    category: 'Vitamins & Supplements', 
    requiresPrescription: false,
    form: 'tablet',
    inStock: true,
    stock: 320,
    image: 'https://images.unsplash.com/photo-1550572017-4fcd95616d73?auto=format&fit=crop&q=80&w=600'
  },

  // DIABETES CARE
  { 
    id: '35', 
    name: 'Glycomet 500', 
    dosage: '500mg', 
    price: 25, 
    category: 'Diabetes Care', 
    requiresPrescription: true,
    form: 'tablet',
    inStock: true,
    stock: 250,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '36', 
    name: 'Lantus Solostar Pen', 
    dosage: '100IU/ml', 
    price: 650, 
    category: 'Diabetes Care', 
    requiresPrescription: true,
    form: 'injection',
    inStock: false,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80&w=600'
  },

  // EYE & EAR CARE
  { 
    id: '37', 
    name: 'Ciplox Eye Drops', 
    dosage: '10ml', 
    price: 20, 
    category: 'Eye & Ear Care', 
    requiresPrescription: true,
    form: 'drops',
    inStock: true,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7f860?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '38', 
    name: 'Refresh Tears', 
    dosage: '10ml', 
    price: 130, 
    category: 'Eye & Ear Care', 
    requiresPrescription: false,
    form: 'drops',
    inStock: true,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7f860?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: '39', 
    name: 'Otorex Ear Drops', 
    dosage: '10ml', 
    price: 65, 
    category: 'Eye & Ear Care', 
    requiresPrescription: true,
    form: 'drops',
    inStock: true,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7f860?auto=format&fit=crop&q=80&w=600'
  }
];