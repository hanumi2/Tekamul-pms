"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../layouts/AdminLayout"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { mockApi } from "../../controllers/mockApi"
import toast from "react-hot-toast"

export default function AdminReports() {
  const [reports, setReports] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    try {
      const result = await mockApi.getReports()
      setReports(result.data)
    } catch (error) {
      toast.error("Failed to load reports")
    } finally {
      setLoading(false)
    }
  }

  if (loading || !reports)
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    )

  const satisfactionData = [
    { rating: "5 ★", count: reports.satisfaction.breakdown[5] },
    { rating: "4 ★", count: reports.satisfaction.breakdown[4] },
    { rating: "3 ★", count: reports.satisfaction.breakdown[3] },
    { rating: "2 ★", count: reports.satisfaction.breakdown[2] },
    { rating: "1 ★", count: reports.satisfaction.breakdown[1] },
  ]

  const statusData = [
    { name: "Planning", value: reports.projectStatus.planning },
    { name: "In Progress", value: reports.projectStatus.in_progress },
    { name: "Completed", value: reports.projectStatus.completed },
    { name: "On Hold", value: reports.projectStatus.on_hold },
  ]

  const COLORS = ["#0ea5e9", "#8b5cf6", "#ec4899", "#f59e0b"]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Reports</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card-base">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Projects</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{reports.projects}</p>
          </div>
          <div className="card-base">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{reports.tasks}</p>
          </div>
          <div className="card-base">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Satisfaction</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {reports.satisfaction.average.toFixed(1)}★
            </p>
          </div>
          <div className="card-base">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Ratings Submitted</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{reports.satisfaction.total}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Satisfaction Ratings */}
          <div className="card-base">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Satisfaction Ratings</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Project Status */}
          <div className="card-base">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Project Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
