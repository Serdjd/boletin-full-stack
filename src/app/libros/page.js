'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function libros() {
    const [libros,setLibros] = useState([])
    const router = useRouter()
    useEffect(() => {
        fetchData()
    },[])
    async function fetchData(filter = "") {
        const response = await fetch(`api/libros?filter=${filter}`,{
            method: "GET",
            headers: {"Content-type": "application/json"}
        })
        setLibros(await response.json())
    }
    function Libro({libro}) {
        async function updateLibro() {
            const response = await fetch(`api/libros?id=${libro.id}`,{
                method: "PUT",
                headers: {"Content-type": "application"},
                body: JSON.stringify({leido: !libro.leido})
            })
            if(response.ok) {
                fetchData()
            }
            else {
                alert("No se pudo actualizar el valor")
            }
        }
        return(
            <div>
                <h3>{libro.titulo}</h3>
                <label>{libro.autor}  <input type="checkbox" checked={libro.leido} onChange={updateLibro}></input></label>
            </div>
        )
    }
    return(
        <>
            <label>
                Filtro: 
                <select defaultValue={''} onChange={(e) => fetchData(e.target.value)}>
                    <option value={""}>All</option>
                    <option value={"leidos"}>Leidos</option>
                    <option value={"no-leidos"}>No leidos</option>
                </select>
            </label>
            <button onClick={() => router.push("/libros/add")}>Añadir nuevos libros</button>
            {
                libros.map(libro => <Libro libro={libro} key={libro.id}/>)
            }
        </>
    )
}