import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  try {


    console.log("Entering to postroute")
    const { role } = req.user;


    console.log(req.user);
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    console.log("cloudanry error", resume.mimetype)
    return next(

    
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log("cloudanry error", resume.mimetype)
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;


  console.log("The job application details : ",req.body);

  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };


  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
  } catch (error) {
    console.log("The application submisssion ", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
});




export const employerGetAllApplications = async(req,res) =>{
  try {
    
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({ 
      message:"internal server error while fetching the applications for the employer",
      error:error.message
  })
}
}
 

export const  jobseekerGetAllApplications = async (req,res) =>{
  try {
      const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }
      const { _id } = req.user;
  
  
      const applications = await Application.find({ "applicantID.user": _id });
  
  

      res.status(200).json({
        success: true,
        applications,
      });
    
  } catch (error) {
    console.log("Error in jobseekerGetAllApplications: ", error);
  }
}

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
