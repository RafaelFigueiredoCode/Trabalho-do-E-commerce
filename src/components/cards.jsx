export default function Card({ titulo, imagem, preco }){

    return(
        <div>

            <img src={imagem} alt={titulo} />
            <h3> {titulo} </h3>
            <strong>RS ${preco}</strong>
        </div>
    )
}