import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGoalAsync } from '../features/goals/goalsSlice';

export const GoalUpdate = ({ isShown, onHide, goal }) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateGoalAsync({ goal, newGoal: { text } }));
        onHide();
    };
    return (
        <>
            {isShown && (
                <div className='modal-container'>
                    <div className='modal'>
                        <h3>Updating the "{goal.text}" goal</h3>
                        <section className='form'>
                            <form onSubmit={onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        name='textUpdate'
                                        id='textUpdate'
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        placeholder='Enter new text'
                                    />
                                </div>
                                <div className='form-group'>
                                    <button
                                        className='btn btn-block'
                                        type='submit'
                                    >
                                        Update Goal
                                    </button>
                                </div>
                            </form>
                        </section>
                        <button onClick={onHide} className='close'>
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
