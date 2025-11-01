import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import illustration from "/illustration.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate", // Default role
  });

  const handleChange = (e) => {
    // Use 'name' attribute to update state, which is standard for radio groups
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add your API submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans px-4">
      <div className="flex flex-col md:flex-row md:items-center bg-black rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12 md:py-16 items-center">
          <h1 className="text-4xl font-semibold mb-10 text-center">Sign Up</h1>

          {/* Form Element */}
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            {/* Name */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="name" className="text-base font-medium mb-2">
                Name
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name" // Add name attribute
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full rounded-md bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="flex flex-col mb-6 w-full">
              <label className="text-base font-medium mb-3">Select Role</label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="candidate"
                    name="role"
                    value="candidate"
                    checked={formData.role === "candidate"}
                    onChange={handleChange}
                    className="w-4 h-4 cursor-pointer text-[#6666e9] bg-gray-700 border-gray-600 "
                  />
                  <label
                    htmlFor="candidate"
                    className="ml-2 text-sm font-medium text-gray-300 cursor-pointer"
                  >
                    Candidate
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="recruiter"
                    name="role"
                    value="recruiter"
                    checked={formData.role === "recruiter"}
                    onChange={handleChange}
                    className="w-4 h-4 cursor-pointer text-[#6666e9] bg-gray-700 border-gray-600 "
                  />
                  <label
                    htmlFor="recruiter"
                    className="ml-2 text-sm font-medium text-gray-300 cursor-pointer"
                  >
                    Recruiter
                  </label>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="email" className="text-base font-medium mb-2">
                Email
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdEmail className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email" // Add name attribute
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full rounded-md bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="password" className="text-base font-medium mb-2">
                Password
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <RiLockPasswordFill className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password" // Add name attribute
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full rounded-md bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col mb-8 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-base font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <RiLockPasswordFill className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword" // Add name attribute
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full rounded-md bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition"
                  required
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="bg-[#f8e8b6] text-black font-medium py-2 rounded-md hover:bg-[#f6de96] transition w-full"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-sm text-gray-400 text-center w-full max-w-md">
            <p>
              Already have an account?{" "}
              <a href="#" className="text-white hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 bg-[#d3c5a6] rounded-3xl overflow-hidden h-[550px] relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={illustration}
              alt="AI Interview Illustration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-6 right-6 bg-white/70 text-black rounded-2xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-1">
              AI-Powered Interviewer
            </h2>
            <p className="text-sm leading-snug">
              Transform recruitment with our cutting-edge AI Interviewer
              platform—designed to analyze resumes intelligently and conduct
              personalized virtual interviews. Seamlessly integrate into your
              hiring workflow to automate candidate screening, reduce bias, and
              accelerate decision-making.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
