import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteGoalAsync, reset } from '../features/goals/goalsSlice';

export const GoalItem = ({ goal, showUpdateModal }) => {
    const { lastGoal, isDeleted, isUpdated } = useSelector(
        (state) => state.goals,
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (isDeleted && lastGoal._id === goal._id) {
            toast.success(`Goal "${lastGoal.text}" deleted successfully!`);
            dispatch(reset());
            return;
        }
        if (isUpdated && lastGoal._id === goal._id) {
            toast.success(`Goal "${lastGoal.text}" updated successfully!`);
            dispatch(reset());
            return;
        }
    }, [dispatch, goal, lastGoal, isDeleted, isUpdated]);
    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('ru-RU')}</div>
            <h2>{goal.text}</h2>
            <button
                onClick={() => dispatch(deleteGoalAsync(goal))}
                className='close'
            >
                &times;
            </button>
            <button onClick={() => showUpdateModal(goal)} className='edit'>
                &#9998;
            </button>
        </div>
    );
};
