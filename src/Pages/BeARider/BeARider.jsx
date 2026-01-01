import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router';
import rider from '../../assets/agent-pending.png'
import Swal from 'sweetalert2';

const BeARider = () => {
    const { register,
        handleSubmit,
        control,
        // formState: { errors } 
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // console.log(user?.email)
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const riderRegion = useWatch({ control, name: 'riderRegion' })

    const districtByRegions = region => {
        const filterServiceCenters = serviceCenters.filter(c => c.region === region);
        const districts = filterServiceCenters.map(d => d.district);
        return districts
    }

    const handleRiderApplication = (data) => {
        console.log(data)
        axiosSecure.post('/riders', data)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Your application has been sent to check.
                         We will reach you in 30 days`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    return (
        <div className='p-1 mt-8'>
            <h2 className='font-bold text-5xl'>BE A RIDER</h2>
            <form onSubmit={handleSubmit(handleSubmit(handleRiderApplication))} className='mt-8 p-4'>

                {/* Two column details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* rider details */}
                    <div className='space-y-2'>
                        <h4 className='text-2xl font-semibold'>Tell us about yourself</h4>
                        <fieldset className="fieldset">
                            <label className="label">Rider Name</label>
                            <input type="text" className="input w-full" {...register('riderName')}
                                defaultValue={user?.displayName} />


                            <label className="label">Rider Email</label>
                            <input type="text" className="input w-full" {...register('riderEmail')}
                                defaultValue={user?.email} readOnly />

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register('riderRegion')} defaultValue="Pick a Region" className="select w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>


                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select {...register('riderDistrict')} defaultValue="Pick a District" className="select w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtByRegions(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>

                            </fieldset>

                            <label className="label">Address</label>
                            <input type="text" className="input w-full" {...register('riderAddress')}
                                placeholder="rider Address" />

                            <label className="label">Rider Phone No.</label>
                            <input type="number" className="input w-full" {...register('riderPhone')}
                                placeholder="Your Phone No" />

                            <label className="label">NID No.</label>
                            <input type="number" className="input w-full" {...register('nid')}
                                placeholder="Your NID No" />

                            <label className="label">Driving License No.</label>
                            <input type="number" className="input w-full" {...register('drivingLicesnse')}
                                placeholder="Your Driving License no" />

                            <label className="label">Bike Brand Model</label>
                            <input type="text" className="input w-full" {...register('bikeModel')}
                                placeholder="Bike Brand Model" />

                            <label className="label">Bike Registration No.</label>
                            <input type="number" className="input w-full" {...register('bikeRegistrationNo')}
                                placeholder="Bike Registration No." />


                            <label className="label">Tell Us About Yourself</label>
                            <input type="text" className="input w-full" {...register('about')}
                                placeholder="Tell Us About Yourself" />


                        </fieldset>

                    </div>
                    {/* Reciever details */}
                    <div className='space-y-2'>
                        <img src={rider} alt="" />

                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black' value="Be A Rider" />
            </form>
        </div>
    );
};

export default BeARider;