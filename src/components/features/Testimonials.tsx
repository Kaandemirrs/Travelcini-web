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
          <Image
            src="/images/yorum.png"
            alt="Traveler reviews"
            width={420}
            height={320}
            className="h-auto w-full max-w-md rounded-[32px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
