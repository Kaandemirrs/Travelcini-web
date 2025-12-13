import Header from "@/components/layout/Header";
import Hero from "@/components/features/Hero";
import Services from "@/components/features/Services";
import TopDestinations from "@/components/features/TopDestinations";
import CappadociaHighlight from "@/components/features/CappadociaHighlight";
import EasySteps from "@/components/features/EasySteps";
import Testimonials from "@/components/features/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <TopDestinations />
        <CappadociaHighlight />
        <EasySteps />
        <Testimonials />
        <section className="bg-white py-12">
          <div className="mx-auto flex max-w-6xl justify-center px-4 md:px-0">
            <div className="relative h-16 w-full max-w-3xl">
              <Image
                src="/images/sponsor.png"
                alt="Our partners and sponsors"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
