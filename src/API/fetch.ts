import axios from "axios";

export interface IUser {
    email: string
    password: string
    accountType: string
}


export default class Fetch {
    static async getAllUsers() {
        const response = await axios
            .get('https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/users')

        return response
    }

    static async postUser(user: IUser) {
        const response = await axios
            .post('https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/users',
                {
                    headers: {'content-type':'application/json'},
                    email: user.email,
                    password: user.password,
                    accountType: user.accountType
                }
            )

        return response
    }
}