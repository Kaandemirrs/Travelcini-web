import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SiteNoticePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28">
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
              Site notice
            </p>
            <h1 className="mb-6 text-3xl font-semibold leading-tight text-[#14183E] md:text-[34px]">
              Legal information and contact details
            </h1>

            <div className="space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base">
              <div>
                <p className="font-semibold text-[#14183E]">Operator of this website</p>
                <p>
                  Bülent Kaygisiz
                  <br />
                  Sassmannstraße 11 Haus 8
                  <br />
                  3107 St. Pölten - Viehofen
                  <br />
                  3107 Austria
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#14183E]">Contact</p>
                <p>
                  Phone: +43 677 61580804
                  <br />
                  Email: travelcini@gmail.com
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#14183E]">Jurisdiction</p>
                <p>
                  In the event of any legal disputes, the courts of St. Pölten, Austria,
                  shall have jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

