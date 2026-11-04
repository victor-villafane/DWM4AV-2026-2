import { z } from "zod"

export const peliculasSchema = z.object({
    title: z.string("El campo titulo es obligatorio").min(3, "El titulo debe tener al menos 3 caracteres"),
    country: z.string("El campo pais es obligatorio").min(3, "El pais debe tener como minimo 3 caracteres"),
    language: z.string("El campo idioma es obligatorio").min(3, "El idioma debe tener como minimo 3 caracteres"),
    primary_genre: z.string("El campo genero es obligatorio").min(3, "El genero debe tener como minimo 3 caracteres"),
    production_scale: z.enum(["Commercial", "Independent"], "Solo puede tener como valor Commercial o Independent"),
    year: z.number("El campo año es obligatorio y debe ser un numero").positive("El año debe ser positivo").min(1900)
}, "Objeto invalido")