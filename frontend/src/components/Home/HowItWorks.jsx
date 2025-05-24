import React, { useState } from "react";
import { FaUserPlus, FaArrowRight, FaSearch, FaFileAlt, FaCheckCircle, FaBuilding, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("jobSeeker");
  // Separate steps for job seekers and employers
  const jobSeekerSteps = [
    {
      id: 1,
      title: "Create Your Profile",
      description: "Sign up and build a compelling profile showcasing your skills and experience.",
      icon: <FaUserPlus className="text-2xl" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Discover Opportunities",
      description: "Search and filter through relevant job listings that match your career goals.",
      icon: <FaSearch className="text-2xl" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Apply With Ease",
      description: "Submit applications with your resume and track your application status.",
      icon: <FaFileAlt className="text-2xl" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Land Your Dream Job",
      description: "Interview with employers and receive offers for your ideal position.",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const employerSteps = [
    {
      id: 1,
      title: "Create Company Profile",
      description: "Register your company and showcase your brand to potential candidates.",
      icon: <FaBuilding className="text-2xl" />,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 2,
      title: "Post Job Openings",
      description: "Create detailed job listings with requirements and benefits.",
      icon: <FaFileAlt className="text-2xl" />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 3,
      title: "Review Applications",
      description: "Browse through candidate profiles and review submitted applications.",
      icon: <FaSearch className="text-2xl" />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 4,
      title: "Hire Top Talent",
      description: "Connect with promising candidates and build your dream team.",
      icon: <FaUserTie className="text-2xl" />,
      color: "bg-teal-100 text-teal-600",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-light-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-dark mb-3">How HireMatrix Works</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Your all-in-one platform for job seekers and employers
          </p>
        </div>

        {/* Tabs for Job Seekers and Employers */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
              <button
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === "jobSeeker"
                    ? "bg-primary text-white"
                    : "text-text-dark hover:bg-primary-light"
                }`}
                onClick={() => setActiveTab("jobSeeker")}
              >
                For Job Seekers
              </button>
              <button
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === "employer"
                    ? "bg-primary text-white"
                    : "text-text-dark hover:bg-primary-light"
                }`}
                onClick={() => setActiveTab("employer")}
              >
                For Employers
              </button>
            </div>
          </div>

          {/* Steps Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {(activeTab === "jobSeeker" ? jobSeekerSteps : employerSteps).map((step) => (
              <div
                key={step.id}
                className="card p-6 relative z-10 hover:shadow-card-hover transition-all duration-normal"
              >
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {step.id}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto ${step.color} rounded-full flex items-center justify-center mb-5`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-text-dark mb-3 text-center">{step.title}</h3>
                <p className="text-text-muted text-center text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-12 max-w-4xl mx-auto"></div>

        {/* Featured Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12">
          <div className="card p-4 md:p-6 text-center">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">10,000+</div>
            <p className="text-text-dark font-medium text-xs md:text-sm">Active Job Listings</p>
          </div>
          <div className="card p-4 md:p-6 text-center">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">5,000+</div>
            <p className="text-text-dark font-medium text-xs md:text-sm">Companies Hiring</p>
          </div>
          <div className="card p-4 md:p-6 text-center col-span-2 md:col-span-1 md:col-auto">
            <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">25,000+</div>
            <p className="text-text-dark font-medium text-xs md:text-sm">Successful Placements</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/job/getall"
            className="btn btn-primary py-3 px-8 inline-flex items-center gap-2 text-lg"
          >
            Get Started
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
