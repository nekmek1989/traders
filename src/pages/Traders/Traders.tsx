import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import SearchInput from "../../components/SearchInput/SearchInput.tsx";
import Select from "../../components/Select/Select.tsx";
import IconDropDownButton from "../../components/IconDropDownButton/IconDropDownButton.tsx";
import {useFetch} from "../../hooks/useFetch/useFetch.ts";
import Fetch from "../../API/fetch.ts";
import {sortChannelParam, sortForm} from "./types";
import {IChannel} from "../../components/Channel/ChannelCard/types";
import {useSearchAndSortChannels} from "../../hooks/useSortChannels/useSortChannels.ts";
import Button from "../../components/Button/Button.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import ChannelList from "../../components/Channel/ChannelList/ChannelList.tsx";


const Traders = (): React.ReactNode => {
    const [channels, setChannels] = useState<IChannel[]>([])
    const [searchParams, setSearchParams] = useState<sortForm>({search: '', type: "Счёт", risk: "Уровень риска"})
    const [selectedSort, setSelectedSort] = useState<sortChannelParam>('Сортировка')

    const sortedChannels = useSearchAndSortChannels(channels, searchParams, selectedSort)

    const count = ['Spot', "Futures"]
    const risk = ["Низкий", "Средний", 'Высокий']
    const sortParams: sortChannelParam[] = ['По цене' , 'По доходности' , 'По популярности']

    const {
        handleSubmit,
        register,
        reset
    } = useForm<sortForm>()


    const [fetch, error, isLoading] = useFetch(
       async () => {
           const response = await Fetch.getAllChannels()
           if (response) {
               const filteredChannels = response.data.filter((channel: IChannel) => {
                   if (channel.name) {
                       return channel
                   }
               })
               setChannels(filteredChannels)
           }
        }
    )


    const sortChannel = (data: sortForm) => {
        setSearchParams(data)
    }



    useEffect(() => {
        fetch()
    }, []);

    return (
        <section className={'traders'}>
            <h4 className={'traders__title hidden-tablet'}>
                ТРЕЙДЕРЫ
            </h4>
            <div className={'traders__header'}>
                <form
                    className={'traders__form'}
                    onChange={handleSubmit(sortChannel)}
                    onSubmit={e => e.preventDefault()}
                >
                    <SearchInput
                        type={'text'}
                        placeholder={'Поиск канала'}
                        className={'traders__field'}
                        {...register('search')}
                    />
                    <Select
                        className={'traders__select'}
                        options={count}
                        value={'Счёт'}
                        alt
                        {...register('type')}
                    />
                    <Select
                        className={'traders__select'}
                        options={risk}
                        value={'Уровень риска'}
                        alt
                        {...register('risk')}
                    />
                    <Button
                        type={'reset'}
                        className={'traders__button'}
                        onClick={
                            () => {
                                setSearchParams({search: '', type: "Счёт", risk: "Уровень риска"})
                                reset()
                            }
                        }
                        alt
                        small
                    >
                        Сбросить
                    </Button>
                </form>
                <IconDropDownButton
                    elements={[
                        <Button
                            className={'traders__button'}
                            onClick={() => setSelectedSort('Сортировка')}
                            alt
                            smallest
                            key={'Сортировка'}
                        >
                            Сбросить
                        </Button>,

                        ...sortParams.map(sortText =>
                            <Button
                                className={'traders__button'}
                                onClick={() => setSelectedSort(sortText)}
                                key={sortText}
                                alt
                                smallest
                            >
                                {sortText}
                            </Button>
                        )]
                    }
                    className={'traders__field'}
                >
                    <p className={''}>{selectedSort}</p>
                </IconDropDownButton>
            </div>

            {sortedChannels &&
                <ChannelList channels={sortedChannels}/>
            }
            {isLoading &&
                <Loader/>
            }
            {error &&
                <p>{error}</p>
            }



        </section>
    );
};

export default Traders;