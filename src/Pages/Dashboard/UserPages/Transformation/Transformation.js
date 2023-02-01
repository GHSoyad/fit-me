import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import ScreenLoader from '../../../../Components/Loaders/ScreenLoader/ScreenLoader';
import { AuthContext } from '../../../../Contexts/AuthContext';
import TransformationModal from './TransformationModal';

const Transformation = () => {

    const { userInfo } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    // Get transformation data
    const { isLoading, data: transformations, refetch } = useQuery({
        queryKey: ['transformations'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_BASE_URL}/transformation?email=${userInfo.email}`)
                .then(res => res.json())
    })

    return (
        <div>
            <div className='flex justify-between mb-6 gap-4 flex-wrap'>
                <h2 className='text-xl font-medium'>Transformation Record</h2>
                <label onClick={() => setShowModal(true)} htmlFor="transformation-modal" className="btn bg-primary hover:bg-blue-600 border-0">Add Transformation</label>
            </div>
            {
                isLoading ? <ScreenLoader></ScreenLoader> :
                    <div className="overflow-x-auto relative z-0">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Weight</th>
                                    <th>Pre Weight</th>
                                    <th>Post Weight</th>
                                    <th>Height</th>
                                    <th>Chest</th>
                                    <th>Waist</th>
                                    <th>Thigh</th>
                                    <th>Arms</th>
                                    <th>Fat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transformations.map((t, i) => <tr key={t._id}>
                                        <th>{i + 1}</th>
                                        <th>{t.date}</th>
                                        <th>{t.weight}</th>
                                        <th>{t.preWeight}</th>
                                        <th>{t.postWeight}</th>
                                        <th>{t.height}</th>
                                        <th>{t.chest}</th>
                                        <th>{t.waist}</th>
                                        <th>{t.thigh}</th>
                                        <th>{t.arms}</th>
                                        <th>{t.fat}</th>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
            {
                showModal && <TransformationModal setShowModal={setShowModal} refetch={refetch} ></TransformationModal>
            }
        </div>
    );
};

export default Transformation;