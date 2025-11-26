import { useAuth } from "../contexts/UserContext";
import { getProtectedData } from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    try{
        const userData = getProtectedData()
        setData(userData.message);
    }
    catch(err){
        console.log(err)
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.username}</p>
  
      <p>{data}</p>
  
      <button onClick={logout}>Sair</button>
    </div>
  );
}