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

        // Do NOT restore mock sessions automatically on startup.
        // Require explicit sign-in to create a mock session for demo/testing.
        setLoading(false);
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      // Persist user session logic is handled automatically by Firebase Auth
      if (user) {
        localStorage.setItem('prescriptly_user_uid', user.uid);
      } else {
        localStorage.removeItem('prescriptly_user_uid');
      }
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
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        const mockUser = createMockUser('demo-user@gmail.com');
        mockUser.displayName = 'Demo User';
        setCurrentUser(mockUser);
        // Do NOT persist mock user to localStorage to avoid auto-login on startup
        return;
    }

    if (!auth || !googleProvider) {
        throw new Error("Authentication service is unavailable (missing configuration).");
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign In Error:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = createMockUser(email);
        setCurrentUser(mockUser);
        // Do NOT persist mock user to localStorage to avoid auto-login on startup
        return;
    }

    if (!auth) throw new Error("Authentication service is unavailable.");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = createMockUser(email);
        setCurrentUser(mockUser);
        // Do NOT persist mock user to localStorage to avoid auto-login on startup
        return;
    }

    if (!auth) throw new Error("Authentication service is unavailable.");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (isMockAuth) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentUser(null);
        // No persisted mock user to remove (we don't persist mock sessions)
        return;
    }

    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
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