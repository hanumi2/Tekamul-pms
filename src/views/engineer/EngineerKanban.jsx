"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../layouts/MainLayout"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"
import { GripVertical, Calendar } from "lucide-react"

export default function EngineerKanban() {
  const [tasks, setTasks] = useState({ backlog: [], in_progress: [], review: [], completed: [] })
  const [loading, setLoading] = useState(true)
  const [draggedTask, setDraggedTask] = useState(null)

  const sidebarLinks = [{ label: "Kanban", path: "/engineer/kanban", icon: <GripVertical size={20} /> }]

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const result = await mockApi.getTasks()
      const grouped = {
        backlog: result.data.filter((t) => t.status === "backlog"),
        in_progress: result.data.filter((t) => t.status === "in_progress"),
        review: result.data.filter((t) => t.status === "review"),
        completed: result.data.filter((t) => t.status === "completed"),
      }
      setTasks(grouped)
    } catch (error) {
      toast.error("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e, task, status) => {
    setDraggedTask({ task, fromStatus: status })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = async (e, toStatus) => {
    e.preventDefault()
    if (!draggedTask) return

    const { task, fromStatus } = draggedTask

    if (fromStatus === toStatus) {
      setDraggedTask(null)
      return
    }

    try {
      await mockApi.updateTask(task.id, { status: toStatus })

      setTasks((prev) => ({
        ...prev,
        [fromStatus]: prev[fromStatus].filter((t) => t.id !== task.id),
        [toStatus]: [...prev[toStatus], { ...task, status: toStatus }],
      }))

      toast.success(`Task moved to ${toStatus}`)
    } catch (error) {
      toast.error("Failed to move task")
    } finally {
      setDraggedTask(null)
    }
  }

  if (loading)
    return (
      <MainLayout sidebarLinks={sidebarLinks}>
        <div>Loading...</div>
      </MainLayout>
    )

  const columns = [
    { key: "backlog", label: "Backlog", color: "bg-gray-100 dark:bg-gray-700" },
    { key: "in_progress", label: "In Progress", color: "bg-blue-100 dark:bg-blue-900/20" },
    { key: "review", label: "Review", color: "bg-purple-100 dark:bg-purple-900/20" },
    { key: "completed", label: "Completed", color: "bg-green-100 dark:bg-green-900/20" },
  ]

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Kanban Board</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div
              key={column.key}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.key)}
              className={`${column.color} rounded-lg p-4 min-h-96`}
            >
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                {column.label}
                <span className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white text-xs px-2 py-1 rounded-full">
                  {tasks[column.key].length}
                </span>
              </h2>

              <div className="space-y-3">
                {tasks[column.key].map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, column.key)}
                    className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow cursor-move hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-2 mb-2">
                      <GripVertical size={16} className="text-gray-400 flex-shrink-0" />
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">{task.title}</h3>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>

                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`px-2 py-1 rounded font-medium ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar size={12} />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
