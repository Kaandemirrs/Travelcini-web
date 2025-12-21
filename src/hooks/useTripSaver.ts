"use client";

import { addDoc, collection, deleteDoc, doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
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

export async function updateTrip(tripId: string, tripData: any) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const tripRef = doc(db, "trips", tripId);
  const tripSnapshot = await getDoc(tripRef);

  if (!tripSnapshot.exists()) {
    throw new Error("TRIP_NOT_FOUND");
  }

  const data = tripSnapshot.data() as any;

  if (data.userId !== currentUser.uid) {
    throw new Error("FORBIDDEN");
  }

  await updateDoc(tripRef, {
    ...tripData,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTrip(tripId: string) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const tripRef = doc(db, "trips", tripId);
  const tripSnapshot = await getDoc(tripRef);

  if (!tripSnapshot.exists()) {
    throw new Error("TRIP_NOT_FOUND");
  }

  const data = tripSnapshot.data() as any;

  if (data.userId !== currentUser.uid) {
    throw new Error("FORBIDDEN");
  }

  await deleteDoc(tripRef);
}
