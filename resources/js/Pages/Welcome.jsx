import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import HeroCarousel from '@/Components/HeroCarousel';
import { Calendar, Users, Map, ArrowRight, Heart, MapPin, Eye } from 'lucide-react';

export default function Welcome({ auth, headlines, articles, events }) {
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-gray-800">
      <Head title="Beranda - Nuragabuana" />

      {/* Navbar Transparan & Mengambang */}
      <Navbar auth={auth} />

      {/* Section Hero Carousel (Gambar berganti otomatis) */}
      <div className="relative w-full">
        <HeroCarousel headlines={headlines} />
      </div>

      {/* Section Peta Sebaran - Desain Glassmorphism Modern */}
      <section id="peta" className="relative py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-green-600 font-extrabold tracking-wider text-sm uppercase bg-green-100 px-3 py-1 rounded-full">Transparansi Data</span>
          <h2 className="text-4xl font-black text-gray-900 mt-4 mb-3">Pemetaan Sebaran Bantuan</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Pantau wilayah yang telah tersentuh bantuan komunitas secara *real-time* untuk memastikan distribusi yang merata.
          </p>
        </div>

        {/* Wadah Mapbox */}
        <div className="relative w-full h-[450px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition duration-300 border border-white/50">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-extrabold text-xl text-gray-900">Integrasi Mapbox Aktif Disini</h3>
              <p className="text-sm text-gray-600 mt-2 max-w-xs">Visualisasi marker koordinat panti asuhan dan posko secara interaktif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Event - Mengambil Data Dinamis dari Database */}
      <section id="event" className="bg-white py-24 px-4 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-gray-900">Jadwal Kerelawanan</h2>
              <p className="text-gray-500 mt-3 text-lg">Ambil peranmu! Daftar kegiatan terdekat dan tunggu persetujuan dari pengurus.</p>
            </div>
            <a href="#" className="mt-4 md:mt-0 group flex items-center text-green-600 font-bold hover:text-green-700 transition">
              Lihat Semua Event <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events && events.length > 0 ? (
              events.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image ? (item.image.startsWith('http') ? item.image : `/storage/${item.image}`) : 'https://images.unsplash.com/photo-1593113514676-5915655381a1?auto=format&fit=crop&w=600&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> {item.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center text-xs text-gray-500 mb-4 gap-3 font-medium">
                      <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                        <Calendar className="h-3 w-3 mr-1.5 text-green-600"/> {new Date(item.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center bg-blue-50 px-2 py-1 rounded-md text-blue-600">
                        <Eye className="h-3 w-3 mr-1.5"/> {item.views || 0} Dilihat
                      </span>
                      <span className="flex items-center bg-orange-50 px-2 py-1 rounded-md text-orange-600">
                        <Users className="h-3 w-3 mr-1.5"/> {item.users_count || 0} Terdaftar
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">{item.description}</p>

                    <Link
                      href={`/event/${item.id}`}
                      className="mt-auto flex items-center justify-center w-full bg-green-50 text-green-700 py-3.5 rounded-xl font-bold border border-green-200 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm"
                    >
                      Lihat Detail & Daftar
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">Belum ada jadwal kegiatan yang tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Artikel - Layout Editorial */}
      <section id="artikel" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900">Kabar Nuragabuana</h2>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">Cerita, laporan kegiatan, dan informasi terbaru seputar pergerakan kerelawanan kita.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className="group cursor-pointer">
                <div className="relative rounded-3xl overflow-hidden mb-5">
                  <img
                    src={article.image ? (article.image.startsWith('http') ? article.image : `/storage/${article.image}`) : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=60'}
                    alt={article.title}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>

                <div>
                  <span className="text-xs font-black text-green-600 uppercase tracking-widest">Artikel Terkini</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-3 leading-tight group-hover:text-green-600 transition-colors">{article.title}</h3>
                  <p className="text-gray-500 text-base mb-4 line-clamp-2">
                    {article.content ? article.content.replace(/<[^>]*>?/gm, '') : ''}
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs mr-3">
                        {article.author?.name ? article.author.name.charAt(0) : 'A'}
                      </div>
                      <span className="text-sm font-medium text-gray-600">{article.author?.name || 'Admin'}</span>
                    </div>
                    <Link href={`/artikel/${article.slug}`} className="text-sm font-bold text-green-600 hover:text-green-700">Baca &rarr;</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Belum ada catatan cerita yang dipublikasikan saat ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Profesional */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12 mb-8">
          <div>
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-2xl font-extrabold text-white tracking-tight">Nuragabuana</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Platform pendigitalisasian manajemen relawan dan pemetaan distribusi bantuan sosial untuk memastikan setiap amanah tepat sasaran.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-green-400 transition">Beranda</a></li>
              <li><a href="#peta" className="hover:text-green-400 transition">Peta Sebaran Bantuan</a></li>
              <li><a href="#event" className="hover:text-green-400 transition">Jadwal Event</a></li>
              <li><a href="#artikel" className="hover:text-green-400 transition">Berita & Cerita</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Dukung Pergerakan Kami</h4>
            <p className="mb-4 text-gray-400">Salurkan kepedulianmu melalui rekening resmi komunitas:</p>
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl">
              <span className="block text-sm text-gray-400 mb-1">Bank Syariah Indonesia (BSI)</span>
              <span className="block text-xl font-mono text-green-400 font-bold mb-1">1234 5678 90</span>
              <span className="block text-sm font-medium text-white">a/n Komunitas Nuragabuana</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 Platform Manajemen Relawan & Pemetaan Spasial.
          </p>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            Dikembangkan untuk pemerataan aksi sosial.
          </p>
        </div>
      </footer>
    </div>
  );
}
