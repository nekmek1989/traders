import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router";
import Button from "../Button/Button.tsx";
import IconDropDownButton from "../IconDropDownButton/IconDropDownButton.tsx";
import {useSelector} from "react-redux";
import {selectEn, selectRu} from "../../store/languageReducer.ts";
import {AuthContext} from "../../context/Context.ts";
import {selectBalance} from "../../store/sectionReducer.ts";
import {RootState, store} from "../../store/store.ts";
import Logo from "/src/assets/images/Logo.svg";
import WalletIcon from '/src/assets/icons/Wallet.svg'
import ProfileIcon from '/src/assets/icons/Profile.svg'

const Header = (): React.ReactNode => {
    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const {setIsUserAuth} = useContext(AuthContext)
    const languageOptions = [
        <Button alt smallest onClick={()=> store.dispatch(selectRu())} children='RU' key={'RU'}/>,
        <Button alt smallest onClick={()=> store.dispatch(selectEn())} children='EN' key={'EN'}/>
    ]

    const logOut = () => {
        setIsUserAuth(false)
        localStorage.removeItem('auth')
    }

    const userMenu = [
        <button
            className='header__user-button'
            onClick={() => {
                store.dispatch(selectBalance())
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
                    <img src={Logo} alt=''/>
                </Link>
                <div className='header__components'>
                    {user.accountType === 'Пассивный заработок' || user.accountType === 'Публичный трейдинг'
                            ? <Button alt smallest className='header__account-type hidden-mobile'>
                                {user.accountType}
                              </Button>
                            : null
                    }
                    <div className="header__money-amount">
                        <img src={WalletIcon} alt={''}/>
                        $ {user.money}
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
                        <img src={ProfileIcon} alt={''}/>
                    </IconDropDownButton>
                </div>
            </div>
        </header>
    );
};

export default Header;