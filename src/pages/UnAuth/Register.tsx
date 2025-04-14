import React, {useContext, useEffect, useState} from 'react';
import TabsCollection from "../../components/TabsCollection/TabsCollection.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router";
import {useFetch} from "../../hooks/useFetch/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import {AuthContext} from "../../context/Context.ts";
import {useForm, useWatch} from "react-hook-form";
import Loader from "../../components/Loader/Loader.tsx";
import {store} from "../../store/store.ts";
import {recordUser, User} from "../../store/userReducer.ts";
import {passwordsMatches} from "../../utils/passwordsMatches.ts";
import {TabsProps} from "../../components/TabsCollection/Tabs/types";

const Register = (): React.ReactNode => {

    const [user, setUser] = useState({email: '', password: '', accountType: 'Пассивный заработок'})
    const [userAlreadyAuth, setUserAlreadyAuth] = useState<boolean>(false)
    const {setIsUserAuth} = useContext(AuthContext)
    const {
        handleSubmit,
        register,
        getValues,
        control,
        formState: {
            errors
        }
    } = useForm<registerForm>({mode: 'onBlur'} )

    const tabs: TabsProps[] = [
        {
            children: 'Пассивный заработок',
            toolTipBox: 'Возможность копировать реальные сделки успешных профессиональных трейдеров.',
            className: 'is-active',
            onClick: () => setUser({...user, accountType: 'Пассивный заработок'}),
            value: 'Пассивный заработок'
        },
        {
            children: 'Публичный трейдинг',
            toolTipBox: 'Возможность совершать сделки, и делиться своим успехом.',
            onClick: () => setUser({...user, accountType: 'Публичный трейдинг'}),
            value: 'Публичный трейдинг'
        }
    ]

    const [fetch, error, isLoading] = useFetch(
        async () => {
            const {email} = user

            const response = await Fetch.getUserByEmail(email)

            if (response) {
                const isAuth: boolean =  response.data.find((user: User): boolean => {
                    return user.email === email
                })

                if (isAuth) {
                    setUserAlreadyAuth(true)
                    return
                }
            }

            const userData = await Fetch.postUser(user)

            setIsUserAuth(true)

            store.dispatch(recordUser(userData.data))

            localStorage.setItem('auth', JSON.stringify(user))
        }
    )

    const addUser = () => {
        fetch()
    }

    useEffect(() => {
        setUser({...user, email: getValues('email'), password: getValues('password')})
    }, [useWatch({control, name: 'email'}), useWatch({control, name: 'password'})]);

    return (
        <div className='login'>
            <h1 className='login__title'>Регистрация</h1>
            <TabsCollection tabs={tabs} className={'login__tabs'} />
            <form className='login__form' onSubmit={handleSubmit(addUser)}>
                <Input
                    type='email'
                    placeholder='Email'
                    errors={errors.email}
                    className='login__field'
                    {...register('email', {
                        required: 'Введите почту',
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Введите корректную почту',
                        }
                    })}
                />

                {errors?.email &&
                    <p className='login__error'>
                        {errors.email?.message as string || 'Error'}
                    </p>
                }

                <Input
                    type='password'
                    placeholder='Пароль'
                    errors={errors.password}
                    className='login__field'
                    {...register('password', {
                        required: 'Введите пароль',
                        pattern: {
                            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                            message: 'Пароль должен содержать 1 заглавную букву, 1 строчную букву и 1 число'
                        },
                        minLength: {
                            value: 8,
                            message: `Минимальная длинна пароля 8 символов`
                        }
                    })}
                />
                {errors?.password &&
                    <p className='login__error'>
                        {errors.password?.message as string || 'Error'}
                    </p>
                }

                <Input
                    type='password'
                    placeholder='Повторите пароль'
                    errors={errors.passwordRepeat}
                    className='login__field'
                    {...register('passwordRepeat', {
                        required: 'Пароли должны совпадать',
                        validate: value => passwordsMatches(value, getValues('password'))
                    })}
                />
                {errors?.passwordRepeat &&
                    <p className='login__error'>
                        {errors.passwordRepeat?.message as string || 'Error'}
                    </p>
                }

                <Button
                    className='login__button'
                    type='submit'
                >
                    Зарегистрироваться
                </Button>
            </form>
            <div className='login__extra'>
                <p className='login__extra-text'>
                    Уже зарегистрированы?
                </p>
                <Link to='/login' className='login__extra-link'>
                    Войти в аккаунт
                </Link>
            </div>
            {isLoading &&
                <Loader />
            }
            {userAlreadyAuth &&
                <div className='login__error'>
                    Данны Email уже зарегистрирован, попробуйте войти или сменить Email
                </div>
            }
            {error &&
                <p className={''}>
                    {error}
                </p>
            }
        </div>
    );
};

export default Register;