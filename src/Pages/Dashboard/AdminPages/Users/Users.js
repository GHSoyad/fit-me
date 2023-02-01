import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ScreenLoader from '../../../../Components/Loaders/ScreenLoader/ScreenLoader';

const Users = () => {

    const { isLoading: usersLoading, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_BASE_URL}/users`)
                .then(res => res.json())
    })

    return (
        <div>
            <div className='flex justify-between mb-6 gap-4 flex-wrap'>
                <h2 className='text-xl font-medium'>Users Record</h2>
                <button className="btn bg-primary hover:bg-blue-600 border-0">Add User</button>
            </div>
            {
                usersLoading ? <ScreenLoader></ScreenLoader> :
                    <div className="overflow-x-auto relative z-0">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, i) => <tr key={user._id}>
                                        <th>{i + 1}</th>
                                        <th>{user.name}</th>
                                        <th>{user.phone}</th>
                                        <th>{user.email}</th>
                                        <th className='flex gap-2 py-3 text-white'>
                                            <Link to={`/admin/user/${user.email}/View-User`} className='py-2 px-3 bg-primary hover:bg-blue-600 text-xl rounded-md'><FaEye></FaEye></Link>
                                            <span className='py-2 px-3 bg-primary hover:bg-blue-600 text-lg rounded-md cursor-pointer'><FaEdit></FaEdit></span>
                                            <span className='py-2 px-3 bg-danger hover:bg-rose-600 text-lg rounded-md cursor-pointer'><FaTrashAlt></FaTrashAlt></span>
                                        </th>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default Users;