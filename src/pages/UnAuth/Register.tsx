// @ts-ignore
import React, {useState} from 'react';
import TabsCollection from "../../components/TabsCollection/TabsCollection.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router";
import {ITabs} from "../../components/TabsCollection/Tabs/Tabs.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";

const Register = () => {

    const [user, setUser] = useState( {email: '', password: '', accountType: 'Пассивный заработок'})
    const [userAuth, setUserAuth] = useState(false)

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


    const [fetch, error, isLoading] = useFetch(
        async () => {
            const {email, password, accountType} = user

            const response = await Fetch.getAllUsers()

            const isAuth =  response.data.find(user => {
                return user.email === email
            })

            if (isAuth) {
                setUserAuth(true)
                return
            }

            await Fetch.postUser(user)

        }
    )

    const addUser = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        fetch()
    }


    return (
        <div className='login'>
            <h1 className='login__title'>Регистрация</h1>
            <TabsCollection tabs={tabs} />
            <form className='login__form' onSubmit={addUser}>
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

                <Input
                    required={false}
                    type='password'
                    placeholder='Повторить пароль'
                    value={''}
                    className='login__field'
                    onChange={event =>  4} //организовать валидацию пароля
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
            {userAuth &&
                <div className='login__error'>
                    Данны Email уже зарегистрирован, попробуйте войти или сменить Email
                </div>
            }

        </div>
    );
};

export default Register;