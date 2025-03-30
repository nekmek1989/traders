// @ts-ignore
import React, {useContext, useEffect, useState} from 'react';
import TabsCollection from "../../components/TabsCollection/TabsCollection.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router";
import {ITabs} from "../../components/TabsCollection/Tabs/Tabs.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import {AuthContext} from "../../context/Context.ts";
import {useForm, useWatch} from "react-hook-form";
import Loader from "../../components/Loader/Loader.tsx";
import {store} from "../../store/store.ts";
import {recordUser} from "../../store/userReducer.ts";

const Register = () => {

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
    } = useForm( {mode: 'onBlur'} )

    const tabs: ITabs[] = [
        {
            children: 'Пассивный заработок',
            toolTipBox: 'Возможность копировать реальные сделки успешных профессиональных трейдеров.',
            className: 'is-active',
            onClick: () => setUser({...user, accountType: 'Пассивный заработок'})
        },
        {
            children: 'Публичный трейдинг',
            toolTipBox: 'Возможность совершать сделки, и делиться своим успехом.',
            onClick: () => setUser({...user, accountType: 'Публичный трейдинг'})
        }
    ]


    const passwordsMatches = (passwordRepeat: string) => {
        if (passwordRepeat === getValues('password')) {
            return true
        }
        return 'Пароли должны совпадать'
    }


    const [fetch, error, isLoading] = useFetch(
        async () => {
            const {email, accountType} = user

            const response = await Fetch.getUserByEmail(email)

            const isAuth =  response.data.find(user => {
                return user.email === email
            })

            if (isAuth) {
                setUserAlreadyAuth(true)
                return
            }

            await Fetch.postUser(user)

            setIsUserAuth(true)

            store.dispatch(recordUser(response.data))

            Reflect.deleteProperty(user, accountType)
            localStorage.setItem('auth', JSON.stringify(user))
        }
    )

    const addUser = (): void => {
        fetch()
    }

    useEffect(() => {
        setUser({...user, email: getValues('email'), password: getValues('password')})
    }, [useWatch({control, name: 'email'}), useWatch({control, name: 'password'})]);

    return (
        <div className='login'>
            <h1 className='login__title'>Регистрация</h1>
            <TabsCollection tabs={tabs} />
            <form className='login__form' onSubmit={handleSubmit(addUser)}>
                <Input
                    type='text'
                    placeholder='Email'
                    className='login__field'
                    {...register('email', {
                        required: 'Введите почту',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Введите корректную почту'
                        }
                    })}
                />

                {errors?.email &&
                    <p className='login__error'>
                        {errors.email?.message || 'Error'}
                    </p>
                }

                <Input
                    type='password'
                    placeholder='Пароль'
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
                        {errors.password?.message || 'Error'}
                    </p>
                }

                <Input
                    type='password'
                    placeholder='Повторите пароль'
                    className='login__field'
                    {...register('passwordRepeat', {
                        required: 'Пароли должны совпадать',
                        validate: value => passwordsMatches(value)
                    })}
                />
                {errors?.passwordRepeat &&
                    <p className='login__error'>
                        {errors.passwordRepeat?.message || 'Error'}
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
        </div>
    );
};

export default Register;