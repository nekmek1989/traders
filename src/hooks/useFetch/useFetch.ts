import {useState} from "react";

export const useFetch: hookFetch =
    ( callback ) => {
        const [isLoading, setIsLoading] = useState(false)
        const [error, setError] = useState('')

        const fetch: FetchFunction = async (data) => {
            try {
                setIsLoading(true)

                if (data) {
                    await callback(data)
                } else {
                    await callback()
                }
            } catch (e: any) {
                setError(e.message)
            } finally {
                setIsLoading(false)
            }
        }

        return [fetch, error, isLoading]
}