// @ts-ignore
import React, {useContext, useEffect, useState} from 'react';
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import {AuthContext} from "../../context/Context.ts";
import {IAuth} from "../../App/App.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {store} from "../../store/store.ts";
import {recordUser, User} from "../../store/userReducer.ts";
import Loader from "../../components/Loader/Loader.tsx";

const Login = () => {

    const {setIsUserAuth} = useContext(AuthContext)
    const [errorLogin, setErrorLogin] = useState<boolean>(false)
    const {
        handleSubmit,
        register,
        formState: {
            errors
        }
    } = useForm<IAuth>({mode: 'onBlur'})

    const [fetch, error, isLoading] = useFetch(
        async (userLogin: IAuth) => {
            const {email, password} = userLogin

            const response = await Fetch.getUserByEmail(email)

            if (response) {
                const isAuth: boolean =  response.data.find((user: User) => {
                    if ( user.password === password &&
                        user.email === email ) return true
                })

                if (isAuth) {
                    setIsUserAuth(true)

                    localStorage.setItem('auth', JSON.stringify(userLogin))

                    const userData = await Fetch.getUserByEmail(email)

                    if (userData) store.dispatch(recordUser(userData.data[0]))
                } else {
                    setErrorLogin(true)
                }
            }
         }
    )

    const checkUser: SubmitHandler<IAuth> = (data): void => {
        fetch(data)
    }

    return (

            <div className='login'>
                <h1 className='login__title'>Вход</h1>
                <form className='login__form' onSubmit={handleSubmit(checkUser)}>

                    <Input
                        type='text'
                        placeholder='Email'
                        className='login__field input'

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
                                {errors.email?.message as string || 'Error'}
                            </p>
                    }

                    <Input
                        type='password'
                        placeholder='Пароль'
                        className='login__field input'
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

                    <Button
                        className='login__button'
                        type='submit'
                    >
                        Войти
                    </Button>
                </form>
                <div className='login__extra'>
                    <p className='login__extra-text'>
                        Еще нет аккаунта?
                    </p>
                    <Link to='/register' className='login__extra-link'>
                        Зарегистрироваться
                    </Link>
                </div>
                {isLoading &&
                    <Loader />
                }
                {error &&
                    <div className='login__error'>
                        Такого пользователя не существует
                    </div>
                }
                {errorLogin &&
                    <div className='login__error'>
                        Неверно введенный пароль
                    </div>
                }
            </div>
    );
};

export default Login;