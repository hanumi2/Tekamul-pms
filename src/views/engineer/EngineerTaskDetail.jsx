"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"
import { CheckCircle, MessageCircle, Clock } from "lucide-react"

export default function EngineerTaskDetail() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newStatus, setNewStatus] = useState("")

  const sidebarLinks = [{ label: "Tasks", path: "/engineer/tasks", icon: <CheckCircle size={20} /> }]

  useEffect(() => {
    loadTask()
  }, [id])

  const loadTask = async () => {
    try {
      const result = await mockApi.getTaskById(id)
      setTask(result.data)
      setNewStatus(result.data.status)
    } catch (error) {
      toast.error("Failed to load task")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async () => {
    try {
      const updated = await mockApi.updateTask(id, { status: newStatus })
      setTask(updated.data)
      toast.success("Task status updated")
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
  if (!task)
    return (
      <MainLayout sidebarLinks={sidebarLinks}>
        <div>Task not found</div>
      </MainLayout>
    )

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{task.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-base">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Description</h2>
              <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
            </div>

            <div className="card-base">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <MessageCircle size={20} />
                Comments
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">No comments yet</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Status */}
            <div className="card-base">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Status</h3>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="input-base w-full mb-3"
              >
                {["backlog", "in_progress", "review", "completed"].map((status) => (
                  <option key={status} value={status}>
                    {status.replace("_", " ")}
                  </option>
                ))}
              </select>
              <button onClick={handleStatusChange} className="btn-primary w-full">
                Update Status
              </button>
            </div>

            {/* Details */}
            <div className="card-base space-y-3">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Priority</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">{task.priority}</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                  <Clock size={14} />
                  Due Date
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Project</p>
                <p className="font-semibold text-gray-900 dark:text-white">Project {task.projectId}</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Created</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
