export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tags: ["React", "Node.js", "MongoDB"],
      image: "🛍️",
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard for tracking business metrics",
      tags: ["Next.js", "TypeScript", "TailwindCSS"],
      image: "📊",
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile application for productivity",
      tags: ["React Native", "Firebase", "Redux"],
      image: "📱",
    },
    {
      title: "Design System",
      description: "Comprehensive component library and design tokens",
      tags: ["React", "Storybook", "CSS-in-JS"],
      image: "🎨",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">A selection of my recent work</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all hover:shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:from-accent/20 transition-colors">
                <span className="text-6xl">{project.image}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
