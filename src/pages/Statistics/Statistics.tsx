import React, {useEffect, useMemo} from 'react';
import {useChart} from "../../hooks/useChart/useChart.ts";
import Loader from "../../components/Loader/Loader.tsx";
import {randomInt} from "../../utils/randomInt.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

const Statistics = (): React.ReactNode => {
    const user = useSelector((state: RootState) => state.user)
    const [tabsCollection, selectedDate, chart, fetchChart, errorChart, isChartLoading] = useChart()
    const randomRevenue = useMemo(() => {
        return randomInt(100)
    }, [selectedDate])
    const isValidAvatar = user.avatar && !user.avatar.includes('/src/')


    useEffect(() => {
        fetchChart()
    }, []);

    return (
        <section className={'statistics'}>
            <div className={'statistics__header'}>
                <div className={'statistics__title'}>
                    <div className={'statistics__image-wrapper'}>
                        <img className={'statistics__image'} src={isValidAvatar ? user.avatar : '/images/default-user.png'} alt={''}/>
                    </div>
                    <h4 className={'statistics__name'}>
                        {user.name}
                    </h4>
                </div>
                <ul className={'statistics__metrics'}>
                    <li className={'statistics__item'}>
                        <p className={'statistics__label'}>Текущий депозит</p>
                        <p className={'statistics__description'}>$ {user.money}</p>
                    </li>
                    <li className={'statistics__item'}>
                        <p className={'statistics__label'}>Общий доход за месяц</p>
                        <p className={'statistics__description'}>$ {user.money - Math.round(randomInt(user.money))}</p>
                    </li>
                </ul>
            </div>
            <div className={'statistics__buttons'}>
                {tabsCollection}
                <div className={'statistics__banner'}>
                    Доход за {selectedDate}: {user.money ? randomRevenue.toFixed(1) : 0}%
                </div>
            </div>
            <div className={'statistics__chart'}>
                {isChartLoading
                    ? <Loader/>
                    : chart
                }
                {errorChart&&
                    <p className={''}>errorChart</p>
                }
            </div>
        </section>
    );
};

export default Statistics;