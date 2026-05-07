import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import HeroCarousel from '@/Components/HeroCarousel';
import { Calendar, Users, Map } from 'lucide-react';

export default function Welcome({ auth, headlines }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head title="Beranda - Nuragabuana" />

      {/* Kita oper properti auth ke Navbar jika nanti butuh logika login */}
      <Navbar auth={auth} />

      {/* Oper data headlines dinamis ke HeroCarousel */}
      <HeroCarousel headlines={headlines} />

      {/* Mapbox Section Preview */}
      <section id="peta" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Pemetaan Sebaran Bantuan</h2>
          <p className="text-gray-600 mt-2">Transparansi wilayah yang telah dan belum tersentuh bantuan.</p>
        </div>
        <div className="w-full h-[400px] bg-gray-300 rounded-xl shadow-inner flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
          <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg text-center">
            <Map className="h-10 w-10 text-green-600 mx-auto mb-2" />
            <h3 className="font-bold text-lg">Integrasi Mapbox Akan Tampil Disini</h3>
            <p className="text-sm text-gray-500">Visualisasi Marker Panti Asuhan & Posko</p>
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section id="event" className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Event Relawan Terdekat</h2>
              <p className="text-gray-600 mt-2">Pilih kegiatan dan tunggu konfirmasi Admin untuk bergabung.</p>
            </div>
            <a href="#" className="text-green-600 font-semibold hover:underline">Lihat Semua</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <img src="https://images.unsplash.com/photo-1593113514676-5915655381a1?auto=format&fit=crop&w=500&q=60" alt="Event" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1"/> 20 Jun 2026</span>
                    <span className="flex items-center"><Users className="h-4 w-4 mr-1"/> Butuh 15 Relawan</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Bakti Sosial Panti Asuhan Al-Falah</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">Kegiatan rutin pembagian sembako dan mengajar anak-anak panti asuhan.</p>

                  {/* Perbaikan Link Inertia ke static string untuk mencegah error Ziggy route */}
                  <Link
                    href="/login"
                    className="block text-center w-full bg-green-50 text-green-700 py-2 rounded font-semibold border border-green-200 hover:bg-green-600 hover:text-white transition"
                  >
                    Daftar Event (Butuh Login)
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 text-center">
        <h3 className="text-xl font-bold mb-4">Dukung Pergerakan Kami</h3>
        <p className="mb-2">Donasi dapat disalurkan melalui rekening resmi:</p>
        <div className="bg-gray-700 inline-block px-6 py-3 rounded-lg text-lg font-mono mb-4">
          BSI - 1234567890 a/n Nuragabuana
        </div>
        <p className="text-gray-400 text-sm">&copy; 2026 Platform Relawan & Pemetaan Bantuan</p>
      </footer>
    </div>
  );
}
