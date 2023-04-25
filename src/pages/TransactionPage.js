import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";



export default function TransactionsPage({token}) {
  const params = useParams();
  const tpe = params.tipo.replace(':', '')
  const navigate = useNavigate()
  const config = { headers: { Authorization: `Bearer ${token}` }}

  const [body, setBody] = useState({value:"", description:""})

    
  function addWallet(e){
    e.preventDefault();
    axios.post(`http://localhost:5000/nova-transacao/${tpe}`, body, config)
        .then((res) => {
          console.log(res.data)
          navigate("/home")
        })
        .catch((err) => alert(err.response.data))
  }

  

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={addWallet}>
        <input 
        placeholder="Valor" 
        type="number"
        value={body.value}
        onChange={(e) => setBody({ ...body, value: e.target.value })}
        />
        <input 
        placeholder="Descrição" 
        type="text" 
        value={body.description}
        onChange={(e) => setBody({ ...body, description: e.target.value })}
        />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
