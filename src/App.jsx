import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DetalhesProd from "./pages/DetalhesProd";
import { AuthProvider, useAuth } from "./contexts/UserContext";
import CriarConta from "./pages/CriarLogin";
import { CartProvider } from "./contexts/CartContext";
import Carrinho from './pages/Carrinho'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criarConta" element={<CriarConta />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/carrinho"
              element={
                <PrivateRoute>
                  <Carrinho />
                </PrivateRoute>
              }
            />
            <Route path="/detalhes/:id" element={<DetalhesProd />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
