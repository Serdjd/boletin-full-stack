import { supabase } from "@/app/layout";

export async function GET() {
  const { data: articulos, error } = await supabase
    .from("articulo")
    .select("id,titulo,autor,fecha_publicacion");
  if(error) {
    return new Response(JSON.stringify(error), {
        status:500,
        headers: {"Content-type":"application/json"}
    })
  }
  return new Response(JSON.stringify(articulos), {
    status: 201,
    headers: { "Content-type": "application/json" }
  });
}

export async function POST(request) {
    const body = await request.json()

    if(body.titulo && body.contenido) {
        if(body.titulo.length <= 150) {
            const {data, error} = await supabase
            .from("articulo")
            .insert(body)

            if(error) {
                return new Response(JSON.stringify(error), {
                    status:500,
                    headers: {"Content-type":"application/json"}
                })
            }
            return new Response(JSON.stringify({"message":"Articulo añadido correctamente"}), {
                status: 201,
                headers: { "Content-type": "application/json" }
            });
        }
    }
    return new Response(JSON.stringify({"message":"El usuario no se ha podido agregar"}), {
        status:501,
        headers: {"Content-type":"application/json"}
    })
}

export async function DELETE(request) {
    const body = await request.json()

    const {data, error} = await supabase
        .from("articulo")
        .delete()
        .eq("id",+body.id)

    if(error) {
        return new Response(JSON.stringify(error), {
            status:500,
            headers: {"Content-type":"application/json"}
        })
    }
    return new Response(JSON.stringify({"message":"Articulo eliminado correctamente"}), {
        status: 201,
        headers: { "Content-type": "application/json" }
    });
}