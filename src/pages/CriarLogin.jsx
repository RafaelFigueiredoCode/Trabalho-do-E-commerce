import { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";

export default function CriarConta() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCriarConta() {
    const result = await registerUser(username, senha);

    if (result.success) {
      showToast({
        severity: "success",
        summary: "Login Local",
        detail: "Conta criada com sucesso!",
      });
      // cadastro deu certo → vai para login
      navigate("/login");
    } else {
      showToast({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao criar conta!",
      });    }
  }

  return (
    <div style={box}>
      <h2 style={{ color: "#000", marginBottom: "20px" }}>Criar Conta</h2>

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
        onClick={handleCriarConta}
        style={{
          ...button,
          background: "#111",
          color: "#fff",
        }}
      >
        Criar Conta
      </button>

      <button
        onClick={() => navigate("/login")}
        style={{
          ...button,
          background: "#adacac",
          color: "#111",
          border: "1px solid #d5d5d5",
        }}
      >
        Voltar para Login
      </button>
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
