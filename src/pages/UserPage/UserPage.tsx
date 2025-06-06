import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import Metric from "../../components/Metric/Metric.tsx";
import {randomInt} from "../../utils/randomInt.ts";
import {useFetch} from "../../hooks/useFetch/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import ChannelCard from "../../components/Channel/ChannelCard/ChannelCard.tsx";
import {IChannel} from "../../components/Channel/ChannelCard/types";
import {RootState, store} from "../../store/store.ts";
import {useForm} from "react-hook-form";
import {balanceForm} from "./types";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {addMoney, removeMoney} from "../../store/userReducer.ts";
import {useChangeUser} from "../../hooks/useChangeUser/useChangeUser.ts";
import Subscribers from '/src/assets/icons/Subscribers.svg'
import Money from '/src/assets/icons/Money.svg'

const UserPage = (): React.ReactNode => {
    const user = useSelector((state: RootState) => state.user)
    const section = useSelector((state: RootState) => state.section)
    const [message, setMessage] = useState<string>()
    const [channels, setChannels] = useState<IChannel[] | []>([])
    const isValidAvatar = user.avatar && !user.avatar.includes('/src/')
    const revenue = useMemo<number>(() => randomInt(user.money), [user.money])
    const {
        handleSubmit: handleAddBalanceSubmit,
        register: registerAddBalance,
        formState: { errors: addBalanceErrors },
        resetField: resetAddBalanceField,
    } = useForm<balanceForm>({ mode: 'onBlur',  defaultValues: {balance: null}})

    const {
        handleSubmit: handleWithdrawBalanceSubmit,
        register: registerWithdrawBalance,
        formState: { errors: withdrawBalanceErrors },
        resetField: resetRemoveBalanceField,
    } = useForm<balanceForm>({ mode: 'onBlur',  defaultValues: {balance: null}})

    const error = useChangeUser(user.money)


    const [fetchChannels] = useFetch(
        async () => {
            const response = await Fetch.getChannelByUserId(user.id)

            if (response) {
                const filteredResponse: IChannel[] = response.data.filter(
                    (channel: IChannel) => channel.userId === user.id
                )
                setChannels(filteredResponse)
            }
            return
        }
    )

    const addBalance = (data: balanceForm) => {
        if (data.balance) store.dispatch(addMoney(data.balance))

        resetAddBalanceField('balance')
        setMessage('Баланс успешно изменен')
    }

    const withdrawBalance = (data: balanceForm) => {
        if (data.balance) store.dispatch(removeMoney(data.balance))

        resetRemoveBalanceField('balance')
        setMessage('Баланс успешно изменен')
    }

    const validateWithdraw = (money: number | null) => {
        if (money)
            if (money < 0) {
                return 'Только положительные числа!'
            } else if (money > user.money) {
                return 'Недостаточно средств'
            } else {
                return true
            }
    }


    useEffect(() => {
        fetchChannels()
    }, [user.id]);

    return (
        <section className='user-page'>
            <div className="user-page__header">
                <div className="user-page__title">
                    <div className="user-page__image-wrapper">
                        <img src={isValidAvatar ? user.avatar : '/images/default-user.png'} className="user-page__image" alt={''}/>
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
                            svg={<img src={Subscribers} alt={''}/>}
                        />
                    </li>

                    <li className="user-page__item">
                        <Metric
                            title={'Общая прибыль'}
                            count={'$ '+  revenue.toFixed(1).toString().substring(0, 4)}
                            svg={<img src={Money} alt={''}/>}
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
                <div className={'user-page__balance'}>
                    <div className={'user-page__forms'}>
                        <form className={'user-page__form'} onSubmit={handleAddBalanceSubmit(addBalance)}>
                            <h4 className={'user-page__title'}>
                                Пополнить баланс
                            </h4>
                            <Input
                                type={'number'}
                                placeholder='Сумма'
                                errors={addBalanceErrors.balance}
                                className='user-page__field'
                                {...registerAddBalance('balance',
                                    {
                                            required: 'Введите сумму для пополнения',
                                            pattern: {
                                                value: /^(0|[1-9][0-9]*)$/,
                                                message: 'Только положительные числа!'
                                            },
                                            validate: value => value as number <= 0 ? 'Только положительные числа!' : true,
                                            valueAsNumber: true as any,
                                        }
                                )}
                            />
                            {addBalanceErrors?.balance &&
                                <p className='user-page__error'>
                                    {addBalanceErrors.balance?.message as string || 'Error'}
                                </p>
                            }
                            <Button type={'submit'} className={'user-page__button'}>
                                Пополнить баланс
                            </Button>
                        </form>
                        <form className={'user-page__form'} onSubmit={handleWithdrawBalanceSubmit(withdrawBalance)}>
                        <h4 className={'user-page__title'}>
                            Вывести баланс
                        </h4>
                        <Input
                            type={'number'}
                            placeholder='Сумма'
                            errors={withdrawBalanceErrors.balance}
                            className='user-page__field'
                            {...registerWithdrawBalance('balance',
                                {
                                    required: 'Введите сумму для вывода',
                                    pattern: {
                                        value: /^(0|[1-9][0-9]*)$/,
                                        message: 'Только положительные числа!'
                                    },
                                    validate: money => validateWithdraw(money),
                                    valueAsNumber: true as any,
                                }
                            )}
                        />
                        {withdrawBalanceErrors?.balance &&
                            <p className='user-page__error'>
                                {withdrawBalanceErrors.balance?.message as string || 'Error'}
                            </p>
                        }
                        <Button type={'submit'} className={'user-page__button'}>
                            Вывести баланс
                        </Button>
                    </form>
                    </div>
                    {message &&
                        <p className={''}>
                            {message}
                        </p>
                    }
                    {error &&
                        <p className={''}>
                            {error}
                        </p>
                    }
                </div>
            }
        </section>
    );
};

export default UserPage;