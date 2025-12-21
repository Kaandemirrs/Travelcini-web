"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signupWithEmail } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedPolicy) {
      setError("Please confirm that you have read and accept the Privacy Policy.");
      return;
    }

    setSubmitting(true);

    try {
      await signupWithEmail(email, password);
      router.push("/trips");
    } catch (err: any) {
      const code = err?.code as string | undefined;
      if (code === "auth/email-already-in-use") {
        setError("An account already exists with this email.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak. Try a stronger one.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Travelcini
            </div>
            <div>
              <p className="text-3xl font-semibold lg:text-4xl">Create your travel identity.</p>
              <p className="mt-4 max-w-md text-sm text-white/70">
                Build your profile, save favorite trips, and join curated travel groups.
              </p>
            </div>
            <div className="mt-10 text-xs text-white/60">
              Designed for travelers who value both style and substance.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white py-12 px-6 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-800">
                <span className="mr-2 h-6 w-6 rounded-full border border-neutral-300 text-center text-xs leading-6">
                  ←
                </span>
                Back to home
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                Join Travelcini and start planning your next unforgettable journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-800">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-[#0073D9] focus:bg-white focus:ring-2 focus:ring-[#0073D9]/20"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-800">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-[#0073D9] focus:bg-white focus:ring-2 focus:ring-[#0073D9]/20"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-neutral-800">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-[#0073D9] focus:bg-white focus:ring-2 focus:ring-[#0073D9]/20"
                  placeholder="Create a strong password"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-800">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-[#0073D9] focus:bg-white focus:ring-2 focus:ring-[#0073D9]/20"
                  placeholder="Repeat your password"
                />
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={acceptedPolicy}
                      onChange={(event) => setAcceptedPolicy(event.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-[#0073D9] focus:ring-[#0073D9]"
                    />
                    <span>
                      By creating an account, I confirm that I have read and agree to the privacy policy
                      on the{" "}
                      <Link
                        href="/privacy-security"
                        className="font-semibold text-[#0073D9] hover:text-[#005fb1]"
                      >
                        Privacy &amp; Security
                      </Link>{" "}
                      page.
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="text-sm font-medium text-red-500">
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || !acceptedPolicy}
                className="flex w-full items-center justify-center rounded-full bg-[#0073D9] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#0073D9]/40 transition hover:-translate-y-0.5 hover:bg-[#005fb1] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#0073D9] hover:text-[#005fb1]">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
