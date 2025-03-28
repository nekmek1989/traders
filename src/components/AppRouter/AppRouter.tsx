//@ts-ignore
import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router";
import Login from "../../pages/UnAuth/Login.tsx";
import Register from "../../pages/UnAuth/Register.tsx";
import {AuthContext} from "../../context/Context.ts";
import Loader from "../Loader/Loader.tsx";
import Error from "../../pages/Error.tsx";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

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
            :<>
                <div className='app-router__not-registered'>
                    <div className='app-router__not-registered-ui-bubble-wrapper'>
                        <span className="app-router__not-registered-ui-bubble"></span>
                        <span className="app-router__not-registered-ui-bubble hidden-mobile"></span>
                        <span className="app-router__not-registered-ui-bubble"></span>
                    </div>
                    <Header />
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