import React, { useState } from 'react';
import { Download, Sparkles, RefreshCcw, CheckCircle, Cpu, GraduationCap, Briefcase as BriefcaseIcon, User as UserIcon, Wand2, Phone, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUI } from '../context/UIContext';

const ResumeBuilder = () => {
    const { showToast } = useUI();
    const [resume, setResume] = useState({
        fullName: 'Alex Johnson',
        role: 'Product Designer',
        email: 'alex@example.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/alexjohnson',
        summary: 'Passionate product designer with 5 years of experience creating user-centric digital products.',
        skills: 'Figma, Sketch, React, CSS, User Research',
        experience: [
            { id: 1, role: 'Senior Designer', company: 'TechFlow', duration: '2021 - Present' },
            { id: 2, role: 'UI Designer', company: 'CreativeAgency', duration: '2019 - 2021' }
        ],
        education: [
            { id: 1, degree: 'Bachelor of Design', school: 'University of Art', year: '2015 - 2019' }
        ]
    });

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [atsScore, setAtsScore] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateAIResponse = async (prompt, systemPrompt) => {
        // AI Integration disabled by user request. Using simulation.
        console.log("AI Prompt:", prompt);
        return "Simulation: AI features are currently running in deterministic mode for demonstration. Please configure a working AI provider (Groq/OpenRouter) in src/providers/ to enable live generation.";
    };

    // JD Analyzer State
    const [targetJD, setTargetJD] = useState('');
    const [jdAnalysis, setJdAnalysis] = useState(null);
    const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'preview', 'jd-analyzer'

    const analyzeJD = () => {
        if (!targetJD.trim()) return;

        setIsAnalyzing(true);
        setTimeout(() => {
            // Simple keyword extraction info
            const commonStopWords = ['and', 'the', 'is', 'in', 'at', 'of', 'for', 'to', 'a', 'with', 'on', 'job', 'description', 'we', 'are', 'looking', 'role', 'responsibilities', 'requirements', 'will', 'be', 'you', 'your', 'as', 'an'];

            const extractKeywords = (text) => {
                if (!text) return [];
                return text.toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .split(/\s+/)
                    .filter(word => word.length > 2 && !commonStopWords.includes(word));
            };

            const resumeKeywords = new Set([
                ...extractKeywords(resume.summary),
                ...extractKeywords(resume.skills),
                ...extractKeywords(resume.role)
            ]);

            const jdKeywords = extractKeywords(targetJD);
            // Count frequency for importance? For now just unique.
            const uniqueJdKeywords = [...new Set(jdKeywords)];

            // Basic matching
            const matchedKeywords = uniqueJdKeywords.filter(word => resumeKeywords.has(word));
            const missingKeywords = uniqueJdKeywords.filter(word => !resumeKeywords.has(word));

            const score = uniqueJdKeywords.length > 0 ? Math.round((matchedKeywords.length / uniqueJdKeywords.length) * 100) : 0;

            setJdAnalysis({
                score,
                matched: matchedKeywords,
                missing: missingKeywords.slice(0, 10), // Top 10 missing
                totalKeywords: uniqueJdKeywords.length
            });
            setIsAnalyzing(false);
        }, 1500);
    };

    const JOB_KEYWORDS = {
        'Frontend': ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Redux', 'Webpack'],
        'Backend': ['Node.js', 'Python', 'Java', 'Go', 'SQL', 'MongoDB', 'AWS', 'Docker', 'API'],
        'Designer': ['Figma', 'Sketch', 'Adobe XD', 'UI', 'UX', 'Prototyping', 'Wireframing', 'User Research'],
        'Data': ['Python', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'Tableau', 'PowerBI'],
        'Marketing': ['SEO', 'Content', 'Social Media', 'Analytics', 'Google Ads', 'Copywriting']
    };

    const ACTION_VERBS = ['Led', 'Developed', 'Created', 'Managed', 'Designed', 'Implemented', 'Optimized', 'Increased', 'Reduced', 'Achieved'];

    const analyzeResumeWithAI = async () => {
        setIsAnalyzing(true);
        setAnalysisResult(null);

        // AI Processing
        const prompt = `Analyze this resume and provide an ATS score (0-100) and 3 specific feedback points. Resume: ${JSON.stringify(resume)}`;

        const aiResponseText = await generateAIResponse(prompt, "You are an expert ATS Resume Analyzer. Return valid JSON with keys: score (number) and feedback (array of objects with type 'success'|'warning'|'error' and message string).");

        if (aiResponseText && aiResponseText.includes('{')) {
            // Try to parse real AI response
            try {
                const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    setAtsScore(parsed.score);
                    setAnalysisResult(parsed.feedback);
                    setIsAnalyzing(false);
                    return;
                }
            } catch (e) {
                console.error("Failed to parse AI response, falling back to rule-based.", e);
            }
        }

        // Fallback to Rule-Based (Simulate processing delay if not already waited)
        // Since we are enforcing HF, if it fails (returns error/simulation string), we might want to run rule-based as backup or just show error.
        // For now, let's keep the rule-based logic as a reliable fallback if HF fails to give structured data.
        if (!atsScore) {
            setTimeout(() => {
                let score = 0;
                const feedback = [];

                // 1. Content Completeness (Base Score: 40)
                let completeness = 0;
                if (resume.fullName) completeness += 10;
                if (resume.email) completeness += 10;
                if (resume.role) completeness += 10;
                if (resume.summary.length > 50) completeness += 10;

                score += completeness;
                if (completeness < 40) feedback.push({ type: 'error', message: 'Resume is missing core sections (Name, Role, Email, or detailed Summary).' });

                // 2. Keyword Matching (Base Score: 30)
                // Guess role category
                let roleCategory = 'General';
                Object.keys(JOB_KEYWORDS).forEach(key => {
                    if (resume.role.toLowerCase().includes(key.toLowerCase())) roleCategory = key;
                });

                const targetKeywords = JOB_KEYWORDS[roleCategory] || [];
                const userSkills = resume.skills.toLowerCase();
                const summaryText = resume.summary.toLowerCase();

                const foundKeywords = targetKeywords.filter(kw => userSkills.includes(kw.toLowerCase()) || summaryText.includes(kw.toLowerCase()));
                const coverage = targetKeywords.length > 0 ? (foundKeywords.length / targetKeywords.length) : 0.5; // Default 50% if no category found

                const keywordScore = Math.min(30, Math.round(coverage * 30) + 10); // Guarantee some points
                score += keywordScore;

                if (foundKeywords.length < 3 && targetKeywords.length > 0) {
                    feedback.push({ type: 'warning', message: `Missing key ${roleCategory} skills: ${targetKeywords.filter(k => !foundKeywords.includes(k)).slice(0, 3).join(', ')}` });
                } else {
                    feedback.push({ type: 'success', message: `Great keyword usage for ${roleCategory} role!` });
                }

                // 3. Impact & Metrics (Base Score: 30)
                const experienceText = resume.experience.map(e => e.role + ' ' + (e.description || '')).join(' '); // We don't have desc yet, using role implies text
                // Check for numbers (metrics)
                const hasMetrics = /\d+%|\$\d+|\d+\+/.test(resume.summary);
                // Check for action verbs
                const summaryVerbs = ACTION_VERBS.filter(verb => resume.summary.includes(verb));

                if (hasMetrics) score += 15;
                else feedback.push({ type: 'info', message: 'Try adding quantifiable metrics (e.g., "Increased sales by 20%").' });

                if (summaryVerbs.length > 0) score += 15;
                else feedback.push({ type: 'info', message: `Use strong action verbs like: ${ACTION_VERBS.slice(0, 4).join(', ')}.` });

                setAtsScore(Math.min(100, score));
                setAnalysisResult(feedback);
                setIsAnalyzing(false);
            }, 2000);
        }
    };


    const handleChange = (e) => {
        setResume({ ...resume, [e.target.name]: e.target.value });
    };

    const handleExperienceChange = (id, field, value) => {
        const updatedExp = resume.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
        setResume({ ...resume, experience: updatedExp });
    };

    const addExperience = () => {
        const newExp = { id: Date.now(), role: '', company: '', duration: '' };
        setResume({ ...resume, experience: [...resume.experience, newExp] });
    };

    const removeExperience = (id) => {
        setResume({ ...resume, experience: resume.experience.filter(exp => exp.id !== id) });
    };

    const handleEducationChange = (id, field, value) => {
        const updatedEdu = resume.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
        setResume({ ...resume, education: updatedEdu });
    };

    const addEducation = () => {
        const newEdu = { id: Date.now(), degree: '', school: '', year: '' };
        setResume({ ...resume, education: [...resume.education, newEdu] });
    };

    const removeEducation = (id) => {
        setResume({ ...resume, education: resume.education.filter(edu => edu.id !== id) });
    };

    const handleAIEnhance = async () => {
        setIsAnalyzing(true);
        // AI Text Generation
        const prompt = `Rewrite this professional summary to be more impactful, using action verbs and metrics: "${resume.summary}"`;

        const enhancedSummary = await generateAIResponse(prompt, "You are a professional resume writer. Rewrite the summary to be concise, impactful, and professional. Return only the new summary text.");

        if (enhancedSummary && !enhancedSummary.includes('Simulation:')) {
            setResume(prev => ({ ...prev, summary: enhancedSummary.replace(/^"|"$/g, '') }));
            setIsAnalyzing(false);
            return;
        }

        // Fallback Mock
        setTimeout(() => {
            setResume(prev => ({
                ...prev,
                summary: "Results-oriented Product Designer with 5+ years of experience in end-to-end product design. Proven track record of improving user engagement by 40% through iterative prototyping and user research. Expert in Figma, React, and design systems."
            }));
            setIsAnalyzing(false);
        }, 1500);
    };

    const suggestSkills = async () => {
        if (!resume.role) return;
        setIsAnalyzing(true);
        const prompt = `Suggest 5 key technical skills for a ${resume.role} role. Return only the skills as a comma-separated string.`;
        const skills = await generateAIResponse(prompt, "Return only comma-separated skills.");

        if (skills && !skills.includes('Simulation:')) {
            setResume(prev => ({ ...prev, skills: skills.replace(/\./g, '') }));
        } else {
            // Mock fallback
            setResume(prev => ({ ...prev, skills: "Figma, Adobe XD, Prototyping, HTML/CSS, React (AI Suggested)" }));
        }
        setIsAnalyzing(false);
    };

    const handleGenerateResume = () => {
        if (!resume.fullName || !resume.role) {
            showToast("Please fill in at least Name and Role.", 'warning');
            return;
        }
        setActiveTab('preview');
    };

    const downloadPDF = () => {
        const element = document.getElementById('resume-preview');
        const opt = {
            margin: 1,
            filename: `${resume.fullName.replace(' ', '_')}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Dynamic import workaround if needed, or just use window.html2pdf if loaded via script, 
        // but since we installed it, we should be able to import it. 
        // If import fails in the browser, we'll see.
        import('html2pdf.js').then(html2pdf => {
            html2pdf.default().set(opt).from(element).save();
        });
    };

    return (
        <div className="container" style={{ padding: '2rem 0', display: 'flex', gap: '2rem', height: 'calc(100vh - 100px)' }}>

            {/* Left Panel - Editor & Tools */}
            <div className="card" style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                    <button
                        onClick={() => setActiveTab('editor')}
                        style={{ flex: 1, padding: '1rem', background: activeTab === 'editor' ? 'white' : 'var(--background)', border: 'none', borderBottom: activeTab === 'editor' ? '2px solid var(--primary)' : 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Editor
                    </button>
                    <button
                        onClick={() => setActiveTab('jd-analyzer')}
                        style={{ flex: 1, padding: '1rem', background: activeTab === 'jd-analyzer' ? 'white' : 'var(--background)', border: 'none', borderBottom: activeTab === 'jd-analyzer' ? '2px solid var(--primary)' : 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                        JD Matcher 🚀
                    </button>
                    <button
                        onClick={() => setActiveTab('ai-builder')}
                        style={{ flex: 1, padding: '1rem', background: activeTab === 'ai-builder' ? 'var(--primary)' : 'var(--background)', color: activeTab === 'ai-builder' ? 'white' : 'var(--text-main)', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <Wand2 size={16} /> Build with AI
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>

                    {activeTab === 'editor' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Personal Info */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><UserIcon size={18} /> Personal Info</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <input
                                        type="text" name="fullName" value={resume.fullName} onChange={handleChange} placeholder="Full Name"
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                                    />
                                    <input
                                        type="text" name="role" value={resume.role} onChange={handleChange} placeholder="Current Role"
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                                    />
                                    <input
                                        type="email" name="email" value={resume.email} onChange={handleChange} placeholder="Email"
                                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                                    />
                                    <div style={{ position: 'relative' }}>
                                        <textarea
                                            name="summary" value={resume.summary} onChange={handleChange} placeholder="Professional Summary" rows="4"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                                        />
                                        <button
                                            onClick={handleAIEnhance}
                                            disabled={isGenerating}
                                            className="btn"
                                            style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--accent)', color: 'white' }}
                                        >
                                            {isGenerating ? <RefreshCcw className="spin" size={14} /> : <Sparkles size={14} />} Enhancing
                                        </button>
                                    </div>
                                </div>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Cpu size={18} /> Skills</h3>
                                <input
                                    type="text" name="skills" value={resume.skills} onChange={handleChange} placeholder="e.g. React, Node.js"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                                />
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BriefcaseIcon size={18} /> Experience</h3>
                                {resume.experience.map(exp => (
                                    <div key={exp.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <input placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)} style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                                            <input placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input placeholder="Duration" value={exp.duration} onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)} style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                                            <button onClick={() => removeExperience(exp.id)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addExperience} className="btn btn-outline" style={{ width: '100%' }}>+ Add Experience</button>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><GraduationCap size={18} /> Education</h3>
                                {resume.education.map(edu => (
                                    <div key={edu.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <input placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                                            <input placeholder="School/University" value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input placeholder="Year" value={edu.year} onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)} style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                                            <button onClick={() => removeEducation(edu.id)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addEducation} className="btn btn-outline" style={{ width: '100%' }}>+ Add Education</button>
                            </motion.section>

                            {/* AI Analysis Section */}
                            <motion.div
                                className="card"
                                style={{ background: '#f8fafc', borderColor: 'var(--border)' }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3>Resume Analysis</h3>
                                    {atsScore !== null && <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: atsScore > 50 ? 'var(--success)' : 'var(--error)' }}>{atsScore}/100</span>}
                                </div>
                                <button onClick={analyzeResumeWithAI} disabled={isAnalyzing} className="btn btn-primary" style={{ width: '100%' }}>
                                    {isAnalyzing ? 'Scanning...' : 'Check Resume Score'}
                                </button>
                                {analysisResult && (
                                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {analysisResult.map((item, idx) => (
                                            <div key={idx} style={{ padding: '0.5rem', background: 'white', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.9rem', color: item.type === 'error' ? 'var(--error)' : 'var(--text-main)' }}>
                                                {item.message}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    ) : activeTab === 'ai-builder' ? (
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Wand2 className="text-primary" /> AI Resume Builder</h2>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <input type="text" name="fullName" value={resume.fullName} onChange={handleChange} placeholder="Full Name *" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                    <input type="text" name="role" value={resume.role} onChange={handleChange} placeholder="Target Role *" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                    <input type="email" name="email" value={resume.email} onChange={handleChange} placeholder="Email *" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                    <input type="text" name="phone" value={resume.phone} onChange={handleChange} placeholder="Phone Number" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                    <input type="text" name="linkedin" value={resume.linkedin} onChange={handleChange} placeholder="LinkedIn URL" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', gridColumn: 'span 2' }} />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <label style={{ fontWeight: 600 }}>Professional Summary</label>
                                        <button onClick={handleAIEnhance} disabled={isAnalyzing} style={{ fontSize: '0.8rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Sparkles size={14} /> AI Enhance
                                        </button>
                                    </div>
                                    <textarea name="summary" value={resume.summary} onChange={handleChange} rows="4" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="Briefly describe your experience..." />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <label style={{ fontWeight: 600 }}>Key Skills</label>
                                        <button onClick={suggestSkills} disabled={isAnalyzing || !resume.role} style={{ fontSize: '0.8rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Cpu size={14} /> AI Suggest
                                        </button>
                                    </div>
                                    <input type="text" name="skills" value={resume.skills} onChange={handleChange} placeholder="e.g. React, Node.js (Comma separated)" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Experience & Education</label>
                                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        <p>Add detailed experience and education in the Editor tab after initial setup.</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerateResume}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                >
                                    <CheckCircle size={20} /> Generate Resume
                                </button>
                            </motion.div>
                        </div>
                    ) : (
                        <div>
                            {/* JD Analyzer UI */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Paste Job Description</h3>
                                <textarea
                                    value={targetJD}
                                    onChange={(e) => setTargetJD(e.target.value)}
                                    placeholder="Paste the full job description here to check your match score..."
                                    style={{ width: '100%', minHeight: '200px', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                />
                                <button
                                    onClick={analyzeJD}
                                    className="btn btn-primary"
                                    style={{ marginTop: '1rem', width: '100%' }}
                                    disabled={isAnalyzing || !targetJD}
                                >
                                    {isAnalyzing ? 'Analyzing...' : 'Analyze Match'}
                                </button>
                            </div>

                            {jdAnalysis && (
                                <div className="card" style={{ background: '#f8fafc', borderColor: 'var(--accent)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <h3 style={{ margin: 0 }}>Match Score</h3>
                                        <div style={{
                                            width: '60px', height: '60px', borderRadius: '50%',
                                            background: jdAnalysis.score > 70 ? 'var(--success)' : jdAnalysis.score > 40 ? 'var(--warning)' : 'var(--error)',
                                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 'bold', fontSize: '1.25rem'
                                        }}>
                                            {jdAnalysis.score}%
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Missing Keywords</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {jdAnalysis.missing.map(word => (
                                                <span key={word} style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', border: '1px solid var(--error)', color: 'var(--error)', fontSize: '0.85rem', background: '#fff' }}>
                                                    {word}
                                                </span>
                                            ))}
                                            {jdAnalysis.missing.length === 0 && <span style={{ color: 'var(--success)' }}>Great job! You matched most key terms.</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Recommendation</h4>
                                        <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                                            {jdAnalysis.score < 50 ? 'Try incorporating more of the missing keywords into your skills or summary section.' :
                                                jdAnalysis.score < 80 ? 'Good match! Fine-tune your experience bullet points to include the missing terms.' :
                                                    'Excellent match! You are ready to apply.'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Preview Column - Hidden in AI Builder Mode */}
            {activeTab !== 'ai-builder' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0 }}>Preview</h2>
                        <button onClick={downloadPDF} className="btn btn-outline">
                            <Download size={18} /> Download PDF
                        </button>
                    </div>

                    <div style={{
                        flex: 1,
                        background: '#f1f5f9',
                        padding: '2rem',
                        borderRadius: 'var(--radius-md)',
                        overflowY: 'auto',
                        border: '1px solid var(--border)'
                    }}>
                        <div id="resume-preview" style={{ background: 'white', padding: '3rem', minHeight: '800px', boxShadow: 'var(--shadow-lg)' }}>
                            <header style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                                <h1 style={{ margin: 0, color: 'var(--primary)', fontSize: '2rem' }}>{resume.fullName}</h1>
                                <h2 style={{ margin: '0.5rem 0', color: 'var(--accent)', fontSize: '1.25rem' }}>{resume.role}</h2>
                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                                    <span>{resume.email}</span>
                                    {resume.phone && <span>• {resume.phone}</span>}
                                    {resume.linkedin && <span>• {resume.linkedin}</span>}
                                </div>
                            </header>

                            <section style={{ marginBottom: '2rem' }}>
                                <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Summary</h3>
                                <p style={{ lineHeight: 1.6 }}>{resume.summary}</p>
                            </section>

                            <section style={{ marginBottom: '2rem' }}>
                                <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Experience</h3>
                                {resume.experience.map(exp => (
                                    <div key={exp.id} style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{exp.company}</span>
                                            <span style={{ color: 'var(--text-secondary)' }}>{exp.duration}</span>
                                        </div>
                                        <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{exp.role}</div>
                                    </div>
                                ))}
                            </section>

                            <section style={{ marginBottom: '2rem' }}>
                                <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Education</h3>
                                {resume.education.map(edu => (
                                    <div key={edu.id} style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{edu.school}</span>
                                            <span style={{ color: 'var(--text-secondary)' }}>{edu.year}</span>
                                        </div>
                                        <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{edu.degree}</div>
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Skills</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {resume.skills.split(',').map(skill => (
                                        <span key={skill} style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeBuilder;
