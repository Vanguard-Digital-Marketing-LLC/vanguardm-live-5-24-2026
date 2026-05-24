import { google } from 'googleapis';

/**
 * Initialize Google API client with service account credentials.
 * Expects the following env vars:
 *   GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID
 */
export const googleClient = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL!,
    private_key: (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, '\n'),
    client_id: process.env.GOOGLE_CLIENT_ID,
    type: 'service_account',
  },
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

/** Example: fetch Google Analytics data */
export async function fetchAnalytics(viewId: string, startDate: string, endDate: string) {
  const auth = await googleClient.getClient();
  const analytics = google.analytics('v3');
  const response: any = await analytics.data.ga.get({
    auth: auth as any,
    ids: `ga:${viewId}`,
    'start-date': startDate,
    'end-date': endDate,
    metrics: 'ga:sessions',
  });
  return response.data;
}
