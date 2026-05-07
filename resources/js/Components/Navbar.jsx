import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk mendeteksi scroll agar navbar menjadi lebih solid saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Container Navbar dengan efek Glassmorphism & Pill Shape */}
        <nav className={`relative flex items-center justify-between rounded-full transition-all duration-500 px-6 py-3 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg border border-gray-100' : 'bg-white/60 backdrop-blur-sm shadow-sm border border-white/50'}`}>

          {/* Kiri: Logo */}
          <div className="flex-shrink-0 flex items-center z-10">
            <MapPin className="h-7 w-7 text-green-600" />
            <span className="ml-2 text-xl font-extrabold text-gray-800 tracking-tight drop-shadow-sm">
              Nuragabuana
            </span>
          </div>

          {/* Tengah: Menu Link (Posisi Absolute agar presisi di tengah layar) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10">
            <Link href="/" className="text-gray-800 hover:text-green-600 font-bold transition drop-shadow-sm">
              Beranda
            </Link>
            <a href="#peta" className="text-gray-800 hover:text-green-600 font-bold transition drop-shadow-sm">
              Peta Sebaran
            </a>
            <a href="#event" className="text-gray-800 hover:text-green-600 font-bold transition drop-shadow-sm">
              Event
            </a>
          </div>

          {/* Kanan: Tombol & Mobile Toggle */}
          <div className="flex items-center z-10">
            <div className="hidden md:block">
              {auth?.user ? (
                <Link
                  href="/dashboard"
                  className="bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200"
                >
                  Login Relawan
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-4 bg-white/80 p-2 rounded-full text-gray-800 hover:text-green-600 focus:outline-none shadow-sm"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu (Floating Card) */}
        <div className={`md:hidden absolute top-full left-4 right-4 mt-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-4 space-y-2 transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
          <Link href="/" className="block px-4 py-3 text-gray-800 font-bold hover:bg-green-50 hover:text-green-600 rounded-xl transition">
            Beranda
          </Link>
          <a href="#peta" className="block px-4 py-3 text-gray-800 font-bold hover:bg-green-50 hover:text-green-600 rounded-xl transition">
            Peta Sebaran
          </a>
          <a href="#event" className="block px-4 py-3 text-gray-800 font-bold hover:bg-green-50 hover:text-green-600 rounded-xl transition">
            Event
          </a>
          <div className="pt-3 pb-1 border-t border-gray-100 mt-2">
            <Link
              href={auth?.user ? "/dashboard" : "/login"}
              className="block w-full text-center bg-green-600 text-white px-4 py-3.5 rounded-xl font-extrabold shadow-md hover:bg-green-700 transition"
            >
              {auth?.user ? "Dashboard" : "Login Relawan"}
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
