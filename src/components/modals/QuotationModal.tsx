import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { QuotationFormData, Brand, Branch } from '../../lib/types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicle?: string;
}

export function QuotationModal({ isOpen, onClose, initialVehicle }: QuotationModalProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<QuotationFormData>({
    first_name: '',
    last_name: '',
    rut: '',
    phone: '',
    email: '',
    region: '',
    commune: '',
    brand: '',
    model: '',
    version: '',
    branch_id: '',
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchData();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const [brandsData, branchesData] = await Promise.all([
        supabase.from('brands').select('*').order('order'),
        supabase.from('branches').select('*').in('type', ['sales', 'both']).order('name'),
      ]);

      if (brandsData.data) setBrands(brandsData.data);
      if (branchesData.data) setBranches(branchesData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('quotations')
        .insert([formData]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        rut: '',
        phone: '',
        email: '',
        region: '',
        commune: '',
        brand: '',
        model: '',
        version: '',
        branch_id: '',
        message: '',
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting quotation:', error);
      alert('Hubo un error al enviar la solicitud. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="form-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="form-card-header">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Cotiza tu Próximo Auto</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Solicitud enviada</h3>
              <p className="text-text-light">Nos contactaremos contigo pronto para coordinar los detalles.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="form-control w-full"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Apellido *</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="form-control w-full"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">RUT *</label>
                  <input
                    type="text"
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    className="form-control w-full"
                    placeholder="12.345.678-9"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control w-full"
                    placeholder="+56 9 1234 5678"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control w-full"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Región *</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="form-select w-full"
                    required
                  >
                    <option value="">Seleccione región</option>
                    <option value="Región Metropolitana">Región Metropolitana</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="O'Higgins">O'Higgins</option>
                    <option value="Maule">Maule</option>
                    <option value="Biobío">Biobío</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Comuna *</label>
                  <input
                    type="text"
                    name="commune"
                    value={formData.commune}
                    onChange={handleChange}
                    className="form-control w-full"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Marca *</label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="form-select w-full"
                    required
                  >
                    <option value="">Seleccione una marca</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Modelo *</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="form-control w-full"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Versión</label>
                  <input
                    type="text"
                    name="version"
                    value={formData.version}
                    onChange={handleChange}
                    className="form-control w-full"
                  />
                </div>

                <div>
                  <label className="form-label">Sucursal *</label>
                  <select
                    name="branch_id"
                    value={formData.branch_id}
                    onChange={handleChange}
                    className="form-select w-full"
                    required
                  >
                    <option value="">Seleccione una sucursal</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control w-full"
                  rows={4}
                  placeholder="¿Tienes alguna pregunta o comentario adicional?"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
