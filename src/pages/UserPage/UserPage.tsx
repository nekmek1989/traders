//@ts-ignore
import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import {IUser} from "../../store/userReducer.ts";
import Metric from "../../components/Metric/Metric.tsx";
import {randomInt} from "../../utils/randomInt.ts";
import {ISection} from "../../store/sectionReducer.ts";
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import ChannelCard from "../../components/ChannelCard/ChannelCard.tsx";
import {IChannel} from "../../components/ChannelCard/types";


const UserPage = () => {
    const user: IUser = useSelector(state => state.user)
    const section = useSelector<ISection>(state => state.section)
    const [channels, setChannels] = useState<IChannel[] | []>([])
    const revenue = useMemo<number>(() => randomInt(user.money), [user.money])

    const [fetch] = useFetch(
        async () => {
            const response = await Fetch.getChannelByUserId(user.id)

            if (response) {
                const filteredResponse: IChannel[] = response.data.filter(
                    (channel: IChannel)=> channel.userId === user.id
                )
                setChannels(filteredResponse)
                return
            }
        }
    )


    useEffect((): void => {
        fetch()
    }, []);

    // @ts-ignore
    return (
        <div className='user-page'>
            <div className="user-page__header">
                <div className="user-page__title">
                    <div className="user-page__image-wrapper">
                        <img src={user.avatar} className="user-page__image"/>
                    </div>
                    <h3 className='user-page__name'>
                        {user.name}
                    </h3>
                </div>
                <ul className="user-page__metrics">
                    <li className="user-page__item">
                        <Metric
                            title={'Подписчиков'}
                            count={user.subscribers}
                            svg={<img src={'/src/assets/icons/Subscribers.svg'}/>}
                        />
                    </li>

                    <li className="user-page__item">
                        <Metric
                            title={'Общая прибыль'}
                            count={'$ '+  revenue.toFixed(1).toString()}
                            svg={<img src={'/src/assets/icons/Money.svg'}/>}
                        />
                    </li>
                </ul>
            </div>
            {section.section === 'main' &&
                <div className='user-page__body'>
                    <h4 className='user-page__body-title'>
                        Ваши каналы
                    </h4>
                    <div className="user-page__body-inner">
                        {channels.map(channel =>
                            <ChannelCard
                                header={ channel.type === 'Spot' || channel.type === 'Futures'
                                    ? channel.type
                                    : Math.random() > 0.5 ? 'Spot' : 'Futures'
                                }
                                components={channel}
                                channels={channels}
                                setChannels={setChannels}
                                key={channel.id}
                            />
                        )}
                        <ChannelCard header={'Spot'} channels={channels} setChannels={setChannels} />
                    </div>
                </div>
            }

            {section.section === 'balance' &&
                <div>
                    balance
                </div>
            }
        </div>
    );
};

export default UserPage;