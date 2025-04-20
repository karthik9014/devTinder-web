import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axiosInstance from '../services/axiosInstance';
import { BASE_API_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/slices/userSlice';
import { useEffect } from 'react';
const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const fetchUser = async() => {
        try {
            const res = await axiosInstance.get(BASE_API_URL+'profile/view')
            dispatch(addUser(res?.data?.data))
        } catch (err) {
            if (err.status === 401) {
                navigate('/login');
            }
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])
    
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Body;
