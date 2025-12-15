import React, { useEffect, useState } from 'react'
import '../pages/home.css'

export default function Dashboard({ user, onLogout, onNavigate }) {
  const [savedResumes, setSavedResumes] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('savedResumes') || '[]');
      setSavedResumes(saved);
    } catch (e) {
      setSavedResumes([]);
    }
  }, []);

  const recent = savedResumes.slice(0, 5);

  return (
    <div className="container-fluid">
      <div className="container" style={{ maxWidth: '1100px', margin: '2rem auto' }}>
        <div className="card" style={{ borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h2 className="hero-title">Welcome back, {user?.name || 'User'}</h2>
              <p className="lead" style={{ color: 'var(--muted)' }}>
                Overview of your account and quick actions
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline-secondary" onClick={() => onNavigate?.('myresumes')}>My Resumes</button>
              <button className="btn btn-outline-secondary" onClick={() => onNavigate?.('analyzer')}>Analyzer</button>
              <button className="btn btn-outline-secondary" onClick={() => onNavigate?.('help')}>Help</button>
              <button className="btn btn-danger" onClick={onLogout}>Logout</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div className="dashboard-card p-3">
              <h4>Resumes Created</h4>
              <p className="stat-number">{savedResumes.length}</p>
              <p className="stat-sub">Total resumes generated and saved</p>
            </div>

            <div className="dashboard-card p-3">
              <h4>Saved Resumes</h4>
              <p className="stat-number">{savedResumes.length}</p>
              <p className="stat-sub">Access your recent saves</p>
            </div>

            <div className="dashboard-card p-3">
              <h4>Quick Actions</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                <button className="btn-primary" onClick={() => onNavigate?.('home')}>Create New</button>
                <button className="btn-primary" onClick={() => onNavigate?.('myresumes')}>View Resumes</button>
                <button className="btn-outline-secondary" onClick={() => onNavigate?.('analyzer')}>Analyze Resume</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h4>Recent Saves</h4>
            {recent.length === 0 ? (
              <p className="text-muted">You have no saved resumes yet. Create one to see it here.</p>
            ) : (
              <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
                {recent.map(item => (
                  <div key={item.id} className="saved-resume-item p-3" style={{ borderRadius: 8, background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{item.companyName}</strong>
                      <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{new Date(item.timestamp).toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => { navigator.clipboard?.writeText(item.raw || ''); alert('Raw content copied'); }}>Copy</button>
                      <button className="btn btn-sm btn-primary" onClick={() => { localStorage.setItem('lastViewedResume', JSON.stringify(item)); onNavigate?.('myresumes'); }}>Open</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
