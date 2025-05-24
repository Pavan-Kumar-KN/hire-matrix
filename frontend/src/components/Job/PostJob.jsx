import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../main";
import {
  Briefcase,
  MapPin,
  DollarSign,
  FileText,
  Building2,
  Globe,
  ArrowLeft,
  Tag,
  Info
} from "lucide-react";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleJobPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      toast.success(data.message);
      navigateTo("/job/me");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light-bg min-h-screen py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/job/me"
            className="inline-flex items-center text-text-dark hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft size={16} className="mr-1.5" /> Back to My Jobs
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">Post a New Job</h1>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-4"></div>
          <p className="text-text-muted text-sm md:text-base">
            Create a job listing to find the perfect candidate for your team
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="card shadow-card overflow-hidden">
              <div className="bg-primary px-5 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Job Details
                </h2>
              </div>

              <form onSubmit={handleJobPost} className="p-5 space-y-6">
                {/* Job Title */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-dark flex items-center">
                    <Briefcase className="w-4 h-4 mr-1.5 text-primary" />
                    Job Title <span className="text-error ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="form-input"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-dark flex items-center">
                    <Tag className="w-4 h-4 mr-1.5 text-primary" />
                    Category <span className="text-error ml-0.5">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Frontend Web Development">Frontend Web Development</option>
                    <option value="MERN Stack Development">MERN Stack Development</option>
                    <option value="Account & Finance">Account & Finance</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Video Animation">Video Animation</option>
                    <option value="MEAN Stack Development">MEAN Stack Development</option>
                    <option value="MEVN Stack Development">MEVN Stack Development</option>
                    <option value="Data Entry Operator">Data Entry Operator</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-text-dark border-b border-border pb-2">
                    Location Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-dark flex items-center">
                        <Globe className="w-4 h-4 mr-1.5 text-primary" />
                        Country <span className="text-error ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="e.g. United States"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-dark flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                        City <span className="text-error ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. New York"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-dark flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                      Full Address <span className="text-text-muted text-xs ml-1">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. 123 Main Street, Downtown"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Salary */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-text-dark border-b border-border pb-2">
                    Compensation Details
                  </h3>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-dark flex items-center">
                      <DollarSign className="w-4 h-4 mr-1.5 text-primary" />
                      Salary Type <span className="text-error ml-0.5">*</span>
                    </label>
                    <select
                      value={salaryType}
                      onChange={(e) => setSalaryType(e.target.value)}
                      className="form-input"
                      required
                    >
                      <option value="default">Select Salary Type</option>
                      <option value="Fixed Salary">Fixed Salary</option>
                      <option value="Ranged Salary">Ranged Salary</option>
                    </select>
                  </div>

                  {salaryType === "default" ? (
                    <div className="bg-light-bg border border-border rounded p-3">
                      <p className="text-xs text-text-muted flex items-center">
                        <Info className="w-3.5 h-3.5 mr-1.5 text-primary" />
                        Please select a salary type to continue
                      </p>
                    </div>
                  ) : salaryType === "Fixed Salary" ? (
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-dark">
                        Fixed Salary Amount <span className="text-error ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="number"
                          placeholder="Enter fixed salary amount"
                          value={fixedSalary}
                          onChange={(e) => setFixedSalary(e.target.value)}
                          className="form-input pl-10"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-text-dark">
                          Minimum Salary <span className="text-error ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="number"
                            placeholder="From"
                            value={salaryFrom}
                            onChange={(e) => setSalaryFrom(e.target.value)}
                            className="form-input pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-text-dark">
                          Maximum Salary <span className="text-error ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="number"
                            placeholder="To"
                            value={salaryTo}
                            onChange={(e) => setSalaryTo(e.target.value)}
                            className="form-input pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Description */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-text-dark border-b border-border pb-2">
                    Job Description
                  </h3>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-dark flex items-center">
                      <FileText className="w-4 h-4 mr-1.5 text-primary" />
                      Description <span className="text-error ml-0.5">*</span>
                    </label>
                    <textarea
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide a detailed description of the job role, responsibilities, requirements, and qualifications..."
                      className="form-input resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full py-2.5"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner mr-2 border-white"></div>
                        <span>Posting Job...</span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>Post Job</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Tips and Information */}
          <div className="lg:col-span-1">
            <div className="card shadow-card p-5 mb-6">
              <h3 className="text-base font-semibold text-text-dark mb-3 flex items-center">
                <Info className="w-4 h-4 mr-1.5 text-primary" />
                Tips for a Great Job Post
              </h3>
              <ul className="space-y-2.5 text-sm text-text-muted">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                  <span>Be specific about responsibilities and requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                  <span>Include information about your company culture</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                  <span>Mention benefits and perks to attract top talent</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                  <span>Be transparent about the salary range</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                  <span>Highlight growth opportunities within your company</span>
                </li>
              </ul>
            </div>

            <div className="card shadow-card p-5">
              <h3 className="text-base font-semibold text-text-dark mb-3">What Happens Next?</h3>
              <ol className="space-y-3 text-sm text-text-muted">
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-medium mr-2">1</span>
                  <span>Your job will be reviewed and published</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-medium mr-2">2</span>
                  <span>Candidates will be able to view and apply</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-medium mr-2">3</span>
                  <span>You'll receive notifications for new applications</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-medium mr-2">4</span>
                  <span>Review applications and contact candidates</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-text-muted text-xs">
            By posting this job, you agree to our <Link to="#" className="text-primary hover:underline">terms and conditions</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostJob;