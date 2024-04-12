import { z } from "zod";

export const criarContaSchema = z
  .object({
    nomeCompleto: z
      .string()
      .min(3, {
        message: "Nome inválido!",
      })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Nome inválido!",
      }),
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
    confirmarSenha: z.string().min(3, {
      message: "Senha inválida!",
    }),
  })
  .refine((data) => data.senha !== data.confirmarSenha, {
    message: "As senhas não coincidem!",
    path: ["confirmarSenha"],
  });
