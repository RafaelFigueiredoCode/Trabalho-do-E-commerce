import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: { 'Content-Type': 'application/json' }
});

// GET
export async function getProducts() {
  try {
    const response = await api.get('products');
    return response.data;
  } catch (err) {
    return { error: true, message: err.message };
  }
}

// POST
export async function createProduct(novoProduto) {
  try {
    const response = await api.post('products', novoProduto);
    return response.data;
  } catch (err) {
    return { error: true, message: err.message };
  }
}

// DELETE
export async function deleteProduct(id) {
  try {
    const response = await api.delete(`products/${id}`);
    return response.data;
  } catch (err) {
    return { error: true, message: err.message };
  }
}

export function getProtectedData() {
  const token = localStorage.getItem("token");

  if (token) {
    return { message: "Dados protegidos acessados com sucesso!" };
  } else {
    throw new Error({ error: "Token inválido ou ausente" });
  }
}

