import React, { useContext, useEffect, useState } from "react";
import { Check, Edit, Trash2, Briefcase, MapPin, DollarSign, Calendar, X, ArrowLeft, FileText } from "lucide-react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
      return;
    }

    const fetchMyJobs = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/job/getmyjobs", {
          withCredentials: true
        });

        if (data.success) {
          // Ensure data.jobs is an array before setting it
          setMyJobs(Array.isArray(data.jobs) ? data.jobs : []);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch your jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyJobs();
  }, [isAuthorized, user, navigateTo]);

  // Category options - matching the ones in PostJob component
  const categories = [
    "Graphics & Design",
    "Mobile App Development",
    "Frontend Web Development",
    "MERN Stack Development",
    "Account & Finance",
    "Artificial Intelligence",
    "Video Animation",
    "MEAN Stack Development",
    "MEVN Stack Development",
    "Data Entry Operator"
  ];

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    try {
      const jobToUpdate = myJobs.find(job => job._id === jobId);
      if (!jobToUpdate) return;

      const { data } = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        jobToUpdate,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (data.success) {
        toast.success(data.message || "Job updated successfully");
        setEditingMode(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );

      if (data.success) {
        setMyJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
        toast.success(data.message || "Job deleted successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs(prevJobs =>
      prevJobs.map(job =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
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
    <div className="bg-light-bg min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back button for mobile */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-text-dark hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="bg-card-bg rounded-lg shadow-card mb-6 overflow-hidden">
          <div className="border-l-4 border-primary p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3 text-white">
                <Briefcase size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-dark">
                  Your Posted Jobs
                </h1>
                <p className="text-text-muted">
                  Manage and edit your job postings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="spinner border-primary mb-4"></div>
            <p className="text-text-muted">Loading your jobs...</p>
          </div>
        ) : myJobs && myJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(myJobs) && myJobs.map((job) => (
              <div
                key={job._id}
                className={`card overflow-hidden transition-all duration-normal ${
                  editingMode === job._id
                    ? 'border-2 border-primary scale-[1.02]'
                    : 'border border-border hover:-translate-y-1 hover:shadow-card-hover'
                }`}
              >
                {/* Job Header */}
                <div className={`${job.expired ? 'bg-error/10' : 'bg-primary'} p-5 relative`}>
                  <div className={`absolute top-3 right-3 ${
                    job.expired ? 'bg-error' : 'bg-accent'
                  } text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {job.expired ? 'EXPIRED' : 'ACTIVE'}
                  </div>

                  <h2 className={`text-lg font-bold ${
                    job.expired ? 'text-text-dark' : 'text-white'
                  } mb-2 pr-20`}>
                    {job.title}
                  </h2>

                  <div className="flex items-center gap-2 text-sm">
                    <div className={job.expired ? 'text-text-muted' : 'text-white/90'}>
                      <MapPin size={14} className="inline mr-1" />
                      <span>{job.city}, {job.country}</span>
                    </div>
                  </div>
                </div>

                {/* Job Content */}
                <div className="p-6">
                  <div className="grid gap-4">
                    {/* Location */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-dark flex items-center">
                        <MapPin className="mr-2" size={16} />
                        Location
                      </label>
                      <input
                        type="text"
                        className={`form-input ${
                          editingMode === job._id
                            ? 'border-primary bg-white'
                            : 'bg-light-bg'
                        }`}
                        disabled={editingMode !== job._id}
                        value={job.country}
                        onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                        placeholder="Country"
                      />
                      <input
                        type="text"
                        className={`form-input ${
                          editingMode === job._id
                            ? 'border-primary bg-white'
                            : 'bg-light-bg'
                        }`}
                        disabled={editingMode !== job._id}
                        value={job.city}
                        onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                        placeholder="City"
                      />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-dark flex items-center">
                        <Briefcase className="mr-2" size={16} />
                        Category
                      </label>
                      <select
                        className={`form-input ${
                          editingMode === job._id
                            ? 'border-primary bg-white'
                            : 'bg-light-bg'
                        }`}
                        value={job.category}
                        onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                        disabled={editingMode !== job._id}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Salary */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-dark flex items-center">
                        <DollarSign className="mr-2" size={16} />
                        Salary {editingMode !== job._id && <span className="ml-1 text-text-muted">({formatSalary(job)})</span>}
                      </label>
                      {job.fixedSalary ? (
                        <input
                          type="number"
                          className={`form-input ${
                            editingMode === job._id
                              ? 'border-primary bg-white'
                              : 'bg-light-bg'
                          }`}
                          disabled={editingMode !== job._id}
                          value={job.fixedSalary}
                          onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                          placeholder="Fixed salary"
                        />
                      ) : (
                        <div className="flex gap-2 items-center">
                          <input
                            type="number"
                            className={`form-input flex-1 ${
                              editingMode === job._id
                                ? 'border-primary bg-white'
                                : 'bg-light-bg'
                            }`}
                            disabled={editingMode !== job._id}
                            value={job.salaryFrom}
                            onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                            placeholder="From"
                          />
                          <span className="text-text-muted font-medium">to</span>
                          <input
                            type="number"
                            className={`form-input flex-1 ${
                              editingMode === job._id
                                ? 'border-primary bg-white'
                                : 'bg-light-bg'
                            }`}
                            disabled={editingMode !== job._id}
                            value={job.salaryTo}
                            onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                            placeholder="To"
                          />
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-dark flex items-center">
                        <Calendar className="mr-2" size={16} />
                        Status
                      </label>
                      <select
                        className={`form-input ${
                          editingMode === job._id
                            ? 'border-primary bg-white'
                            : 'bg-light-bg'
                        }`}
                        value={job.expired}
                        onChange={(e) => handleInputChange(job._id, "expired", e.target.value === 'true')}
                        disabled={editingMode !== job._id}
                      >
                        <option value={false}>Active</option>
                        <option value={true}>Expired</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-dark flex items-center">
                        <FileText className="mr-2" size={16} />
                        Description
                      </label>
                      <textarea
                        className={`form-input min-h-[80px] resize-y ${
                          editingMode === job._id
                            ? 'border-primary bg-white'
                            : 'bg-light-bg'
                        }`}
                        value={job.description}
                        disabled={editingMode !== job._id}
                        onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                        placeholder="Job description..."
                      />
                    </div>

                    {/* Work Location */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-dark flex items-center">
                        <MapPin className="mr-2" size={16} />
                        Work Location
                      </label>
                      <textarea
                        className={`form-input min-h-[60px] resize-y ${
                          editingMode === job._id
                            ? 'border-primary bg-white'
                            : 'bg-light-bg'
                        }`}
                        value={job.location}
                        disabled={editingMode !== job._id}
                        onChange={(e) => handleInputChange(job._id, "location", e.target.value)}
                        placeholder="Work location details..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-light-bg border-t border-border flex justify-between items-center">
                  <div className="flex gap-2">
                    {editingMode === job._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(job._id)}
                          className="btn btn-success"
                        >
                          <Check className="mr-2" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="bg-text-muted text-white hover:bg-white hover:text-text-muted border border-transparent hover:border-text-muted py-2 px-4 rounded-button font-medium transition-all duration-normal flex items-center"
                        >
                          <X className="mr-2" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(job._id)}
                        className="btn btn-primary"
                      >
                        <Edit className="mr-2" />
                        Edit Job
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="btn btn-error"
                  >
                    <Trash2 className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <div className="bg-light-bg rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Briefcase size={32} className="text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-text-dark mb-2">
              No Jobs Posted Yet
            </h3>
            <p className="text-text-muted">
              You haven't posted any jobs or maybe you deleted all of your jobs!
            </p>
            <div className="mt-6">
              <Link to="/job/post" className="btn btn-primary">
                Post Your First Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;