import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../contexts/CartContext";


export default function Card({ product }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false)

  return (
    <div
      onClick={() => navigate(`/detalhes/${product.id}`)}
        style={{
          ...styles.card, 
          ...(hover ? styles.cardHover : {})
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p style={styles.title}> {product.title} </p>

      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          style={styles.image}
        />
      )}

      <p style={styles.price}>
        R$ {product.price}
      </p>
      
      <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
}


const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "contain",
  },
  title: {
    fontSize: "14px",
    fontWeight: "500",
    height: "40px",
    overflow: "hidden",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "auto",
  },
};
