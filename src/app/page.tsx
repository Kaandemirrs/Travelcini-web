 "use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/features/Hero";
import Services from "@/components/features/Services";
import TopDestinations from "@/components/features/TopDestinations";
import CappadociaHighlight from "@/components/features/CappadociaHighlight";
import EasySteps from "@/components/features/EasySteps";
import Testimonials from "@/components/features/Testimonials";
import SubscribeCard from "@/components/features/SubscribeCard";

const partnerCards = [
  { id: "experiences" as const },
  { id: "expedia" as const },
  { id: "more-providers" as const },
] as const;

export default function Home() {
  const [activePartnerIndex, setActivePartnerIndex] = useState(0);

  const expediaHomeSrc =
    "https://www.expedia.de/marketing/widgets/searchform/widget?wtt=1&tp1=101578370&tp2=&lob=H,FH,F,CA&des=Weltweit&wbi=1&olc=000000&whf=4&hfc=C7C7C7&wif=4&ifc=000000&wbc=FFCB00&wbf=4&bfc=3D3100&wws=1&sfs=H600FW300F&langid=1031";

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />

        <section className="bg-white py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-stretch md:px-0">
            <div className="w-full md:w-1/2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
                Travel partner deals
              </p>
              <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#14183E] md:text-3xl">
                Discover smart deals from multiple providers
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Compare flights, stays, cars and packages from trusted partners in one place.
                Start with our Expedia smart search and get ready for more providers to join
                soon, so you can always pick the offer that fits your budget and travel style.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Use the cards on the right to explore live search widgets and upcoming partner
                integrations. As TravelCini grows, this area will collect the best tools from
                different platforms into a single, simple starting point.
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative flex flex-col items-center">
                <div className="relative w-full max-w-md">
                  <div className="flex flex-col rounded-[24px] bg-[#62B8FF] shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                    {partnerCards[activePartnerIndex].id === "expedia" && (
                      <>
                        <div className="flex items-center justify-center overflow-hidden rounded-t-[24px] bg-[#7DC5FF] px-4 py-3 text-xs font-semibold text-[#003666] md:text-sm">
                          Expedia smart search widget
                        </div>
                        <div className="rounded-b-[24px] bg-white">
                          <div className="h-[320px] w-full overflow-hidden rounded-b-[24px] bg-white sm:h-[360px] md:h-[420px]">
                            <iframe
                              src={expediaHomeSrc}
                              width="100%"
                              height="100%"
                              scrolling="auto"
                              frameBorder="0"
                              style={{ border: 0 }}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {partnerCards[activePartnerIndex].id === "more-providers" && (
                      <div className="flex h-[320px] flex-col justify-between rounded-[24px] bg-gradient-to-br from-white via-[#F9FAFB] to-white p-5 text-left text-[#0F172A] sm:h-[360px] md:h-[420px]">
                        <div className="flex flex-1 flex-col justify-between gap-4 md:flex-row md:items-stretch">
                          <div className="md:w-1/2">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0369A1]">
                              Coming soon
                            </p>
                            <h3 className="mt-2 text-sm font-semibold md:text-base">
                              12Go routes and tickets
                            </h3>
                            <p className="mt-3 text-xs leading-relaxed text-neutral-600 md:text-sm">
                              Check routes, trains, buses and ferries in one place with 12Go, a
                              partner for multi-country connections and ground transport.
                            </p>
                            <p className="mt-3 text-[11px] text-neutral-500">
                              This integration will sit next to flights and stays so you can connect
                              your whole journey.
                            </p>
                          </div>
                          <div className="flex flex-1 items-center justify-center md:w-1/2">
                            <a
                              href="https://www.jdoqocy.com/click-101578370-17115152"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center"
                            >
                              <img
                                src="https://www.lduhtrp.net/image-101578370-17115152"
                                alt="12Go routes and tickets"
                                width={300}
                                height={500}
                                className="h-full max-h-[260px] w-auto rounded-[18px] border border-white/10 bg-white/5 object-cover shadow-[0_18px_40px_rgba(0,0,0,0.5)] sm:max-h-[300px] md:max-h-[360px]"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {partnerCards[activePartnerIndex].id === "experiences" && (
                      <div className="relative flex h-[320px] flex-col justify-between rounded-[24px] bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] p-5 text-left text-[#78350F] shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:h-[360px] md:h-[420px]">
                        <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-2 ring-[#FBBF24]/60" />
                        <div className="flex flex-1 flex-col justify-between gap-4 md:flex-row md:items-stretch">
                          <div className="md:w-1/2">
                            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#92400E]">
                              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                              Cheap tickets web
                            </p>
                            <h3 className="mt-2 text-sm font-semibold md:text-base">
                              Get the most out of your next trip
                            </h3>
                            <p className="mt-3 text-xs leading-relaxed text-[#92400E]/90 md:text-sm">
                              See highlighted ticket deals that can unlock better prices for flights
                              and routes, so you keep more of your budget for experiences.
                            </p>
                            <p className="mt-3 text-[11px] text-[#B45309]">
                              Featured deals partner placed first for quick access.
                            </p>
                          </div>
                          <div className="flex flex-1 items-center justify-center md:w-1/2">
                            <a
                              href="https://www.dpbolvw.net/click-101578370-13983555"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex w-full max-w-[260px] flex-col rounded-[18px] border border-[#FBBF24] bg-white px-4 py-3 text-left text-xs text-neutral-800 shadow-[0_22px_60px_rgba(0,0,0,0.4)] transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-[0_26px_70px_rgba(0,0,0,0.5)]"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0F172A]">
                                  Cheap tickets web
                                </span>
                                <span className="rounded-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] px-2 py-0.5 text-[10px] font-semibold text-[#78350F]">
                                  Featured
                                </span>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-baseline justify-between">
                                  <span className="text-xs font-semibold text-[#0F172A]">
                                    Sample route
                                  </span>
                                  <span className="text-[11px] text-neutral-500">from</span>
                                </div>
                                <div className="mt-1 text-sm font-semibold text-[#0F172A]">
                                  Any city → Anywhere
                                </div>
                              </div>
                              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
                              <div className="mt-3 flex items-center justify-between">
                                <div className="text-[11px] text-neutral-500">
                                  Explore cheap ticket deals
                                </div>
                                <div className="text-base font-semibold text-[#0073D9]">
                                  €•••
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-[#0073D9]">
                                  Check cheap tickets
                                </span>
                                <span className="text-xs text-neutral-500">→</span>
                              </div>
                              <img
                                src="https://www.awltovhc.com/image-101578370-13983555"
                                alt=""
                                width={1}
                                height={1}
                                className="mt-1 h-px w-px opacity-0"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setActivePartnerIndex(
                        (activePartnerIndex - 1 + partnerCards.length) % partnerCards.length,
                      )
                    }
                    className="absolute left-[-18px] top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#0073D9] text-xs font-semibold text-white shadow-md shadow-black/30 transition hover:-translate-y-1/2 hover:bg-[#005fb1] md:flex"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePartnerIndex((activePartnerIndex + 1) % partnerCards.length)
                    }
                    className="absolute right-[-18px] top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#0073D9] text-xs font-semibold text-white shadow-md shadow-black/30 transition hover:-translate-y-1/2 hover:bg-[#005fb1] md:flex"
                  >
                    →
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  {partnerCards.map((partner, index) => (
                    <button
                      key={partner.id}
                      type="button"
                      onClick={() => setActivePartnerIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        activePartnerIndex === index
                          ? "w-6 bg-[#0073D9]"
                          : "w-2 bg-neutral-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <TopDestinations />
        <CappadociaHighlight />
        <EasySteps />
        <Testimonials />
        <SubscribeCard />
      </main>
      <Footer />
    </div>
  );
}
