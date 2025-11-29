export default function About() {
  const skills = ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "MongoDB", "PostgreSQL", "GraphQL"]

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              With over 5 years of experience in web development, I've had the privilege of working with startups and
              established companies to bring their visions to life.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm passionate about creating digital experiences that are not only beautiful but also functional,
              accessible, and performant. My approach combines strategic thinking with technical expertise.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              sharing knowledge with the developer community.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Skills & Technologies</h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-card border border-border rounded-lg text-center font-medium text-foreground hover:border-accent transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-card border border-accent/20 rounded-xl">
              <p className="text-accent font-semibold mb-2">Available for:</p>
              <p className="text-muted-foreground">Freelance projects, full-time positions, and consulting work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
