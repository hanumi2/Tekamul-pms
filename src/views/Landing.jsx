import { Link } from "react-router-dom"
import { ArrowRight, Zap, Users, BarChart3 } from "lucide-react"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-primary-600">Tekamul PM</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Register
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Engineering Project Management Made Simple
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Streamline your engineering projects with role-based collaboration, kanban boards, and real-time
          communication.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/login" className="btn-primary inline-flex items-center gap-2">
            Get Started <ArrowRight size={20} />
          </Link>
          <Link to="/register" className="btn-secondary">
            Create Account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Powerful Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-primary-600" size={32} />,
                title: "Fast & Responsive",
                desc: "Modern, responsive interface built with React and TailwindCSS",
              },
              {
                icon: <Users className="text-secondary-600" size={32} />,
                title: "Role-Based Collaboration",
                desc: "Different views and permissions for each role in your team",
              },
              {
                icon: <BarChart3 className="text-accent-600" size={32} />,
                title: "Analytics & Reports",
                desc: "Track progress, satisfaction ratings, and project metrics",
              },
            ].map((feature, idx) => (
              <div key={idx} className="card-base text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo credentials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Demo Credentials</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { email: "admin@demo.com", role: "Admin", desc: "User management & system settings" },
              { email: "pm@demo.com", role: "Project Manager", desc: "Project oversight & design uploads" },
              { email: "engineer@demo.com", role: "Engineer", desc: "Task management & kanban board" },
              { email: "messenger@demo.com", role: "Messenger", desc: "Task workflow & submission" },
              { email: "client@demo.com", role: "Client", desc: "Project tracking & feedback" },
              { email: "director@demo.com", role: "Director", desc: "High-level reports & analytics" },
            ].map((cred, idx) => (
              <div key={idx} className="card-base">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Use any password</p>
                <p className="font-mono font-semibold text-primary-600 mb-2">{cred.email}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{cred.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cred.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 EngineerPM. All rights reserved.</p>
      </footer>
    </div>
  )
}
