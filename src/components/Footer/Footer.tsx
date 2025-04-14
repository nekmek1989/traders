import React from 'react';
import {Link} from "react-router";
import telegramIcon from '/src/assets/icons/telegram.png'
import Logo from '/src/assets/images/Logo.svg'

const Footer = (): React.ReactNode => {
    return (
        <footer className='footer container'>
            <Link to={''} className='footer__link'>
                <img src={telegramIcon} alt='' className='footer__icon'/>
            </Link>
            <div className='footer__inner'>
                <div className='footer__title'>
                    <Link to={'/login'} className='logo'>
                        <img src={Logo} alt=''/>
                    </Link>
                    <p className='footer__description size-small'>
                        криптовалютная платформа для управления инвестициями.
                    </p>
                </div>
                <div className='footer__body'>
                    <ul className='footer__list'>
                        <li className='footer__item'>
                            <Link to={'/#'} >Пассивный заработок</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to={'/#'} >Публичный трейдинг</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to={'/#'} >Доходы и безопасность</Link>
                        </li>
                        <li className='footer__item'>
                            <Link to={'/#'} >Обратная связь</Link>
                        </li>
                    </ul>
                    <Link to={'/#'} className='footer__policy'>
                        Политика конфиденциальности
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;