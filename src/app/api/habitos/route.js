import { supabase } from "@/app/layout";

export async function GET() {
    const {data,error} = await supabase
    .from("habito")
    .select("*")
    .eq("fecha",new Date().toLocaleDateString('en-CA'))
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
    let date = body.fecha.split('/')
    const fecha = new Date(date[2], date[1] - 1, date[0])
    if(fecha >= new Date() && body.nombre) {
        body.fecha = fecha.toLocaleDateString('en-CA')
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
        status: 500,
        headers: {"Content-type": "application/json"}
    })
}

export async function DELETE(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")

    if(id) {
        const {data,error,count} = await supabase
        .from("habito")
        .delete()
        .eq("id",id)
        .eq("completado",true)

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
        status: 500,
        headers: {"Content-type": "application/json"}
    })
}