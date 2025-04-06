export type TChannelCard = {
    header: 'Spot' | 'Futures'
    components?: IChannel
    error?: boolean
    channels?: IChannel[]
    setChannels?: (channels: IChannel[]) => void
    changeChannel?: () => void
}

export interface IChannel {
    avatar: string | '/src/assets/icons/default-user.png'
    createdAt: string
    id: string
    name: string
    price: string
    rating: number
    revenue: number
    risk: 1 | 2 | 3
    stock: string
    subscribes: number
    type: 'Spot' | 'Futures'
    userId: string
}

export type TFormChannel = {
    channelName: string
    photo: FileList
    price: string
    risk: 'Низкий' | 'Средний' | 'Высокий'
    stock: 'Binance' | 'Bybit' | '1488' | 'Mexc'
}