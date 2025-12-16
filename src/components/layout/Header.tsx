import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Trips", href: "/trips" },
  { label: "Groups", href: "/groups" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-0">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logos.svg"
            alt="TravelCini"
            width={135}
            height={36}
            priority
            className="h-auto w-[135px]"
          />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-neutral-800 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-[#4475F2]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            type="button"
            className="hidden text-neutral-800 transition-colors hover:text-[#4475F2] md:inline-block"
          >
            Login
          </button>
          <button
            type="button"
            className="rounded-full border border-[#0073D9] bg-[#0073D9] px-6 py-2 text-sm font-semibold text-white shadow-md shadow-[#0073D9]/40 transition-transform transition-shadow hover:-translate-y-0.5 hover:bg-[#005fb1] hover:shadow-lg"
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
