export const setAdminSession = (username: string) => {
  // Now handled in AdminLogin directly after api call
};

export const getAdminSession = () => {
  try {
    const raw = localStorage.getItem("adminInfo");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const isAdminAuthed = () => {
  return !!localStorage.getItem("adminToken");
};

export const clearAdminSession = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminInfo");
};
