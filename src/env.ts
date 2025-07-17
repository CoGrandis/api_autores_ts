import z from "zod";

const envSchema = z.object({
    HOST: z.string(),
    PORT_DB: z.coerce.number(),
    USER: z.string(),
    PASSWORD: z.string(),
    DATABASE: z.string(),
    API_KEY: z.string(),
    PORT: z.coerce.number(),
    PAGE_SIZE: z.coerce.number(),
    DATABASE_URL: z.string(),
    PRIVATE_KEY: z.string()

})

export const env = envSchema.parse(process.env)
