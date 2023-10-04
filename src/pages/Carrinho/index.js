import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { Lista } from 'pages/Feira/styles';

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Produto from 'components/Produto';

import { useUsuarioContext } from 'common/context/Usuario';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { usePagamentoContext } from 'common/context/Pagamento';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho, valorTotalCarrinho, efetuarCompra } = useCarrinhoContext();
  const { saldo = 0 } = useUsuarioContext();
  const { formaPagamento, tiposPagameto, mudarFormaPagamento } = usePagamentoContext();
  const navigate = useNavigate();
  const total = useMemo(() => saldo - valorTotalCarrinho, [saldo, valorTotalCarrinho]);

  return (
    <Container>
      <Voltar onClick={() =>  navigate('/feira')} />
      <h2>
        Carrinho
      </h2>
      <Lista>
        {carrinho.map(produto => (
          <Produto
            {...produto}
            key={produto.id}
          />
        ))}
      </Lista>
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={ formaPagamento.id }
          onChange={(event) => mudarFormaPagamento(event.target.value)}
        >
          { tiposPagameto.map(pagamento => (
            <MenuItem value={pagamento.id} key={pagamento.id}> 
              { pagamento.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R${valorTotalCarrinho.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R${Number(saldo).toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R${total.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          efetuarCompra();
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
        disabled={total < 0 || carrinho.length === 0}
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;