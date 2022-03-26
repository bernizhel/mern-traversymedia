import axios from 'axios';

const AUTH_URL = '/api/users';

const register = async (user) => {
    const response = await axios.post(AUTH_URL + '/register', user);
    if (response?.data?.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (user) => {
    const response = await axios.post(AUTH_URL + '/login', user);
    if (response?.data?.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = async () => {
    localStorage.removeItem('user');
};

export const authService = {
    register,
    login,
    logout,
};
