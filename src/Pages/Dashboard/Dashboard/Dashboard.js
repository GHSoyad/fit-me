import React, { useContext } from 'react';
import ScreenLoader from '../../../Components/Loaders/ScreenLoader/ScreenLoader';
import { AuthContext } from '../../../Contexts/AuthContext';
import Statistics from './AdminComponents/Statistics';
import Charts from './UserComponents/Charts';

const Dashboard = () => {

    const { userInfo, roleLoading } = useContext(AuthContext);

    return (
        <div>
            {
                roleLoading ? <ScreenLoader></ScreenLoader>
                    :
                    userInfo?.role === 'admin' ?
                        <div>
                            <Statistics></Statistics>
                        </div>
                        :
                        <div>
                            <h2 className='text-xl font-medium mb-6'>Charts</h2>
                            <Charts></Charts>
                        </div>
            }
        </div>
    );
};

export default Dashboard;