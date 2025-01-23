'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

async function fetchData() {
    const response = await fetch("api/productos",{
        method: "GET",
        headers: {"Content-type": "application/json"}
    })
    return await response.json()
}

export default function Inventario() {
    const [productos,setProductos] = useState([])
    const router = useRouter()
    useEffect(() => {
        const load = async() => {
            setProductos(await fetchData())
        }
        load()
    },[])

    return(
        <div>
            <table border={"3"}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map(producto => 
                            <Row producto={producto} key={producto.id} setProductos={setProductos}/>
                        )
                    }
                </tbody>
            </table>
            <button onClick={() => router.push('/productos/add')}>
                Añadir productos
            </button>
        </div>
        
    )
}

function Row({producto, setProductos}) {
    return(
        <tr>
            <td>{producto.nombre}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.precio}</td>
            <td><UpdateStockForm id={producto.id} stock={producto.stock} setProductos={setProductos}/></td>
        </tr>
    )
}

function UpdateStockForm({id,stock, setProductos}) {
    const formRef = useRef()
    const [isEditing,setIsEditing] = useState(false)
    async function updateStock() {
        const formData = Object.fromEntries(new FormData(formRef.current).entries());
        const response = await fetch(`api/productos?id=${id}&stock=${formData.stock}`,{
            method: "PUT",
            headers: {"Content-type": "application/json"}
        })
        if(response.ok) {
            setProductos(await fetchData())
            setIsEditing(false)
        }
    }
    return(
        isEditing
        ?
        <form ref={formRef} action={updateStock}>
            <input name="stock" type="number" defaultValue={stock} required min={0}></input>
            <button type="submit">Actualizar</button>
        </form>
        :
        <>
            {stock === 0 ? <span style={{color:"red"}}>{stock}</span> : <span>{stock}</span>}
            <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
    )
}