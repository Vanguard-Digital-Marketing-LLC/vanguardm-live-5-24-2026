/**
 * Linear-time email validation. The character classes never overlap with the
 * `.` separator, so there is exactly one way to tokenize any input — no
 * catastrophic/polynomial backtracking on adversarial strings.
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
