import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router";
import Button from "../Button/Button.tsx";
import IconDropDownButton from "../IconDropDownButton/IconDropDownButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectEn, selectRu} from "../../store/languageReducer.ts";
import {AuthContext} from "../../context/Context.ts";
import {selectBalance, selectSettings} from "../../store/sectionReducer.ts";

const Header = () => {
    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {setIsUserAuth} = useContext(AuthContext)
    const languageOptions = [
        <Button alt smallest onClick={()=>dispatch(selectRu())} children='RU' key={'RU'}/>,
        <Button alt smallest onClick={()=>dispatch(selectEn())} children='EN' key={'EN'}/>
    ]

    const logOut = () => {
        setIsUserAuth(false)
        localStorage.removeItem('auth')
    }

    const userMenu = [
        <button
            className='header__user-button'
            onClick={() => {
                dispatch(selectBalance())
                navigate('/name')
            }}
            key={'balance'}
        >
            Управление балансом
        </button>,

        <button
            className='header__user-button'
            onClick={() => navigate('/settings')}
            key={'settings'}
        >
            Настройки
        </button>,

        <button
            className='header__user-button'
            onClick={logOut}
            key={'logOut'}
        >
            Выйти
        </button>
    ]

    return (
        <header className='header'>
            <div className='header__inner container'>
                <Link to={'/login'} className='logo'>
                    <img src='/src/assets/images/Logo.svg' alt=''/>
                </Link>
                <div className='header__components'>
                    {userData.accountType === 'Пассивный заработок'
                        || userData.accountType === 'Публичный трейдинг'
                            ? <Button alt smallest className='header__account-type hidden-mobile'>
                                {userData.accountType}
                              </Button>
                            : null
                    }
                    <div className="header__money-amount">
                        <img src='/src/assets/icons/Wallet.svg'/>
                        $ {userData.money}
                    </div>
                    <IconDropDownButton
                        className='header__select-language'
                        elements={languageOptions}
                    >
                        RU
                    </IconDropDownButton>
                    <IconDropDownButton
                        className='header__user'
                        elements={userMenu}
                    >
                        <img src='/src/assets/icons/Profile.svg'/>
                    </IconDropDownButton>
                </div>
            </div>
        </header>
    );
};

export default Header;