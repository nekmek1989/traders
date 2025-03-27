// @ts-ignore
import React, {useState} from 'react';
import TabsCollection from "../components/TabsCollection/TabsCollection.tsx";
import {ITabs} from "../components/TabsCollection/Tabs/Tabs.tsx";

const Login = () => {

    const [accountType, setAccountType] = useState('')

    const tabs: ITabs[] = [
        {
            children: 'Пассивный заработок',
            toolTipBox: 'Возможность копировать реальные сделки успешных профессиональных трейдеров.',
            className: 'is-active',
            onClick: () => setAccountType('Пассивный заработок'),
        },
        {
            children: 'Публичный трейдинг',
            toolTipBox: 'Возможность совершать сделки, и делиться своим успехом.',
            onClick: () => setAccountType('Публичный трейдинг'),
        }
    ]


    return (
        <div className='login'>
            <h1 className='login__title'>Вход</h1>
            <TabsCollection tabs={tabs} />
        </div>
    );
};

export default Login;