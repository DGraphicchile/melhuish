import { Search, Shield, Clock, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const branches = [
  {
    name: 'Automotora Melhuish Las Condes',
    address: 'Av. Las Condes 7890, SANTIAGO',
    phone: '+562 2706 4400',
    hours: 'Abierto hasta 19:30 hrs',
  },
  {
    name: 'Automotora Melhuish Mall Paseo Quilín',
    address: 'Mar Tirreno 3349, Espacio E4, SANTIAGO',
    phone: '+562 2706 4400',
  },
  {
    name: 'Automotora Melhuish Tomás Moro',
    address: 'Av. Tomás Moro 769, SANTIAGO',
    phone: '+562 2706 4400',
  },
];

export function SpareParts() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/56952171890', '_blank');
  };

  return (
    <div className="min-h-screen bg-bg-alt">
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Repuestos Originales Chevrolet
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Encuentra los mejores repuestos para tu vehículo
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar repuestos..."
                className="w-full pl-12 pr-4 py-4 rounded-full text-text border-2 border-transparent focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 text-center">
            <Shield className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Calidad garantizada</h3>
            <p className="text-text-light">
              Todos nuestros productos son originales y certificados
            </p>
          </Card>

          <Card className="p-8 text-center">
            <Clock className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Atención rápida</h3>
            <p className="text-text-light">
              Respuesta inmediata a tus consultas y pedidos
            </p>
          </Card>
        </div>

        <Card className="p-12 text-center mb-16 bg-gradient-to-br from-accent/10 to-secondary/10">
          <h2 className="text-3xl font-bold mb-4">Repuestos originales Chevrolet</h2>
          <p className="text-text-light mb-8 max-w-2xl mx-auto">
            Contáctanos por WhatsApp para cotizar el repuesto que necesitas.
            Nuestro equipo te atenderá de inmediato.
          </p>
          <Button
            variant="primary"
            className="inline-flex items-center"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Cotizar por WhatsApp
          </Button>
        </Card>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Contáctanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-sm text-text-light mb-2">Email</p>
              <a href="mailto:ventas@melhuish.cl" className="text-accent hover:underline font-semibold">
                ventas@melhuish.cl
              </a>
            </Card>

            <Card className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-sm text-text-light mb-2">WhatsApp</p>
              <a href="https://wa.me/56952171890" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold">
                +56 9 5217 1890
              </a>
            </Card>

            <Card className="p-6 text-center">
              <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-sm text-text-light mb-2">Teléfono</p>
              <a href="tel:227064400" className="text-accent hover:underline font-semibold">
                22 706 4400
              </a>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestras Sucursales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-bold mb-4">{branch.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" />
                    <p className="text-text-light text-sm">{branch.address}</p>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" />
                    <a href={`tel:${branch.phone}`} className="text-accent hover:underline text-sm">
                      {branch.phone}
                    </a>
                  </div>
                  {branch.hours && (
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" />
                      <p className="text-text-light text-sm">{branch.hours}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-12 p-8 bg-bg-alt text-center">
          <h3 className="text-2xl font-bold mb-4">Tienda en Construcción</h3>
          <p className="text-text-light mb-6">
            Próximamente estarán disponibles todos nuestros productos para compra online.
            Mientras tanto, cotiza tus repuestos por WhatsApp.
          </p>
          <Button variant="primary" onClick={handleWhatsAppClick}>
            Cotizar por WhatsApp
          </Button>
        </Card>
      </div>
    </div>
  );
}
