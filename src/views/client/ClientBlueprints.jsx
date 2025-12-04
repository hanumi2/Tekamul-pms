"use client"

import { useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import { Download, FileText, Printer } from "lucide-react"
import toast from "react-hot-toast"

export default function ClientBlueprints() {
  const [showModal, setShowModal] = useState(false)
  const [selectedBlueprint, setSelectedBlueprint] = useState(null)

  const sidebarLinks = [{ label: "Blueprints", path: "/client/blueprints", icon: <FileText size={20} /> }]

  const blueprints = [
    { id: "1", name: "Homepage Layout", format: "PDF", size: "2.4 MB" },
    { id: "2", name: "Mobile Design", format: "PDF", size: "1.8 MB" },
    { id: "3", name: "Database Schema", format: "PDF", size: "0.9 MB" },
  ]

  const handleDownload = (blueprint) => {
    toast.success(`Downloading ${blueprint.name}...`)
  }

  const handleRequestPrint = (blueprint) => {
    setSelectedBlueprint(blueprint)
    setShowModal(true)
  }

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Blueprints</h1>

        <div className="grid gap-4">
          {blueprints.map((blueprint) => (
            <div key={blueprint.id} className="card-base">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText size={32} className="text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{blueprint.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {blueprint.format} • {blueprint.size}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleDownload(blueprint)} className="btn-secondary flex items-center gap-2">
                    <Download size={18} />
                    Download
                  </button>
                  <button onClick={() => handleRequestPrint(blueprint)} className="btn-primary flex items-center gap-2">
                    <Printer size={18} />
                    Request Print
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Print Request Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="card-base max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Request Print Delivery</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  toast.success("Print request submitted!")
                  setShowModal(false)
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Blueprint</label>
                  <input
                    type="text"
                    value={selectedBlueprint?.name}
                    disabled
                    className="input-base bg-gray-100 dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    Delivery Address
                  </label>
                  <textarea placeholder="Enter your delivery address" className="input-base h-24" required />
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="btn-primary flex-1">
                    Submit Request
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
