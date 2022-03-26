import axios from 'axios';

const GOALS_URL = '/api/goals';

const getAll = async (token) => {
    const response = await axios.get(GOALS_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const createGoal = async (goal, token) => {
    const response = await axios.post(
        GOALS_URL,
        { text: goal.text },
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return response.data;
};

const deleteGoal = async (goal, token) => {
    const response = await axios.delete(GOALS_URL + '/' + goal._id, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const updateGoal = async (goal, newGoal, token) => {
    const response = await axios.put(
        GOALS_URL + '/' + goal._id,
        { text: newGoal.text },
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return response.data;
};

export const goalsService = {
    getAll,
    createGoal,
    deleteGoal,
    updateGoal,
};
