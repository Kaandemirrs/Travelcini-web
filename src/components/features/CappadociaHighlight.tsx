import Image from "next/image";
import Link from "next/link";

const images = ["/images/f1.png", "/images/f2.png", "/images/f3.png"];

export default function CappadociaHighlight() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 md:flex-row md:items-start md:px-0">
        <div className="w-full md:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-[#14183E] md:text-[40px]">
            5 Points to Watch Balloon Best in Cappadocia
          </h2>

          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-[#0073D9] px-5 py-2 text-xs font-semibold text-white">
              Travel Guide
            </span>
            <span className="inline-flex items-center rounded-full bg-[#0073D9] px-5 py-2 text-xs font-semibold text-white">
              Editor&apos;s Pick
            </span>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col items-end gap-6 md:w-1/2">
          <div className="flex w-full justify-end gap-4">
            {images.map((src, index) => (
              <div
                key={src}
                className={`relative h-64 w-[33%] overflow-hidden rounded-[28px] shadow-[0_24px_40px_rgba(0,0,0,0.15)] ${
                  index === 0 ? "mt-6" : ""
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>

          <Link
            href="/cappadocia-balloons"
            className="inline-flex items-center gap-3 rounded-full bg-[#F1A501] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-[#F1A501]/40 transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span>View Details</span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
