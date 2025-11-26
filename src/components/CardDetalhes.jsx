export default function CardDetalhes({ product }) {

  return (
    <div style={styles.card}>
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

      <p style={styles.price}>
        Descrição: {product.description}
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
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
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
