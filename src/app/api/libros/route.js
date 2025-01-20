import { supabase } from "@/app/layout";

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const filter = searchParams.get("filter")
    const {data,error} = await getQuery(filter)
    if(error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {"Content-type" : "application/json"}
        })
    }

    return new Response(JSON.stringify(data), {
        status: 201,
        headers: {"Content-type" : "application/json"}
    })
}
async function getQuery(filter) {
    let query = supabase
        .from("libro")
        .select("*")
    switch(filter) {
        case "leidos":
            query = query.eq("leido",true)
            break
        case "no-leidos":
            query = query.eq("leido",false)
            break
    }
    return await query
}
export async function DELETE(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")

    const {data,error} = await supabase
    .from("libro")
    .delete()
    .eq("id",id)

    if(error) {
        return new Response(JSON.stringify(error) ,{
            status: 500,
            headers: {"Content-type" : "application/json"}
        })
    }

    return new Response(JSON.stringify({message: "Libro eliminado"}), {
        status: 200,
        headers: {"Content-type": "application/json"}
    })
}

export async function POST(request) {
    const body = await request.json()

    if(body.titulo && body.autor) {
        const {data,error} = await supabase
        .from("libro")
        .insert(body)

        if(error) {
            return new Response(JSON.stringify(error), {
                status: 500,
                headers: {"Content-type": "application/json"}
            })
        }

        return new Response(JSON.stringify({message: "Libro añadido"}),{
            status: 201,
            headers: {"Content-type": "application/json"}
        })
    }
}

export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const body = await request.json()

    const {data,error} = await supabase
    .from("libro")
    .update(body)
    .eq("id",id)

    if(error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {"Content-type": "application/json"}
        })
    }

    return new Response(JSON.stringify({message: "Estado del libro actualizado"}), {
        status: 201,
        headers: {"Content-type": "application/json"}
    })
}