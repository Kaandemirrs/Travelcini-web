"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const themes = [
  {
    title: "Nature",
    image: "/images/card1.jpeg",
    icon: "/images/icon1.svg",
    description: "Waterfalls, forests and quiet escapes",
  },
  {
    title: "City",
    image: "/images/card2.jpeg",
    icon: "/images/icon2.svg",
    description: "Night lights, culture and local life",
  },
  {
    title: "Beach",
    image: "/images/card3.jpeg",
    icon: "/images/icon3.svg",
    description: "Sun, sea and soft sand beaches",
  },
  {
    title: "Adventure",
    image: "/images/card4.jpeg",
    icon: "/images/icon4.svg",
    description: "Mountains, trails and adrenaline routes",
  },
];

const QUERY_KEY = "plan";

export default function TripsHero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get(QUERY_KEY) === "1";
  const [step, setStep] = useState(1);
  const [friendsCount, setFriendsCount] = useState(0);
  const [familyCount, setFamilyCount] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  const openPlanning = () => {
    setStep(1);
    const current = new URLSearchParams(searchParams.toString());
    current.set(QUERY_KEY, "1");
    const query = current.toString();
    router.push(query ? `?${query}` : "?", { scroll: false });
  };

  const closePlanning = () => {
    const current = new URLSearchParams(searchParams.toString());
    current.delete(QUERY_KEY);
    const query = current.toString();
    router.push(query ? `?${query}` : "/trips", { scroll: false });
  };

  let stepLabel = "";
  let stepRightLabel = "";
  let topBarWidthClass = "";

  if (step === 1) {
    stepLabel = "Step 1 of 3";
    stepRightLabel = "%25";
    topBarWidthClass = "w-1/3";
  } else if (step === 2) {
    stepLabel = "Step 2 of 3";
    stepRightLabel = "%50";
    topBarWidthClass = "w-2/3";
  } else {
    stepLabel = "Step 3 of 3";
    stepRightLabel = "%100";
    topBarWidthClass = "w-full";
  }

  const bottomBarWidthClass = topBarWidthClass;
  const primaryActionLabel = step === 3 ? "Save" : "Continue";

  const handleBack = () => {
    if (step === 1) {
      closePlanning();
    } else {
      setStep(step - 1);
    }
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      closePlanning();
    }
  };

  return (
    <>
      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 md:flex-row md:items-center md:px-0">
          <div className="w-full md:w-1/2">
            <h1 className="mb-6 text-3xl font-semibold leading-tight text-[#14183E] md:text-[40px]">
              Plan Your
              <br />
              Dream{" "}
              <span className="text-[#0073D9]">
                Journey
              </span>{" "}
              Together
            </h1>

            <button
              type="button"
              onClick={openPlanning}
              className="inline-flex items-center gap-2 rounded-full bg-[#F1A501] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F1A501]/40 transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span>Start Planning</span>
              <span className="text-lg">→</span>
            </button>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                  <Image
                    src="/images/hum1.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                  <Image
                    src="/images/hum2.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                  <Image
                    src="/images/hum3.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1A501] text-xs font-semibold text-white ring-2 ring-white">
                  +2K
                </div>
              </div>

              <p className="text-xs text-neutral-500 md:text-sm">
                Travelers joined this week
              </p>
            </div>
          </div>

          <div className="flex w-full justify-center md:w-1/2 md:justify-end">
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <Image
                src="/images/trips.jpeg"
                alt="Airplane flying in the sky"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_center,#0872D0_0,#003666_60%)] px-5 py-6 text-white md:px-10 md:py-8">
            <div className="mb-6 flex items-center justify-between text-xs text-white/80">
              <div className="w-full max-w-xs md:max-w-sm">
                <div className="mb-2 flex items-center justify-between text-[11px]">
                  <span>{stepLabel}</span>
                  <span>{stepRightLabel}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/20">
                  <div className={`h-full rounded-full bg-white ${topBarWidthClass}`} />
                </div>
              </div>

              <button
                type="button"
                onClick={closePlanning}
                className="ml-6 text-xs font-medium text-white/80 transition-colors hover:text-white"
              >
                Exit
              </button>
            </div>

            <div className="mb-8 text-center">
              {step === 1 && (
                <>
                  <h2 className="mb-2 text-2xl font-semibold md:text-[28px]">
                    Where does your soul want to go?
                  </h2>
                  <p className="text-xs text-white/80 md:text-sm">
                    Select a theme to start journey. We&apos;ll curate the perfect spots for you
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="mb-2 text-2xl font-semibold md:text-[28px]">
                    Where to?
                  </h2>
                  <p className="text-xs text-white/80 md:text-sm">
                    Plan your journey
                  </p>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 className="mb-2 text-2xl font-semibold md:text-[28px]">
                    Your dream trip is ready
                  </h2>
                  <p className="text-xs text-white/80 md:text-sm">
                    Review your plan and explore smart suggestions
                  </p>
                </>
              )}
            </div>

            {step === 1 && (
              <div className="mb-8 grid gap-4 md:grid-cols-4 md:gap-6">
                {themes.map((theme) => (
                  <button
                    key={theme.title}
                    type="button"
                    className="group flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/5 text-left shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform transition-shadow hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_28px_60px_rgba(0,0,0,0.5)]"
                  >
                    <div className="relative h-40 w-full md:h-52">
                      <Image
                        src={theme.image}
                        alt={theme.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 px-4 py-3">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="relative h-5 w-5">
                          <Image
                            src={theme.icon}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-semibold text-white">
                          {theme.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/75">
                        {theme.description}
                      </p>
                      <span className="mt-2 text-[11px] font-semibold text-[#6FC3FF] group-hover:text-white">
                        View spots
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="mb-8">
                <div className="mb-8 flex justify-center">
                  <div className="flex w-full max-w-xl items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                    <span className="relative h-4 w-4 md:h-5 md:w-5">
                      <Image
                        src="/images/question.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </span>
                    <input
                      type="text"
                      placeholder="Search destination"
                      className="w-full bg-transparent text-xs text-white placeholder:text-white/60 outline-none md:text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4 text-center">
                  <h3 className="mb-1 text-lg font-semibold md:text-xl">
                    Who&apos;s coming with you?
                  </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  <div className="flex items-center gap-3 rounded-full bg-[#3DA9FF] px-5 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                      <div className="relative h-5 w-5">
                        <Image
                          src="/images/page2icon.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-xs md:text-sm">
                      <div className="font-semibold text-white">Solo</div>
                      <div className="text-white/80">Just me</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-full bg-[#3DA9FF] px-5 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                      <div className="relative h-5 w-5">
                        <Image
                          src="/images/page2icons.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-xs md:text-sm">
                      <div className="font-semibold text-white">Couple</div>
                      <div className="text-white/80">2 people</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-full bg-[#3DA9FF] px-5 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                      <div className="relative h-5 w-5">
                        <Image
                          src="/images/page2iconsss.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-xs md:text-sm">
                      <div className="font-semibold text-white">Friends</div>
                      <div className="text-white/80">Group trip</div>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-xs md:text-sm">
                      <button
                        type="button"
                        onClick={() =>
                          setFriendsCount((value) => Math.max(0, value - 1))
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                      >
                        -
                      </button>
                      <span className="min-w-[1.5rem] text-center font-semibold">
                        {friendsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFriendsCount((value) => value + 1)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0872D0] hover:bg-[#E6F4FF]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-full bg-[#3DA9FF] px-5 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                      <div className="relative h-5 w-5">
                        <Image
                          src="/images/page2iconsda.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-xs md:text-sm">
                      <div className="font-semibold text-white">Family</div>
                      <div className="text-white/80">With kids</div>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-xs md:text-sm">
                      <button
                        type="button"
                        onClick={() =>
                          setFamilyCount((value) => Math.max(0, value - 1))
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                      >
                        -
                      </button>
                      <span className="min-w-[1.5rem] text-center font-semibold">
                        {familyCount}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFamilyCount((value) => value + 1)
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0872D0] hover:bg-[#E6F4FF]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mb-8 flex flex-col gap-6 md:flex-row">
                <div className="w-full md:w-[40%]">
                  <div className="h-full rounded-[24px] bg-[#3DA9FF] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                    <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-white">
                      <div className="relative h-5 w-5">
                        <Image
                          src="/images/calendar.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>Daily Itinerary</span>
                    </div>

                    <div className="mb-4 space-y-3 text-xs text-white/90">
                      {["Nature", "Italy", "Couple"].map((label, index) => (
                        <div key={label} className="flex items-center gap-3">
                          <div className="flex flex-col items-center">
                            <div className="relative h-4 w-4">
                              <Image
                                src="/images/palnesd.svg"
                                alt=""
                                fill
                                className="object-contain"
                              />
                            </div>
                            {index < 2 && (
                              <div className="mt-1 h-6 w-px bg-white/40" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-white">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="overflow-hidden rounded-[20px] bg-black/40">
                      <div className="relative h-40 w-full">
                        <Image
                          src="/images/card2.jpeg"
                          alt="City"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-sm font-semibold text-white">
                          City
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#06B0FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[#09c1ff]"
                      >
                        <span className="relative h-4 w-4">
                          <Image
                            src="/images/share.svg"
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </span>
                        <span>Share Plan</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full md:flex-1">
                  <div className="flex h-full flex-col rounded-[24px] bg-[#62B8FF] shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                    <div className="flex overflow-hidden rounded-t-[24px] bg-[#7DC5FF] text-xs font-semibold text-[#003666] md:text-sm">
                      <div className="flex flex-1 items-center justify-center bg-white px-3 py-3 text-[#003666]">
                        Best Deals
                      </div>
                      <div className="flex flex-1 items-center justify-center border-l border-[#5BAEF7] px-3 py-3 text-white/85">
                        Explore Maps
                      </div>
                      <div className="flex flex-1 items-center justify-center border-l border-[#5BAEF7] px-3 py-3 text-white/85">
                        AI Map
                      </div>
                    </div>
                    <div className="flex-1 rounded-b-[24px] bg-[#62B8FF]" />
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-white/20 pt-5">
              <div className="mb-4 h-1 w-full rounded-full bg-white/15">
                <div
                  className={`h-full rounded-full bg-[#6BB7FF] ${bottomBarWidthClass}`}
                />
              </div>
              <div className="flex flex-col justify-between gap-3 md:flex-row">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center justify-center rounded-full bg-[#06B0FF] px-8 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/30 transition-transform transition-shadow hover:-translate-y-0.5 hover:bg-[#09c1ff] hover:shadow-lg"
                >
                  {primaryActionLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
