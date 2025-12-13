import Image from "next/image";

const destinations = [
  {
    image: "/images/otel1.jpeg",
    name: "Trendy Lara",
    price: "$5.42k",
    days: "10 Days Trip",
  },
  {
    image: "/images/otel2.jpeg",
    name: "Sarp Otel",
    price: "$4.2k",
    days: "12 Days Trip",
  },
  {
    image: "/images/otel3.jpeg",
    name: "Red Cast",
    price: "$15k",
    days: "28 Days Trip",
  },
];

export default function TopDestinations() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#0073D9]">
            Top Selling
          </p>
          <h2 className="text-3xl font-semibold text-[#14183E] md:text-[40px]">
            Top Destinations
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
            >
              <div className="relative h-56 w-full md:h-64">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative flex flex-1 flex-col justify-between bg-white px-6 pb-6 pt-5">
                <div className="absolute -top-8 left-5 h-12 w-12">
                  <Image
                    src="/images/basari.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="mb-3 flex items-center justify-between text-sm font-semibold text-[#14183E]">
                  <span>{destination.name}</span>
                  <span>{destination.price}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="inline-flex h-4 w-4 items-center justify-center">
                    <Image
                      src="/images/location.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  </span>
                  <span>{destination.days}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

