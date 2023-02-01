import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCaretRight, FaReceipt, FaUser } from 'react-icons/fa';
import { RiCalendarCheckFill, RiTeamFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ScreenLoader from '../../../../Components/Loaders/ScreenLoader/ScreenLoader';

const Statistics = () => {

    const { isLoading: userLoading, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_BASE_URL}/users`)
                .then(res => res.json())
    })

    const { isLoading: batchesLoading, data: batches } = useQuery({
        queryKey: ['batches'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_BASE_URL}/users`)
                .then(res => res.json())
    })

    const { isLoading: attendanceLoading, data: attendance } = useQuery({
        queryKey: ['attendance'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_BASE_URL}/users`)
                .then(res => res.json())
    })

    const { isLoading: paymentsLoading, data: payments } = useQuery({
        queryKey: ['payments'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_BASE_URL}/users`)
                .then(res => res.json())
    })

    return (
        <div>
            {
                userLoading || batchesLoading || attendanceLoading || paymentsLoading ? <ScreenLoader></ScreenLoader>
                    :
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
                        <div className='flex items-center justify-between gap-3 bg-white px-6 py-8 rounded-xl shadow-lg'>
                            <div className='flex items-center gap-3'>
                                <FaUser className='text-4xl text-primary'></FaUser>
                                <div>
                                    <p className='text-2xl font-medium'>{users.length}</p>
                                    <p className='text-sm'>Total Members</p>
                                </div>
                            </div>
                            <Link to='/admin/users'><FaCaretRight className='text-3xl text-primary'></FaCaretRight></Link>
                        </div>
                        <div className='flex items-center justify-between gap-3 bg-white px-6 py-8 rounded-xl shadow-lg'>
                            <div className='flex items-center gap-3'>
                                <RiTeamFill className='text-4xl text-primary'></RiTeamFill>
                                <div>
                                    <p className='text-2xl font-medium'>{batches.length}</p>
                                    <p className='text-sm'>Total Batches</p>
                                </div>
                            </div>
                            <Link to='/admin/batches'><FaCaretRight className='text-3xl text-primary'></FaCaretRight></Link>
                        </div>
                        <div className='flex items-center justify-between gap-3 bg-white px-6 py-8 rounded-xl shadow-lg'>
                            <div className='flex items-center gap-3'>
                                <RiCalendarCheckFill className='text-4xl text-primary'></RiCalendarCheckFill>
                                <div>
                                    <p className='text-2xl font-medium'>{attendance.length}</p>
                                    <p className='text-sm'>Total Attendance</p>
                                </div>
                            </div>
                            <Link to='/admin/absentees'><FaCaretRight className='text-3xl text-primary'></FaCaretRight></Link>
                        </div>
                        <div className='flex items-center justify-between gap-3 bg-white px-6 py-8 rounded-xl shadow-lg'>
                            <div className='flex items-center gap-3'>
                                <FaReceipt className='text-4xl text-primary'></FaReceipt>
                                <div>
                                    <p className='text-2xl font-medium'>₹ {payments.length}</p>
                                    <p className='text-sm'>Total Payments</p>
                                </div>
                            </div>
                            <Link to='/admin/payments'><FaCaretRight className='text-3xl text-primary'></FaCaretRight></Link>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Statistics;