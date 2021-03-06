import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ?? null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (err) {
            const message =
                err?.response?.data?.message ?? err.message ?? err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (err) {
            const message =
                err?.response?.data?.message ?? err.message ?? err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => ({ ...initialState, user: state.user }),
        userReset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.user = null;
            });
    },
});

const authReducer = authSlice.reducer;

export const { reset, userReset } = authSlice.actions;
export { authReducer };
