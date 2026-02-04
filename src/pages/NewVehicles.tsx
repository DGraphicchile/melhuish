import { useState, useEffect, useMemo } from 'react';
import { Filter, Fuel, Settings } from 'lucide-react';
import { mockBrands, mockVehicleCategories, mockVehicles } from '../lib/mockData';
import { Vehicle, Brand, VehicleCategory } from '../lib/types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface NewVehiclesProps {
  brandSlug?: string;
}

export function NewVehicles({ brandSlug }: NewVehiclesProps) {
  const [brands] = useState<Brand[]>(mockBrands.sort((a, b) => a.order - b.order));
  const [categories] = useState<VehicleCategory[]>(mockVehicleCategories.sort((a, b) => a.name.localeCompare(b.name)));
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>(brandSlug || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('order');

  useEffect(() => {
    if (brandSlug) setSelectedBrand(brandSlug);
  }, [brandSlug]);

  const vehicles = useMemo(() => {
    let list = mockVehicles.filter((v) => v.is_active);
    if (selectedBrand) {
      const brand = brands.find((b) => b.slug === selectedBrand);
      if (brand) list = list.filter((v) => v.brand_id === brand.id);
    }
    if (selectedCategory) list = list.filter((v) => v.category_id === selectedCategory);
    if (selectedFuel) list = list.filter((v) => v.fuel_type === selectedFuel);
    if (selectedTransmission) list = list.filter((v) => v.transmission === selectedTransmission);
    if (sortBy === 'price_asc') list = [...list].sort((a, b) => (a.price_financing ?? 0) - (b.price_financing ?? 0));
    else if (sortBy === 'price_desc') list = [...list].sort((a, b) => (b.price_financing ?? 0) - (a.price_financing ?? 0));
    else list = [...list].sort((a, b) => a.order - b.order);
    return list;
  }, [selectedBrand, selectedCategory, selectedFuel, selectedTransmission, sortBy, brands]);

  const formatPrice = (price: number | null, includesIva: boolean) => {
    if (!price) return 'Consultar';
    return `$${price.toLocaleString('es-CL')}${includesIva ? ' + IVA' : ''}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="page-header">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-white">Autos Nuevos</h1>
          <p className="text-lg sm:text-xl text-white/90">Encuentra el vehículo perfecto para ti</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="filters-bar sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="form-label">Marca</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="form-select w-full"
                  >
                    <option value="">Todas las marcas</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.slug}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Categoría</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-select w-full"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Combustible</label>
                  <select
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                    className="form-select w-full"
                  >
                    <option value="">Todos</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Eléctrico">Eléctrico</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Transmisión</label>
                  <select
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                    className="form-select w-full"
                  >
                    <option value="">Todas</option>
                    <option value="Automática">Automática</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <button
                  className="btn btn-secondary w-full"
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedFuel('');
                    setSelectedTransmission('');
                    if (!brandSlug) setSelectedBrand('');
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-light-gray">
                {vehicles.length} {vehicles.length === 1 ? 'vehículo encontrado' : 'vehículos encontrados'}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select w-auto"
              >
                <option value="order">Ordenar por defecto</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-light-gray">Cargando vehículos...</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-light-gray">No se encontraron vehículos con los filtros seleccionados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="car-card">
                    <div className="car-card-image-wrap">
                      {vehicle.image_url ? (
                        <img
                          src={vehicle.image_url}
                          alt={vehicle.name}
                          className="car-image"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400">Sin imagen</span>
                        </div>
                      )}
                    </div>

                    <div className="car-card-body">
                      <h3 className="car-title">{vehicle.name}</h3>
                      {vehicle.version && (
                        <p className="text-gray text-sm mb-4">{vehicle.version}</p>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.fuel_type && (
                          <span className="car-brand">
                            <Fuel className="w-3 h-3 mr-1 inline" />
                            {vehicle.fuel_type}
                          </span>
                        )}
                        {vehicle.transmission && (
                          <span className="car-brand">
                            <Settings className="w-3 h-3 mr-1 inline" />
                            {vehicle.transmission}
                          </span>
                        )}
                      </div>

                      <div className="mt-auto space-y-2">
                        {vehicle.price_list && (
                          <p className="price-desde">
                            Desde: {formatPrice(vehicle.price_list, vehicle.includes_iva)}
                          </p>
                        )}
                        <p className="car-price">
                          {formatPrice(vehicle.price_financing, vehicle.includes_iva)}
                        </p>
                        <p className="text-xs text-gray">Precio con financiamiento</p>

                        <button
                          className="btn btn-primary w-full mt-4"
                          onClick={() => window.location.href = `/?modal=cotizar&vehicle=${vehicle.slug}`}
                        >
                          Cotizar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
