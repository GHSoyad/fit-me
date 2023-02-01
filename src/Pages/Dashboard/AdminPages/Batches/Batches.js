import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import ConfirmModal from '../../../../Components/ConfirmModal/ConfirmModal';
import ScreenLoader from '../../../../Components/Loaders/ScreenLoader/ScreenLoader';
import AddBatchModal from './AddBatchModal';

const Batches = () => {

    const [formModal, setFormModal] = useState(false);
    const [batch, setBatch] = useState({});
    const [deleteBatch, setDeleteBatch] = useState({});
    const [formLoading, setFormLoading] = useState(false);

    const { isLoading: batchesLoading, data: batches, refetch } = useQuery({
        queryKey: ['batches'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_BASE_URL}/batches`)
                .then(res => res.json())
    })

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/batches/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('cadenceSecretToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    toast.success('Batch Deleted');
                    setDeleteBatch(null)
                }
            })
            .catch(error => toast.error(error.message))
            .finally(() => setFormLoading(false))
    }

    return (
        <div>
            <div className='flex justify-between mb-6 gap-4 flex-wrap'>
                <h2 className='text-xl font-medium'>Batches List</h2>
                <label onClick={() => { setFormModal(true); setBatch({}) }} htmlFor="add-batch-modal" className="btn bg-primary hover:bg-blue-600 border-0">Add Batch</label>
            </div>
            {
                batchesLoading ? <ScreenLoader></ScreenLoader> :
                    <div className="overflow-x-auto relative z-0">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>Link</th>
                                    <th>Members</th>
                                    <th>Fees</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    batches.map((batch, i) => <tr key={batch._id}>
                                        <th>{i + 1}</th>
                                        <th>{batch.name}</th>
                                        <th>{batch.start}</th>
                                        <th><a href={batch.link} target="_blank" rel='noreferrer' className='py-2 px-4 bg-primary hover:bg-blue-600 rounded-md text-sm font-semibold text-white'>Join</a></th>
                                        <th>{batch.members}</th>
                                        <th>{batch.fees}</th>
                                        <th className='flex gap-2 py-3 text-white'>
                                            <span className='py-2 px-3 bg-primary hover:bg-blue-600 text-xl rounded-md cursor-pointer'><FaEye></FaEye></span>
                                            <label onClick={() => setBatch(batch)} htmlFor="add-batch-modal" className='py-2 px-3 bg-primary hover:bg-blue-600 text-lg rounded-md cursor-pointer'><FaEdit></FaEdit></label>
                                            <label onClick={() => setDeleteBatch(batch)} htmlFor="confirm-modal" className='py-2 px-3 bg-danger hover:bg-rose-600 text-lg rounded-md cursor-pointer'><FaTrashAlt></FaTrashAlt></label>
                                        </th>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
            {
                (formModal || batch) &&
                <AddBatchModal batch={batch} setBatch={setBatch} setFormModal={setFormModal} refetch={refetch}></AddBatchModal>
            }
            {
                deleteBatch &&
                <ConfirmModal data={deleteBatch} cancel={setDeleteBatch} confirm={handleDelete} loading={formLoading}>
                    <h3 className='text-2xl font-semibold'>Delete <span className='text-danger'>{deleteBatch.name}</span>?</h3>
                    <p className='text-lg font-medium mt-4'>Are you sure? This action cannot be undone!</p>
                </ConfirmModal>
            }
        </div>
    );
};

export default Batches;