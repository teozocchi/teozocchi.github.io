import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Calendar,
  Terminal,
  Cloud,
  Container,
  GitBranch,
  Monitor,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { JetBrains_Mono } from "next/font/google"
import TerminalWidget from "@/components/terminal-widget"
import TypingAnimation from "@/components/typing-animation"
import SystemStats from "@/components/system-stats"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export default function DevOpsPortfolio() {
  return (
    <div className={`theme-bg raven-atmosphere light-atmosphere min-h-screen ${jetbrainsMono.variable}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full theme-nav backdrop-blur supports-[backdrop-filter]:bg-opacity-60 border-b theme-border">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Terminal className="h-5 w-5 theme-accent" />
              <span className="font-bold font-mono theme-text-primary">matteo@devops:~$</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="theme-text-secondary transition-colors hover:theme-accent">
                ./about
              </Link>
              <Link href="#projects" className="theme-text-secondary transition-colors hover:theme-accent">
                ./projects
              </Link>
              <Link href="#experience" className="theme-text-secondary transition-colors hover:theme-accent">
                ./experience
              </Link>
              <Link href="#contact" className="theme-text-secondary transition-colors hover:theme-accent">
                ./contact
              </Link>
            </nav>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <div className="font-mono theme-accent text-lg mb-4">$ whoami</div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-mono dark:raven-glitch-hover light-glow-hover theme-text-shadow">
              <span className="theme-accent">Matteo</span> <span className="theme-text-primary">Zocchi</span>
            </h1>
            <div className="font-mono theme-text-secondary text-lg">
              {">"}{" "}
              <TypingAnimation
                texts={[
                  "DevOps Engineering Student",
                  "Infrastructure Automation Enthusiast",
                  "Cloud Technology Explorer",
                  "CI/CD Pipeline Builder",
                ]}
              />
              <span className="animate-pulse theme-accent">|</span>
            </div>
            <p className="mx-auto max-w-[700px] text-lg theme-text-secondary md:text-xl">
              Computer Science student passionate about building scalable infrastructure, automating deployments, and
              bridging the gap between development and operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="theme-button-primary" asChild>
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button variant="outline" className="theme-button-outline bg-transparent" asChild>
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
              <Link href="https://github.com/your-username" target="_blank">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
              <Link href="https://linkedin.com/in/your-profile" target="_blank">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
              <Link href="mailto:teo@example.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-24 theme-section-alt">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center font-mono theme-text-shadow">
            <span className="theme-accent">$</span> <span className="theme-text-primary">cat about.md</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <p className="theme-text-secondary">
                I'm a Computer Science student with a passion for DevOps and cloud infrastructure. Recently completed an
                internship where I gained hands-on experience with CI/CD pipelines, containerization, and cloud
                platforms.
              </p>
              <p className="theme-text-secondary">
                I love automating repetitive tasks, optimizing deployment processes, and ensuring systems are reliable
                and scalable. Always eager to learn new technologies and best practices in the DevOps space.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Cloud className="h-5 w-5 theme-accent" />
                  <span className="text-sm theme-text-secondary">Cloud Platforms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Container className="h-5 w-5 theme-accent" />
                  <span className="text-sm theme-text-secondary">Containerization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-5 w-5 theme-accent" />
                  <span className="text-sm theme-text-secondary">CI/CD Pipelines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5 theme-accent" />
                  <span className="text-sm theme-text-secondary">Monitoring & Logging</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Profile"
                  width={300}
                  height={300}
                  className="rounded-lg border-2 border-current theme-accent border-opacity-30"
                />
                <div className="absolute -bottom-4 -right-4 theme-accent-bg text-white px-3 py-1 rounded-full text-sm font-mono">
                  ./student
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Stats Section */}
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tighter mb-6 text-center font-mono theme-text-shadow">
            <span className="theme-accent">$</span> <span className="theme-text-primary">system status</span>
          </h2>
          <SystemStats />
        </div>
      </section>

      {/* Skills Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center font-mono theme-text-shadow">
            <span className="theme-accent">$</span> <span className="theme-text-primary">ls -la /skills/</span>
          </h2>
          <div className="skills-grid">
            <Card className="theme-card theme-card-hover interactive-hover">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 theme-accent text-lg">
                  <Cloud className="h-6 w-6" />
                  <span>Cloud & Infrastructure</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2.5">
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    AWS
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    Azure
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    Terraform
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    CloudFormation
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="theme-card theme-card-hover interactive-hover">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 theme-accent text-lg">
                  <Container className="h-6 w-6" />
                  <span>Containers & Orchestration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2.5">
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    Docker
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    Kubernetes
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    Helm
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    Docker Compose
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="theme-card theme-card-hover interactive-hover">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 theme-accent text-lg">
                  <GitBranch className="h-6 w-6" />
                  <span>CI/CD & Automation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2.5">
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    GitHub Actions
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    Jenkins
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    GitLab CI
                  </Badge>
                  <Badge variant="secondary" className="theme-badge px-3 py-1">
                    Ansible
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container py-24 theme-section-alt">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center font-mono theme-text-shadow">
            <span className="theme-accent">$</span>{" "}
            <span className="theme-text-primary">find ./projects -type f -name "*.yml"</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group theme-card theme-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl theme-accent">Infrastructure-as-Code</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
                      <Link href="https://github.com" target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
                      <Link href="https://example.com" target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardDescription className="theme-text-muted">
                  Terraform modules for deploying scalable web applications on AWS with auto-scaling and load balancing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Infrastructure Diagram"
                  width={400}
                  height={200}
                  className="rounded-md mb-4"
                />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="theme-badge-outline">
                    Terraform
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    AWS
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    EC2
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    ALB
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group theme-card theme-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl theme-accent">CI/CD Pipeline</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
                      <Link href="https://github.com" target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardDescription className="theme-text-muted">
                  Automated deployment pipeline with testing, security scanning, and multi-environment promotion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="CI/CD Pipeline"
                  width={400}
                  height={200}
                  className="rounded-md mb-4"
                />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="theme-badge-outline">
                    GitHub Actions
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    Docker
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    Jest
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    SonarQube
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group theme-card theme-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl theme-accent">Monitoring Stack</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
                      <Link href="https://github.com" target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
                      <Link href="https://example.com" target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardDescription className="theme-text-muted">
                  Complete observability solution with metrics, logs, and alerting for containerized applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Monitoring Dashboard"
                  width={400}
                  height={200}
                  className="rounded-md mb-4"
                />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="theme-badge-outline">
                    Prometheus
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    Grafana
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    ELK Stack
                  </Badge>
                  <Badge variant="outline" className="theme-badge-outline">
                    AlertManager
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center font-mono theme-text-shadow">
            <span className="theme-accent">$</span>{" "}
            <span className="theme-text-primary">history | grep experience</span>
          </h2>
          <div className="space-y-8">
            <Card className="theme-card theme-card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="theme-accent">DevOps Engineering Intern</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1 theme-text-muted">
                      <span>TechCorp Solutions</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Remote
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-sm theme-text-muted">
                    <Calendar className="h-3 w-3" />
                    Summer 2024
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 theme-text-secondary">
                  <li>Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 40%</li>
                  <li>Containerized legacy applications with Docker and deployed to Kubernetes clusters</li>
                  <li>Set up monitoring and alerting with Prometheus and Grafana for production services</li>
                  <li>Automated infrastructure provisioning using Terraform on AWS</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="theme-card theme-card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="theme-accent">Computer Science Student</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1 theme-text-muted">
                      <span>University Name</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        City, State
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-sm theme-text-muted">
                    <Calendar className="h-3 w-3" />
                    2022 - 2026
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 theme-text-secondary">
                  <li>Relevant coursework: Systems Programming, Database Systems, Software Engineering</li>
                  <li>Active member of the Computer Science Club and DevOps Study Group</li>
                  <li>GPA: 3.7/4.0</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Terminal Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center font-mono theme-text-shadow">
            <span className="theme-accent">$</span> <span className="theme-text-primary">interactive terminal</span>
          </h2>
          <p className="text-center theme-text-muted mb-8">
            Try out some commands! Type "help" to see what's available.
          </p>
          <TerminalWidget />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-24 theme-section-alt">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 font-mono theme-text-shadow">
            <span className="theme-accent">$</span> <span className="theme-text-primary">./contact.sh</span>
          </h2>
          <p className="theme-text-secondary mb-8">
            I'm actively seeking DevOps engineering opportunities and internships. Let's connect and discuss how I can
            contribute to your team!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="theme-button-primary" asChild>
              <Link href="mailto:teo@example.com">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Link>
            </Button>
            <Button variant="outline" className="theme-button-outline bg-transparent" asChild>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="mr-2 h-4 w-4" />
                Connect on LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t theme-border py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose theme-text-muted md:text-left font-mono">
            $ echo "Built with Next.js and Tailwind CSS" && date
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="theme-button-ghost" asChild>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
