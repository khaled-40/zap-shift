import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaRegTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const handleApprove = (id, status,email) => {
        console.log(email)
        console.log(id, status);
        const updateInfo = { status: status, email };
        console.log(updateInfo)
        axiosSecure.patch(`/riders/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `This rider status has been ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    return (
        <div>
            <h2 className='text-5xl font-bold p-2 my-8'>Riders Pending Approval: {riders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL NO</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.riderName}</td>
                                <td>{rider.riderEmail}</td>
                                <td>{rider.riderDistrict}</td>
                                <td className={`${rider.status === 'approved' ? 'badge badge-success  text-white'
                                    : rider.status === 'rejected'?'badge badge-error  text-white':' text-black'} py-auto`}>{rider.status}</td>
                                <td>
                                    <button onClick={() => handleApprove(rider._id, 'approved',rider.riderEmail)} className='btn btn-sm'>
                                        <FaUserCheck />
                                    </button>
                                    <button onClick={() => handleApprove(rider._id, 'rejected')} className='btn btn-sm mx-2'>
                                        <IoPersonRemove />
                                    </button>
                                    <button className='btn btn-sm'>
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;