import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, User, Bell, CheckCircle, Bug } from 'lucide-react';
import { motion } from 'framer-motion';
import BugReportModal from './BugReportModal';
import logo from '../assets/kodnest_logo.svg';

import { safeJSONParse } from '../utils/storageUtils';

const Navbar = () => {
    console.log('Navbar rendering');
    const user = safeJSONParse('kodnest_current_user', null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showBugReport, setShowBugReport] = useState(false);

    // Add simple CSS for dropdown hover
    React.useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .nav-dropdown:hover .dropdown-content { display: flex !important; }
            .dropdown-content a:hover { background: #f8fafc; color: var(--primary) !important; }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // Mock Notifications
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New Frontend job at TechCorp!', time: '2m ago', read: false },
        { id: 2, text: 'Your application to DataSystems was viewed.', time: '1h ago', read: false },
        { id: 3, text: 'Complete your profile to get more matches.', time: '1d ago', read: true }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogout = () => {
        localStorage.removeItem('kodnest_current_user');
        window.location.href = '/';
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            // Mark all as read when opening (mock logic)
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }
    };

    return (
        <>
            <BugReportModal isOpen={showBugReport} onClose={() => setShowBugReport(false)} />

            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                backgroundColor: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <motion.div
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                        <img src={logo} alt="KodnestCareers Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/32?text=K"; }} />
                    </motion.div>
                    <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                        KodnestCareers
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link to="/jobs" style={{ fontWeight: 500 }}>Find Jobs</Link>
                    <Link to="/companies" style={{ fontWeight: 500 }}>Companies</Link>
                    <Link to="/dashboard" style={{ fontWeight: 500 }}>Dashboard</Link>
                    <div style={{ position: 'relative', display: 'inline-block' }} className="nav-dropdown">
                        <span style={{ fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Tools ▼</span>
                        <div className="dropdown-content" style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            background: 'white',
                            boxShadow: 'var(--shadow-md)',
                            borderRadius: '4px',
                            display: 'none',
                            flexDirection: 'column',
                            minWidth: '160px',
                            zIndex: 1000
                        }}>
                            <Link to="/resume" style={{ padding: '0.75rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block', borderBottom: '1px solid var(--border)' }}>Resume Builder</Link>
                            <Link to="/cover-letter" style={{ padding: '0.75rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block', borderBottom: '1px solid var(--border)' }}>Cover Letter</Link>
                            <Link to="/roadmap" style={{ padding: '0.75rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block', borderBottom: '1px solid var(--border)' }}>Career Roadmap</Link>
                            <Link to="/assessment" style={{ padding: '0.75rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block' }}>Skill Assessment</Link>
                        </div>
                    </div>
                    <Link to="/inbox" style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Inbox
                    </Link>
                    <button
                        onClick={() => setShowBugReport(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontWeight: 500,
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            padding: 0,
                            fontFamily: 'inherit'
                        }}
                    >
                        <Bug size={18} /> Report Bug
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {/* Notification Bell */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={toggleNotifications}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
                        >
                            <Bell size={24} color="var(--text-secondary)" />
                            {unreadCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    background: 'var(--error)',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="card" style={{
                                position: 'absolute',
                                top: '40px',
                                right: '-10px',
                                width: '300px',
                                boxShadow: 'var(--shadow-lg)',
                                padding: '0',
                                zIndex: 1000
                            }}>
                                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold' }}>
                                    Notifications
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {notifications.map(n => (
                                        <div key={n.id} style={{
                                            padding: '1rem',
                                            borderBottom: '1px solid var(--border)',
                                            background: n.read ? 'white' : '#f0f9ff'
                                        }}>
                                            <p style={{ margin: 0, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{n.text}</p>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{n.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {user ? (
                        <>
                            <span style={{ fontWeight: 500 }}>{user.name}</span>
                            <Link to="/settings" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Settings</Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
