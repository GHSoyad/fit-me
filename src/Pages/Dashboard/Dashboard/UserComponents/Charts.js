import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import ScreenLoader from '../../../../Components/Loaders/ScreenLoader/ScreenLoader';
import useChartData from '../../../../Hooks/useChartData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Charts = ({ email }) => {

    const { userInfo, roleLoading } = useContext(AuthContext);

    const { isLoading, data: transformations } = useQuery({
        queryKey: ['transformations'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_BASE_URL}/transformation?email=${email ? email : userInfo?.email}`)
                .then(res => res.json())
    })

    console.log(transformations)

    const defaultState = {
        labels: [],
        weight: [],
        height: [],
        chest: [],
        waist: [],
        thigh: [],
        arms: [],
        fat: []
    }
    const [chartData, setChartData] = useState(defaultState);

    useEffect(() => {
        if (!isLoading) {
            setChartData(prev => ({ ...prev, labels: transformations.slice(-14).map(t => t.date) }));
            setChartData(prev => ({ ...prev, weight: transformations.slice(-14).map(t => t.weight) }));
            setChartData(prev => ({ ...prev, height: transformations.slice(-14).map(t => t.height) }));
            setChartData(prev => ({ ...prev, chest: transformations.slice(-14).map(t => t.chest) }));
            setChartData(prev => ({ ...prev, waist: transformations.slice(-14).map(t => t.waist) }));
            setChartData(prev => ({ ...prev, thigh: transformations.slice(-14).map(t => t.thigh) }));
            setChartData(prev => ({ ...prev, arms: transformations.slice(-14).map(t => t.arms) }));
            setChartData(prev => ({ ...prev, fat: transformations.slice(-14).map(t => t.fat) }));
        }
    }, [isLoading, transformations])

    const weightData = useChartData("Weight", chartData.labels, chartData.weight);
    const heightData = useChartData("Height", chartData.labels, chartData.height);
    const chestData = useChartData("Chest", chartData.labels, chartData.chest);
    const waistData = useChartData("Waist", chartData.labels, chartData.waist);
    const thighData = useChartData("Thigh", chartData.labels, chartData.thigh);
    const armsData = useChartData("Arms", chartData.labels, chartData.arms);
    const fatData = useChartData("Fat", chartData.labels, chartData.fat);

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    return (
        <>
            {
                isLoading || roleLoading ? <ScreenLoader></ScreenLoader> :
                    <div className='flex flex-col gap-8'>
                        <div className='bg-white rounded-xl p-2 pt-6'>
                            <h4 className='text-xl font-semibold pl-10'>Weight Chart</h4>
                            <Line data={weightData} options={options} height={150}></Line>
                        </div >
                        <div className='md:flex gap-8'>
                            <div className='bg-white rounded-xl p-2 pt-6 w-full md:w-1/2 mb-8 md:mb-0'>
                                <h4 className='text-xl font-semibold pl-10'>Height Chart</h4>
                                <Line data={heightData} options={options} height={150}></Line>
                            </div >
                            <div className='bg-white rounded-xl p-2 pt-6 w-full md:w-1/2'>
                                <h4 className='text-xl font-semibold pl-10'>Chest Chart</h4>
                                <Line data={chestData} options={options} height={150}></Line>
                            </div >
                        </div>
                        <div className='md:flex gap-8'>
                            <div className='bg-white rounded-xl p-2 pt-6 w-full md:w-1/2 mb-8 md:mb-0'>
                                <h4 className='text-xl font-semibold pl-10'>Waist Chart</h4>
                                <Line data={waistData} options={options} height={150}></Line>
                            </div >
                            <div className='bg-white rounded-xl p-2 pt-6 w-full md:w-1/2'>
                                <h4 className='text-xl font-semibold pl-10'>Thigh Chart</h4>
                                <Line data={thighData} options={options} height={150}></Line>
                            </div >
                        </div>
                        <div className='md:flex gap-8'>
                            <div className='bg-white rounded-xl p-2 pt-6 w-full md:w-1/2 mb-8 md:mb-0'>
                                <h4 className='text-xl font-semibold pl-10'>Arms Chart</h4>
                                <Line data={armsData} options={options} height={150}></Line>
                            </div >
                            <div className='bg-white rounded-xl p-2 pt-6 w-full md:w-1/2'>
                                <h4 className='text-xl font-semibold pl-10'>Fat Chart</h4>
                                <Line data={fatData} options={options} height={150}></Line>
                            </div >
                        </div>
                    </div>
            }
        </>
    );
};

export default Charts;