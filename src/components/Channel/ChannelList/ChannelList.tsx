import React from 'react';
import {Props} from "./types";
import ChannelItem from "./ChannelItem/ChannelItem.tsx";

const ChannelList = (props: Props): React.ReactNode => {
    const {channels} = props
    return (
        <div className={'channels-list'}>
            <ul className={'channels-list__header hidden-mobile'}>
                <li className="channels-list__header-item">Название</li>
                <li className="channels-list__header-item">Биржа</li>
                <li className="channels-list__header-item">Уровень риска</li>
                <li className="channels-list__header-item">Доходность за месяц</li>
                <li className="channels-list__header-item">Место в рейтинге</li>
                <li className="channels-list__header-item">Подписчики</li>
                <li className="channels-list__header-item">Цена подписки</li>
                <li className="channels-list__header-item"></li>
            </ul>
            {channels &&
                channels.map(channel =>
                    <ChannelItem channel={channel} classname={'channel__item'} key={channel.id}/>
                )
            }
        </div>
    );
};

export default ChannelList;