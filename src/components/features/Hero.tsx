import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 md:flex-row md:px-0">
        <div className="w-full md:w-1/2">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#DF6951]">
            EXPLORE THE WORLD! WITH TRAVELCINI
          </p>
          <h1 className="mb-4 text-4xl font-semibold leading-tight text-[#14183E] md:text-5xl">
            Travel,{" "}
            <span className="relative inline-block font-serif">
              enjoy
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2 translate-y-2 rounded-full bg-[#F1A501]" />
            </span>{" "}
            and live a new and full life
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-neutral-500 md:text-base">
            Built Wicket longer admire do barton vanity itself do in it.{" "}
            Preferred to sportsmen it engrossed listening. Park gate sell they
            west hard for the.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#create-trip"
              className="inline-flex items-center gap-2 rounded-full bg-[#F1A501] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F1A501]/40 transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span>Create Trips</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <div className="absolute -right-10 top-10 h-72 w-72 rounded-[60px] bg-[#4475F2] opacity-20 blur-3xl z-[-1] md:h-[22rem] md:w-[22rem]" />
          <div className="relative z-10 flex justify-center md:justify-end">
            <Image
              src="/images/human.png"
              alt="Traveler enjoying a trip"
              width={520}
              height={520}
              priority
              className="h-auto w-[260px] md:w-[420px] lg:w-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
