import React, { useState, useContext } from 'react';
import { registerUser } from '../../Services/AuthServices';
import { DarkModeContext } from '../DarkModeContext/DarkModeContext';  

const Register = ({ switchToLogin }) => {
    const { isDarkMode } = useContext(DarkModeContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(formData, switchToLogin); 
    };

    return (
        <div className={`w-full flex flex-col items-start justify-center ps-24 ${isDarkMode ? 'text-[#FFFF]' : 'text-[#000000]'}`}>
            <h2 className='font-montserrat font-bold text-3xl'>Register</h2>
            <p className='font-lato font-semibold text-xl mt-1 mb-5'>Create a new account</p>
            <div className='w-[80%] mt-5'>
                <div className={`${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'} rounded-xl shadow-lg w-full p-7`}>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-2 font-bold text-sm'>
                            <label htmlFor="email" className='font-montserrat'>Email address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder='Enter your email'
                                className={`${isDarkMode ? 'bg-[#1e1e1efc]' : 'bg-[#F5F5F5]'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#605BFF] transition`}
                                required
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <div className='flex flex-col gap-2 font-bold text-sm'>
                            <label htmlFor="password" className='font-montserrat'>Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder='Enter your password'
                                className={`${isDarkMode ? 'bg-[#1e1e1efc]' : 'bg-[#F5F5F5]'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#605BFF] transition`}
                                required
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </div>
                        <div className='flex flex-col gap-2 font-bold text-sm'>
                            <label htmlFor="confirmPassword" className='font-montserrat'>Confirm Password</label> 
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder='Confirm your password'
                                className={`${isDarkMode ? 'bg-[#1e1e1efc]' : 'bg-[#F5F5F5]'} p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#605BFF] transition`}
                                required
                                onChange={handleChange}
                                value={formData.confirmPassword}
                            />
                        </div>
                        <button type="submit" className={`bg-[#605BFF] ${isDarkMode ? 'text-[#000000]' : 'text-[#FFFF]'} font-montserrat font-semibold text-md py-2 rounded-xl w-full hover:bg-[#4e47e5] transition`}>
                            Register
                        </button>
                    </form>
                </div>
                <p className='text-center text-sm mt-10 font-lato text-[#858585]'>
                    Already have an account?
                    <a href="#" onClick={switchToLogin} className='text-[#346BD4] font-montserrat font-semibold text-sm hover:underline'> Sign in here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
