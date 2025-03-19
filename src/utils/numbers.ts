export function fixedNumber(num: number, fixed: number = 0 ): number {
  return Number(num.toFixed(fixed));
}