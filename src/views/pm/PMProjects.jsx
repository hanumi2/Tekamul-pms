"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { FolderOpen, Plus, Search } from "lucide-react"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

export default function PMProjects() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  const sidebarLinks = [
    { label: "Dashboard", path: "/pm/dashboard", icon: <FolderOpen size={20} /> },
    { label: "Projects", path: "/pm/projects", icon: <FolderOpen size={20} /> },
    { label: "Upload Design", path: "/pm/upload-design", icon: <Plus size={20} /> },
    { label: "Assign Messenger", path: "/pm/assign-messenger", icon: <Plus size={20} /> },
  ]

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    const filtered = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredProjects(filtered)
  }, [searchTerm, projects])

  const loadProjects = async () => {
    try {
      const result = await mockApi.getProjects()
      setProjects(result.data)
      setFilteredProjects(result.data)
    } catch (error) {
      toast.error("Failed to load projects")
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Projects</h1>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            New Project
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-base pl-10"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/pm/project/${project.id}`}
              className="card-base hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded capitalize font-medium ${
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

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs pt-2">
                  <div>
                    <p className="text-gray-500">Tasks</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{project.tasks.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Engineers</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{project.engineers.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Designs</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{project.designs?.length || 0}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
