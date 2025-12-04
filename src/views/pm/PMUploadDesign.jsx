"use client"

import { useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import { Upload, FileUp } from "lucide-react"
import toast from "react-hot-toast"
import { mockApi } from "../../controllers/mockApi"

export default function PMUploadDesign() {
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [designName, setDesignName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [projects, setProjects] = useState([])

  const sidebarLinks = [{ label: "Upload Design", path: "/pm/upload-design", icon: <Upload size={20} /> }]

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
      setDesignName(e.target.files[0].name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedProject || !selectedFile) {
      toast.error("Please select project and file")
      return
    }

    setUploading(true)
    try {
      await mockApi.uploadDesign(selectedProject, selectedFile, {
        name: designName,
        uploadedBy: "current-user-id",
      })
      toast.success("Design uploaded successfully")
      setSelectedFile(null)
      setDesignName("")
      setSelectedProject("")
    } catch (error) {
      toast.error("Failed to upload design")
    } finally {
      setUploading(false)
    }
  }

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Design</h1>

        <div className="card-base">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <option value="1">Website Redesign</option>
                <option value="2">Mobile App Development</option>
              </select>
            </div>

            {/* Design Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Design Name</label>
              <input
                type="text"
                placeholder="e.g., Homepage Layout v2.0"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                className="input-base"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-4 text-gray-900 dark:text-white">Upload File</label>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                <label htmlFor="file-input" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3">
                    <FileUp size={48} className="text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ZIP, PDF, or Design files</p>
                    </div>
                  </div>
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept=".zip,.pdf,.fig,.xd,.psd"
                    className="hidden"
                  />
                </label>
              </div>

              {selectedFile && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-400">Selected: {selectedFile.name}</p>
                </div>
              )}
            </div>

            {/* Version History */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Version Control:</strong> Each upload creates a new version. Previous versions are preserved.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Upload size={20} />
              {uploading ? "Uploading..." : "Upload Design"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
