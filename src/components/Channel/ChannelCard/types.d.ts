export type TChannelCard = {
    header: 'Spot' | 'Futures'
    components?: IChannel
    error?: boolean
    channels?: IChannel[]
    setChannels?: (channels: IChannel[]) => void
}

export interface IChannel {
    avatar: string
    createdAt: string
    id: string
    name: string
    price: number
    rating: number
    revenue: number
    risk: 'Низкий' | 'Средний' | 'Высокий'
    stock: string
    subscribes: number
    type: 'Spot' | 'Futures'
    userId: string
}

export type TFormChannel = {
    name: string
    avatar: File
    price: number
    risk: '---' | 'Низкий' | 'Средний' | 'Высокий'
    stock: '---' | 'Binance' | 'Bybit' | '1488' | 'Mexc'
}