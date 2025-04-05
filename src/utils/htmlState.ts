export const lockHTMLElement = (): void => {
    document.documentElement.classList.add('is-lock')
}

export const unlockHTMLElement = (): void => {
    document.documentElement.classList.remove('is-lock')
}