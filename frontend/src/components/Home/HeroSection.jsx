import React, { useState, useEffect } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus, FaArrowRight, FaCode, FaChartLine, FaGraduationCap, FaHeartbeat, FaPalette, FaMoneyBillWave, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = [];

    if (searchTerm) {
      queryParams.push(`keyword=${encodeURIComponent(searchTerm)}`);
    }

    if (location) {
      queryParams.push(`location=${encodeURIComponent(location)}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    navigate(`/job/getall${queryString}`);
  };

  const [categories, setCategories] = useState([
    { name: "Technology", icon: <FaCode />, color: "bg-blue-100 text-blue-600" },
    { name: "Finance", icon: <FaMoneyBillWave />, color: "bg-green-100 text-green-600" },
    { name: "Marketing", icon: <FaChartLine />, color: "bg-purple-100 text-purple-600" },
    { name: "Education", icon: <FaGraduationCap />, color: "bg-yellow-100 text-yellow-600" },
    { name: "Healthcare", icon: <FaHeartbeat />, color: "bg-red-100 text-red-600" },
    { name: "Design", icon: <FaPalette />, color: "bg-pink-100 text-pink-600" },
  ]);

  // This useEffect would fetch categories from backend in a real implementation
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:4000/api/v1/job/categories");
  //       if (data.success) {
  //         // Map backend categories to include icons and colors
  //         const mappedCategories = data.categories.map(cat => {
  //           // Assign icon based on category name or use default
  //           let icon = <FaCode />;
  //           let color = "bg-blue-100 text-blue-600";
  //
  //           // Logic to assign different icons and colors based on category name
  //
  //           return { name: cat, icon, color };
  //         });
  //         setCategories(mappedCategories);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch categories:", error);
  //     }
  //   };
  //
  //   fetchCategories();
  // }, []);

  const details = [
    {
      id: 1,
      title: "100",
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "20+",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "40+",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "50+",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="relative overflow-hidden bg-light-bg py-12 lg:py-16">
      {/* Background floating text elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating keywords - positioned more centrally and with better visibility */}
        <div className="absolute text-6xl md:text-8xl font-bold text-primary/10 top-[15%] left-[10%] animate-float-slow">
          Developer
        </div>
        <div className="absolute text-5xl md:text-7xl font-bold text-primary/10 top-[30%] right-[15%] animate-float-medium">
          Design
        </div>
        <div className="absolute text-4xl md:text-6xl font-bold text-primary/10 bottom-[25%] left-[15%] animate-float-fast">
          Marketing
        </div>
        <div className="absolute text-5xl md:text-7xl font-bold text-primary/10 top-[45%] left-[30%] animate-float-slow-reverse">
          Remote
        </div>
        <div className="absolute text-4xl md:text-6xl font-bold text-primary/10 bottom-[35%] right-[20%] animate-float-medium-reverse">
          Finance
        </div>
        <div className="absolute text-3xl md:text-5xl font-bold text-primary/10 bottom-[15%] left-[25%] animate-float-fast-reverse">
          Technology
        </div>
      </div>

      {/* Add custom animation keyframes with more movement */}
      <style jsx>{`
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(15px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float-medium {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(25px) translateX(-15px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float-fast {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(-10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float-slow-reverse {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(30px) translateX(-15px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float-medium-reverse {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(15px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float-fast-reverse {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }
        .animate-float-medium-reverse {
          animation: float-medium-reverse 8s ease-in-out infinite;
        }
        .animate-float-fast-reverse {
          animation: float-fast-reverse 6s ease-in-out infinite;
        }
      `}</style>

      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="flex flex-col items-center justify-center mb-8 max-w-3xl mx-auto">
          {/* Centered content - Text and CTA */}
          <div className="w-full space-y-6 text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-tight">
              Find a job that <span className="text-primary">suits</span> your interests and <span className="text-primary">skills</span>
            </h1>
            <p className="text-base md:text-xl text-text-muted max-w-2xl mx-auto">
              Discover opportunities tailored to you.
              Join us and embark on your next career journey today!
            </p>
            <div className="pt-8">
              {/* Search bar */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                <div className="bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row">
                  <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-200">
                    <FaSearch className="text-primary mr-3" />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      className="w-full outline-none text-text-dark"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 md:py-0">
                    <FaMapMarkerAlt className="text-primary mr-3" />
                    <input
                      type="text"
                      placeholder="City, state, or remote"
                      className="w-full outline-none text-text-dark"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-white hover:text-primary border border-transparent hover:border-primary transition-colors"
                  >
                    Search Jobs
                  </button>
                </div>
              </form>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/job/getall"
                  className="text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                >
                  Browse All Jobs
                  <FaArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Companies section with horizontal scroll */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-text-dark mb-4 text-center">Top Companies Hiring Now</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-marquee">
                {/* First set of companies */}
                <div className="flex space-x-8 mx-4">
                  {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix'].map((company) => (
                    <div key={company} className="flex items-center justify-center bg-white rounded-lg shadow-sm p-4 w-32 h-16">
                      <span className="font-semibold text-primary">{company}</span>
                    </div>
                  ))}
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex space-x-8 mx-4">
                  {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix'].map((company) => (
                    <div key={`${company}-dup`} className="flex items-center justify-center bg-white rounded-lg shadow-sm p-4 w-32 h-16">
                      <span className="font-semibold text-primary">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-card-bg rounded-xl shadow-card p-6 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {details.map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center text-center p-4 border-b sm:border-b-0 sm:border-r last:border-0 border-border"
              >
                <div className="bg-primary-light p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center text-primary">
                  {element.icon}
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{element.title}</p>
                <p className="font-semibold text-text-dark mb-2">{element.subTitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
