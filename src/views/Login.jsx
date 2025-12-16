"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { mockApi } from "../controllers/mockApi"
import toast from "react-hot-toast"
import { Mail, Lock, LogIn } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email")
      return
    }

    setLoading(true)
    try {
      const result = await mockApi.login(email, password, selectedRole)
      login(result.user, result.token)
      toast.success("Logged in successfully!")
      navigate(getDashboardPath(result.user.role))
    } catch (error) {
      toast.error(error.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="card-base max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">EngineerPM</h1>
          <p className="text-gray-600 dark:text-gray-400">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="admin@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="Any password works"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base pl-10"
              />
            </div>
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Select Role (Optional)
            </label>
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="input-base">
              <option value="">Auto-detect from email</option>
              <option value="ADMIN">Admin</option>
              <option value="PROJECT_MANAGER">Project Manager</option>
              <option value="ENGINEER">Engineer</option>
              <option value="MESSENGER">Messenger</option>
              <option value="CLIENT">Client</option>
              <option value="DIRECTOR">Director</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              Register here
            </a>
          </p>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs text-gray-600 dark:text-gray-400">
          <strong>Demo Mode:</strong> Use any email and password. Try admin@demo.com
        </div>
      </div>
    </div>
  )
}
