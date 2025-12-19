"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SubscribeCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || loading) {
      return;
    }

    setLoading(true);

    try {
      const newsletterRef = collection(db, "newsletter");
      await addDoc(newsletterRef, {
        email: trimmed,
        subscribedAt: serverTimestamp(),
      });
      window.alert("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Failed to subscribe to newsletter", error);
      window.alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <div className="relative overflow-hidden rounded-[40px] bg-[#F5F5FF] px-6 py-12 md:px-16 md:py-16 shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
          <h2 className="mb-8 text-center text-2xl font-semibold leading-relaxed text-[#14183E] md:text-[28px]">
            Subscribe to get information, latest news and other interesting
            offers about TravelCini
          </h2>

          <form
            className="mx-auto flex max-w-xl flex-col items-stretch gap-4 md:flex-row"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-1 items-center rounded-full bg-white px-4 py-3 shadow-sm">
              <span className="mr-3 inline-flex h-5 w-5 items-center justify-center">
                <Image
                  src="/images/message.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </span>
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent text-sm text-[#4A4A4A] outline-none placeholder:text-[#A0A0B2]"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#F1A501] px-8 py-3 text-sm font-semibold text-white shadow-md shadow-[#F1A501]/40 transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
