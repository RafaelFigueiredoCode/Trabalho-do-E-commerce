import { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

export default function CriarConta() {
  const navigate = useNavigate();
  const { registerUser } = useAuth(); 

  const [mensagem, setMensagem] = useState("");
  const [username, setUsername] = useState(""); 
  const [senha, setSenha] = useState("");

  async function handleCriarConta() {
    const result = await registerUser(username, senha);

    if (result.success) {
      // cadastro deu certo → vai para login
      navigate('/login');
    } else {
      setMensagem(result.message || "Erro ao criar conta");
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
      <h2 style={{ color: "#000", marginBottom: "20px" }}>Criar Conta</h2>
  
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
        onClick={handleCriarConta}
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
        Criar Conta
      </button>
  
      <button
        onClick={() => navigate('/login')}
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
        Voltar para Login
      </button>
  
      <p style={{ marginTop: "15px", color: "red" }}>{mensagem}</p>
    </div>
  );
}