import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem("customUsers")) || [];
  
    const exists = users.find(u => u.username === username);
    if (exists) {
      return { success: false, message: "Usuário já existe" };
    }
  
    users.push({ username, password });
    localStorage.setItem("customUsers", JSON.stringify(users));
  
    return { success: true };
  }

  async function login(username, password) {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        { username, password }
      );
  
      const token = response.data.token;
      if (!token) throw new Error("Token inválido");
  
      const userResponse = await axios.get("https://fakestoreapi.com/users/1");
      const user = userResponse.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      return { success: true, type: "api" }; 
  
    } catch (apiError) {
  

      const localUsers = JSON.parse(localStorage.getItem("customUsers") || "[]");

  
      const foundUser = localUsers.find(
        (u) => u.username === username && u.password === password
      );
  
      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        return { success: true, type: "local" };  // ← IMPORTANTE
      }
  
      return { success: false, message: "Usuário ou senha incorretos." };
    }
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}