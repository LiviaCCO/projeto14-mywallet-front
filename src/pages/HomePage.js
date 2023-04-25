import axios from "axios"
import styled from "styled-components"
import { Link, useNavigate  } from "react-router-dom"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"

export default function HomePage({token}) {
  const [usuario, setUsuario] = useState(undefined)
  const [wallet, setWallet] = useState([])
  //const navigate = useNavigate()
  const [total, setTotal] = useState(0)

  function somar(){
    let soma=0;
    for(let i=0; i<wallet.length; i++){
      soma+=Number(wallet[i].value)
    }
    setTotal(soma.toFixed(2));
  }

  useEffect(() => {
    const config = {headers: { Authorization: `Bearer ${token}` }}

    axios.get("http://localhost:5000/home", config)
          .then((res) => {
            setUsuario(res.data.userName)
            setWallet(res.data.userWallet.reverse()) //Reverse() para inverter a ordem de exibição do array
          })
          .catch((err) => alert(err.response.data))
    somar()
  }, [wallet])

  if (!usuario) return <div>Carregando...</div>

  return (
    <HomeContainer>
      <Header>
        <h1>{`Olá, ${usuario}`}</h1>
        <StyledLink to={"/"}><BiExit /></StyledLink>
      </Header>

      <TransactionsContainer>
        <ListWallet>
          {wallet.length!==0 ? wallet.map((item)=>
            <ul>
            <ListItemContainer>
              <div>
                <span>{item.date}</span>
                <strong>{item.description}</strong>
              </div>
              <Value color={item.value<0 ? "negativo" : "positivo"}>{item.value < 0 ? ((Number(item.value))*(-1)).toFixed(2) : Number(item.value).toFixed(2)}</Value>
            </ListItemContainer>
            </ul>
          ) : <p>Não há registros de entrada ou saída</p>}
        </ListWallet>
        
        <article>
          <strong>Saldo</strong>
          <Value color={total>=0 ? "positivo" : "negativo"}>{total<0 ? ((total*(-1)).toFixed(2)) : total}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        
        <button>
          <StyledLink to={"/nova-transacao/:entrada"}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </StyledLink>
        </button>
               
        <button>
          <StyledLink to={"/nova-transacao/:saida"}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </StyledLink>
        </button>
        
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0px;
  padding: 0px;
  font-size:26px;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ListWallet = styled.div`
  overflow: auto;
  height: calc(100vh - 320px);
  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
      margin-top: 20px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
