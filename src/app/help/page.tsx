"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const faqs = [
  {
    question: "What is TravelCini and who is it for?",
    answer:
      "TravelCini is a collaborative trip planning app for friends, couples and families. It helps you turn scattered travel ideas into a clear, shared plan with dates, destinations and group details all in one place.",
  },
  {
    question: "How does trip planning work in TravelCini?",
    answer:
      "You start by choosing the mood of your trip, where you want to go, who is coming with you and your travel dates. TravelCini saves this information as a trip card that you can revisit, refine and share later.",
  },
  {
    question: "Can I edit a trip after I have saved it?",
    answer:
      "Yes. Your saved trips appear in the History section. When you open a trip, you can switch to edit mode, adjust the destination, mood or dates, and save the updated version without creating a new trip.",
  },
  {
    question: "Do I need an account to use TravelCini?",
    answer:
      "You can browse the homepage without an account, but you need to sign up and log in to save trips, track your history and access personalized features that are connected to your profile.",
  },
  {
    question: "Is TravelCini free to use?",
    answer:
      "TravelCini starts with a free tier so you can experience the core idea of planning and saving trips. In the future, we will offer Pro features for power users who want more advanced tools and higher limits.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28">
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
              Help & FAQ
            </p>
            <h1 className="mb-6 text-3xl font-semibold leading-tight text-[#14183E] md:text-[38px]">
              Get to know how TravelCini works
            </h1>

            <div className="mb-10 space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base">
              <p>
                This page gives you a quick overview of what TravelCini does and answers
                the most common questions new users have. If you&apos;re wondering how to
                plan a trip, save it, or come back later to refine the details, you&apos;re
                in the right place.
              </p>
              <p>
                TravelCini focuses on two things: helping you design a clear travel plan
                and keeping communication with your group simple. Below, you can open
                each question to learn more about how the app behaves in typical
                scenarios.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.question}
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggleIndex(index)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-[#14183E] md:px-5 md:py-4"
                    >
                      <span>{item.question}</span>
                      <span className="ml-4 text-lg text-neutral-400">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-neutral-100 px-4 py-3 text-sm text-neutral-700 md:px-5 md:py-4">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

