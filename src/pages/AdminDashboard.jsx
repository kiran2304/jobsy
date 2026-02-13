import React, { useState, useEffect } from 'react';
import { getJobs, addJob, deleteJob, loginAdmin } from '../services/api';
import { Trash2, Plus, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

import { useUI } from '../context/UIContext';

const AdminDashboard = () => {
    const { confirm, showToast } = useUI();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [newJob, setNewJob] = useState({ title: '', company: '', location: '', salary: '', type: 'Full-time', description: '' });
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            setIsAuthenticated(true);
            fetchJobs();
        }
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginAdmin(credentials.username, credentials.password);
            localStorage.setItem('admin_token', data.token);
            setIsAuthenticated(true);
            fetchJobs();
            showToast('Welcome back, Admin!', 'success');
        } catch (error) {
            showToast('Invalid credentials', 'error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        setIsAuthenticated(false);
    };

    const handleDelete = async (id) => {
        if (await confirm('Are you sure you want to delete this job?', 'Delete Job')) {
            try {
                await deleteJob(id);
                setJobs(jobs.filter(job => job.id !== id));
                showToast('Job deleted successfully', 'success');
            } catch (error) {
                showToast('Failed to delete job', 'error');
            }
        }
    };

    const handleAddJob = async (e) => {
        e.preventDefault();
        try {
            const job = await addJob(newJob);
            setJobs([...jobs, job]);
            setShowAddModal(false);
            setNewJob({ title: '', company: '', location: '', salary: '', type: 'Full-time', description: '' });
            showToast('Job added successfully', 'success');
        } catch (error) {
            showToast('Failed to add job', 'error');
        }
    };

    if (!isAuthenticated) {
        return (
            <PageTransition>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card"
                        style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}
                    >
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Username (admin)"
                                value={credentials.username}
                                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)' }}
                            />
                            <input
                                type="password"
                                placeholder="Password (admin123)"
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>Login</button>
                        </form>
                    </motion.div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="container" style={{ padding: '2rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
                            <Plus size={18} /> Add Job
                        </button>
                        <button onClick={handleLogout} className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading jobs...</div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <AnimatePresence>
                            {jobs.map(job => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                                    className="card"
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{job.title}</h3>
                                        <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>{job.company} • {job.location}</p>
                                    </div>
                                    <button onClick={() => handleDelete(job.id)} className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'var(--border)', padding: '0.5rem' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {jobs.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No jobs found.</p>}
                    </div>
                )}

                {/* Add Job Modal */}
                <AnimatePresence>
                    {showAddModal && (
                        <div style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                        }} onClick={() => setShowAddModal(false)}>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="card"
                                style={{ width: '500px', maxWidth: '90%', padding: '2rem' }}
                                onClick={e => e.stopPropagation()}
                            >
                                <h2 style={{ marginTop: 0 }}>Add New Job</h2>
                                <form onSubmit={handleAddJob} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <input
                                        placeholder="Job Title"
                                        required
                                        value={newJob.title}
                                        onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)' }}
                                    />
                                    <input
                                        placeholder="Company Name"
                                        required
                                        value={newJob.company}
                                        onChange={e => setNewJob({ ...newJob, company: e.target.value })}
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)' }}
                                    />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <input
                                            placeholder="Location"
                                            value={newJob.location}
                                            onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)' }}
                                        />
                                        <input
                                            placeholder="Salary (e.g. ₹10L - ₹20L)"
                                            value={newJob.salary}
                                            onChange={e => setNewJob({ ...newJob, salary: e.target.value })}
                                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)' }}
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Description"
                                        rows={4}
                                        value={newJob.description}
                                        onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                    />
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Add Job</button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;
