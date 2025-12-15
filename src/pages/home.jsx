import React from "react";
import { useState } from "react";
import "../App.css";
import "./home.css";

function HomePage({ user }) {
    const [formData, setFormData] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: "",
        location: "",
        companyName: "",
        applyingAsA: "Experienced",
        coverLetterTone: "Formal",
        jobDescription: "",
        currentResume: ""
    })

    const [geminiResponse, setGeminiResponse] = useState("");
    const [resumeData, setResumeData] = useState(null);
    const [coverLetterText, setCoverLetterText] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("modern");
    const [activeTab, setActiveTab] = useState("form");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Template: Modern
    const ModernResume = (data) => (
        <div className="resume-modern">
            <div className="resume-header">
                <h2 className="resume-name">{data.fullName || "Your Name"}</h2>
                <div className="resume-contact-info">
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.location && <span>{data.location}</span>}
                </div>
            </div>
            <div className="resume-divider"></div>
            <div className="resume-content">
                {data.summary && (
                    <section className="resume-section">
                        <h3 className="resume-section-title">Professional Summary</h3>
                        <p className="resume-text">{data.summary}</p>
                    </section>
                )}
                {data.experience && (
                    <section className="resume-section">
                        <h3 className="resume-section-title">Professional Experience</h3>
                        <div className="resume-experience-block">{data.experience}</div>
                    </section>
                )}
                {data.education && (
                    <section className="resume-section">
                        <h3 className="resume-section-title">Education</h3>
                        <div className="resume-education-block">{data.education}</div>
                    </section>
                )}
                {data.skills && (
                    <section className="resume-section">
                        <h3 className="resume-section-title">Skills</h3>
                        <div className="resume-skills-block">{data.skills}</div>
                    </section>
                )}
            </div>
        </div>
    );

    // Template: Classic
    const ClassicResume = (data) => (
        <div className="resume-classic">
            <div className="resume-classic-header">
                <h1 className="classic-name">{data.fullName || "Your Name"}</h1>
                <p className="classic-contact">{data.email || "email@example.com"} | {data.phone || "Phone"} | {data.location || "Location"}</p>
            </div>
            <div className="classic-divider"></div>
            <div className="resume-classic-content">
                {data.summary && (
                    <div className="classic-section">
                        <h3 className="classic-section-title">PROFESSIONAL SUMMARY</h3>
                        <p className="classic-text">{data.summary}</p>
                    </div>
                )}
                {data.experience && (
                    <div className="classic-section">
                        <h3 className="classic-section-title">PROFESSIONAL EXPERIENCE</h3>
                        <div className="classic-experience-block">{data.experience}</div>
                    </div>
                )}
                {data.education && (
                    <div className="classic-section">
                        <h3 className="classic-section-title">EDUCATION</h3>
                        <div className="classic-education-block">{data.education}</div>
                    </div>
                )}
                {data.skills && (
                    <div className="classic-section">
                        <h3 className="classic-section-title">SKILLS</h3>
                        <div className="classic-skills-block">{data.skills}</div>
                    </div>
                )}
            </div>
        </div>
    );

    // Template: Minimal
    const MinimalResume = (data) => (
        <div className="resume-minimal">
            <div className="minimal-header">
                <h1 className="minimal-name">{data.fullName || "Your Name"}</h1>
            </div>
            <div className="minimal-contact">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>|</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.location && <span>|</span>}
                {data.location && <span>{data.location}</span>}
            </div>
            <div className="minimal-divider"></div>
            <div className="minimal-content">
                {data.summary && (
                    <section className="minimal-section">
                        <h3 className="minimal-section-title">Summary</h3>
                        <p className="minimal-text">{data.summary}</p>
                    </section>
                )}
                {data.experience && (
                    <section className="minimal-section">
                        <h3 className="minimal-section-title">Experience</h3>
                        <div className="minimal-experience-block">{data.experience}</div>
                    </section>
                )}
                {data.education && (
                    <section className="minimal-section">
                        <h3 className="minimal-section-title">Education</h3>
                        <div className="minimal-education-block">{data.education}</div>
                    </section>
                )}
                {data.skills && (
                    <section className="minimal-section">
                        <h3 className="minimal-section-title">Skills</h3>
                        <div className="minimal-skills-block">{data.skills}</div>
                    </section>
                )}
            </div>
        </div>
    );

    // Template: Professional
    const ProfessionalResume = (data) => (
        <div className="resume-professional">
            <div className="prof-header">
                <h1 className="prof-name">{data.fullName || "Your Name"}</h1>
                <div className="prof-contact-line">
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>•</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.location && <span>•</span>}
                    {data.location && <span>{data.location}</span>}
                </div>
            </div>
            <div className="prof-divider"></div>
            <div className="prof-content">
                {data.summary && (
                    <div className="prof-section">
                        <h3 className="prof-section-title">PROFESSIONAL SUMMARY</h3>
                        <p className="prof-text">{data.summary}</p>
                    </div>
                )}
                {data.experience && (
                    <div className="prof-section">
                        <h3 className="prof-section-title">PROFESSIONAL EXPERIENCE</h3>
                        <div className="prof-experience-block">{data.experience}</div>
                    </div>
                )}
                {data.education && (
                    <div className="prof-section">
                        <h3 className="prof-section-title">EDUCATION</h3>
                        <div className="prof-education-block">{data.education}</div>
                    </div>
                )}
                {data.skills && (
                    <div className="prof-section">
                        <h3 className="prof-section-title">TECHNICAL SKILLS</h3>
                        <div className="prof-skills-block">{data.skills}</div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderTemplate = (templateName, data) => {
        switch(templateName) {
            case "modern":
                return <ModernResume {...data} />;
            case "classic":
                return <ClassicResume {...data} />;
            case "minimal":
                return <MinimalResume {...data} />;
            case "professional":
                return <ProfessionalResume {...data} />;
            default:
                return <ModernResume {...data} />;
        }
    };

    const parseGeminiResponse = (response) => {
        if (!response) return null;
        
        const parsedData = {
            summary: "",
            experience: "",
            education: "",
            skills: "",
            coverLetter: ""
        };

        // Extract Cover Letter
        const coverLetterMatch = response.match(/\*\*Tailored Cover Letter\*\*\s*([\s\S]*?)(?=\d+\.\s\*\*|$)/i);
        if (coverLetterMatch) {
            parsedData.coverLetter = coverLetterMatch[1].trim();
        }

        // Extract Resume Content sections
        const resumeMatch = response.match(/\*\*Updated Resume Content\*\*\s*([\s\S]*?)(?=\d+\.\s\*\*|$)/i);
        const resumeText = resumeMatch ? resumeMatch[1] : response;

        // Extract each section from resume
        const summaryMatch = resumeText.match(/(?:\*\*)?Professional Summary(?:\*\*)?:?\s*([\s\S]*?)(?=(?:\*\*)?(?:Professional )?Experience|$)/i);
        if (summaryMatch) {
            parsedData.summary = summaryMatch[1].trim().split('\n')[0];
        }

        const experienceMatch = resumeText.match(/(?:\*\*)?(?:Professional )?Experience(?:\*\*)?:?\s*([\s\S]*?)(?=(?:\*\*)?Education|$)/i);
        if (experienceMatch) {
            parsedData.experience = experienceMatch[1].trim();
        }

        const educationMatch = resumeText.match(/(?:\*\*)?Education(?:\*\*)?:?\s*([\s\S]*?)(?=(?:\*\*)?Skills|$)/i);
        if (educationMatch) {
            parsedData.education = educationMatch[1].trim();
        }

        const skillsMatch = resumeText.match(/(?:\*\*)?(?:Technical )?Skills(?:\*\*)?:?\s*([\s\S]*?)(?=\d+\.|$)/i);
        if (skillsMatch) {
            parsedData.skills = skillsMatch[1].trim();
        }

        return parsedData;
    };

    const parseAndDisplayResponse = (response) => {
        if (!response) return null;

        const regex = /^(\d+\.\s*\*\*(.+?)\*\*)|^\*\*(.+?)\*\*|^##\s*(.+)$/gim;
        const matches = [];
        let m;
        while ((m = regex.exec(response)) !== null) {
            const title = (m[2] || m[3] || m[4] || '').trim();
            matches.push({ index: m.index, length: m[0].length, title });
        }

        if (matches.length === 0) {
            return (
                <div className="response-sections">
                    <div className="response-section">
                        <div className="section-content">{formatContent(response)}</div>
                    </div>
                </div>
            );
        }

        const sections = matches.map((match, i) => {
            const start = match.index + match.length;
            const end = i + 1 < matches.length ? matches[i + 1].index : response.length;
            const content = response.substring(start, end).trim();
            return { title: match.title, content };
        });

        return (
            <div className="response-sections">
                {sections.map((s, idx) => (
                    <div key={idx} className="response-section">
                        <h3 className="section-title">{s.title}</h3>
                        <div className="section-content">{formatContent(s.content)}</div>
                    </div>
                ))}
            </div>
        );
    };

    const formatContent = (content) => {
        if (!content) return null;
        
        return content.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return <br key={index} />;
            
            if (trimmedLine.startsWith('- ')) {
                return (
                    <div key={index} className="bullet-point">
                        • {trimmedLine.substring(2)}
                    </div>
                );
            }
            
            if (trimmedLine.includes('**')) {
                const parts = trimmedLine.split('**');
                return (
                    <p key={index}>
                        {parts.map((part, partIndex) => 
                            partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
                        )}
                    </p>
                );
            }
            
            if (trimmedLine.endsWith(':')) {
                return <h4 key={index} className="sub-header">{trimmedLine}</h4>;
            }
            
            return <p key={index}>{trimmedLine}</p>;
        });
    };

    async function handleGenerateData() {
        if (!formData.companyName || !formData.jobDescription) {
            alert("Please fill in Company Name and Job Description");
            return;
        }

        setLoading(true);
        setGeminiResponse('');
        
        const prompt = `You are a professional career coach and resume optimization expert. 
Your task is to generate a personalized cover letter, improve the resume content, 
and provide an ATS (Applicant Tracking System) analysis.

User Information:
- Full Name: ${formData.fullName || "Professional"}
- Email: ${formData.email || "Not provided"}
- Phone: ${formData.phone || "Not provided"}
- Location: ${formData.location || "Not provided"}

Job Application Details:
- Company Name: ${formData.companyName}
- Experience Level: ${formData.applyingAsA}
- Job Description: ${formData.jobDescription}
- Current Resume: ${formData.currentResume || "No resume provided"}
- Preferred Tone: ${formData.coverLetterTone}

Please provide output in these exact sections:

1. **Tailored Cover Letter**
   Write a professional cover letter addressed to ${formData.companyName}.
   Use the specified tone: ${formData.coverLetterTone}.
   Highlight relevant skills and experiences based on the job description.

2. **Updated Resume Content**
   Suggest optimized content with:
   - Professional Summary (2-3 lines)
   - Key Professional Experience (with bullet points)
   - Education details
   - Core Technical Skills (comma-separated)

3. **Keyword Match Analysis**
   - Extract top 10 keywords from the job description
   - Check if they exist in the provided resume
   - List missing keywords that should be added

4. **ATS Score Estimate (0–100)**
   Provide an estimated ATS match score for the resume against the job description.
   Explain the reasoning briefly.

Format the response clearly with headers and bullet points.`;
        
        const GEMINI_API_KEY = 'AIzaSyBrjAa8fA_hopHDlr7d-T5iu62bOyHRlC0';
        
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PASTE_YOUR_API_KEY_HERE') {
            setGeminiResponse('Error: Please add your Gemini API key');
            setLoading(false);
            return;
        }

        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-goog-api-key': GEMINI_API_KEY
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`API Error: ${data.error?.message || 'Unknown error'}`);
            }
            
            if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response format from Gemini API');
            }

            const generatedText = data.candidates[0].content.parts[0].text;
            setGeminiResponse(generatedText);
            
            const parsed = parseGeminiResponse(generatedText);
            setCoverLetterText(parsed?.coverLetter || "");
            setResumeData({
                ...formData,
                ...parsed
            });
            // Persist generated resume to localStorage
            try {
                const saved = JSON.parse(localStorage.getItem('savedResumes') || '[]');
                const newItem = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    companyName: formData.companyName,
                    data: { ...formData, ...parsed },
                    template: selectedTemplate,
                    raw: generatedText
                };
                saved.unshift(newItem);
                localStorage.setItem('savedResumes', JSON.stringify(saved));
            } catch (e) {
                console.warn('Could not persist resume:', e);
            }
            
            setActiveTab("resume");
        } catch (error) {
            console.error('Error:', error);
            setGeminiResponse(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container-fluid min-vh-100 bg-light landing-force-light">
            <section className="hero-section full-bleed text-center">
                <div className="hero-content">
                    <div className="hero-badge">🚀 AI-Powered Resume Builder</div>
                    <h1 className="hero-title">Create Your Perfect Resume</h1>
                    <p className="hero-subtitle">Land your dream job with AI-generated resumes tailored to any position</p>
                    <div className="hero-features">
                        <span className="feature-tag">✨ AI Generated</span>
                        <span className="feature-tag">📄 4 Templates</span>
                        <span className="feature-tag">⚡ Instant Preview</span>
                    </div>
                    <button className="hero-cta-btn" onClick={() => { setActiveTab("form"); document.querySelector('.card')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        <i className="bi bi-arrow-right me-2"></i>Start Creating
                    </button>
                </div>
            </section>

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <ul className="nav nav-tabs mb-4" role="tablist">
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === "form" ? "active" : ""}`} onClick={() => setActiveTab("form")} type="button">
                                    <i className="bi bi-pencil-square me-2"></i>Form
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === "resume" ? "active" : ""}`} onClick={() => setActiveTab("resume")} type="button">
                                    <i className="bi bi-file-earmark me-2"></i>Resume Preview
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === "coverletter" ? "active" : ""}`} onClick={() => setActiveTab("coverletter")} type="button">
                                    <i className="bi bi-envelope me-2"></i>Cover Letter & Analysis
                                </button>
                            </li>
                        </ul>

                        {activeTab === "form" && (
                            <div className="card custom-card shadow-lg">
                                <div className="card-header text-center bg-primary text-white">
                                    <h3 className="mb-0"><i className="bi bi-file-earmark-person me-2"></i>Resume & Cover Letter Generator</h3>
                                </div>
                                <div className="card-body p-4">
                                    <form>
                                        <div className="section-divider mb-4">
                                            <h5 className="text-secondary">Personal Information</h5>
                                            <hr />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">Full Name</label>
                                                <input id="fullName" type="text" className="form-control form-control-lg" placeholder="John Doe" value={formData.fullName} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">Email</label>
                                                <input id="email" type="email" className="form-control form-control-lg" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">Phone</label>
                                                <input id="phone" type="tel" className="form-control form-control-lg" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">Location</label>
                                                <input id="location" type="text" className="form-control form-control-lg" placeholder="City, State" value={formData.location} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="section-divider mb-4 mt-4">
                                            <h5 className="text-secondary">Job Application Details</h5>
                                            <hr />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">Company Name *</label>
                                                <input id="companyName" type="text" className="form-control form-control-lg" placeholder="Google, Amazon..." value={formData.companyName} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label fw-semibold">Experience Level</label>
                                                <select id="applyingAsA" className="form-select form-select-lg" value={formData.applyingAsA} onChange={handleChange}>
                                                    <option>Fresher</option>
                                                    <option>Experienced</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Cover Letter Tone</label>
                                            <select id="coverLetterTone" className="form-select form-select-lg" value={formData.coverLetterTone} onChange={handleChange}>
                                                <option>Formal</option>
                                                <option>Informal</option>
                                                <option>Casual</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Job Description *</label>
                                            <textarea id="jobDescription" className="form-control" rows="6" placeholder="Paste the complete job description..." value={formData.jobDescription} onChange={handleChange} required></textarea>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Current Resume (Optional)</label>
                                            <textarea id="currentResume" className="form-control" rows="8" placeholder="Paste your existing resume here..." value={formData.currentResume} onChange={handleChange}></textarea>
                                        </div>

                                        <div className="d-grid">
                                            <button type="button" className="btn btn-primary btn-lg fw-semibold" disabled={loading} onClick={handleGenerateData}>
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Generating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-lightning-charge me-2"></i>
                                                        Generate AI Resume & Cover Letter
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === "resume" && (
                            <div>
                                {resumeData ? (
                                    <>
                                        <div className="card shadow-lg mb-4">
                                            <div className="card-body">
                                                <h5 className="card-title mb-3">Select Resume Template</h5>
                                                <div className="template-buttons d-flex gap-2 flex-wrap">
                                                    {["modern", "classic", "minimal", "professional"].map((template) => (
                                                        <button key={template} className={`btn ${selectedTemplate === template ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setSelectedTemplate(template)}>
                                                            {template.charAt(0).toUpperCase() + template.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card shadow-lg resume-preview-card">
                                            <div className="card-body p-5">
                                                {renderTemplate(selectedTemplate, resumeData)}
                                            </div>
                                            <div className="card-footer text-center py-3">
                                                <button className="btn btn-success btn-sm me-2" onClick={() => {
                                                    // quick save (already saved on generation) - notify
                                                    alert('Resume saved to My Resumes');
                                                }}>
                                                    <i className="bi bi-save me-2"></i>Save
                                                </button>
                                                <button className="btn btn-info btn-sm me-2" onClick={() => window.print()}>
                                                    <i className="bi bi-printer me-2"></i>Print
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="alert alert-info" role="alert">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Fill out the form and click "Generate AI Resume & Cover Letter" to preview your resume.
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "coverletter" && (
                            <div>
                                {geminiResponse ? (
                                    <div className="card shadow-lg">
                                        <div className="card-header bg-success text-white">
                                            <h4 className="mb-0"><i className="bi bi-check-circle me-2"></i>AI Generated Results</h4>
                                        </div>
                                        <div className="card-body">
                                            {loading ? (
                                                <div className="text-center py-5">
                                                    <div className="spinner-border text-primary mb-3"></div>
                                                    <p className="text-muted">Generating your content...</p>
                                                </div>
                                            ) : (
                                                <div>
                                                    {coverLetterText ? (
                                                        <div className="cover-letter mb-4">
                                                            <h3 className="section-title">Tailored Cover Letter</h3>
                                                            <div className="section-content">{formatContent(coverLetterText)}</div>
                                                        </div>
                                                    ) : null}
                                                    {parseAndDisplayResponse(geminiResponse)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="alert alert-info" role="alert">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Fill out the form and click "Generate AI Resume & Cover Letter" to see your cover letter and ATS analysis.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
