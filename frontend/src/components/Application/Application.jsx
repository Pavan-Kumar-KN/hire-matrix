import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaPaperPlane,
  FaSpinner,
  FaBriefcase,
  FaBuilding,
  FaGlobe
} from "react-icons/fa";

const Application = () => {
  const { isAuthorized, user } = useContext(Context);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [resume, setResume] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("No file chosen");
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch job details
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true,
        });
        setJobDetails(res.data.job);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      setResumeFileName(file.name);
    }
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        setLoading(false);
        return;
      }

      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      setResumeFileName("No file chosen");
      toast.success(res.data.message);

      // Show success message for 2 seconds then navigate
      setTimeout(() => {
        navigateTo("/job/getall");
      }, 2000);

    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="bg-light-bg min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="card overflow-hidden">
          {jobDetails && (
            <div className="bg-primary text-white p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Apply for: {jobDetails.title}</h2>
              <p className="text-white/80 text-sm md:text-base mb-4">{jobDetails.company || 'Company'}</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center bg-white/10 text-sm px-3 py-1 rounded-full">
                  <FaBriefcase className="mr-1" /> {jobDetails.category}
                </span>
                <span className="inline-flex items-center bg-white/10 text-sm px-3 py-1 rounded-full">
                  <FaBuilding className="mr-1" /> {jobDetails.workType}
                </span>
                <span className="inline-flex items-center bg-white/10 text-sm px-3 py-1 rounded-full">
                  <FaGlobe className="mr-1" /> {jobDetails.country}
                </span>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-text-dark mb-6">Complete Your Application</h3>

            <form className="space-y-5" onSubmit={handleApplication}>
              <div className="form-group">
                <label className="form-label flex items-center">
                  <FaUser className="mr-2 text-primary" /> Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label flex items-center">
                  <FaEnvelope className="mr-2 text-primary" /> Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label flex items-center">
                  <FaPhone className="mr-2 text-primary" /> Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-primary" /> Your Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label flex items-center">
                  <FaFileAlt className="mr-2 text-primary" /> Cover Letter
                </label>
                <textarea
                  placeholder="Tell us why you're the perfect candidate for this position..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="form-input min-h-[150px] resize-y"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Upload Resume</label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="resume-upload"
                    className="btn btn-secondary text-sm py-2 cursor-pointer"
                  >
                    Choose File
                  </label>
                  <span className="ml-3 text-sm text-text-muted">{resumeFileName}</span>
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf, .jpg, .png"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </div>
                <p className="mt-1 text-xs text-text-muted">Accepted formats: PDF, JPG, PNG</p>
              </div>

              <button
                className="btn btn-primary w-full py-3 mt-6"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner mr-2 border-white"></div> Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Application;
