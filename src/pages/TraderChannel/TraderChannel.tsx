import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import {IChannel} from "../../components/Channel/ChannelCard/types";
import Fetch from "../../API/fetch.ts";
import Loader from "../../components/Loader/Loader.tsx";
import Button from "../../components/Button/Button.tsx";
import ChannelMain from "../../components/Channel/ChannelMain/ChannelMain.tsx";
import TabsCollection from "../../components/TabsCollection/TabsCollection.tsx";
import {ITabs} from "../../components/TabsCollection/Tabs/Tab.tsx";
import {randomInt} from "../../utils/randomInt.ts";
import {useModal} from "../../hooks/useModal.ts";
import Modal from "../../components/Modal/Modal.tsx";
import {useSelector} from "react-redux";
import {RootState, store} from "../../store/store.ts";
import {removeMoney} from "../../store/userReducer.ts";

const TraderChannel = (): React.ReactNode => {
    const [channel, setChannel] = useState<IChannel>()
    const params = useParams()
    const selectDateRangeTabs: ITabs[] = [
        {className: 'is-active', children: 'Сегодня', onClick: (event) => selectRange(event)},
        {children: '7 дней', onClick: (event) => selectRange(event)},
        {children: '30 дней', onClick: (event) => selectRange(event)},
        {children: '100 дней', onClick: (event) => selectRange(event)}
    ]
    const [selectedDate, setSelectedDate] = useState<string>('Сегодня')
    const randomRevenue = useMemo(() => randomInt(100), [selectedDate])
    const [isModal, openModal, closeModal] = useModal()
    const [isMoneyAmount, setIsMoneyAmount] = useState(false)
    const user = useSelector((state: RootState) => state.user)

    const [fetch, error, isLoading] = useFetch(
        async () => {
            if (params.id) {
                const response = await Fetch.getChannelById(params.id)

                if (response) setChannel(response.data)
            }
        }
    )

    const [fetchUser] = useFetch(
        async () => {
            await Fetch.changeUser(user)
        }
    )

    const selectRange = (event?: MouseEvent) => {
        console.dir(event?.target)
        setSelectedDate(event?.target?.innerText)
    }

    const showModal = () => {
        if (channel)

        setIsMoneyAmount(user.money > channel.price)
        openModal()
    }

    const connectChannel = () => {
        if (channel && user.money > channel.price)
            store.dispatch(removeMoney(channel.price))
    }


    useEffect(() => {
        fetch()
    }, []);

    useEffect(() => {
        fetchUser()
    }, [user.money]);

    return (
        <section className={'trader-channel'}>
            {!isLoading &&
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
                                children={'Подключить трейдера'}
                                onClick={showModal}
                                small
                            />
                        </div>
                    </div>
                </div>
            }
            {isModal && channel &&
                <Modal onClose={closeModal}>
                    <div className={'trader-channel__modal'}>
                        { isMoneyAmount &&
                            <>
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