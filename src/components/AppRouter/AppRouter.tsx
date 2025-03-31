//@ts-ignore
import React, {createContext, useContext, useState} from 'react';
import {Navigate, Route, Routes} from "react-router";
import Login from "../../pages/UnAuth/Login.tsx";
import Register from "../../pages/UnAuth/Register.tsx";
import {AuthContext} from "../../context/Context.ts";
import Loader from "../Loader/Loader.tsx";
import Error from "../../pages/Error.tsx";
import HeaderUnlogin from "../Header/HeaderUnlogin.tsx";
import Footer from "../Footer/Footer.tsx";
import Header from "../Header/Header.tsx";
import UserPage from "../../pages/UserPage.tsx";

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
            ? <>
                <div className="app-router__registered">
                    <div className='app-router__registered-inner'>
                        <Header />
                        <Routes>
                            <Route path={'/name'} element={<UserPage />} />

                            <Route path="*" element={<Navigate to="/name" replace />}/>
                        </Routes>
                    </div>
                </div>
              </>
            :<>
                <div className='app-router__not-registered'>
                    <div className='app-router__not-registered-ui-bubble-wrapper'>
                        <span className="app-router__not-registered-ui-bubble"></span>
                        <span className="app-router__not-registered-ui-bubble hidden-mobile"></span>
                        <span className="app-router__not-registered-ui-bubble"></span>
                    </div>
                    <HeaderUnlogin />
                    <div className='app-router__not-registered-body container'>
                        <Routes>
                            <Route path={'/register'} element={<Register />} />
                            <Route path={'/login'} element={<Login />} />
                            <Route path="*" element={<Navigate to="/register" replace />}/>
                        </Routes>
                    </div>
                </div>
                <Footer />
            </>
    );
};

export default AppRouter;