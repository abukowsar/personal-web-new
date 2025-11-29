"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactMethods = [
    {
      icon: "📧",
      label: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com",
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+1 (555) 000-0000",
      link: "tel:+15550000000",
    },
    {
      icon: "🌐",
      label: "Website",
      value: "rabbil.com",
      link: "https://rabbil.com",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-accent/10 via-background to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">
            Ready to start your next project? Let's create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className="group p-6 border border-border rounded-xl bg-card hover:border-accent hover:bg-accent/5 transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{method.icon}</div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                {method.label}
              </h3>
              <p className="text-foreground font-semibold group-hover:text-accent transition-colors">{method.value}</p>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              {isSubmitted ? "Message Sent!" : "Send Message"}
            </button>

            {isSubmitted && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 text-center font-medium">
                Thanks for reaching out! I'll get back to you soon.
              </div>
            )}
          </form>

          <div className="space-y-6">
            <div className="p-6 border border-border rounded-xl bg-card">
              <h3 className="text-xl font-bold text-foreground mb-4">Why Work With Me?</h3>
              <ul className="space-y-3">
                {[
                  "Fast turnaround on projects",
                  "Creative and innovative solutions",
                  "24/7 communication support",
                  "Dedicated to your success",
                  "Clean, maintainable code",
                  "Post-launch support included",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">✓</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 border border-accent/30 rounded-xl bg-accent/5">
              <h4 className="text-lg font-bold text-foreground mb-2">Response Time</h4>
              <p className="text-muted-foreground mb-3">
                I typically respond to inquiries within 24 hours during business days.
              </p>
              <p className="text-sm text-muted-foreground">
                For urgent matters, please mark your message as urgent and I'll prioritize accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
