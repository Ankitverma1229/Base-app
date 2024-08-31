import React, { useState } from 'react';
import './sidebar.css';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import dashboardLogo from "../../Assets/dashboard.svg";
import baseLogo from "../../Assets/base-home-logo.svg";
import uploadLogo from "../../Assets/upload.svg";
import notificationLogo from "../../Assets/notification.svg";
import invoiceLogo from "../../Assets/invoice.svg";
import scheduleLogo from "../../Assets/schedule.svg";
import calendarLogo from "../../Assets/calendar.svg";
import settingLogo from "../../Assets/setting.svg";
import { DarkModeContext } from '../DarkModeContext/DarkModeContext'; 
import { RxCross2 } from "react-icons/rx"; 
import { useContext } from 'react';

const Sidebar = ({ isSidebarVisible, closeSidebar }) => {
    const [isOpen, setIsOpen] = useState(true); 
    const { isDarkMode } = useContext(DarkModeContext); 


    const toggleSidebar = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <>
            <aside className={` h-[100%] md:h-auto md:min-h-screen transition-all duration-300 fixed md:static top-0 left-0 z-40 ${isOpen ? 'w-full md:w-64' : 'w-28'} ${isSidebarVisible ? 'block' : 'hidden'} md:block`}>
                <nav className={`h-full flex flex-col ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'}  shadow-sm py-5 relative`}>
                    <div className='p-4 pb-2 flex justify-between items-center '>
                        <div className='flex items-center gap-3'>
                            <div className='h-6 w-6 md:h-9 md:w-9'>
                                <img src={baseLogo} alt="Base-Logo" className='h-full w-full' />
                            </div>
                            {isOpen && (
                                <p className={`font-semibold font-montserrat text-xl ${isDarkMode ? 'text-[#FFFF]' : 'text-[#000000]'}`}>
                                    Base
                                </p>
                            )}
                        </div>
                        <button className={`p-1.5 hidden md:block rounded-lg text-[#6E6E6E] ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-gray-50'} ${isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-gray-100'}`} onClick={toggleSidebar}>
                            {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
                        </button>

                        <RxCross2 className={` ${isDarkMode ? 'text-[#FFFF]' : 'text-[#000000]'} text-xl font-extrabold hover:text-red-700 cursor-pointer md:hidden`} onClick={closeSidebar}/>
                    </div>
                    <ul className='flex-1 mt-10 space-y-4'>
                        <SidebarItem icon={dashboardLogo} label="Dashboard" isOpen={isOpen} />
                        <SidebarItem icon={uploadLogo} label="Upload" isOpen={isOpen} />
                        <SidebarItem icon={invoiceLogo} label="Invoice" isOpen={isOpen} />
                        <SidebarItem icon={scheduleLogo} label="Schedule" isOpen={isOpen} />
                        <SidebarItem icon={calendarLogo} label="Calendar" isOpen={isOpen} />
                        <SidebarItem icon={notificationLogo} label="Notification" isOpen={isOpen} />
                        <SidebarItem icon={settingLogo} label="Settings" isOpen={isOpen} />
                    </ul>
                </nav>
            </aside>
        </>
    );
};

const SidebarItem = ({ icon, label, isOpen }) => {
    return (
        <li className={` relative flex items-center gap-5 rounded-md py-2 px-4  group `}>
            <div className='h-6 w-6 p-0.5 bg-[#ffff]  rounded-md overflow-hidden'>
                <img src={icon} alt={label} className='w-full h-full' />
            </div>
            {isOpen && <span className='text-[#6E6E6E] font-montserrat group-hover:text-[#605BFF] font-semibold'>{label}</span>}
            {!isOpen && (
                <span className='absolute left-full ml-2 px-2 py-1 text-sm font-montserrat font-semibold text-gray-700  bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    {label}
                </span>
            )}
        </li>
    );
};

export default Sidebar;
