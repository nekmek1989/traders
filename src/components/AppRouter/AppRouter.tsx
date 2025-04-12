import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router";
import Login from "../../pages/UnAuth/Login.tsx";
import Register from "../../pages/UnAuth/Register.tsx";
import {AuthContext} from "../../context/Context.ts";
import Loader from "../Loader/Loader.tsx";
import Error from "../../pages/Error.tsx";
import HeaderUnlogin from "../Header/HeaderUnlogin.tsx";
import Footer from "../Footer/Footer.tsx";
import Header from "../Header/Header.tsx";
import UserPage from "../../pages/UserPage/UserPage.tsx";
import Aside from "../Aside/Aside.tsx";
import Traders from "../../pages/Traders/Traders.tsx";
import Settings from "../../pages/Settings.tsx";
import TraderChannel from "../../pages/TraderChannel/TraderChannel.tsx";
import Statistics from "../../pages/Statistics/Statistics.tsx";

const AppRouter = (): React.ReactNode => {
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
                    <div className='app-router__registered-inner' id={'modal-container-id'}>
                        <Header />
                        <main className='container app-router__registered-body'>
                            <Aside />
                            <Routes>
                                <Route path={'/name'} element={<UserPage />} />
                                <Route path={'/traders'} element={<Traders />} />
                                <Route path={'/traders/:id'} element={<TraderChannel />}/>
                                <Route path={'/statistics'} element={<Statistics />}/>
                                <Route path={'/settings'} element={<Settings/>} />

                                <Route path="*" element={<Navigate to="/name" replace />}/>
                            </Routes>
                        </main>
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
                    <main className='app-router__not-registered-body container'>
                        <Routes>
                            <Route path={'/register'} element={<Register />} />
                            <Route path={'/login'} element={<Login />} />
                            <Route path="*" element={<Navigate to="/register" replace />}/>
                        </Routes>
                    </main>
                </div>
                <Footer />
            </>
    );
};

export default AppRouter;