import React from 'react';
import {Props} from "./types";

const ChannelMain = (props: Props): React.ReactNode => {
    const {channel, className} = props
    const { avatar, name, revenue, subscribes, price, risk, stock, rating } = channel
    const isValidAvatar = avatar && !avatar.includes('/src/')

    return (
        <article className={`channel-main ${className}`}>
            <div className={`channel-main__header`}>
                <div className="channel-main__image-wrapper">
                    <img className={'channel-main__image'} src={isValidAvatar ? avatar : '/images/default-user.png'} alt={''}/>
                </div>
                <p className={'channel-main__name'}>
                    {name}
                </p>
            </div>
            <ul className="channel-main__list">
                <li className="channel-main__item">
                    <p className={'channel-main__label'}>Биржа</p>
                    <p className={'channel-main__description'}>{stock}</p>
                </li>
                <li className="channel-main__item">
                    <p className={'channel-main__label'}>Уровень риска</p>
                    {risk === 'Низкий'
                        ? <p className='channel-main__risk-1'>Низкий</p>
                        : risk === 'Средний'
                            ? <p className='channel-main__risk-2'>Средний</p>
                            : <p className='channel-main__risk-3'>Высокий</p>
                    }
                </li>
                <li className="channel-main__item">
                    <p className={'channel-main__label'}>Доходность за месяц</p>
                    <p className={'channel-main__description'}>{revenue}</p>
                </li>
                <li className="channel-main__item">
                    <p className={'channel-main__label'}>Место в рейтинге</p>
                    <p className={'channel-main__description'}>{rating} / 100</p>
                </li>
                <li className="channel-main__item">
                    <p className={'channel-main__label'}>Подписчики</p>
                    <p className={'channel-main__description'}>{subscribes}</p>
                </li>
                <li className="channel-main__item">
                    <p className={'channel-main__label'}>Цена подписки</p>
                    <p className={'channel-main__description'}>$ {price}</p>
                </li>
            </ul>
        </article>
    );
};

export default ChannelMain;