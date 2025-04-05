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

    static async getUserByEmail(email: string) {
        try {
            const response = await axios
                .get(`https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/users?email=${email}`)

            return response
        } catch (e) {
            return false
        }
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

    static async getChannelByUserId(userId: string | number) {
        try{
            const response = await axios.get(`https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/channel?userId=${userId}`)

            return response
        } catch (e) {
            return false
        }

    }

    static async deleteChannel(id: string | number) {
        try {
            const response = await axios.put(
                `https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/channel/${id}`,
                { title: "Deleted",
                    avatar: '',
                    createdAt: '',
                    id: '',
                    name: '',
                    price: '',
                    rating: '',
                    revenue: '',
                    risk: '',
                    stock: '',
                    subscribes: '',
                    type: '',
                    userId: '',
                }
            );
            return response
        } catch (e) {
            return false
        }
    }
}