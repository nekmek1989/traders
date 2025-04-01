import React, {FC} from 'react';

interface IChannelCard {
    header: 'Spot' | 'Futures'
    components?: IChannel
    error?: boolean
    onClick?: () => void
}

export interface IChannel {
    avatar: string | '/src/assets/icons/default-user.png'
    createdAt: number
    id: string
    name: string
    price: string
    rating: number
    revenue: number
    risk: 1 | 2 | 3
    stock: string
    subscribers: string
    type: string
    userId: string
}

const ChannelCard: FC<IChannelCard> = ({header, components, error, onClick}) => {
    return (
        <article className='channel-card'>
            <h3 className='channel-card__header'>
                {header}
            </h3>
            {components
                ? <div className='channel-card__body'>
                    <div className="channel-card__title">
                        <div className='channel-card__author'>
                            <div className="channel-card__image-wrapper">
                                <img src={components?.avatar}/>
                            </div>
                            <h3 className='channel-card__name'>
                                {components?.name}
                            </h3>
                        </div>
                        <div className='channel-card__buttons'>
                            <button>

                            </button>
                            <button>

                            </button>
                        </div>
                    </div>
                    <ul className="channel-card__info">
                        <li className="channel-card__item">
                            <p className='size-small'>Биржа</p>
                            {components?.stock}
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>Уровень риска</p>
                            {components?.risk === 1
                                ? <p className='channel-card__rist-1'>Низкий</p>
                                : components?.risk === 2
                                    ? <p className='channel-card__rist-2'>Средний</p>
                                    : <p className='channel-card__rist-3'>Высокий</p>
                            }
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>Доходность канала</p>
                            {'+' + components?.revenue.toString() + '%'}
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>Место в рейтинге</p>
                            {components?.rating.toString() + '/100'}
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>Подписчиков</p>
                            {components?.subscribers}
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>Стоимость подписки</p>
                            {'$ ' + components?.price.toString()}
                        </li>
                    </ul>
                    <div className='channel-card__extra'>
                        <p>Дата создания: {components?.createdAt}</p>
                    </div>
                 </div>
                : <button
                    className='channel-card__create-channel'
                    onClick={onClick}
                  >
                    <img src={'/src/assets/icons/Plus.svg'}/>

                  </button>
            }
        </article>
    );
};

export default ChannelCard;