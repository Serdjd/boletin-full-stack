'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Habitos() {
    const [habitos,setHabitos] = useState([])
    const router = useRouter()
    useEffect(() => {
        fetchData()
    },[])
    async function fetchData() {
        const response = await fetch("api/habitos", {
            method: "GET",
            headers: {"Content-type": "application/json"}
        })
        setHabitos(await response.json())
    }
    async function updateCompletado(id,completado) {
        const response = await fetch(`api/habitos?id=${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({completado: !completado})
        })
        if(response.ok) {
            fetchData()
        }
        else alert("No se pudo cambiar el valor")
    }
    async function deleteHabito(id) {
        const response = await fetch(`api/habitos?id=${id}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}
        })

        if(response.ok) {
            fetchData()
        }
        else if(response.status === 502) {
            alert("El habito tiene que estar completado")
        }
        else {
            alert("No se pudo borrar el habito")
        }
    }
    return(
        <>
            <button onClick={() => router.push('/habitos/add')}>Añadir nuevos habitos</button><br/>
            <table border={"3"}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Completado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        habitos.map(habito => <Habito habito={habito} update={updateCompletado} deleteHabito={deleteHabito} key={habito.id}/>)
                    }
                </tbody>
            </table>
        </>
    )
}
function Habito({habito,update,deleteHabito}) {
    return(
        <tr>
            <td>{habito.nombre}</td>
            <td>{habito.descripcion}</td>
            <td><input type="checkbox" checked={habito.completado} onChange={() => update(habito.id,habito.completado)}></input></td>
            <td><button onClick={() => deleteHabito(habito.id)}>Eliminar</button></td>
        </tr>
    )
}