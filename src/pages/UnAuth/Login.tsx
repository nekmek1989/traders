// @ts-ignore
import React, {useEffect, useState} from 'react';
import TabsCollection from "../../components/TabsCollection/TabsCollection.tsx";
import {ITabs} from "../../components/TabsCollection/Tabs/Tabs.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";

const Login = () => {

    const [user, setUser] = useState( {email: '', password: ''} )

    const [fetch, error, isLoading] = useFetch(
        async () => {
            const {email, password} = user

            const response = await Fetch.getAllUsers()

            const isAuth =  response.data.find(user => {
                return user.password === password &&
                    user.email === email
            })


            // new Error('Такого пользователя нету!')

         }
    )

    const checkUser = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        fetch()
    }

    return (
        <div className='login'>
            <h1 className='login__title'>Вход</h1>
            <form className='login__form' onSubmit={checkUser}>

                <Input
                    required={true}
                    type='text'
                    placeholder='Email'
                    value={user.email}
                    className='login__field'
                    onChange={event => setUser({...user, email: event.target.value})}
                />

                <Input
                    required={true}
                    type='password'
                    placeholder='Пароль'
                    value={user.password}
                    className='login__field'
                    onChange={event => setUser({...user, password: event.target.value})}
                />

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
        </div>
    );
};

export default Login;