import { useEffect, useState } from "react";

interface Payload {
  status: Status;
  data: Usuario | null;
  login: (email: string, senha: string) => void;
}

enum Status {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

/**
 * Hook que retorna o estado da sessão do usuário.
 * @function
 * @returns {Payload} Retorna um objeto contendo o status da sessão e os dados do usuário.
 */
export const useSession = (): Payload => {
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [data, setData] = useState<Usuario | null>(null);

  const login = async (email: string, senha: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.status === 200) {
      const { data } = await response.json();
      setData(data);
      setStatus(Status.AUTHENTICATED);
    }
  };

  useEffect(() => {
    (async () => {
      setStatus(Status.LOADING);
      try {
        const response = await fetch("/api/auth/cookies");

        if (response.status === 200) {
          const { data } = await response.json();
          setData(data);
          setStatus(Status.AUTHENTICATED);
        }
      } catch (error) {
        setStatus(Status.UNAUTHENTICATED);
      }
    })();
  }, []);

  return { status, data, login };
};
