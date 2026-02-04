import { useState } from 'react';
import { Truck, Car } from 'lucide-react';
import { FleetInquiryFormData } from '../lib/types';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function Fleets() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<FleetInquiryFormData>({
    company_rut: '',
    contact_name: '',
    email: '',
    phone: '',
    units_quantity: 1,
    brand: '',
    comments: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setSuccess(true);
      setFormData({
        company_rut: '',
        contact_name: '',
        email: '',
        phone: '',
        units_quantity: 1,
        brand: '',
        comments: '',
      });
      setTimeout(() => setSuccess(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'units_quantity' ? parseInt(value) || 1 : value,
    }));
  };

  return (
    <div className="min-h-screen bg-bg-alt">
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary text-white py-14 rounded-b-[2rem]">
        <div className="container-custom text-center">
          <div className="flex items-center justify-center mb-4">
            <Truck className="w-12 h-12 mr-4 flex-shrink-0" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Venta de Flotas</h1>
          </div>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
            Soluciones integrales para empresas. Asesoría especializada en la compra de vehículos corporativos.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Melhuish</h2>
              <p className="text-2xl font-bold mb-4" style={{ color: 'var(--color-blue)' }}>Líder en experiencia automotriz</p>
              <p className="text-text-light leading-relaxed">
                Con años de trayectoria en el mercado chileno, ofrecemos soluciones completas
                para la gestión de flotas empresariales. Desde la selección del vehículo adecuado
                hasta el servicio post-venta, te acompañamos en cada etapa.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Car className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-blue)' }} />
                <p className="font-bold text-lg">Chevrolet</p>
              </Card>
              <Card className="p-6 text-center">
                <Car className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-blue)' }} />
                <p className="font-bold text-lg">Dongfeng</p>
              </Card>
              <Card className="p-6 text-center">
                <Car className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-blue)' }} />
                <p className="font-bold text-lg">Foton</p>
              </Card>
              <Card className="p-6 text-center">
                <Car className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-blue)' }} />
                <p className="font-bold text-lg">Peugeot</p>
              </Card>
            </div>

            <div className="bg-[#0135cc]/10 border-l-4 border-[#0135cc] p-6 rounded-2xl transition-shadow hover:shadow-lg">
              <h3 className="font-bold text-lg mb-2">Ventajas para tu empresa</h3>
              <ul className="space-y-2 text-text-light">
                <li>• Financiamiento especial para empresas</li>
                <li>• Descuentos por volumen</li>
                <li>• Servicio técnico prioritario</li>
                <li>• Asesoría personalizada</li>
                <li>• Gestión integral de flotas</li>
              </ul>
            </div>
          </div>

          <Card className="p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-center">Solicita Asesoría</h2>

            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Tu solicitud ha sido enviada exitosamente. Nos contactaremos contigo pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="RUT de empresa"
                name="company_rut"
                value={formData.company_rut}
                onChange={handleChange}
                placeholder="12.345.678-9"
                required
              />

              <Input
                label="Nombre de contacto"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Teléfono"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
                required
              />

              <Input
                label="Cantidad de Unidades"
                type="number"
                name="units_quantity"
                value={formData.units_quantity}
                onChange={handleChange}
                min="1"
                required
              />

              <Select
                label="Marca de interés"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Seleccione una marca' },
                  { value: 'Chevrolet', label: 'Chevrolet' },
                  { value: 'Dongfeng', label: 'Dongfeng' },
                  { value: 'Foton', label: 'Foton' },
                  { value: 'Peugeot', label: 'Peugeot' },
                  { value: 'Opel', label: 'Opel' },
                ]}
              />

              <Textarea
                label="Comentarios"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Cuéntanos sobre las necesidades de tu empresa"
              />

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
