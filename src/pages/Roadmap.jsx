import React, { useState } from 'react';
import { BookOpen, PlayCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROADMAP_STEPS = [
    {
        id: 1,
        title: 'HTML & CSS Fundamentals',
        description: 'Master the building blocks of the web. Learn semantic HTML, Flexbox, Grid, and responsive design.',
        type: 'frontend',
        status: 'completed',
        resources: [
            { type: 'article', title: 'MDN Web Docs: HTML Basics', link: '#' },
            { type: 'video', title: 'CSS Grid Crash Course', link: '#' }
        ]
    },
    {
        id: 2,
        title: 'JavaScript Deep Dive',
        description: 'Understand the language of the web. loops, functions, ES6+, DOM manipulation, and async programming.',
        type: 'frontend',
        status: 'in-progress',
        resources: [
            { type: 'article', title: 'JavaScript.info', link: '#' },
            { type: 'video', title: 'Async JS Explained', link: '#' }
        ]
    },
    {
        id: 3,
        title: 'React.js Essentials',
        description: 'Build modern UIs with components, hooks, state management, and routing.',
        type: 'frontend',
        status: 'pending',
        resources: [
            { type: 'article', title: 'React Official Docs', link: '#' },
            { type: 'video', title: 'React Hooks Guide', link: '#' }
        ]
    },
    {
        id: 4,
        title: 'Version Control (Git)',
        description: 'Learn collaborative coding, branching strategies, and pull requests.',
        type: 'general',
        status: 'pending',
        resources: [
            { type: 'article', title: 'Git Handbook', link: '#' }
        ]
    }
];

const Roadmap = () => {
    // In a real app, we would fetch this based on the user's applied roles or selection
    const [steps, setSteps] = useState(ROADMAP_STEPS);

    const toggleStatus = (id) => {
        setSteps(prev => prev.map(step => {
            if (step.id === id) {
                return { ...step, status: step.status === 'completed' ? 'pending' : 'completed' };
            }
            return step;
        }));
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Frontend Developer Roadmap</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                    Follow this curated path to become a job-ready Frontend Engineer. <br />
                    Complete steps to unlock assessments and earn badges.
                </p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: '2rem' }}>
                {/* Connecting Line */}
                <div style={{
                    position: 'absolute',
                    left: '23px',
                    top: '2rem',
                    bottom: '2rem',
                    width: '4px',
                    background: '#e2e8f0',
                    zIndex: 0
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {steps.map((step, index) => (
                        <div key={step.id} className="card" style={{
                            marginLeft: '2rem',
                            position: 'relative',
                            borderLeft: step.status === 'completed' ? '4px solid var(--success)' : step.status === 'in-progress' ? '4px solid var(--accent)' : '4px solid transparent',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}>
                            {/* Node Marker */}
                            <div style={{
                                position: 'absolute',
                                left: '-3.4rem',
                                top: '1.5rem',
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '50%',
                                background: 'white',
                                border: `4px solid ${step.status === 'completed' ? 'var(--success)' : step.status === 'in-progress' ? 'var(--accent)' : '#cbd5e1'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: 'var(--text-main)',
                                zIndex: 1,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                {index + 1}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', margin: 0 }}>{step.title}</h3>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{step.description}</p>
                                </div>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '1rem',
                                    background: step.status === 'completed' ? '#dcfce7' : step.status === 'in-progress' ? '#e0f2fe' : '#f1f5f9',
                                    color: step.status === 'completed' ? 'var(--success)' : step.status === 'in-progress' ? 'var(--accent)' : 'var(--text-secondary)',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {step.status === 'completed' ? 'Completed' : step.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                </span>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.8rem', marginBottom: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended Resources</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {step.resources.map((res, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                                            {res.type === 'article' ? <BookOpen size={16} color="var(--accent)" /> : <PlayCircle size={16} color="#ef4444" />}
                                            <a href={res.link} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }} onClick={e => e.preventDefault()}>{res.title}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <button
                                    onClick={() => toggleStatus(step.id)}
                                    className={`btn ${step.status === 'completed' ? 'btn-outline' : 'btn-primary'}`}
                                    style={{ fontSize: '0.9rem' }}
                                >
                                    {step.status === 'completed' ? 'Mark Incomplete' : 'Mark as Complete'}
                                </button>

                                {step.status === 'completed' && (
                                    <Link to="/assessment" className="btn" style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        background: '#f1f5f9', color: 'var(--primary)',
                                        fontSize: '0.9rem'
                                    }}>
                                        Take Quiz <ArrowRight size={16} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
