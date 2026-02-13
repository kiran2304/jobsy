import React, { useState, useEffect } from 'react';
import { FileText, Copy, Download, Sparkles, RefreshCcw } from 'lucide-react';
import { jsPDF } from 'jspdf'; // We might need to import this if installed, or use html2pdf

const CoverLetter = () => {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        manager: '',
        tone: 'Professional' // Professional, Enthusiastic, Creative
    });

    const [generatedLetter, setGeneratedLetter] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        // Load resume data for personalization
        const stored = JSON.parse(localStorage.getItem('resume_data'));
        if (stored) {
            setResumeData(stored);
        } else {
            // Fallback mock
            setResumeData({
                fullName: 'Alex Johnson',
                email: 'alex@example.com',
                phone: '+91 98765 43210',
                skills: 'React, Node.js, UI/UX',
                experience: [{ company: 'TechFlow', role: 'Senior Designer' }]
            });
        }
    }, []);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
            const { company, role, manager, tone } = formData;
            const { fullName, email, phone, skills, experience } = resumeData || {};
            const lastRole = experience && experience.length > 0 ? experience[0].role : 'Professional';
            const lastCompany = experience && experience.length > 0 ? experience[0].company : 'Previous Corp';

            let content = '';

            if (tone === 'Professional') {
                content = `${fullName}\n${email} | ${phone}\n\n${date}\n\nTo ${manager || 'Hiring Manager'},\n${company}\n\nDear ${manager || 'Hiring Manager'},\n\nI am writing to express my strong interest in the ${role} position at ${company}. With my background as a ${lastRole} at ${lastCompany} and my expertise in ${skills}, I am confident in my ability to contribute effectively to your team.\n\nAt ${lastCompany}, I honed my skills in delivering high-quality solutions, and I have always admired ${company}'s commitment to innovation. I am eager to brings my technical proficiency and problem-solving abilities to this role.\n\nThank you for considering my application. I look forward to the possibility of discussing how my experience aligns with your team's needs.\n\nSincerely,\n${fullName}`;
            } else if (tone === 'Enthusiastic') {
                content = `${fullName}\n${email}\n\n${date}\n\nHi ${manager || 'Team'},\n\nI was thrilled to see the opening for the ${role} role at ${company}! I've been following ${company}'s work for a while, and I would love the opportunity to contribute my skills in ${skills} to your mission.\n\nPreviously as a ${lastRole} at ${lastCompany}, I loved tackling complex challenges. I am incredibly passionate about building great products and believe my energy and experience would be a great fit for your dynamic team.\n\nCan't wait to hear from you!\n\nBest regards,\n${fullName}`;
            } else {
                // Creative
                content = `${fullName}\n${email}\n\n${date}\n\nSubject: Why I'm the ${role} you've been looking for\n\nDear ${manager || 'Future Teammates'},\n\nInnovation, creativity, and execution—these are the values that drive me. When I saw the ${role} opportunity at ${company}, I knew I had to apply. Combining my experience as a ${lastRole} with a deep toolkit including ${skills}, I am ready to help ${company} create something extraordinary.\n\nLet's build something amazing together.\n\nCheers,\n${fullName}`;
            }

            setGeneratedLetter(content);
            setIsGenerating(false);
        }, 1500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLetter);
        alert('Copied to clipboard!');
    };

    const downloadPDF = () => {
        // Simple text-to-pdf using window print or basic construction
        // For now, simpler to just alert or simulate, but let's try a print approach
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`<pre style="font-family: monospace; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${generatedLetter}</pre>`);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="container" style={{ padding: '2rem 0', display: 'flex', gap: '2rem' }}>
            {/* Input Panel */}
            <div className="card" style={{ flex: 1, height: 'fit-content' }}>
                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText /> Generator Details
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Target Company</label>
                        <input
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Google"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Job Role</label>
                        <input
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="e.g. Frontend Engineer"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Hiring Manager (Optional)</label>
                        <input
                            value={formData.manager}
                            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                            placeholder="e.g. Sarah Smith"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tone</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['Professional', 'Enthusiastic', 'Creative'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setFormData({ ...formData, tone: t })}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        border: formData.tone === t ? '1px solid var(--primary)' : '1px solid var(--border)',
                                        background: formData.tone === t ? 'var(--primary)' : 'white',
                                        color: formData.tone === t ? 'white' : 'var(--text-main)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !formData.company || !formData.role}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
                >
                    {isGenerating ? <><RefreshCcw className="spin" size={18} /> Writing...</> : <><Sparkles size={18} /> Generate Cover Letter</>}
                </button>
            </div>

            {/* Preview Panel */}
            <div className="card" style={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Preview</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={copyToClipboard} disabled={!generatedLetter} className="btn btn-outline" style={{ padding: '0.5rem' }} title="Copy">
                            <Copy size={18} />
                        </button>
                        <button onClick={downloadPDF} disabled={!generatedLetter} className="btn btn-outline" style={{ padding: '0.5rem' }} title="Download/Print">
                            <Download size={18} />
                        </button>
                    </div>
                </div>

                <div style={{
                    flex: 1,
                    background: '#f8fafc',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    padding: '2rem',
                    minHeight: '400px',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'serif',
                    lineHeight: '1.6',
                    fontSize: '1.1rem',
                    color: generatedLetter ? 'var(--text-main)' : 'var(--text-tertiary)'
                }}>
                    {generatedLetter || "Enter details and click 'Generate' to create your cover letter..."}
                </div>
            </div>
        </div>
    );
};

export default CoverLetter;
