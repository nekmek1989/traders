import React from 'react';

const Metric = (props: MetricsProps): React.ReactNode => {
    const {title, count, svg} = props

    return (
        <div className='metric'>
            <div className="metric__title">{title}</div>
            <div className="metric__body">
                {svg &&
                    svg
                }
                {count}
            </div>
        </div>
    );
};

export default Metric;