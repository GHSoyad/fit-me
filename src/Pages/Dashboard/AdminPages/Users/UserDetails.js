import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Charts from '../../Dashboard/UserComponents/Charts';

const UserDetails = () => {

    const email = useLoaderData();
    return (
        <div>
            <h2 className='text-xl font-medium mb-6'>User Charts</h2>
            <Charts email={email}></Charts>
        </div>
    );
};

export default UserDetails;