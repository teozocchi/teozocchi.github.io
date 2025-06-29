"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

const commands = {
  help: "Available commands: help, about, skills, projects, contact, clear, whoami, uptime",
  about: "DevOps Engineering Student passionate about infrastructure automation and cloud technologies.",
  skills: "Docker • Kubernetes • AWS • Terraform • GitHub Actions • Python • Node.js • Linux",
  projects: "Infrastructure-as-Code • CI/CD Pipeline • Monitoring Stack • Check out the projects section above!",
  contact: "Email: teo@example.com | LinkedIn: /in/teo-zocchi | GitHub: /teo-zocchi",
  whoami: "teo@devops-portfolio:~$ You are viewing Teo Zocchi's portfolio",
  uptime: () => {
    const start = new Date("2024-01-01")
    const now = new Date()
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return `Portfolio has been online for ${diff} days`
  },
  clear: "CLEAR_TERMINAL",
}

export default function TerminalWidget() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    'Welcome to Teo\'s DevOps Terminal! Type "help" for available commands.',
    "",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const newHistory = [...history, `$ ${cmd}`]

    if (trimmedCmd === "clear") {
      setHistory(["Terminal cleared.", ""])
    } else if (commands[trimmedCmd as keyof typeof commands]) {
      const result = commands[trimmedCmd as keyof typeof commands]
      const output = typeof result === "function" ? result() : result
      newHistory.push(output, "")
      setHistory(newHistory)
    } else if (trimmedCmd === "") {
      newHistory.push("")
      setHistory(newHistory)
    } else {
      newHistory.push(`Command not found: ${cmd}. Type "help" for available commands.`, "")
      setHistory(newHistory)
    }

    if (trimmedCmd !== "clear") {
      setCommandHistory((prev) => [...prev, cmd])
    }
    setHistoryIndex(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <Card className="theme-terminal font-mono text-sm theme-scroll">
      <CardContent className="p-0">
        <div className="theme-terminal-header px-4 py-2 border-b theme-border flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full theme-accent-bg"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="theme-text-muted ml-4">matteo@devops-terminal</span>
        </div>
        <div
          ref={terminalRef}
          className="h-64 overflow-y-auto p-4 theme-terminal theme-scroll"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, index) => (
            <div key={index} className="theme-text-secondary whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="theme-accent mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none theme-text-secondary theme-focus theme-input"
              placeholder="Type a command..."
              autoFocus
            />
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
