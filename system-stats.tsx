"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react"

export default function SystemStats() {
  const [stats, setStats] = useState({
    uptime: "0d 0h 0m",
    visitors: 0,
    projects: 3,
    commits: 0,
  })

  useEffect(() => {
    const startTime = Date.now()

    const updateStats = () => {
      const now = Date.now()
      const diff = now - startTime
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setStats((prev) => ({
        ...prev,
        uptime: `${days}d ${hours}h ${minutes}m`,
        visitors: prev.visitors + Math.floor(Math.random() * 2),
        commits: 127 + Math.floor(Math.random() * 10),
      }))
    }

    updateStats()
    const interval = setInterval(updateStats, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="theme-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 theme-accent" />
            <div>
              <p className="text-xs theme-text-muted">Uptime</p>
              <p className="text-sm font-mono theme-text-secondary">{stats.uptime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="theme-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Wifi className="h-4 w-4 text-blue-400" />
            <div>
              <p className="text-xs theme-text-muted">Visitors</p>
              <p className="text-sm font-mono theme-text-secondary">{stats.visitors}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="theme-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <HardDrive className="h-4 w-4 text-yellow-400" />
            <div>
              <p className="text-xs theme-text-muted">Projects</p>
              <p className="text-sm font-mono theme-text-secondary">{stats.projects}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="theme-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Cpu className="h-4 w-4 text-red-400" />
            <div>
              <p className="text-xs theme-text-muted">Commits</p>
              <p className="text-sm font-mono theme-text-secondary">{stats.commits}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
