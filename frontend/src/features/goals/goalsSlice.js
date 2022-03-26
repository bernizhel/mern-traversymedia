import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { goalsService } from './goalsService';

const initialState = {
    goals: [],
    firstLoading: true,
    lastGoal: null,
    isCreated: false,
    isDeleted: false,
    isUpdated: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getAllAsync = createAsyncThunk(
    'goals/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalsService.getAll(token);
        } catch (err) {
            const message =
                err?.response?.data?.message ?? err.message ?? err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const createGoalAsync = createAsyncThunk(
    'goals/createGoal',
    async (goal, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalsService.createGoal(goal, token);
        } catch (err) {
            const message =
                err?.response?.data?.message ?? err.message ?? err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const deleteGoalAsync = createAsyncThunk(
    'goals/deleteGoal',
    async (goal, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalsService.deleteGoal(goal, token);
        } catch (err) {
            const message =
                err?.response?.data?.message ?? err.message ?? err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const updateGoalAsync = createAsyncThunk(
    'goals/updateGoal',
    async ({ goal, newGoal }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalsService.updateGoal(goal, newGoal, token);
        } catch (err) {
            console.log(err.message);
            const message =
                err?.response?.data?.message ?? err.message ?? err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => ({
            ...initialState,
            goals: state.goals,
            firstLoading: false,
        }),
        goalsReset: () => ({ ...initialState, firstLoading: false }),
        setFirstLoading: (state) => ({ ...state, firstLoading: true }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAsync.fulfilled, (state, action) => {
                state.goals = action.payload;
                state.firstLoading = false;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getAllAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createGoalAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoalAsync.fulfilled, (state, action) => {
                state.lastGoal = action.payload;
                state.isCreated = true;
                state.isLoading = false;
            })
            .addCase(createGoalAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGoalAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoalAsync.fulfilled, (state, action) => {
                state.lastGoal = action.payload;
                state.isDeleted = true;
                state.isLoading = false;
            })
            .addCase(deleteGoalAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateGoalAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGoalAsync.fulfilled, (state, action) => {
                state.lastGoal = action.payload;
                state.isUpdated = true;
                state.isLoading = false;
            })
            .addCase(updateGoalAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

const goalsReducer = goalsSlice.reducer;

export const { reset, goalsReset, setFirstLoading } = goalsSlice.actions;
export { goalsReducer };
