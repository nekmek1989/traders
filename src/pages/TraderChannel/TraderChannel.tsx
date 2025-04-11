import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import {IChannel} from "../../components/Channel/ChannelCard/types";
import Fetch from "../../API/fetch.ts";
import Loader from "../../components/Loader/Loader.tsx";
import Button from "../../components/Button/Button.tsx";
import ChannelMain from "../../components/Channel/ChannelMain/ChannelMain.tsx";
import TabsCollection from "../../components/TabsCollection/TabsCollection.tsx";
import {ITabs} from "../../components/TabsCollection/Tabs/types";
import {randomInt} from "../../utils/randomInt.ts";
import {useModal} from "../../hooks/useModal.ts";
import Modal from "../../components/Modal/Modal.tsx";
import {useSelector} from "react-redux";
import {RootState, store} from "../../store/store.ts";
import {removeMoney, subscribe, unSubscribe} from "../../store/userReducer.ts";
import {selectBalance} from "../../store/sectionReducer.ts";
import FetchMarketData from "../../API/fetchMarket.ts";

const TraderChannel = (): React.ReactNode => {
    const [channel, setChannel] = useState<IChannel>()
    const params = useParams()
    const selectDateRangeTabs: ITabs[] = [
        {className: 'is-active', children: 'Сегодня', value: '24h', onClick: (event: React.MouseEvent<HTMLElement>) => selectRange(event)},
        {children: '7 дней', value: '1w', onClick: (event: React.MouseEvent<HTMLElement>) => selectRange(event)},
        {children: '30 дней', value: '1m', onClick: (event: React.MouseEvent<HTMLElement>) => selectRange(event)},
        {children: '100 дней', value: '3m', onClick: (event: React.MouseEvent<HTMLElement>) => selectRange(event)}
    ]
    const [selectedDate, setSelectedDate] = useState<string>('Сегодня')
    const randomRevenue = useMemo(() => randomInt(100), [selectedDate])
    const [isModal, openModal, closeModal] = useModal()
    const [isMoneyAmount, setIsMoneyAmount] = useState(false)
    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const [isUserSubscribe, setIsUserSubscribe] = useState<boolean>(false)
    const [chartData, setChartData] = useState<[]>([])

    const [fetch, error, isLoading] = useFetch(
        async () => {
            if (params.id) {
                const response = await Fetch.getChannelById(params.id)

                if (response)
                    setChannel(response.data)
            }
        }
    )

    const [fetchUser] = useFetch(
        async () => {
            await Fetch.changeUser(user)
            closeModal()
        }
    )

    const [fetchChart, e, isChartLoading] = useFetch(
        async (data) => {
            const response = await FetchMarketData.getCoinMarketData(data)
            response.data.forEach(step => {
                step[0] = new Date(step[0] * 1000)
            })
            if (response)
                setChartData(response.data)
                console.log(response.data)
        }
    )

    const selectRange = (event?: React.MouseEvent<HTMLElement>) => {
        if (event) {
            const target = event.target as HTMLElement
            setSelectedDate(target.innerText)
            fetchChart(target.value)
        }
    }

    const showModal = () => {
        if (channel)
        setIsMoneyAmount(user.money > channel.price)

        openModal()
    }

    const connectChannel = () => {
        if (channel && user.money > channel.price) {
            store.dispatch(removeMoney(channel.price))
            store.dispatch(subscribe(channel))
        }
    }

    const unConnectChannel = () => {
        if (channel) {
            setIsUserSubscribe(false)
            store.dispatch(unSubscribe(channel))
        }
    }

    const isUserSub = (): boolean => {
        if (channel) {
            const isSubscribe = user.subscriptions.find(subChannel =>
                subChannel.id === channel.id
            )

            return !!isSubscribe
        }

        return false
    }


    useEffect(() => {
        fetch()
        fetchChart()
    }, []);

    useEffect(() => {
        setIsUserSubscribe(isUserSub())
    }, [channel]);

    useEffect(() => {
        fetchUser()
        setIsUserSubscribe(isUserSub())
    }, [user.money, user.subscriptions]);

    return (
        <section className={'trader-channel'}>
            {!isLoading &&
                <>
                    <div className={'trader-channel__header'}>
                    <div className={'trader-channel__header-title'}>
                        {channel &&
                            <ChannelMain
                                className={'trader-channel__channel'}
                                channel={channel}
                            />
                        }
                    </div>
                    <div className={'trader-channel__header-extra'}>
                        <TabsCollection
                            tabs={selectDateRangeTabs}
                            className={'trader-channel__tabs'}
                            alt
                        />

                        <div className={'trader-channel__info'}>
                            <div className={'trader-channel__banner'}>
                            Доход за {selectedDate}: {randomRevenue.toFixed(1)}%
                            </div>
                            <Button
                                className={'trader-channel__button'}
                                children={ isUserSubscribe ? 'Отписаться' : 'Подключить трейдера'}
                                onClick={isUserSubscribe ? unConnectChannel : showModal}
                                small
                            />
                        </div>
                    </div>
                </div>
                    <div className={'trader-channel__body'}>
                        {/*{chartData && !isChartLoading &&*/}
                        {/*    chartData.map(element => <p>{element[0].getDay()}</p>)}*/}
                    </div>
                </>
            }
            {isModal && channel &&
                <Modal onClose={closeModal}>
                    <div className={'trader-channel__modal'}>
                        { isMoneyAmount
                            ?<>
                                <h4 className={'trader-channel__modal-header'}>Подключение трейдера</h4>
                                <div className={'trader-channel__modal-body'}>
                                    <div className={'trader-channel__modal-title'}>
                                        <div className={'trader-channel__modal-name'}>
                                            <div className="channel-main__image-wrapper">
                                                <img className={'channel-main__image'} src={channel.avatar} alt={''}/>
                                            </div>
                                            <p className={'channel-main__name'}>
                                                {channel.name}
                                            </p>
                                        </div>
                                        <ul className={'trader-channel__modal-list'}>
                                            <li className="trader-channel__modal-item">
                                                <p className={'trader-channel__modal-label'}>
                                                    Спот / Фьючерсы
                                                </p>
                                                <p className={'trader-channel__modal-description'}>
                                                    {channel.type}
                                                </p>
                                            </li>
                                            <li className="trader-channel__modal-item">
                                                <p className={'trader-channel__modal-label'}>
                                                    Цена
                                                </p>
                                                <p className={'trader-channel__modal-description'}>
                                                    $ {channel.price}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <Button
                                        className={'trader-channel__modal-button'}
                                        onClick={connectChannel}
                                    >
                                        Подключить трейдера
                                    </Button>
                                </div>
                            </>
                            :   <div className={'trader-channel__modal-error-wrapper'}>
                                    <h4 className={'trader-channel__modal-error'}>
                                        Вам необходимо пополнить баланс на сумму
                                    </h4>
                                    <h3 className={'trader-channel__modal-error'}>
                                        $ {channel.price - user.money}
                                    </h3>
                                    <p className={'trader-channel__modal-error'}>
                                        Подписка на трейдера {channel.name}: {channel.price - 20}$
                                    </p>
                                    <p className={'trader-channel__modal-error'}>
                                        Услуга копирования сделок: 20$
                                    </p>
                                    <Button className={'trader-channel__button'} children={'Пополнить баланс'} onClick={() => {
                                        store.dispatch(selectBalance())
                                        navigate('/name')
                                    }} />
                                </div>
                        }
                    </div>
                </Modal>
            }
            {isLoading &&
                <Loader />
            }
            {error &&
                <p>{error}</p>
            }
        </section>
    );
};

export default TraderChannel;