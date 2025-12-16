import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TripsHero from "@/components/trips/TripsHero";

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28">
        <TripsHero />
      </main>
      <Footer />
    </div>
  );
}
