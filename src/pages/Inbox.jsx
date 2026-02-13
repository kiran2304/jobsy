import React, { useState } from 'react';
import { Mail, Star, Trash2, Reply, Search, ArrowLeft } from 'lucide-react';

const MOCK_EMAILS = [
    {
        id: 1,
        sender: 'TechCorp Careers',
        subject: 'Application Received: Senior Frontend Engineer',
        preview: 'Hi, Thank you for applying to TechCorp. We have received your application...',
        date: 'Oct 25',
        read: true,
        body: 'Hi Candidate,\n\nThank you for applying to TechCorp. We have received your application for the Senior Frontend Engineer position.\n\nOur team is currently reviewing your profile and will get back to you within 5-7 business days.\n\nBest,\nTechCorp Recruiting Team'
    },
    {
        id: 2,
        sender: 'Sarah from Creative Studio',
        subject: 'Interview Invitation: Product Designer',
        preview: 'Hello! We were impressed by your portfolio and would like to schedule...',
        date: 'Oct 28',
        read: false,
        body: 'Hello,\n\nWe were impressed by your portfolio and would like to schedule a 30-minute introductory call to discuss the Product Designer role.\n\nPlease let us know your availability for next week.\n\nCheers,\nSarah Smith\nHead of Design, Creative Studio'
    },
    {
        id: 3,
        sender: 'LinkedIn Job Alerts',
        subject: '30 new jobs match your profile',
        preview: 'Here are the latest jobs matching "React Developer" in Bangalore...',
        date: 'Yesterday',
        read: true,
        body: 'Here are the latest jobs matching "React Developer" in Bangalore:\n\n1. React Dev at StartupHub\n2. Senior UI Scientist at AI Solutions\n...\n\nClick here to view all.'
    }
];

const Inbox = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [emails, setEmails] = useState(() => {
        const storedEmails = JSON.parse(localStorage.getItem('kodnest_emails') || '[]');
        return [...storedEmails, ...MOCK_EMAILS];
    });

    // Filter out deleted? For now just simplistic list

    return (
        <div className="container" style={{ padding: '2rem 0', height: 'calc(100vh - 80px)', display: 'flex', gap: '1rem' }}>

            {/* Sidebar / Email List */}
            <div className="card" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                    <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail /> Message Center
                    </h2>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-secondary)' }} />
                        <input
                            placeholder="Search messages..."
                            style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                </div>

                <div style={{ overflowY: 'auto', flex: 1 }}>
                    {emails.map(email => (
                        <div
                            key={email.id}
                            onClick={() => setSelectedEmail(email)}
                            style={{
                                padding: '1rem',
                                borderBottom: '1px solid var(--border)',
                                cursor: 'pointer',
                                background: selectedEmail?.id === email.id ? '#f1f5f9' : email.read ? 'white' : '#f0fdf4',
                                borderLeft: email.read ? 'none' : '4px solid var(--primary)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: email.read ? 400 : 700, fontSize: '0.9rem' }}>{email.sender}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{email.date}</span>
                            </div>
                            <div style={{ fontWeight: email.read ? 500 : 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{email.subject}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {email.preview}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Email Detail View */}
            <div className="card" style={{ flex: 2, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', height: '100%' }}>
                {selectedEmail ? (
                    <>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{selectedEmail.subject}</h2>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn btn-outline" style={{ padding: '0.5rem' }}><Star size={18} /></button>
                                    <button className="btn btn-outline" style={{ padding: '0.5rem', color: 'var(--error)', borderColor: 'var(--border)' }}><Trash2 size={18} /></button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {selectedEmail.sender[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{selectedEmail.sender}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>to me</div>
                                    </div>
                                </div>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{selectedEmail.date}</span>
                            </div>
                        </div>

                        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {selectedEmail.body}
                        </div>

                        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', background: '#f8fafc' }}>
                            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Reply size={18} /> Reply
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-secondary)', flexDirection: 'column', gap: '1rem' }}>
                        <Mail size={48} color="var(--border)" />
                        <p>Select a message to read</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
