import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from "react-router";
import {useDispatch} from "react-redux";
import {selectMain} from "../../store/sectionReducer.ts";

const Aside = () => {
    const searchParams: string = useLocation().pathname
    const [currentLocation, setCurrentLocation] = useState<string>('')
    const dispatch = useDispatch()
    const navMenu = useRef(null)
    const path = {
        name: '/name',
        traders: '/traders',
        statistics: '/statistics',
        instructions: '/instructions',
        help: '/help'
    }

    const onLinkClick = () => {
        dispatch(selectMain())
    }

    const scroll = () => {

        if (document.documentElement.clientWidth < 767) return

        const {current} = navMenu
        const coordinateY = document.documentElement.getBoundingClientRect().y

        current.style.marginTop = `${-coordinateY}px`
    }

    document.addEventListener('scroll', scroll)

    useEffect(() => {
        setCurrentLocation(searchParams)
    }, [searchParams]);

    return (
        <aside className='aside'>
            <nav className='aside__nav' ref={navMenu}>
                <ul className='aside__list'>
                    <li className="aside__item">
                        <Link
                            to={path.name}
                            className={path.name === currentLocation ? 'aside__link is-active' : 'aside__link'}
                            onClick={onLinkClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="27"
                                fill="none"
                                viewBox="0 0 28 27"
                            >
                                <g
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                >
                                    <path d="M13.993 20.236v-3.383"></path>
                                    <g>
                                        <path
                                            fillRule="evenodd"
                                            d="M22.253 5.107a4.07 4.07 0 0 1 4.066 4.08v4.587c-3.28 1.92-7.613 3.08-12.333 3.08s-9.04-1.16-12.32-3.08v-4.6a4.07 4.07 0 0 1 4.08-4.067z"
                                            clipRule="evenodd"
                                        ></path>
                                        <path d="M18.66 5.101v-.488a2.95 2.95 0 0 0-2.947-2.947h-3.44a2.95 2.95 0 0 0-2.947 2.947v.488"></path>
                                        <path d="m1.7 18.644.251 3.345a4.323 4.323 0 0 0 4.31 3.998h15.465a4.323 4.323 0 0 0 4.31-3.998l.251-3.345"></path>
                                    </g>
                                </g>
                            </svg>
                            <p className='hidden-mobile'>Кабинет</p>
                        </Link>
                    </li>
                    <li className="aside__item">
                        <Link
                            to={path.traders}
                            className={path.traders === currentLocation ? 'aside__link is-active' : 'aside__link'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="23"
                                fill="none"
                                viewBox="0 0 30 23"
                            >
                                <g
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                >
                                    <path d="M22.852 10.529a3.834 3.834 0 0 0 3.296-3.788A3.83 3.83 0 0 0 22.94 2.96"></path>
                                    <path d="M25.305 15c1.801.27 3.058.9 3.058 2.2 0 .895-.592 1.476-1.549 1.842"></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M14.85 15.552c-4.286 0-7.946.65-7.946 3.242s3.638 3.26 7.946 3.26c4.285 0 7.944-.642 7.944-3.237s-3.636-3.265-7.944-3.265"
                                        clipRule="evenodd"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M14.85 11.85a5.091 5.091 0 1 0 0-10.183 5.09 5.09 0 0 0-5.092 5.092 5.07 5.07 0 0 0 5.055 5.092z"
                                        clipRule="evenodd"
                                    ></path>
                                    <path d="M6.847 10.529A3.83 3.83 0 0 1 3.55 6.74 3.83 3.83 0 0 1 6.759 2.96"></path>
                                    <path d="M4.393 15c-1.802.27-3.059.9-3.059 2.2 0 .895.592 1.476 1.55 1.842"></path>
                                </g>
                            </svg>
                            <p className='hidden-mobile'>Трейдеры</p>
                        </Link>
                    </li>
                    <li className="aside__item">
                        <Link
                            to={path.statistics}
                            className={path.statistics === currentLocation ? 'aside__link is-active' : 'aside__link'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                fill="none"
                                viewBox="0 0 28 28"
                            >
                                <g
                                    fillRule="evenodd"
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    clipRule="evenodd"
                                >
                                    <path d="M21.037 16.519c.9 0 1.655.742 1.517 1.63-.807 5.227-5.281 9.108-10.678 9.108-5.97 0-10.81-4.84-10.81-10.808 0-4.918 3.737-9.5 7.943-10.535.904-.223 1.83.413 1.83 1.343 0 6.305.212 7.936 1.41 8.823 1.196.887 2.604.439 8.788.439"></path>
                                    <path d="M26.923 11.269C26.994 7.219 22.019.689 15.956.8c-.472.009-.85.402-.87.872-.153 3.33.053 7.646.168 9.603.035.609.514 1.088 1.121 1.123 2.012.115 6.485.272 9.767-.225a.926.926 0 0 0 .78-.905"></path>
                                </g>
                            </svg>
                            <p className='hidden-mobile'>Статистика</p>
                        </Link>
                    </li>
                    <li className="aside__item">
                        <Link
                            to={path.instructions}
                            className={path.instructions === currentLocation ? 'aside__link is-active' : 'aside__link'}
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="27"
                                fill="none"
                                viewBox="0 0 24 27"
                            >
                                <g
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M15.65 1.682H6.78a5.094 5.094 0 0 0-5.113 4.972v14.284a5.105 5.105 0 0 0 4.99 5.215H17.43a5.18 5.18 0 0 0 4.972-5.215V8.717z"
                                        clipRule="evenodd"
                                    ></path>
                                    <path d="M15.299 1.667v3.878a3.43 3.43 0 0 0 3.424 3.434h3.673"></path>
                                    <path d="M15.05 18.478h-7.2"></path>
                                    <path d="M12.324 13.475H7.85"></path>
                                </g>
                            </svg>
                            <p className='hidden-mobile'>Инструкции</p>
                        </Link>
                    </li>
                    <li className="aside__item">
                        <Link
                            to={path.help}
                            className={path.help === currentLocation ? 'aside__link is-active' : 'aside__link'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="none"
                                viewBox="0 0 32 32"
                            >
                                <g>
                                    <path
                                        stroke="#fff"
                                        strokeWidth="1.5"
                                        d="M20.849 20.849a6.857 6.857 0 0 1-9.698 0m9.698 0a6.857 6.857 0 0 0 0-9.698m0 9.698 3.636 3.636M11.151 20.85a6.857 6.857 0 0 1 0-9.698m0 9.698-3.636 3.636m13.334-13.334a6.857 6.857 0 0 0-9.698 0m9.698 0 3.636-3.636M11.151 11.15 7.515 7.515m16.97 16.97c-4.686 4.687-12.284 4.687-16.97 0m16.97 0c4.687-4.686 4.687-12.284 0-16.97m-16.97 16.97c-4.687-4.686-4.687-12.284 0-16.97m16.97 0c-4.686-4.687-12.284-4.687-16.97 0"
                                    ></path>
                                </g>
                            </svg>
                            <p className='hidden-mobile'>Помощь</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Aside;