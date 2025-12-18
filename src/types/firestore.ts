export type SubscriptionStatus = "free" | "pro";

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  bio: string | null;
  location: string | null;
  subscriptionStatus: SubscriptionStatus;
  tripsCreatedCount: number;
}

export interface TripDates {
  startDate: string;
  endDate: string;
}

export interface Trip {
  id: string;
  userId: string;
  destination: string;
  mood: string;
  dates: TripDates;
  isPublic: boolean;
  status: string;
  aiItinerary?: string;
}

