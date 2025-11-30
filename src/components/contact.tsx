"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: "🏠",
      label: "Address",
      value: "Dept. of ICT, ICT Division, Agargaon, Dhaka-1217, Bangladesh",
      link: "https://maps.google.com/?q=ICT+Division+Agargaon+Dhaka",
    },
    {
      icon: "📱",
      label: "Phone",
      value: "(+88) 02337730161",
      link: "tel:+8802337730161",
    },
    {
      icon: "📧",
      label: "Email",
      value: "abu.kowsar@doict.gov.bd",
      link: "mailto:abu.kowsar@doict.gov.bd",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-br from-accent/10 via-background to-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground">
            Looking for help? Fill the form and start a new adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className="group p-6 border border-border rounded-xl bg-card hover:border-accent hover:bg-accent/5 transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                {method.label}
              </h3>
              <p className="text-foreground font-semibold group-hover:text-accent transition-colors text-sm">
                {method.value}
              </p>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 order-2 md:order-1">
            <div className="p-6 border border-border rounded-xl bg-card">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <h6 className="font-semibold text-foreground mb-1">
                      Address:
                    </h6>
                    <p className="text-muted-foreground text-sm">
                      Dept. of ICT, ICT Division, Agargaon
                      <br />
                      Dhaka-1217, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h6 className="font-semibold text-foreground mb-1">
                      Phone:
                    </h6>
                    <p className="text-muted-foreground text-sm">
                      (+88) 02337730161
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <h6 className="font-semibold text-foreground mb-1">
                      Email:
                    </h6>
                    <p className="text-muted-foreground text-sm">
                      abu.kowsar@doict.gov.bd
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border border-accent/30 rounded-xl bg-accent/5">
              <h4 className="text-lg font-bold text-foreground mb-2">
                Response Time
              </h4>
              <p className="text-muted-foreground mb-3">
                I will respond to your queries within 48 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                For urgent matters, please call directly.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 order-1 md:order-2"
          >
            <div>
              <h6 className="text-sm text-muted-foreground mb-2">
                Let's work together
              </h6>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Enter your Query details
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Tell me about your challenge — I will respond within 48 hours.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="Your name"
              />

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="Your email"
              />
            </div>

            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              placeholder="Your Subject.."
            />

            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
              placeholder="Your message..."
            ></textarea>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all duration-200"
              disabled={loading}
            >
              Send Message
            </button>

            <p className="text-xs text-muted-foreground text-center">
              This will open your email app to send the message
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
