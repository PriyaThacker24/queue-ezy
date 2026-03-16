const ADMIN_CREDENTIALS_KEY = "queueezy.admin.credentials";
const ADMIN_SESSION_KEY = "queueezy.admin.session";

export function getRegisteredAdmin() {
  try {
    const raw = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const { phoneNumber, password } = parsed;
    if (typeof phoneNumber !== "string" || typeof password !== "string") return null;
    return { phoneNumber, password };
  } catch {
    return null;
  }
}

export function registerAdmin({ phoneNumber, password }) {
  localStorage.setItem(
    ADMIN_CREDENTIALS_KEY,
    JSON.stringify({ phoneNumber: String(phoneNumber), password: String(password) })
  );
}

export function loginAdmin({ phoneNumber, password }) {
  const existing = getRegisteredAdmin();
  if (!existing) return { ok: false, reason: "NO_ACCOUNT" };
  if (existing.phoneNumber !== String(phoneNumber) || existing.password !== String(password)) {
    return { ok: false, reason: "INVALID_CREDENTIALS" };
  }
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ phoneNumber: existing.phoneNumber }));
  return { ok: true };
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function getAdminSession() {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.phoneNumber !== "string") return null;
    return { phoneNumber: parsed.phoneNumber };
  } catch {
    return null;
  }
}

export function isAdminAuthed() {
  return Boolean(getAdminSession());
}

