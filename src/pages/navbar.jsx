import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";

function Navbar({ user, onLogout, onNavigate }) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const menuRef = useRef(null);

    // fallback avatar using ui-avatars if none provided
    const avatarSrc = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0ea5e9&color=fff&size=128`;

    useEffect(() => {
        const onDocClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    const handleNavClick = (destination) => {
        onNavigate?.(destination);
        setShowMobileMenu(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand" role="button" onClick={() => handleNavClick('dashboard')}>
                    <i className="bi bi-file-earmark-person"></i>
                    <span>ResumeAI</span>
                </div>

                <button className="navbar-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)} aria-label="Toggle menu">
                    <i className={`bi ${showMobileMenu ? 'bi-x-lg' : 'bi-list'}`}></i>
                </button>

                <div className={`navbar-menu ${showMobileMenu ? 'active' : ''}`}>
                    <button onClick={() => handleNavClick('dashboard')} className="nav-link nav-button">
                        <i className="bi bi-house-door"></i>
                        <span>Dashboard</span>
                    </button>
                    <button onClick={() => handleNavClick('myresumes')} className="nav-link nav-button">
                        <i className="bi bi-file-text"></i>
                        <span>My Resumes</span>
                    </button>
                    <button onClick={() => handleNavClick('help')} className="nav-link nav-button">
                        <i className="bi bi-question-circle"></i>
                        <span>Help</span>
                    </button>
                </div>

                <div className="navbar-right">
                    <button className="btn-create" onClick={() => handleNavClick('home')}>
                        <i className="bi bi-plus-circle"></i>
                        <span>Create Resume</span>
                    </button>

                    <button className="btn-logout" onClick={onLogout} title="Sign Out">
                        <i className="bi bi-box-arrow-right"></i>
                    </button>

                    <div className="user-menu" ref={menuRef}>
                        <button
                            type="button"
                            className="user-button"
                            onClick={() => setShowUserMenu((s) => !s)}
                            aria-expanded={showUserMenu}
                            aria-label="User menu"
                        >
                            <img src={avatarSrc} alt={user?.name || 'User'} className="user-avatar" onError={(e) => { e.target.src = avatarSrc; }} />
                            <span className="user-name">{user?.name || 'User'}</span>
                            <i className={`bi bi-chevron-down ${showUserMenu ? 'open' : ''}`}></i>
                        </button>

                        {showUserMenu && (
                            <div className="dropdown-menu">
                                <div className="dropdown-header">
                                    <img src={avatarSrc} alt={user?.name} className="avatar-lg" onError={(e) => { e.target.src = avatarSrc; }} />
                                    <div>
                                        <p className="dropdown-name">{user?.name}</p>
                                        <p className="dropdown-email">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="dropdown-divider"></div>

                                <button type="button" className="dropdown-item" onClick={() => { handleNavClick('dashboard'); setShowUserMenu(false); }}>
                                    <i className="bi bi-person-circle"></i>
                                    <span>View Profile</span>
                                </button>
                                <button type="button" className="dropdown-item" onClick={() => { handleNavClick('dashboard'); setShowUserMenu(false); }}>
                                    <i className="bi bi-gear"></i>
                                    <span>Settings</span>
                                </button>

                                <div className="dropdown-divider"></div>

                                <button onClick={onLogout} className="dropdown-item logout">
                                    <i className="bi bi-box-arrow-left"></i>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
