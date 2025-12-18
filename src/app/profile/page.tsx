"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, userData, loading, updateUserProfile } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!userData) return;
    setDisplayName(userData.displayName || "");
    setBio(userData.bio || "");
    setLocation(userData.location || "");
  }, [userData]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user) return;

    setSaving(true);
    setSaved(false);

    try {
      await updateUserProfile({
        displayName: displayName || null,
        bio: bio || "",
        location: location || "",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-[#0073D9]" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-4 text-sm text-neutral-600 shadow-sm">
          Loading your profile...
        </div>
      </div>
    );
  }

  const isPro = userData.subscriptionStatus === "pro";
  const freeLimit = 1;
  const used = userData.tripsCreatedCount;
  const limitLabel = isPro ? "Unlimited" : `${freeLimit}`;
  const progressPercent = isPro ? 100 : Math.min(100, (used / freeLimit) * 100);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 pb-16 md:px-0">
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
              Profile
            </p>
            <h1 className="text-2xl font-semibold text-[#14183E] md:text-3xl">
              Your traveler profile
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Keep your basic information up to date so we can personalize your trips.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
            <div className="flex-1">
              <div className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-8">
                <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
                  <div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50">
                    {user.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.photoURL}
                        alt={displayName || user.email || ""}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-[#14183E]">
                        {(displayName || user.email || "?").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 text-center md:text-left">
                    <h2 className="text-xl font-semibold text-[#14183E] md:text-2xl">
                      {displayName || "Traveler"}
                    </h2>
                    <p className="text-sm text-neutral-500">
                      {user.email}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2 md:justify-start">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                          isPro
                            ? "bg-[#FFF7E1] text-[#92400E]"
                            : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                        {isPro ? "Pro Explorer" : "Free Traveler"}
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F8FF] px-3 py-1 text-xs text-neutral-700">
                        <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-[#0073D9] via-[#38BDF8] to-[#22C55E]" />
                        Trips Created:{" "}
                        <span className="font-semibold text-[#14183E]">
                          {used}
                        </span>
                        <span className="text-neutral-500">/ {limitLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-neutral-100 pt-4">
                  <div className="mb-2 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>Profile completeness</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0073D9] via-[#38BDF8] to-[#22C55E]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-neutral-600">
                  <p className="font-medium text-neutral-800">
                    About you
                  </p>
                  <p className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-500">
                    Use the form on the right to update your name, short bio and where you are
                    currently based. This helps us tailor trip ideas for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-7">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Profile Settings
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <label htmlFor="displayName" className="text-xs font-medium text-neutral-800">
                      Display name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(event) => setDisplayName(event.target.value)}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 transition focus:border-[#0073D9] focus:bg-white focus:ring-2 focus:ring-[#0073D9]/20"
                      placeholder="How should we call you?"
                    />
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <label htmlFor="bio" className="text-xs font-medium text-neutral-800">
                      About me
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(event) => setBio(event.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 transition focus:border-[#0073D9] focus:bg-white focus:ring-2 focus:ring-[#0073D9]/20"
                      placeholder="Share a short story about how you like to travel."
                    />
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <label htmlFor="location" className="text-xs font-medium text-neutral-800">
                      Current city / country
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 transition focus:border-[#0073D9] focus:bg-white focus:ring-2 focus:ring-[#0073D9]/20"
                      placeholder="e.g. Istanbul, Türkiye"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="mt-2 flex w-full items-center justify-center rounded-full bg-[#0073D9] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#0073D9]/30 transition hover:-translate-y-0.5 hover:bg-[#005fb1] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>

                  {saved && (
                    <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                      <span>Saved!</span>
                      <span className="h-1 w-12 rounded-full bg-emerald-400/70" />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
