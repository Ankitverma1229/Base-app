import axios from "axios";
import { toast } from "react-toastify";

const BackendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const registerUser = async (formData, switchToLogin) => {
    try {
        const { data } = await axios.post(`${BackendUrl}/api/auth/register`, formData); 
        toast.success(data.message);
        setTimeout(switchToLogin, 2000); 
    } catch (error) {
        const errorMessage = error.response?.data?.error || "Something went wrong."; 
        toast.error(errorMessage);
        return null; 
    }
};

export const loginUser = async (formData, navigate) => {
    try {
        const { data } = await axios.post(`${BackendUrl}/api/auth/login`, formData); 
        toast.success(data.message);
        setTimeout(() => navigate('/home'), 2000); 
        return data; 
    } catch (error) {
        const errorMessage = error.response?.data?.error || "Something went wrong.";
        toast.error(errorMessage);
        return null; 
    }
};

export const googleLogin = () => {
    window.open(`${BackendUrl}/auth/google/callback`, "_self"); 
};

export const getUserData = async () => {
    try {
        const { data } = await axios.get(`${BackendUrl}/api/auth/login/success`, { withCredentials: true }); // Destructured response data
        return data.user; 
    } catch (error) {
        return null; 
    }
};
