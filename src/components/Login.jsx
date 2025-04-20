import { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../utils/constants';
const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [isLogin, setisLogin] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axiosInstance.post(BASE_API_URL + 'login', { emailId: email, password });
            if (res?.data?.isSuccess) {
                dispatch(addUser(res?.data?.data));
                navigate('/');
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };
    const handleSignUp = async () => {
        try {
            const res = await axiosInstance.post(BASE_API_URL + 'signup', { emailId: email, password, firstName, lastName });
            if (res?.data?.isSuccess) {
                dispatch(addUser(res?.data?.data));
                navigate('/profile');
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };
    return (
        <div className="card bg-base-100 w-96 border-1 border-gray-600 m-auto mt-40">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLogin ? 'Login' : 'SignUp'}</h2>
                {!isLogin && (
                    <>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="email" className="input" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">LastName</legend>
                            <input type="email" className="input" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                        </fieldset>
                    </>
                )}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email ID</legend>
                    <input type="email" className="input" value={email} onChange={(e) => setemail(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="password" className="input" value={password} onChange={(e) => setpassword(e.target.value)} />
                </fieldset>
                <p className="text-red-400">{error}</p>
                <div className="card-actions justify-center mt-3">
                    <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignUp}>
                        {isLogin ? 'Login' : 'SignUp'}
                    </button>
                </div>
                <div className="text-center mt-2">
                    {isLogin ? (
                        <p>
                            New User? &nbsp;
                            <span className="text-blue-500 font-bold cursor-pointer" onClick={() => setisLogin((prev) => !prev)}>
                                SignUp
                            </span>
                        </p>
                    ) : (
                        <p>
                            Existing User? &nbsp;
                            <span className="text-blue-500 font-bold cursor-pointer" onClick={() => setisLogin((prev) => !prev)}>
                                Login
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
