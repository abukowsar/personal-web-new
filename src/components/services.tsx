export default function Services() {
  const services = [
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Creating beautiful, user-centric interfaces that solve real problems.",
    },
    {
      icon: "⚡",
      title: "Frontend Development",
      description: "Building fast, responsive web applications with modern frameworks.",
    },
    {
      icon: "🔧",
      title: "Full Stack Solutions",
      description: "End-to-end development from database to deployment.",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Seamless experience across all devices and screen sizes.",
    },
  ]

  return (
    <section id="services" className="py-20 px-4 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Services</h2>
          <p className="text-lg text-muted-foreground">What I can help you with</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 border border-border rounded-xl bg-card hover:border-accent transition-colors group"
            >
              <p className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</p>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
