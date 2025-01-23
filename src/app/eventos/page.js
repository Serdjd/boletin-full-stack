'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Eventos() {
    const [eventos,setEventos] = useState([])
    const router = useRouter()
    useEffect(() => {
        fetchData()
    },[])

    async function fetchData() {
        const response = await fetch("api/eventos",{
            method: "GET",
            headers: {"Content-type":"application/json"}
        })
        if(response.ok) {
            setEventos(await response.json())
        }
        else{
            alert("404 Not Found")
        }
    }

    async function deleteEvento(id,fecha) {
        const response = await fetch(`api/eventos?id=${id}`, {
            method: "DELETE",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({fecha: fecha})
        })
        if (response.ok) {
            fetchData()
        }
        else if (response.status === 501){
            alert("Solo se pueden eliminar eventos pasados")
        }
        else {
            alert("No se pudo eliminar el evento")
        }
    }

    return(
        <>
            <button onClick={() => router.push("/eventos/add")}>Añadir nuevos eventos</button>
            {
                eventos.map(evento => <Evento key={evento.id} evento={evento} deleteEvento={deleteEvento}/>)
            }
        </>
    )
}

function Evento({evento,deleteEvento}) {
    return(
        <p>
            <Link href={`eventos/${evento.id}`}>{evento.titulo + " " + evento.fecha}</Link>
            <button onClick={() => deleteEvento(evento.id,evento.fecha)}>Eliminar</button>
        </p>
    )
}