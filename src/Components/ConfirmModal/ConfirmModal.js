import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ConfirmModal = ({ data, cancel, confirm, loading, children }) => {
    return (
        <div>
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <label htmlFor="confirm-modal" className="modal cursor-pointer">
                <label className="modal-box relative max-w-xl" htmlFor="">
                    <label htmlFor="confirm-modal" className="absolute top-3 right-3 text-xl text-danger cursor-pointer"><FaTimes></FaTimes></label>
                    {children}
                    <div className='flex justify-between gap-4 sm:gap-6 mt-10'>
                        <label onClick={() => cancel(null)} htmlFor="add-batch-modal" className='btn flex-1 border-0'>Close</label>
                        <button onClick={() => confirm(data._id)} type='submit' className='btn flex-1 bg-danger hover:bg-rose-600 border-0' disabled={loading}>Delete</button>
                    </div>
                </label>
            </label>
        </div>
    );
};

export default ConfirmModal;