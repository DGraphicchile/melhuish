import { Shield, CreditCard, Wrench } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Vehículos garantizados', desc: 'Calidad y respaldo en cada unidad.' },
  { icon: CreditCard, title: 'Financiamiento flexible', desc: 'Hasta 60 cuotas para que compres con tranquilidad.' },
  { icon: Wrench, title: 'Servicio postventa', desc: 'Mantención y repuestos originales.' },
];

export function FeatureBar() {
  return (
    <section className="py-16 bg-[hsl(var(--color-bg-alt))]">
      <div className="container mx-auto px-4">
        <div className="feature-bar">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="feature-bar-item">
              <div className="icon-wrap" style={{ backgroundColor: 'rgba(1, 53, 204, 0.1)' }}>
                <Icon className="w-6 h-6" style={{ color: 'var(--color-blue)' }} />
              </div>
              <p className="title" style={{ color: 'var(--color-deep-gray)' }}>{title}</p>
              <p className="desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
