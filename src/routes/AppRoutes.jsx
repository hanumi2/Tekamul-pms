"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { RoleGuard } from "./RoleGuard"
import { ROLES } from "../models/mockData"

// Public views
import LandingPage from "../views/Landing"
import LoginPage from "../views/Login"
import RegisterPage from "../views/Register"
import NotFoundPage from "../views/NotFound"
import UnauthorizedPage from "../views/Unauthorized"
import AdminDashboard from "../views/admin/AdminDashboard"
import AdminUsers from "../views/admin/AdminUsers"
import AdminProjects from "../views/admin/AdminProjects"
import AdminReports from "../views/admin/AdminReports"
import AdminSettings from "../views/admin/AdminSettings"

// PM views
import PMDashboard from "../views/pm/PMDashboard"
import PMProjects from "../views/pm/PMProjects"
import PMProjectDetail from "../views/pm/PMProjectDetail"
import PMUploadDesign from "../views/pm/PMUploadDesign"
import PMAssignMessenger from "../views/pm/PMAssignMessenger"

// Engineer views
import EngineerDashboard from "../views/engineer/EngineerDashboard"
import EngineerTasks from "../views/engineer/EngineerTasks"
import EngineerTaskDetail from "../views/engineer/EngineerTaskDetail"
import EngineerKanban from "../views/engineer/EngineerKanban"
import EngineerProfile from "../views/engineer/EngineerProfile"

// Messenger views
import MessengerDashboard from "../views/messenger/MessengerDashboard"
import MessengerTasks from "../views/messenger/MessengerTasks"
import MessengerTaskDetail from "../views/messenger/MessengerTaskDetail"

// Client views
import ClientDashboard from "../views/client/ClientDashboard"
import ClientProjects from "../views/client/ClientProjects"
import ClientProjectDetail from "../views/client/ClientProjectDetail"
import ClientBlueprints from "../views/client/ClientBlueprints"
import ClientSatisfaction from "../views/client/ClientSatisfaction"

// Director views
import DirectorDashboard from "../views/director/DirectorDashboard"

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={`/${user?.role.toLowerCase()}/dashboard`} /> : <LoginPage />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/login" element={<Navigate to="/login" />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <AdminUsers />
          </RoleGuard>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <AdminProjects />
          </RoleGuard>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <AdminReports />
          </RoleGuard>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <AdminSettings />
          </RoleGuard>
        }
      />

      {/* PM routes */}
      <Route
        path="/pm/dashboard"
        element={
          <RoleGuard allowedRoles={[ROLES.PROJECT_MANAGER]}>
            <PMDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/pm/projects"
        element={
          <RoleGuard allowedRoles={[ROLES.PROJECT_MANAGER]}>
            <PMProjects />
          </RoleGuard>
        }
      />
      <Route
        path="/pm/project/:id"
        element={
          <RoleGuard allowedRoles={[ROLES.PROJECT_MANAGER]}>
            <PMProjectDetail />
          </RoleGuard>
        }
      />
      <Route
        path="/pm/upload-design"
        element={
          <RoleGuard allowedRoles={[ROLES.PROJECT_MANAGER]}>
            <PMUploadDesign />
          </RoleGuard>
        }
      />
      <Route
        path="/pm/assign-messenger"
        element={
          <RoleGuard allowedRoles={[ROLES.PROJECT_MANAGER]}>
            <PMAssignMessenger />
          </RoleGuard>
        }
      />

      {/* Engineer routes */}
      <Route
        path="/engineer/dashboard"
        element={
          <RoleGuard allowedRoles={[ROLES.ENGINEER]}>
            <EngineerDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/engineer/tasks"
        element={
          <RoleGuard allowedRoles={[ROLES.ENGINEER]}>
            <EngineerTasks />
          </RoleGuard>
        }
      />
      <Route
        path="/engineer/task/:id"
        element={
          <RoleGuard allowedRoles={[ROLES.ENGINEER]}>
            <EngineerTaskDetail />
          </RoleGuard>
        }
      />
      <Route
        path="/engineer/kanban"
        element={
          <RoleGuard allowedRoles={[ROLES.ENGINEER]}>
            <EngineerKanban />
          </RoleGuard>
        }
      />
      <Route
        path="/engineer/profile"
        element={
          <RoleGuard allowedRoles={[ROLES.ENGINEER]}>
            <EngineerProfile />
          </RoleGuard>
        }
      />

      {/* Messenger routes */}
      <Route
        path="/messenger/dashboard"
        element={
          <RoleGuard allowedRoles={[ROLES.MESSENGER]}>
            <MessengerDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/messenger/tasks"
        element={
          <RoleGuard allowedRoles={[ROLES.MESSENGER]}>
            <MessengerTasks />
          </RoleGuard>
        }
      />
      <Route
        path="/messenger/task/:id"
        element={
          <RoleGuard allowedRoles={[ROLES.MESSENGER]}>
            <MessengerTaskDetail />
          </RoleGuard>
        }
      />

      {/* Client routes */}
      <Route
        path="/client/dashboard"
        element={
          <RoleGuard allowedRoles={[ROLES.CLIENT]}>
            <ClientDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/client/projects"
        element={
          <RoleGuard allowedRoles={[ROLES.CLIENT]}>
            <ClientProjects />
          </RoleGuard>
        }
      />
      <Route
        path="/client/project/:id"
        element={
          <RoleGuard allowedRoles={[ROLES.CLIENT]}>
            <ClientProjectDetail />
          </RoleGuard>
        }
      />
      <Route
        path="/client/blueprints"
        element={
          <RoleGuard allowedRoles={[ROLES.CLIENT]}>
            <ClientBlueprints />
          </RoleGuard>
        }
      />
      <Route
        path="/client/satisfaction"
        element={
          <RoleGuard allowedRoles={[ROLES.CLIENT]}>
            <ClientSatisfaction />
          </RoleGuard>
        }
      />

      {/* Director routes */}
      <Route
        path="/director/dashboard"
        element={
          <RoleGuard allowedRoles={[ROLES.DIRECTOR]}>
            <DirectorDashboard />
          </RoleGuard>
        }
      />
    </Routes>
  )
}
