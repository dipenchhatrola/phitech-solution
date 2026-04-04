const ADMIN_SESSION_KEY = "adminSession";
const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

type AdminSession = {
  username: string;
  token: string;
  expiresAt: number;
};

const generateToken = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `adm_${Math.random().toString(36).slice(2)}`;
};

export const setAdminSession = (username: string) => {
  const session: AdminSession = {
    username,
    token: generateToken(),
    expiresAt: Date.now() + ADMIN_SESSION_TTL_MS,
  };
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

export const getAdminSession = (): AdminSession | null => {
  const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AdminSession;
    if (!session.expiresAt || session.expiresAt < Date.now()) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
};

export const isAdminAuthed = () => getAdminSession() !== null;

export const clearAdminSession = () => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
};
