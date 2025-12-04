"use client"

import { useNavigate } from "react-router-dom"
import { Lock, ArrowLeft } from "lucide-react"

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center card-base">
        <Lock size={64} className="text-amber-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">You don't have permission to access this page.</p>
        <button onClick={() => navigate(-1)} className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    </div>
  )
}
