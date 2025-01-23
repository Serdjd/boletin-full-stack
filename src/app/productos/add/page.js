'use client'

import { useRef } from "react"

export default function ProductForm() {
    const formRef = useRef()
    async function addProduct() {
        let message = ""
        
    }
    return(
        <form ref={formRef} action={addProduct}>
            <label>Nombre: <input name="nombre" type="text" required></input></label>
            <label>Descripción: <input name="descripcion" type="text"></input></label>
            <label>Precio: <input name="precio" type="number" min={0} step={.01} required></input></label>
            <label>Stock: <input name="stock" type="number" min={0} required></input></label>
            <button type="submit">Añadir</button>
        </form>
    )
}