import React, { useState } from "react";
import "./auth.css";

function LoginPage({ onLogin, onNavigate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email");
            return;
        }

        setLoading(true);
        
        setTimeout(() => {
            const user = {
                id: 1,
                email: email,
                name: email.split("@")[0],
                avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=random`
            };
            
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authToken", "mock_token_" + Date.now());
            
            setLoading(false);
            onLogin(user);
        }, 1000);
    };

    const handleSocialLogin = (provider) => {
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
            onLogin(user);
        }, 1500);
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
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
                        <h2>Welcome Back</h2>
                        <p className="auth-subtitle">Sign in to continue to your resume</p>

                        {error && (
                            <div className="alert alert-error">
                                <i className="bi bi-exclamation-circle"></i> {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-envelope"></i>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                            </div>

                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-password">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                className="btn-login"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-box-arrow-in-right"></i>
                                        Sign In
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
                                onClick={() => handleSocialLogin('google')}
                                disabled={loading}
                                title="Sign in with Google"
                            >
                                <i className="bi bi-google"></i>
                            </button>
                            <button 
                                type="button"
                                className="social-btn github" 
                                onClick={() => handleSocialLogin('github')}
                                disabled={loading}
                                title="Sign in with GitHub"
                            >
                                <i className="bi bi-github"></i>
                            </button>
                            <button 
                                type="button"
                                className="social-btn linkedin" 
                                onClick={() => handleSocialLogin('linkedin')}
                                disabled={loading}
                                title="Sign in with LinkedIn"
                            >
                                <i className="bi bi-linkedin"></i>
                            </button>
                        </div>

                        <div className="auth-footer">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => onNavigate("signup")}
                                className="link-btn"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
