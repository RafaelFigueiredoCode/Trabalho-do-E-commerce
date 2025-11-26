import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardDetalhes from "../components/CardDetalhes";
import { getProducts } from "../services/api";

export default function DetalhesProd() {

    const { id } = useParams();
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
        return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Carregando...</h2>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Detalhes do Produto</h1>

            <CardDetalhes product={product} />

            <button
                style={styles.button}
                onClick={() => navigate(-1)}
            >
                Voltar
            </button>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
    },

    header: {
        color: "#222",
        fontSize: "30px",
        fontWeight: "700",
    },

    button: {
        padding: "12px 24px",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "0.3s",
        marginTop: "20px",
    },
};
