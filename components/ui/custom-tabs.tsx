'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Tab { id: string; label: string; icon?: React.ReactNode; count?: number }
interface CustomTabsProps { tabs: Tab[]; defaultTab?: string; onChange?: (tabId: string) => void; className?: string }

export function CustomTabs({ tabs, defaultTab, onChange, className }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const handleTabChange = (id: string) => {
    setActiveTab(id)
    onChange?.(id)
  }
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-muted rounded-xl', className)}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={cn('flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all', activeTab === tab.id ? 'bg-background text-foreground shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground')}>
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && <span className={cn('ml-1 px-1.5 py-0.5 text-xs rounded-full', activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20')}>{tab.count}</span>}
        </button>
      ))}
    </div>
  )
}
