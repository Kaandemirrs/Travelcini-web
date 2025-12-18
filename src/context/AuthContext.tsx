"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { User as UserProfile } from "@/types/firestore";

type AuthContextValue = {
  user: FirebaseUser | null;
  userData: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function syncUserProfile(firebaseUser: FirebaseUser): Promise<UserProfile> {
  const userRef = doc(db, "users", firebaseUser.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const existingData = snapshot.data() as Partial<UserProfile>;

    await setDoc(
      userRef,
      {
        email: firebaseUser.email ?? existingData.email ?? "",
        displayName: firebaseUser.displayName ?? existingData.displayName ?? null,
        photoURL: firebaseUser.photoURL ?? existingData.photoURL ?? null,
        lastLogin: serverTimestamp(),
      },
      { merge: true }
    );

    const updatedSnapshot = await getDoc(userRef);
    return updatedSnapshot.data() as UserProfile;
  }

  const baseProfile: UserProfile = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    displayName: firebaseUser.displayName ?? null,
    photoURL: firebaseUser.photoURL ?? null,
    bio: "",
    location: "",
    subscriptionStatus: "free",
    tripsCreatedCount: 0,
  };

  await setDoc(userRef, {
    ...baseProfile,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  });

  return baseProfile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setUserData(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const profile = await syncUserProfile(firebaseUser);
        setUserData(profile);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = await syncUserProfile(result.user);
      setUser(result.user);
      setUserData(profile);
    } finally {
      setLoading(false);
    }
  };

  const signupWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const profile = await syncUserProfile(result.user);
      setUser(result.user);
      setUserData(profile);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const profile = await syncUserProfile(result.user);
      setUser(result.user);
      setUserData(profile);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      return;
    }

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, data, { merge: true });

    setUserData((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        ...data,
      };
    });
  };

  const value: AuthContextValue = {
    user,
    userData,
    loading,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
