import { Sparkles, ArrowRight } from 'lucide-react';

const IMG_CAR_INTERIOR = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600';
const IMG_DETAIL = 'https://images.pexels.com/photos/3764983/pexels-photo-3764983.jpeg?auto=compress&cs=tinysrgb&w=600';
const IMG_HERO_CAR = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1000';

export function IntroSection() {
  return (
    <section className="intro-section py-12 lg:py-16">
      <div className="intro-section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Izquierda: logo, título, texto, CTA, dos imágenes cuadradas */}
          <div className="intro-left">
            <a href="/" className="intro-logo-wrap" aria-label="Melhuish">
              <img src="/logo-blanco.svg" alt="Melhuish" className="intro-logo-black" />
            </a>
            <h2 className="intro-heading">
              Tu próximo auto te espera
            </h2>
            <p className="intro-text">
              Más de 20 años de experiencia en el mercado automotriz. Encuentra vehículos nuevos y seminuevos,
              servicio técnico oficial y repuestos. Te acompañamos en cada paso.
            </p>
            <button
              className="btn btn-primary intro-cta"
              onClick={() => (window.location.href = '/?modal=cotizar')}
            >
              <span>Cotizar ahora</span>
              <span className="intro-cta-arrow">
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
            <div className="intro-two-images">
              <img src={IMG_CAR_INTERIOR} alt="Interior vehículo" className="intro-square-img" />
              <img src={IMG_DETAIL} alt="Detalle servicio" className="intro-square-img" />
            </div>
          </div>

          {/* Derecha: card alta (más larga que ancha) con imagen y un solo elemento glass: solo icono */}
          <div className="intro-right">
            <div className="intro-hero-card">
              <div className="intro-hero-bg" style={{ backgroundImage: `url(${IMG_HERO_CAR})` }} />
              <div className="intro-glass-badge">
                <Sparkles className="w-6 h-6" style={{ color: 'var(--color-cyan)' }} aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
