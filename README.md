# Prescriptly AI - Intelligent Online Pharmacy Platform

![Prescriptly AI](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Firebase](https://img.shields.io/badge/Firebase-12.8.0-orange)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Integrated-purple)

## 🎯 Project Overview

Prescriptly AI is a modern, AI-powered online pharmacy platform that revolutionizes the way users order medicines. Built with React, TypeScript, and powered by Google's Gemini AI, it offers an intelligent prescription analysis system, contextual chatbot assistance, and a seamless shopping experience.

### 🌟 Key Features

#### 1. **AI-Powered Prescription Analysis**
- Upload prescription images (JPG, PNG, PDF)
- Automatic medicine extraction using Gemini AI
- Intelligent matching with inventory database
- Detailed prescription analysis (patient info, dosage, instructions)
- Dynamic medicine availability (all prescribed medicines guaranteed available)

#### 2. **Contextual AI Chatbot**
- Prescription-aware conversations
- Voice input support (microphone integration)
- Medicine recommendations based on symptoms
- Dosage and usage instructions
- Cart management through natural language
- Medicine interaction warnings
- Alternative medicine suggestions

#### 3. **Secure Authentication**
- Firebase Authentication integration
- Email/Password authentication
- Google Sign-In
- Protected routes for sensitive operations
- Mock authentication fallback for demo purposes
- Session persistence

#### 4. **Smart Shopping Cart**
- Add medicines from prescription scan
- Manual medicine browsing and selection
- Quantity management
- Real-time price calculation
- Prescription requirement validation
- Cart persistence across sessions

#### 5. **Comprehensive Medicine Catalog**
- 39+ medicines across 11 categories
- Detailed medicine information (dosage, form, price)
- Stock availability tracking
- Prescription requirement indicators
- Category-based filtering
- Search functionality



## 📁 Project Structure

```
prescriptly/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Custom button component
│   ├── Chatbot.tsx      # AI chatbot with voice input
│   ├── Footer.tsx       # Footer with legal links
│   ├── MedicineCard.tsx # Medicine display card
│   ├── Navbar.tsx       # Navigation bar
│   └── ProtectedRoute.tsx # Route authentication wrapper
│
├── config/
│   └── firebase.ts      # Firebase configuration
│
├── context/             # Global state management
│   ├── AuthContext.tsx  # Authentication state
│   ├── CartContext.tsx  # Shopping cart state
│   └── PrescriptionContext.tsx # Prescription data
│
├── data/
│   └── medicines.ts     # Medicine inventory database
│
├── pages/               # Application pages
│   ├── Cart.tsx         # Shopping cart page
│   ├── Checkout.tsx     # Checkout process
│   ├── Home.tsx         # Landing page
│   ├── Legal.tsx        # Legal pages (Privacy, Terms, etc.)
│   ├── Login.tsx        # Login page
│   ├── Medicines.tsx    # Medicine catalog
│   ├── Payment.tsx      # Payment processing
│   ├── Signup.tsx       # User registration
│   └── Upload.tsx       # Prescription upload & analysis
│
├── public/              # Static assets
│   └── images/          # Medicine images
│
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Google AI Studio API key (Gemini)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/warshit/Prescriptly-AI.git
cd Prescriptly-AI
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🎨 Features in Detail

### Prescription Upload Flow
1. User uploads prescription image
2. Gemini AI analyzes image and extracts:
   - Medicine names
   - Dosage information
   - Frequency instructions
   - Doctor and patient details
3. System matches medicines with inventory
4. Creates dynamic entries for unavailable medicines
5. Stores prescription context for chatbot
6. User can add medicines to cart with one click

### AI Chatbot Capabilities
- **Prescription Queries**: "What medicines are in my prescription?"
- **Dosage Information**: "How much Paracetamol should I take?"
- **Medicine Search**: "Do you have medicine for headache?"
- **Cart Management**: "Add all my prescription medicines to cart"
- **Interactions**: "Can I take these medicines together?"
- **Alternatives**: "Do you have a generic version?"
- **Voice Commands**: Speak naturally to interact

### Authentication Features
- Secure email/password registration
- Google OAuth integration
- Protected routes for:
  - Prescription upload
  - Shopping cart
  - Checkout process
- Automatic session management
- Mock authentication for testing

## 🔒 Security Features

- Firebase Authentication for secure user management
- Protected routes with authentication checks
- Secure API key management via environment variables
- Input validation and sanitization
- HTTPS-only Firebase connections
- No sensitive data in client-side code

## 📊 Medicine Categories

1. **Fever & Pain Relief** - Paracetamol, Ibuprofen, Pain gels
2. **Antibiotics** - Azithromycin, Amoxicillin (Prescription required)
3. **Cold & Cough** - Syrups, Nasal drops, Tablets
4. **Digestive Health** - Antacids, Digestive enzymes
5. **Allergy Care** - Antihistamines, Allergy relief
6. **Skin Care** - Antiseptic creams, Ointments
7. **Vitamins & Supplements** - Multivitamins, Calcium, Vitamin C
8. **Diabetes Care** - Metformin, Insulin (Prescription required)
9. **First Aid** - Burn relief, Wound care
10. **Eye & Ear Care** - Eye drops, Ear drops
11. **Other Categories** - Specialized medicines

## 🎯 User Journey

### New User
1. Visit homepage → Browse medicines
2. Sign up with email or Google
3. Upload prescription (optional)
4. Chat with AI for recommendations
5. Add medicines to cart
6. Proceed to checkout

### Returning User
1. Login with credentials
2. View previous prescriptions (context maintained)
3. Quick reorder from prescription
4. Chat with AI about medicine queries
5. Complete purchase

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Component-based architecture
- Reusable utility functions
- Consistent naming conventions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



---

**Built with ❤️ using React, TypeScript, and AI**

*Prescriptly AI - Making healthcare accessible, one prescription at a time.*
