import { Search, ChevronDown, Tag } from 'lucide-react';

const HERO_BG_IMAGE = '/hero-bg.png';

const BRANDS = [
  { value: '', label: 'Todas las marcas' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'dongfeng', label: 'Dongfeng' },
  { value: 'foton', label: 'Foton' },
];

export function HeroCarousel() {
  return (
    <section className="hero-carousel section-curve relative overflow-hidden">
      <div
        className="hero-bg-image"
        style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }}
        aria-hidden
      />
      <div className="hero-carousel-overlay">
        {/* Líneas decorativas de fondo */}
        <div className="hero-lines" aria-hidden>
          <div className="hero-line hero-line-1" />
          <div className="hero-line hero-line-2" />
          <div className="hero-line hero-line-3" />
          <div className="hero-line hero-line-4" />
          <div className="hero-line hero-line-5" />
        </div>

        <div className="hero-carousel-inner">
          <div className="hero-carousel-content">
            <a href="/" className="hero-logo-link" aria-label="Melhuish - Inicio">
              <img src="/logo-blanco.svg" alt="Melhuish" className="hero-logo" />
            </a>
            <h1 className="hero-title">
              Donde tu auto <span className="hero-title-accent">brilla como nuevo</span>
            </h1>
            <p className="hero-lead">
              Transforma tu experiencia con vehículos nuevos, seminuevos y servicio técnico oficial. Más de 20 años contigo.
            </p>
            <button
              className="btn btn-primary hero-cta-btn"
              onClick={() => (window.location.href = '/autos-nuevos')}
            >
              Ver vehículos
            </button>
          </div>
        </div>

        {/* Buscador debajo del contenido (texto + botón) */}
        <div className="hero-search-card">
          <form
            className="hero-search-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const kw = (form.querySelector('[name="keyword"]') as HTMLInputElement)?.value;
              const brand = (form.querySelector('[name="brand"]') as HTMLSelectElement)?.value;
              window.location.href = brand ? `/autos-nuevos/${brand}` : `/autos-nuevos${kw ? `?q=${encodeURIComponent(kw)}` : ''}`;
            }}
          >
            <div className="hero-search-field">
              <label className="hero-search-label" htmlFor="hero-keyword">
                <Search className="hero-search-label-icon" />
                Palabra clave
              </label>
              <input
                id="hero-keyword"
                type="search"
                name="keyword"
                placeholder="Ej. SUV, pickup..."
                className="hero-search-input"
              />
            </div>
            <div className="hero-search-field">
              <label className="hero-search-label" htmlFor="hero-brand">
                <Tag className="hero-search-label-icon" />
                Marca
              </label>
              <div className="hero-search-select-wrap">
                <select id="hero-brand" name="brand" className="hero-search-select" defaultValue="">
                  {BRANDS.map((b) => (
                    <option key={b.value || 'all'} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="hero-search-chevron" style={{ color: 'var(--color-blue)' }} aria-hidden />
              </div>
            </div>
            <button type="submit" className="btn btn-primary hero-search-btn">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
