import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { QuotationModal } from './components/modals/QuotationModal';
import { Home } from './pages/Home';
import { NewVehicles } from './pages/NewVehicles';
import { UsedVehicles } from './pages/UsedVehicles';
import { ServiceTechnical } from './pages/ServiceTechnical';
import { SpareParts } from './pages/SpareParts';
import { Fleets } from './pages/Fleets';
import { Branches } from './pages/Branches';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showQuotationModal, setShowQuotationModal] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('modal') === 'cotizar') {
      setShowQuotationModal(true);
    }
  }, [currentPath]);

  const renderPage = () => {
    if (currentPath === '/') {
      return <Home />;
    } else if (currentPath === '/autos-nuevos') {
      return <NewVehicles />;
    } else if (currentPath.startsWith('/autos-nuevos/')) {
      const brandSlug = currentPath.split('/')[2];
      return <NewVehicles brandSlug={brandSlug} />;
    } else if (currentPath === '/seminuevos') {
      return <UsedVehicles />;
    } else if (currentPath === '/servicio-tecnico') {
      return <ServiceTechnical />;
    } else if (currentPath === '/repuestos') {
      return <SpareParts />;
    } else if (currentPath === '/flotas') {
      return <Fleets />;
    } else if (currentPath === '/sucursales') {
      return <Branches />;
    } else {
      return <Home />;
    }
  };

  return (
    <>
      <Layout>{renderPage()}</Layout>
      <QuotationModal
        isOpen={showQuotationModal}
        onClose={() => {
          setShowQuotationModal(false);
          const url = new URL(window.location.href);
          url.searchParams.delete('modal');
          window.history.replaceState({}, '', url.toString());
        }}
      />
    </>
  );
}

export default App;
