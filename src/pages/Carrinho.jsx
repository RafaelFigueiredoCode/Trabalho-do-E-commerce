import { useCart } from "../contexts/CartContext";

export default function Carrinho() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Seu Carrinho</h1>

      {cart.length === 0 && (
        <p style={styles.vazio}>Seu carrinho está vazio.</p>
      )}

      {cart.map(item => (
        <div key={item.id} style={styles.item}>
          <img src={item.image} style={styles.image} />

          <div style={styles.info}>
            <p>{item.title}</p>
            <p>Quantidade: {item.quantity}</p>
            <p>R$ {item.price * item.quantity}</p>
          </div>

          <button
            style={styles.removeBtn}
            onMouseOver={e => (e.currentTarget.style.background = "#d93636")}
            onMouseOut={e => (e.currentTarget.style.background = "#ff4040")}
            onClick={() => removeFromCart(item.id)}
          >
            Remover
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2 style={styles.total}>Total: R$ {total.toFixed(2)}</h2>
          <button
            style={styles.clearBtn}
            onMouseOver={e => (e.currentTarget.style.background = "#222")}
            onMouseOut={e => (e.currentTarget.style.background = "#444")}
            onClick={clearCart}
          >
            Limpar carrinho
          </button>
        </>
      )}
    </div>
  );
}



const styles = {
  container: {
    maxWidth: 900,
    margin: "0 auto",
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "80vh",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  vazio: {
    fontSize: 22,
    opacity: 0.7,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },

  item: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    padding: "15px 0",
    borderBottom: "1px solid #ddd",
  },

  image: {
    width: 90,
    height: 90,
    objectFit: "contain",
  },

  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  removeBtn: {
    padding: "8px 14px",
    border: "none",
    cursor: "pointer",
    borderRadius: 6,
    fontWeight: "bold",
    background: "#ff4040",
    color: "#fff",
    transition: "0.2s",
  },

  total: {
    fontSize: 26,
    marginTop: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  clearBtn: {
    padding: "10px 16px",
    border: "none",
    cursor: "pointer",
    borderRadius: 6,
    fontWeight: "bold",
    background: "#444",
    color: "#fff",
    marginTop: 10,
    transition: "0.2s",
  },
};
