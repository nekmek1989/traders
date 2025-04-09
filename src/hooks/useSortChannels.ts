import {useMemo} from "react";
import {IChannel} from "../components/ChannelCard/types";
import {sortChannelParam, sortForm} from "../pages/Traders/types";

export const useSortChannels = (channels: IChannel[], sortParams: sortChannelParam)=> {
    if (sortParams === 'По цене') {
        return [...channels].sort((a, b) => b.price - a.price)
    } else if (sortParams ==='По популярности') {
        return [...channels].sort((a, b) => b.subscribes - a.subscribes)
    } else if (sortParams === 'По доходности') {
        return [...channels].sort((a, b) => b.revenue - a.revenue)
    }
    return channels
}


export const useSearchAndSortChannels = (channels: IChannel[], params: sortForm, sortParams: sortChannelParam) => {

    const isRiskSelected = params.risk !== 'Уровень риска'
    const isTypeSelected = params.type !== 'Счёт'

    const sortedChannels = useSortChannels(channels, sortParams)

    const searchedAndSortedChannels = useMemo(() => {
        return sortedChannels.filter(
            channel =>
                channel.name
                    .toLowerCase()
                    .includes(params.search.toLowerCase())
                && (isRiskSelected ? channel.risk === params.risk : true)
                && (isTypeSelected ? channel.type.toLowerCase() === params.type.toLowerCase() : true)
        )
    }, [channels, params, sortParams]);

    return searchedAndSortedChannels ? searchedAndSortedChannels : undefined
}