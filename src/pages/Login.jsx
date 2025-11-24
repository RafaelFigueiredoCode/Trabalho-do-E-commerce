import { useState } from "react"

export default function Login(){

    const [mensagem, setMensagem] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function verificarLogin(){

        const emailCorreto = "teste@email"
        const senhaCorreta = "1234"

        if(emailCorreto === email && senhaCorreta === senha){
            setMensagem("Você logou!")
        }else{
            setMensagem("Email ou senha incorretos")
        }

    }

    return(
        <div>
            <h2 style={{color: "#000"}}>Sistema login</h2>

            <input 
                type="text"
                placeholder="Digite o email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
            />

            <input 
                type="password"
                placeholder="Digite a senha"
                onChange={(e)=>setSenha(e.target.value)}
                value={senha}
            />

            <p>
            <button onClick={verificarLogin}>Entrar</button>
            </p>

            <p>{mensagem}</p>
        </div>
    )   
}