"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { CheckCircle, Filter, Calendar } from "lucide-react"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

export default function EngineerTasks() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)

  const sidebarLinks = [
    { label: "Dashboard", path: "/engineer/dashboard", icon: <CheckCircle size={20} /> },
    { label: "My Tasks", path: "/engineer/tasks", icon: <CheckCircle size={20} /> },
    { label: "Kanban", path: "/engineer/kanban", icon: <Filter size={20} /> },
  ]

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    const filtered = filterStatus === "all" ? tasks : tasks.filter((t) => t.status === filterStatus)
    setFilteredTasks(filtered)
  }, [tasks, filterStatus])

  const loadTasks = async () => {
    try {
      const result = await mockApi.getTasks()
      setTasks(result.data)
    } catch (error) {
      toast.error("Failed to load tasks")
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Tasks</h1>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {["all", "backlog", "in_progress", "review", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                filterStatus === status
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {status === "all" ? "All Tasks" : status.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="grid gap-4">
          {filteredTasks.length === 0 ? (
            <div className="card-base text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No tasks with status '{filterStatus}'</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <Link
                key={task.id}
                to={`/engineer/task/${task.id}`}
                className="card-base hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded capitalize font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in_progress"
                          ? "bg-blue-100 text-blue-700"
                          : task.status === "review"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{task.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority} priority
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}
