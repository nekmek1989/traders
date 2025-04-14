import React, {useState} from 'react';
import {Link} from "react-router";
import BurgerButton from "../BurgerButton/BurgerButton.tsx";
import {lockHTMLElement, unlockHTMLElement} from "../../utils/htmlState.ts";
import Logo from "/src/assets/images/Logo.svg";

const HeaderUnlogin = () => {

    const [modalElement, setModalElement] = useState('header-unlogin__nav hidden-tablet')

    const showOverlay = () => {
        lockHTMLElement()
        setModalElement('header-unlogin__nav is-active')
    }

    const quitModal = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement
        if (target.classList.contains('is-active')) {
            unlockHTMLElement()
            setModalElement('header-unlogin__nav hidden-tablet')
        }
    }

    return (
        <header className='header-unlogin'>
            <div className="header-unlogin__inner container">
                <Link to={'/login'} className='logo'>
                    <img src={Logo} alt=''/>
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
                    className='visible-tablet header-unlogin__burger-button'
                    onClick={showOverlay}
                />
            </div>
        </header>
    );
};

export default HeaderUnlogin;