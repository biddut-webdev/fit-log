
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-[#15171D] text-white">
      <div className="container mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

        {/* Left Content */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. LOG <br /> EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* CTA */}
          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#ccff00] px-6 py-3 font-black text-black transition hover:scale-105"
          >
            BROWSE WORKOUTS
            <ArrowDown size={18} />
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src={heroImage}
            alt="FitLog workout"
            width={500}
            height={300}
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;
