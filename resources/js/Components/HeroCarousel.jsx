import React, { useState, useEffect } from 'react';

export default function HeroCarousel({ headlines = [] }) {
  const [current, setCurrent] = useState(0);

  // Jika database kosong, kita sediakan 1 slide default agar web tidak error/kosong
  const slides = headlines.length > 0 ? headlines : [
    {
      id: 'default',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Selamat Datang di Nuragabuana',
      description: 'Platform manajemen relawan dan pemetaan distribusi bantuan.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden pt-16">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

          {/* Logika untuk menampilkan gambar dari Storage Laravel atau link eksternal */}
          <img
            src={slide.image.startsWith('http') ? slide.image : `/storage/${slide.image}`}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg md:text-xl mb-8">
              {slide.description || 'Bersama menciptakan pemerataan aksi sosial.'}
            </p>
            <button className="bg-green-600 px-6 py-3 rounded-md text-white font-semibold hover:bg-green-700 transition">
              Gabung Relawan Sekarang
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
