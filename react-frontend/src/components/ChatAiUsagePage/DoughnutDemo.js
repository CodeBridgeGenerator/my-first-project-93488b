import React, { useState, useEffect } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { Chart } from 'primereact/chart';
import { ChartService } from '../../services/chartService';
import client from '../../services/restClient';

export default function DoughnutDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [loading, setLoading] = useState(false);
    const getUserById = async (id) => {
        const results = await client.service('users').get(id);
        return results.name;
    };

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        setLoading(true);
        ChartService('prompts', 'days', ['createdBy'])
            .then(async (chartService) => {
                const accumulated = chartService?.datasets?.createdBy?.accumulated;
                if (accumulated) {
                    const keys = await Promise.all(
                        Object.keys(accumulated)?.map(async (u) => {
                            const name = await getUserById(u);
                            return name;
                        })
                    );
                    const data = {
                        labels: keys,
                        datasets: [
                            {
                                data: Object.values(accumulated),
                                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                            }
                        ]
                    };
                    const options = {
                        cutout: '60%'
                    };

                    setChartData(data);
                    setChartOptions(options);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return <div className="card flex justify-content-center">{loading ? <Skeleton width="100%" height="150px"></Skeleton> : <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-7rem" />}</div>;
}
