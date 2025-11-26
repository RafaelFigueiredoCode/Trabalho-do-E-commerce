import { useState, useEffect } from "react";
import Card from "../components/cards";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div style={styles.container}>
      <button
        onClick={() => navigate("/login")}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#111",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Entrar na conta
      </button>
      <h1 style={{ marginBottom: "20px" }}>Produtos</h1>

      <div style={styles.grid}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
};
