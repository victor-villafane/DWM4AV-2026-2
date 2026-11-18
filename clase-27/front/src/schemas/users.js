import { z } from "zod"

export const usersRegisterSchema = z.object({
  _id: z.string().optional(),
  name: z.string("El campo nombre es obligatorio").min(3, "El nombre debe tener como minimo 3 caracteres"),
  username: z.string("El campo username es obligatorio").min(3, "El username debe tener como minimo 3 caracteres"),
  email: z.email("El campo es obligario y debe ser un email"),
  rol: z.enum(["user", "admin", "superadmin"]).default("user"),
  password: z.string("El campo es obligatorio")
    .min(8, "La contraseña debe tener como minimo 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
    .regex(/[a-z]/, "La contraseña debe tener al menos una minuscula")
    .regex(/[0-9]/, "La contraseña debe tener al menos un numero")
    .regex(/[@_#$%&/()=]/, "La contraseña debe tener al menos un simbolo @_#$%&/()="),
  passwordConfirm: z.string("El campo confirmar contraseña es obligatorio")
}, "Objeto invalido")
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });

export const usersLoginSchema = z.object({
  email: z.email("El campo es obligario y debe ser un email"),
  password: z.string("El campo es obligatorio")
    .min(8, "La contraseña debe tener como minimo 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
    .regex(/[a-z]/, "La contraseña debe tener al menos una minuscula")
    .regex(/[0-9]/, "La contraseña debe tener al menos un numero")
    .regex(/[@_#$%&/()=]/, "La contraseña debe tener al menos un simbolo @_#$%&/()="),
})