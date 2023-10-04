import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { useUsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([]);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);
    return (
        <CarrinhoContext.Provider value={{
          carrinho, 
          setCarrinho, 
          quantidadeProdutos, 
          setQuantidadeProdutos,
          valorTotalCarrinho,
          setValorTotalCarrinho
        }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    const { 
      carrinho, 
      setCarrinho, 
      quantidadeProdutos,
      setQuantidadeProdutos,
      valorTotalCarrinho,
      setValorTotalCarrinho
    } = useContext(CarrinhoContext);
    const { formaPagamento } = usePagamentoContext();
    const { setSaldo } = useUsuarioContext();

    function mudarQuantidade(id, quantidade) {
        return  carrinho.map(itemDoCarrinho => {
                    if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
                    return itemDoCarrinho
                    }
                )
    }

    function adicionarPrduto(novoProduto){
        const temOProduto = carrinho.some(itemCarrinho => itemCarrinho.id === novoProduto.id);
        if(!temOProduto) {
          novoProduto.quantidade = 1;
          return (
            setCarrinho(carrinhoAnterior => 
              [...carrinhoAnterior, novoProduto]
            )
          )
        }
        setCarrinho(mudarQuantidade(novoProduto.id, 1))
      };

      function removerProduto(id) {
        const produto = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id)
        const ehoUltimo = produto.quantidade ===1;
        if(ehoUltimo) {
            return (
                setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemCarrinho => itemCarrinho.id !== id))
            )
        }
        setCarrinho(mudarQuantidade(id, -1))
      }

      function efetuarCompra() {
        setCarrinho([]);
        setSaldo(saldoAtual => saldoAtual-valorTotalCarrinho)
      }
    
      useEffect(() => {
        const { novoTotal, novaQuntidade } = carrinho.reduce((contador,  
        produto) => ({
                novaQuntidade: contador.novaQuntidade + produto.quantidade,
                novoTotal: contador.novoTotal + (produto.valor * produto.quantidade) 
        }), {
            novaQuntidade: 0,
            novoTotal: 0
        });        
        setQuantidadeProdutos(novaQuntidade)
        setValorTotalCarrinho(novoTotal * formaPagamento.juros)
      }, [carrinho, setQuantidadeProdutos, setValorTotalCarrinho, formaPagamento])


    return {
        carrinho, 
        setCarrinho, 
        adicionarPrduto, 
        removerProduto,
        quantidadeProdutos,
        setQuantidadeProdutos,
        valorTotalCarrinho,
        efetuarCompra
    }
}