import { Car } from 'lucide-react';

const brands = [
  { name: 'Chevrolet', slug: 'chevrolet' },
  { name: 'Dongfeng', slug: 'dongfeng' },
  { name: 'Foton', slug: 'foton' },
];

export function BrandsSection() {
  return (
    <section className="brands-section py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-12 text-white">Nuestras Marcas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <a
              key={brand.slug}
              href={`/autos-nuevos/${brand.slug}`}
              className="brand-card"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center">
                <Car className="w-12 h-12" />
              </div>
              <h3 className="brand-name text-center mb-2">{brand.name}</h3>
              <p className="text-center" style={{ color: 'var(--color-light-blue)' }}>Ver catálogo</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
