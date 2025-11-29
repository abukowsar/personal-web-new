export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Startup",
      content: "Exceptional work! The design and implementation exceeded our expectations. Highly recommended.",
      avatar: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager, Digital Agency",
      content: "Professional, responsive, and delivers on time. A true pleasure to work with.",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, E-commerce",
      content: "Transformed our vision into reality. The attention to detail and creativity is outstanding.",
      avatar: "ER",
      rating: 5,
    },
    {
      name: "David Park",
      role: "Founder, SaaS Platform",
      content: "Best decision we made for our project. Reliable, talented, and a great communicator.",
      avatar: "DP",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground">What my clients say about my work</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 border border-border rounded-xl bg-card hover:border-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-lg">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed min-h-20">{testimonial.content}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
