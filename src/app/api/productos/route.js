import { supabase } from "@/app/layout";

export async function GET() {
    const {data: productos, error} = await supabase
    .from("producto")
    .select("*")
    .order("id")

    if(error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {"Content-type": "application/json"}
        })
    }
    return new Response(JSON.stringify(productos), {
        status: 201,
        headers: {"Content-type": "application/json"}
    })
}

export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const stock = +searchParams.get("stock")
    if(stock >= 0) {
        const id = +searchParams.get("id")
        const {data, error} = await supabase
        .from("producto")
        .update({stock:stock})
        .eq("id",id)

        if(error) {
            return new Response(JSON.stringify(error), {
                status: 501,
                headers: {"Content-type": "application/json"}
            })
        }

        return new Response(JSON.stringify({"message": "Producto actulizado"}),{
            status: 202,
            headers: {"Content-type": "application/json"}
        })
    }
    return new Response({
        status: 501,
        headers: {"Content-type": "application/json"}
    })
}

export async function POST(request) {
    const body = await request.json()

    if(body.nombre && body.precio) {
        if(body.precio > 0 && body.stock >= 0) {
            const {data, error} = await supabase
            .from("producto")
            .insert(body)

            if(error) {
                return new Response(JSON.stringify(error), {
                    status: 501,
                    headers: {"Content-type": "application/json"}
                })
            }

            return new Response(JSON.stringify({"message": "Producto añadido"}), {
                status: 203,
                headers: {"Content-type": "application/json"}
            })
        }
    }
    return new Response({
        status: 501,
        headers: {"Content-type": "application/json"}
    })
}