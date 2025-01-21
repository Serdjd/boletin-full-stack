import { supabase } from "@/app/layout";

export async function GET() {
    const {data,error} = await supabase
    .from("evento")
    .select("*")
    .order("fecha")

    if(error) {
        return new Response(JSON.stringify(error),{
            status: 500,
            headers: {"Content-type": "application/json"}
        })
    }

    return new Response(JSON.stringify(data),{
        status: 201,
        headers: {"Content-type": "application/json"}
    })
}

export async function POST(request) {
    const body = await request.json()

    if(body.titulo && body.descripcion && ubicacion) {
        try {
            const parts = body.fecha.split("/")
            body.fecha = new Date(parts[2], parts[1] - 1, parts[0])
        }
        catch(error) {
            return new Response(JSON.stringify(error),{
                status: 500,
                headers: {"Content-type": "application/json"}
            })
        }

        const {data,error} = await supabase
        .from("evento")
        .insert(body)

        if(error) {
            return new Response(JSON.stringify(error),{
                status: 500,
                headers: {"Content-type": "application/json"}
            })
        }

        return new Response(JSON.stringify({message: "Evento insertado"}),{
            status: 201,
            headers: {"Content-type": "application/json"}
        })
    }
}

export async function DELETE(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")
    const body = await request.json()

    try {
        const parts = body.fecha.split("/")
        body.fecha = new Date(parts[2], parts[1] - 1, parts[0])
    }
    catch(error) {
        return new Response(JSON.stringify(error),{
            status: 500,
            headers: {"Content-type": "application/json"}
        })
    }

    if(body.fecha < new Date()){
        const {data,error, count} = supabase
        .from("eventos")
        .delete()
        .eq("id",id)

        if(error) {
            return new Response(JSON.stringify(error),{
                status: 500,
                headers: {"Content-type": "application/json"}
            })
        }
        if(count > 0) {
            return new Response(JSON.stringify({message: "Evento antiguo eliminado"}),{
                status: 201,
                headers: {"Content-type": "application/json"}
            })
        }        
    }

    return new Response(JSON.stringify({message: "error"}),{
        status: 500,
        headers: {"Content-type": "application/json"}
    })
}