"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Trips", href: "/trips" },
  { label: "Groups", href: "/groups" },
];

export default function Header() {
  const { user, logout } = useAuth();

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

        {!user ? (
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/login"
              className="hidden text-neutral-800 transition-colors hover:text-[#4475F2] md:inline-block"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-[#0073D9] bg-[#0073D9] px-6 py-2 text-sm font-semibold text-white shadow-md shadow-[#0073D9]/40 transition-transform transition-shadow hover:-translate-y-0.5 hover:bg-[#005fb1] hover:shadow-lg"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-neutral-800 transition hover:border-neutral-200 hover:bg-neutral-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                <User className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">
                {user.displayName || "Profilim"}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-500 transition hover:bg-red-50 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
