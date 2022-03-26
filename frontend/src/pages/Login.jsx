import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { loginAsync, reset } from '../features/auth/authSlice';
import { setFirstLoading } from '../features/goals/goalsSlice';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth,
    );
    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
            return;
        }
        if (isSuccess || user) {
            toast.success(`Welcome, ${user.name}!`);
            dispatch(reset());
            navigate('/');
            return;
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);
    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email,
            password,
        };
        dispatch(loginAsync(userData));
        dispatch(setFirstLoading());
    };
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Sign In</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                            autoComplete='email'
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter your password'
                            onChange={onChange}
                            autoComplete='current-password'
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};
