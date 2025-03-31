// @ts-ignore
import React, {useState} from 'react';
import {Link, redirect} from "react-router";
import Button from "../Button/Button.tsx";
import BurgerButton from "../BurgerButton/BurgerButton.tsx";

const HeaderUnlogin = () => {

    const [modalElement, setModalElement] = useState('header-unlogin__nav hidden-tablet')

    const showOverlay = (): void => {
        document.documentElement.classList.add('is-lock')
        setModalElement('header-unlogin__nav is-active')
    }

    const quitModal = (event): void => {
        if (event.target.classList.contains('is-active')) {
            document.documentElement.classList.remove('is-lock')
            setModalElement('header-unlogin__nav hidden-tablet')
        }
    }

    return (
        <header className='header-unlogin'>
            <div className="header-unlogin__inner container">
                <Link to={'/login'} className='logo'>
                    <img src='/src/assets/images/Logo.svg' alt=''/>
                </Link>
                <nav
                    className={modalElement}
                    onClick={(event) => quitModal(event)}
                >
                    <ul className='header-unlogin__list'>
                        <li className='header-unlogin__item'>
                            <Link to={'/#'} >Пассивный заработок</Link>
                        </li>
                        <li className='header-unlogin__item'>
                            <Link to={'/#'} >Публичный трейдинг</Link>
                        </li>
                        <li className='header-unlogin__item'>
                            <Link to={'/#'} >Доходы и безопасность</Link>
                        </li>
                        <li className='header-unlogin__item'>
                            <Link to={'/#'} >Обратная связь</Link>
                        </li>
                    </ul>
                </nav>
                <BurgerButton
                    className='header-unlogin__burger-button'
                    onClick={showOverlay}
                />
            </div>
        </header>
    );
};

export default HeaderUnlogin;