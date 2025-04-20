import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { BASE_API_URL } from '../utils/constants';

const Connections = () => {
    const [connections, setconnections] = useState([]);
    useEffect(() => {
        fetchConnections();
    }, []);
    const fetchConnections = async () => {
        try {
            const res = await axiosInstance.get(BASE_API_URL + 'user/connections');
            if (res.data.isSuccess) {
                setconnections(res?.data?.data);
            }
        } catch (error) {}
    };
    if (!connections?.length) {
        return <p className="flex justify-center mt-10 text-sm">No Connections Found</p>;
    }
    return (
        <div className="flex flex-col items-center m-5 gap-4">
            <h1 className="text-xl font-bold">Connections</h1>
            {connections?.map((connection,index) => {
                const { firstName, lastName, age, gender, about, photoUrl } = connection;
                return (
                    <div key={index} className="card bg-neutral text-neutral-content rounded-2xl md:w-1/2 w-full">
                        <div className="flex items-center gap-4 p-4">
                            <img className="w-16 rounded-full" src={photoUrl} alt="Not Found" />
                            <div>
                                <h2 className="font-semibold">{firstName + ' ' + lastName}</h2>
                                {age && gender && <p className="text-sm">{age + ', ' + gender}</p>}
                                <p className="text-sm">{about}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;
