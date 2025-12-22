import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSendParcel = (data) => {
        console.log(data)
    }
    return (
        <div className='my-8'>
            <h2 className='text-5xl font-bold mb-5'>Send A Parcel</h2>
            <h3 className='text-2xl font-bold py-2 border-b border-gray-400'>Enter Your Parcel Details</h3>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-8 p-4'>
                {/* Document Type  */}
                <div>
                    <label className="label mr-4">
                        <input type="radio" value="document"{...register('parcelType')}
                            className="radio" defaultChecked />
                        Document</label>
                    <label className="label">
                        <input type="radio" value="non-document"{...register('parcelType')}
                            className="radio" />
                        Non Document</label>
                </div>
                {/* Parcel Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-black border-b border-gray-400 pb-8 mt-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" className="input w-full" {...register('parcelName')}
                            placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" className="input w-full" {...register('parcelWeight')}
                            placeholder="Parcel Weight" />
                    </fieldset>
                </div>
                {/* Two column details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
                    {/* sender details */}
                    <div className='space-y-2'>
                        <h4 className='text-2xl font-semibold'>Reciever Details</h4>
                        <fieldset className="fieldset">
                            <label className="label">Sender Name</label>
                            <input type="text" className="input w-full" {...register('senderName')}
                                placeholder="Sender Name" />

                            <label className="label">Address</label>
                            <input type="text" className="input w-full" {...register('senderAddress')}
                                placeholder="Sender Address" />

                            <label className="label">Sender Phone No.</label>
                            <input type="number" className="input w-full" {...register('senderPhone')}
                                placeholder="Your Phone No" />

                            <label className="label">District</label>
                            <input type="text" className="input w-full" {...register('senderDistrict')}
                                placeholder="Your District" />

                            <label className="label">Pick Up Instruction</label>
                            <textarea className="textarea textarea-bordered w-full" {...register('pickUpInstruction')} placeholder='Pick Up Instruction'></textarea>
                        </fieldset>

                    </div>
                    {/* Reciever details */}
                    <div className='space-y-2'>
                        <h4 className='text-2xl font-semibold'>Reciever Details</h4>
                        <fieldset className="fieldset">
                            <label className="label">Reciever Name</label>
                            <input type="text" className="input w-full" {...register('recieverName')}
                                placeholder="Sender Name" />

                            <label className="label">Reciever Address</label>
                            <input type="text" className="input w-full" {...register('recieverAddress')}
                                placeholder="Sender Address" />

                            <label className="label">Reciever Phone No.</label>
                            <input type="number" className="input w-full" {...register('recieverPhone')}
                                placeholder="Your Phone No" />

                            <label className="label">Reciever District</label>
                            <input type="text" className="input w-full" {...register('recieverDistrict')}
                                placeholder="Your District" />

                            <label className="label">Delivery Instruction</label>
                            <textarea className="textarea textarea-bordered w-full" {...register('delilveryInstruction')} placeholder='Delivery Instruction'></textarea>
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;