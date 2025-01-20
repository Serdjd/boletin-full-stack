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
    
}