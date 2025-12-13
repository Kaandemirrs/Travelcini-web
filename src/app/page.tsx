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
        <SubscribeCard />
      </main>
      <Footer />
    </div>
  );
}
