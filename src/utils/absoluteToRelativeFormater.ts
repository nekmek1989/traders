export const absoluteToRelativeFormater = (data: number[]): number[] => {
    const formatedArray: number[] = []

    if (data.length > 1) {
        const firstElement = data[0]
        const secondElement = data[1]

        const newArray = data.slice(-data.length + 1)

        const percentageSecondElement = secondElement * 100 / firstElement - 100

        return formatedArray.concat(percentageSecondElement, absoluteToRelativeFormater(newArray))
    } else {
        return formatedArray
    }
}