//@ts-ignore
import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import {IUser} from "../../store/userReducer.ts";
import Metric from "../../components/Metric/Metric.tsx";
import {randomInt} from "../../utils/randomInt.ts";
import {ISection} from "../../store/sectionReducer.ts";
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import ChannelCard, {IChannel} from "../../components/ChannelCard/ChannelCard.tsx";
import Modal from "../../components/Modal/Modal.tsx";
import {lockHTMLElement, unlockHTMLElement} from "../../utils/htmlState.ts";
import {useForm} from "react-hook-form";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import Select from "../../components/Select/Select.tsx";
import Tooltip from "../../components/Tooltip/Tooltip.tsx";

const UserPage = () => {
    //@ts-ignore
    const user: IUser = useSelector(state => state.user)
    //@ts-ignore
    const section: ISection = useSelector(state => state.section)
    const [channels, setChannels] = useState<IChannel[] | []>([])
    const [isModal, setIsModal] = useState<boolean>(false)
    const revenue = useMemo<number>(() => randomInt(user.money), [user.money])
    const {
        handleSubmit,
        register,
        formState: {
            errors
        }
    } = useForm({mode: 'onBlur'})
    const optionStock = [ 'Binance', 'Bybit', '1488', 'Mexc']
    const optionRist = [ 'Низкий', "Средний", "Высокий"]


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

    const showModal = (): void => {
        lockHTMLElement()
        setIsModal(true)
    }

    const closeModal = () => {
        unlockHTMLElement()
        setIsModal(false)
    }

    const createChannel = (event) => {
        console.log(event)
    }

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
                                changeChannel={showModal}
                                key={channel.id}
                            />
                        )}
                        <ChannelCard header={'Spot'} changeChannel={showModal}/>
                        {isModal &&
                            <Modal onClose={closeModal} >
                                <div className='user-page__modal'>
                                    <h4 className='user-page__modal-title'>
                                        СОЗДАНИЕ FUTURES КАНАЛА
                                    </h4>
                                    <form
                                        className='user-page__form'
                                        onSubmit={handleSubmit(createChannel)}
                                    >
                                        <label htmlFor={'photo'} className={'user-page__field-wrapper'}>
                                            <Input
                                                type={'file'}
                                                placeholder='Название канала'
                                                className='user-page__field'
                                                uploadFile
                                                {...register('photo')}
                                            />
                                            <p>Загрузить аватар канала</p>
                                        </label>

                                        <Input
                                            type={'text'}
                                            placeholder='Название канала'
                                            className='user-page__field'
                                            {...register('channelName', {
                                                required: 'Введите название канала',
                                                minLength: {
                                                    value: 4,
                                                    message: 'Название канала должно быть не меньше 4 символов'
                                                }
                                            })}
                                        />
                                        {errors?.channelName &&
                                            <p className='user-page__error'>
                                                {errors.channelName?.message || 'Error'}
                                            </p>
                                        }
                                        <Select
                                            className={'user-page__field'}
                                            options={optionStock}
                                            {...register('stock', {
                                                    validate: value => value === '---' ? 'Выберите биржу' : true
                                            })}
                                        />
                                        {errors?.stock &&
                                            <p className='user-page__error'>
                                                {errors.stock?.message || 'Error'}
                                            </p>
                                        }
                                        <Select
                                            className={'user-page__field'}
                                            options={optionRist}
                                            {...register('risk', {
                                                validate: value => value === '---' ? 'Выберите уровень риска' : true
                                            })}
                                        />
                                        {errors?.risk &&
                                            <p className='user-page__error'>
                                                {errors.risk?.message || 'Error'}
                                            </p>
                                        }
                                        <label className={'user-page__field-wrapper'}>
                                            <Input
                                                type={'text'}
                                                placeholder='Стоимость подписки (от 50$)'
                                                className='user-page__field'
                                                {...register('price', {
                                                    required: 'Введите стоимость подписки'
                                                })}
                                            />
                                            <Tooltip children={'Комиссия сервиса 10%'} className={'user-page__tooltip'}/>
                                        </label>
                                        {errors?.price &&
                                            <p className='user-page__error'>
                                                {errors.price?.message || 'Error'}
                                            </p>
                                        }



                                        <Button
                                            className={'user-page__button'}
                                            type={'submit'}
                                        >
                                            Создать канал
                                        </Button>
                                    </form>
                                </div>
                            </Modal>
                        }
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