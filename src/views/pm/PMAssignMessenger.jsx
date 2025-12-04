"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../layouts/MainLayout"
import { Users, Check } from "lucide-react"
import toast from "react-hot-toast"
import { mockApi } from "../../controllers/mockApi"

export default function PMAssignMessenger() {
  const [projects, setProjects] = useState([])
  const [messengers, setMessengers] = useState([])
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedMessenger, setSelectedMessenger] = useState("")
  const [assigning, setAssigning] = useState(false)
  const [loading, setLoading] = useState(true)

  const sidebarLinks = [{ label: "Assign Messenger", path: "/pm/assign-messenger", icon: <Users size={20} /> }]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [projectsRes, usersRes] = await Promise.all([mockApi.getProjects(), mockApi.getAdminUsers()])
      setProjects(projectsRes.data)
      setMessengers(usersRes.data.filter((u) => u.role === "MESSENGER"))
    } catch (error) {
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleAssign = async (e) => {
    e.preventDefault()

    if (!selectedProject || !selectedMessenger) {
      toast.error("Please select project and messenger")
      return
    }

    setAssigning(true)
    try {
      await mockApi.assignMessenger(selectedProject, selectedMessenger)
      toast.success("Messenger assigned successfully")
      setSelectedProject("")
      setSelectedMessenger("")
    } catch (error) {
      toast.error("Failed to assign messenger")
    } finally {
      setAssigning(false)
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
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assign Messenger</h1>

        <div className="card-base">
          <form onSubmit={handleAssign} className="space-y-6">
            {/* Project Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Select Project</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="input-base"
                required
              >
                <option value="">Choose a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Messenger Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Select Messenger</label>
              <select
                value={selectedMessenger}
                onChange={(e) => setSelectedMessenger(e.target.value)}
                className="input-base"
                required
              >
                <option value="">Choose a messenger...</option>
                {messengers.map((messenger) => (
                  <option key={messenger.id} value={messenger.id}>
                    {messenger.name} ({messenger.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Current Assignments */}
            {projects.length > 0 && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Current Assignments</p>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{project.name}</span>
                      {project.messenger ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <Check size={16} />
                          Assigned
                        </span>
                      ) : (
                        <span className="text-gray-400">Unassigned</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={assigning}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Users size={20} />
              {assigning ? "Assigning..." : "Assign Messenger"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
