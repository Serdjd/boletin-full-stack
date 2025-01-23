'use client'

import { useRef } from "react"

export default function ProductForm() {
    const formRef = useRef()
    async function addLibro() {
        const formData = Object.fromEntries(new FormData(formRef.current).entries());
        let message = ""
        let isValid = true
        if(!formData.titulo) {
            message += "El titulo no puede estar vacio\n"
            isValid = false
        }
        if(!formData.autor) {
            message += "El autor no puede estar vacio\n"
            isValid = false
        }
        if(isValid) {
            const response = await fetch("/api/libros",{
                method:"POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(formData)
            })
        }
        else {
            alert(message)
        }
    }
    return(
        <form ref={formRef} action={addLibro}>
            <label>Titulo: <input name="titulo" type="text" required></input></label><br/>
            <label>Autor: <input name="autor" type="text" required></input></label><br/>
            <label>Leido: <input name="leido" type="checkbox" defaultValue={false}></input></label><br/>
            <button type="submit">Añadir</button>
        </form>
    )
}