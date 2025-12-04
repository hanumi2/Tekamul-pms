// Mock data for the entire system

export const ROLES = {
  ADMIN: "ADMIN",
  PROJECT_MANAGER: "PROJECT_MANAGER",
  ENGINEER: "ENGINEER",
  MESSENGER: "MESSENGER",
  CLIENT: "CLIENT",
  DIRECTOR: "DIRECTOR",
}

export const mockUsers = [
  {
    id: "1",
    email: "admin@demo.com",
    name: "Admin User",
    role: ROLES.ADMIN,
    avatar: "/admin-user.jpg",
  },
  {
    id: "2",
    email: "pm@demo.com",
    name: "Project Manager",
    role: ROLES.PROJECT_MANAGER,
    avatar: "/project-manager.jpg",
  },
  {
    id: "3",
    email: "engineer@demo.com",
    name: "Senior Engineer",
    role: ROLES.ENGINEER,
    avatar: "/diverse-engineers-meeting.png",
  },
  {
    id: "4",
    email: "messenger@demo.com",
    name: "Messenger User",
    role: ROLES.MESSENGER,
    avatar: "/digital-messenger.png",
  },
  {
    id: "5",
    email: "client@demo.com",
    name: "Client User",
    role: ROLES.CLIENT,
    avatar: "/diverse-clients-meeting.png",
  },
  {
    id: "6",
    email: "director@demo.com",
    name: "Director",
    role: ROLES.DIRECTOR,
    avatar: "/film-director-on-set.png",
  },
]

export const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete redesign of company website",
    status: "in_progress",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-03-30",
    clientId: "5",
    pmId: "2",
    engineers: ["3"],
    tasks: ["1", "2", "3"],
    designs: ["1"],
    messenger: "4",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native iOS app for client",
    status: "planning",
    progress: 25,
    startDate: "2024-02-01",
    endDate: "2024-05-30",
    clientId: "5",
    pmId: "2",
    engineers: ["3"],
    tasks: ["4", "5"],
    designs: [],
    messenger: null,
  },
]

export const mockTasks = [
  {
    id: "1",
    projectId: "1",
    title: "Design homepage layout",
    description: "Create wireframes and mockups for homepage",
    status: "completed",
    priority: "high",
    assignedTo: "3",
    dueDate: "2024-02-15",
    createdAt: "2024-01-20",
  },
  {
    id: "2",
    projectId: "1",
    title: "Implement responsive design",
    description: "Make design responsive for mobile devices",
    status: "in_progress",
    priority: "high",
    assignedTo: "3",
    dueDate: "2024-02-28",
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    projectId: "1",
    title: "Setup backend API",
    description: "Create RESTful API endpoints",
    status: "backlog",
    priority: "medium",
    assignedTo: "3",
    dueDate: "2024-03-15",
    createdAt: "2024-02-05",
  },
  {
    id: "4",
    projectId: "2",
    title: "App architecture planning",
    description: "Define app structure and technology stack",
    status: "in_progress",
    priority: "high",
    assignedTo: "3",
    dueDate: "2024-02-20",
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    projectId: "2",
    title: "UI component library",
    description: "Build reusable UI components",
    status: "backlog",
    priority: "medium",
    assignedTo: "3",
    dueDate: "2024-03-10",
    createdAt: "2024-02-05",
  },
]

export const mockDesigns = [
  {
    id: "1",
    projectId: "1",
    name: "Homepage Design v1.0",
    uploadedBy: "2",
    uploadedAt: "2024-02-10",
    file: "homepage-v1.0.zip",
    versions: [
      { version: "1.0", uploadedAt: "2024-02-10", fileName: "homepage-v1.0.zip" },
      { version: "1.1", uploadedAt: "2024-02-15", fileName: "homepage-v1.1.zip" },
      { version: "2.0", uploadedAt: "2024-02-20", fileName: "homepage-v2.0.zip" },
    ],
    status: "approved",
    feedback: [],
  },
]

export const mockMessages = [
  {
    id: "1",
    projectId: "1",
    userId: "2",
    userName: "Project Manager",
    message: "Design looks great! Let's proceed with implementation.",
    timestamp: "2024-02-20T10:30:00",
  },
  {
    id: "2",
    projectId: "1",
    userId: "3",
    userName: "Senior Engineer",
    message: "Starting frontend development next week",
    timestamp: "2024-02-20T11:45:00",
  },
  {
    id: "3",
    projectId: "1",
    userId: "5",
    userName: "Client User",
    message: "Excited to see the progress!",
    timestamp: "2024-02-20T14:20:00",
  },
]

export const mockSatisfactionRatings = [
  { id: "1", projectId: "1", rating: 5, comment: "Excellent work!" },
  { id: "2", projectId: "1", rating: 4, comment: "Good quality" },
  { id: "3", projectId: "2", rating: 5, comment: "Perfect!" },
]

export const mockReports = {
  satisfaction: {
    average: 4.7,
    total: 3,
    breakdown: {
      5: 2,
      4: 1,
      3: 0,
      2: 0,
      1: 0,
    },
  },
  projectStatus: {
    planning: 1,
    in_progress: 1,
    completed: 0,
    on_hold: 0,
  },
  engineerWorkload: [{ id: "3", name: "Senior Engineer", taskCount: 5, completedCount: 1 }],
}
