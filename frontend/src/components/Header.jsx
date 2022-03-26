import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync, userReset } from '../features/auth/authSlice';
import { goalsReset } from '../features/goals/goalsSlice';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const onLogout = () => {
        dispatch(logoutAsync());
        dispatch(userReset());
        dispatch(goalsReset());
        navigate('/');
    };
    return (
        <header className='header'>
            <div className='logo'>
                {user ? (
                    <Link to='/'>Goalsetter</Link>
                ) : (
                    <Link to='/login'>Goalsetter</Link>
                )}
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Log Out
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};
