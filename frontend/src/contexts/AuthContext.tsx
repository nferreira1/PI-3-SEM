"use client";

import { formatarFrase } from "@/utils/formatar-frase";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

enum Status {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

export interface AuthContext {
  data: Usuario | null;
  status: Status;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * @description
 * Contexto de autenticação que gerencia o estado da sessão do usuário.
 * @constant
 * @type {React.Context<AuthContext>}
 * @see {@link AuthContext}
 * @see {@link Status}
 * @see {@link Usuario}
 * @see {@link createContext}
 */
export const AuthContext: React.Context<AuthContext> =
  createContext<AuthContext>({
    status: Status.LOADING,
    data: null,
    login: async () => {},
    logout: async () => {},
  });

/**
 * Provedor de autenticação que gerencia o estado da sessão do usuário.
 * @function
 * @param {React.ReactNode} children Componentes filhos.
 * @returns {React.ReactNode} Retorna os componentes filhos.
 */
export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [data, setData] = useState<Usuario | null>(null);

  /**
   * Função que realiza a autenticação do usuário.
   * @see {@link AuthContext}
   * @function
   * @param {string} email E-mail do usuário.
   * @param {string} senha Senha do usuário.
   * @returns {Promise<void>} Retorna uma promessa vazia.
   */
  const login = async (email: string, senha: string): Promise<void> => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.status === 200) {
      const { data } = await response.json();
      setData({
        id: data.id,
        nome: formatarFrase(data.nome),
        email: data.email,
        imagem: data.imagem,
      });
      setStatus(Status.AUTHENTICATED);
    }

    return router.replace("/");
  };

  /**
   * Função que realiza o logout do usuário.
   * @see {@link AuthContext}
   * @function
   * @returns {Promise<void>} Retorna uma promessa vazia.
   */
  const logout = async (): Promise<void> => {
    const response = await fetch("/api/auth");

    if (response.status === 200) {
      setData(null);
      setStatus(Status.UNAUTHENTICATED);
    }

    return router.replace("/");
  };

  useEffect(() => {
    (async () => {
      setStatus(Status.LOADING);
      try {
        const response = await fetch("/api/auth/cookies");

        if (response.status === 200) {
          const { data } = await response.json();
          setData({
            id: data.id,
            nome: formatarFrase(data.nome),
            email: data.email,
            imagem: data.imagem,
          });
          setStatus(Status.AUTHENTICATED);
        }
      } catch (error) {
        setStatus(Status.UNAUTHENTICATED);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ data, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
