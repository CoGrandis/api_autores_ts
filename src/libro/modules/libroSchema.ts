import z from "zod";
const routeParamsSchema= z.object({
  id: z.coerce.number({error:"Debe ingresar un numero entero"})
});

const bodyParamsSchema = z.object({
  titulo: z.string().min(1, "El titulo que ingrese debe contener mas de 1 caracter"),
  autor:z.string().min(1, "El titulo que ingrese debe contener mas de 1 caracter"),
  categoriaId: z.coerce.number({error:"El id de categoria debe ser un numero entero"})
});

const queryParamsSchema= z.object({
  page: z.coerce.number({error:"Debe ingresar un numero entero"}).int().optional(),
});

export {routeParamsSchema, bodyParamsSchema, queryParamsSchema}
