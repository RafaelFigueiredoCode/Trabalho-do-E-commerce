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
    <div style={{ width: "300px", marginLeft: "750px" }}>
      <h2 style={{ color: "#000" }}>Criar Conta</h2>

      <input
        type="text"
        placeholder="Digite o username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <input
        type="password"
        placeholder="Digite a senha"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
      />

      <p>
        <button onClick={handleCriarConta}>Criar Conta</button>
      </p>

      <p>
        <button onClick={() => navigate('/login')}>Voltar para Login</button>
      </p>

      <p>{mensagem}</p>
    </div>
  );
}