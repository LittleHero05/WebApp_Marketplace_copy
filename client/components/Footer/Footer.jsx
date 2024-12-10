import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/auth-context';
import './Footer.css'; // Import the CSS file

const Footer = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    }

    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>Support</h4>
                <ul>
                    <li><a href="/help">Help Center</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/faq">FAQ</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Account</h4>
                <ul>
                    {!isAuthenticated ? (
                        <>
                            <li><a href="/signin">Login</a></li>
                        </>
                    ) : (
                        <li>
                            <button onClick={() => logout(() => navigate('/signin'))} className="logout-button">
                                Logout
                            </button>
                        </li>
                    )}
                    <li><a href="/signup">Sign Up</a></li>
                    {isAuthenticated ? (
                        <>
                            <li><a href="/profile">Profile</a></li>
                        </>
                    ) : (
                        <>
                            <li className='hidden'><a href="/profile">Profile</a></li>
                        </>
                    )}
                </ul>
            </div>
            <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;