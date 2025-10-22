import React, { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import '../styles/authpage.css'

export default function AuthPage() {
    const [mode, setMode] = useState('login')
  const switchMode = (m) => setMode(m)

  return (
    <div className="page">
      <div className="brand">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#g)"></rect>
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#4f46e5" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <h1 className="brandTitle">The OmniLedger</h1>
          <p className="brandSub">Expense tracker — sign in to manage your budget in few simple steps</p>
        </div>
      </div>

  <div className="card centerCard" role="region" aria-labelledby="auth-heading">
        <div className="cardHeader">
          <h2 id="auth-heading">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <div className="toggle" role="tablist" aria-label="Authentication tabs">
            <button
              className={`toggleBtn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => switchMode('login')}
              aria-pressed={mode === 'login'}
              role="tab"
              aria-selected={mode === 'login'}
            >
              Sign in
            </button>
            <button
              className={`toggleBtn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => switchMode('register')}
              aria-pressed={mode === 'register'}
              role="tab"
              aria-selected={mode === 'register'}
            >
              Register
            </button>
          </div>
        </div>

          {mode === 'login' ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
      </div>
    </div>
  );
}