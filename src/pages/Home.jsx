import { useState, useEffect } from "react";
import Card from "../components/cards";
import { getProducts } from "../services/api";

export default function Home(){

    const [products, setProducts] = useState([]);

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
        </div>
    )
}

const styles = {
    container: {
        padding: "20px",
    },
    grid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
    },
};