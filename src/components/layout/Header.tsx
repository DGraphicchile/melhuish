import { useState } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <header className="navbar sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="navbar-brand flex items-center">
            <div className="text-2xl font-bold text-white">MELHUISH</div>
          </a>

          <nav className="hidden lg:flex items-center space-x-2">
            <a href="/" className="nav-link">
              Inicio
            </a>

            <div className="relative group mega-dropdown">
              <button className="nav-link flex items-center">
                Autos Nuevos
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="mega-menu">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-3 gap-6">
                    <a href="/autos-nuevos/chevrolet" className="mega-brand-card">
                      <span>Chevrolet</span>
                    </a>
                    <a href="/autos-nuevos/dongfeng" className="mega-brand-card">
                      <span>Dongfeng</span>
                    </a>
                    <a href="/autos-nuevos/foton" className="mega-brand-card">
                      <span>Foton</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a href="/seminuevos" className="nav-link">
              Seminuevos
            </a>
            <a href="/servicio-tecnico" className="nav-link">
              Servicio Técnico
            </a>
            <a href="/repuestos" className="nav-link">
              Repuestos
            </a>
            <a href="/flotas" className="nav-link">
              Flotas
            </a>
            <a href="/sucursales" className="nav-link">
              Sucursales
            </a>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:227064400" className="flex items-center text-white hover:text-light-blue font-medium">
              <Phone className="w-4 h-4 mr-2" />
              22 706 4400
            </a>
            <button className="btn btn-outline-primary" onClick={() => window.location.href = '/?modal=cotizar'}>
              Cotizar
            </button>
            <button className="btn btn-primary" onClick={() => window.location.href = '/servicio-tecnico'}>
              Agendar Servicio
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4">
            <a href="/" className="block py-2 text-white hover:text-light-blue font-medium">
              Inicio
            </a>

            <div className={`mega-dropdown ${openSubmenu === 'autos' ? 'open' : ''}`}>
              <button
                onClick={() => toggleSubmenu('autos')}
                className="flex items-center justify-between w-full py-2 text-white hover:text-light-blue font-medium"
              >
                Autos Nuevos
                <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === 'autos' ? 'rotate-180' : ''}`} />
              </button>
              <div className="mega-menu">
                <div className="grid grid-cols-1 gap-4">
                  <a href="/autos-nuevos/chevrolet" className="mega-brand-card">
                    <span>Chevrolet</span>
                  </a>
                  <a href="/autos-nuevos/dongfeng" className="mega-brand-card">
                    <span>Dongfeng</span>
                  </a>
                  <a href="/autos-nuevos/foton" className="mega-brand-card">
                    <span>Foton</span>
                  </a>
                </div>
              </div>
            </div>

            <a href="/seminuevos" className="block py-2 text-white hover:text-light-blue font-medium">
              Seminuevos
            </a>
            <a href="/servicio-tecnico" className="block py-2 text-white hover:text-light-blue font-medium">
              Servicio Técnico
            </a>
            <a href="/repuestos" className="block py-2 text-white hover:text-light-blue font-medium">
              Repuestos
            </a>
            <a href="/flotas" className="block py-2 text-white hover:text-light-blue font-medium">
              Flotas
            </a>
            <a href="/sucursales" className="block py-2 text-white hover:text-light-blue font-medium">
              Sucursales
            </a>

            <div className="pt-4 border-t border-white/20 space-y-3">
              <a href="tel:227064400" className="flex items-center text-white font-medium">
                <Phone className="w-4 h-4 mr-2" />
                22 706 4400
              </a>
              <button className="btn btn-outline-primary w-full" onClick={() => window.location.href = '/?modal=cotizar'}>
                Cotizar Vehículo
              </button>
              <button className="btn btn-primary w-full" onClick={() => window.location.href = '/servicio-tecnico'}>
                Agendar Servicio
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
