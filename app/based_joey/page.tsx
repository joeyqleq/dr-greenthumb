'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function BasedJoeyGate() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forensic-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.ok) {
        router.push('/based_joey/report');
      } else if (res.status === 429) {
        setError('too many attempts — wait 60s');
      } else {
        setError('invalid credentials');
        setPassword('');
      }
    } catch {
      setError('connection error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0b0d12',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Courier New', monospace",
      color: '#d8e0f0',
      padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#6aaec8',
            textTransform: 'uppercase',
            marginBottom: '14px',
            opacity: 0.8,
          }}>
            FORENSIC INTELLIGENCE FILE
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: '600',
            color: '#e8edf8',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            u/based_joey
          </div>
          <div style={{ fontSize: '11px', color: '#5a6478', letterSpacing: '0.5px' }}>
            RESTRICTED ACCESS — AUTHORIZED PERSONNEL ONLY
          </div>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} style={{
          background: '#111318',
          border: '1px solid #1e2330',
          borderTop: '1px solid #6aaec8',
          padding: '28px 28px 24px',
        }}>
          <div style={{
            fontSize: '10px',
            color: '#6aaec8',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            opacity: 0.85,
          }}>
            ACCESS CODE
          </div>

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="enter passphrase"
            autoFocus
            style={{
              width: '100%',
              background: '#181b24',
              border: `1px solid ${error ? '#cc4f4f' : '#1e2330'}`,
              color: '#d8e0f0',
              padding: '11px 14px',
              fontSize: '14px',
              fontFamily: "'Courier New', monospace",
              outline: 'none',
              marginBottom: '12px',
              boxSizing: 'border-box',
              letterSpacing: '2px',
            }}
          />

          {error && (
            <div style={{
              fontSize: '11px',
              color: '#cc4f4f',
              marginBottom: '12px',
              fontFamily: "'Courier New', monospace",
              letterSpacing: '0.5px',
            }}>
              ✗ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              background: loading ? '#1e2330' : '#6aaec8',
              color: loading ? '#5a6478' : '#0b0d12',
              border: 'none',
              padding: '11px',
              fontSize: '11px',
              fontFamily: "'Courier New', monospace",
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'VERIFYING...' : 'AUTHENTICATE →'}
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '10px',
          color: '#2a2f3d',
          letterSpacing: '1px',
        }}>
          ALL ACCESS IS LOGGED
        </div>
      </div>
    </main>
  );
}
