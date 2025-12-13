import Image from "next/image";

export default function SubscribeCard() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <div className="relative overflow-hidden rounded-[40px] bg-[#F5F5FF] px-6 py-12 md:px-16 md:py-16 shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
          <h2 className="mb-8 text-center text-2xl font-semibold leading-relaxed text-[#14183E] md:text-[28px]">
            Subscribe to get information, latest news and other interesting
            offers about TravelCini
          </h2>

          <form className="mx-auto flex max-w-xl flex-col items-stretch gap-4 md:flex-row">
            <div className="flex flex-1 items-center rounded-full bg-white px-4 py-3 shadow-sm">
              <span className="mr-3 inline-flex h-5 w-5 items-center justify-center">
                <Image
                  src="/images/message.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </span>
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent text-sm text-[#4A4A4A] outline-none placeholder:text-[#A0A0B2]"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-[#F1A501] px-8 py-3 text-sm font-semibold text-white shadow-md shadow-[#F1A501]/40 transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

