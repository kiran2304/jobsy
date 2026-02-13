import React from 'react';
import { Search, MapPin, ArrowRight, CheckCircle, Users, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <header style={{
                textAlign: 'center',
                padding: '8rem 2rem 6rem',
                background: 'linear-gradient(to bottom, rgba(37, 99, 235, 0.05), white)',
                marginBottom: '4rem'
            }}>
                <div className="container">
                    <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#eff6ff', color: 'var(--primary)', borderRadius: '2rem', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        🚀 The #1 Job Ecosystem for Tech Talent
                    </div>
                    <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--text-main)', lineHeight: 1.1, fontWeight: 800 }}>
                        Find your dream job with <span style={{
                            background: 'linear-gradient(to right, var(--primary), var(--accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>KodnestCareers</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        More than just a job board. KodnestCareers is an intelligent ecosystem that helps you build your resume, prepare for interviews, and get hired by top companies.
                    </p>

                    {/* Search Bar */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: 'white',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        maxWidth: '800px',
                        width: '100%',
                        border: '1px solid var(--border)'
                    }}>
                        <Search color="var(--text-secondary)" size={20} style={{ marginLeft: '1rem' }} />
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            style={{ border: 'none', padding: '1rem', fontSize: '1rem', flex: 1, outline: 'none' }}
                        />
                        <div style={{ width: '1px', height: '30px', background: 'var(--border)', margin: '0 1rem' }}></div>
                        <MapPin color="var(--text-secondary)" size={20} />
                        <input
                            type="text"
                            placeholder="City, state, or zip"
                            style={{ border: 'none', padding: '1rem', fontSize: '1rem', flex: 1, outline: 'none' }}
                        />
                        <Link to="/jobs" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
                            Find Jobs
                        </Link>
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--success)" /> No credit card required</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--success)" /> 14-day free trial</span>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <div className="container" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
                    {[
                        { label: 'Active Jobs', value: '10k+', icon: Briefcase },
                        { label: 'Companies', value: '500+', icon: TrendingUp },
                        { label: 'Job Seekers', value: '1M+', icon: Users },
                    ].map((stat, i) => (
                        <div key={i} className="card" style={{ padding: '2rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--primary)' }}>
                                <stat.icon size={24} />
                            </div>
                            <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem', color: 'var(--text-main)' }}>{stat.value}</h3>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div style={{ background: '#f8fafc', padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How KodnestCareers Works</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Our streamlined process helps you find the right job and get hired faster than ever before.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
                        {[
                            { title: 'Create Profile', desc: 'Build a standout profile with our AI Resume Builder.', step: '01' },
                            { title: 'Get Matched', desc: 'Our algorithm connects you with jobs that fit your skills.', step: '02' },
                            { title: 'Get Hired', desc: 'Apply with one click and track your applications.', step: '03' },
                        ].map((item, i) => (
                            <div key={i} style={{ position: 'relative' }}>
                                <div style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(0,0,0,0.05)', position: 'absolute', top: '-1.5rem', left: '-1rem' }}>
                                    {item.step}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', position: 'relative' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Explore Categories */}
            <div className="container" style={{ padding: '6rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Explore Categories</h2>
                    <Link to="/jobs" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                        View all jobs <ArrowRight size={20} />
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '2rem'
                }}>
                    {['Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'Finance', 'Human Resources', 'Operations'].map((cat) => (
                        <div key={cat} className="card" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', padding: '2rem' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{cat}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>100+ Openings</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div style={{ background: 'var(--primary)', padding: '5rem 0', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to start your career?</h2>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Join thousands of professionals who have found their dream jobs through KodnestCareers.
                    </p>
                    <Link to="/signup" className="btn" style={{
                        background: 'white',
                        color: 'var(--primary)',
                        padding: '1rem 2.5rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        border: 'none'
                    }}>
                        Create Free Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
