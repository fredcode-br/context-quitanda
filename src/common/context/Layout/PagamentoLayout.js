import { Outlet } from 'react-router-dom';
import { PagamentoProvider } from '../Pagamento'

export const PagamentoLayout = () => {
  return (
    <PagamentoProvider>
      <Outlet />
    </PagamentoProvider>
  );
};

