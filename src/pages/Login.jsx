import { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate()

  const [mensagem, setMensagem] = useState("");
  const [username, setUsername] = useState(""); 
  const [senha, setSenha] = useState("");

  async function verificarLogin() {
    const result = await login(username, senha);
  
    if (result.success) {
  
      if (result.type === "api") {
        navigate('/dashboard');   
      }
  
      if (result.type === "local") {
        navigate('/');
      }
  
    } else {
      setMensagem("Usuário ou senha incorretos");
    }
  }

  return (
    <div
      style={{
        width: "350px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ color: "#000", marginBottom: "20px" }}>Sistema de Login</h2>
  
      <input
        type="text"
        placeholder="Digite o username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #aaa",
        }}
      />
  
      <input
        type="password"
        placeholder="Digite a senha"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #aaa",
        }}
      />
  
      <button
        onClick={verificarLogin}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Entrar
      </button>
  
      <button
        onClick={() => navigate('/criarConta')}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Criar Conta
      </button>
  
      <p style={{ marginTop: "15px", color: "red" }}>{mensagem}</p>
    </div>
  );  
}