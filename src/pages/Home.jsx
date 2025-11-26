import { useState, useEffect } from "react";
import Card from "../components/cards";
import { getProducts } from "../services/api";
import { useNavigate } from 'react-router-dom';

export default function Home(){

    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        async function loadProducts() {
            const data = await getProducts()
            setProducts(data)
        }
        loadProducts()
    }, []);



    
    return(
        <div style={styles.container}>
            <h1>Produtos</h1>

            <div style={styles.grid}>
                {products.map((product) => (
                    <Card
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <button onClick={() => navigate('/login')}>Entrar na conta</button>
        </div>
    )
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
};
