import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Pagamento() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [metodo, setMetodo] = useState("cartao"); // padrão cartão

  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  function pagar() {
    if (metodo === "cartao") {
      if (!card || !name || !validade || !cvv) {
        showToast({
          severity: "warn",
          summary: "Campos vazios",
          detail: "Preencha todos os dados do cartão!",
        });
        return;
      }
    }

    showToast({
      severity: "success",
      summary: "Pagamento aprovado",
      detail: "Seu pedido foi confirmado!",
    });

    clearCart();
    setTimeout(() => navigate("/"), 1200);
  }

  return (
    <div style={box}>
      <h2 style={title}>Pagamento</h2>

      {/* BOTÕES DE MÉTODO */}
      <div style={metodosBox}>
        <button
          onClick={() => setMetodo("cartao")}
          style={{
            ...metodoBtn,
            background: metodo === "cartao" ? "#111" : "#e2e2e2",
            color: metodo === "cartao" ? "#fff" : "#000",
          }}
        >
          Cartão
        </button>

        <button
          onClick={() => setMetodo("pix")}
          style={{
            ...metodoBtn,
            background: metodo === "pix" ? "#111" : "#e2e2e2",
            color: metodo === "pix" ? "#fff" : "#000",
          }}
        >
          Pix
        </button>
      </div>

      {/* FORMULÁRIO DE CARTÃO */}
      {metodo === "cartao" && (
        <>
          <input
            placeholder="Número do cartão"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            style={input}
          />
          <input
            placeholder="Nome no cartão"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
          />
          <input
            placeholder="Validade (MM/AA)"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            style={input}
          />
          <input
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={input}
          />
        </>
      )}

      {/* PIX */}
      {metodo === "pix" && (
        <div style={pixBox}>
          <p style={{ marginBottom: "10px", fontWeight: "600" }}>
            Escaneie o QR Code para pagar
          </p>

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAGAMENTO_FAKE"
            alt="QR Code"
            style={{ width: "180px", height: "180px", borderRadius: "8px" }}
          />

          <p style={{ marginTop: "8px", fontSize: "14px", opacity: 0.7 }}>
            (QR Code fictício)
          </p>
        </div>
      )}

      <button onClick={pagar} style={button}>
        Confirmar pagamento
      </button>
    </div>
  );
}

/* 🧡 ESTILOS */
const box = {
  padding: "30px",
  width: "380px",
  margin: "100px auto",
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #dcdcdc",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
};

const title = { textAlign: "center", marginBottom: "20px", color: "#111" };

const input = {
  width: "100%",
  marginBottom: "12px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const button = {
  width: "100%",
  padding: "14px",
  background: "#111",
  color: "#fff",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  marginTop: "10px",
};

const metodosBox = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const metodoBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
};

const pixBox = {
  textAlign: "center",
  marginBottom: "20px",
};
