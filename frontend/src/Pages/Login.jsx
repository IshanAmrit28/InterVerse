import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import illustration from "/illustration.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle login logic, e.g., API call
    console.log("Login Submitted:", formData);
    // Add your API submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans px-4">
      <div className="flex flex-col md:flex-row md:items-center bg-black rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12 md:py-16 items-center">
          <h1 className="text-4xl font-semibold mb-10 text-center">Login</h1>

          {/* Form Element */}
          <form onSubmit={handleSubmit} className="w-full max-w-md">
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
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full rounded-md bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col mb-8 w-full">
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
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full rounded-md bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-[#f8e8b6] text-black font-medium py-2 rounded-md hover:bg-[#f6de96] transition w-full"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-sm text-gray-400 text-center w-full max-w-md">
            <p>
              Don’t have an account?{" "}
              <a href="#" className="text-white hover:underline">
                Sign up
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

export default Login;
