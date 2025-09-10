import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [theme, setTheme] = useState('dark');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  };

  const contentWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const headerStyle = {
    padding: '1rem 0',
    borderBottom: '1px solid #cccccc',
    width: '100%',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    padding: '2rem',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  };

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'left',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
  };

  const passwordInputStyle = { position: 'relative', width: '100%' };

  const eyeIconStyle = {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '1.2rem',
    background: 'none',
    border: 'none',
    color: '#007bff',
  };

  const forgotLinkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
    width: '100%',
  };

  const noteStyle = {
    fontSize: '0.9rem',
    color: theme === 'dark' ? '#cccccc' : '#666666',
    marginTop: '1rem',
    textAlign: 'center',
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === formData.email);

    if (!user) {
      setErrors({ email: "This email is not registered." });
      return;
    }

    if (user.password !== formData.password) {
      setErrors({ password: "Invalid password." });
      return;
    }

    alert("Login successful! Redirecting...");
    console.log("Login data:", formData);
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <header style={headerStyle}>
          <h1 style={{ color: '#007bff', margin: 0, fontSize: '2rem' }}>IM</h1>
          <h2 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>
            Inventory Management (SaaS)
          </h2>
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Toggle theme
          </button>
        </header>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            {errors.email && <span style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{errors.email}</span>}
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Password</label>
            <div style={passwordInputStyle}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={eyeIconStyle}
              >
                {showPassword ? '👀' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{errors.password}</span>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="/forgot-password" style={forgotLinkStyle}>
              Forgot password?
            </a>
          </div>

          <button type="submit" style={buttonStyle}>Sign in</button>
        </form>

        <p style={noteStyle}>
          Don’t have an account?{" "}
          <a href="/register" style={{ color: '#007bff', textDecoration: 'underline' }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
