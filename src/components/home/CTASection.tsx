import { Car, Wrench } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-blue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: 'var(--color-cyan)' }}>
              <Car className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">Cotiza tu Auto</h3>
            <p className="text-gray-200">
              Encuentra el vehículo perfecto para ti. Recibe asesoría personalizada de nuestros expertos.
            </p>
            <button
              className="btn btn-primary w-full"
              onClick={() => window.location.href = '/?modal=cotizar'}
            >
              Cotizar ahora
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: 'var(--color-cyan)' }}>
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">Agendar Servicio Técnico</h3>
            <p className="text-gray-200">
              Mantén tu vehículo en óptimas condiciones. Programa tu mantención con nosotros.
            </p>
            <button
              className="btn btn-primary w-full"
              onClick={() => window.location.href = '/servicio-tecnico'}
            >
              Agendar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
