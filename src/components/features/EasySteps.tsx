import Image from "next/image";

const steps = [
  {
    number: "1",
    title: "Find Your Travel Buddy",
  },
  {
    number: "2",
    title: "Decide Where to Go",
  },
  {
    number: "3",
    title: "Book Securely",
  },
];

export default function EasySteps() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 md:flex-row md:items-center md:px-0">
        <div className="w-full md:w-1/2">
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#0073D9]">
            Easy and Fast
          </p>
          <h2 className="mb-8 text-3xl font-semibold leading-tight text-[#14183E] md:text-[40px]">
            Book Your Next Trip
            <br />
            In 3 Easy Steps
          </h2>

          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1A501] text-sm font-semibold text-white">
                  {step.number}
                </div>
                <p className="text-sm font-medium text-[#14183E]">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full justify-center md:w-1/2 md:justify-end">
          <Image
            src="/images/cards.png"
            alt="Trip booking overview card"
            width={420}
            height={320}
            className="h-auto w-full max-w-md rounded-[32px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
