import {BrowserRouter} from "react-router";
import Header from "../components/Header/Header.tsx";
import {useEffect, useState} from "react";
import Fetch from "../API/fetch.ts";
import { AuthContext } from "../context/Context.ts";
import AppRouter from "../components/AppRouter/AppRouter.tsx";
import {useFetch} from "../hooks/useFetch.ts";


export interface IAuth {
    email: string
    password: string
}


function App() {

    const [isUserAuth, setIsUserAuth] = useState(false)

    const [fetch, error, isLoading] = useFetch(
        async () => {
            const isAuthInLocalStorage: IAuth | null = JSON.parse(localStorage.getItem('auth') as string)

            if (!isAuthInLocalStorage) return false

            const response = await Fetch.getAllUsers()

            const isAuth =  response.data.find(user => {
                return user.password === isAuthInLocalStorage.password &&
                    user.email === isAuthInLocalStorage.email
            })

            if (!isAuth) {
                localStorage.removeItem('auth')
                return
            }

            setIsUserAuth(true)
        }
    )

    useEffect((): void => {
        fetch()
    }, []);

    return (
    <div className='app'>
        <AuthContext.Provider value={{isUserAuth, setIsUserAuth, isLoading, error}}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    </div>
  )
}

export default App
