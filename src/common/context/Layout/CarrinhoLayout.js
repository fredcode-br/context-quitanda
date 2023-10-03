import { Outlet } from 'react-router-dom';
import { CarrinhoProvider } from '../Carrinho'

export const CarrinhoLayout = () => {
  return (
    <CarrinhoProvider>
      <Outlet />
    </CarrinhoProvider>
  );
};

