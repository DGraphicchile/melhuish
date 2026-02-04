import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, User } from 'lucide-react';
import { getBranchesByType, mockBranchStaff } from '../lib/mockData';
import { Branch, BranchStaff } from '../lib/types';
import { Card } from '../components/ui/Card';

export function Branches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [staff, setStaff] = useState<Record<string, BranchStaff[]>>({});
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getBranchesByType('sales').sort((a, b) => a.name.localeCompare(b.name));
    setBranches(data);
    if (data.length > 0) setSelectedBranch(data[0]);
    const staffByBranch = mockBranchStaff.reduce((acc, member) => {
      if (!acc[member.branch_id]) acc[member.branch_id] = [];
      acc[member.branch_id].push(member);
      return acc;
    }, {} as Record<string, BranchStaff[]>);
    setStaff(staffByBranch);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-light">Cargando sucursales...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-alt">
      <div className="bg-primary text-white py-14 rounded-b-[2rem]">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-white">Nuestras Sucursales</h1>
          <p className="text-lg sm:text-xl text-white/90">Visítanos en nuestras salas de venta</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedBranch?.id === branch.id
                  ? 'bg-accent text-white'
                  : 'bg-bg text-text hover:bg-border'
              }`}
            >
              {branch.name}
            </button>
          ))}
        </div>

        {selectedBranch && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">{selectedBranch.name}</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Dirección</p>
                      <p className="text-text-light">
                        {selectedBranch.address}, {selectedBranch.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Horarios de atención</p>
                      <p className="text-text-light">{selectedBranch.hours_weekday}</p>
                      <p className="text-text-light">{selectedBranch.hours_saturday}</p>
                      {selectedBranch.hours_sunday && (
                        <p className="text-text-light">{selectedBranch.hours_sunday}</p>
                      )}
                    </div>
                  </div>

                  {selectedBranch.phone && (
                    <div className="flex items-start space-x-3">
                      <Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Teléfono</p>
                        <a
                          href={`tel:${selectedBranch.phone}`}
                          className="text-accent hover:underline"
                        >
                          {selectedBranch.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedBranch.email && (
                    <div className="flex items-start space-x-3">
                      <Mail className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <a
                          href={`mailto:${selectedBranch.email}`}
                          className="text-accent hover:underline"
                        >
                          {selectedBranch.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <div className="card overflow-hidden h-[400px]">
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

            {staff[selectedBranch.id] && staff[selectedBranch.id].length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Nuestro Equipo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {staff[selectedBranch.id].map((member) => (
                    <Card key={member.id} className="p-6 text-center">
                      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-accent" />
                      </div>
                      <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                      <p className="text-text-light text-sm mb-4">{member.position}</p>
                      <div className="space-y-2 text-sm">
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center justify-center text-accent hover:underline"
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            {member.phone}
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center justify-center text-accent hover:underline text-xs"
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            {member.email}
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
