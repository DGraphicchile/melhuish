import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li>
                <a href="/">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/autos-nuevos">
                  Autos Nuevos
                </a>
              </li>
              <li>
                <a href="/seminuevos">
                  Autos Usados
                </a>
              </li>
              <li>
                <a href="/servicio-tecnico">
                  Servicio Técnico
                </a>
              </li>
              <li>
                <a href="/sucursales">
                  Sucursales
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Información</h3>
            <ul className="footer-links">
              <li>
                <a href="/terminos">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="/atencion-cliente">
                  Atención al cliente
                </a>
              </li>
              <li>
                <a href="tel:227064400">
                  22 706 4400
                </a>
              </li>
              <li>
                <a href="mailto:contacto@melhuish.cl">
                  contacto@melhuish.cl
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Nuestras Marcas</h3>
            <ul className="footer-links">
              <li>
                <a href="/autos-nuevos/chevrolet">
                  Chevrolet
                </a>
              </li>
              <li>
                <a href="/autos-nuevos/dongfeng">
                  Dongfeng
                </a>
              </li>
              <li>
                <a href="/autos-nuevos/foton">
                  Foton
                </a>
              </li>
              <li>
                <a href="/seminuevos">
                  SemiNuevos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Síguenos</h3>
            <div className="social-links">
              <a
                href="https://facebook.com/melhuish"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/melhuish"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/melhuish"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="footer-legal text-center">
            Los precios publicados incluyen bonos aplicables y están sujetos a disponibilidad de stock.
            © {new Date().getFullYear()} Melhuish - Líder en experiencia automotriz. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
