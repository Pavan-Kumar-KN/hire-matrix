import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { FaTrash, FaEye, FaFileAlt, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileContract, FaArrowLeft, FaBriefcase, FaCalendarAlt, FaBuilding } from "react-icons/fa";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const endpoint =
          user?.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";

        const res = await axios.get(endpoint, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching data");
      } finally {
        setIsLoading(false);
      }

      if (!isAuthorized) navigateTo("/");
    };

    fetchApplications();
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prev) =>
        prev.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const openModal = (url) => {
    setResumeImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const isJobSeeker = user?.role === "Job Seeker";

  return (
    <section className="bg-light-bg min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back button */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-text-dark hover:text-primary transition-colors"
          >
            <FaArrowLeft size={14} className="mr-1" /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="bg-card-bg rounded-lg shadow-card mb-6 overflow-hidden">
          <div className="border-l-4 border-primary p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3 text-white">
                <FaFileContract size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-dark">
                  {isJobSeeker ? "My Applications" : "Applications From Job Seekers"}
                </h1>
                <p className="text-text-muted">
                  {isJobSeeker
                    ? "Track and manage your job applications"
                    : "Review applications from candidates"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="spinner border-primary mb-4"></div>
            <p className="text-text-muted">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="card p-8 text-center">
            <FaFileContract className="text-4xl text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">No Applications Found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {applications.map((app) =>
              isJobSeeker ? (
                <JobSeekerCard
                  key={app._id}
                  element={app}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard
                  key={app._id}
                  element={app}
                  openModal={openModal}
                />
              )
            )}
          </div>
        )}
      </div>

      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

// Job Seeker Card
const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="card overflow-hidden flex flex-col h-full">
    {/* Header with job info */}
    <div className="bg-primary p-4 text-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg truncate pr-2">
          {element.job?.title || "Job Application"}
        </h3>
        <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
          {new Date(element.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center text-sm text-white/80">
        <FaBuilding className="mr-1" size={12} />
        <span className="truncate">{element.job?.company || "Company"}</span>
      </div>
    </div>

    {/* Application details */}
    <div className="p-4 flex-grow">
      <div className="space-y-2 text-sm text-text-muted mb-4">
        <div className="grid grid-cols-2 gap-2">
          <p className="flex items-center">
            <FaUser className="text-primary mr-2 flex-shrink-0" size={14} />
            <span className="font-medium text-text-dark mr-1">Name:</span>
            <span className="truncate">{element.name}</span>
          </p>
          <p className="flex items-center">
            <FaPhone className="text-primary mr-2 flex-shrink-0" size={14} />
            <span className="font-medium text-text-dark mr-1">Phone:</span>
            <span className="truncate">{element.phone}</span>
          </p>
        </div>

        <p className="flex items-center">
          <FaEnvelope className="text-primary mr-2 flex-shrink-0" size={14} />
          <span className="font-medium text-text-dark mr-1">Email:</span>
          <span className="truncate">{element.email}</span>
        </p>

        <p className="flex items-start">
          <FaMapMarkerAlt className="text-primary mr-2 mt-1 flex-shrink-0" size={14} />
          <span className="font-medium text-text-dark mr-1">Address:</span>
          <span className="line-clamp-1">{element.address}</span>
        </p>

        <div className="pt-2">
          <p className="flex items-start mb-1">
            <FaFileContract className="text-primary mr-2 mt-1 flex-shrink-0" size={14} />
            <span className="font-medium text-text-dark">Cover Letter:</span>
          </p>
          <p className="bg-light-bg p-2 rounded-md text-text-muted line-clamp-3 text-xs">
            {element.coverLetter}
          </p>
        </div>
      </div>

      <div className="border border-border rounded-lg p-2 bg-light-bg mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-text-dark flex items-center">
            <FaFileAlt className="text-primary mr-1" size={12} /> Resume
          </span>
          <button
            onClick={() => openModal(element.resume.url)}
            className="text-primary hover:text-primary-dark text-xs"
          >
            <FaEye className="inline mr-1" size={12} /> View
          </button>
        </div>
        <div className="h-20 flex items-center justify-center bg-white/50 rounded border border-dashed border-border">
          <img
            src={element.resume.url}
            alt="Resume"
            onClick={() => openModal(element.resume.url)}
            className="cursor-pointer h-16 object-contain hover:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </div>

    {/* Footer with action button */}
    <div className="p-3 bg-light-bg border-t border-border mt-auto">
      <button
        onClick={() => deleteApplication(element._id)}
        className="btn btn-error w-full py-1.5 text-sm"
      >
        <FaTrash className="mr-1" size={12} /> Delete Application
      </button>
    </div>
  </div>
);

// Employer View Card
const EmployerCard = ({ element, openModal }) => (
  <div className="card overflow-hidden flex flex-col h-full">
    {/* Header with applicant name */}
    <div className="bg-primary p-4 text-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg truncate pr-2">
          {element.name}
        </h3>
        <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
          {new Date(element.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center text-sm text-white/80">
        <FaCalendarAlt className="mr-1" size={12} />
        <span className="truncate">Applied {new Date(element.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
      </div>
    </div>

    {/* Application details */}
    <div className="p-4 flex-grow">
      <div className="space-y-2 text-sm text-text-muted mb-4">
        <div className="grid grid-cols-2 gap-2">
          <p className="flex items-center">
            <FaEnvelope className="text-primary mr-2 flex-shrink-0" size={14} />
            <span className="font-medium text-text-dark mr-1">Email:</span>
            <span className="truncate">{element.email}</span>
          </p>
          <p className="flex items-center">
            <FaPhone className="text-primary mr-2 flex-shrink-0" size={14} />
            <span className="font-medium text-text-dark mr-1">Phone:</span>
            <span className="truncate">{element.phone}</span>
          </p>
        </div>

        <p className="flex items-start">
          <FaMapMarkerAlt className="text-primary mr-2 mt-1 flex-shrink-0" size={14} />
          <span className="font-medium text-text-dark mr-1">Address:</span>
          <span className="line-clamp-1">{element.address}</span>
        </p>

        <div className="pt-2">
          <p className="flex items-start mb-1">
            <FaFileContract className="text-primary mr-2 mt-1 flex-shrink-0" size={14} />
            <span className="font-medium text-text-dark">Cover Letter:</span>
          </p>
          <p className="bg-light-bg p-2 rounded-md text-text-muted line-clamp-3 text-xs">
            {element.coverLetter}
          </p>
        </div>
      </div>

      <div className="border border-border rounded-lg p-2 bg-light-bg mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-text-dark flex items-center">
            <FaFileAlt className="text-primary mr-1" size={12} /> Resume
          </span>
          <button
            onClick={() => openModal(element.resume.url)}
            className="text-primary hover:text-primary-dark text-xs"
          >
            <FaEye className="inline mr-1" size={12} /> View
          </button>
        </div>
        <div className="h-20 flex items-center justify-center bg-white/50 rounded border border-dashed border-border">
          <img
            src={element.resume.url}
            alt="Resume"
            onClick={() => openModal(element.resume.url)}
            className="cursor-pointer h-16 object-contain hover:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </div>

    {/* Footer with contact button */}
    <div className="p-3 bg-light-bg border-t border-border mt-auto">
      <a
        href={`mailto:${element.email}`}
        className="btn btn-primary w-full py-1.5 text-sm"
      >
        <FaEnvelope className="mr-1" size={12} /> Contact Applicant
      </a>
    </div>
  </div>
);
