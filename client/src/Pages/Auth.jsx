import React, { useState, useContext } from 'react';
import baseLogo from "../Assets/base-logo.svg";
import girlImage from '../Assets/girl-pic.svg';
import gitHubLogo from '../Assets/github.svg';
import discordLogo from '../Assets/discord.svg';
import linkedinLogo from '../Assets/linkedin.svg';
import twitterLogo from '../Assets/twitter.svg';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import baseLogoSm from "../Assets/base-logo-sm.svg"
import { DarkModeContext } from '../Components/DarkModeContext/DarkModeContext';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isDarkMode } = useContext(DarkModeContext);


  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className='flex gap-5 md:p-2'>
      <div className='lg:w-1/2 bg-[#605bff] min-h-screen m-2 me-10 rounded-xl px-10 py-8 hidden lg:block'>
        <div className='bg-[#767efd] h-full rounded-xl ps-7 pt-7 relative'>
          <div className='flex flex-col gap-5'>
            <div className='bg-white flex items-center justify-center gap-2 px-3 py-2 rounded-full w-fit'>
              <img src={baseLogo} alt="Base_Logo" className='h-5 w-5' />
              <span className='font-montserrat font-bold'>Base</span>
            </div>
            <p className='font-lato mt-5 text-4xl font-semibold text-white w-[70%] leading-snug'>
              Generate detailed reports with just one click
            </p>
            <img
              src={girlImage}
              className='absolute bottom-0 right-0 h-96 pt-5 '
              alt="Girl-Image"
            />
          </div>
        </div>
      </div>
      <div className='flex min-h-screen flex-col w-full md:w-1/2 md:mb-20 md:my-24'>
        <div className='bg-[#605BFF] h-16 md:hidden flex items-center gap-3 px-5 py-2 mb-5'>
          <div className='h-9 w-9 '>
            <img src={baseLogoSm} alt="Base-Logo" className='h-full w-full' />
          </div>
          <p className={`font-semibold font-montserrat text-xl text-white`}>
            Base
          </p>
        </div>
        {isLogin ? (
          <Login switchToRegister={switchToRegister} />
        ) : (
          <Register switchToLogin={switchToLogin} />
        )}
        <div className='w-full flex justify-center gap-8 items-center my-10 md:my-20'>
          {[gitHubLogo, twitterLogo, linkedinLogo, discordLogo].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo-${index}`}
              className='hover:cursor-pointer hover:scale-110 duration-100'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
