import React, { useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { BASE_API_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import UserFeedCard from './UserFeedCard';
import { addFeed } from '../utils/slices/feedSlice';

const Feed = () => {
    const dispatch = useDispatch();
    const feedInfo = useSelector((state) => state.feed);
    const fetchFeed = async () => {
        try {
            const res = await axiosInstance.get(BASE_API_URL + 'user/feed');
            dispatch(addFeed(res?.data?.data));
        } catch (err) {}
    };
    useEffect(() => {
        fetchFeed();
    }, []);
    if (!feedInfo?.length) {
        return <p className="flex justify-center mt-10 text-sm">No Connections Found</p>;
    }
    return (
        <div className="flex justify-center items-center mt-20">
            <UserFeedCard feedInfo={feedInfo?.[0]} />
        </div>
    );
};

export default Feed;
