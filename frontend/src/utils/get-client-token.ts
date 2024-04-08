export async function getClientToken() {
  try {
    const response = await fetch("/api/auth/cookies", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const { token } = data;
      return token;
    }
  } catch (error) {
    return null;
  }

  return null;
}
