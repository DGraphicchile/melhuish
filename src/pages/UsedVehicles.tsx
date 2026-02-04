import { useState, useEffect, useMemo } from 'react';
import { Filter, Fuel, Settings, Calendar, Gauge } from 'lucide-react';
import { getBranchesByType, mockUsedVehicles } from '../lib/mockData';
import { UsedVehicle, Branch } from '../lib/types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export function UsedVehicles() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    setBranches(getBranchesByType('sales').sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const vehicles = useMemo(() => {
    let list = mockUsedVehicles.filter((v) => v.is_available);
    if (selectedBrand) list = list.filter((v) => v.brand === selectedBrand);
    if (selectedCategory) list = list.filter((v) => v.category === selectedCategory);
    if (onlyOffers) list = list.filter((v) => v.is_offer);
    if (selectedBranch) list = list.filter((v) => v.branch_id === selectedBranch);
    if (sortBy === 'price_asc') list = [...list].sort((a, b) => a.price_cash - b.price_cash);
    else if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.price_cash - a.price_cash);
    else if (sortBy === 'oldest') list = [...list].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    else list = [...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return list;
  }, [selectedBrand, selectedCategory, onlyOffers, selectedBranch, sortBy]);

  const loading = false;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CL')}`;
  };

  const uniqueBrands = Array.from(new Set(vehicles.map(v => v.brand))).sort();
  const uniqueCategories = Array.from(new Set(vehicles.map(v => v.category).filter(Boolean))).sort();

  return (
    <div className="min-h-screen bg-bg-alt">
      <div className="bg-gradient-blue text-white py-14 rounded-b-[2rem]">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Seminuevos & Usados</h1>
          </div>
          <p className="text-lg sm:text-xl text-center text-white/90">
            Vive el verano con bonos y descuentos imperdibles
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="font-bold text-lg">Vehículos garantizados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="font-bold text-lg">Financiamiento hasta 60 cuotas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="font-bold text-lg">Recibimos tu auto en parte de pago</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="font-bold text-lg">Transferencia digital Autofact</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Encuentra tu auto
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Marca</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="input"
                  >
                    <option value="">Todas las marcas</option>
                    {uniqueBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Categoría</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input"
                  >
                    <option value="">Todas las categorías</option>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sucursal</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="input"
                  >
                    <option value="">Todas las sucursales</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="offers"
                    checked={onlyOffers}
                    onChange={(e) => setOnlyOffers(e.target.checked)}
                    className="w-4 h-4 text-accent border-border rounded focus:ring-accent"
                  />
                  <label htmlFor="offers" className="text-sm font-medium">
                    Solo ofertas
                  </label>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedCategory('');
                    setOnlyOffers(false);
                    setSelectedBranch('');
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-text-light">
                {vehicles.length} {vehicles.length === 1 ? 'vehículo encontrado' : 'vehículos encontrados'}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-auto"
              >
                <option value="newest">Más reciente</option>
                <option value="oldest">Más antiguo</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-text-light">Cargando vehículos...</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-light">No se encontraron vehículos con los filtros seleccionados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id} hover className="flex flex-col relative">
                    {vehicle.is_offer && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="success">Oferta</Badge>
                      </div>
                    )}

                    <div className="aspect-video bg-bg-alt relative">
                      {vehicle.image_url ? (
                        <img
                          src={vehicle.image_url}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-text-light">Sin imagen</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {vehicle.brand} {vehicle.model}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        <div className="flex items-center text-text-light">
                          <Gauge className="w-4 h-4 mr-1" />
                          {vehicle.kilometers.toLocaleString('es-CL')} kms
                        </div>
                        <div className="flex items-center text-text-light">
                          <Settings className="w-4 h-4 mr-1" />
                          {vehicle.transmission}
                        </div>
                        <div className="flex items-center text-text-light">
                          <Fuel className="w-4 h-4 mr-1" />
                          {vehicle.fuel_type}
                        </div>
                        <div className="flex items-center text-text-light">
                          <Calendar className="w-4 h-4 mr-1" />
                          {vehicle.year}
                        </div>
                      </div>

                      <div className="mt-auto">
                        <p className="text-xs text-text-light mb-1">Precio contado</p>
                        <p className="text-2xl font-bold text-accent mb-4">
                          {formatPrice(vehicle.price_cash)}
                        </p>

                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={() => window.open('https://wa.me/56981690708', '_blank')}
                        >
                          Contactar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
