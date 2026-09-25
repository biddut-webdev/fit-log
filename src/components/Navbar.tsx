
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from '@/assets/logo.png'
import Image from "next/image";
import { useContext } from "react";
import { FitLogContext } from "@/context/FitLogContext";


const Navbar = () => {

  const context = useContext(FitLogContext);

  const planCount = context?.plan.length ?? 0;
  const savedCount = context?.saved.length ?? 0;

  const pathname = usePathname();

  return (
    <header className="border-b border-white/10 bg-[#15171D] text-white">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Workout logo" width={25} height={25} />

          <h2 className="font-bold text-2xl"> FITLOG</h2>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">

          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pathname === "/" || pathname.startsWith("/workouts")
              ? "bg-[#1F2808] text-[#ccff00]"
              : "text-gray-400 hover:text-white"
              }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pathname === "/my-plan"
              ? "bg-[#1F2808] text-[#ccff00]"
              : "text-gray-400 hover:text-white"
              }`}
          >
            My Plan
          </Link>

        </nav>

        {/* Counters */}

        <div className="flex items-center gap-6">

          <Link href="/my-plan" className="font-semibold text-gray-400">
            Plan{" "}
            <span className="rounded-full bg-[#ccff00] px-2.5 py-1 text-center text-black">
              {planCount}
            </span>
          </Link>

          <Link href="/my-plan" className="font-semibold text-gray-400">
            Saved{" "}
            <span className="rounded-full border border-white/40 px-3 py-1 text-white">
              {savedCount}
            </span>
          </Link>

        </div>


      </div>
    </header>
  );
};

export default Navbar;
