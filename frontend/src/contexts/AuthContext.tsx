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
  criarConta: (data: {
    nome: string;
    email: string;
    senha: string;
    imagem?: string;
  }) => Promise<Response>;
  login: (data: { email: string; senha: string }) => Promise<Status>;
  logout: () => Promise<Status>;
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
    criarConta: async () => new Promise<Response>(() => {}),
    login: async () => Status.UNAUTHENTICATED,
    logout: async () => Status.UNAUTHENTICATED,
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
   * Função que cria um novo usuário.
   * @see {@link AuthContext}
   * @function
   * @param {Object} data Dados do usuário.
   * @returns {Promise<Response>} Retorna uma promessa vazia.
   */
  const criarConta = async (data: {
    nome: string;
    email: string;
    senha: string;
    imagem?: string;
  }): Promise<Response> => {
    const response = await fetch("/api/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  };

  /**
   * Função que realiza a autenticação do usuário.
   * @see {@link AuthContext}
   * @function
   * @param {Object} data Dados do usuário.
   * @returns {Promise<Status>} Retorna o status da autenticação.
   */
  const login = async (data: {
    email: string;
    senha: string;
  }): Promise<Status> => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const { data } = await response.json();
      setData({
        id: data.id,
        nome: formatarFrase(data.nome),
        email: data.email,
        imagem: data.imagem,
      });
      setStatus(Status.AUTHENTICATED);
      router.refresh();
      return Status.AUTHENTICATED;
    }

    return Status.UNAUTHENTICATED;
  };

  /**
   * Função que realiza o logout do usuário.
   * @see {@link AuthContext}
   * @function
   * @returns {Promise<Status>} Retorna uma promessa vazia.
   */
  const logout = async (): Promise<Status> => {
    const response = await fetch("/api/auth");

    if (response.ok) {
      setData(null);
      setStatus(Status.UNAUTHENTICATED);
      router.refresh();
      return Status.UNAUTHENTICATED;
    }

    return Status.AUTHENTICATED;
  };

  useEffect(() => {
    (async () => {
      setStatus(Status.LOADING);
      try {
        const response = await fetch("/api/auth/cookies");

        if (response.ok) {
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

  useEffect(() => {
    if (status === Status.UNAUTHENTICATED) {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <AuthContext.Provider value={{ data, status, criarConta, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
