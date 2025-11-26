export default function CardDetalhes({ product }) {

  return (
    <div style={styles.card}>
      
      <h2 style={styles.title}>{product.title}</h2>

      <img
        src={product.image}
        alt={product.title}
        style={styles.image}
      />

      <p style={styles.price}>R$ {product.price}</p>

      <p style={styles.description}>{product.description}</p>

    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #ddd",
    boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "700px",
    width: "100%",
    margin: "0 auto",
  },

  image: {
    width: "100%",
    height: "320px",
    objectFit: "contain",
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
  },

  description: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#444",
  },

  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#111",
  },
};
