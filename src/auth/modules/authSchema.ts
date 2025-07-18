import z from "zod";

const routeParamsValidator = z.object({
  id: z.coerce.number()
});

const bodyParamsSchema = z.object({
  username: z.string().min(1, "El nombre que ingrese debe contener mas de un caracter"),
  email: z.email("Correo no valido"),
  password: z.string().min(8,"La contraseña debe contener al menos 8 caracteres")
});

const queryParamsValidator = z.object({
  page: z.coerce.number().int().min(1,"Debe ingresar un número mayor a 0").optional(),
});

export {routeParamsValidator, bodyParamsSchema, queryParamsValidator}