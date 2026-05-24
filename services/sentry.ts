import * as Sentry from "@sentry/nextjs";

/**
 * Capture an exception in Sentry with optional extra context
 */
export function logError(error: unknown, context?: Record<string, unknown>) {
  console.error(error); // Always log to console as well

  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Capture a custom message in Sentry
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}
