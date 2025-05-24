import React, { useContext, useState, useEffect } from "react";
import { MdOutlineMailOutline, MdLogin } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
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
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 py-8 px-4 md:px-8 lg:px-12">
            <div className={`text-center mb-8 ${isVisible ? 'auth-animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              <h1 className="text-2xl md:text-3xl font-bold text-text-dark">Welcome Back</h1>
              <p className="text-text-muted mt-2">Enter your credentials to access your account</p>
            </div>

            <form className="space-y-5">
              {/* Role Selection */}
              <div className={`form-group ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                <label className="form-label">Login As</label>
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

              {/* Email */}
              <div className={`form-group ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
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

              {/* Password */}
              <div className={`form-group ${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                <div className="flex justify-between">
                  <label className="form-label">Password</label>
                  <a href="#" className="text-sm text-primary hover:text-primary-dark">Forgot Password?</a>
                </div>
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
              </div>

              {/* Submit Button */}
              <div className={`${isVisible ? 'auth-animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                <button
                  type="submit"
                  onClick={handleLogin}
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
                      <MdLogin className="mr-2" />
                      Login
                    </>
                  )}
                </button>
              </div>

              {/* Register Link */}
              <div className={`text-center mt-6 ${isVisible ? 'auth-animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <p className="text-text-muted">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1">
                    Register Now <FaUserPlus className="text-sm" />
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block md:w-1/2">
            <div className={`h-full w-full overflow-hidden ${isVisible ? 'auth-animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <img
                src="/login.jpg"
                alt="Login"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
