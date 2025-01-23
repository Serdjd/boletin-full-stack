'use client'

import { useRef } from "react"

export default function HabitoForm() {
    const formRef = useRef()
    async function addHabito() {
        const formData = Object.fromEntries(new FormData(formRef.current).entries());
        let message = ""
        let isValid = true
        if(!formData.nombre) {
            message += "El nombre no puede estar vacio\n"
            isValid = false
        }
        
        if(new Date(formData.fecha) < new Date()) {
            message += "La fecha no puede ser anterior a la actual\n"
            isValid = false
        }
        if(isValid) {
            const response = await fetch("/api/habitos",{
                method:"POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(formData)
            })
            if(response.ok) {
                alert("Habito añadido")
            }
        }
        else {
            alert(message)
        }
    }
    return(
        <form ref={formRef} action={addHabito}>
            <label>Nombre: <input name="nombre" type="text" required></input></label><br/>
            <label>Descripcion: <input name="descripcion" type="text"></input></label><br/>
            <label>Completado: <input name="completado" type="checkbox"></input></label><br/>
            <label>Fecha: <input name="fecha" type="date" required></input></label><br/>
            <button type="submit">Añadir</button>
        </form>
    )
}