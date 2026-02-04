const brands = [
  { name: 'Chevrolet', slug: 'chevrolet', logo: '/logos/chevrolet.svg', desc: 'Calidad y tecnología en cada modelo.' },
  { name: 'Dongfeng', slug: 'dongfeng', logo: '/logos/dongfeng.svg', desc: 'Diseño y confort para tu día a día.' },
  { name: 'Foton', slug: 'foton', logo: '/logos/foton.svg', desc: 'Soluciones comerciales y de trabajo.' },
];

export function BrandsSection() {
  return (
    <section className="brands-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-light-blue)' }}>
            Marcas
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Nuestras Marcas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {brands.map((brand) => (
            <a
              key={brand.slug}
              href={`/autos-nuevos/${brand.slug}`}
              className="brands-card group flex flex-col rounded-[1.5rem] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="brands-card-logo-wrap">
                <img src={brand.logo} alt={brand.name} className="brand-logo-img" />
              </div>
              <h3 className="brands-card-name text-xl font-bold mb-2">{brand.name}</h3>
              <p className="brands-card-desc text-sm mb-6">{brand.desc}</p>
              <span className="mt-auto text-sm font-semibold brands-card-link">
                Ver catálogo →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
