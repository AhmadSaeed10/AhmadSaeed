const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2022-12" -> "Dec 2022" */
export function formatYearMonth(value: string): string {
  if (value === 'present') return 'present';
  const [y, m] = value.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatRange(start: string, end: string): string {
  return `${formatYearMonth(start)} to ${formatYearMonth(end)}`;
}

export function isTodo(value?: string): boolean {
  return !value || value.trim().toUpperCase().startsWith('TODO');
}

export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** "2026-06-18" -> "18 June 2026" (British order). */
export function formatDate(value: string): string {
  const [y, m, d] = value.split('-').map(Number);
  const full = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d} ${full[m - 1]} ${y}`;
}
