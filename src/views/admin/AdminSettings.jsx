import AdminLayout from "../../layouts/AdminLayout"
import { Settings, Bell, Lock, Palette } from "lucide-react"

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>

        {/* Settings Sections */}
        <div className="space-y-4">
          {[
            { icon: <Palette size={20} />, title: "Appearance", desc: "Customize system theme and colors" },
            { icon: <Bell size={20} />, title: "Notifications", desc: "Configure notification preferences" },
            { icon: <Lock size={20} />, title: "Security", desc: "Manage security and access policies" },
            { icon: <Settings size={20} />, title: "System Configuration", desc: "Advanced system settings" },
          ].map((setting, idx) => (
            <div key={idx} className="card-base">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-primary-600">{setting.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{setting.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                  </div>
                </div>
                <button className="btn-secondary">Configure</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
