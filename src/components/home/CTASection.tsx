import { Car, Wrench } from 'lucide-react';

export function CTASection() {
  return (
    <section className="central-cta-section" style={{ backgroundColor: 'var(--color-deep-gray)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">¿Qué necesitas hoy?</h2>
          <p className="text-lg opacity-90" style={{ color: 'var(--color-light-black)' }}>
            Cotiza tu próximo vehículo o agenda tu servicio técnico.
          </p>
        </div>
        <div className="central-cta-card grid grid-cols-1 md:grid-cols-2 gap-0">
          <button
            type="button"
            onClick={() => window.location.href = '/?modal=cotizar'}
            className="flex flex-col items-center justify-center p-10 lg:p-12 text-center transition-all duration-300 hover:bg-white/5 border-b md:border-b-0 md:border-r border-white/10"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--color-cyan)' }}>
              <Car className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Cotiza tu Auto</h3>
            <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: 'var(--color-light-black)' }}>
              Asesoría personalizada y las mejores condiciones de financiamiento.
            </p>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-light-blue)' }}>Cotizar ahora →</span>
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/servicio-tecnico'}
            className="flex flex-col items-center justify-center p-10 lg:p-12 text-center transition-all duration-300 hover:bg-white/5"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--color-cyan)' }}>
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Agendar Servicio Técnico</h3>
            <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: 'var(--color-light-black)' }}>
              Mantén tu vehículo en óptimas condiciones con nosotros.
            </p>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-light-blue)' }}>Agendar ahora →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
