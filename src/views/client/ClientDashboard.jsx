"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../layouts/MainLayout"
import { FolderOpen, TrendingUp, MessageCircle, Star } from "lucide-react"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

export default function ClientDashboard() {
  const [stats, setStats] = useState({ projects: 0, completed: 0, inProgress: 0 })
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const sidebarLinks = [
    { label: "Dashboard", path: "/client/dashboard", icon: <FolderOpen size={20} /> },
    { label: "Projects", path: "/client/projects", icon: <TrendingUp size={20} /> },
    { label: "Blueprints", path: "/client/blueprints", icon: <MessageCircle size={20} /> },
    { label: "Feedback", path: "/client/satisfaction", icon: <Star size={20} /> },
  ]

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const result = await mockApi.getProjects()
      setProjects(result.data)
      setStats({
        projects: result.data.length,
        completed: result.data.filter((p) => p.status === "completed").length,
        inProgress: result.data.filter((p) => p.status === "in_progress").length,
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Projects", value: stats.projects, icon: <FolderOpen className="text-blue-500" /> },
            { label: "In Progress", value: stats.inProgress, icon: <TrendingUp className="text-amber-500" /> },
            { label: "Completed", value: stats.completed, icon: <Star className="text-green-500" /> },
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

        {/* Recent Projects */}
        <div className="card-base">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded capitalize font-medium ${
                      project.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "in_progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{project.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
