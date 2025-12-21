import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28">
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center md:px-0">
            <div className="relative mb-8 h-48 w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.12)]">
              <Image
                src="/images/trips.jpeg"
                alt="Airplane flying in the sky"
                fill
                className="object-cover"
              />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
              Groups
            </p>
            <h1 className="mb-3 text-2xl font-semibold leading-tight text-[#14183E] md:text-3xl">
              Group trips are coming soon
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
              We&apos;re building a new way to plan trips together with your friends and travel
              buddies. Soon you&apos;ll be able to create shared groups, vote on ideas and keep
              every detail in one place.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
