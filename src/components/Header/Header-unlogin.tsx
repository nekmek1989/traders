// @ts-ignore
import React, {useState} from 'react';
import {Link, redirect} from "react-router";
import Button from "../Button/Button.tsx";
import BurgerButton from "../BurgerButton/BurgerButton.tsx";

const Header = () => {

    const [modalElement, setModalElement] = useState('header__nav hidden-tablet')

    const showOverlay = (): void => {
        document.documentElement.classList.add('is-lock')
        setModalElement('header__nav is-active')
    }

    const quitModal = (event): void => {
        if (event.target.classList.contains('is-active')) {
            document.documentElement.classList.remove('is-lock')
            setModalElement('header__nav hidden-tablet')
        }
    }

    return (
        <header className='header'>
            <div className="header__inner container">
                <Link to={'/login'} className='logo'>
                    <img src='/src/assets/images/Logo.svg' alt=''/>
                </Link>
                <nav
                    className={modalElement}
                    onClick={(event) => quitModal(event)}
                >
                    <ul className='header__list'>
                        <li className='header__item'>
                            <Link to={'/#'} >Пассивный заработок</Link>
                        </li>
                        <li className='header__item'>
                            <Link to={'/#'} >Публичный трейдинг</Link>
                        </li>
                        <li className='header__item'>
                            <Link to={'/#'} >Доходы и безопасность</Link>
                        </li>
                        <li className='header__item'>
                            <Link to={'/#'} >Обратная связь</Link>
                        </li>
                    </ul>
                </nav>
                <BurgerButton
                    className='header__burger-button'
                    onClick={showOverlay}
                />
            </div>
        </header>
    );
};

export default Header;