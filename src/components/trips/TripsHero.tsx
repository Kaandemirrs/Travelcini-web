"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { saveTrip } from "@/hooks/useTripSaver";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function addMonths(base: Date, count: number) {
  return new Date(base.getFullYear(), base.getMonth() + count, 1);
}

function getMonthGrid(base: Date) {
  const year = base.getFullYear();
  const month = base.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length < 42) {
    cells.push(null);
  }

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < 6; i += 1) {
    weeks.push(cells.slice(i * 7, (i + 1) * 7));
  }

  return weeks;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBetween(date: Date, start: Date, end: Date) {
  const time = date.getTime();
  return time > start.getTime() && time < end.getTime();
}

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
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState<"solo" | "couple" | "friends" | "family" | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [friendsCount, setFriendsCount] = useState(0);
  const [familyCount, setFamilyCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setIsLoading(false);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

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
    stepLabel = "Step 1 of 4";
    stepRightLabel = "%25";
    topBarWidthClass = "w-1/4";
  } else if (step === 2) {
    stepLabel = "Step 2 of 4";
    stepRightLabel = "%50";
    topBarWidthClass = "w-2/4";
  } else if (step === 3) {
    stepLabel = "Step 3 of 4";
    stepRightLabel = "%75";
    topBarWidthClass = "w-3/4";
  } else {
    stepLabel = "Step 4 of 4";
    stepRightLabel = "%100";
    topBarWidthClass = "w-4/4";
  }

  const bottomBarWidthClass = topBarWidthClass;
  const primaryActionLabel =
    step === 4 ? (saving ? "Saving..." : "Save") : isLoading ? "Loading..." : "Continue";

  let dateLabel = "Flexible dates";

  if (startDate && endDate) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };

    const start = startDate.toLocaleDateString(undefined, options);
    const end = endDate.toLocaleDateString(undefined, options);
    dateLabel = `${start} - ${end}`;
  } else if (startDate && !endDate) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };

    const start = startDate.toLocaleDateString(undefined, options);
    dateLabel = `Starting ${start}`;
  }

  const themeLabel = selectedTheme || "Any mood";
  const destinationLabel = destination || "Anywhere";

  let withLabel = "Any company";

  if (travelType === "solo") {
    withLabel = "Solo";
  } else if (travelType === "couple") {
    withLabel = "Couple";
  } else if (travelType === "friends") {
    withLabel =
      friendsCount > 0 ? `Friends x${friendsCount}` : "Friends";
  } else if (travelType === "family") {
    withLabel =
      familyCount > 0 ? `Family with ${familyCount} kids` : "Family";
  }

  const summaryItems = [themeLabel, destinationLabel, withLabel, dateLabel];

  const handleDayClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (startDate && !endDate) {
      if (date.getTime() < startDate.getTime()) {
        setStartDate(date);
        setEndDate(null);
      } else if (date.getTime() === startDate.getTime()) {
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  const leftMonth = calendarMonth;
  const rightMonth = addMonths(calendarMonth, 1);

  const handleBack = () => {
    if (step === 1) {
      closePlanning();
    } else {
      setStep(step - 1);
    }
  };

  const handleContinue = () => {
    if (step === 3) {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setStep(4);
        loadingTimeoutRef.current = null;
      }, 5500);

      return;
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSave = async () => {
    if (saving) {
      return;
    }

    setSaving(true);

    try {
      const dates =
        startDate && endDate
          ? {
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
            }
          : null;

      const tripData = {
        destination: destination || "",
        mood: selectedTheme || "",
        dates,
        travelType,
        friendsCount,
        familyCount,
      };

      await saveTrip(tripData);

      window.alert("Trip Saved!");
      closePlanning();
    } catch (error: any) {
      if (error?.message === "LIMIT_REACHED") {
        window.alert("You have reached your free limit. Please upgrade to Pro.");
      } else if (error?.message === "NOT_AUTHENTICATED") {
        router.push("/login");
      } else {
        window.alert("Failed to save trip. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const expediaDestination = destination && destination.trim().length > 0 ? destination : "Weltweit";
  const expediaSrc = `https://www.expedia.de/marketing/widgets/searchform/widget?wtt=1&tp1=101578370&tp2=&lob=H,FH,F,CA,CR,A&des=${encodeURIComponent(
    expediaDestination,
  )}&wbi=1&olc=000000&whf=4&hfc=C7C7C7&wif=4&ifc=000000&wbc=FFCB00&wbf=4&bfc=3D3100&wws=1&sfs=H600FW300F&langid=1031`;

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
        <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6 md:py-10">
          <div className="relative mt-10 mb-8 w-full max-w-5xl rounded-[32px] bg-[radial-gradient(circle_at_center,#0872D0_0,#003666_60%)] px-5 py-6 text-white md:mt-14 md:px-10 md:py-8">
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
                    When do you want to travel?
                  </h2>
                  <p className="text-xs text-white/80 md:text-sm">
                    Choose the dates for your trip. Select a start and end day.
                  </p>
                </>
              )}
              {step === 4 && (
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
              <div className="mb-8 grid items-stretch gap-4 md:grid-cols-4 md:gap-6">
                {themes.map((theme) => {
                  const isSelected = selectedTheme === theme.title;

                  return (
                    <button
                      key={theme.title}
                      type="button"
                      onClick={() => setSelectedTheme(theme.title)}
                      className={`group flex h-full flex-col overflow-hidden rounded-[24px] border text-left shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform transition-shadow hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(0,0,0,0.5)] ${
                        isSelected
                          ? "border-[#6FC3FF] bg-white/10 ring-2 ring-[#6FC3FF]/60"
                          : "border-white/10 bg-white/5 hover:border-white/40"
                      }`}
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
                        <p className="h-[36px] overflow-hidden text-[11px] text-white/75">
                          {theme.description}
                        </p>
                        <span className="mt-auto pt-2 text-[11px] font-semibold text-[#6FC3FF] group-hover:text-white">
                          View spots
                        </span>
                      </div>
                    </button>
                  );
                })}
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
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 text-center">
                  <h3 className="mb-1 text-lg font-semibold md:text-xl">
                    Who&apos;s coming with you?
                  </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  <div
                    className={`flex items-center gap-3 rounded-full px-5 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-colors ${
                      travelType === "solo" ? "bg-[#005fb1]" : "bg-[#3DA9FF]"
                    }`}
                    onClick={() => setTravelType("solo")}
                  >
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

                  <div
                    className={`flex items-center gap-3 rounded-full px-5 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-colors ${
                      travelType === "couple" ? "bg-[#005fb1]" : "bg-[#3DA9FF]"
                    }`}
                    onClick={() => setTravelType("couple")}
                  >
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

                  <div
                    className={`flex items-center gap-3 rounded-full px-5 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-colors ${
                      travelType === "friends" ? "bg-[#005fb1]" : "bg-[#3DA9FF]"
                    }`}
                    onClick={() => setTravelType("friends")}
                  >
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

                  <div
                    className={`flex items-center gap-3 rounded-full px-5 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-colors ${
                      travelType === "family" ? "bg-[#005fb1]" : "bg-[#3DA9FF]"
                    }`}
                    onClick={() => setTravelType("family")}
                  >
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
              <div className="mb-8">
                <div className="mb-6 flex justify-center">
                  <div className="flex w-full max-w-xs items-center rounded-full bg-white/10 p-1 text-xs md:max-w-sm md:text-sm">
                    <button
                      type="button"
                      className="flex-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#003666] md:px-4 md:py-2"
                    >
                      Dates
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-full px-3 py-1.5 text-xs font-medium text-white/70 md:px-4 md:py-2"
                    >
                      Months
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-full px-3 py-1.5 text-xs font-medium text-white/70 md:px-4 md:py-2"
                    >
                      Flexible
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/70 md:text-sm">
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarMonth((current) => addMonths(current, -1))
                    }
                    className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/15"
                  >
                    ←
                  </button>
                  <div className="flex flex-1 items-center justify-center gap-16 text-sm font-semibold md:text-base">
                    <span>
                      {monthNames[leftMonth.getMonth()]} {leftMonth.getFullYear()}
                    </span>
                    <span>
                      {monthNames[rightMonth.getMonth()]} {rightMonth.getFullYear()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarMonth((current) => addMonths(current, 1))
                    }
                    className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/15"
                  >
                    →
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-6 md:flex-row">
                  {[leftMonth, rightMonth].map((month) => {
                    const grid = getMonthGrid(month);

                    return (
                      <div key={`${month.getFullYear()}-${month.getMonth()}`} className="flex-1">
                        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] text-white/60 md:text-xs">
                          {weekdayNames.map((day) => (
                            <span key={day}>{day}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {grid.flat().map((day, index) => {
                            if (!day) {
                              return (
                                <div
                                  key={index}
                                  className="flex h-8 w-8 items-center justify-center text-[11px] text-white/20 md:h-9 md:w-9 md:text-xs"
                                />
                              );
                            }

                            const isStart =
                              startDate && isSameDay(day, startDate);
                            const isEnd =
                              endDate && isSameDay(day, endDate);
                            const inRange =
                              startDate &&
                              endDate &&
                              isBetween(day, startDate, endDate);

                            let className =
                              "flex h-8 w-8 items-center justify-center rounded-full text-[11px] md:h-9 md:w-9 md:text-xs";

                            if (isStart || isEnd) {
                              className +=
                                " bg-white text-[#0872D0] font-semibold";
                            } else if (inRange) {
                              className +=
                                " bg-white/25 text-white font-medium";
                            } else {
                              className +=
                                " text-white/80 hover:bg-white/15";
                            }

                            return (
                              <button
                                key={day.toISOString()}
                                type="button"
                                onClick={() => handleDayClick(day)}
                                className={className}
                              >
                                {day.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {isLoading && (
                  <div className="mx-auto mt-6 flex w-full max-w-sm flex-col gap-2">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                      <div className="h-full w-full animate-pulse rounded-full bg-[#3DA9FF]" />
                    </div>
                    <p className="text-center text-xs text-white/80 md:text-sm">
                      Loading your travel plan...
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="mb-8 flex flex-col gap-6 md:flex-row">
                <div className="w-full md:w-[40%]">
                  <div className="rounded-[24px] bg-[#3DA9FF] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
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
                      {summaryItems.map((label, index) => (
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
                            {index < summaryItems.length - 1 && (
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
                  <div className="flex flex-col rounded-[24px] bg-[#62B8FF] shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
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
                    <div className="rounded-b-[24px] bg-white">
                      <div className="h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] w-full overflow-hidden rounded-b-[24px] bg-white">
                        <iframe
                          id="widgetIframe"
                          src={expediaSrc}
                          width="100%"
                          height="100%"
                          scrolling="auto"
                          frameBorder="0"
                          style={{ border: 0 }}
                        />
                      </div>
                    </div>
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
                  disabled={isLoading || (step === 4 && saving)}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={step === 4 ? handleSave : handleContinue}
                  disabled={isLoading || (step === 4 && saving)}
                  className="inline-flex items-center justify-center rounded-full bg-[#06B0FF] px-8 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/30 transition-transform transition-shadow hover:-translate-y-0.5 hover:bg-[#09c1ff] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
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
