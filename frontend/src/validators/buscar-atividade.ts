import { z } from "zod";

export const buscarAtividadeSchema = z.object({
  nomeAtividade: z.string(),
});
