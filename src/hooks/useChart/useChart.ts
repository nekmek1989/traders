import {TabsProps} from "../../components/TabsCollection/Tabs/types";
import React, {useMemo, useState} from "react";
import {useFetch} from "../useFetch/useFetch.ts";
import FetchMarketData from "../../API/fetchMarket.ts";
import Chart from "../../components/Chart/Chart.tsx";
import TabsCollection from "../../components/TabsCollection/TabsCollection.tsx";
import {date, dateUI, hookChart} from "./types";

export const useChart: hookChart = () => {
        const selectDateRangeTabs: TabsProps[] = [
            {className: 'is-active', children: 'Сегодня', value: '24h', onClick: (event: React.MouseEvent<HTMLButtonElement>) => selectRange(event)},
            {children: '7 дней', value: '1w', onClick: (event: React.MouseEvent<HTMLButtonElement>) => selectRange(event)},
            {children: '30 дней', value: '1m', onClick: (event: React.MouseEvent<HTMLButtonElement>) => selectRange(event)},
            {children: '100 дней', value: '3m', onClick: (event: React.MouseEvent<HTMLButtonElement>) => selectRange(event)}
        ]
        const [selectedDate, setSelectedDate] = useState<dateUI>('Сегодня')
        const [range, setRange] = useState<date>('24h')
        const [chartData, setChartData] = useState<[]>([])

        const [fetchChart, errorChart, isChartLoading] = useFetch(
            async (data?) => {
                const response = await FetchMarketData.getCoinMarketData(data)

                if (response) {
                    const formatedData = response.data.map((step: any[]) => {
                        step[0] = new Date(step[0] * 1000)
                        return step.slice(0, 2)
                    }).slice(0, 21)
                    setChartData(formatedData)
                    setRange(data ? data : '24h')
                }
            }
        )

        const selectRange = (event?: React.MouseEvent<HTMLButtonElement>) => {
            if (event) {
                const target = event.target as HTMLButtonElement
                setSelectedDate(target.innerText as dateUI)
                setRange(target.value as date)
            }
        }

        useMemo(() => {
            fetchChart(range)
        }, [range])

        const chart = Chart({data: chartData, range: range})

        const tabsCollection = TabsCollection({tabs: selectDateRangeTabs, alt: true, className: ''})

        return [tabsCollection, selectedDate, chart, fetchChart, errorChart, isChartLoading]
}