import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  description: string;
  price?: string;
  priceFinancing?: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Foton MIDI Cabina Simple',
    description: 'Mini-camión de trabajo pesado',
    price: '$6.990.000',
    priceFinancing: '$6.290.000 + IVA',
    image: 'https://images.pexels.com/photos/7144175/pexels-photo-7144175.jpeg?auto=compress&cs=tinysrgb&w=1920',
    link: '/autos-nuevos/foton',
  },
  {
    id: 2,
    title: 'Dongfeng Aeolus Y3',
    description: 'SUV moderno y versátil',
    price: '$10.490.000',
    priceFinancing: '$9.990.000',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920',
    link: '/autos-nuevos/dongfeng',
  },
  {
    id: 3,
    title: 'Chevrolet Nueva Captiva EV/PHEV',
    description: 'El futuro eléctrico llegó',
    priceFinancing: '$26.990.000',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1920',
    link: '/autos-nuevos/chevrolet',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-carousel relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-item ${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute inset-0 transition-opacity duration-500`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="hero-carousel-overlay">
            <div className="hero-carousel-content">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 mb-6">
                {slide.description}
              </p>
              <div className="space-y-2 mb-6">
                {slide.price && (
                  <p className="text-lg">
                    <span className="text-gray-300">Precio de lista:</span>{' '}
                    <span className="font-semibold">{slide.price}</span>
                  </p>
                )}
                {slide.priceFinancing && (
                  <p className="text-2xl">
                    <span className="text-gray-300">Precio con financiamiento:</span>{' '}
                    <span className="font-bold" style={{ color: 'var(--color-light-blue)' }}>{slide.priceFinancing}</span>
                  </p>
                )}
              </div>
              <button className="btn btn-primary" onClick={() => window.location.href = slide.link}>
                Ver más
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="carousel-indicators absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'active w-8' : ''
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
