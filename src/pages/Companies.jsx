import React from 'react';
import { Building2, MapPin, Users, Globe } from 'lucide-react';

const COMPANIES = [
    {
        id: 1,
        name: 'Google',
        industry: 'Technology',
        location: 'Bangalore, Hyderabad',
        employees: '100,000+',
        description: 'Organizing the world\'s information and making it universally accessible and useful.',
        website: 'google.com'
    },
    {
        id: 2,
        name: 'Microsoft',
        industry: 'Software',
        location: 'Bangalore, Noida, Hyderabad',
        employees: '100,000+',
        description: 'Empowering every person and every organization on the planet to achieve more.',
        website: 'microsoft.com'
    },
    {
        id: 3,
        name: 'Amazon',
        industry: 'E-commerce',
        location: 'Hyderabad, Bangalore',
        employees: '1,000,000+',
        description: 'Earth\'s most customer-centric company.',
        website: 'amazon.jobs'
    },
    {
        id: 4,
        name: 'Flipkart',
        industry: 'E-commerce',
        location: 'Bangalore, KA',
        employees: '30,000+',
        description: 'Leading e-commerce marketplace in India.',
        website: 'flipkartcareers.com'
    },
    {
        id: 5,
        name: 'TCS',
        industry: 'IT Services',
        location: 'Mumbai, Pune, Chennai',
        employees: '600,000+',
        description: 'Building on belief to create a meaningful future through innovation and technology.',
        website: 'tcs.com'
    },
    {
        id: 6,
        name: 'Infosys',
        industry: 'IT Consulting',
        location: 'Bangalore, Pune, Mysore',
        employees: '300,000+',
        description: 'Navigate your next with the global leader in next-generation digital services.',
        website: 'infosys.com'
    },
    {
        id: 7,
        name: 'Zomato',
        industry: 'Food Tech',
        location: 'Gurgaon, HR',
        employees: '5,000+',
        description: 'Better food for more people.',
        website: 'zomato.com'
    },
    {
        id: 8,
        name: 'Swiggy',
        industry: 'Food Tech',
        location: 'Bangalore, Remote',
        employees: '5,000+',
        description: 'Changing the way India eats.',
        website: 'swiggy.com'
    }
];

import { useNavigate } from 'react-router-dom';

const Companies = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Top Companies</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {COMPANIES.map(company => (
                    <div key={company.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '50px', height: '50px',
                                background: 'var(--background)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-secondary)'
                            }}>
                                {company.name[0]}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{company.name}</h3>
                                <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>{company.industry}</span>
                            </div>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                            {company.description}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} /> {company.location}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users size={16} /> {company.employees} employees
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Globe size={16} /> {company.website}
                            </span>
                        </div>

                        <button
                            className="btn btn-outline"
                            style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
                            onClick={() => navigate('/jobs', { state: { company: company.name } })}
                        >
                            View Jobs
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Companies;
