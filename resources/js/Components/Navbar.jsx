import React, { useState } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Nama Komunitas */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <MapPin className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-800 tracking-tight">
                Nuragabuana
              </span>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-green-600 font-medium transition">
              Beranda
            </Link>
            <a href="#peta" className="text-gray-600 hover:text-green-600 font-medium transition">
              Peta Sebaran
            </a>
            <a href="#event" className="text-gray-600 hover:text-green-600 font-medium transition">
              Event
            </a>

            {/* Tombol Login Dinamis */}
            {auth?.user ? (
              <Link
                href="/dashboard"
                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition font-semibold"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition font-semibold"
              >
                Login Relawan
              </Link>
            )}
          </div>

          {/* Tombol Menu Mobile (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <Link href="/" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">
            Beranda
          </Link>
          <a href="#peta" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">
            Peta Sebaran
          </a>
          <a href="#event" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">
            Event
          </a>
          <hr className="my-2 border-gray-100" />
          <Link
            href="/login"
            className="block w-full text-center bg-green-600 text-white px-3 py-2 rounded-md font-bold"
          >
            Login Relawan
          </Link>
        </div>
      )}
    </nav>
  );
}
