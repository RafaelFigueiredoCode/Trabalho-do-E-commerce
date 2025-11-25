import { useNavigate } from 'react-router-dom';

export default function Card({ product }) {
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/detalhes/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <p style={{fontSize: '16px', fontWeight: 'bold'}}> {product.title} </p>

      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          style={{ width: '100%', borderRadius: '4px' }}
        />
      )}

      <p style={{ fontWeight: "bold" }}>
        R$ {product.price}
      </p>
    </div>
  );
}