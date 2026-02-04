import { Shield, HeadphonesIcon, Clock, Award } from 'lucide-react';

const items = [
  { icon: Shield, title: 'Garantía oficial', desc: 'Todos nuestros vehículos con respaldo de fábrica.' },
  { icon: HeadphonesIcon, title: 'Asesoría dedicada', desc: 'Un ejecutivo te acompaña de principio a fin.' },
  { icon: Clock, title: 'Servicio técnico', desc: 'Mantención y repuestos originales en todas las sucursales.' },
  { icon: Award, title: '20+ años', desc: 'Experiencia y confianza en el mercado chileno.' },
];

export function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="why-choose-us-inner container mx-auto px-4">
        <div className="why-choose-us-grid">
          <div className="why-choose-us-content">
            <p className="why-choose-us-label">Ventajas</p>
            <h2 className="why-choose-us-title">Por qué elegirnos</h2>
            <div className="why-choose-us-cards">
              {items.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="why-choose-us-card">
                  <div className="why-choose-us-card-icon">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="why-choose-us-card-title">{title}</h3>
                  <p className="why-choose-us-card-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="why-choose-us-car-wrap">
            <div className="why-choose-us-car-card">
              <img
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Vehículo Melhuish"
                className="why-choose-us-car-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
