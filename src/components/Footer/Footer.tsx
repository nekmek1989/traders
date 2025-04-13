import React from 'react';
import {Link} from "react-router";

const Footer = (): React.ReactNode => {
    return (
        <footer className='footer container'>
            <Link to={'https://t.me/nikgura'} className='footer__link'>
                <img src='/src/assets/icons/telegram.png' alt='' className='footer__icon'/>
            </Link>
            <div className='footer__inner'>
                <div className='footer__title'>
                    <Link to={'/login'} className='logo'>
                        <img src='/src/assets/images/Logo.svg' alt=''/>
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