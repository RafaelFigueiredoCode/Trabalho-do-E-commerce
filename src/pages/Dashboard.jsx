import { useAuth } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createProduct, deleteProduct, getProtectedData } from "../services/api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  // estados do CRUD
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    try {
      const userData = getProtectedData();
      setData(userData.message);
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function handleCreate() {
    if (!novoTitulo || !novoPreco) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    const novoProduto = {
      title: novoTitulo,
      price: Number(novoPreco),
      description: "Criado via dashboard",
      image: "https://i.imgur.com/placeholder.png",
      category: "others"
    };

    const resposta = await createProduct(novoProduto);

    if (resposta.error) {
      setMensagem("Erro ao criar produto.");
    } else {
      setMensagem("Produto criado com sucesso!");
    }
  }

  async function handleDelete() {
    if (!deleteId) {
      setMensagem("Informe o ID para deletar.");
      return;
    }

    const resposta = await deleteProduct(deleteId);

    if (resposta.error) {
      setMensagem("Erro ao deletar produto.");
    } else {
      setMensagem("Produto deletado com sucesso!");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.username}</p>
      <p>{data}</p>

      <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <h2 style={{marginBottom: '20px'}}>Criar Produto</h2>

        <input
          type="text"
          placeholder="Título"
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Preço"
          value={novoPreco}
          onChange={(e) => setNovoPreco(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <button onClick={handleCreate}>Criar Produto</button>
      </div>

      <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <h2 style={{marginBottom: '20px'}}>Apagar Produto</h2>

        <input
          type="number"
          placeholder="ID do produto"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <button onClick={handleDelete}>Deletar Produto</button>
      </div>

      <p>{mensagem}</p>

      <button onClick={logout} style={{ marginTop: "20px" }}>
        Sair
      </button>
    </div>
  );
}