import { useState } from "react";
import { useAuth } from "../contexts/UserContext";

export default function Login() {
  const { login } = useAuth(); // <-- usar o AuthContext

  const [mensagem, setMensagem] = useState("");
  const [username, setUsername] = useState(""); 
  const [senha, setSenha] = useState("");

  async function verificarLogin() {
    const result = await login(username, senha);

    if (result.success) {
      setMensagem("Você logou com sucesso!");
    } else {
      setMensagem("Usuário ou senha incorretos");
    }
  }

  return (  
  
  <div   
  style={{
    width: "300px",
    marginLeft: "750px",
  }}>
  
      <h2 style={{ color: "#000" }}>Sistema login</h2>

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
        <button onClick={verificarLogin}>Entrar</button>
      </p>

      <p>{mensagem}</p>
    </div>
  );
}