import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: "E-mail inválido!",
    })
    .min(3)
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
  senha: z.string().min(3, {
    message: "Senha inválida!",
  }),
});
