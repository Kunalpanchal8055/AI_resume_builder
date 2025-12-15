import React, { useState } from 'react'
import '../pages/home.css'

export default function Analyzer({ onLogout, onNavigate }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [aiResult, setAiResult] = useState(null)
  const [loadingAI, setLoadingAI] = useState(false)

  const analyze = () => {
    // Simple local analyzer placeholder
    const words = text.trim().split(/\s+/).filter(Boolean).length
    setResult({ words, suggestions: words < 150 ? 'Add more details to reach 150+ words.' : 'Looks good.' })
  }

  const analyzeWithAI = async () => {
    const key = localStorage.getItem('geminiApiKey') || localStorage.getItem('GEMINI_API_KEY')
    if (!key) {
      alert('No Gemini API key found in localStorage. Set `geminiApiKey` to your key and retry.');
      return;
    }

    setLoadingAI(true)
    setAiResult(null)

    const prompt = `You are a professional resume reviewer. Analyze the following resume text and provide:\n- A short summary of strengths (3 bullets)\n- Top 5 improvement suggestions (bulleted)\n- ATS keywords missing compared to typical job descriptions\n\nResume:\n${text}`

    try {
      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-goog-api-key': key
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }

      const res = await fetch(url, options)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error?.message || 'AI service error')
      const generated = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'
      setAiResult(generated)
    } catch (err) {
      console.error(err)
      setAiResult('Error: ' + err.message)
    } finally {
      setLoadingAI(false)
    }
  }

  return (
    <div className="container-fluid">
      <div className="container" style={{ maxWidth: '1100px', margin: '2rem auto' }}>
        <div className="card" style={{ borderRadius: '16px', padding: '1.5rem' }}>
          <h2 className="hero-title">Resume Analyzer</h2>
          <p className="lead" style={{ color: 'var(--muted)' }}>
            Paste your resume text below and get quick suggestions. Use AI analysis if you provide a Gemini API key (store it in `localStorage` as `geminiApiKey`).
          </p>

          <div style={{ marginTop: '1rem' }}>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={10} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', fontFamily: 'inherit' }} placeholder="Paste resume text here..." />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-login" onClick={analyze}>Analyze Locally</button>
              <button className="btn-login" onClick={analyzeWithAI} disabled={loadingAI}>{loadingAI ? 'Analyzing...' : 'Analyze with AI'}</button>
            </div>

            {result && (
              <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p><strong>Word count:</strong> {result.words}</p>
                <p><strong>Suggestion:</strong> {result.suggestions}</p>
              </div>
            )}

            {aiResult && (
              <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h4>AI Analysis</h4>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{aiResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
