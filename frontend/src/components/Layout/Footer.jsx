import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin, FaBriefcase, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={isAuthorized ? "bg-primary text-white py-10" : "hidden"}>
      <div className="container mx-auto px-4">
        {/* Logo and Tagline */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold">
            Hire<span className="text-success">Matrix</span>
          </h2>
          <p className="text-white/80 text-sm">Connecting talent with opportunities</p>
        </div>

        {/* Main Footer Content - Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-base font-semibold text-white border-b border-white/20 pb-2 mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" className="text-white/80 hover:text-success transition-colors text-xs">Home</Link></li>
              <li><Link to="/job/getall" className="text-white/80 hover:text-success transition-colors text-xs">Browse Jobs</Link></li>
              <li><Link to="/applications/me" className="text-white/80 hover:text-success transition-colors text-xs">My Applications</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div className="col-span-1">
            <h4 className="text-base font-semibold text-white border-b border-white/20 pb-2 mb-3 opacity-0 md:hidden">Links</h4>
            <ul className="space-y-1.5 mt-8 md:mt-0">
              <li><Link to="/job/me" className="text-white/80 hover:text-success transition-colors text-xs">My Jobs</Link></li>
              <li><Link to="/job/post" className="text-white/80 hover:text-success transition-colors text-xs">Post a Job</Link></li>
              <li><Link to="/privacy" className="text-white/80 hover:text-success text-xs transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-base font-semibold text-white border-b border-white/20 pb-2 mb-3">Contact Us</h4>
            <div className="space-y-1.5">
              <p className="flex items-center text-white/80 text-xs">
                <FaPhoneAlt className="mr-1.5 text-success w-3 h-3" /> +1 (555) 123-4567
              </p>
              <p className="flex items-center text-white/80 text-xs">
                <FaEnvelope className="mr-1.5 text-success w-3 h-3" /> support@hirematrix.com
              </p>
              <p className="flex items-center text-white/80 text-xs">
                <FaBriefcase className="mr-1.5 text-success w-3 h-3" /> 123 Business Ave, Tech City
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="text-base font-semibold text-white border-b border-white/20 pb-2 mb-3">Follow Us</h4>
            <div className="flex space-x-3">
              <Link to="/" target="_blank" className="bg-white/10 p-1.5 rounded-full hover:bg-success hover:text-white transition-all">
                <FaFacebookF className="text-white w-3.5 h-3.5" />
              </Link>
              <Link to="/" target="_blank" className="bg-white/10 p-1.5 rounded-full hover:bg-success hover:text-white transition-all">
                <FaYoutube className="text-white w-3.5 h-3.5" />
              </Link>
              <Link to="/" target="_blank" className="bg-white/10 p-1.5 rounded-full hover:bg-success hover:text-white transition-all">
                <FaLinkedin className="text-white w-3.5 h-3.5" />
              </Link>
              <Link to="/" target="_blank" className="bg-white/10 p-1.5 rounded-full hover:bg-success hover:text-white transition-all">
                <RiInstagramFill className="text-white w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 pt-4 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-xs">&copy; {currentYear} HireMatrix. All Rights Reserved.</p>
          <div className="flex space-x-3 mt-2 md:mt-0">
            <Link to="/terms" className="text-white/70 hover:text-success text-xs transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
