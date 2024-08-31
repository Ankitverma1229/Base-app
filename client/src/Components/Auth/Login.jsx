import React, { useState, useContext } from 'react'; 
import googleLogo from "../../Assets/google-icon.svg";
import appleLogo from "../../Assets/apple.svg";
import { loginUser, googleLogin } from '../../Services/AuthServices'; 
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext/DarkModeContext';  

const Login = ({ switchToRegister }) => {
    const { isDarkMode } = useContext(DarkModeContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(formData, navigate); 
    };

    return (
        <div className={`w-full flex flex-col items-start justify-center px-5 lg:ps-24 ${isDarkMode ? 'text-[#FFFF]' : 'text-[#000000]'}`}>
            <h2 className={`font-montserrat font-bold text-2xl md:text-3xl`}>Sign In</h2>
            <p className={`font-lato font-semibold text-lg md:text-xl mt-1 mb-5`}>Sign in to your account</p>
            <div className='w-auto'>
                <div className='flex gap-2 md:gap-4 mb-6'>
                    <button 
                        className={`flex items-center gap-1 md:gap-0 justify-center ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'} shadow-md px-3 md:px-4 py-2 rounded-lg ${isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-gray-100'} transition`}
                        onClick={googleLogin} 
                    >
                        <img src={googleLogo} alt="Google Icon" className='w-3 h-3 lg:w-4 lg:h-4 lg:mr-3' />
                        <span className='text-[#858585] font-montserrat font-medium text-[0.6rem] lg:text-sm'>Sign in with Google</span>
                    </button>
                    <button 
                        className={`flex items-center gap-1 md:gap-0 justify-center ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'} shadow-md px-3 md:px-4 py-2 rounded-lg ${isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-gray-100'} transition`}
                    >
                        <img src={appleLogo} alt="Apple Icon" className='w-3 h-3 lg:w-4 lg:h-4 lg:mr-3' />
                        <span className='text-[#858585] font-montserrat font-medium text-[0.6rem] lg:text-sm'>Sign in with Apple</span>
                    </button>
                </div>
                <div className={`${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'} rounded-xl shadow-lg w-full px-3 py-5 md:p-7`}>
                    <form className='flex flex-col gap-3 md:gap-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-2 font-bold text-xs md:text-sm'>
                            <label htmlFor="email" className='font-montserrat'>Email address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder='Enter your email'
                                className='bg-[#F5F5F5] p-2 md:p-3 text-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#605BFF] transition'
                                required
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <div className='flex flex-col gap-2 font-bold text-xs md:text-sm'>
                            <label htmlFor="password" className='font-montserrat'>Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder='Enter your password'
                                className='bg-[#F5F5F5] p-2 md:p-3 text-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#605BFF] transition'
                                required
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </div>
                        <div>
                            <a href="#" className='text-[#346BD4] font-montserrat font-semibold text-xs md:text-sm hover:underline'>Forgot Password?</a>
                        </div>
                        <button 
                            type="submit" 
                            className={`bg-[#605BFF] ${isDarkMode ? 'text-[#000000]' : 'text-[#FFFF]'} font-montserrat font-semibold text-sm md:text-md py-2 rounded-xl w-full hover:bg-[#4e47e5] transition`}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
                <p className='text-center text-sm mt-5 md:mt-10 font-lato text-[#858585]'>
                    Don't have an account? 
                    <a href="#" onClick={switchToRegister} className='text-[#346BD4] font-montserrat font-semibold text-sm hover:underline'> Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
