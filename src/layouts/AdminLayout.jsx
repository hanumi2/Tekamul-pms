import MainLayout from "./MainLayout"
import { LayoutDashboard, Users, FolderOpen, BarChart3, Settings } from "lucide-react"

export default function AdminLayout({ children }) {
  const sidebarLinks = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Users", path: "/admin/users", icon: <Users size={20} /> },
    { label: "Projects", path: "/admin/projects", icon: <FolderOpen size={20} /> },
    { label: "Reports", path: "/admin/reports", icon: <BarChart3 size={20} /> },
    { label: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ]

  return <MainLayout sidebarLinks={sidebarLinks}>{children}</MainLayout>
}
