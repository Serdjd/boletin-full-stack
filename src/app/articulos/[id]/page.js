'use client'
import { use, useEffect, useState } from "react";

export default function Articulo({params}) {
    const {id} = use(params)
    const [data, setData] = useState({})
    useEffect(() => {
        fetchData()
    },[])

    async function fetchData() {
        const response = await fetch(`/api/articulos/articulo?id=${id}`,{
            method:"GET",
            headers: {"Content-type":"application/json"}
        })
        setData(await response.json())
    }

    return(
        Object.entries(data).map(([key,value]) => 
            <p key={key}>{key + ": " + value}</p>
        )
    )
}