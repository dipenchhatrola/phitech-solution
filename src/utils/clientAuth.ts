const CLIENT_SESSION_KEY = "clientSession";

export type ClientSession = {
  clientCode: string;
  token: string;
  expiresAt: number;
};

export const setClientSession = (session: ClientSession) => {
  sessionStorage.setItem(CLIENT_SESSION_KEY, JSON.stringify(session));
};

export const getClientSession = (): ClientSession | null => {
  const raw = sessionStorage.getItem(CLIENT_SESSION_KEY);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as ClientSession;
    if (!session.expiresAt || session.expiresAt < Date.now()) {
      sessionStorage.removeItem(CLIENT_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    sessionStorage.removeItem(CLIENT_SESSION_KEY);
    return null;
  }
};

export const clearClientSession = () => {
  sessionStorage.removeItem(CLIENT_SESSION_KEY);
};
