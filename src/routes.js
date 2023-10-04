import { BrowserRouter, Routes , Route } from 'react-router-dom';

import { UsuarioLayout } from './common/context/Layout/UsuarioLayout'
import { CarrinhoLayout } from 'common/context/Layout/CarrinhoLayout';

import Login from './pages/Login';
import Feira from 'pages/Feira';
import Carrinho from 'pages/Carrinho';
import { PagamentoLayout } from 'common/context/Layout/PagamentoLayout';

function Router () {

    return (
        <BrowserRouter>
                <Routes>
                    <Route element={<UsuarioLayout/>}>
                        <Route exact path="/"  element={<Login />} />
                        <Route element={<CarrinhoLayout/>}>
                            <Route element={<PagamentoLayout/>}>
                                <Route path="/feira"  element={<Feira/>} />
                                <Route path="/carrinho"  element={<Carrinho/>} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
        </BrowserRouter>
    )
}

export default Router