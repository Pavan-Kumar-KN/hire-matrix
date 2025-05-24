import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import { BsBriefcase, BsFileEarmarkPlus } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShow(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`${!isAuthorized ? 'hidden' : ''} ${
      scrolled
        ? 'py-2 px-4 md:px-8 bg-primary shadow-md'
        : 'bg-primary py-3 px-4 md:px-8 shadow-md'
      } transition-all duration-200 sticky top-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="flex items-center">
            <h1 className="text-lg md:text-xl font-bold text-white">
              Hire<span className="text-success">Matrix</span>
            </h1>
          </Link>
        </div>

        {/* Mobile menu overlay */}
        {show && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShow(false)}
          ></div>
        )}

        {/* Navigation links */}
        <ul className={`
          fixed md:relative top-0 right-0 h-screen md:h-auto
          w-[280px] md:w-auto bg-primary-dark md:bg-transparent
          flex flex-col md:flex-row items-start md:items-center
          gap-5 md:gap-6 p-8 md:p-0 z-50 md:z-auto
          transform ${show ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          transition-transform duration-200 ease-in-out
        `}>
          {/* Close button for mobile */}
          <button
            className="absolute top-4 right-4 text-white text-2xl md:hidden"
            onClick={() => setShow(false)}
          >
            <IoMdClose />
          </button>

          <li>
            <Link
              to={"/"}
              className={`text-white font-medium text-xs md:text-sm flex items-center gap-1.5 py-2 px-3 rounded-md transition-colors duration-200 ${isActive('/') ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              <AiOutlineHome className="text-base" /> Home
            </Link>
          </li>

          <li>
            <Link
              to={"/job/getall"}
              className={`text-white font-medium text-xs md:text-sm flex items-center gap-1.5 py-2 px-3 rounded-md transition-colors duration-200 ${isActive('/job/getall') ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              <AiOutlineAppstore className="text-base" /> All Jobs
            </Link>
          </li>

          <li>
            <Link
              to={"/applications/me"}
              className={`text-white font-medium text-xs md:text-sm flex items-center gap-1.5 py-2 px-3 rounded-md transition-colors duration-200 ${isActive('/applications/me') ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              <BsBriefcase className="text-base" />
              {user && user.role === "Employer"
                ? "Applications"
                : "My Applications"}
            </Link>
          </li>

          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link
                  to={"/job/post"}
                  className={`text-white font-medium text-xs md:text-sm flex items-center gap-1.5 py-2 px-3 rounded-md transition-colors duration-200 ${isActive('/job/post') ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <BsFileEarmarkPlus className="text-base" /> Post Job
                </Link>
              </li>

              <li>
                <Link
                  to={"/job/me"}
                  className={`text-white font-medium text-xs md:text-sm flex items-center gap-1.5 py-2 px-3 rounded-md transition-colors duration-200 ${isActive('/job/me') ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <MdOutlineWorkOutline className="text-base" /> My Jobs
                </Link>
              </li>
            </>
          ) : null}

          <li className="md:ml-2">
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs md:text-sm py-2 px-4 rounded-md flex items-center gap-2 transition-colors duration-200"
            >
              <FiLogOut className="text-base" /> Logout
            </button>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-2xl text-white focus:outline-none z-50"
          onClick={() => setShow(!show)}
        >
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
