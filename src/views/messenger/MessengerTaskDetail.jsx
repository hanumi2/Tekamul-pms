"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"
import { CheckCircle, FileText } from "lucide-react"

export default function MessengerTaskDetail() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState("")

  const sidebarLinks = [{ label: "Tasks", path: "/messenger/tasks", icon: <CheckCircle size={20} /> }]

  useEffect(() => {
    loadTask()
  }, [id])

  const loadTask = async () => {
    try {
      const result = await mockApi.getTaskById(id)
      setTask(result.data)
    } catch (error) {
      toast.error("Failed to load task")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFeedback = async (e) => {
    e.preventDefault()
    try {
      await mockApi.updateTask(id, { feedback })
      toast.success("Feedback submitted")
      setFeedback("")
    } catch (error) {
      toast.error("Failed to submit feedback")
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

        <div className="card-base">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Task Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description</p>
              <p className="text-gray-900 dark:text-white">{task.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">{task.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Priority</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">{task.priority}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Due Date</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="card-base">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <FileText size={20} />
            Add Feedback
          </h2>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <textarea
              placeholder="Enter your feedback or submission notes..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="input-base h-32"
            />
            <button type="submit" className="btn-primary w-full">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
