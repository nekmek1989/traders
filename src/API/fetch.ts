import axios from "axios";
import {TFormChannel} from "../components/ChannelCard/types";
import {User} from "../store/userReducer.ts";

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

    static async getUserById(Id: string | number) {
        try {
            const response = await axios
                .get(`https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/users/${Id}`)

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

    static async changeUser(user: User) {
        try {
            const response = await axios.put(`https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/users/${user.id}`,
                {
                    ...user
                }
            )
            return response
        } catch (e) {
            return false
        }
    }



    static async getAllChannels() {
        try {
            const response = await axios.get('https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/channel')
            return response
        } catch (e) {
            return false
        }
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

    static async changeChannel(id: string | number, data: TFormChannel) {
        try {
            const response = await axios.put(
                `https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/channel/${id}`,
                {
                    id: id,
                    ...data
                }
            )
            return response
        } catch (e) {
            return false
        }
    }

    static async postChannel(userId: string | number, data: TFormChannel) {
        try {
            const response = await axios.post(
                `https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/channel`,
                {
                    headers: {'content-type':'application/json'},
                    userId: userId,
                    ...data
                }
            )
            return response
        } catch (e) {
            return false
        }
    }
}