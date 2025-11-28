import { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");
  const [username, setUsername] = useState(""); 
  const [senha, setSenha] = useState("");

  async function verificarLogin() {
    const result = await login(username, senha);

    if (result.success) {
      if (result.type === "api") navigate("/dashboard");
      if (result.type === "local") navigate("/");
    } else {
      setMensagem("Usuário ou senha incorretos");
    }
  }



  return (
    <div style={box}>
      <h2 style={{ color: "#111", marginBottom: "25px", fontSize: "26px" }}>
        Entrar na conta
      </h2>

      <input
        type="text"
        placeholder="Digite o username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        style={input}
      />

      <input
        type="password"
        placeholder="Digite a senha"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        style={input}
      />

      <button
        onClick={verificarLogin}
        style={{
          ...button,
          background: "#111",
          color: "#fff",
        }}
      >
        Entrar
      </button>

      <button
        onClick={() => navigate("/criarConta")}
        style={{
          ...button,
          background: "#adacac",
          color: "#111",
          border: "1px solid #d5d5d5",
        }}
      >
        Criar nova conta
      </button>

      <p style={{ marginTop: "15px", color: "red" }}>{mensagem}</p>
    </div>
  );
}

  // --- ESTILOS MAIS BONITOS ---
  const box = {
    width: "380px",
    margin: "100px auto",
    padding: "35px",
    borderRadius: "16px",
    background: "#fff",
    border: "1px solid #e3e3e3",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    transition: "0.2s",
  };

  const button = {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "0.2s",
  };
