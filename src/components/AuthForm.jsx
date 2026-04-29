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
    <div className="container">
      <div className="form-container">

        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Log In" : "Sign Up"}</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
              ? "Log In"
              : "Sign Up"}
          </button>

          <p>
            {isLogin ? "Not a member?" : "Already have an account?"}{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
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