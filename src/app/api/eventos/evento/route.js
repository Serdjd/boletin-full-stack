import { supabase } from "@/app/layout"

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")
    
    const {data,error} = await supabase
    .from("evento")
    .select("*")
    .eq("id",id)

    if(error) {
        return new Response(JSON.stringify(error),{
            status: 500,
            headers: {"Content-type": "application/json"}
        })
    }

    return new Response(JSON.stringify(data),{
        status: 201,
        headers: {"Content-type":"application/json"}
    })
}

export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")
    const asistentes = +searchParams.get("asistentes")
    const {data,error} = await supabase
    .from("evento")
    .update("asistentes",asistentes)
    .eq("id",id)

    if(error) {
        return new Response(JSON.stringify(error),{
            status: 500,
            headers: {"Content-type": "application/json"}
        })
    }

    return new Response(JSON.stringify({message: "Numero de asistentes actualizado"}),{
        status: 201,
        headers: {"Content-type":"application/json"}
    })
}