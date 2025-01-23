'use client'

import { useRef } from "react"

export default function ProductForm() {
    const formRef = useRef()
    async function addProduct() {
        const formData = Object.fromEntries(new FormData(formRef.current).entries());
        let message = ""
        let isValid = true
        if(!formData.nombre) {
            message += "El nombre no puede estar vacio\n"
            isValid = false
        }
        if(!formData.precio) {
            message += "El precio no puede estar vacio\n"
            isValid = false
        }
        else if(formData.precio < 0) {
            message += "El precio tiene que ser positivo\n"
            isValid = false
        }
        if(!formData.stock) {
            message += "El stock no puede estar vacio\n"
            isValid = false
        }
        else if(formData.stock < 0) {
            message += "El stock tiene que ser positivo\n"
            isValid = false
        }
        if(isValid) {
            formData.precio = parseFloat(formData.precio)
            formData.stock = +formData.stock
            fetch("/api/productos",{
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
        <form ref={formRef} action={addProduct}>
            <label>Nombre: <input name="nombre" type="text" required></input></label><br/>
            <label>Descripción: <input name="descripcion" type="text"></input></label><br/>
            <label>Precio: <input name="precio" type="number" min={0} step={.01} required></input></label><br/>
            <label>Stock: <input name="stock" type="number" min={0} required></input></label><br/>
            <button type="submit">Añadir</button>
        </form>
    )
}