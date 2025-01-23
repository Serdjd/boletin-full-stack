import { supabase } from "@/app/layout";

export async function GET() {
    const {data,error} = await supabase
    .from("habito")
    .select("*")
    .eq("fecha",new Date().toLocaleDateString('en-CA'))
    .order("nombre")
    if(error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {"Content-type": "application/json"}
        })
    }

    return new Response(JSON.stringify(data),{
        status: 201,
        headers: {"Content-type": "application/json"}
    })
}

export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")
    const body = await request.json()

    if(id && body) {
        const {data,error} = await supabase
        .from("habito")
        .update(body)
        .eq("id",id)

        if(error) {
            return new Response(JSON.stringify(error),{
                status: 500,
                headers: {"Content-type": "application/json"}
            })
        }

        return new Response(JSON.stringify({message: "Habito actualizado"}), {
            status: 201,
            headers: {"Content-type": "application/json"}
        })
    }
    return new Response(JSON.stringify({message: "Error"}),{
        status: 500,
        headers: {"Content-type": "application/json"}
    })
}

export async function POST(request) {
    const body = await request.json()
    const fecha = new Date(body.fecha)
    if(fecha >= new Date() && body.nombre) {
        const {data,error} = await supabase
        .from("habito")
        .insert(body) 

        if(error) {
            return new Response(JSON.stringify(error),{
                status: 500,
                headers: {"Content-type": "application/json"}
            })
        }

        return new Response(JSON.stringify({message: "Habito añadido"}),{
            status: 201,
            headers: {"Content-type": "application/json"}
        })
    }
    return new Response(JSON.stringify({message: "Faltan datos o no son correctos"}),{
        status: 501,
        headers: {"Content-type": "application/json"}
    })
}

export async function DELETE(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")

    if(id) {
        const {data,error,count} = await supabase
        .from("habito")
        .delete({ count: 'exact' })
        .eq("id",id)
        .eq("completado",true)
        console.log(count)
        if(error) {
            return new Response(JSON.stringify(error),{
                status: 500,
                headers: {"Content-type":"application/json"}
            })
        }
        if(count > 0) {
            return new Response(JSON.stringify({message: "Habito eliminado"}),{
                status: 201,
                headers: {"Content-type": "application/json"}
            })
        }
    }
    return new Response(JSON.stringify({message: "Error"}),{
        status: 502,
        headers: {"Content-type": "application/json"}
    })
}