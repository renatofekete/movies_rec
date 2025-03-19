export function getYear(date: string): string {
  return new Date(date).getFullYear().toString();
}