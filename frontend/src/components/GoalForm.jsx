import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createGoalAsync, reset } from '../features/goals/goalsSlice';

export const GoalForm = () => {
    const [text, setText] = useState('');
    const { lastGoal, isCreated } = useSelector((state) => state.goals);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isCreated) {
            toast.success(`Goal "${lastGoal.text}" created successfully!`);
            dispatch(reset());
        }
    }, [dispatch, lastGoal, isCreated]);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createGoalAsync({ text }));
        setText('');
    };
    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Enter your goal'
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    );
};
