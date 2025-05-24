import React, { useContext, useState, useEffect } from "react";
import { FaRegUser, FaPencilAlt, FaArrowLeft } from "react-icons/fa";
import { MdOutlineMailOutline, MdAppRegistration } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  useEffect(() => {
    // Trigger animations after component mount
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !role) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <div className="min-h-screen bg-light-bg py-8 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-5xl mx-auto w-full bg-card-bg rounded-lg shadow-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="hidden md:block md:w-1/2">
            <div className={`h-full w-full overflow-hidden ${isVisible ? 'auth-animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <img
                src="/register.jpg"
                alt="Register"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 py-8 px-4 md:px-8 lg:px-12">
            <div className={`text-center mb-8 ${isVisible ? 'auth-animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              <h1 className="text-2xl md:text-3xl font-bold text-text-dark">Create Account</h1>
              <p className="text-text-muted mt-2">Join our community and start your journey</p>
            </div>

            <form className="space-y-4">
              {/* Role Selection */}
              <div className={`form-group ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                <label className="form-label">Register As</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary">
                    <FaRegUser />
                  </div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-input pl-10"
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                </div>
              </div>

              {/* Name */}
              <div className={`form-group ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                <label className="form-label">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary">
                    <FaPencilAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className={`form-group ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary">
                    <MdOutlineMailOutline />
                  </div>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className={`form-group ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                <label className="form-label">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary">
                    <FaPhoneFlip />
                  </div>
                  <input
                    type="tel"
                    placeholder="123-456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className={`form-group ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <label className="form-label">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary">
                    <RiLock2Fill />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
                <p className="text-xs text-text-muted mt-1">Password must be at least 8 characters long</p>
              </div>

              {/* Submit Button */}
              <div className={`mt-6 ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
                <button
                  type="submit"
                  onClick={handleRegister}
                  disabled={loading}
                  className="btn btn-primary w-full py-3"
                >
                  {loading ? (
                    <>
                      <div className="spinner mr-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <MdAppRegistration className="mr-2" />
                      Register
                    </>
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className={`text-center mt-6 ${isVisible ? 'auth-animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                <p className="text-text-muted">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1">
                    <FaArrowLeft className="text-xs" /> Login Now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
