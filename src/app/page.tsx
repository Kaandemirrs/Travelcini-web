import Header from "@/components/layout/Header";
import Hero from "@/components/features/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
