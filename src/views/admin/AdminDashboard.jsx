"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../layouts/AdminLayout"
import { Users, FolderOpen, CheckCircle2, AlertCircle } from "lucide-react"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, projects: 0, completed: 0, pending: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const users = await mockApi.getAdminUsers()
        const projects = await mockApi.getProjects()

        setStats({
          users: users.data.length,
          projects: projects.data.length,
          completed: projects.data.filter((p) => p.status === "completed").length,
          pending: projects.data.filter((p) => p.status === "planning").length,
        })
      } catch (error) {
        toast.error("Failed to load statistics")
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading)
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Users", value: stats.users, icon: <Users className="text-blue-500" /> },
            { label: "Projects", value: stats.projects, icon: <FolderOpen className="text-green-500" /> },
            { label: "Completed", value: stats.completed, icon: <CheckCircle2 className="text-emerald-500" /> },
            { label: "Pending", value: stats.pending, icon: <AlertCircle className="text-amber-500" /> },
          ].map((stat, idx) => (
            <div key={idx} className="card-base">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card-base">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="space-y-2">
            <a
              href="/admin/users"
              className="block p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg text-primary-600 transition"
            >
              → Manage Users
            </a>
            <a
              href="/admin/projects"
              className="block p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg text-green-600 transition"
            >
              → View Projects
            </a>
            <a
              href="/admin/reports"
              className="block p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-lg text-purple-600 transition"
            >
              → Analytics
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
