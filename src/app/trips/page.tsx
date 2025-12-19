import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TripsHero from "@/components/trips/TripsHero";
import TripsList from "@/components/trips/TripsList";

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28">
        <Suspense fallback={<div className="py-16 text-center text-sm text-neutral-500">Loading...</div>}>
          <TripsHero />
        </Suspense>
        <div className="mt-12">
          <TripsList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
