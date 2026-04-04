const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

type ApiOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
};

export const apiRequest = async <T>(
  path: string,
  { method = "GET", body, token }: ApiOptions = {}
): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Request failed");
  }

  return res.json() as Promise<T>;
};

export { API_BASE_URL };
