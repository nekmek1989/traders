import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {RootState, store} from "../../store/store.ts";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {useModal} from "../../hooks/useModal.ts";
import Modal from "../../components/Modal/Modal.tsx";
import {changeEmail, changePassword} from "../../store/userReducer.ts";
import {passwordsMatches} from "../../utils/passwordsMatches.ts";
import {useChangeUser} from "../../hooks/useChangeUser.ts";
import {useFetch} from "../../hooks/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import {AuthContext} from "../../context/Context.ts";

//TODO: типизировать все

const Settings = (): React.ReactNode => {
    const user = useSelector((state: RootState) => state.user)
    const [isModal, openModal, closeModal] = useModal()
    const {setIsUserAuth} = useContext(AuthContext)
    const {
        handleSubmit: handleEmailSubmit,
        register: registerEmail,
        reset: resetEmail,
        formState: {
            errors: errorsEmail
        }
    } = useForm<changeEmail>({mode: 'onBlur'})
    const {
        handleSubmit: handlePasswordSubmit,
        register: registerPassword,
        getValues: getPasswordValues,
        reset: resetPassword,
        formState: {
            errors: errorsPassword
        }
    } = useForm<changePassword>({mode: 'onBlur'})

    const [fetchDeleteUser] = useFetch(
        async () => {
            await Fetch.deleteUser(user.id)
            setIsUserAuth(false)
            closeModal()
        }
    )


    const setEmail = (data: changeEmail) => {
        store.dispatch(changeEmail(data.email))

        resetEmail()
    }

    const setPassword = (data: changePassword) => {
        store.dispatch(changePassword(data.newPassword))

        resetPassword()
    }

    const deleteAccount = () => {
        fetchDeleteUser()
    }

    useChangeUser(user.email, user.password)

    return (
        <section className={'settings'}>
            <h4 className={'settings__title'}>
                Настройки
            </h4>
            <div className={'settings__forms'}>
                <form className={'settings__form'} onSubmit={handleEmailSubmit(setEmail)}>
                    <h4 className={'settings__form-title'}>
                        Изменить почту
                    </h4>
                    <p className={'settings__form-description'}>
                        Текущий email: {user.email}
                    </p>
                    <label htmlFor={'email'} className={'settings__label'}>
                        <Input
                            type={'email'}
                            placeholder={'Новый email'}
                            errors={errorsEmail.email}
                            {...registerEmail('email', {
                                required: 'Введите почту',
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Введите корректную почту',
                                }
                            })}
                        />
                        {errorsEmail.email &&
                            <p className={'settings__error'}>
                                {errorsEmail.email.message}
                            </p>
                        }
                    </label>
                    <label htmlFor={'password'} className={'settings__label'}>
                        <Input
                            type={'password'}
                            placeholder={'Ваш пароль'}
                            errors={errorsEmail.password}
                            {...registerEmail('password', {
                                required: 'Введите пароль',
                                validate: value => value === user.password ? true : 'Введите свой пароль!'
                            })}
                        />
                        {errorsEmail.password &&
                            <p className={'settings__error'}>
                                {errorsEmail.password.message}
                            </p>
                        }
                    </label>
                    <Button
                        className={'settings__button'}
                        type={'submit'}
                        children={'Изменить пароль'}
                    />
                </form>
                <form className={'settings__form'} onSubmit={handlePasswordSubmit(setPassword)}>
                    <h4 className={'settings__form-title'}>
                        Изменить пароль
                    </h4>
                    <label htmlFor={'password'} className={'settings__label'}>
                        <Input
                            type={'password'}
                            placeholder={'Текуший пароль'}
                            errors={errorsPassword.changePassword}
                            {...registerPassword('changePassword', {
                                required: 'Введите пароль',
                                validate: value => value === user.password ? true : 'Введите свой пароль!'
                            })}
                        />
                        {errorsPassword.changePassword &&
                            <p className={'settings__error'}>
                                {errorsPassword.changePassword.message}
                            </p>
                        }
                    </label>
                    <label htmlFor={'newPassword'} className={'settings__label'}>
                        <Input
                            type={'password'}
                            placeholder={'Новый пароль'}
                            errors={errorsPassword.newPassword}
                            {...registerPassword('newPassword', {
                                required: 'Введите пароль',
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                                    message: 'Пароль должен содержать 1 заглавную букву, 1 строчную букву и 1 число'
                                },
                                validate: value => value === getPasswordValues('changePassword') ? 'Новый пароль должен отличатся от старого' : true
                            })}
                        />
                        {errorsPassword.newPassword &&
                            <p className={'settings__error'}>
                                {errorsPassword.newPassword.message}
                            </p>
                        }
                    </label>
                    <label htmlFor={'repeatNewPassword'} className={'settings__label'}>
                        <Input
                            type={'password'}
                            placeholder={'Текуший пароль'}
                            errors={errorsPassword.repeatNewPassword}
                            {...registerPassword('repeatNewPassword', {
                                required: 'Введите пароль',
                                validate: value =>  passwordsMatches(getPasswordValues('newPassword'), value)
                            })}
                        />
                        {errorsPassword.repeatNewPassword &&
                            <p className={'settings__error'}>
                                {errorsPassword.repeatNewPassword.message}
                            </p>
                        }
                    </label>
                    <Button
                        className={'settings__button'}
                        type={'submit'}
                        children={'Изменить пароль'}
                    />
                </form>
            </div>
            <Button
                className={'settings__button-error'}
                type={'button'}
                children={'Удалить аккаунт'}
                deleteButton
                onClick={openModal}
            />

            {isModal &&
                <Modal onClose={closeModal}>
                    <div className={'settings__modal'}>
                        <h4 className={'settings__modal-title'}>
                            Вы точно уверены, что хотите удалить аккаунт?
                        </h4>
                        <p className={'settings__modal-description'}>
                            Аккаунт будет удален безвозвратно и не подлежит восстановлению
                        </p>
                        <div className={'settings__modal-buttons'}>
                            <Button
                                className={'settings__modal-button'}
                                type={'button'}
                                onClick={deleteAccount}
                                children={'Да, удалить'}
                                deleteButton
                            />
                            <Button
                                className={'settings__modal-button'}
                                type={'button'}
                                onClick={closeModal}
                                children={'Нет, не удалять'}
                            />
                        </div>
                    </div>
                </Modal>
            }
        </section>
    );
};

export default Settings;