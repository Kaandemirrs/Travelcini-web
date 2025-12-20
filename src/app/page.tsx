import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/features/Hero";
import Services from "@/components/features/Services";
import TopDestinations from "@/components/features/TopDestinations";
import CappadociaHighlight from "@/components/features/CappadociaHighlight";
import EasySteps from "@/components/features/EasySteps";
import Testimonials from "@/components/features/Testimonials";
import SubscribeCard from "@/components/features/SubscribeCard";

export default function Home() {
  const expediaHomeSrc =
    "https://www.expedia.de/marketing/widgets/searchform/widget?wtt=1&tp1=101578370&tp2=&lob=H,FH,F,CA,CR,A&des=Weltweit&wbi=1&olc=000000&whf=4&hfc=C7C7C7&wif=4&ifc=000000&wbc=FFCB00&wbf=4&bfc=3D3100&wws=1&sfs=H600FW300F&langid=1031";

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
                Powered by Expedia
              </p>
              <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#14183E] md:text-3xl">
                Discover smart deals for your next trip
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                With Expedia&apos;s trusted search technology, you can compare hundreds of
                options for flights, hotels and packages in just a few clicks. Filter by
                budget, flexibility and rating to build the perfect combination that
                matches your travel style.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Use the widget on the right to explore live offers and start planning
                your journey directly from TravelCini, powered by Expedia.
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex h-full flex-col rounded-[24px] bg-[#62B8FF] shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
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
