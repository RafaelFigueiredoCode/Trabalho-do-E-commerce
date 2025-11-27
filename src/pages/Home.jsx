import { useState, useEffect } from "react";
import Card from "../components/cards";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext"; // <--- importante

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart } = useCart(); // <--- quantidade no carrinho

  // ANIMAÇÃO DO POP
  const globalKeyframes = `
@keyframes popcart {
  0% { transform: scale(1); }
  40% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
`;

  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>${globalKeyframes}</style>`
  );

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleOpenCart() {
    if (!user) {
      alert("Você precisa estar logado para acessar o carrinho.");
      return navigate("/login");
    }

    navigate("/carrinho");
  }

  return (
    <div style={styles.container}>
      {products.length !== 0 && (
        <div>
          {/* botão login */}
          <button
            onClick={() => navigate("/login")}
            style={styles.loginButton}
          >
            Entrar na conta
          </button>

          {/* BOTÃO DO CARRINHO ESPERTO */}
          <button
            onClick={handleOpenCart}
            style={{
              ...styles.cartButton,
              animation: cart.length > 0 ? "popcart 0.4s ease" : "none",
            }}
          >
            🛒 Ver Carrinho
            {cart.length > 0 && (
              <span style={styles.cartBadge}>{cart.length}</span>
            )}
          </button>
        </div>
      )}

      <h1 style={styles.title}>Zóio Store</h1>

      <div style={styles.grid}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {products.length !== 0 && (
        <footer style={styles.footer}>
          &copy; {new Date().getFullYear()} Oficina Express - Todos os direitos reservados.
        </footer>
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

  title: {
    marginBottom: "25px",
    fontSize: "50px",
    fontWeight: "800",
    textAlign: "center",
    color: "#111",
    letterSpacing: "2px",
    animation: "pop 0.6s ease",
  },

  loginButton: {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    zIndex: 10,
  },

  // BOTÃO DO CARRINHO TURBINADO
  cartButton: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    padding: "15px 22px",
    background: "#111",
    color: "#fff",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0px 0px 12px rgba(0,0,0,0.3)",
    transition: "0.2s",
    zIndex: 20,
  },

  // BADGE COM QUANTIDADE
  cartBadge: {
    background: "red",
    color: "#fff",
    padding: "4px 9px",
    borderRadius: "50%",
    fontSize: "14px",
    fontWeight: "bold",
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
