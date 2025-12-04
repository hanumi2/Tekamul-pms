"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../layouts/MainLayout"
import { FolderOpen, Tags as Tasks, Users, TrendingUp } from "lucide-react"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

const PMDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, tasks: 0, team: 0, avgProgress: 0 })
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const projectsRes = await mockApi.getProjects()
      const tasksRes = await mockApi.getTasks()

      setProjects(projectsRes.data)
      setStats({
        projects: projectsRes.data.length,
        tasks: tasksRes.data.length,
        team: 4,
        avgProgress:
          Math.round(projectsRes.data.reduce((sum, p) => sum + p.progress, 0) / projectsRes.data.length) || 0,
      })
    } catch (error) {
      toast.error("Failed to load dashboard")
    } finally {
      setLoading(false)
    }
  }

  const sidebarLinks = [
    { label: "Dashboard", path: "/pm/dashboard", icon: <FolderOpen size={20} /> },
    { label: "Projects", path: "/pm/projects", icon: <Tasks size={20} /> },
    { label: "Upload Design", path: "/pm/upload-design", icon: <Users size={20} /> },
    { label: "Assign Messenger", path: "/pm/assign-messenger", icon: <TrendingUp size={20} /> },
  ]

  if (loading)
    return (
      <MainLayout sidebarLinks={sidebarLinks}>
        <div>Loading...</div>
      </MainLayout>
    )

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Manager Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Projects", value: stats.projects, icon: <FolderOpen className="text-blue-500" /> },
            { label: "Total Tasks", value: stats.tasks, icon: <Tasks className="text-green-500" /> },
            { label: "Team Members", value: stats.team, icon: <Users className="text-purple-500" /> },
            {
              label: "Avg Progress",
              value: `${stats.avgProgress}%`,
              icon: <TrendingUp className="text-emerald-500" />,
            },
          ].map((stat, idx) => (
            <div key={idx} className="card-base">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="card-base">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Projects</h2>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-600 px-2 py-1 rounded capitalize">
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

export default PMDashboard
