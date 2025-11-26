import { useCart } from "../contexts/CartContext";

export default function Carrinho() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: 40 }}>
      <h1>🛒 Seu Carrinho</h1>

      {cart.length === 0 && <p>Seu carrinho está vazio.</p>}

      {cart.map(item => (
        <div 
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            borderBottom: "1px solid #ccc",
            padding: 10,
          }}
        >
          <img src={item.image} width="80" />

          <div>
            <p>{item.title}</p>
            <p>Quantidade: {item.quantity}</p>
            <p>R$ {item.price * item.quantity}</p>
          </div>

          <button onClick={() => removeFromCart(item.id)}>Remover</button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2>Total: R$ {total.toFixed(2)}</h2>
          <button onClick={clearCart}>Limpar carrinho</button>
        </>
      )}
    </div>
  );
}