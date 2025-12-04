"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../layouts/MainLayout"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"
import { CheckCircle, Send } from "lucide-react"

export default function MessengerTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const sidebarLinks = [{ label: "Tasks", path: "/messenger/tasks", icon: <CheckCircle size={20} /> }]

  useEffect(() => {
    loadTasks()
  }, [])

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

  const handleMarkSubmitted = async (taskId) => {
    try {
      await mockApi.updateTask(taskId, { status: "submitted" })
      toast.success("Task marked as submitted")
      loadTasks()
    } catch (error) {
      toast.error("Failed to update task")
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Submission Tasks</h1>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="card-base">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">{task.status}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{task.description}</p>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
                <button onClick={() => handleMarkSubmitted(task.id)} className="btn-primary flex items-center gap-2">
                  <Send size={16} />
                  Mark Submitted
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
