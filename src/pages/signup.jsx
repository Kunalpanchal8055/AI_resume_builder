import React, { useState } from "react";
import "./auth.css";

function SignupPage({ onSignup, onNavigate }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            return false;
        }

        if (formData.name.length < 2) {
            setError("Name must be at least 2 characters");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Please enter a valid email");
            return false;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);

        setTimeout(() => {
            const user = {
                id: Math.random(),
                email: formData.email,
                name: formData.name,
                avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=random`
            };

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authToken", "mock_token_" + Date.now());

            setLoading(false);
            onSignup(user);
        }, 1000);
    };

    const generatePassword = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~';
        let pass = '';
        for (let i = 0; i < 12; i++) pass += chars[Math.floor(Math.random() * chars.length)];
        setFormData(prev => ({ ...prev, password: pass, confirmPassword: pass }));
    };

    const handleSocialSignup = (provider) => {
        setLoading(true);
        setTimeout(() => {
            const socialEmails = {
                google: 'user@gmail.com',
                github: 'user@github.com',
                linkedin: 'user@linkedin.com'
            };
            
            const user = {
                id: Math.random(),
                email: socialEmails[provider] || 'user@example.com',
                name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
                provider: provider,
                avatar: `https://ui-avatars.com/api/?name=${provider}&background=random`
            };

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authToken", "mock_token_" + Date.now());

            setLoading(false);
            onSignup(user);
        }, 1500);
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper auth-signup">
                {/* Left Side - Branding */}
                <div className="auth-brand">
                    <div className="brand-content">
                        <div className="brand-icon">
                            <i className="bi bi-file-earmark-person"></i>
                        </div>
                        <h1>ResumeAI</h1>
                        <p>Your AI-Powered Resume Builder</p>
                        <div className="brand-features">
                            <div className="feature">
                                <i className="bi bi-lightning-charge"></i>
                                <span>AI-Powered</span>
                            </div>
                            <div className="feature">
                                <i className="bi bi-palette"></i>
                                <span>Beautiful Templates</span>
                            </div>
                            <div className="feature">
                                <i className="bi bi-download"></i>
                                <span>Easy Export</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="auth-form-container">
                    <div className="auth-form">
                        <h2>Create Account</h2>
                        <p className="auth-subtitle">Join thousands building amazing resumes</p>

                        {error && (
                            <div className="alert alert-error">
                                <i className="bi bi-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-person"></i>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-envelope"></i>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-lock"></i>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="At least 6 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi bi-eye${!showPassword ? '-slash' : ''}`}></i>
                                    </button>
                                </div>
                                <div className="password-actions">
                                    <button type="button" className="btn-link small" onClick={generatePassword}>Generate strong password</button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-lock-fill"></i>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <i className={`bi bi-eye${!showConfirmPassword ? '-slash' : ''}`}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="terms">
                                <label>
                                    <input type="checkbox" required />
                                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn-login"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-person-plus"></i>
                                        Sign Up
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <div className="social-login">
                            <button 
                                type="button"
                                className="social-btn google"
                                onClick={() => handleSocialSignup('google')}
                                disabled={loading}
                                title="Sign up with Google"
                            >
                                <i className="bi bi-google"></i>
                            </button>
                            <button 
                                type="button"
                                className="social-btn github"
                                onClick={() => handleSocialSignup('github')}
                                disabled={loading}
                                title="Sign up with GitHub"
                            >
                                <i className="bi bi-github"></i>
                            </button>
                            <button 
                                type="button"
                                className="social-btn linkedin"
                                onClick={() => handleSocialSignup('linkedin')}
                                disabled={loading}
                                title="Sign up with LinkedIn"
                            >
                                <i className="bi bi-linkedin"></i>
                            </button>
                        </div>

                        <div className="auth-footer">
                            Already have an account?{" "}
                            <button
                                onClick={() => onNavigate("login")}
                                className="link-btn"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
