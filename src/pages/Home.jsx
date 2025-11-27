import { useState, useEffect } from "react";
import Card from "../components/cards";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const titleAnim = {
    animation: "pop 0.6s ease",
  };

  const globalKeyframes = `
@keyframes pop {
  0% { transform: scale(0.7); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}
`;

  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>${globalKeyframes}</style>`
  );

  function handleOpenCart() {
    if (!user) {
      alert("Você precisa estar logado para acessar o carrinho.");
      return navigate("/login");
    }

    navigate("/carrinho");
  }

  return (
    <div style={styles.container}>
      {products.length !== 0 ? (
        <div>
          <button
            onClick={() => navigate("/login")}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              padding: "10px 20px",
            }}
          >
            Entrar na conta
          </button>

          <button onClick={handleOpenCart} style={styles.cartButton}>
            Ver Carrinho
          </button>
        </div>
      ) : (
        <></>
      )}

      <h1
        style={{
          marginBottom: "25px",
          fontSize: "50px",
          fontWeight: "800",
          textAlign: "center",
          color: "#111",
          letterSpacing: "2px",
          ...titleAnim,
        }}
      >
        Zóio Store
      </h1>

      <div style={styles.grid}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      {products.length !== 0 ? (
        <footer style={styles.footer}>
          &copy; {new Date().getFullYear()} Oficina Express - Todos os direitos
          reservados.
        </footer>
      ) : (
        <></>
      )}
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
  footer: {
    textAlign: "center",
    padding: "20px",
    color: "#111",
  },
};
