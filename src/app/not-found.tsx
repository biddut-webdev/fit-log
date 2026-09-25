
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0b0b0b] px-4 text-center text-white">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ccff00]">
        404 ERROR
      </p>

      <h1 className="mt-4 text-6xl font-black sm:text-8xl">
        NOT FOUND
      </h1>

      <p className="mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
        The workout you are looking for does not exist or the page has
        been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black transition hover:opacity-90"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;
