// @ts-ignore
import React, {useContext, useEffect, useState} from 'react';
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import {AuthContext} from "../../context/Context.ts";
import {IAuth} from "../../App/App.tsx";
import {useForm} from "react-hook-form";

const Login = () => {

    const {setIsUserAuth} = useContext(AuthContext)
    const [user, setUser] = useState<IAuth>( {email: '', password: ''} )
    const [errorLogin, setErrorLogin] = useState<boolean>(false)
    const {
        handleSubmit,
        register,
        formState: {
            errors
        }
    } = useForm({mode: 'onBlur'})

    const [fetch, error, isLoading] = useFetch(
        async (user) => {
            setUser(user)

            const {email, password} = user
            console.log(user)

            const response = await Fetch.getAllUsers()

            const isAuth =  response.data.find(user => {
                return user.password === password &&
                    user.email === email
            })

            if (isAuth) {
                setIsUserAuth(true)
                localStorage.setItem('auth', JSON.stringify(user))
            } else {
                setErrorLogin(true)
            }
         }
    )

    const checkUser = (event: React.FormEvent<HTMLFormElement>): void => {
        fetch(event)
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
                                {errors.email?.message || 'Error'}
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
                            {errors.password?.message || 'Error'}
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
                {errorLogin &&
                    <div className='login__error'>
                        Такого пользователя не существует
                    </div>
                }
            </div>
    );
};

export default Login;