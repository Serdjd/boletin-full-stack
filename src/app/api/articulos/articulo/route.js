import { supabase } from "@/app/layout"

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const id = +searchParams.get("id")
    const {data: articulo, error} = await supabase
        .from("articulo")
        .select("*")
        .eq("id",id)
        .single()
    
    if(error) {
        return new Response(JSON.stringify(error), {
            status:500,
            headers: {"Content-type":"application/json"}
        })
    }

    return new Response(JSON.stringify(articulo), {
        status: 201,
        headers: {"Content-type":"application/json"}
    })
}