import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import TextAria from "../../components/TextAria/TextAria.tsx";

const Help = (): React.ReactNode => {
    const [message, setMessage] = useState<string | null>(null)
    const {
        handleSubmit,
        register,
        reset,
        formState: {
            errors
        }
    } = useForm<form>({mode: 'onBlur'})

    const onSubmit = () => {
        reset()
        setMessage('Мы свяжемся с вами в ближайшее время')
    }

    return (
        <section className={'help'}>
            <h2 className={'help__title'}>
                Обратная связь
            </h2>
            <p className={'help__description'}>
                Если у вас остались вопросы напишите нам и наши менеджеры свяжутся с вами как можно быстрее
            </p>
            <form className={'help__form'} onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor={'name'} className={'help__label'}>
                    <Input
                        type={'text'}
                        placeholder={'Ваше имя'}
                        errors={errors.name}
                        {...register('name', {
                            required: 'Введите имя',
                            pattern: {
                                value: /^[a-zа-я]+$/i,
                                message: 'Только буквы',
                            }
                        })}
                    />
                    {errors?.name &&
                        <p className={'help__error'}>
                            {errors.name.message}
                        </p>
                    }
                </label>
                <label htmlFor={'email'} className={'help__label'}>
                    <Input
                        type={'email'}
                        placeholder={'Ваш email'}
                        errors={errors.email}
                        {...register('email', {
                            required: 'Введите Почту',
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Введите корректную почту',
                            }
                        })}
                    />
                    {errors?.email &&
                        <p className={'help__error'}>
                            {errors.email.message}
                        </p>
                    }
                </label>
                <label htmlFor={'message'} className={'help__label'}>
                    <TextAria
                        placeholder={'Сообщение'}
                        errors={errors.message}
                        {...register('message', {
                            required: 'Поле обязательно для ввода'
                        })}
                    />
                    {errors?.message &&
                        <p className={'help__error'}>
                            {errors.message.message}
                        </p>
                    }
                </label>
                <Button type={'submit'} className={'help__button'} children={'Отправить сообщение'} />
            </form>
            {message &&
                message
            }
        </section>
    );
};

export default Help;