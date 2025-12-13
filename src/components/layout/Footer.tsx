import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: ["About", "Careers", "Mobile"],
  },
  {
    title: "Contact",
    links: ["Help/FAQ", "Press", "Affiliates"],
  },
  {
    title: "More",
    links: ["Airlinefees", "Airline", "Low fare tips"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white pb-10 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:justify-between md:px-0">
        <div className="w-full md:w-1/4">
          <div className="mb-4">
            <Image
              src="/images/logos.svg"
              alt="TravelCini"
              width={150}
              height={40}
              className="h-auto w-[150px]"
            />
          </div>
          <p className="text-xs leading-relaxed text-neutral-500 md:text-sm">
            Book your trip in minutes, get full control for much longer.
          </p>
        </div>

        <div className="flex flex-1 flex-wrap gap-10">
          {columns.map((column) => (
            <div key={column.title} className="min-w-[120px]">
              <h3 className="mb-3 text-sm font-semibold text-[#14183E]">
                {column.title}
              </h3>
              <ul className="space-y-2 text-xs text-neutral-500 md:text-sm">
                {column.links.map((item) => (
                  <li key={item}>
                    <Link href="#" className="transition-colors hover:text-[#0073D9]">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/4">
          <div className="mb-4 flex items-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md shadow-black/5"
            >
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF9A9E] via-[#FECFEF] to-[#9F8CFF] shadow-md shadow-black/10"
            >
              <Image
                src="/images/instagram.svg"
                alt="Instagram"
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </button>
          </div>

          <p className="mb-3 text-xs font-semibold text-[#14183E] md:text-sm">
            Discover our app
          </p>

          <div className="flex flex-wrap gap-3">
            <button type="button">
              <Image
                src="/images/playstore.svg"
                alt="Get it on Google Play"
                width={120}
                height={36}
                className="h-9 w-auto"
              />
            </button>
            <button type="button">
              <Image
                src="/images/appstore.svg"
                alt="Download on the App Store"
                width={120}
                height={36}
                className="h-9 w-auto"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-neutral-400">
        www.travelcini.com
      </div>
    </footer>
  );
}

