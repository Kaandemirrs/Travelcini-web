import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28">
        <section className="bg-white py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:gap-10 md:px-0">
            <div className="w-full md:w-[38%]">
              <div className="rounded-[24px] bg-white p-4 text-[#14183E] shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
                <div className="mb-4 flex overflow-hidden rounded-full bg-neutral-100 text-xs">
                  <button
                    type="button"
                    className="flex-1 rounded-full bg-[#0073D9] px-4 py-2 font-semibold text-white"
                  >
                    Explore
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-full px-4 py-2 font-semibold text-neutral-500"
                  >
                    Chats
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-3 rounded-full bg-neutral-100 px-4 py-2">
                    <span className="relative h-4 w-4">
                      <Image
                        src="/images/question.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Travelers.."
                      className="w-full bg-transparent text-xs text-neutral-700 placeholder:text-neutral-400 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                    {[
                      { name: "Ayça Çelik", img: "/images/girl.jpeg", time: "2m", text: "She is visiting İstanbul." },
                      { name: "Ahmet Yılmaz", img: "/images/ahmet.jpeg", time: "15m", text: "Looking for travel buddies in Cappadocia." },
                      { name: "Zeynep Demir", img: "/images/zeynep.jpeg", time: "1h", text: "Anyone want to explore Ephesus?" },
                      { name: "Kaan Kaya", img: "/images/kaan.jpeg", time: "3h", text: "Traveling to Antalya next week." },
                    ].map((p) => (
                    <div key={p.name} className="flex items-center gap-3 rounded-[16px] bg-neutral-50 px-3 py-2">
                      <div className="relative h-9 w-9 overflow-hidden rounded-full">
                        <Image src={p.img} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#14183E]">{p.name}</span>
                          <span className="text-[10px] text-neutral-400">{p.time}</span>
                        </div>
                        <p className="text-[11px] text-neutral-600">{p.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[16px] bg-neutral-50 p-3">
                  <div className="relative h-28 w-full overflow-hidden rounded-[12px]">
                    <Image src="/images/balon.jpeg" alt="Balloon" fill className="object-cover" />
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full">
                      <Image src="/images/kaan.jpeg" alt="Kaan" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#14183E]">Kaan</p>
                      <p className="text-[11px] text-neutral-600">New test group formed</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="rounded-full bg-[#0073D9] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(0,115,217,0.35)]"
                    >
                      Join
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-[#14183E]"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:flex-1">
              <div className="rounded-[24px] bg-white p-5 text-[#14183E] shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
                <div className="relative h-40 w-full overflow-hidden rounded-[16px]">
                  <Image src="/images/card2.jpeg" alt="City" fill className="object-cover" />
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] text-[#14183E] shadow-sm">
                    İzmir, Turkey
                  </div>
                </div>

                <div className="relative -mt-9 mb-4 ml-5 h-16 w-16 overflow-hidden rounded-full ring-4 ring-white">
                  <Image src="/images/girl.jpeg" alt="Profile" fill className="object-cover" />
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-[#14183E]">Elif Yıldız, 26</h2>
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <p className="mb-4 text-xs text-neutral-600">
                  Adventure seeker and food lover exploring the beautiful coasts of Turkey.
                  Always looking for new friends to share experiences with!
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {["Nature", "Food", "Photography", "Travel"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-[#E6F4FF] px-3 py-1 text-[11px] text-[#0073D9]"
                  >
                    {t}
                  </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3DA9FF] to-[#06B0FF] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(0,0,0,0.25)]"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
