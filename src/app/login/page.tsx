"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await loginWithEmail(email, password);
      router.push("/trips");
    } catch (err: any) {
      const code = err?.code as string | undefined;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        setError("Incorrect email or password.");
      } else if (code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSubmitting(true);

    try {
      await loginWithGoogle();
      router.push("/trips");
    } catch {
      setError("Google sign in failed. Please try again.");
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
                "url('https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Travelcini
            </div>
            <div>
              <p className="text-3xl font-semibold lg:text-4xl">Your Journey Begins Here.</p>
              <p className="mt-4 max-w-md text-sm text-white/70">
                Discover curated trips, connect with travel buddies, and turn inspiration into
                unforgettable experiences.
              </p>
            </div>
            <div className="mt-10 text-xs text-white/60">
              Handpicked destinations across the globe, designed for modern explorers.
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
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                Sign in to pick up where you left off on your next adventure.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-sm font-medium text-red-500">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center rounded-full bg-[#0073D9] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#0073D9]/40 transition hover:-translate-y-0.5 hover:bg-[#005fb1] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6">
              <button
                type="button"
                disabled={submitting}
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                    <path
                      d="M21.6 12.2273C21.6 11.5182 21.5364 10.8364 21.4182 10.1818H12V13.8636H17.4182C17.1818 15.1182 16.4727 16.1545 15.4091 16.8636V19.2273H18.4909C20.2909 17.5727 21.6 15.1636 21.6 12.2273Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 21.5C14.7 21.5 16.9636 20.6091 18.4909 19.2273L15.4091 16.8636C14.5818 17.4182 13.4182 17.7727 12 17.7727C9.39091 17.7727 7.19091 16.1 6.4 13.7727H3.21818V16.2091C4.73636 19.4 8.09091 21.5 12 21.5Z"
                      fill="#34A853"
                    />
                    <path
                      d="M6.4 13.7727C6.19091 13.2182 6.07273 12.6182 6.07273 12C6.07273 11.3818 6.19091 10.7818 6.4 10.2273V7.79089H3.21818C2.58182 9.20907 2.22727 10.7636 2.22727 12.3636C2.22727 13.9636 2.58182 15.5182 3.21818 16.9364L6.4 13.7727Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 6.22727C13.5455 6.22727 14.8909 6.75454 15.9636 7.76363L18.5636 5.16363C16.9636 3.67272 14.7 2.75 12 2.75C8.09091 2.75 4.73636 4.85 3.21818 8.04089L6.4 10.2273C7.19091 7.89999 9.39091 6.22727 12 6.22727Z"
                      fill="#EA4335"
                    />
                  </svg>
                </span>
                <span>Sign in with Google</span>
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-neutral-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-[#0073D9] hover:text-[#005fb1]">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

