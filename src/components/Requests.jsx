import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { BASE_API_URL } from '../utils/constants';

const Requests = () => {
    const [requests, setrequests] = useState();
    useEffect(() => {
        fetchRequests();
    }, []);
    const fetchRequests = async () => {
        try {
            const res = await axiosInstance.get(BASE_API_URL + 'user/requests/recieved');
            if (res?.data?.isSuccess) {
                setrequests(res?.data?.data);
            }
        } catch (error) {}
    };
    const reviewRequest = async (status, id) => {
        try {
            const res = await axiosInstance.post(BASE_API_URL + `request/review/${status}/${id}`);
            if (res.data.isSuccess) {
                fetchRequests();
            }
        } catch (error) {}
    };
    if (!requests?.length) {
        return <p className="flex justify-center mt-10 text-sm">No Requests Found</p>;
    }
    return (
        <div className="flex flex-col items-center m-5 gap-4">
            <h1 className="text-xl font-bold">Connection Requests</h1>
            {requests?.map((request, index) => {
                const { firstName, lastName, age, gender, about, photoUrl } = request?.fromUserId;
                return (
                    <div key={index} className="card bg-neutral text-neutral-content rounded-2xl md:w-1/2 w-full">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4 p-4">
                                <img className="w-16 rounded-full" src={photoUrl} alt="Not Found" />
                                <div>
                                    <h2 className="font-semibold">{firstName + ' ' + lastName}</h2>
                                    {age && gender && <p className="text-sm">{age + ', ' + gender}</p>}
                                    <p className="text-sm">{about}</p>
                                </div>
                            </div>
                            <div className="card-actions justify-start gap-2 mr-4">
                                <button className="btn bg-red-500 btn-circle" onClick={() => reviewRequest('rejected', request?._id)}>
                                    X
                                </button>
                                <button className="btn bg-green-500 btn-circle" onClick={() => reviewRequest('accepted', request?._id)}>
                                    ✔️
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;
