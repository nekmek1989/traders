export const deltaValues = (data: number[]): number[] => {
    const formatedData: number[] = []

    if (data.length > 1) {
        const firstNumber = data[0]
        const secondNumber = data[1]

        const newData = data.slice(-data.length + 1)

        const delta = secondNumber - firstNumber

        return formatedData.concat(delta, deltaValues(newData))
    } else {
        return formatedData
    }
}