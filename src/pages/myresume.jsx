import React, { useEffect, useState } from 'react'
import '../pages/home.css'

export default function MyResume({ onLogout, onNavigate }) {
  const [saved, setSaved] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('savedResumes') || '[]')
    setSaved(list)
  }, [])

  const remove = (id) => {
    const filtered = saved.filter(s => s.id !== id)
    localStorage.setItem('savedResumes', JSON.stringify(filtered))
    setSaved(filtered)
    if (selected?.id === id) setSelected(null)
  }

  const view = (item) => setSelected(item)

  return (
    <div className="container-fluid">
      <div className="container" style={{ maxWidth: '1100px', margin: '2rem auto' }}>
        <div className="card" style={{ borderRadius: '16px', padding: '1.5rem' }}>
          <h2 className="hero-title">My Resumes</h2>
          <p className="lead" style={{ color: 'var(--muted)' }}>
            Your saved resumes are listed below.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              {saved.length === 0 && <p style={{ color: 'var(--muted)' }}>No saved resumes yet.</p>}
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {saved.map(item => (
                  <li key={item.id} style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{item.data.fullName || 'Unnamed'}</strong>
                      <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{item.companyName} • {new Date(item.timestamp).toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => view(item)}>View</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => remove(item.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ flex: 2 }}>
              {selected ? (
                <div>
                  <h4>{selected.data.fullName}</h4>
                  <div style={{ color: 'var(--muted)' }}>{selected.companyName} • {new Date(selected.timestamp).toLocaleString()}</div>
                  <div style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: '<pre style="white-space:pre-wrap">' + (selected.raw || JSON.stringify(selected.data, null, 2)) + '</pre>' }} />
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-primary" onClick={() => { navigator.clipboard.writeText(selected.raw || JSON.stringify(selected.data, null, 2)); alert('Copied to clipboard') }}>Copy</button>
                    <button className="btn btn-outline-secondary" onClick={() => { const blob = new Blob([selected.raw || JSON.stringify(selected.data, null, 2)], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${selected.data.fullName || 'resume'}.txt`; a.click(); URL.revokeObjectURL(url); }}>Download</button>
                  </div>
                </div>
              ) : (
                <div style={{ color: 'var(--muted)' }}>Select a resume to view details.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

