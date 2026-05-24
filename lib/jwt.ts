import { SignJWT, jwtVerify } from "jose";

const getSecret = () => {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET is not configured");
  return new TextEncoder().encode(secret);
};

export interface AccessTokenPayload {
  sub: string;       // user id
  email: string;
  name: string | null;
  role: "ADMIN" | "TEAM" | "USER" | "CLIENT";
  isAdmin: boolean;
}

export async function signAccessToken(payload: AccessTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .setIssuer("vanguardm.com")
    .setAudience("mobile")
    .sign(getSecret());
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(), {
    issuer: "vanguardm.com",
    audience: "mobile",
  });
  return payload as unknown as AccessTokenPayload;
}
