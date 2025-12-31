'use client'

import { useState } from 'react'
import { login, register } from '@/lib/auth'
import toast from 'react-hot-toast'
import { AlertTriangle, Shield, Lock } from 'lucide-react'

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await login({
          username: formData.username,
          password: formData.password,
        })
        toast.success('Login successful!')
        window.location.reload()
      } else {
        await register(formData)
        toast.success('Registration successful! Please login.')
        setIsLogin(true)
        setFormData({ username: '', email: '', password: '' })
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="cyber-card w-full max-w-md p-8 rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-cyber-green cyber-glow" />
          </div>
          <h1 className="text-3xl font-bold text-cyber-green cyber-glow mb-2">
            OSINT TOOL
          </h1>
          <p className="text-cyber-cyan text-sm">
            Professional Intelligence Platform
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-yellow-200">
              <p className="font-bold mb-1">LEGAL DISCLAIMER:</p>
              <p>
                This tool is for educational, investigative, and defensive security purposes only.
                Only publicly available information is collected. No hacking or unauthorized access.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-cyber-cyan mb-2">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 bg-cyber-darker border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green text-cyber-green"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm text-cyber-cyan mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-cyber-darker border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green text-cyber-green"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-cyber-cyan mb-2">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-cyber-darker border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green text-cyber-green"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyber-green/20 border border-cyber-green rounded hover:bg-cyber-green/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-cyber-green font-bold flex items-center justify-center gap-2"
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <Lock className="w-4 h-4" />
                {isLogin ? 'Login' : 'Register'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setFormData({ username: '', email: '', password: '' })
            }}
            className="text-sm text-cyber-cyan hover:text-cyber-green transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

