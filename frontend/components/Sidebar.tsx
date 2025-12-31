'use client'

import { Search, History, FolderOpen } from 'lucide-react'

interface SidebarProps {
  activeTab: 'search' | 'history' | 'cases'
  setActiveTab: (tab: 'search' | 'history' | 'cases') => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'search' as const, label: 'New Search', icon: Search },
    { id: 'history' as const, label: 'Query History', icon: History },
    { id: 'cases' as const, label: 'Cases', icon: FolderOpen },
  ]

  return (
    <aside className="w-64 bg-cyber-darker cyber-border border-r border-cyber-green/30 min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                isActive
                  ? 'bg-cyber-green/20 border border-cyber-green/50 text-cyber-green cyber-glow'
                  : 'text-cyber-cyan hover:bg-cyber-green/10 hover:text-cyber-green'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Legal Notice */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyber-green/20">
        <p className="text-xs text-cyber-cyan/70 text-center">
          Educational Use Only
        </p>
        <p className="text-xs text-cyber-cyan/50 text-center mt-1">
          Legal & Ethical OSINT
        </p>
      </div>
    </aside>
  )
}

