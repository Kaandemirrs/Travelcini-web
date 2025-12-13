import Image from "next/image";

const cards = [
  {
    icon: "/images/pusulaa.svg",
    title: "Best Flights",
    description:
      "Don't you know where to go? Use our digital compass, find the route that best suits your mood in seconds.",
  },
  {
    icon: "/images/orta.svg",
    title: "Plan Together",
    description:
      "Invite your friends, form a travel group and organize your dream vacation by chatting with your loved ones.",
  },
  {
    icon: "/images/plane.svg",
    title: "All-in-One Trip",
    description:
      "Your tickets, routes and plans on a single simple screen. There is no chaos, only the pleasure of the holiday.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#0073D9]">
            CATEGORY
          </p>
          <h2 className="text-3xl font-semibold text-[#14183E] md:text-[40px]">
            We Offer Best Services
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const isPlane = card.title === "All-in-One Trip";
            const iconSize = isPlane ? 52 : 40;

            return (
            <div
              key={card.title}
              className="relative flex h-full flex-col rounded-[32px] bg-white p-8 shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5F8FF]">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={iconSize}
                  height={iconSize}
                  className={isPlane ? "h-12 w-12" : "h-10 w-10"}
                />
              </div>

              <h3 className="mb-3 text-base font-semibold text-[#14183E]">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {card.description}
              </p>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
