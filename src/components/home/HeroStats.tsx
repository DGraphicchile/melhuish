const stats = [
  { number: '+6', label: 'Sucursales', href: '/sucursales' },
  { number: '3', label: 'Marcas', href: '/autos-nuevos' },
  { number: '20', label: 'Años', href: '/' },
];

export function HeroStats() {
  return (
    <div className="hero-stats">
      {stats.map(({ number, label, href }) => (
        <a
          key={label}
          href={href}
          className="hero-stat-circle"
          aria-label={`${number} ${label}`}
        >
          <span className="number">{number}</span>
          <span className="label">{label}</span>
        </a>
      ))}
    </div>
  );
}
