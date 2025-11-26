import { useNavigate } from 'react-router-dom';

export default function Card({ product }) {
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/detalhes/${product.id}`)}
      style={styles.card}
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
    transition: "0.2s",
    cursor: "pointer"
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