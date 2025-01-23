'use client'
import { use, useEffect, useRef, useState } from "react"

export default function Evento({params}) {
    const id = use(params).id
    const [isEditing, setEditing] = useState(false)
    const [evento,setEvento] = useState({})
    const asistentesRef = useRef()
    useEffect(() => {
        fetchData()
    },[])
    async function fetchData() {
        const response = await fetch(`/api/eventos/evento?id=${id}`, {
            method: "GET",
            headers: {"Content-type":"application/json"}
        })

        if(response.ok) {
            setEvento(await response.json())
        }
        else {
            alert("404 not found")
        }
    }

    async function updateAsistentes() {
        const asistentes = asistentesRef.current.value
        console.log(asistentes)
        let message = ""
        let valid = true
        if(isNaN(asistentes)) {
            message += "Los asistentes tienen que tener un valor numérico"
            valid = false
        }
        if(asistentes < 0) {
            message += "Los asistentes no pueden sen negativos"
            valid = false
        }
        if(valid) {
            const response = await fetch(`/api/eventos/evento?id=${id}&asistentes=${asistentes}`,{
                method: "PUT",
                headers: {"Content-type":"application/json"}
            })

            if(response.ok) {
                fetchData()
                setEditing(false)
            }
            else {
                alert("No se pudieron actualizar los asistentes")
            }
        }
        else alert(message)
    }
    return(
        <>
            <h2>{evento.titulo}</h2>
            <p>Descripcion: {evento.descripcion}</p>
            <p>Fecha: {evento.fecha}</p>
            <p>Ubicacion: {evento.ubicacion}</p>
            {
                isEditing
                ?
                <label>Asistentes: <input ref={asistentesRef} defaultValue={evento.asistentes} type="number"></input><button onClick={updateAsistentes}>Actualizar</button></label>
                :
                <p>Asistentes: {evento.asistentes}<button onClick={() => setEditing(true)}>Modificar</button></p>
            }
            
        </>
    )
}