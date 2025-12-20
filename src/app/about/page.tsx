import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28">
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
              About TravelCini
            </p>
            <h1 className="mb-6 text-3xl font-semibold leading-tight text-[#14183E] md:text-[38px]">
              Plan your trips together, with clarity and connection
            </h1>

            <div className="space-y-5 text-sm leading-relaxed text-neutral-700 md:text-base">
              <p>
                TravelCini is built for people who believe that every great trip starts
                with a clear plan and the right people around you. Instead of scattered
                chats, screenshots and notes, we bring everything into one simple space
                where your routes, dates and ideas live together.
              </p>
              <p>
                You can create a trip, invite your friends or travel buddies, and decide
                where to go, when to travel and what to do step by step. While you
                discuss the details, TravelCini keeps the plan structured: destinations,
                date ranges, group size and mood are all stored in one shared view.
              </p>
              <p>
                Our goal is to make communication around travel as easy as booking a
                ticket. Whether you are organizing a weekend city break, a long backpack
                journey or a family holiday, TravelCini helps you move from ideas to a
                concrete plan that everyone understands.
              </p>
              <p>
                As we grow, we are continuously adding smarter tools: recommendations
                based on your mood, history of your trips, and integrations that let you
                explore real offers without leaving your planning flow. TravelCini is
                your collaborative space to design, refine and share the trips that
                matter to you.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

