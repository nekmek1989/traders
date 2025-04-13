type FetchFunction = (...data: any) => Promise<void>

type hookFetch = (callback: FetchFunction) => [fetch: FetchFunction, error: string, isLoading: boolean]