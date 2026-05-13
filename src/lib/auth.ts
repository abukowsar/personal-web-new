import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };
}

export function validateAdminLogin(email: string, password: string) {
  const admin = getAdminCredentials();

  return Boolean(
    admin.email &&
      admin.password &&
      email.trim().toLowerCase() === admin.email.toLowerCase() &&
      password === admin.password
  );
}

export function createSessionValue(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ email, createdAt: Date.now() })
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export async function setAdminSession(email: string) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, createSessionValue(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  const admin = getAdminCredentials();

  if (!session || !admin.email || !getSessionSecret()) {
    return false;
  }

  const [payload, signature] = session.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = sign(payload);
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  ) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString());
    return parsed.email === admin.email;
  } catch {
    return false;
  }
}
