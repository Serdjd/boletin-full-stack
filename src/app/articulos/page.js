'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Articulos() {
    const [articulos,setArticulos] = useState([])
    const formRef = useRef()
    useEffect(() => {
        fechData()
    },[])

    async function fechData() {
        const response = await fetch("api/articulos", {
            method: "GET",
            headers: {"Content-type":"application/json"}
        })
        setArticulos(await response.json())
        
    }

    async function deleteArticulo(id) {
        if(window.confirm("Estas seguro?")) {
            const response = await fetch("api/articulos", {
                method: "DELETE",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({id: id})
            })
            if(response.ok) {
                fechData()
            }
        }
    }

    async function addArticulo() {
        const formData = Object.fromEntries(new FormData(formRef.current).entries());
        const response = await fetch("/api/articulos",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData) 
        })

        if(response.ok) {
            fechData()
        }
    }

    return(
        <>
            <Form ref={formRef} addArticulo={addArticulo}/>
            {
                articulos.map(articulo => 
                    <div key={articulo.id}>
                        <Link href={`articulos/${articulo.id}`}>
                            <pre>{`${articulo.titulo}\n${articulo.autor}\n${articulo.fecha_publicacion}`}</pre>
                        </Link>
                        <button onClick={() => deleteArticulo(articulo.id)}>Eliminar</button>
                    </div>
                )
            }
        </>
        
    )
}

function Form({ref,addArticulo}) {
    return(
        <form ref={ref} action={addArticulo}>
            <label>Titulo: <input name="titulo" type="text" maxLength={150} required></input></label><br/>
            <label>Autor: <input name="autor" type="text" required></input></label><br/>
            <label>Contenido: <input name="contenido" type="text" required></input></label><br/>
            <button type="submit">Enviar</button><br/>
        </form>
    )
}