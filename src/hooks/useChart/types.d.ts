import React from "react";

type hookChart = () => [
    tabsCollection: React.ReactNode,
    dateRange: dateUI,
    chart: React.ReactNode,
    fetchChart: (data?: any) => Promise<void>,
    error: string,
    loading: boolean
]

type dateUI = 'Сегодня' | '7 дней' | '30 дней' | '100 дней'
type date = '24h'| '1w'| '1m' | '3m'