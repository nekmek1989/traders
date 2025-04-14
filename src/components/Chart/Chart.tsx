import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import {absoluteToRelativeFormater} from "../../utils/absoluteToRelativeFormater.ts";
import useWindowWidth from "../../hooks/useSize/useWindowWidth.ts";
import {TabsProps} from "../TabsCollection/Tabs/types";
import TabsCollection from "../TabsCollection/TabsCollection.tsx";
import {deltaValues} from "../../utils/deltaValues.ts";

const Chart = (props: Props): React.ReactNode => {
    const { data, range } = props
    const [bars, setBars] = useState<number[]>([0, 20])
    const size = useWindowWidth()
    const [type, setType] = useState<type>('n')
    const tabs: TabsProps[] = [
        {className: 'is-active', children: 'n', onClick: () => setType('n'), value: 'n'},
        {children: '%', onClick: () => setType('%'), value: '%'}
    ]

    const x = () => {
        const seen = new Map<string, number>();

        return data.map((step: data) => {
                let label = '';
                const date = step[0];

                switch (range) {
                    case "24h":
                        label = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                        break;
                    case "1w":
                        label = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${date.getDay() + 1}`;
                        break;
                    case "1m":
                    case "3m":
                        label = `${date.getDate()} / ${date.getMonth() + 1}`;
                        break;
                }

                const count = seen.get(label) || 0;
                seen.set(label, count + 1);

                return label + '\u200B'.repeat(count);
            });
    }

    const y = () => {
        const y = data.map((step: data) => step[1])
        return type === 'n' ? deltaValues(y) : absoluteToRelativeFormater(y)
    }


    useEffect( () => {
            if (size < 1024 && size >= 768) {
                setBars([0, 15])
            }
            else if (size < 768) {
                setBars([0, 10])
            }
            else setBars([0, 20])
        }, [size]
    )

    return (
        <div className={'chart'}>
            <TabsCollection tabs={tabs} className={'chart__tabs'} alt />
            <Plot
                data={[
                    {
                        x: x(),
                        y: y(),
                        type: 'bar',
                        marker: {
                            color: y().map(value => value >= 0 ? '#73FFF2' : '#FC4C4F'),
                        },
                    }
                ]}
                layout={
                    {
                        autosize: true,
                        margin: { l: 35, r: 0, t: 40, b: 40 },
                        paper_bgcolor: 'transparent',
                        plot_bgcolor: 'transparent',
                        font: {
                            family: 'Montserrat',
                            size: 12,
                            color: '#9C9BD6'
                        },
                        xaxis: {
                            zerolinewidth: 0,
                            zeroline: false,
                            showline: false,
                            tickangle: -45,
                            range: bars,
                            autorange: false,
                            fixedrange: true,
                        },
                        yaxis: {
                            gridcolor: '#353E51',
                            zerolinewidth: 0,
                            zeroline: false,
                            showline: false,
                            ticksuffix: type === '%' ? '%' : '',
                            fixedrange: true,
                        },
                        //@ts-ignore
                        barcornerradius: 4,
                    }
                }
                config={{
                    staticPlot: true
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default Chart;