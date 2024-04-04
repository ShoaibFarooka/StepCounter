import axiosInstance from './axiosInstance';

const userService = {

    registerUser: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/register', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    loginUser: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/login', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUsers: async () => {
        try {
            const response = await axiosInstance.get('/users/get-users');
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getProviders: async () => {
        try {
            const response = await axiosInstance.get('/users/providers');
            console.log(response)
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    stepCount: async (payload) => {
        try {
            const response = await axiosInstance.post(`/users/step-count`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    allowInputHandle: async () => {
        try {
            const response = await axiosInstance.get(`/users/allow-input`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    resetSteps: async () => {
        try {
            const response = await axiosInstance.patch(`/users/reset-steps`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};


export default userService;
