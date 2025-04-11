import axios from "axios";


export default class FetchMarketData {
    static async getCoinMarketData (period: '24h' | '1w' | '1m' | '3m' = '24h') {
        try {
            const response = await axios.get(
                `https://openapiv1.coinstats.app/coins/bitcoin/charts?period=${period}`,
                    {
                        headers: {'X-API-KEY': 'demo-api-key'}
                    }
                )
            return response
        } catch (e) {
            return false
        }
    }
}