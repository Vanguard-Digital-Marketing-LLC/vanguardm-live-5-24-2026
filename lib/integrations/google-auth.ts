import { google } from "googleapis";

let cachedToken: { token: string; expiresAt: number } | null = null;

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_API_CLIENT_ID,
    process.env.GOOGLE_API_CLIENT_SECRET
  );
}

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const oauth2 = getOAuth2Client();
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_API_REFRESH_TOKEN });

  const { credentials } = await oauth2.refreshAccessToken();
  const token = credentials.access_token!;
  // Cache for 58 minutes (tokens last 60 min)
  cachedToken = { token, expiresAt: Date.now() + 58 * 60 * 1000 };
  return token;
}

export function getAuthenticatedClient() {
  const oauth2 = getOAuth2Client();
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_API_REFRESH_TOKEN });
  return oauth2;
}
