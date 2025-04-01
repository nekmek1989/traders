import React, {FC} from 'react';


interface IMetric {
    title: string
    count: number | string
    svg?: any
}

const Metric: FC<IMetric> = ({title, count, svg}) => {
    return (
        <div className='metric'>
            <div className="metric__title">{title}</div>
            <div className="metric__body">
                {svg && svg}
                {count}
            </div>
        </div>
    );
};

export default Metric;