import z from "zod";
const routeParamsSchema= z.object({
  id: z.coerce.number({error:"Debe ingresar un numero entero"})
});

const bodyParamsSchema = z.object({
  titulo: z.string().min(1, "El titulo que ingrese debe contener mas de 1 caracter"),
  user_id: z.coerce.number({error:"El id de usuario debe ser un numero entero"}),
  categoriaId: z.coerce.number({error:"El id de categoria debe ser un numero entero"})
});

const queryParamsSchema= z.object({
  page: z.coerce.number({error:"Debe ingresar un numero entero"}).int().min(1,"Debe ingresar un número mayor a 0").optional(),
});

export {routeParamsSchema, bodyParamsSchema, queryParamsSchema}
