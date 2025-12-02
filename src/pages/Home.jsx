import { useState, useEffect } from "react";
import Card from "../components/cards";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";

export default function Home() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);

  // ANIMAÇÃO POP DO CARRINHO
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
      showToast({
        severity: "warn",
        summary: "Acesso restrito ⚠️",
        detail: "Você precisa estar logado para acessar o carrinho.",
        life: 2500,
      });

      return navigate("/login");
    }

    navigate("/carrinho");
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={styles.container}>
      {products.length !== 0 && (
        <div>
          {/* ÁREA DO USUÁRIO — FIXA NA DIREITA */}
          <div style={styles.userArea}>
            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  style={styles.userButton}
                >
                  {user.username} ▼
                </button>

                {menuOpen && (
                  <div style={styles.menu}>
                    <button
                      className="logout-btn"
                      style={{
                        ...styles.logoutButton,
                        ...(hoverLogout ? styles.logoutButtonHover : {}),
                      }}
                      onMouseEnter={() => setHoverLogout(true)}
                      onMouseLeave={() => setHoverLogout(false)}
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                style={styles.loginButton}
              >
                Entrar na conta
              </button>
            )}
          </div>

          {/* BOTÃO DO CARRINHO */}
          <button
            onClick={handleOpenCart}
            style={{
              ...styles.cartButton,
              animation: cart.length > 0 ? "popcart 0.4s ease" : "none",
            }}
          >
            🛒 Ver Carrinho
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
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
          &copy; {new Date().getFullYear()} Zóio Store - Todos os direitos
          reservados.
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

  /* *** ÁREA DO USUÁRIO AJUSTADA *** */
  userArea: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 60,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },

  userButton: {
    background: "#111",
    border: "1px solid #ddd",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s ease",
  },
  userButtonHover: {
    background: "#111",
  },

  /* MENU DROPDOWN */
  menu: {
    position: "absolute",
    top: "40px",
    right: "0px",
    background: "#fff",
    padding: "6px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    width: "110px",
    zIndex: 80,
  },

  /* BOTÃO SAIR MINI, SUAVE, MINIMALISTA */
  logoutButton: {
    width: "85px",
    background: "#efefef",
    border: "1px solid #d9d9d9",
    padding: "6px 10px",
    fontSize: "13px",
    color: "#444",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "0.2s ease",
    margin: "0 auto",
    display: "block",
  },

  logoutButtonHover: {
    backgroundColor: "#e2e2e2",
    borderColor: "#c8c8c8",
    color: "#000",
  },

  /* --- RESTANTE --- */

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
    padding: "10px 20px",
    background: "#111",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

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
