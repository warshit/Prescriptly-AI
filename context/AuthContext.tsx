import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  User as FirebaseUser 
} from 'firebase/auth';

// Use Firebase User type
export type User = FirebaseUser;

interface AuthContextType {
  currentUser: User | null;
  googleSignIn: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMockAuth, setIsMockAuth] = useState(false);

  // Initialize auth state listener
  useEffect(() => {
    if (!auth) {
        console.warn("Firebase Auth not initialized (missing config). Using Mock Authentication for demo purposes.");
        setIsMockAuth(true);
        setLoading(false);
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // --- Mock User Generator ---
  const createMockUser = (email: string): any => ({
    uid: 'mock-' + Math.random().toString(36).substr(2, 9),
    email: email,
    displayName: email.split('@')[0],
    emailVerified: true,
    isAnonymous: false,
    providerData: [],
    metadata: {
        creationTime: new Date().toISOString(),
        lastSignInTime: new Date().toISOString(),
    },
    refreshToken: '',
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => 'mock-token',
    getIdTokenResult: async () => ({
        token: 'mock-token',
        signInProvider: 'password',
        claims: {},
        authTime: new Date().toISOString(),
        issuedAtTime: new Date().toISOString(),
        expirationTime: new Date().toISOString(),
        signInSecondFactor: null,
        iss: 'mock',
        sub: 'mock',
        aud: 'mock',
        iat: 0,
        exp: 0
    }),
    reload: async () => {},
    toJSON: () => ({}),
    phoneNumber: null,
    photoURL: `https://ui-avatars.com/api/?name=${email.substring(0, 2)}&background=0D9488&color=fff`,
    providerId: 'firebase',
  });

  const googleSignIn = async () => {
    if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockUser = createMockUser('demo-user@gmail.com');
        mockUser.displayName = 'Demo User';
        setCurrentUser(mockUser);
        return;
    }

    if (!auth || !googleProvider) {
        throw new Error("Google Sign-In is unavailable. Please check your Firebase configuration.");
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Google Sign In Error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in popup was closed. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Sign-in popup was blocked by your browser. Please allow popups and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('Another sign-in popup is already open.');
      }
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = createMockUser(email);
        setCurrentUser(mockUser);
        return;
    }

    if (!auth) throw new Error("Authentication service is unavailable. Please check your Firebase configuration.");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Signup Error:", error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password must be at least 6 characters long.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      }
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = createMockUser(email);
        setCurrentUser(mockUser);
        return;
    }

    if (!auth) throw new Error("Authentication service is unavailable. Please check your Firebase configuration.");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      }
      throw error;
    }
  };

  const logout = async () => {
    if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentUser(null);
        return;
    }

    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout Error:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    googleSignIn,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};