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
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>

      <p style={styles.welcome}>
        Bem-vindo, <b>{user?.username}</b>
      </p>

      <p style={styles.dataText}>{data}</p>

      {/* CARD CRIAR */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Criar Produto</h2>

        <input
          type="text"
          placeholder="Título"
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Preço"
          value={novoPreco}
          onChange={(e) => setNovoPreco(e.target.value)}
          style={styles.input}
        />

        <button style={{ ...styles.button, background: "#4CAF50" }} onClick={handleCreate}>
          Criar Produto
        </button>
      </div>

      {/* CARD DELETAR */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Apagar Produto</h2>

        <input
          type="number"
          placeholder="ID do produto"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          style={styles.input}
        />

        <button style={{ ...styles.button, background: "#E53935" }} onClick={handleDelete}>
          Deletar Produto
        </button>
      </div>

      <p style={styles.message}>{mensagem}</p>

      <button style={styles.logoutBtn} onClick={logout}>Sair</button>
    </div>
  );
}

/* =========================================================
   =======================  STYLES  =========================
   ========================================================= */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    background: "#f5f5f5",
    gap: "30px",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
  },

  welcome: {
    fontSize: "18px",
    opacity: 0.8,
  },

  dataText: {
    fontSize: "16px",
  },

  card: {
    width: "320px",
    padding: "25px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  cardTitle: {
    marginBottom: "5px",
    fontSize: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  button: {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.2s",
  },

  message: {
    fontSize: "16px",
    color: "#444",
  },

  logoutBtn: {
    padding: "12px 20px",
    background: "#555",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "0.2s",
  },
};
