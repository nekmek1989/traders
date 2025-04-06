import React, {useState} from 'react';
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import {Link} from "react-router";
import Modal from "../Modal/Modal.tsx";
import Input from "../Input/Input.tsx";
import Select from "../Select/Select.tsx";
import Tooltip from "../Tooltip/Tooltip.tsx";
import Button from "../Button/Button.tsx";
import {lockHTMLElement, unlockHTMLElement} from "../../utils/htmlState.ts";
import {useForm} from "react-hook-form";
import {TChannelCard, TFormChannel} from "./types";


const ChannelCard = (props: TChannelCard): React.ReactNode => {
    const {header, components, error, channels, setChannels} = props

    const [isModal, setIsModal] = useState(false)
    const {
        handleSubmit,
        register,
        formState: {
            errors
        }
    } = useForm({mode: 'onBlur'})
    const optionStock = [ 'Binance', 'Bybit', '1488', 'Mexc']
    const optionRisk = [ 'Низкий', "Средний", "Высокий"]

    const [fetch] = useFetch(
        async () => {
            if (components && setChannels && channels) {
                await Fetch.deleteChannel(components?.id)

                setChannels([...channels].filter(
                    (channel) => channel.id !== components?.id)
                )
            }
        }
    )

    const deleteChannel = (): void => {
        fetch()
    }


    const showModal = (): void => {
        lockHTMLElement()
        setIsModal(true)
    }

    const closeModal = (): void => {
        unlockHTMLElement()
        setIsModal(false)
    }

    const createChannel = async (data: TFormChannel, event: SubmitEvent) => {
        console.log( event, data)
    }

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
                            <button
                                className='channel-card__button-icon'
                                onClick={deleteChannel}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="18"
                                    fill="none"
                                    viewBox="0 0 16 18"
                                >
                                    <g
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        opacity="0.4"
                                    >
                                        <path d="M14.103 6.89s-.452 5.613-.715 7.977c-.125 1.129-.822 1.79-1.965 1.811-2.174.04-4.35.042-6.524-.004-1.1-.022-1.785-.692-1.907-1.801-.265-2.385-.715-7.983-.715-7.983M15.257 4.2H1.125M12.534 4.2a1.37 1.37 0 0 1-1.346-1.104l-.203-1.013a1.066 1.066 0 0 0-1.03-.79H6.426c-.483 0-.906.323-1.031.79l-.203 1.013A1.37 1.37 0 0 1 3.848 4.2"></path>
                                    </g>
                                </svg>
                            </button>
                            <button
                                className='channel-card__button-icon'
                                onClick={showModal}
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <g id="Iconly/Light/Edit" opacity="0.4">
                                    <g
                                        id="Edit"
                                        stroke="#85859C"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                    >
                                        <path id="Stroke 1" d="M11.457 17.036h6.044"></path>
                                        <path
                                            id="Stroke 3"
                                            fillRule="evenodd"
                                            d="M10.65 3.162a1.87 1.87 0 0 1 2.597-.252l1.444 1.122a1.785 1.785 0 0 1 .6 2.487c-.028.045-7.948 9.951-7.948 9.951a1.42 1.42 0 0 1-1.09.528l-3.033.038-.684-2.892c-.095-.407 0-.834.264-1.163z"
                                            clipRule="evenodd"
                                        ></path>
                                        <path id="Stroke 5" d="m9.184 5 4.543 3.49"></path>
                                    </g>
                                </g>
                            </svg>
                            </button>
                        </div>
                    </div>
                    <ul className="channel-card__info">
                        <li className="channel-card__item">
                            <p className='size-small'>БИРЖА</p>
                            {components?.stock}
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>УРОВЕНЬ РИСКА</p>
                            {components?.risk === 1
                                ? <p className='channel-card__risk-1'>Низкий</p>
                                : components?.risk === 2
                                    ? <p className='channel-card__risk-2'>Средний</p>
                                    : <p className='channel-card__risk-3'>Высокий</p>
                            }
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>ДОХОДНОСТЬ КАНАЛА</p>
                            {'+' + components?.revenue.toString() + '%'}
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>Место в рейтинге</p>
                            {components?.rating.toString() + ' / 100'}
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>ПОДПИСЧИКОВ</p>
                            {components?.subscribes}
                        </li>
                        <li className="channel-card__item">
                            <p className='size-small'>СТОИМОСТЬ ПОДПИСКИ</p>
                            {'$ ' + components?.price.toString()}
                        </li>
                    </ul>
                    <div className='channel-card__extra'>
                        <p>Дата создания: <br/> {components?.createdAt.slice(0, 10)}</p>
                        <Link to={'/instructions'} className='channel-card__link'>
                            Cтраница канала
                        </Link>
                    </div>
                 </div>
                : <div className='channel-card__create-channel'>
                    <button
                        className='channel-card__create-button'
                        onClick={showModal}
                      >
                        <img src={'/src/assets/icons/Plus.svg'} className='channel-card__create-image'/>
                        Создать канал
                    </button>
                    <Link to={'/instructions'} className='channel-card__link'>
                        Инструкция по подключению
                    </Link>
                   </div>
            }
            {isModal &&
                <Modal onClose={closeModal} >
                    <div className='channel-card__modal'>
                        {components
                            ? <h4 className='channel-card__modal-title'>
                                ИЗМИНЕНИЕ {components.type.toUpperCase()} КАНАЛА
                              </h4>
                            : <h4 className='channel-card__modal-title'>
                                СОЗДАНИЕ FUTURES КАНАЛА
                              </h4>
                        }
                        <form
                            className='channel-card__form'
                            onSubmit={handleSubmit(createChannel)}
                        >
                            <label htmlFor={'photo'} className={'channel-card__field-wrapper'}>
                                <img src={'/src/assets/images/uploadPhoto.png'}/>
                                <Input
                                    type={'file'}
                                    placeholder='Название канала'
                                    className='channel-card__field'
                                    uploadFile
                                    {...register('photo')}
                                    id={'photo'}
                                />
                                <p>Загрузить аватар канала</p>
                            </label>

                            <Input
                                type={'text'}
                                placeholder='Название канала'
                                className='channel-card__field'
                                {...register('channelName', {
                                    required: 'Введите название канала',
                                    minLength: {
                                        value: 4,
                                        message: 'Название канала должно быть не меньше 4 символов'
                                    }
                                })}
                            />
                            {errors?.channelName &&
                                <p className='channel-card__error'>
                                    {errors.channelName?.message || 'Error'}
                                </p>
                            }
                            <Select
                                className={'channel-card__field'}
                                options={optionStock}
                                {...register('stock', {
                                    validate: value => value === '---' ? 'Выберите биржу' : true
                                })}
                            />
                            {errors?.stock &&
                                <p className='channel-card__error'>
                                    {errors.stock?.message || 'Error'}
                                </p>
                            }
                            <Select
                                className={'channel-card__field'}
                                options={optionRisk}
                                {...register('risk', {
                                    validate: value => value === '---' ? 'Выберите уровень риска' : true
                                })}
                            />
                            {errors?.risk &&
                                <p className='channel-card__error'>
                                    {errors.risk?.message || 'Error'}
                                </p>
                            }
                            <label className={'channel-card__field-wrapper'} htmlFor={'price'}>
                                <Input
                                    type={'number'}
                                    placeholder='Стоимость подписки (от 50$)'
                                    className='channel-card__field'
                                    {...register('price', {
                                        required: 'Введите стоимость подписки',
                                        pattern: {
                                            value: /^(0|[1-9][0-9]*)$/,
                                            message: 'Только положительные числа!'
                                        },
                                        maxLength: {
                                            value: 4,
                                            message: 'Стоимость подписки может быть не больше 9999$'
                                        }
                                    })}
                                    id={'price'}
                                />
                                <Tooltip children={'Комиссия сервиса 10%'} className={'channel-card__tooltip'}/>
                            </label>
                            {errors?.price &&
                                <p className='channel-card__error'>
                                    {errors.price?.message || 'Error'}
                                </p>
                            }

                            <Button
                                className={'channel-card__button'}
                                type={'submit'}
                            >
                                Создать канал
                            </Button>
                        </form>
                    </div>
                </Modal>
            }
            {error &&
                <p>Что-то пошло не так :(</p>
            }
        </article>
    );
};

export default ChannelCard;