import { useState, useEffect } from 'react';
import { Wrench, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { getBranchesByType } from '../lib/mockData';
import { Branch, ServiceAppointmentFormData } from '../lib/types';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function ServiceTechnical() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ServiceAppointmentFormData>({
    full_name: '',
    email: '',
    rut: '',
    phone: '',
    brand: '',
    model: '',
    license_plate: '',
    year: new Date().getFullYear(),
    kilometers: 0,
    service_type: '',
    preferred_date: '',
    preferred_time: '',
    branch_id: '',
    notes: '',
  });

  useEffect(() => {
    setBranches(getBranchesByType('service').sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        rut: '',
        phone: '',
        brand: '',
        model: '',
        license_plate: '',
        year: new Date().getFullYear(),
        kilometers: 0,
        service_type: '',
        preferred_date: '',
        preferred_time: '',
        branch_id: '',
        notes: '',
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
      [name]: name === 'year' || name === 'kilometers' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="min-h-screen bg-bg-alt">
      <div className="bg-primary text-white py-14 rounded-b-[2rem]">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <Wrench className="w-12 h-12 mr-4 flex-shrink-0" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Servicio Técnico</h1>
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-lg sm:text-xl text-white/90">
              Nuevo servicio técnico oficial Dongfeng en Las Condes y Mall Paseo Quilín
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Lunes a Jueves 8:00 - 18:00 hrs
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Viernes 8:00 - 17:00 hrs
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 rounded-[1.5rem]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Agenda tu hora</h2>

            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Tu solicitud ha sido enviada exitosamente. Nos contactaremos contigo pronto para confirmar tu cita.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nombre Completo"
                  name="full_name"
                  value={formData.full_name}
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
                  label="RUT"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  placeholder="12.345.678-9"
                  required
                />

                <Input
                  label="Teléfono de contacto"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                  required
                />

                <Select
                  label="Marca"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Seleccione una marca' },
                    { value: 'Chevrolet', label: 'Chevrolet' },
                    { value: 'Dongfeng', label: 'Dongfeng' },
                    { value: 'Foton', label: 'Foton' },
                  ]}
                  required
                />

                <Input
                  label="Modelo"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Patente"
                  name="license_plate"
                  value={formData.license_plate}
                  onChange={handleChange}
                  placeholder="ABCD12"
                  required
                />

                <Input
                  label="Año"
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  required
                />

                <Input
                  label="Kilometraje"
                  type="number"
                  name="kilometers"
                  value={formData.kilometers}
                  onChange={handleChange}
                  min="0"
                />

                <Select
                  label="Servicio que necesita"
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Seleccione un servicio' },
                    { value: 'Mantención', label: 'Mantención' },
                    { value: 'Reparación', label: 'Reparación' },
                    { value: 'Desabolladura y pintura', label: 'Desabolladura y pintura' },
                    { value: 'Cambio de aceite', label: 'Cambio de aceite' },
                    { value: 'Batería', label: 'Batería' },
                    { value: 'Repuesto', label: 'Repuesto' },
                    { value: 'Otro', label: 'Otro' },
                  ]}
                  required
                />

                <Input
                  label="Fecha tentativa"
                  type="date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />

                <Input
                  label="Hora tentativa"
                  type="time"
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                />

                <Select
                  label="Sucursal"
                  name="branch_id"
                  value={formData.branch_id}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Seleccione una sucursal' },
                    ...branches.map((branch) => ({
                      value: branch.id,
                      label: `${branch.name} - ${branch.address}`,
                    })),
                  ]}
                  required
                />
              </div>

              <Textarea
                label="Notas adicionales"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Ingrese cualquier información adicional sobre el servicio que necesita"
              />

              <p className="text-sm text-text-light">
                Los horarios deben confirmarse con el servicio técnico. El horario ingresado es referencial.
              </p>

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Enviando...' : 'Agendar Cita'}
              </Button>
            </form>
          </Card>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Sucursales de Servicio Técnico</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((branch) => (
                <Card key={branch.id} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{branch.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" />
                      <p className="text-text-light">{branch.address}, {branch.city}</p>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-text-light">{branch.hours_weekday}</p>
                        <p className="text-text-light">{branch.hours_saturday}</p>
                      </div>
                    </div>
                    {branch.phone && (
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" />
                        <a href={`tel:${branch.phone}`} className="text-accent hover:underline">
                          {branch.phone}
                        </a>
                      </div>
                    )}
                    {branch.email && (
                      <div className="flex items-start">
                        <Mail className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" />
                        <a href={`mailto:${branch.email}`} className="text-accent hover:underline">
                          {branch.email}
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
