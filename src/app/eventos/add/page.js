'use client'

import { useRef } from "react"

export default function EventoForm() {
    const formRef = useRef()
    async function addEvento() {
        const formData = Object.fromEntries(new FormData(formRef.current).entries());
        let message = ""
        let isValid = true
        if(!formData.titulo) {
            message += "El titulo no puede estar vacio\n"
            isValid = false
        }
        if(!formData.fecha) {
            message += "La fecha no puede estar vacia\n"
            isValid = false
        }
        else if(new Date(formData.fecha) < new Date()) {
            message += "La fecha no puede ser anterior a la actual\n"
            isValid = false
        }
        if(!formData.ubicacion) {
            message += "La ubiccación no puede estar vacia\n"
        }
        if(isValid) {
            if(formData.asistentes === '') formData.asistentes = 0
            const response = await fetch("/api/eventos",{
                method:"POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(formData)
            })
            if(response.ok) {
                alert("Evento añadido")
            }
        }
        else {
            alert(message)
        }
    }
    return(
        <form ref={formRef} action={addEvento}>
            <label>Titulo: <input name="titulo" type="text" required></input></label><br/>
            <label>Descripcion: <input name="descripcion" type="text"></input></label><br/>
            <label>Fecha: <input name="fecha" type="date" required></input></label><br/>
            <label>Ubicacion: <input name="ubicacion" type="text" required></input></label><br/>
            <label>Asistentes: <input name="asistentes" type="number" min={0}></input></label><br/>
            <button type="submit">Añadir</button>
        </form>
    )
}