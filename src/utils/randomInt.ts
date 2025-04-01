export const randomInt = (max: number,  min: number = 0): number => {
    const randomFloat: number = Math.random()

    const normalizeInt: number = randomFloat * (max - min) + min
    return normalizeInt
}