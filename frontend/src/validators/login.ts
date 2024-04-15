import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido!",
  }),
  senha: z.string().min(8, {
    message: "Senha inválida!",
  }),
});
