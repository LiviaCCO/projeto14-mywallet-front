import axios from "axios"
import styled from "styled-components"
import { Link, useNavigate  } from "react-router-dom"
import { useState } from "react"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignInPage({setToken}) {

  const [form, setForm] = useState({email: "", password: "" })
  const navigate = useNavigate();

  function signIn(e){
    e.preventDefault()
    console.log(form)
    axios.post("http://localhost:5000/", form)
    .then((res) => {
      setToken(res.data)
      navigate("/home")})
    .catch((err) => alert(err.response.data))  
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input 
        placeholder="E-mail" 
        type="email" 
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input 
        placeholder="Senha" 
        type="password" 
        autocomplete="new-password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
