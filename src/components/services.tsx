export default function Services() {
  const services = [
    {
      icon: "🧑‍💼",
      title: "Freelance Project Management",
      description:
        "Part-time remote PM for startups & SMBs. Agile coaching, sprint planning, and team coordination.",
      footer: "Rate: negotiable / hourly or fixed milestone",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: "📚",
      title: "Workshops & Training",
      description:
        "Onsite/remote workshops on Scrum, Jira, stakeholder communication, and PM best practices.",
      footer: "Price: per session / per day",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: "🩺",
      title: "Project Audits & Rescue",
      description:
        "Health checks, risk assessment, and recovery roadmaps to get troubled projects back on track.",
      footer: "Engagement: 1–6 weeks typical",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: "🛠️",
      title: "Prototyping & DFM",
      description:
        "Affordable prototyping with 3D printing, CNC, and scalable Design for Manufacturing guidance.",
      footer: "Rate: negotiable / hourly or fixed milestone",
      gradient: "from-orange-500/20 to-amber-500/20",
    },
    {
      icon: "🤖",
      title: "AI & GenAI Integration",
      description:
        "Applying AI tools to automate workflows, optimize reporting, and accelerate decision-making.",
      footer: "Rate: negotiable / hourly or fixed milestone",
      gradient: "from-violet-500/20 to-indigo-500/20",
    },
    {
      icon: "🌐",
      title: "Digital Transformation",
      description:
        "Supporting startups, NGOs, and enterprises with IT projects, GovTech platforms, and scalable solutions.",
      footer: "Rate: negotiable / hourly or fixed milestone",
      gradient: "from-rose-500/20 to-red-500/20",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-4 bg-background transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            What I Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Affordable Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tailored solutions to help your business grow, innovate, and succeed
            in today's competitive landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon container */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Footer with arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground font-medium">
                    {service.footer}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
            >
              Get Started Today
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-all duration-300"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
