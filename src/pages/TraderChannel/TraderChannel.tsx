import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import {IChannel} from "../../components/ChannelCard/types";
import Fetch from "../../API/fetch.ts";
import ChannelCard from "../../components/ChannelCard/ChannelCard.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import Button from "../../components/Button/Button.tsx";

const TraderChannel = (): React.ReactNode => {
    const [channel, setChannel] = useState<IChannel>()
    const params = useParams()
    const selectDateRange = ['Сегодня', '7 дней', '30 дней', '100 дней']

    const [fetch, error, isLoading] = useFetch(
        async () => {
            if (params.id) {
                const response = await Fetch.getChannelById(params.id)

                if (response) setChannel(response.data)
            }
        }
    )

    const selectRange = (event: MouseEvent) => {
        console.log(event.target.className)
    }


    useEffect(() => {
        fetch()
    }, []);

    return (
        <section className={'trader-channel'}>
            {!isLoading &&
                <header className={'trader-channel__header'}>
                    <div className={'trader-channel__header-title'}>
                        <ChannelCard header={'Spot'} components={channel} isMainOnPage/>
                    </div>
                    <div className={'trader-channel__header-extra'}>
                        {selectDateRange.map(select =>
                            <Button
                                alt
                                smallest
                                className={
                                    select === 'Сегодня'
                                        ? 'trader-channel__button is-active'
                                        : 'trader-channel__button'
                                }
                                children={select}
                                onClick={event => selectRange(event)}
                                key={select}
                            />
                        )
                        }
                    </div>
                </header>
            }
            {isLoading &&
                <Loader />
            }
        </section>
    );
};

export default TraderChannel;