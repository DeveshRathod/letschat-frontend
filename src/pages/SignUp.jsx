import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const SignUp = () => {
  const navigate = useNavigate();
  const { Signup, isLoading } = useUserStore();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Signup(formData);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-sm p-6 shadow-xl bg-base-100 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="input input-bordered  w-full outline-none focus:outline-none focus:ring-0 focus:border-base-content/20"
              required
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input input-bordered  w-full focus:outline-none focus:ring-0 focus:border-base-content/20"
              required
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="input input-bordered  w-full focus:outline-none focus:ring-0 focus:border-base-content/20"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Birthday</span>
            </label>
            <input
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
              className="input input-bordered  w-full focus:outline-none focus:ring-0 focus:border-base-content/20"
              required
            />
          </div>

          <button
            type="submit"
            className="p-2 rounded-sm w-full bg-emerald-600 outline-none focus:outline-none border-0"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-emerald-600 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
