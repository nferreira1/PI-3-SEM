import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

/**
 * Hook que retorna o estado da sessão do usuário no lado do cliente.
 * @see {@link AuthContext}
 * @function
 * @returns {AuthContext} Retorna um objeto contendo o status da sessão e os dados do usuário.
 */
export const useSession = (): AuthContext => useContext(AuthContext);
