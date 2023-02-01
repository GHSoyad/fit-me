import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../../../Contexts/AuthContext';

const TransformationModal = ({ refetch, setShowModal }) => {

    const { userInfo } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const [formLoading, setFormLoading] = useState(false);

    // Post transformation
    const handleForm = (data) => {
        setFormLoading(true);
        const date = format(new Date(), 'dd/MM/yyyy');

        const transformation = {
            email: userInfo.email,
            date: date,
            weight: data.weight,
            preWeight: data.preWeight,
            postWeight: data.postWeight,
            height: data.height,
            chest: data.chest,
            waist: data.waist,
            thigh: data.thigh,
            arms: data.arms,
            fat: data.fat
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/transformation`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('cadenceSecretToken')}`
            },
            body: JSON.stringify(transformation)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    toast.success('Record Saved');
                    setShowModal(false);
                }
            })
            .catch(error => toast.error(error.message))
            .finally(() => setFormLoading(false))
    }

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="transformation-modal" className="modal-toggle" />
            <label htmlFor="transformation-modal" className="modal cursor-pointer">
                <label className="modal-box relative max-w-xl NoScrollbar" htmlFor="">
                    <label htmlFor="transformation-modal" className="absolute top-3 right-6 text-xl text-danger cursor-pointer"><FaTimes></FaTimes></label>
                    <form onSubmit={handleSubmit(handleForm)} className='pt-4 lg:pt-6 rounded-lg flex flex-col gap-3 md:gap-4 flex-1 mx-auto'>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Early Morning Weight</label>
                            <input {...register('weight')} type="number" step="any" placeholder="KG" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Weight Before Workout</label>
                            <input {...register('preWeight')} type="number" step="any" placeholder="KG" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Weight After Workout</label>
                            <input {...register('postWeight')} type="number" step="any" placeholder="KG" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Height</label>
                            <input {...register('height')} type="number" step="any" placeholder="Centimeter" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Chest</label>
                            <input {...register('chest')} type="number" step="any" placeholder="Inches" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Waist</label>
                            <input {...register('waist')} type="number" step="any" placeholder="Inches" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Thigh</label>
                            <input {...register('thigh')} type="number" step="any" placeholder="Inches" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Arms</label>
                            <input {...register('arms')} type="number" step="any" placeholder="Inches" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='sm:flex gap-2 items-center'>
                            <label className='text-sm sm:text-base font-medium sm:w-2/5'>Fat</label>
                            <input {...register('fat')} type="number" step="any" placeholder="Percentage" className="input h-10 border-primary w-full sm:w-3/5 mt-1 sm:mt-0" required />
                        </div>
                        <div className='flex justify-between gap-4 sm:gap-6 mt-6'>
                            <label htmlFor="transformation-modal" className='btn flex-1 border-0'>Close</label>
                            <button type='submit' className='btn flex-1 bg-primary hover:bg-blue-600 border-0' disabled={formLoading}>Save</button>
                        </div>
                    </form>
                </label>
            </label>
        </div>
    );
};

export default TransformationModal;