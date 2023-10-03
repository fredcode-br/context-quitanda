import { Outlet } from 'react-router-dom';
import { UsuarioProvider } from '../Usuario'

export const UsuarioLayout = () => {
  return (
    <UsuarioProvider>
      <Outlet />
    </UsuarioProvider>
  );
};

