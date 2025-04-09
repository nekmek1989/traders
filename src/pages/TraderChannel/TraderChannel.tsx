import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import {IChannel} from "../../components/ChannelCard/types";
import Fetch from "../../API/fetch.ts";
import ChannelCard from "../../components/ChannelCard/ChannelCard.tsx";
import ChannelList from "../../components/ChannelList/ChannelList.tsx";

const TraderChannel = (): React.ReactNode => {
    const [channel, setChannel] = useState<IChannel>()
    const params = useParams()

    const [fetch, error, isLoading] = useFetch(
        async () => {
            const response = await Fetch.getChannelById(params.id)

            if (response) setChannel(response.data)
        }
    )


    useEffect(() => {
        fetch()
    }, []);

    return (
        <section className={'trader-channel'}>
            <header className={'trader-channel__header'}>
                <div className={'trader-channel__header-title'}>
                    <ChannelCard header={'Spot'} components={channel} isMainOnPage />
                </div>
                <div className={'trader-channel__header-extra'}></div>
            </header>
        </section>
    );
};

export default TraderChannel;