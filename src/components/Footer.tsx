
import logo from '@/assets/logo.png'
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto container flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">


        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Workout logo" width={25} height={25} />

          <h2 className="font-bold text-2xl"> FITLOG</h2>
        </Link>


        {/* Copyright */}
        <p className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

