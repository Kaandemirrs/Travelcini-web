"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import type { Trip } from "@/types/firestore";

type TripWithMeta = Trip & {
  createdAt?: { seconds: number; nanoseconds: number };
  mood?: string;
};

const moodImages: Record<string, string> = {
  Nature: "/images/card1.jpeg",
  City: "/images/card2.jpeg",
  Beach: "/images/card3.jpeg",
  Adventure: "/images/card4.jpeg",
};

function getTripImage(mood?: string) {
  if (!mood) {
    return "/images/trips.jpeg";
  }

  return moodImages[mood] ?? "/images/trips.jpeg";
}

function formatDateRange(trip: TripWithMeta) {
  if (!trip.dates || !trip.dates.startDate || !trip.dates.endDate) {
    return "Flexible dates";
  }

  const start = new Date(trip.dates.startDate);
  const end = new Date(trip.dates.endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Flexible dates";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  const startLabel = start.toLocaleDateString(undefined, options);
  const endLabel = end.toLocaleDateString(undefined, options);

  return `${startLabel} - ${endLabel}`;
}

export default function TripsList() {
  const { user } = useAuth();
  const router = useRouter();
  const [trips, setTrips] = useState<TripWithMeta[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const tripsRef = collection(db, "trips");
    const tripsQuery = query(tripsRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(tripsQuery, (snapshot) => {
      const next: TripWithMeta[] = [];

      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data() as any;

        next.push({
          id: docSnapshot.id,
          userId: data.userId,
          destination: data.destination ?? "",
          mood: data.mood ?? "",
          dates: data.dates ?? { startDate: "", endDate: "" },
          isPublic: data.isPublic ?? false,
          status: data.status ?? "active",
          createdAt: data.createdAt,
        });
      });
      next.sort((a, b) => {
        const aTime = a.createdAt?.seconds ?? 0;
        const bTime = b.createdAt?.seconds ?? 0;
        return bTime - aTime;
      });

      setTrips(next);
    });

    return unsubscribe;
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
              History
            </p>
            <h2 className="text-2xl font-semibold text-[#14183E] md:text-3xl">
              Your Adventures
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Manage your planned journeys and revisit your saved trips.
            </p>
          </div>
        </div>

        {trips.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-200 bg-white px-6 py-8 text-center text-sm text-neutral-500">
            Your created trips will appear here once you save them.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trips.map((trip) => {
              const imageSrc = getTripImage(trip.mood);
              const dateRange = formatDateRange(trip);
              const isActive = trip.status === "active";

              return (
                <article
                  key={trip.id}
                  className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_24px_50px_rgba(0,0,0,0.06)]"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={trip.destination || "Trip cover"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between px-4 py-4">
                    <div className="mb-3 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold text-[#14183E] md:text-base">
                          {trip.destination || "Untitled destination"}
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F4FF] px-2 py-0.5 text-[11px] font-medium text-[#0073D9]">
                          <span
                            className={`inline-block h-1.5 w-1.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-neutral-400"
                            }`}
                          />
                          <span>{isActive ? "Active" : "Archived"}</span>
                        </span>
                      </div>
                      {trip.mood && (
                        <p className="text-xs text-neutral-500">
                          Mood: {trip.mood}
                        </p>
                      )}
                      <p className="text-xs text-neutral-500">{dateRange}</p>
                    </div>

                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const params = new URLSearchParams();
                          params.set("plan", "1");
                          params.set("step", "4");
                          params.set("tripId", trip.id);

                          if (trip.destination) {
                            params.set("destination", trip.destination);
                          }

                          if (trip.mood) {
                            params.set("mood", trip.mood);
                          }

                          if (trip.dates?.startDate) {
                            params.set("startDate", trip.dates.startDate);
                          }

                          if (trip.dates?.endDate) {
                            params.set("endDate", trip.dates.endDate);
                          }

                          router.push(`/trips?${params.toString()}`);
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-[#0073D9] px-4 py-1.5 text-xs font-medium text-white shadow-sm shadow-[#0073D9]/30 transition hover:-translate-y-0.5 hover:bg-[#005fb1]"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
