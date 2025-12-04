"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../layouts/MainLayout"
import { CheckCircle, Clock, AlertCircle, Zap } from "lucide-react"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

const EngineerDashboard = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, overdue: 0 })
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const tasksRes = await mockApi.getTasks()
      const allTasks = tasksRes.data

      setTasks(allTasks.slice(0, 5))
      setStats({
        total: allTasks.length,
        completed: allTasks.filter((t) => t.status === "completed").length,
        inProgress: allTasks.filter((t) => t.status === "in_progress").length,
        overdue: allTasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== "completed").length,
      })
    } catch (error) {
      toast.error("Failed to load dashboard")
    } finally {
      setLoading(false)
    }
  }

  const sidebarLinks = [
    { label: "Dashboard", path: "/engineer/dashboard", icon: <Zap size={20} /> },
    { label: "My Tasks", path: "/engineer/tasks", icon: <CheckCircle size={20} /> },
    { label: "Kanban Board", path: "/engineer/kanban", icon: <Clock size={20} /> },
    { label: "Profile", path: "/engineer/profile", icon: <AlertCircle size={20} /> },
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Engineer Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Tasks",
              value: stats.total,
              icon: <CheckCircle className="text-blue-500" />,
              color: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: <CheckCircle className="text-green-500" />,
              color: "bg-green-50 dark:bg-green-900/20",
            },
            {
              label: "In Progress",
              value: stats.inProgress,
              icon: <Clock className="text-amber-500" />,
              color: "bg-amber-50 dark:bg-amber-900/20",
            },
            {
              label: "Overdue",
              value: stats.overdue,
              icon: <AlertCircle className="text-red-500" />,
              color: "bg-red-50 dark:bg-red-900/20",
            },
          ].map((stat, idx) => (
            <div key={idx} className={`card-base ${stat.color}`}>
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

        {/* Recent Tasks */}
        <div className="card-base">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded capitalize ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in_progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Priority: {task.priority}</span>
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default EngineerDashboard
