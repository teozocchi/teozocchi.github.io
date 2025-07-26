// Custom Cursor
const cursor = document.getElementById("custom-cursor")
const cursorGlow = document.getElementById("cursor-glow")

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX - 6 + "px"
  cursor.style.top = e.clientY - 6 + "px"
  cursorGlow.style.left = e.clientX - 10 + "px"
  cursorGlow.style.top = e.clientY - 10 + "px"
})

document.addEventListener("mousedown", () => {
  cursor.style.transform = "scale(0.8)"
})

document.addEventListener("mouseup", () => {
  cursor.style.transform = "scale(1)"
})

// Typing Animation
const typingTexts = [
  "DevOps Engineering Student",
  "Infrastructure Automation Enthusiast",
  "Cloud Technology Explorer",
  "CI/CD Pipeline Builder",
]

let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false
const typingElement = document.getElementById("typing-text")

function typeText() {
  const currentText = typingTexts[currentTextIndex]

  if (!isDeleting) {
    typingElement.textContent = currentText.slice(0, currentCharIndex + 1)
    currentCharIndex++

    if (currentCharIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 2000)
    }
  } else {
    typingElement.textContent = currentText.slice(0, currentCharIndex - 1)
    currentCharIndex--

    if (currentCharIndex === 0) {
      isDeleting = false
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length
    }
  }

  setTimeout(typeText, isDeleting ? 50 : 100)
}

// Start typing animation
typeText()

// System Stats
function updateStats() {
  const startTime = Date.now()

  setInterval(() => {
    const now = Date.now()
    const diff = now - startTime
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    document.getElementById("uptime").textContent = `${days}d ${hours}h ${minutes}m`

    // Simulate visitor count
    const visitors = 42 + Math.floor(Math.random() * 10)
    document.getElementById("visitors").textContent = visitors

    // Simulate commit count
    const commits = 127 + Math.floor(Math.random() * 20)
    document.getElementById("commits").textContent = commits
  }, 60000) // Update every minute
}

updateStats()

// Terminal Functionality
const terminalInput = document.getElementById("terminal-input")
const terminalOutput = document.getElementById("terminal-output")

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

const commandHistory = []
let historyIndex = -1

terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = terminalInput.value.trim()
    executeCommand(command)
    terminalInput.value = ""
    historyIndex = -1
  } else if (e.key === "ArrowUp") {
    e.preventDefault()
    if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
      historyIndex++
      terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex]
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault()
    if (historyIndex > 0) {
      historyIndex--
      terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex]
    } else if (historyIndex === 0) {
      historyIndex = -1
      terminalInput.value = ""
    }
  }
})

function executeCommand(cmd) {
  const trimmedCmd = cmd.toLowerCase()

  // Add command to output
  addTerminalLine(`$ ${cmd}`)

  if (trimmedCmd === "clear") {
    terminalOutput.innerHTML = '<div class="terminal-line">Terminal cleared.</div><div class="terminal-line"></div>'
  } else if (commands[trimmedCmd]) {
    const result = commands[trimmedCmd]
    const output = typeof result === "function" ? result() : result
    addTerminalLine(output)
    addTerminalLine("")
  } else if (trimmedCmd === "") {
    addTerminalLine("")
  } else {
    addTerminalLine(`Command not found: ${cmd}. Type "help" for available commands.`)
    addTerminalLine("")
  }

  if (trimmedCmd !== "clear" && cmd.trim() !== "") {
    commandHistory.push(cmd)
  }

  // Scroll to bottom
  terminalOutput.scrollTop = terminalOutput.scrollHeight
}

function addTerminalLine(text) {
  const line = document.createElement("div")
  line.className = "terminal-line"
  line.textContent = text
  terminalOutput.appendChild(line)
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Initialize Lucide icons
const lucide = window.lucide // Declare the lucide variable
lucide.createIcons()
