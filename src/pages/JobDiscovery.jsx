import React, { useState } from 'react';
import { safeJSONParse, safeJSONStringify } from '../utils/storageUtils';
import { Search, MapPin, Briefcase, DollarSign, Filter } from 'lucide-react';



// Imports
// Imports
import { getJobs } from '../services/api';
import { useLocation } from 'react-router-dom';
import { useUI } from '../context/UIContext';

const JobDiscovery = () => {
    const location = useLocation();
    const { confirm, alert, showToast, showStatus } = useUI();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch jobs from API
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getJobs();
                setJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const [searchTerm, setSearchTerm] = useState(location.state?.company || '');
    const [filters, setFilters] = useState({
        type: [],
        remote: false,
        location: [],
        minSalary: 0,
        skills: []
    });

    // Extract unique locations and skills for filter options
    const uniqueLocations = [...new Set(jobs.map(job => job.location))];
    const uniqueSkills = [...new Set(jobs.flatMap(job => job.skills))];

    const handleTypeChange = (type) => {
        setFilters(prev => ({
            ...prev,
            type: prev.type.includes(type)
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type]
        }));
    };

    const handleLocationChange = (loc) => {
        setFilters(prev => ({
            ...prev,
            location: prev.location.includes(loc)
                ? prev.location.filter(l => l !== loc)
                : [...prev.location, loc]
        }));
    };

    const handleSkillChange = (skill) => {
        setFilters(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const handleRemoteChange = () => {
        setFilters(prev => ({ ...prev, remote: !prev.remote }));
    };

    const handleSalaryChange = (e) => {
        setFilters(prev => ({ ...prev, minSalary: parseInt(e.target.value) }));
    };

    const resetFilters = () => {
        setFilters({ type: [], remote: false, location: [], minSalary: 0, skills: [] });
        setSearchTerm('');
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
        const matchesRemote = !filters.remote || job.location === 'Remote';
        const matchesLocation = filters.location.length === 0 || filters.location.includes(job.location);
        const matchesSalary = job.salaryMax >= filters.minSalary;
        const matchesSkills = filters.skills.length === 0 || filters.skills.some(skill => job.skills.includes(skill));

        return matchesSearch && matchesType && matchesRemote && matchesLocation && matchesSalary && matchesSkills;
    });

    return (
        <div className="container" style={{ padding: '2rem 0', display: 'flex', gap: '2rem' }}>
            {loading && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>Loading...</div>}

            {/* Sidebar Filters */}
            <aside style={{ width: '280px', flexShrink: 0 }}>
                <div className="card" style={{ position: 'sticky', top: '100px', maxHeight: '85vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Filter size={20} /> Filters
                        </h3>
                        <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.9rem' }}>
                            Reset
                        </button>
                    </div>

                    {/* Salary Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Min Salary (LPA)</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                step="5"
                                value={filters.minSalary}
                                onChange={handleSalaryChange}
                                style={{ width: '100%' }}
                            />
                            <span style={{ fontWeight: 'bold', minWidth: '3ch' }}>{filters.minSalary}L</span>
                        </div>
                    </div>

                    {/* Job Type Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Job Type</h4>
                        {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={filters.type.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                                <span style={{ color: 'var(--text-secondary)' }}>{type}</span>
                            </label>
                        ))}
                    </div>

                    {/* Location Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Location</h4>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={filters.remote}
                                onChange={handleRemoteChange}
                            />
                            <span style={{ color: 'var(--text-secondary)' }}>Remote Only</span>
                        </label>
                        <div style={{ marginTop: '0.5rem', maxHeight: '150px', overflowY: 'auto' }}>
                            {uniqueLocations.filter(l => l !== 'Remote').map(loc => (
                                <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={filters.location.includes(loc)}
                                        onChange={() => handleLocationChange(loc)}
                                    />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{loc}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Skills Filter */}
                    <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Skills</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {uniqueSkills.slice(0, 10).map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => handleSkillChange(skill)}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        border: filters.skills.includes(skill) ? '1px solid var(--accent)' : '1px solid var(--border)',
                                        background: filters.skills.includes(skill) ? 'var(--accent-light)' : 'transparent',
                                        color: filters.skills.includes(skill) ? 'var(--accent)' : 'var(--text-secondary)',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1 }}>
                {/* Search Header */}
                <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        background: 'white',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.5rem 1rem'
                    }}>
                        <Search size={20} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ border: 'none', padding: '0.5rem', flex: 1, outline: 'none', fontSize: '1rem' }}
                        />
                    </div>
                    <button className="btn btn-primary">Search</button>
                </div>

                {/* Job List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {filteredJobs.map(job => {
                        const isApplied = localStorage.getItem(`applied_${job.id}`);

                        const handleApply = async () => {
                            if (isApplied) {
                                // Cancel Application Logic
                                if (await confirm('Are you sure you want to cancel your application for this job?', 'Cancel Application')) {
                                    localStorage.removeItem(`applied_${job.id}`);
                                    const existingApps = safeJSONParse('kodnest_applications', []);
                                    const updatedApps = existingApps.filter(app => app.company !== job.company || app.role !== job.title);
                                    safeJSONStringify('kodnest_applications', updatedApps);

                                    showStatus('Application Withdrawn', 'Your application has been successfully removed from our system', 'cancelled');
                                    // Delay reload to show animation
                                    setTimeout(() => window.location.reload(), 2000);
                                }
                                return;
                            }

                            if (job.applyLink) {
                                // External Application
                                window.open(job.applyLink, '_blank');

                                // EMAIL PIPELINE SIMULATION
                                // 1. Add to local applications
                                const newApplication = {
                                    id: Date.now(),
                                    jobId: job.id,
                                    company: job.company,
                                    role: job.title,
                                    status: 'Applied (External)',
                                    date: new Date().toISOString().split('T')[0]
                                };
                                const existingApps = safeJSONParse('kodnest_applications', []);
                                safeJSONStringify('kodnest_applications', [newApplication, ...existingApps]);
                                localStorage.setItem(`applied_${job.id}`, 'true');

                                // 2. Send "Confirmation Email" to Inbox
                                const existingEmails = safeJSONParse('kodnest_emails', []);
                                const newEmail = {
                                    id: Date.now(),
                                    sender: `careers@${job.company.toLowerCase().replace(/\s/g, '')}.com`,
                                    subject: `Application Received: ${job.title}`,
                                    preview: `Thank you for applying to ${job.company}. We have received your...`,
                                    body: `Hi ${safeJSONParse('kodnest_current_user', {})?.name || 'Candidate'},\n\nThank you for applying to the ${job.title} position at ${job.company}. We have successfully received your application via our external portal.\n\nOur team will review your profile and get back to you if your skills match our requirements.\n\nBest Regards,\nThe ${job.company} Hiring Team`,
                                    time: 'Just now',
                                    read: false,
                                    starred: false
                                };
                                safeJSONStringify('kodnest_emails', [newEmail, ...existingEmails]);

                                // Notify User
                                await alert(`Redirecting to ${job.company}'s career page...\n\n(Simulation: Confirmation email sent to your KodnestCareers Inbox)`, 'Application Started');
                                window.location.reload();
                            } else {
                                // Internal Application
                                const newApplication = {
                                    id: Date.now(),
                                    jobId: job.id,
                                    company: job.company,
                                    role: job.title,
                                    status: 'Applied',
                                    date: new Date().toISOString().split('T')[0]
                                };
                                const existingApps = safeJSONParse('kodnest_applications', []);
                                safeJSONStringify('kodnest_applications', [newApplication, ...existingApps]);
                                localStorage.setItem(`applied_${job.id}`, 'true');

                                // Email Pipeline for Internal too
                                const newEmail = {
                                    id: Date.now(),
                                    sender: `careers@${job.company.toLowerCase().replace(/\s/g, '')}.com`,
                                    subject: `Application Confirmation: ${job.title}`,
                                    preview: `We have received your application for ${job.title}...`,
                                    body: `Hi there,\n\nYour application for ${job.title} at ${job.company} has been submitted successfully.\n\nYou can track your status in the Dashboard.\n\nBest,\nKodnestCareers Team`,
                                    time: 'Just now',
                                    read: false,
                                    starred: false
                                };
                                const existingEmails = safeJSONParse('kodnest_emails', []);
                                safeJSONStringify('kodnest_emails', [newEmail, ...existingEmails]);

                                showStatus('Application Submitted', 'Your professional profile has been transmitted successfully. Good luck!', 'success');
                                setTimeout(() => window.location.reload(), 3000);
                            }
                        };

                        return (
                            <div key={job.id} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    background: 'var(--background)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)'
                                }}>
                                    {job.company[0]}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{job.title}</h3>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{job.posted}</span>
                                    </div>

                                    <p style={{ color: 'var(--accent)', fontWeight: 500, marginBottom: '0.5rem' }}>{job.company}</p>

                                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16} /> {job.location}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={16} /> {job.type}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={16} /> {job.salary}</span>
                                    </div>

                                    {/* Skill Match Indicator */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        {(() => {
                                            // Get user skills from local storage (mock profile or resume)
                                            // Ideally we get this from a 'profile' object, but let's check 'resumeData' first
                                            // If not found, use a default set for demo purposes
                                            const resumeData = safeJSONParse('resume_data', { skills: "React, JavaScript, CSS" });
                                            const userSkills = resumeData.skills.split(',').map(s => s.trim().toLowerCase());

                                            const jobSkills = job.skills.map(s => s.toLowerCase());
                                            const matchCount = jobSkills.filter(s => userSkills.includes(s)).length;
                                            const matchPercentage = Math.round((matchCount / jobSkills.length) * 100);

                                            let matchColor = 'var(--text-secondary)';
                                            if (matchPercentage >= 70) matchColor = 'var(--success)';
                                            else if (matchPercentage >= 40) matchColor = 'var(--warning)';

                                            return (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                                    <span style={{ fontWeight: 'bold', color: matchColor }}>
                                                        {matchPercentage}% Match
                                                    </span>
                                                    <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '3px', maxWidth: '100px' }}>
                                                        <div style={{ width: `${matchPercentage}%`, height: '100%', background: matchColor, borderRadius: '3px' }}></div>
                                                    </div>
                                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                                        ({matchCount}/{jobSkills.length} skills)
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {job.skills.map(skill => (
                                            <span key={skill} style={{
                                                background: 'var(--background)',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.8rem',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className={`btn ${isApplied ? 'btn-outline' : 'btn-primary'}`}
                                    onClick={handleApply}
                                    style={{
                                        borderColor: isApplied ? 'var(--error)' : 'var(--primary)',
                                        color: isApplied ? 'var(--error)' : 'white',
                                        background: isApplied ? 'transparent' : 'var(--primary)',
                                        opacity: 1 // Enable button for cancel action
                                    }}
                                >
                                    {isApplied ? 'Cancel Application' : job.applyLink ? 'Apply External ↗' : 'Apply Now'}
                                </button>
                            </div>
                        );
                    })}

                    {filteredJobs.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                            <p>No jobs found matching your criteria.</p>
                            <button onClick={resetFilters} style={{ marginTop: '1rem', color: 'var(--accent)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default JobDiscovery;
