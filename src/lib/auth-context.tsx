"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

// Demo user tipi
interface DemoUser {
  email: string;
  uid: string;
}

interface AuthContextType {
  user: User | DemoUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isDemo: boolean;
  isDemoUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo modu için sabit kullanıcı bilgileri
const DEMO_EMAIL = "demo@pergamon.com";
const DEMO_PASSWORD = "demo123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | DemoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemo = !isFirebaseConfigured;

  useEffect(() => {
    // Demo session kontrolü (Firebase aktif olsa bile)
    const savedUser = localStorage.getItem("demo_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
      return;
    }

    if (isDemo) {
      setLoading(false);
      return;
    }

    // Firebase Auth listener
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [isDemo]);

  const signIn = async (email: string, password: string) => {
    if (isDemo) {
      // Demo modu: sabit kullanıcı bilgileri ile giriş
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        const demoUser: DemoUser = { email: DEMO_EMAIL, uid: "demo-user-id" };
        localStorage.setItem("demo_user", JSON.stringify(demoUser));
        setUser(demoUser);
      } else {
        throw { code: "auth/invalid-credential" };
      }
      return;
    }
    
    if (auth) {
      await signInWithEmailAndPassword(auth, email, password);
    }
  };

  const signOut = async () => {
    if (isDemoUser) {
      localStorage.removeItem("demo_user");
      setUser(null);
      return;
    }
    
    if (auth) {
      await firebaseSignOut(auth);
    }
  };

  const isDemoUser = user !== null && "uid" in user && user.uid === "demo-user-id";

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isDemo, isDemoUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

