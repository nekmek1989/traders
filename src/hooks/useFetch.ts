import {useState} from "react";

type FetchFunction = (data?: any) => Promise<void>

export const useFetch =
    ( callback: FetchFunction ) : [FetchFunction, string, boolean] => {
        const [isLoading, setIsLoading] = useState(false)
        const [error, setError] = useState('')

        const fetch: FetchFunction = async (data?: any): Promise<void> => {
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