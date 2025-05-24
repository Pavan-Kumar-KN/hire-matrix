import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaFileAlt,
  FaRegHandPointRight,
  FaCity,
  FaArrowLeft,
  FaTag,
  FaClock,
  FaUser,
  FaEnvelope
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [similarJobs, setSimilarJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingSimilar(true);

    // Fetch job details
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
        setIsLoading(false);

        // After getting job details, fetch similar jobs by category
        if (res.data.job && res.data.job.category) {
          axios
            .get(`http://localhost:4000/api/v1/job/getall?category=${res.data.job.category}`, {
              withCredentials: true,
            })
            .then((similarRes) => {
              // Filter out the current job and limit to 3 similar jobs
              const filteredJobs = similarRes.data.jobs
                .filter(similarJob => similarJob._id !== id)
                .slice(0, 3);
              setSimilarJobs(filteredJobs);
              setIsLoadingSimilar(false);
            })
            .catch((error) => {
              console.error("Error fetching similar jobs:", error);
              setIsLoadingSimilar(false);
            });
        } else {
          setIsLoadingSimilar(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSalary = (job) => {
    if (!job) return "N/A";

    if (job.fixedSalary) {
      return `$${Number(job.fixedSalary || 0).toLocaleString()}`;
    } else if (job.salaryFrom && job.salaryTo) {
      return `$${Number(job.salaryFrom || 0).toLocaleString()} - $${Number(job.salaryTo || 0).toLocaleString()}`;
    } else {
      return "Salary not specified";
    }
  };

  return (
    <section className="bg-light-bg min-h-screen py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/job/getall"
            className="inline-flex items-center text-text-dark hover:text-primary transition-colors text-sm"
          >
            <FaArrowLeft size={14} className="mr-1.5" /> Back to Jobs
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="spinner border-primary mb-4"></div>
            <p className="text-text-muted text-sm">Loading job details...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Job Details */}
            <div className="lg:col-span-2">
              {/* Job Header */}
              <div className="card shadow-card overflow-hidden mb-6">
                <div className="bg-primary px-5 py-4">
                  <div className="inline-block bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded mb-2">
                    <FaTag className="inline-block mr-1" size={10} /> {job.category}
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{job.title}</h1>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/90">
                    <span className="flex items-center">
                      <FaBuilding className="mr-1.5" size={12} /> {job.company || "Company not specified"}
                    </span>
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-1.5" size={12} /> {job.city}, {job.country}
                    </span>
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1.5" size={12} /> Posted {formatDate(job.jobPostedOn)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Overview */}
              <div className="card shadow-card p-5 mb-6">
                <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                  Job Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div className="flex items-start">
                    <div className="text-primary mt-0.5 mr-2.5">
                      <FaMoneyBillWave size={14} />
                    </div>
                    <div>
                      <p className="font-medium text-text-dark">Salary</p>
                      <p className="text-text-muted">{formatSalary(job)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary mt-0.5 mr-2.5">
                      <FaMapMarkerAlt size={14} />
                    </div>
                    <div>
                      <p className="font-medium text-text-dark">Location</p>
                      <p className="text-text-muted">{job.location || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary mt-0.5 mr-2.5">
                      <FaBriefcase size={14} />
                    </div>
                    <div>
                      <p className="font-medium text-text-dark">Job Type</p>
                      <p className="text-text-muted">{job.workType || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary mt-0.5 mr-2.5">
                      <FaClock size={14} />
                    </div>
                    <div>
                      <p className="font-medium text-text-dark">Experience</p>
                      <p className="text-text-muted">{job.experience || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="card shadow-card p-5 mb-6">
                <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                  Job Description
                </h2>
                <div className="text-text-muted text-sm whitespace-pre-line">
                  {job.description}
                </div>
              </div>

              {/* Similar Jobs Section - Mobile Only */}
              <div className="lg:hidden">
                <SimilarJobsSection
                  isLoading={isLoadingSimilar}
                  similarJobs={similarJobs}
                  category={job.category}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply Now Card */}
              <div className="card shadow-card p-5 mb-6">
                {user && user.role === "Employer" ? (
                  <div className="text-sm">
                    <div className="flex items-center text-warning mb-3">
                      <FaRegHandPointRight className="mr-2" size={14} />
                      <h3 className="font-semibold">Employer Account</h3>
                    </div>
                    <p className="text-text-muted">
                      You are logged in as an employer. Employers cannot apply for jobs.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-base font-semibold text-text-dark mb-3">Ready to Apply?</h3>
                    <p className="text-xs text-text-muted mb-4">
                      Submit your application now and take the next step in your career journey.
                    </p>
                    <Link
                      to={`/application/${job._id}`}
                      className="btn btn-primary w-full py-2.5 text-sm"
                    >
                      Apply Now
                    </Link>
                  </>
                )}
              </div>

              {/* Company Info Card */}
              <div className="card shadow-card p-5 mb-6">
                <h3 className="text-base font-semibold text-text-dark mb-3">About the Company</h3>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center mr-3">
                    <FaBuilding className="text-primary" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-text-dark text-sm">{job.company || "Company Name"}</p>
                    <p className="text-text-muted text-xs">{job.city}, {job.country}</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted mb-4">
                  {job.companyDescription || "No company description available."}
                </p>
              </div>

              {/* Similar Jobs Section - Desktop Only */}
              <div className="hidden lg:block">
                <SimilarJobsSection
                  isLoading={isLoadingSimilar}
                  similarJobs={similarJobs}
                  category={job.category}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Similar Jobs Component
const SimilarJobsSection = ({ isLoading, similarJobs, category }) => {
  return (
    <div className="card shadow-card p-5">
      <h3 className="text-base font-semibold text-text-dark mb-3">
        Similar {category} Jobs
      </h3>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="spinner border-primary"></div>
        </div>
      ) : similarJobs && similarJobs.length > 0 ? (
        <div className="space-y-4">
          {similarJobs.map(job => (
            <Link
              key={job._id}
              to={`/job/${job._id}`}
              className="block border border-border rounded-md p-3 hover:border-primary hover:shadow-sm transition-all"
            >
              <h4 className="font-medium text-text-dark text-sm mb-1 line-clamp-1">{job.title}</h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
                <span className="flex items-center">
                  <FaBuilding className="mr-1" size={10} /> {job.company || "Company"}
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" size={10} /> {job.city}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-text-muted py-2">No similar jobs found.</p>
      )}
    </div>
  );
};

export default JobDetails;
