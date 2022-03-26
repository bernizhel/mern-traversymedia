import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { GoalForm } from '../components/GoalForm';
import { GoalItem } from '../components/GoalItem';
import { getAllAsync, reset } from '../features/goals/goalsSlice';
import { GoalUpdate } from '../components/GoalUpdate';

export const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        goals,
        firstLoading,
        isCreated,
        isDeleted,
        isUpdated,
        isSuccess,
        isLoading,
        isError,
        message,
    } = useSelector((state) => state.goals);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (
            firstLoading ||
            (user !== null && (isCreated || isDeleted || isUpdated))
        ) {
            dispatch(getAllAsync());
        }
    }, [dispatch, firstLoading, isCreated, isDeleted, isUpdated, user]);
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        if (isError) {
            toast.error(message);
            dispatch(reset());
            return;
        }
        if (isSuccess) {
            toast.info(`Fetched ${goals.length} goals`);
            dispatch(reset());
            return;
        }
    }, [goals, user, dispatch, isError, isSuccess, message, navigate]);
    const [updatingGoal, setUpdatingGoal] = useState(null);
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <section className='heading'>
                <h1>Welcome {user?.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />
            <section className='content'>
                {goals.length > 0 ? (
                    <div className='goals'>
                        {goals
                            .map((goal) => (
                                <GoalItem
                                    key={goal._id}
                                    goal={goal}
                                    showUpdateModal={(goal) =>
                                        setUpdatingGoal(goal)
                                    }
                                />
                            ))
                            .reverse()}
                    </div>
                ) : (
                    <h3>You have no goals</h3>
                )}
            </section>
            <GoalUpdate
                isShown={updatingGoal}
                onHide={() => setUpdatingGoal(null)}
                goal={updatingGoal}
            />
        </>
    );
};
