import React, { useState } from 'react';
import { X, Send, AlertTriangle, CheckCircle } from 'lucide-react';

const BugReportModal = ({ isOpen, onClose }) => {
    const [description, setDescription] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate API call
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);

            // Console log the "email" for debugging
            console.log("Bug Report Sent:", {
                to: "kiranhosakeri@gmail.com",
                from: "Anonymous User",
                message: description,
                timestamp: new Date().toISOString()
            });

            setTimeout(() => {
                onClose();
                setIsSent(false);
                setDescription('');
            }, 2000);
        }, 1500);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
        }}>
            <div className="card" style={{ width: '500px', maxWidth: '90%', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <X size={20} />
                </button>

                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', marginTop: 0 }}>
                    <AlertTriangle color="var(--error)" /> Report a Bug
                </h2>

                {isSent ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0', position: 'relative', overflow: 'hidden' }}>
                        {/* Confetti Effect */}
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    width: '10px',
                                    height: '10px',
                                    background: ['#10b981', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
                                    top: '-10px',
                                    left: `${Math.random() * 100}%`,
                                    animation: `confetti ${1 + Math.random()}s ease-out forwards`,
                                    animationDelay: `${Math.random() * 0.3}s`,
                                    borderRadius: '50%',
                                    opacity: 0.8
                                }}
                            />
                        ))}

                        <div style={{
                            color: 'var(--success)',
                            animation: 'fadeIn 0.5s ease',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                                animation: 'scaleUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}>
                                <CheckCircle size={72} strokeWidth={3} style={{ filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))' }} />
                            </div>
                            <h2 style={{
                                marginBottom: '0.5rem',
                                animation: 'slideUp 0.6s ease 0.2s backwards',
                                fontSize: '1.8rem'
                            }}>
                                Reported to Admin
                            </h2>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem',
                                animation: 'slideUp 0.6s ease 0.3s backwards'
                            }}>
                                Thank you for your feedback!
                            </p>
                        </div>

                        <style>{`
                            @keyframes confetti {
                                0% {
                                    transform: translateY(0) rotate(0deg);
                                    opacity: 1;
                                }
                                100% {
                                    transform: translateY(500px) rotate(720deg);
                                    opacity: 0;
                                }
                            }
                        `}</style>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                                Describe the issue
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What went wrong? Please share details..."
                                rows={5}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--border)',
                                    fontFamily: 'inherit'
                                }}
                                required
                            />
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <p style={{ margin: 0 }}>
                                <strong>Note:</strong> Since this is a demo environment, this report will be simulated. In a production app, this would connect to a backend email service.
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-outline"
                                disabled={isSending}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSending}
                                style={{ minWidth: '120px', justifyContent: 'center' }}
                            >
                                {isSending ? 'Sending...' : (
                                    <>
                                        <Send size={18} style={{ marginRight: '0.5rem' }} /> Send Report
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BugReportModal;
