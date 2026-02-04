import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <header className="navbar sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <a href="/" className="navbar-brand flex items-center gap-2" aria-label="Melhuish - Inicio">
            <img src="/logo-blanco.svg" alt="Melhuish" className="h-8 lg:h-9 w-auto" />
          </a>

          <nav className="navbar-nav hidden lg:flex items-center">
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
                      <img src="/logos/chevrolet.svg" alt="" className="mega-brand-logo" aria-hidden />
                      <span>Chevrolet</span>
                    </a>
                    <a href="/autos-nuevos/dongfeng" className="mega-brand-card">
                      <img src="/logos/dongfeng.svg" alt="" className="mega-brand-logo" aria-hidden />
                      <span>Dongfeng</span>
                    </a>
                    <a href="/autos-nuevos/foton" className="mega-brand-card">
                      <img src="/logos/foton.svg" alt="" className="mega-brand-logo" aria-hidden />
                      <span>Foton</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a href="https://seminuevos.melhuish.cl/" className="nav-link" target="_blank" rel="noopener noreferrer">
              Seminuevos
            </a>
            <a href="/servicio-tecnico" className="nav-link">
              Servicio Técnico
            </a>
            <a href="https://repuestos.melhuish.cl/" className="nav-link" target="_blank" rel="noopener noreferrer">
              Repuestos
            </a>
            <a href="/flotas" className="nav-link">
              Flotas
            </a>
            <a href="/sucursales" className="nav-link">
              Sucursales
            </a>
          </nav>

          <div className="hidden lg:flex items-center navbar-actions">
            <button className="btn btn-navbar-cotizar" onClick={() => window.location.href = '/?modal=cotizar'}>
              Cotizar
            </button>
            <button className="btn btn-primary btn-agendar-navbar" onClick={() => window.location.href = '/servicio-tecnico'}>
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
          <div className="navbar-mobile-menu lg:hidden py-4 space-y-1">
            <a href="/" className="navbar-mobile-link block py-3 text-white hover:text-light-blue font-medium text-base">
              Inicio
            </a>

            <div className={`mega-dropdown ${openSubmenu === 'autos' ? 'open' : ''}`}>
              <button
                onClick={() => toggleSubmenu('autos')}
                className="navbar-mobile-link flex items-center justify-between w-full py-3 text-white hover:text-light-blue font-medium text-base"
              >
                Autos Nuevos
                <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === 'autos' ? 'rotate-180' : ''}`} />
              </button>
              <div className="mega-menu">
                <div className="grid grid-cols-1 gap-4">
                  <a href="/autos-nuevos/chevrolet" className="mega-brand-card">
                    <img src="/logos/chevrolet.svg" alt="" className="mega-brand-logo" aria-hidden />
                    <span>Chevrolet</span>
                  </a>
                  <a href="/autos-nuevos/dongfeng" className="mega-brand-card">
                    <img src="/logos/dongfeng.svg" alt="" className="mega-brand-logo" aria-hidden />
                    <span>Dongfeng</span>
                  </a>
                  <a href="/autos-nuevos/foton" className="mega-brand-card">
                    <img src="/logos/foton.svg" alt="" className="mega-brand-logo" aria-hidden />
                    <span>Foton</span>
                  </a>
                </div>
              </div>
            </div>

            <a href="https://seminuevos.melhuish.cl/" className="navbar-mobile-link block py-3 text-white hover:text-light-blue font-medium text-base" target="_blank" rel="noopener noreferrer">
              Seminuevos
            </a>
            <a href="/servicio-tecnico" className="navbar-mobile-link block py-3 text-white hover:text-light-blue font-medium text-base">
              Servicio Técnico
            </a>
            <a href="https://repuestos.melhuish.cl/" className="navbar-mobile-link block py-3 text-white hover:text-light-blue font-medium text-base" target="_blank" rel="noopener noreferrer">
              Repuestos
            </a>
            <a href="/flotas" className="navbar-mobile-link block py-3 text-white hover:text-light-blue font-medium text-base">
              Flotas
            </a>
            <a href="/sucursales" className="navbar-mobile-link block py-3 text-white hover:text-light-blue font-medium text-base">
              Sucursales
            </a>

            <div className="pt-4 mt-2 border-t border-white/20 space-y-3">
              <button className="btn btn-navbar-cotizar w-full" onClick={() => window.location.href = '/?modal=cotizar'}>
                Cotizar Vehículo
              </button>
              <button className="btn btn-primary btn-agendar-navbar w-full" onClick={() => window.location.href = '/servicio-tecnico'}>
                Agendar Servicio
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
