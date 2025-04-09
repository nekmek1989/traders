export type sortChannelParam = 'По цене' | 'По доходности' | 'По популярности' | 'Сортировка'

export type sortForm = {
    search: string,
    type: 'Spot' | 'Futures' | 'Счёт',
    risk: "Низкий" | "Средний" | 'Высокий' | "Уровень риска"
}