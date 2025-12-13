import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 md:flex-row md:items-center md:px-0">
        <div className="w-full md:w-1/2">
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#0073D9]">
            Testimonials
          </p>
          <h2 className="mb-4 text-3xl font-semibold leading-tight text-[#14183E] md:text-[40px]">
            What Our Travelers Say
          </h2>
          <p className="text-sm leading-relaxed text-neutral-500 md:text-base">
            Hear real experiences from people who discovered the world with
            TravelCini. Honest reviews that help you plan your next adventure
            with confidence.
          </p>
        </div>

        <div className="flex w-full justify-center md:w-1/2 md:justify-end">
          <div className="relative h-[320px] w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/yorum.png"
              alt="Traveler reviews"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

