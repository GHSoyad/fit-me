import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

const AddBatchModal = ({ batch, setBatch, setFormModal, refetch }) => {
    const [formLoading, setFormLoading] = useState(false);
    console.log("hit")
    // Post Batch
    const handleForm = (e) => {
        e.preventDefault();
        setFormLoading(true);
        const form = e.target;

        const addBatch = {
            id: batch._id,
            name: form.name.value,
            link: form.link.value,
            start: form.start.value,
            end: form.end.value,
            fees: form.fees.value
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/batches`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('cadenceSecretToken')}`
            },
            body: JSON.stringify(addBatch)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    if (data.upsertedCount === 1) {
                        toast.success('Batch Added');
                    }
                    if (data.modifiedCount === 1) {
                        toast.success('Batch Updated');
                    }
                    setFormModal(false);
                    setBatch(null);
                }
            })
            .catch(error => toast.error(error.message))
            .finally(() => setFormLoading(false))
    }

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="add-batch-modal" className="modal-toggle" />
            <label htmlFor="add-batch-modal" className="modal cursor-pointer">
                <label className="modal-box relative max-w-xl" htmlFor="">
                    <label htmlFor="add-batch-modal" className="absolute top-3 right-6 text-xl text-danger cursor-pointer"><FaTimes></FaTimes></label>
                    <form onSubmit={(e) => handleForm(e)} className='pt-4 lg:pt-6 rounded-lg flex flex-col gap-3 md:gap-4 flex-1 mx-auto'>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Batch Name</label>
                            <input name='name' defaultValue={batch?.name} type="text" placeholder="Name" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Batch Link</label>
                            <input name='link' defaultValue={batch?.link} type="text" placeholder="Link" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Start Time</label>
                            <input name='start' defaultValue={batch?.start} type="time" placeholder="Time" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>End Time</label>
                            <input name='end' defaultValue={batch?.end} type="time" placeholder="Centimeter" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Fees</label>
                            <input name='fees' defaultValue={batch?.fees} type="number" placeholder="Rupees" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='flex justify-between gap-4 sm:gap-6 mt-6'>
                            <label htmlFor="add-batch-modal" className='btn flex-1 border-0'>Close</label>
                            <button type='submit' className='btn flex-1 bg-primary hover:bg-blue-600 border-0' disabled={formLoading}>{batch?._id ? "Update" : "Add"}</button>
                        </div>
                    </form>
                </label>
            </label>
        </div>
    );
};

export default AddBatchModal;