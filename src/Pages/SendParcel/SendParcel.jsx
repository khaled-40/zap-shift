import React from 'react';
import { useForm, useWatch, Watch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { register,
         handleSubmit,
          control, 
        // formState: { errors } 
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    // console.log(user?.email)
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const recieverRegion = useWatch({ control, name: 'recieverRegion' })
    // console.log(regions)
    // console.log(serviceCenters)
    const handleSendParcel = (data) => {
        console.log(data)
        const isDocumentType = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict == data.recieverDistrict;
        console.log(isSameDistrict, isDocumentType)
        const parcelWeight = parseFloat(data.parcelWeight);
        let cost = 0;
        if (isDocumentType) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const extraWeight = data.parcelWeight - 3;
                cost = isSameDistrict ? extraWeight * 40 + 110 : extraWeight * 40 + 150 + 40;
            }
        }
        data.cost = cost;
        // data.createdAt = new Date();
        Swal.fire({
            title: "Do You Agree With Our Pricing",
            text: `You have to pay BDT ${cost}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I agree"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.post('/parcels', data)
                .then(res => {
                    console.log(res.data);
                })
                

                Swal.fire({
                    title: "Success",
                    text: "Your parcel request has been taken successfully",
                    icon: "success"
                });
            }
        });
    }
    const districtByRegions = region => {
        const filterServiceCenters = serviceCenters.filter(c => c.region === region);
        const districts = filterServiceCenters.map(d => d.district);
        return districts
    }

    // console.log(districtByRegions('Dhaka'))
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
                               defaultValue={user?.displayName}  readOnly/>


                            <label className="label">Sender Email</label>
                            <input type="text" className="input w-full" {...register('senderEmail')}
                               defaultValue={user?.email} readOnly/>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register('senderRegion')} defaultValue="Pick a Region" className="select w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>


                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select {...register('senderDistrict')} defaultValue="Pick a District" className="select w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtByRegions(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                                <span className="label">Optional</span>
                            </fieldset>

                            <label className="label">Address</label>
                            <input type="text" className="input w-full" {...register('senderAddress')}
                                placeholder="Sender Address" />

                            <label className="label">Sender Phone No.</label>
                            <input type="number" className="input w-full" {...register('senderPhone')}
                                placeholder="Your Phone No" />


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

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Regions</legend>
                                <select {...register('recieverRegion')} defaultValue="Pick a Region" className="select w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>


                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Districts</legend>
                                <select {...register('recieverDistrict')} defaultValue="Pick a District" className="select w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtByRegions(recieverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                                <span className="label">Optional</span>
                            </fieldset>

                            <label className="label">Reciever Address</label>
                            <input type="text" className="input w-full" {...register('recieverAddress')}
                                placeholder="Sender Address" />

                            <label className="label">Reciever Phone No.</label>
                            <input type="number" className="input w-full" {...register('recieverPhone')}
                                placeholder="Your Phone No" />


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