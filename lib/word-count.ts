/**
 * Count words in markdown/HTML content. Tags are stripped repeatedly until the
 * string stabilizes — a single pass is bypassable (e.g. `<<b>b>`), so the loop
 * guarantees complete removal before counting.
 */
export function countWords(input: string): number {
  let text = input;
  let prev: string;
  do {
    prev = text;
    text = text.replace(/<[^>]*>/g, "");
  } while (text !== prev);
  return text.split(/\s+/).filter(Boolean).length;
}
