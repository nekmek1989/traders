import React from 'react';
import {Link} from "react-router";
import {channelItem} from "./types";

const ChannelItem = (props: channelItem): React.ReactNode => {
    const { avatar, name, revenue, subscribes, price, risk, stock, rating, id } = props.channel
    return (
        <article className={'channel-item ' + props.classname}>
            <div className={'channel-item__header'}>
                <div className="channel-item__image-wrapper">
                    <img className={'channel-item__image'} src={avatar} alt={''}/>
                </div>
                <p className={'channel-item__name'}>
                    {name}
                </p>
            </div>
            <ul className="channel-item__list">
                <li className="channel-item__item">
                    <p className={'channel-item__title visible-mobile'}>Биржа</p>
                    <p className={'channel-item__description'}>{stock}</p>
                </li>
                <li className="channel-item__item">
                    <p className={'channel-item__title visible-mobile'}>Уровень риска</p>
                    {risk === 'Низкий'
                        ? <p className='channel-item__risk-1'>Низкий</p>
                        : risk === 'Средний'
                            ? <p className='channel-item__risk-2'>Средний</p>
                            : <p className='channel-item__risk-3'>Высокий</p>
                    }
                </li>
                <li className="channel-item__item">
                    <p className={'channel-item__title visible-mobile'}>Доходность за месяц</p>
                    <p className={'channel-item__description'}>{revenue}</p>
                </li>
                <li className="channel-item__item">
                    <p className={'channel-item__title visible-mobile'}>Место в рейтинге</p>
                    <p className={'channel-item__description'}>{rating} / 100</p>
                </li>
                <li className="channel-item__item">
                    <p className={'channel-item__title visible-mobile'}>Подписчики</p>
                    <p className={'channel-item__description'}>{subscribes}</p>
                </li>
                <li className="channel-item__item">
                    <p className={'channel-item__title visible-mobile'}>Цена подписки</p>
                    <p className={'channel-item__description'}>$ {price}</p>
                </li>
            </ul>
            <Link to={`/traders/${id}`} className={'channel-item__link'}/>
        </article>
    );
};

export default ChannelItem;