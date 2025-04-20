import React, { useEffect, useState } from 'react';
import UserFeedCard from './UserFeedCard';
import axiosInstance from '../services/axiosInstance';
import { BASE_API_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/slices/userSlice';
const EditProfile = ({ user }) => {
    const dispatch = useDispatch();
    const [error, seterror] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        about: user?.about || '',
        skills: [],
        photoUrl: user?.photoUrl || '',
        age: user?.age || '',
        gender: user?.gender || '',
    });

    useEffect(() => {
        setProfileData({
            firstName: user?.firstName,
            lastName: user?.lastName,
            about: user?.about,
            skills: [],
            photoUrl: user?.photoUrl,
            age: user?.age,
            gender: user?.gender,
        });
    }, [user]);
    useEffect(() => {
        const interval = setInterval(() => setsuccessMsg(''), 3000);
        return () => {
            clearInterval(interval);
        };
    });
    const handleSave = async () => {
        try {
            seterror('');
            const res = await axiosInstance.patch(BASE_API_URL + 'profile/edit', profileData);
            if (res.data.isSuccess) {
                dispatch(addUser(profileData));
                setsuccessMsg(res?.data?.message);
            }
        } catch (err) {
            console.log('🚀 ~ handleSave ~ err:', err);
            seterror(err?.response?.data?.message);
        }
    };
    const handleProfileData = (e) => {
        setProfileData((prev) => {
            let temp = { ...prev };
            temp[e.target.name] = e.target.value || undefined;
            return temp;
        });
    };
    return (
        <>
            <div className="flex mt-10 justify-center gap-10 items-center flex-wrap">
                <div className="card bg-base-300 w-96 border-1 border-gray-600">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div className="">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input" value={profileData?.firstName} name="firstName" onChange={handleProfileData} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input" value={profileData?.lastName} name="lastName" onChange={handleProfileData} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age</legend>
                                <input type="text" className="input" value={profileData?.age} name="age" onChange={handleProfileData} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>{' '}
                                <select
                                    defaultValue="Pick a gender"
                                    className="select"
                                    name="gender"
                                    value={profileData?.gender || undefined}
                                    onChange={handleProfileData}
                                >
                                    <option disabled={true}>Pick a gender</option>
                                    <option>male</option>
                                    <option>female</option>
                                    <option>others</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                <textarea
                                    className="textarea"
                                    placeholder="Bio"
                                    value={profileData?.about}
                                    name="about"
                                    onChange={handleProfileData}
                                ></textarea>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo URL</legend>
                                <label className="input validator">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                        </g>
                                    </svg>
                                    <input
                                        type="url"
                                        required
                                        name="photoUrl"
                                        placeholder="https://"
                                        value={profileData?.photoUrl}
                                        pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                                        title="Must be valid URL"
                                        onChange={handleProfileData}
                                    />
                                </label>
                            </fieldset>
                        </div>
                        <p className="text-red-400">{error}</p>
                        <div className="card-actions justify-center mt-3">
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save Profile
                            </button>
                        </div>
                    </div>
                    {successMsg && (
                        <div className="toast toast-top toast-center">
                            <div className="alert alert-info">
                                <span>{successMsg}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <p className="absolute bg-emerald-600 right-0 p-3 z-10">Preview</p>
                    <UserFeedCard feedInfo={profileData} isButtonsDisabled={true} />
                </div>
            </div>
        </>
    );
};

export default EditProfile;
