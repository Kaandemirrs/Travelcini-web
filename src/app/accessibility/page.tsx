import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28">
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
              Accessibility
            </p>
            <h1 className="mb-6 text-3xl font-semibold leading-tight text-[#14183E] md:text-[38px]">
              Making trip planning more inclusive for everyone
            </h1>

            <div className="space-y-5 text-sm leading-relaxed text-neutral-700 md:text-base">
              <p>
                TravelCini is designed to be a place where as many people as possible can
                comfortably plan their trips. We pay attention to clarity, contrast and
                simplicity so that key actions like starting a trip, saving a plan or
                exploring history remain understandable at a glance.
              </p>
              <p>
                Our layout uses a clean hierarchy with large headings, clear sections
                and consistent button styles. This helps users who rely on visual
                structure, as well as those who navigate quickly on small screens. Text
                is kept concise, and important actions like “Start Planning”, “Save” and
                “Edit” are highlighted with strong contrast.
              </p>
              <p>
                We also aim to keep forms and flows predictable. When you move between
                steps in the trip planner, information like destination, dates and group
                size stays visible in a summary card, reducing the cognitive load of
                remembering details. History cards mirror the same information so you
                always know what a trip contains before opening it.
              </p>
              <p>
                Accessibility is an ongoing effort. As TravelCini evolves, we plan to
                continue improving keyboard navigation, labeling of interactive elements
                and screen reader support. If you notice something that makes the app
                harder to use for you or your travel group, we&apos;d love to hear your
                feedback so we can keep making planning more inclusive.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

