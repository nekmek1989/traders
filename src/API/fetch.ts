import axios from "axios";


export default class Fetch {
    static async getAllUsers() {
        const response = await axios
            .get('https://67e3b0492ae442db76d11fd1.mockapi.io/test/1/users')

        return response
    }
}