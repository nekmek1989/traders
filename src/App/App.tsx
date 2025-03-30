import {BrowserRouter} from "react-router";
import {useEffect, useState} from "react";
import Fetch from "../API/fetch.ts";
import { AuthContext } from "../context/Context.ts";
import AppRouter from "../components/AppRouter/AppRouter.tsx";
import {useFetch} from "../hooks/useFetch.ts";
import Loader from "../components/Loader/Loader.tsx";
import Error from "../pages/Error.tsx";
import {store} from "../store/store.ts";
import {recordUser} from "../store/userReducer.ts";


export interface IAuth {
    email: string
    password: string
}


function App() {

    const [isUserAuth, setIsUserAuth] = useState<boolean>(false)

    const [fetch, error, isLoading] = useFetch(
        async () => {
            const isAuthInLocalStorage: IAuth | null = JSON.parse(localStorage.getItem('auth') as string)

            if (!isAuthInLocalStorage) return false

            const response = await Fetch.getUserByEmail(isAuthInLocalStorage.email)

            const isAuth: boolean = response.data.find(user => {
                if ( user.password === isAuthInLocalStorage.password &&
                    user.email === isAuthInLocalStorage.email ) return true
            })

            if (!isAuth) {
                localStorage.removeItem('auth')
                return
            }

            store.dispatch(recordUser(response.data))
            setIsUserAuth(true)
        }
    )

    useEffect((): void => {
        fetch()
    }, []);

    if (isLoading) return ( <Loader /> )
    if (error) return ( <Error/> )

    return (
    <div className='app'>
        <AuthContext.Provider value={{isUserAuth, setIsUserAuth}}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    </div>
  )
}

export default App
