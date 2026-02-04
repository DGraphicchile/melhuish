const featuredCars = [
  {
    id: '1',
    brand: 'Chevrolet',
    brandSlug: 'chevrolet',
    model: 'Tracker',
    year: '2024',
    type: 'SUV',
    price: 'Desde $14.990.000',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/autos-nuevos/chevrolet',
  },
  {
    id: '2',
    brand: 'Dongfeng',
    brandSlug: 'dongfeng',
    model: 'Rich 6',
    year: '2024',
    type: 'Pickup',
    price: 'Desde $12.490.000',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/autos-nuevos/dongfeng',
  },
  {
    id: '3',
    brand: 'Foton',
    brandSlug: 'foton',
    model: 'Tunland',
    year: '2024',
    type: 'Pickup',
    price: 'Desde $13.990.000',
    image: 'https://images.pexels.com/photos/7144175/pexels-photo-7144175.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/autos-nuevos/foton',
  },
];

export function ImageStrip() {
  return (
    <section className="featured-cars-section py-10 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-blue)' }}>
            Ofertas
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--color-deep-gray)' }}>
            Autos destacados
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
          {featuredCars.map((car) => (
            <a
              key={car.id}
              href={car.link}
              className="featured-car-card group block bg-white rounded-[1.5rem] overflow-hidden shadow-lg border border-[var(--color-border)] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[var(--color-light-blue)]"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#f0f1f3]">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="featured-car-brand">
                  {car.brand}
                </span>
              </div>
              <div className="featured-car-body p-5">
                <h3 className="featured-car-title">{car.model}</h3>
                <p className="featured-car-info">
                  {car.year} · {car.type}
                </p>
                <p className="featured-car-price">{car.price}</p>
                <span className="featured-car-cta">Ver más →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
