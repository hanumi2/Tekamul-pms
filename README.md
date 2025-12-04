# Engineering Project Management System - Frontend

A comprehensive React + Vite frontend for a multi-role engineering project management system with role-based access control, kanban boards, design versioning, and real-time collaboration features.

## Features

- **Multi-Role Support**: Admin, Project Manager, Engineer, Messenger, Client, Director
- **Role-Based Access Control**: Protected routes with automatic redirects
- **Kanban Board**: Drag-and-drop task management for engineers
- **Design Versioning**: Upload and manage design file versions
- **Project Tracking**: Real-time progress visualization
- **Messaging**: Project-level chat and communication
- **Analytics**: Satisfaction ratings and project reports
- **Dark/Light Theme**: Toggle theme with persistence
- **Mock API**: Fully functional mock backend for development

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **@dnd-kit** - Drag and drop

## Installation

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
├── context/            # React Context (Auth, Theme)
├── controllers/        # API controllers and mock API
├── layouts/            # Layout components
├── models/             # Mock data and types
├── routes/             # Route definitions and guards
├── views/              # Page components
│   ├── admin/          # Admin pages
│   ├── pm/             # Project Manager pages
│   ├── engineer/       # Engineer pages
│   ├── messenger/      # Messenger pages
│   ├── client/         # Client pages
│   └── director/       # Director pages
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
\`\`\`

## Demo Credentials

Use any email and password to login. The system auto-detects roles based on email:

| Email | Role | Features |
|-------|------|----------|
| admin@demo.com | Admin | User management, system settings, reports |
| pm@demo.com | Project Manager | Project oversight, design uploads, messenger assignment |
| engineer@demo.com | Engineer | Task management, kanban board, profile |
| messenger@demo.com | Messenger | Task submission, feedback |
| client@demo.com | Client | Project tracking, blueprints, satisfaction feedback |
| director@demo.com | Director | Executive dashboard, analytics |

## Key Features

### Authentication
- Mock login system with role selection
- Token-based authentication stored in localStorage
- Automatic role detection from email
- Protected routes with RoleGuard component

### Project Management
- Create and manage projects
- Track project progress with visual indicators
- Assign engineers and messengers to projects
- Real-time project status updates

### Engineer Kanban
- Drag-and-drop task management
- Four columns: Backlog, In Progress, Review, Completed
- Task priority and deadline indicators
- Quick task status updates

### Design Management
- Upload design files with versioning
- Maintain version history
- Download previous versions
- Track design status (pending, approved, rejected)

### Messaging
- Project-level chat
- Real-time message updates
- Message history

### Analytics
- Client satisfaction ratings
- Project status distribution
- Task completion metrics
- Executive dashboard for directors

### Theme Support
- Dark/Light mode toggle
- Persistent theme preference
- Smooth transitions

## Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:8080/api
\`\`\`

## Switching to Real Backend

1. Update `.env`:
   \`\`\`env
   VITE_USE_MOCK=false
   VITE_API_BASE_URL=https://your-api.com/api
   \`\`\`

2. Replace mock API calls in `src/controllers/mockApi.js` with real API endpoints

3. Update `src/utils/api.js` to use your real API configuration

## Mock API Endpoints

The mock API simulates the following endpoints:

- `login(email, password, role)` - User authentication
- `registerClient(payload)` - Client registration
- `getProjects()` - Fetch all projects
- `getProjectById(id)` - Fetch single project
- `getTasks(projectId)` - Fetch tasks
- `createTask(payload)` - Create new task
- `updateTask(id, payload)` - Update task
- `getAdminUsers()` - Fetch all users
- `createUser(payload)` - Create new user
- `updateUser(id, payload)` - Update user
- `deleteUser(id)` - Delete user
- `uploadDesign(projectId, file, meta)` - Upload design
- `getDesigns(projectId)` - Fetch designs
- `getMessages(projectId)` - Fetch messages
- `sendMessage(projectId, userId, message)` - Send message
- `submitSatisfaction(projectId, rating, comment)` - Submit feedback
- `getReports()` - Fetch analytics reports
- `assignMessenger(projectId, messengerId)` - Assign messenger

## Customization

### Adding New Roles

1. Add role to `ROLES` in `src/models/mockData.js`
2. Create new views in `src/views/[role]/`
3. Add routes in `src/routes/AppRoutes.jsx`
4. Create layout in `src/layouts/[Role]Layout.jsx`

### Styling

- Global styles in `src/index.css`
- TailwindCSS configuration in `tailwind.config.js`
- Component-level styles using Tailwind classes
- Design tokens for consistent theming

### Adding Features

1. Create mock API functions in `src/controllers/mockApi.js`
2. Create components in `src/components/`
3. Create views in `src/views/`
4. Add routes in `src/routes/AppRoutes.jsx`

## Performance Optimization

- Code splitting with React Router
- Lazy loading of routes
- Memoization of components
- Efficient state management with Context API
- Optimized re-renders with proper dependency arrays

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## Support

For issues or questions, please open an issue in the repository.
