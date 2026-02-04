import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const locations = [
  {
    id: 'santiago',
    name: 'Santiago',
    image: 'https://images.pexels.com/photos/3764983/pexels-photo-3764983.jpeg?auto=compress&cs=tinysrgb&w=600',
    address: 'Av. Principal 1234, Santiago',
    phone: '22 706 4400',
    email: 'ventas@melhuish.cl',
    hours: 'Lun - Vie 9:00 - 19:00, Sáb 9:00 - 14:00',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424999.318!2d-70.648!3d-33.449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4524e0a7c6f%3A0x2c2f2e8b8b8b8b8b!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1',
  },
  {
    id: 'centro',
    name: 'Sala Centro',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
    address: 'Av. Libertador 500, Santiago',
    phone: '22 706 4400',
    email: 'ventas@melhuish.cl',
    hours: 'Lun - Vie 9:00 - 19:00',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424999.318!2d-70.648!3d-33.449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4524e0a7c6f%3A0x2c2f2e8b8b8b8b8b!2sSantiago!5e0!3m2!1ses!2scl!4v1',
  },
];

export function SalesRoomSection() {
  const [activeId, setActiveId] = useState(locations[0].id);
  const active = locations.find((l) => l.id === activeId) ?? locations[0];

  return (
    <section className="sales-room">
      <div className="container mx-auto px-4">
        <div className="sales-room-header">
          <p className="sales-room-label">Visítanos</p>
          <h2 className="sales-room-title">Sala de ventas</h2>
          <p className="sales-room-subtitle">
            Encuéntranos en Santiago. Te esperamos con el mejor servicio.
          </p>
        </div>

        <div className="sales-room-radio-cards">
          {locations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setActiveId(loc.id)}
              className={`sales-room-radio-card ${activeId === loc.id ? 'sales-room-radio-card-active' : ''}`}
            >
              <div className="sales-room-radio-image-wrap">
                <img src={loc.image} alt={loc.name} className="sales-room-radio-img" />
                <span className="sales-room-radio-dot" />
              </div>
              <span className="sales-room-radio-label">{loc.name}</span>
            </button>
          ))}
        </div>

        <div className="sales-room-grid">
          <div className="sales-room-map-wrap">
            <div className="sales-room-map-card">
              <iframe
                src={active.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Santiago Chile"
              />
            </div>
          </div>
          <div className="sales-room-contact">
            <div className="sales-room-contact-card">
              <h3 className="sales-room-contact-title">{active.name}</h3>
              <ul className="sales-room-contact-list">
                <li>
                  <MapPin className="sales-room-contact-icon" style={{ color: 'var(--color-cyan)' }} />
                  <span>{active.address}, Santiago, Chile</span>
                </li>
                <li>
                  <Phone className="sales-room-contact-icon" style={{ color: 'var(--color-cyan)' }} />
                  <a href={`tel:${active.phone.replace(/\s/g, '')}`}>{active.phone}</a>
                </li>
                <li>
                  <Mail className="sales-room-contact-icon" style={{ color: 'var(--color-cyan)' }} />
                  <a href={`mailto:${active.email}`}>{active.email}</a>
                </li>
                <li>
                  <Clock className="sales-room-contact-icon" style={{ color: 'var(--color-cyan)' }} />
                  <span>{active.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
