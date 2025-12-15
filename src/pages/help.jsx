import React from 'react'
import '../pages/home.css'

export default function Help({ onLogout, onNavigate }) {
  return (
    <div className="container-fluid">
      <div className="container" style={{ maxWidth: '1100px', margin: '2rem auto' }}>
        <div className="card" style={{ borderRadius: '16px', padding: '1.5rem' }}>
          <h2 className="hero-title">Help & Documentation</h2>
          <p className="lead" style={{ color: 'var(--muted)' }}>
            Need help? Read the quick guides below or open an issue on GitHub.
          </p>
          <ul style={{ marginTop: '1rem', color: 'var(--muted)' }}>
            <li><strong>Getting Started:</strong> Create an account, navigate to "Create Resume", fill the form and click "Generate AI Resume & Cover Letter".</li>
            <li><strong>My Resumes:</strong> Your generated resumes are saved locally in your browser. Use the My Resumes page to view, copy, or download.</li>
            <li><strong>Resume Analyzer:</strong> Paste resume text and click "Analyze with AI" (requires Gemini API key stored as <code>geminiApiKey</code> in localStorage).</li>
            <li><strong>Export:</strong> Use the Download or Print buttons on the Resume Preview to save your resume.</li>
            <li><strong>Troubleshooting:</strong> If AI generation fails, ensure your Gemini API key is correct and the network allows outbound connections to Google APIs.</li>
            <li><strong>Security:</strong> This demo stores data locally in your browser only; no backend is used.</li>
            <li><strong>Source & Issues:</strong> See the project README for code, issues, and contribution guidelines.</li>
          </ul>

          <div style={{ marginTop: '1.25rem' }}>
            <a className="btn btn-outline-primary me-2" href="https://github.com/" target="_blank" rel="noreferrer">Project on GitHub</a>
            <a className="btn btn-outline-secondary" href="README.md" target="_blank" rel="noreferrer">Local README</a>
          </div>
        </div>
      </div>
    </div>
  )
}
