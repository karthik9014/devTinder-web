import React, { useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { BASE_API_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../utils/slices/feedSlice';

const UserFeedCard = ({ feedInfo, isButtonsDisabled = false }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, photoUrl, about } = feedInfo ?? {};

    const handleUserInterest = async (status, userId) => {
        try {
            const res = await axiosInstance.post(BASE_API_URL + `request/send/${status}/${userId}`);
            if (res?.data?.isSuccess) {
                dispatch(removeUserFeed(userId));
            }
        } catch (error) {}
    };
    return (
        feedInfo && (
            <div className="card bg-base-300 shadow-sm">
                <figure>
                    <img src={photoUrl} className="w-96" alt="Image Not Found" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                    <p>{about}</p>
                    <div className={`card-actions justify-start gap-2 mt-2 ${isButtonsDisabled && 'pointer-events-none'}`}>
                        <button className="btn bg-red-500" onClick={() => handleUserInterest('ignored', _id)}>
                            Ignore
                        </button>
                        <button className="btn btn-primary" onClick={() => handleUserInterest('interested', _id)}>
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default UserFeedCard;
