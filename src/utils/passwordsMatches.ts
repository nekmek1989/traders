export const passwordsMatches =
    (password: string, repeatPassword: string): true | 'Пароли должны совпадать' => {
        if (password === repeatPassword) return true
        return 'Пароли должны совпадать'
    }