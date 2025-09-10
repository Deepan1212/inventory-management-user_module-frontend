import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Register.css';

const Register = () => {
  const [theme, setTheme] = useState('dark');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    role: 'User',
    company: '',
    location: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    verificationCode: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.username || formData.username.length < 3 || formData.username.length > 32) {
      newErrors.username = 'Provide a valid username (3–32 chars).';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required.';
    } else {
      // Check if email already exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const exists = users.find((u) => u.email === formData.email);
      if (exists) {
        newErrors.email = 'Email ID is already registered. Please login.';
        setTimeout(() => navigate('/login'), 1000);
      }
    }
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number.';
    }
    if (!formData.role) newErrors.role = 'Please choose a role.';
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.agreeTerms) newErrors.terms = 'You must agree to the Terms and Privacy Policy.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.verificationCode || formData.verificationCode !== '123456') {
      newErrors.verificationCode = 'Invalid verification code. Please try again.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      alert('A verification code has been sent to your email. Enter it to proceed. (Simulated code: 123456)');
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      setIsVerified(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 3 && isVerified) {
      // Save user to localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        role: formData.role,
      });
      localStorage.setItem("users", JSON.stringify(users));

      alert('Account created successfully! Please login.');
      console.log('Registered user:', formData);
      navigate('/login');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={`register-container ${theme}`}>
      <header className="header">
        <h1>IM</h1>
        <h2>Inventory Management (SaaS)</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          Toggle theme
        </button>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h3>Create your account</h3>
          <div className="steps">
            <span className={`step ${step === 1 ? 'active' : ''}`}>1 Profile</span>
            <span className={`step ${step === 2 ? 'active' : ''}`}>2 Verify</span>
            <span className={`step ${step === 3 ? 'active' : ''}`}>3 Complete</span>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                {/* Profile Fields */}
                <div className="form-row">
                  <div className="form-group">
                    <label>First name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Last name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Username *</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                    {errors.username && <span className="error">{errors.username}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}/>
                    {errors.phone && <span className="error">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label>Role *</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                      <option value="User">User</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Agent">Agent</option>
                    </select>
                    {errors.role && <span className="error">{errors.role}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password *</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <span className="eye-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? '👀' : '👁️‍🗨️'}
                      </span>
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                  </div>
                  <div className="form-group">
                    <label>Confirm password *</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                  </div>
                </div>

                <div className="terms">
                  <input
                    type="checkbox"
                    id="terms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <label htmlFor="terms">I agree to the Terms and Privacy Policy.</label>
                  {errors.terms && <span className="error">{errors.terms}</span>}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group">
                  <label>Verification Code *</label>
                  <input type="text" name="verificationCode" value={formData.verificationCode} onChange={handleChange}/>
                  {errors.verificationCode && <span className="error">{errors.verificationCode}</span>}
                </div>
                <p className="note">Check your email for the code. (Simulated code: 123456)</p>
              </>
            )}

            {step === 3 && (
              <div className="form-group">
                <h3>Account Created!</h3>
                <p>You can now log in.</p>
              </div>
            )}

            <div className="form-actions">
              {step > 1 && <button type="button" className="secondary" onClick={() => setStep(step - 1)}>Back</button>}
              {step < 3 && <button type="button" className="primary" onClick={handleNext}>Next</button>}
              {step === 3 && <button type="submit" className="primary">Finish</button>}
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">© 2025 IMS • SaaS • User Management / Register</footer>
    </div>
  );
};

export default Register;
