import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardDetalhes from "../components/CardDetalhes";
import { getProducts } from "../services/api";

export default function DetalhesProd() {

    const { id } = useParams(); // pega o ID da URL
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function loadProduct() {
            const allProducts = await getProducts();
            const selected = allProducts.find((item) => item.id === Number(id));
            setProduct(selected);
        }

        loadProduct();
    }, [id]);

    if (!product) {
        return <h2>Carregando...</h2>;
    }

    return (
        <div style={styles.card}>
            <h2 style={{ color: "#000" }}>Detalhes do Produto</h2>

            <CardDetalhes
                key={product.id}
                product={product}
            />

            <button onClick={() => navigate(-1)}>Voltar</button>
        </div>
    );
}

const styles = {
    card: {
        padding: "20px",
    },
};
