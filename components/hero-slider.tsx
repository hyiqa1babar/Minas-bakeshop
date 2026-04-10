'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'Vintage',
    titleSub: 'Cakes',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.png-7N0HNAirUbOjVC3QFVx1uUtQEpaTdE.jpeg',
    link: '/shop/vintage-cakes',
  },
  {
    id: 2,
    title: 'Baby',
    titleSub: 'Cakes',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.png-ZagAKyZmobknOLTJC0OV6yB37moMtO.jpeg',
    link: '/shop/baby-cakes',
  },
  {
    id: 3,
    title: 'Fresh Flower',
    titleSub: 'Cakes',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.png-jyfQTlj46bKAFdjIKf5QXYnQ65NQbr.jpeg',
    link: '/shop/fresh-flower-cakes',
  },
  {
    id: 4,
    title: 'Luxury',
    titleSub: 'Gifting',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.png-9AGArQTgiaoZqori9NLyR76Qln3j9I.jpeg',
    link: '/shop/luxury-gifting',
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isClient, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div
      className="relative w-full h-96 md:h-[500px] overflow-hidden bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {heroSlides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === currentIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
          suppressHydrationWarning
        >
          {/* Full-width background image */}
          <img
            src={s.image}
            alt={`${s.title} ${s.titleSub}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Order Now Button */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-[2]">
            <Link
              href={s.link}
              className="inline-block px-8 py-3 bg-[#F283AE] hover:bg-[#E86FA3] text-white font-semibold rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Order Now
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-[#2C2C2C]" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-[#2C2C2C]" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex
                ? 'bg-[#F283AE] w-8'
                : 'bg-white/60 hover:bg-white/80 w-2'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

