import React, { useState } from 'react'
import styles from '../../styles/LoginForm.module.css'

const emailValid = (v) => /\S+@\S+\.\S+/.test(v)
const minLen = (v, n) => v && v.length >= n

export default function LoginForm(){
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)

  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const fakeSubmit = async (data) => {
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 650))
    setLoading(false)
    console.log('LOGIN SUBMIT', data)
    alert('Signed in — demo only')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!emailValid(form.email)) return setError('Please enter a valid email.')
    if (!minLen(form.password, 6)) return setError('Password must be at least 6 characters.')
    fakeSubmit({ action: 'login', ...form })
  }

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      {error && <div className={styles.toast} role="alert">{error}</div>}

      <label className={styles.field} htmlFor="login-email">
        <span className={styles.fieldLabel}>Email</span>
        <input
          id="login-email"
          name="email"
          type="email"
          className={styles.input}
          value={form.email}
          onChange={onChange}
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
      </label>

      <label className={styles.field} htmlFor="login-password">
        <span className={styles.fieldLabel}>Password</span>
        <div className={styles.pwdRow}>
          <input
            id="login-password"
            name="password"
            type={showPwd ? 'text' : 'password'}
            className={styles.input}
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className={styles.showBtn}
            onClick={() => setShowPwd(s => !s)}
            aria-label={showPwd ? 'Hide password' : 'Show password'}
          >
            {showPwd ? 'Hide' : 'Show'}
          </button>
        </div>
      </label>

      <div className={styles.row}>
        <label className={styles.check} htmlFor="remember-me">
          <input id="remember-me" name="remember" type="checkbox" />
          <span>Remember me</span>
        </label>
        <a className={styles.link} href="#forgot">Forgot?</a>
      </div>

      <button className={styles.primary} type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
  )
}
