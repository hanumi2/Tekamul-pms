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
    name: "Commercial Building Design – Addis Ababa",
    description: "Architectural and engineering design for a multi-storey commercial building, including government approval submissions.",
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
    name: "Residential Housing Complex Design",
    description: "Integrated architectural, structural, and electrical design for a residential housing project.",
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
    title: "Prepare architectural concept drawings",
    description: "Develop initial architectural sketches and space planning based on client requirements.",
    status: "completed",
    priority: "high",
    assignedTo: "3",
    dueDate: "2024-02-15",
    createdAt: "2024-01-20",
  },
  {
    id: "2",
    projectId: "1",
    title: "Develop detailed structural drawings",
    description: "Produce reinforced concrete structural drawings and calculations.",
    status: "in_progress",
    priority: "high",
    assignedTo: "3",
    dueDate: "2024-02-28",
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    projectId: "1",
    title: "Submit drawings for government approval",
    description: "Prepare and submit required documents to regulatory authorities for approval.",
    status: "backlog",
    priority: "medium",
    assignedTo: "3",
    dueDate: "2024-03-15",
    createdAt: "2024-02-05",
  },
  {
    id: "4",
    projectId: "2",
    title: "Client requirement analysis",
    description: "Conduct meetings with the client to gather design and functional requirements.",
    status: "in_progress",
    priority: "high",
    assignedTo: "3",
    dueDate: "2024-02-20",
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    projectId: "2",
    title: "Prepare preliminary design proposal",
    description: "Create initial architectural and engineering design proposal for client review.",
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
    name: "Architectural & Structural Drawings – Revision Set",
    uploadedBy: "2",
    uploadedAt: "2024-02-10",
    file: "commercial-building-drawings-v1.zip",
    versions: [
      { version: "1.0", uploadedAt: "2024-02-10", fileName: "drawings-v1.0.zip" },
      { version: "1.1", uploadedAt: "2024-02-15", fileName: "drawings-v1.1.zip" },
      { version: "2.0", uploadedAt: "2024-02-20", fileName: "drawings-v2.0.zip" },
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
    message: "The architectural drawings have been approved. Please proceed with structural detailing.",
    timestamp: "2024-02-20T10:30:00",
  },
  {
    id: "2",
    projectId: "1",
    userId: "3",
    userName: "Senior Engineer",
    message: "Structural calculations are underway and will be submitted for review this week.",
    timestamp: "2024-02-20T11:45:00",
  },
  {
    id: "3",
    projectId: "1",
    userId: "5",
    userName: "Client User",
    message: "Thank you for the update. Looking forward to the next design submission.",
    timestamp: "2024-02-20T14:20:00",
  },
]

export const mockSatisfactionRatings = [
  { id: "1", projectId: "1", rating: 5, comment: "Excellent coordination and clear design documentation." },
  { id: "2", projectId: "1", rating: 4, comment: "Very good service and timely updates." },
  { id: "3", projectId: "2", rating: 5, comment: "Professional and well-organized consulting team." },
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
