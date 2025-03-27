//@ts-ignore
import React, {useContext} from 'react';
import {Route, Routes} from "react-router";
import Login from "../../pages/UnAuth/Login.tsx";
import Register from "../../pages/UnAuth/Register.tsx";
import {AuthContext} from "../../context/Context.ts";
import Loader from "../Loader/Loader.tsx";
import Error from "../../pages/Error.tsx";

const AppRouter = () => {
    //@ts-ignore
    const {isUserAuth, isLoading, error} = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <Error />
    }

    return (
        isUserAuth
            ? null
            :<div className='app-router__not-registered'>
                <Routes>
                    <Route path={'/register'} element={<Register />} />
                    <Route path={'/login'} element={<Login />} />
                </Routes>
             </div>
    );
};

export default AppRouter;