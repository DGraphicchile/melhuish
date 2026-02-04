import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Branch } from '../../lib/types';

export function BranchesSection() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const { data, error } = await supabase
        .from('branches')
        .select('*')
        .in('type', ['sales', 'both'])
        .order('name');

      if (error) throw error;
      setBranches(data || []);
      if (data && data.length > 0) {
        setSelectedBranch(data[0]);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center">Cargando sucursales...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="branch-locator py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-12 text-white">Sala de Ventas</h2>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              className={`btn ${
                selectedBranch?.id === branch.id
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
            >
              Sucursal {branch.name}
            </button>
          ))}
        </div>

        {selectedBranch && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="branch-card">
              <h3 className="branch-title">Sucursal {selectedBranch.name}</h3>

              <div className="flex items-start space-x-3 mb-4">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-blue)' }} />
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p className="branch-info">{selectedBranch.address}, {selectedBranch.city}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4">
                <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-blue)' }} />
                <div>
                  <p className="font-semibold">Horarios de atención</p>
                  <p className="branch-info">{selectedBranch.hours_weekday}</p>
                  <p className="branch-info">{selectedBranch.hours_saturday}</p>
                </div>
              </div>

              {selectedBranch.phone && (
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-blue)' }} />
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <a href={`tel:${selectedBranch.phone}`} style={{ color: 'var(--color-light-blue)' }}>
                      {selectedBranch.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="branch-card overflow-hidden h-[400px] p-0">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                  selectedBranch.address + ', ' + selectedBranch.city + ', Chile'
                )}&zoom=15`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${selectedBranch.name}`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
