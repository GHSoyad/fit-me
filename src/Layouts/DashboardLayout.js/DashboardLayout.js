import React, { useContext, useEffect, useState } from 'react';
import { RiArrowRightLine, RiCalendarCheckFill, RiDashboardFill, RiLogoutCircleLine, RiMenu3Fill, RiMenuFill, RiMessage2Fill, RiSettings4Fill, RiTeamFill } from "react-icons/ri";
import { HiMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";
import { FaAppleAlt, FaChild, FaDumbbell, FaReceipt, FaUser } from "react-icons/fa";
import logo from '../../logo.png';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import ScreenLoader from '../../Components/Loaders/ScreenLoader/ScreenLoader';

const DashboardLayout = () => {

    const { userInfo, setUserInfo, signOutUser, userLoading, roleLoading } = useContext(AuthContext);
    const [toggle, setToggle] = useState(false);
    const [menuLinks, setMenuLinks] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                setUserInfo(null);
                navigate('/');
            })
            .catch(error => console.log(error.message))
    }

    const location = useLocation();
    const path = (location?.pathname).split('/');
    const pageTitle = path[path.length - 1] ? path[path.length - 1] : "Dashboard";

    const memberMenu = [
        { title: "Dashboard", link: "/", icon: <RiDashboardFill></RiDashboardFill> },
        { title: "Transformation", link: "/transformation", icon: <FaChild></FaChild> },
        { title: "Workout", link: "/workout", icon: <FaDumbbell></FaDumbbell> },
        { title: "Meal", link: "/meal", icon: <FaAppleAlt></FaAppleAlt> },
        { title: "Payment", link: "/payment", icon: <FaReceipt></FaReceipt> },
        { title: "Settings", link: "/settings", icon: <RiSettings4Fill></RiSettings4Fill> },
    ]

    const adminMenu = [
        { title: "Dashboard", link: "/", icon: <RiDashboardFill></RiDashboardFill> },
        { title: "Users", link: "/admin/users", icon: <FaUser></FaUser> },
        { title: "Batches", link: "/admin/batches", icon: <RiTeamFill></RiTeamFill> },
        { title: "Absentees", link: "/admin/absentees", icon: <RiCalendarCheckFill></RiCalendarCheckFill> },
        { title: "Meals", link: "/admin/meals", icon: <FaAppleAlt></FaAppleAlt> },
        { title: "Payments", link: "/admin/payments", icon: <FaReceipt></FaReceipt> },
        { title: "Message", link: "/admin/message", icon: <RiMessage2Fill></RiMessage2Fill> },
        { title: "Settings", link: "/settings", icon: <RiSettings4Fill></RiSettings4Fill> },
    ]

    useEffect(() => {
        if (userInfo?.role === 'admin') {
            setMenuLinks(adminMenu)
        } else {
            setMenuLinks(memberMenu)
        }
    }, [userInfo?.role])


    return (
        <>
            {
                userLoading || roleLoading ? <ScreenLoader></ScreenLoader>
                    :
                    <div className='bg-[#f5f8f1]'>
                        <header className={`flex justify-between items-center fixed top-0 w-full z-10 h-20 lg:h-28 bg-[#FBFBFB] px-8 transition-all duration-300 pl-20 ${toggle ? "lg:pl-20" : "lg:pl-80"}`}>
                            <div className='flex items-center gap-4 text-2xl lg:text-3xl pl-4 md:pl-6'>
                                <span onClick={() => setToggle(prev => !prev)} className='pt-1 text-primary transition-all duration-300 group cursor-pointer'>
                                    {
                                        toggle ?
                                            <RiArrowRightLine></RiArrowRightLine> :
                                            <>
                                                <RiMenu3Fill className='transition-all duration-300 group-hover:hidden'></RiMenu3Fill>
                                                <RiMenuFill className='transition-all duration-300 hidden group-hover:block'></RiMenuFill>
                                            </>
                                    }
                                </span>
                                <h2 className='font-semibold hidden sm:block text-2xl capitalize'>{pageTitle}</h2>
                            </div>
                            <div className='flex justify-between items-center gap-5'>
                                <div className='relative max-w-sm mr-5 h-14 hidden lg:block'>
                                    <input type="text" placeholder="Search here" className="input w-72 h-full bg-[#F3F3F3]" />
                                    <HiMagnifyingGlass className='absolute bottom-1/2 translate-y-1/2 right-4 text-2xl'></HiMagnifyingGlass>
                                </div>
                                <div className='bg-[#F6F6F6] p-2.5 lg:p-4 rounded-xl'>
                                    <HiOutlineBell className='text-2xl'></HiOutlineBell>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="cursor-pointer">
                                        <div className='w-10 h-10 lg:w-14 lg:h-14 ml-4'>
                                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="profile" className='w-full h-full object-cover rounded-xl' />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-medium">
                                        <li><Link>Profile</Link></li>
                                        <li><Link>Settings</Link></li>
                                        <li onClick={handleLogout}><Link>Logout</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </header>
                        <aside className='relative z-10'>
                            <div className='lg:hidden'>
                                {
                                    !toggle ?
                                        <div>
                                            <div className='flex items-center justify-center w-20 fixed top-0 z-20 h-20 lg:h-28 bg-white transition duration-300'>
                                                <img src={logo} alt="logo" className='w-12' />
                                            </div>
                                            <div className='fixed top-20 lg:top-28 w-20 pt-5 bg-white h-full overflow-scroll NoScrollbar hidden sm:block lg:hidden'>
                                                <ul className='flex flex-col font-medium text-dimmed px-3 gap-1 text-2xl'>
                                                    {
                                                        menuLinks.map(link => <NavLink key={link.title} to={link.link} className={({ isActive }) => isActive ? 'bg-primary text-white rounded-lg' : undefined}><li className='p-3 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white transition duration-300'>{link.icon}</li></NavLink>)
                                                    }
                                                    <li title='logout' className='p-3 flex items-center justify-center rounded-lg hover:bg-danger hover:text-white transition duration-300 cursor-pointer'><RiLogoutCircleLine></RiLogoutCircleLine></li>
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className='flex items-center gap-2 fixed top-0 z-20 w-80 h-20 lg:h-28 px-4 xl:px-10 bg-white transition duration-300'>
                                                <img src={logo} alt="logo" className='w-12' />
                                                <span onClick={() => setToggle(prev => !prev)} className='pt-1 text-primary transition-all duration-300 group cursor-pointer block text-3xl ml-2 lg:hidden'>
                                                    {
                                                        toggle && <RiArrowRightLine></RiArrowRightLine>
                                                    }
                                                </span>
                                                <h1 className='text-2xl lg:text-3xl font-bold hidden lg:block'>Fit Me</h1>
                                            </div>
                                            <div className='fixed top-20 lg:top-28 w-80 pt-5 bg-white h-full overflow-scroll NoScrollbar'>
                                                <ul className='flex flex-col text-lg font-medium text-dimmed'>
                                                    {
                                                        menuLinks.map(link => <NavLink key={link.title} to={link.link} className={({ isActive }) => isActive ? 'text-primary' : undefined}><li className='py-2 px-4 sm:py-2.5 sm:px-6 flex items-center gap-2 hover:text-primary'><span className='text-2xl'>{link.icon}</span> {link.title}</li></NavLink>)
                                                    }
                                                    <li onClick={handleLogout} className='my-2 mx-4 sm:my-2.5 sm:mx-6 flex items-center gap-2 cursor-pointer hover:text-danger'><RiLogoutCircleLine className='text-2xl'></RiLogoutCircleLine> Logout</li>
                                                </ul>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className='hidden lg:block'>
                                {
                                    toggle ?
                                        <div>
                                            <div className='flex items-center justify-center w-20 fixed top-0 z-20 h-20 lg:h-28 bg-white transition duration-300'>
                                                <img src={logo} alt="logo" className='w-14' />
                                            </div>
                                            <div className='fixed top-20 lg:top-28 w-20 pt-5 bg-white h-full overflow-scroll NoScrollbar'>
                                                <ul className='flex flex-col font-medium text-dimmed px-3 gap-1 text-2xl'>
                                                    {
                                                        menuLinks.map(link => <NavLink key={link.title} to={link.link} className={({ isActive }) => isActive ? 'bg-primary text-white rounded-lg' : undefined}><li className='p-3 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white transition duration-300'>{link.icon}</li></NavLink>)
                                                    }
                                                    <li title='logout' className='p-3 flex items-center justify-center rounded-lg hover:bg-danger hover:text-white transition duration-300 cursor-pointer'><RiLogoutCircleLine></RiLogoutCircleLine></li>
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className='flex items-center gap-2 fixed top-0 z-20 w-80 h-20 lg:h-28 px-6 xl:px-10 bg-white transition duration-300'>
                                                <img src={logo} alt="logo" className='w-14' />
                                                <h1 className='text-2xl lg:text-3xl font-bold'>Fit Me</h1>
                                            </div>
                                            <div className='fixed top-20 lg:top-28 w-80 pt-5 bg-white h-full overflow-scroll NoScrollbar'>
                                                <ul className='flex flex-col text-lg font-medium text-dimmed'>
                                                    {
                                                        menuLinks.map(link => <NavLink key={link.title} to={link.link} className={({ isActive }) => isActive ? 'text-primary' : undefined}><li className='py-2 px-6 xl:py-3 xl:px-10 flex items-center gap-2 hover:text-primary'><span className='text-2xl'>{link.icon}</span> {link.title}</li></NavLink>)
                                                    }
                                                    <li onClick={handleLogout} className='my-2 mx-6 xl:my-3 xl:mx-10 flex items-center gap-2 cursor-pointer hover:text-danger'><RiLogoutCircleLine className='text-2xl'></RiLogoutCircleLine> Logout</li>
                                                </ul>
                                            </div>
                                        </div>
                                }
                            </div>
                        </aside>
                        <main className={`pt-20 lg:pt-28 min-h-screen sm:pl-20 ${toggle ? "lg:pl-20" : "lg:pl-80"}`}>
                            <div className='p-3 md:p-7'>
                                <Outlet></Outlet>
                            </div>
                        </main>
                    </div>
            }
        </>
    );
};

export default DashboardLayout;