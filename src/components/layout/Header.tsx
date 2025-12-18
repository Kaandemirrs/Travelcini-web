"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Menu, User, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Trips", href: "/trips" },
  { label: "Groups", href: "/groups" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <>
            <div className="hidden items-center gap-6 text-sm font-medium md:flex">
              <Link
                href="/login"
                className="text-neutral-800 transition-colors hover:text-[#4475F2]"
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
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-2 text-neutral-700 md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            <div className="hidden items-center gap-4 text-sm font-medium md:flex">
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
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-2 text-neutral-700 md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {mobileOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-x-0 top-0 z-50 rounded-b-3xl bg-white px-4 pb-6 pt-5 shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <Image
                  src="/images/logos.svg"
                  alt="TravelCini"
                  width={120}
                  height={32}
                  className="h-auto w-[120px]"
                />
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-2 text-neutral-700"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mx-auto mt-4 max-w-6xl border-t border-neutral-100 pt-4">
              <nav className="flex flex-col gap-2 text-sm font-medium text-neutral-800">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full px-3 py-2 hover:bg-neutral-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 flex flex-col gap-2">
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      className="w-full rounded-full border border-neutral-200 px-4 py-2 text-center text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="w-full rounded-full bg-[#0073D9] px-4 py-2 text-center text-sm font-semibold text-white shadow-md shadow-[#0073D9]/40 hover:bg-[#005fb1]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                        <User className="h-4 w-4" />
                      </span>
                      <span>{user.displayName || "Profilim"}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-neutral-500 hover:bg-red-50 hover:text-red-500"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
