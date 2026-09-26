"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Users } from "lucide-react";
import ConsultationModal from "@/components/consultation-modal";

type Service = {
  icon: string;
  title: string;
  description: string;
  footer: string;
  gradient: string;
  overview: string;
  whatsIncluded: string[];
  idealFor: string[];
};

export default function Services() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      icon: "🧑‍💼",
      title: "Freelance Project Management",
      description:
        "Part-time remote PM for startups & SMBs. Agile coaching, sprint planning, and team coordination.",
      footer: "Rate: negotiable / hourly or fixed milestone",
      gradient: "from-blue-500/20 to-cyan-500/20",
      overview:
        "Get PMP/PMI-ACP-level project leadership without the cost or commitment of a full-time hire. I embed part-time with your team to run the day-to-day so founders and leads can focus on the product, not the process.",
      whatsIncluded: [
        "Sprint planning, backlog grooming, and daily standups",
        "Stakeholder reporting and risk/issue tracking",
        "Agile/Scrum coaching for teams new to the framework",
        "Jira/Confluence setup and ongoing workflow management",
      ],
      idealFor: [
        "Startups that need PM leadership but aren't ready for a full-time hire",
        "SMBs running their first Agile transformation",
      ],
    },
    {
      icon: "📚",
      title: "Workshops & Training",
      description:
        "Onsite/remote workshops on Scrum, Jira, stakeholder communication, and PM best practices.",
      footer: "Price: per session / per day",
      gradient: "from-purple-500/20 to-pink-500/20",
      overview:
        "Hands-on, practical training for teams and individuals looking to build real Agile and project-management skills, not just watch slides. Curriculum is tailored to your team's current maturity level.",
      whatsIncluded: [
        "Scrum fundamentals workshop for new Agile teams",
        "Jira/Confluence hands-on training",
        "Stakeholder communication masterclass",
        "PM certification prep (PMP / PMI-ACP) guidance",
      ],
      idealFor: [
        "Teams onboarding to Agile for the first time",
        "Managers and leads preparing for a PM certification",
      ],
    },
    {
      icon: "🩺",
      title: "Project Audits & Rescue",
      description:
        "Health checks, risk assessment, and recovery roadmaps to get troubled projects back on track.",
      footer: "Engagement: 1–6 weeks typical",
      gradient: "from-green-500/20 to-emerald-500/20",
      overview:
        "When a project is behind schedule, over budget, or losing stakeholder confidence, I run a rapid, independent audit to find the real root cause and hand you a concrete recovery plan, not just a diagnosis.",
      whatsIncluded: [
        "Full health check across scope, schedule, budget, and risk",
        "Stakeholder and team interviews to surface hidden blockers",
        "Root-cause analysis of delays or scope creep",
        "Prioritized recovery roadmap with clear next actions",
      ],
      idealFor: [
        "Projects currently behind schedule or over budget",
        "Teams inheriting a troubled project mid-flight",
      ],
    },
    {
      icon: "🛠️",
      title: "Prototyping & DFM",
      description:
        "Affordable prototyping with 3D printing, CNC, and scalable Design for Manufacturing guidance.",
      footer: "Rate: negotiable / hourly or fixed milestone",
      gradient: "from-orange-500/20 to-amber-500/20",
      overview:
        "Turn a hardware concept into a testable physical product, and de-risk manufacturing before you commit to tooling. I bridge the gap between design and production for early-stage hardware teams.",
      whatsIncluded: [
        "3D-printed functional prototypes for early validation",
        "CNC-machined parts for higher-fidelity testing",
        "Design for Manufacturing (DFM) review to cut production cost",
        "Iteration support from concept through pre-production",
      ],
      idealFor: [
        "Hardware startups validating a physical product",
        "Teams needing to de-risk manufacturing before tooling investment",
      ],
    },
    {
      icon: "🤖",
      title: "AI & GenAI Integration",
      description:
        "Applying AI tools to automate workflows, optimize reporting, and accelerate decision-making.",
      footer: "Rate: negotiable / hourly or fixed milestone",
      gradient: "from-violet-500/20 to-indigo-500/20",
      overview:
        "Practical, IBM GenAI-certified guidance on where AI actually earns its keep in your workflow, then hands-on implementation, not just a slide deck of buzzwords.",
      whatsIncluded: [
        "Workflow automation using GenAI for reporting and documentation",
        "Custom AI model integration (NLP classifiers, LLMs) into existing platforms",
        "Tool evaluation and vendor selection",
        "Team enablement on responsible, practical AI adoption",
      ],
      idealFor: [
        "Teams wanting to cut manual reporting and documentation load",
        "Organizations exploring their first real AI integration",
      ],
    },
    {
      icon: "🌐",
      title: "Digital Transformation",
      description:
        "Supporting startups, NGOs, and enterprises with IT projects, GovTech platforms, and scalable solutions.",
      footer: "Rate: negotiable / hourly or fixed milestone",
      gradient: "from-rose-500/20 to-red-500/20",
      overview:
        "Drawing on real experience delivering GovTech platforms for Bangladesh's ICT Division, I help organizations modernize legacy processes into scalable, citizen- or customer-facing digital systems.",
      whatsIncluded: [
        "IT project delivery for GovTech and NGO platforms",
        "Legacy-to-cloud migration planning",
        "Scalable architecture guidance",
        "Vendor and procurement support for public-sector projects",
      ],
      idealFor: [
        "Government agencies and NGOs digitizing citizen-facing services",
        "Enterprises modernizing legacy systems",
      ],
    },
  ];

  if (selectedService) {
    return (
      <>
        <section
          id="services"
          className="py-24 px-4 bg-background transition-colors duration-300"
        >
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </button>

            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
              <span className="text-3xl">{selectedService.icon}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {selectedService.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {selectedService.overview}
            </p>

            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {selectedService.whatsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
                <Users className="w-5 h-5 text-accent" />
                Ideal For
              </h3>
              <ul className="space-y-3">
                {selectedService.idealFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">
                {selectedService.footer}
              </p>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="sm:ml-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </section>
        <ConsultationModal
          open={showConsultationModal}
          onClose={() => setShowConsultationModal(false)}
        />
      </>
    );
  }

  return (
    <>
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              What I Offer
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Affordable Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Tailored solutions to help your business grow, innovate, and succeed
              in today's competitive landscape.
            </p>
          </div>
          <button
            onClick={() => setShowConsultationModal(true)}
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
          >
            All Services
            <ArrowRight className="w-4 h-4" />
          </button>
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
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    aria-label={`View details for ${service.title}`}
                    className="w-11 h-11 md:w-8 md:h-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 md:translate-x-2 md:group-hover:translate-x-0 cursor-pointer"
                  >
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
                  </button>
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
            <button
              onClick={() => setShowConsultationModal(true)}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
            >
              Get Started Today
            </button>
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-all duration-300"
            >
              View My Work
            </Link>
          </div>
        </div>
      </div>
    </section>
    <ConsultationModal
      open={showConsultationModal}
      onClose={() => setShowConsultationModal(false)}
    />
    </>
  );
}
