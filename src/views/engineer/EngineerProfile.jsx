"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import MainLayout from "../../layouts/MainLayout"
import { User, Mail, Shield, Calendar } from "lucide-react"

export default function EngineerProfile() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)

  const sidebarLinks = [{ label: "Profile", path: "/engineer/profile", icon: <User size={20} /> }]

  return (
    <MainLayout sidebarLinks={sidebarLinks}>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>

        <div className="card-base">
          <div className="flex items-center gap-6 mb-6">
            <img src={user?.avatar || "/placeholder.svg"} alt={user?.name} className="w-24 h-24 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.role.replace(/_/g, " ")}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              <Mail size={20} className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              <Shield size={20} className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Role</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{user?.role.replace(/_/g, " ")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              <Calendar size={20} className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Member Since</p>
                <p className="font-medium text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <button onClick={() => setEditing(!editing)} className="btn-primary mt-6 w-full">
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>
    </MainLayout>
  )
}
