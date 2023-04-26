import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {

  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const navigate = useNavigate()
  
  function signUp(e){
      e.preventDefault()
      if(form.password!==passwordConfirm) return alert("As senhas devem ser iguais!")

      axios.post("https://mywallet-back-5yrn.onrender.com/cadastro", form)
      .then((res) => navigate("/"))
      .catch((err) => alert(err.response.data)) 
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input 
        placeholder="Nome" 
        type="text" 
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        />                    
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
        <input 
        placeholder="Confirme a senha" 
        type="password" 
        autocomplete="new-password" 
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
