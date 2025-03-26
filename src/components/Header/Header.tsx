// @ts-ignore
import React from 'react';
import {Link} from "react-router";
import Button from "../Button/Button.tsx";

const Header = () => {
    return (
        <header className='header'>
            <div className="header__inner container">
                <Link to={'/login'} className='logo'>
                    <img src='/src/assets/images/Logo.svg' alt=''/>
                </Link>

                <nav className='header__nav'>
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
                        <li className='header__item'>
                            <Button children={'Вход'} className={'button__size-s'}/>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;