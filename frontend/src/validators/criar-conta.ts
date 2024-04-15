import { z } from "zod";

export const criarContaSchema = z
  .object({
    nomeCompleto: z
      .string()
      .regex(
        /^[a-zA-ZÀ-ÿ]+(?:['\.\- ][a-zA-ZÀ-ÿ]+)* [a-zA-ZÀ-ÿ]+(?:['\.\- ][a-zA-ZÀ-ÿ]+)*$/,
        {
          message: "O nome deve conter pelo menos um sobrenome.",
        }
      ),
    email: z.string().email("E-mail inválido!"),
    senha: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,21}$/,
        {
          message:
            "A senha deve conter no mínimo 8 caracteres e no máximo 20 caracteres, incluindo pelo menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial.",
        }
      ),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem!",
    path: ["confirmarSenha"],
  })
  .refine(
    (data) => {
      const nomePartes = data.nomeCompleto.toLowerCase().split(/\s+/);
      const senhaLower = data.senha.toLowerCase();
      return !nomePartes.some(
        (parte) => senhaLower.includes(parte) && parte.length > 1
      );
    },
    {
      message: "A senha não deve conter partes do seu nome.",
      path: ["senha"],
    }
  );
