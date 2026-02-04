export function FinalCTAStrip() {
  return (
    <section className="final-cta-strip">
      <div className="container mx-auto px-4">
        <div className="final-cta-strip-inner">
          <span className="final-cta-strip-text">¿Qué necesitas?</span>
          <div className="final-cta-strip-buttons">
            <a href="/?modal=cotizar" className="btn final-cta-cotizar final-cta-strip-btn">
              Cotizar vehículo
            </a>
            <a href="/servicio-tecnico" className="btn final-cta-agendar final-cta-strip-btn">
              Agendar servicio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
