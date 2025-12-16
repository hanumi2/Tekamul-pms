import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Shield, Layers, BarChart, Settings, Users } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layers className="h-8 w-8 text-primary-600 dark:text-primary-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Takamul</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-md shadow-sm transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            Enterprise Edition
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Takamul – Integrated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">Progress Management System</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Plan, monitor, and evaluate organizational progress through a unified platform that enhances transparency, coordination, and performance tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-all">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* What Is Takamul? */}
      <section className="py-20 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What Is Takamul?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Takamul is an integrated system designed to manage, monitor, and evaluate progress across organizational initiatives, projects, and plans.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                It enables stakeholders to track execution, measure performance indicators, and maintain alignment with organizational and strategic objectives through centralized data and structured workflows.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <Layers className="text-blue-500 mb-2" size={24} />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Integrated</h4>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <CheckCircle className="text-green-500 mb-2" size={24} />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Reliable</h4>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <Shield className="text-purple-500 mb-2" size={24} />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Secure</h4>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <BarChart className="text-orange-500 mb-2" size={24} />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Scalable</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Core Capabilities of Takamul</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Settings className="text-blue-600 dark:text-blue-400" size={32} />,
                title: "Scenario & Plan Management",
                desc: "Create, structure, and manage plans and initiatives with defined objectives, timelines, and responsibilities."
              },
              {
                icon: <BarChart className="text-indigo-600 dark:text-indigo-400" size={32} />,
                title: "Progress & Performance Tracking",
                desc: "Monitor execution progress using measurable indicators, milestones, and real-time status updates."
              },
              {
                icon: <Users className="text-purple-600 dark:text-purple-400" size={32} />,
                title: "Role-Based Access & Governance",
                desc: "Support multiple roles such as Administrators, Managers, Engineers, and Stakeholders with controlled permissions."
              },
              {
                icon: <Shield className="text-emerald-600 dark:text-emerald-400" size={32} />,
                title: "Enterprise-Ready Architecture",
                desc: "Built to support scalability, security, and long-term organizational use."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Tracking Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Track Progress with Confidence</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Takamul provides a centralized dashboard that enables organizations to monitor progress across all initiatives, review performance metrics, and assess execution status.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            This visibility supports informed decision-making, early risk identification, and improved coordination across teams.
          </p>

          <div className="relative mx-auto mt-12 max-w-4xl shadow-2xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Mock Dashboard Preview */}
            <div className="bg-gray-100 dark:bg-gray-900 h-64 md:h-80 flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-600 font-medium flex items-center gap-2">
                <BarChart size={20} /> Dashboard Preview
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect With Takamul Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-8 text-center uppercase tracking-widest text-xs">Connect With Takamul</h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect with Takamul through official communication channels for updates, support, and documentation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {[
              { email: "Official Website", role: "Takamul", desc: "Visit our main site" },
              { email: "LinkedIn", role: "Social", desc: "Follow us" },
              { email: "X (Twitter)", role: "Social", desc: "Latest updates" },
              { email: "Email Support", role: "Support", desc: "Get help" },
              { email: "Documentation", role: "Guides", desc: "User guides & access" },
            ].map((cred, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold text-sm">
                  {cred.email[0]}
                </div>
                <div>
                  <div className="font-mono text-sm text-primary-600 dark:text-primary-400 font-medium">{cred.email}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{cred.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Layers className="h-6 w-6 text-gray-400" />
            <span className="text-lg font-bold text-gray-500 dark:text-gray-400">Takamul</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; 2025 Takamul Progress Management System. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            An integrated platform for monitoring progress, enhancing transparency, and supporting informed decision-making.
          </p>
        </div>
      </footer>
    </div>
  )
}
