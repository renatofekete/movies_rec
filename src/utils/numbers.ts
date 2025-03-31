export function fixedNumber(num: number = 0, fixed: number = 0): number {
    return Number(num.toFixed(fixed));
}

export function randomNumber(num: number = 0): number {
    return Math.floor(Math.random() * num);
}
