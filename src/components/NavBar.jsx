import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { BASE_API_URL } from '../utils/constants';
import { removeUser } from '../utils/slices/userSlice';

const NavBar = () => {
    const userData = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = async () => {
        try {
            const res = await axiosInstance.post(BASE_API_URL + 'logout');
            if (res.data.isSuccess) {
                navigate('/login');
                dispatch(removeUser());
            }
        } catch (err) {}
    };
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <div className="flex">
                    <Link to={'/'} className="btn btn-ghost text-xl">
                        🧑🏻DevTinder
                    </Link>
                </div>
            </div>
            {userData && (
                <div className="flex gap-3 items-center">
                    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}

                    <p>Welcome, {userData.firstName}</p>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={userData?.photoUrl} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to={'/profile'} className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/connections'}>Connections</Link>
                            </li>
                            <li>
                                <Link to={'/requests'}>Requests</Link>
                            </li>
                            <li>
                                <a onClick={handleLogOut}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
