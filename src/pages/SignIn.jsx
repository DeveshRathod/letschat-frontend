import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const SignIn = () => {
  const navigate = useNavigate();
  const { Signin, isSigningIn } = useUserStore();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Signin(formData);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-sm p-6 shadow-xl bg-base-100 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email or Username</span>
            </label>
            <input
              name="identifier"
              type="text"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter email or username"
              className="input input-bordered  w-full outline-none focus:outline-none focus:ring-0 focus:border-base-content/20"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input input-bordered  w-full outline-none focus:outline-none focus:ring-0 focus:border-base-content/20"
              required
            />
          </div>

          <button
            type="submit"
            className="p-2 rounded-sm w-full bg-emerald-600 outline-none focus:outline-none border-0"
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
