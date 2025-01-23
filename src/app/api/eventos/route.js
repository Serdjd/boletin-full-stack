import { supabase } from "@/app/layout";

export async function GET() {
    const {data,error} = await supabase
    .from("evento")
    .select("id,titulo,fecha")
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

    if(body.titulo && body.descripcion && body.ubicacion) {
        try {
            body.fecha = new Date(body.fecha)
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
                status: 501,
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
        body.fecha = new Date(body.fecha)
    }
    catch(error) {
        return new Response(JSON.stringify(error),{
            status: 500,
            headers: {"Content-type": "application/json"}
        })
    }
    if(body.fecha < new Date()){
        const {data,error, count} = await supabase
        .from("evento")
        .delete({count: 'exact'})
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
        status: 501,
        headers: {"Content-type": "application/json"}
    })
}