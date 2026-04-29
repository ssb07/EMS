import React, { useState } from "react";
import { loginUser, signupUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!email || !password) {
      return "Email and password are required";
    }
    if (!isLogin && !name) {
      return "Name is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      return setError(validationError);
    }

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const res = await loginUser({ email, password });

        localStorage.setItem("token", res.token);
        navigate("/dashboard"); // ✅ proper navigation
      } else {
        await signupUser({ name, email, password });

        alert("Signup successful");
        setIsLogin(true);
      }

      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C67A0]">
  <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">

    {/* Toggle */}
    <div className="flex mb-5">
      <button
        className={`w-1/2 py-2 text-sm font-medium rounded-tl-xl ${
          isLogin ? "bg-[#033452] text-white" : "bg-gray-200"
        }`}
        onClick={() => setIsLogin(true)}
      >
        Log In
      </button>

      <button
        className={`w-1/2 py-2 text-sm font-medium rounded-tr-xl ${
          !isLogin ? "bg-[#033452] text-white" : "bg-gray-200"
        }`}
        onClick={() => setIsLogin(false)}
      >
        Sign Up
      </button>
    </div>

    {/* Form */}
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {!isLogin && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
          className="p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#033452]"
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        className="p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#033452]"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
        className="p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#033452]"
      />

      {isLogin && (
        <a href="#" className="text-sm text-blue-500 text-right mb-2">
          Forgot Password?
        </a>
      )}

      <button
        type="submit"
        disabled={loading}
        className="py-2 bg-[#033452] text-white rounded-md hover:opacity-90 transition"
      >
        {loading
          ? "Please wait..."
          : isLogin
          ? "Log In"
          : "Sign Up"}
      </button>

      <p className="text-center mt-3 text-sm">
        {isLogin ? "Not a member?" : "Already have an account?"}{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Log In"}
        </span>
      </p>
    </form>
  </div>
</div>
  );
};

export default AuthForm;