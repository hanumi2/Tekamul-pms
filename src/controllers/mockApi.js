import {
  mockUsers,
  mockProjects,
  mockTasks,
  mockDesigns,
  mockMessages,
  mockSatisfactionRatings,
  ROLES,
} from "../models/mockData.js"

// Simulate network delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

// Generate mock token
const generateToken = () => "mock_token_" + Math.random().toString(36).substring(7)

// Mock API functions
export const mockApi = {
  // Auth
  login: async (email, password, selectedRole = null) => {
    await delay(400)

    // Any email/password works for demo
    let role = selectedRole || ROLES.CLIENT

    // Auto-detect role based on email
    if (email === "admin@demo.com") role = ROLES.ADMIN
    else if (email === "pm@demo.com") role = ROLES.PROJECT_MANAGER
    else if (email === "engineer@demo.com") role = ROLES.ENGINEER
    else if (email === "messenger@demo.com") role = ROLES.MESSENGER
    else if (email === "director@demo.com") role = ROLES.DIRECTOR

    const user = {
      id: Math.random().toString(36).substring(7),
      email,
      name: email.split("@")[0],
      role,
      avatar: `/placeholder.svg?height=40&width=40&query=${role}`,
    }

    const token = generateToken()

    return { success: true, token, user }
  },

  registerClient: async (payload) => {
    await delay(400)

    const user = {
      id: Math.random().toString(36).substring(7),
      email: payload.email,
      name: payload.name || payload.email.split("@")[0],
      role: ROLES.CLIENT,
      avatar: `/placeholder.svg?height=40&width=40&query=client`,
    }

    const token = generateToken()

    return { success: true, token, user }
  },

  // Projects
  getProjects: async () => {
    await delay(350)
    return { success: true, data: mockProjects }
  },

  getProjectById: async (id) => {
    await delay(300)
    const project = mockProjects.find((p) => p.id === id)
    if (!project) throw new Error("Project not found")
    return { success: true, data: project }
  },

  createProject: async (payload) => {
    await delay(400)
    const newProject = {
      id: Math.random().toString(36).substring(7),
      ...payload,
      createdAt: new Date().toISOString(),
    }
    mockProjects.push(newProject)
    return { success: true, data: newProject }
  },

  updateProject: async (id, payload) => {
    await delay(350)
    const project = mockProjects.find((p) => p.id === id)
    if (!project) throw new Error("Project not found")
    Object.assign(project, payload)
    return { success: true, data: project }
  },

  // Tasks
  getTasks: async (projectId = null) => {
    await delay(300)
    const tasks = projectId ? mockTasks.filter((t) => t.projectId === projectId) : mockTasks
    return { success: true, data: tasks }
  },

  getTaskById: async (id) => {
    await delay(250)
    const task = mockTasks.find((t) => t.id === id)
    if (!task) throw new Error("Task not found")
    return { success: true, data: task }
  },

  createTask: async (payload) => {
    await delay(350)
    const newTask = {
      id: Math.random().toString(36).substring(7),
      ...payload,
      createdAt: new Date().toISOString(),
      status: "backlog",
    }
    mockTasks.push(newTask)
    return { success: true, data: newTask }
  },

  updateTask: async (id, payload) => {
    await delay(300)
    const task = mockTasks.find((t) => t.id === id)
    if (!task) throw new Error("Task not found")
    Object.assign(task, payload)
    return { success: true, data: task }
  },

  // Users
  getAdminUsers: async () => {
    await delay(350)
    return { success: true, data: mockUsers }
  },

  createUser: async (payload) => {
    await delay(400)
    const newUser = {
      id: Math.random().toString(36).substring(7),
      ...payload,
      avatar: `/placeholder.svg?height=40&width=40&query=${payload.role}`,
    }
    mockUsers.push(newUser)
    return { success: true, data: newUser }
  },

  updateUser: async (id, payload) => {
    await delay(350)
    const user = mockUsers.find((u) => u.id === id)
    if (!user) throw new Error("User not found")
    Object.assign(user, payload)
    return { success: true, data: user }
  },

  deleteUser: async (id) => {
    await delay(300)
    const index = mockUsers.findIndex((u) => u.id === id)
    if (index === -1) throw new Error("User not found")
    mockUsers.splice(index, 1)
    return { success: true }
  },

  // Designs
  uploadDesign: async (projectId, file, meta) => {
    await delay(500)
    const newDesign = {
      id: Math.random().toString(36).substring(7),
      projectId,
      name: meta.name || file.name,
      uploadedBy: meta.uploadedBy,
      uploadedAt: new Date().toISOString(),
      file: file.name,
      versions: [{ version: "1.0", uploadedAt: new Date().toISOString(), fileName: file.name }],
      status: "pending_review",
      feedback: [],
    }
    mockDesigns.push(newDesign)
    return { success: true, data: newDesign }
  },

  getDesigns: async (projectId) => {
    await delay(300)
    const designs = mockDesigns.filter((d) => d.projectId === projectId)
    return { success: true, data: designs }
  },

  // Messaging
  getMessages: async (projectId) => {
    await delay(300)
    const messages = mockMessages.filter((m) => m.projectId === projectId)
    return { success: true, data: messages }
  },

  sendMessage: async (projectId, userId, message) => {
    await delay(350)
    const newMessage = {
      id: Math.random().toString(36).substring(7),
      projectId,
      userId,
      userName: "User",
      message,
      timestamp: new Date().toISOString(),
    }
    mockMessages.push(newMessage)
    return { success: true, data: newMessage }
  },

  // Satisfaction
  submitSatisfaction: async (projectId, rating, comment) => {
    await delay(400)
    const newRating = {
      id: Math.random().toString(36).substring(7),
      projectId,
      rating,
      comment,
    }
    mockSatisfactionRatings.push(newRating)
    return { success: true, data: newRating }
  },

  getSatisfactionRatings: async () => {
    await delay(300)
    return { success: true, data: mockSatisfactionRatings }
  },

  // Reports
  getReports: async () => {
    await delay(400)
    return {
      success: true,
      data: {
        satisfaction: {
          average: 4.7,
          total: mockSatisfactionRatings.length,
          breakdown: {
            5: mockSatisfactionRatings.filter((r) => r.rating === 5).length,
            4: mockSatisfactionRatings.filter((r) => r.rating === 4).length,
            3: mockSatisfactionRatings.filter((r) => r.rating === 3).length,
            2: mockSatisfactionRatings.filter((r) => r.rating === 2).length,
            1: mockSatisfactionRatings.filter((r) => r.rating === 1).length,
          },
        },
        projects: mockProjects.length,
        tasks: mockTasks.length,
        projectStatus: {
          planning: mockProjects.filter((p) => p.status === "planning").length,
          in_progress: mockProjects.filter((p) => p.status === "in_progress").length,
          completed: mockProjects.filter((p) => p.status === "completed").length,
          on_hold: mockProjects.filter((p) => p.status === "on_hold").length,
        },
      },
    }
  },

  assignMessenger: async (projectId, messengerId) => {
    await delay(350)
    const project = mockProjects.find((p) => p.id === projectId)
    if (!project) throw new Error("Project not found")
    project.messenger = messengerId
    return { success: true, data: project }
  },
}

export default mockApi
