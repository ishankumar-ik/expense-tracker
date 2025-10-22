import React, { useState } from 'react'
import styles from '../../styles/RegisterForm.module.css'

const emailValid = (v) => /\S+@\S+\.\S+/.test(v)
const minLen = (v, n) => v && v.length >= n

export default function RegisterForm(){
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)

  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const fakeSubmit = async (data) => {
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 650))
    setLoading(false)
    console.log('REGISTER SUBMIT', data)
    alert('Account created — demo only')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Please provide your full name.')
    if (!emailValid(form.email)) return setError('Please enter a valid email.')
    if (!minLen(form.password, 6)) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    fakeSubmit({ action: 'register', ...form })
  }

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      {error && <div className={styles.toast} role="alert">{error}</div>}

      <label className={styles.field} htmlFor="reg-name">
        <span className={styles.fieldLabel}>Full name</span>
        <input
          id="reg-name"
          name="name"
          type="text"
          className={styles.input}
          value={form.name}
          onChange={onChange}
          placeholder="Jane Doe"
          autoComplete="name"
          required
        />
      </label>

      <label className={styles.field} htmlFor="reg-email">
        <span className={styles.fieldLabel}>Work email</span>
        <input
          id="reg-email"
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

      <label className={styles.field} htmlFor="reg-password">
        <span className={styles.fieldLabel}>Create password</span>
        <div className={styles.pwdRow}>
          <input
            id="reg-password"
            name="password"
            type={showPwd ? 'text' : 'password'}
            className={styles.input}
            value={form.password}
            onChange={onChange}
            placeholder="At least 6 characters"
            autoComplete="new-password"
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

      <label className={styles.field} htmlFor="reg-confirm">
        <span className={styles.fieldLabel}>Confirm password</span>
        <input
          id="reg-confirm"
          name="confirm"
          type={showPwd ? 'text' : 'password'}
          className={styles.input}
          value={form.confirm}
          onChange={onChange}
          placeholder="Repeat your password"
          autoComplete="new-password"
          required
        />
      </label>

      <button className={styles.primary} type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
      <div className={styles.muted}>By creating an account you agree to our <a href="#tos">Terms</a>.</div>
    </form>
  )
}