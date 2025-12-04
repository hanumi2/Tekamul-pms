"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"
import { MessageCircle, Users, FileText } from "lucide-react"

export default function PMProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const sidebarLinks = [{ label: "Projects", path: "/pm/projects", icon: <FileText size={20} /> }]

  useEffect(() => {
    loadProjectDetails()
  }, [id])

  const loadProjectDetails = async () => {
    try {
      const [projRes, tasksRes, messagesRes] = await Promise.all([
        mockApi.getProjectById(id),
        mockApi.getTasks(id),
        mockApi.getMessages(id),
      ])
      setProject(projRes.data)
      setTasks(tasksRes.data)
      setMessages(messagesRes.data)
    } catch (error) {
      toast.error("Failed to load project details")
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText.trim()) return

    try {
      const result = await mockApi.sendMessage(id, "user-id", messageText)
      setMessages([...messages, result.data])
      setMessageText("")
      toast.success("Message sent")
    } catch (error) {
      toast.error("Failed to send message")
    }
  }

  if (loading)
    return (
      <MainLayout sidebarLinks={sidebarLinks}>
        <div>Loading...</div>
      </MainLayout>
    )
  if (!project)
    return (
      <MainLayout sidebarLinks={sidebarLinks}>
        <div>Project not found</div>
      </MainLayout>
    )

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="space-y-6">
        {/* Header */}
        <div className="card-base">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</p>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">{project.status}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Progress</p>
              <p className="font-semibold text-gray-900 dark:text-white">{project.progress}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Start Date</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {new Date(project.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">End Date</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Overall Progress</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
          {["overview", "tasks", "chat"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 capitalize transition-colors ${
                activeTab === tab
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card-base lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Project Information</h2>
              <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
            </div>

            <div className="card-base">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Users size={20} />
                Team
              </h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Engineers: {project.engineers.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Messenger: {project.messenger ? "Assigned" : "Not assigned"}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="card-base">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tasks ({tasks.length})</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded capitalize font-medium ${
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
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Priority: {task.priority}</span>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="card-base">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <MessageCircle size={20} />
              Project Chat
            </h2>

            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-4 space-y-3 p-3 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">{msg.userName}</p>
                    <p className="text-gray-600 dark:text-gray-400">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="input-base flex-1"
              />
              <button type="submit" className="btn-primary">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
