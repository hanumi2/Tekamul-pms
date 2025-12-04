"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../layouts/MainLayout"
import { CheckCircle, Clock, Send } from "lucide-react"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

export default function MessengerDashboard() {
  const [stats, setStats] = useState({ assigned: 0, pending: 0, submitted: 0 })
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const sidebarLinks = [
    { label: "Dashboard", path: "/messenger/dashboard", icon: <CheckCircle size={20} /> },
    { label: "Tasks", path: "/messenger/tasks", icon: <Clock size={20} /> },
  ]

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const projectsRes = await mockApi.getProjects()
      const assignedProjects = projectsRes.data.filter((p) => p.messenger)

      setProjects(assignedProjects)
      setStats({
        assigned: assignedProjects.length,
        pending: assignedProjects.filter((p) => p.status !== "completed").length,
        submitted: assignedProjects.filter((p) => p.status === "completed").length,
      })
    } catch (error) {
      toast.error("Failed to load dashboard")
    } finally {
      setLoading(false)
    }
  }

  if (loading)
    return (
      <MainLayout sidebarLinks={sidebarLinks}>
        <div>Loading...</div>
      </MainLayout>
    )

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messenger Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Assigned Projects", value: stats.assigned, icon: <CheckCircle className="text-blue-500" /> },
            { label: "Pending", value: stats.pending, icon: <Clock className="text-amber-500" /> },
            { label: "Submitted", value: stats.submitted, icon: <Send className="text-green-500" /> },
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

        {/* Assigned Projects */}
        <div className="card-base">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">My Assigned Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Status: {project.status}</span>
                  <a href={`/messenger/task/${project.id}`} className="text-primary-600 hover:text-primary-700">
                    View Details →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
