"use client";

import { addDoc, collection, doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { User } from "@/types/firestore";

export async function saveTrip(tripData: any) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const userRef = doc(db, "users", currentUser.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    throw new Error("USER_NOT_FOUND");
  }

  const user = userSnapshot.data() as User;

  if (user.subscriptionStatus === "free" && user.tripsCreatedCount >= 1) {
    const limitError = new Error("LIMIT_REACHED");
    throw limitError;
  }

  const tripsRef = collection(db, "trips");

  await addDoc(tripsRef, {
    ...tripData,
    userId: currentUser.uid,
    createdAt: serverTimestamp(),
    status: "active",
    isPublic: false,
  });

  await updateDoc(userRef, {
    tripsCreatedCount: increment(1),
  });
}

