import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FaSearch, FaMapMarkerAlt, FaIndustry, FaFilter, FaArrowRight, FaMoneyBillWave, FaCode, FaChartLine, FaGraduationCap, FaHeartbeat, FaPalette, FaLaptopCode, FaBuilding, FaUserTie } from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // Predefined categories with icons
  const predefinedCategories = [
    { name: "Technology", icon: <FaCode /> },
    { name: "Engineering", icon: <FaLaptopCode /> },
    { name: "Finance", icon: <FaMoneyBillWave /> },
    { name: "Marketing", icon: <FaChartLine /> },
    { name: "Education", icon: <FaGraduationCap /> },
    { name: "Healthcare", icon: <FaHeartbeat /> },
    { name: "Design", icon: <FaPalette /> },
    { name: "Business", icon: <FaBuilding /> },
    { name: "Management", icon: <FaUserTie /> },
  ];

  // Get all available categories from jobs
  const categories = jobs.jobs ? [...new Set(jobs.jobs.map(job => job.category))] : [];

  useEffect(() => {
    setIsLoading(true);
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
          setFilteredJobs(res.data.jobs || []);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  // Filter jobs based on search term and category
  useEffect(() => {
    if (!jobs.jobs) return;

    const results = jobs.jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "" || job.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    setFilteredJobs(results);
  }, [searchTerm, categoryFilter, jobs.jobs]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Function to format salary display
  const formatSalary = (job) => {
    if (job.fixedSalary) {
      return `$${job.fixedSalary}`;
    } else if (job.salaryFrom && job.salaryTo) {
      return `$${job.salaryFrom} - $${job.salaryTo}`;
    } else {
      return "Salary not specified";
    }
  };

  return (
    <div className="bg-light-bg min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-dark mb-3">Available Opportunities</h1>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-4"></div>
          <p className="text-text-muted max-w-2xl mx-auto">
            Discover your next career opportunity from our curated list of positions
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-text-muted" />
            </div>
            <input
              type="text"
              placeholder="Search by job title or location..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-input pl-10 w-full shadow-sm"
            />
          </div>
        </div>

        {/* Visual Category Filters - Desktop */}
        <div className="hidden md:block mb-8">
          <h2 className="text-lg font-semibold text-text-dark mb-4 text-center">Popular Categories</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setCategoryFilter("")}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoryFilter === ""
                  ? "bg-primary text-white"
                  : "bg-white text-text-dark hover:bg-primary-light"
              }`}
            >
              All Categories
            </button>

            {predefinedCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setCategoryFilter(category.name)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryFilter === category.name
                    ? "bg-primary text-white"
                    : "bg-white text-text-dark hover:bg-primary-light"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Category Dropdown */}
        <div className="md:hidden mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full form-input text-sm py-2.5"
          >
            <option value="">All Categories</option>
            {predefinedCategories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="spinner border-primary mb-4"></div>
            <p className="text-text-muted font-medium">Loading opportunities...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="card p-8 text-center max-w-2xl mx-auto">
            <svg className="w-12 h-12 text-text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-text-dark mb-2">No matching jobs found</h3>
            <p className="text-text-muted mb-6">Try adjusting your search criteria or explore all available positions</p>
            <button
              onClick={() => { setSearchTerm(""); setCategoryFilter(""); }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="card border-l-4 border-primary overflow-hidden hover:shadow-card-hover transition-all duration-normal"
              >
                <div className="p-3 md:p-4">
                  <div className="flex justify-between items-start mb-1.5 md:mb-2">
                    <h3 className="text-xs md:text-sm font-bold text-text-dark line-clamp-1">
                      {job.title}
                    </h3>
                    <span className="bg-primary-light text-primary text-[10px] md:text-xs font-semibold px-1.5 py-0.5 rounded-full ml-1 whitespace-nowrap">
                      New
                    </span>
                  </div>

                  <div className="space-y-1 mb-2 md:mb-3 text-[10px] md:text-xs">
                    <div className="flex items-center text-text-muted">
                      <FaIndustry className="mr-1 text-primary w-2.5 h-2.5" />
                      <span className="truncate">{job.category}</span>
                    </div>
                    <div className="flex items-center text-text-muted">
                      <FaMapMarkerAlt className="mr-1 text-primary w-2.5 h-2.5" />
                      <span className="truncate">{job.city}, {job.country}</span>
                    </div>
                    <div className="hidden md:flex items-center text-text-muted">
                      <FaMoneyBillWave className="mr-1 text-primary w-2.5 h-2.5" />
                      <span className="truncate">{formatSalary(job)}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 md:pt-2 border-t border-border">
                    <Link
                      to={`/job/${job._id}`}
                      className="btn btn-primary w-full py-1 md:py-1.5 text-[10px] md:text-xs"
                    >
                      View Details
                      <FaArrowRight className="ml-1 w-2 h-2 md:w-3 md:h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
